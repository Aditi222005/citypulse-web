import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Department name is required'],
    unique: true,
    trim: true,
    maxlength: [100, 'Department name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Department description is required'],
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  code: {
    type: String,
    required: [true, 'Department code is required'],
    unique: true,
    uppercase: true,
    trim: true,
    match: [/^[A-Z]{2,10}$/, 'Department code must be 2-10 uppercase letters']
  },
  head: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  contactInfo: {
    email: {
      type: String,
      required: [true, 'Department email is required'],
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please provide a valid email address'
      ]
    },
    phone: {
      type: String,
      required: [true, 'Department phone is required'],
      match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please provide a valid phone number']
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String
    }
  },
  responsibilities: [{
    type: String,
    trim: true,
    maxlength: [200, 'Responsibility cannot exceed 200 characters']
  }],
  categories: [{
    type: String,
    enum: [
      'infrastructure',
      'sanitation',
      'traffic',
      'utilities',
      'environment',
      'safety',
      'parks',
      'roads',
      'other'
    ]
  }],
  staff: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    role: {
      type: String,
      enum: ['officer', 'supervisor', 'manager', 'specialist'],
      required: true
    },
    joinedAt: {
      type: Date,
      default: Date.now
    },
    isActive: {
      type: Boolean,
      default: true
    }
  }],
  workingHours: {
    monday: {
      start: String,
      end: String,
      isWorking: { type: Boolean, default: true }
    },
    tuesday: {
      start: String,
      end: String,
      isWorking: { type: Boolean, default: true }
    },
    wednesday: {
      start: String,
      end: String,
      isWorking: { type: Boolean, default: true }
    },
    thursday: {
      start: String,
      end: String,
      isWorking: { type: Boolean, default: true }
    },
    friday: {
      start: String,
      end: String,
      isWorking: { type: Boolean, default: true }
    },
    saturday: {
      start: String,
      end: String,
      isWorking: { type: Boolean, default: false }
    },
    sunday: {
      start: String,
      end: String,
      isWorking: { type: Boolean, default: false }
    }
  },
  performance: {
    totalIssuesAssigned: {
      type: Number,
      default: 0
    },
    totalIssuesResolved: {
      type: Number,
      default: 0
    },
    averageResolutionTime: {
      type: Number,
      default: 0 // in hours
    },
    satisfactionRating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },
    lastUpdated: {
      type: Date,
      default: Date.now
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  settings: {
    autoAssignIssues: {
      type: Boolean,
      default: false
    },
    notificationPreferences: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: false },
      push: { type: Boolean, default: true }
    },
    escalationRules: [{
      priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'critical']
      },
      escalationTime: {
        type: Number,
        default: 24 // in hours
      },
      escalateTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    }]
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for active staff count
departmentSchema.virtual('activeStaffCount').get(function() {
  return this.staff.filter(member => member.isActive).length;
});

// Virtual for resolution rate
departmentSchema.virtual('resolutionRate').get(function() {
  if (this.performance.totalIssuesAssigned === 0) return 0;
  return (this.performance.totalIssuesResolved / this.performance.totalIssuesAssigned) * 100;
});

// Indexes for better query performance
departmentSchema.index({ name: 1 });
departmentSchema.index({ code: 1 });
departmentSchema.index({ head: 1 });
departmentSchema.index({ 'staff.user': 1 });
departmentSchema.index({ categories: 1 });
departmentSchema.index({ isActive: 1 });

// Pre-save middleware to update performance metrics
departmentSchema.pre('save', function(next) {
  if (this.isModified('performance')) {
    this.performance.lastUpdated = new Date();
  }
  next();
});

// Instance method to add staff member
departmentSchema.methods.addStaff = function(userId, role) {
  const existingMember = this.staff.find(member => 
    member.user.toString() === userId.toString()
  );
  
  if (existingMember) {
    existingMember.role = role;
    existingMember.isActive = true;
  } else {
    this.staff.push({
      user: userId,
      role,
      joinedAt: new Date(),
      isActive: true
    });
  }
  
  return this.save();
};

// Instance method to remove staff member
departmentSchema.methods.removeStaff = function(userId) {
  this.staff = this.staff.filter(member => 
    member.user.toString() !== userId.toString()
  );
  return this.save();
};

// Instance method to update performance metrics
departmentSchema.methods.updatePerformance = function(issuesResolved, resolutionTime) {
  this.performance.totalIssuesResolved += issuesResolved;
  
  // Calculate new average resolution time
  const totalTime = this.performance.averageResolutionTime * (this.performance.totalIssuesResolved - issuesResolved);
  const newTotalTime = totalTime + (resolutionTime * issuesResolved);
  this.performance.averageResolutionTime = newTotalTime / this.performance.totalIssuesResolved;
  
  this.performance.lastUpdated = new Date();
  return this.save();
};

// Static method to find departments by category
departmentSchema.statics.findByCategory = function(category) {
  return this.find({ 
    categories: category,
    isActive: true 
  }).populate('head', 'firstName lastName email');
};

// Static method to get department statistics
departmentSchema.statics.getStatistics = function() {
  return this.aggregate([
    {
      $group: {
        _id: null,
        totalDepartments: { $sum: 1 },
        activeDepartments: {
          $sum: { $cond: ['$isActive', 1, 0] }
        },
        totalStaff: {
          $sum: { $size: '$staff' }
        },
        averageResolutionTime: {
          $avg: '$performance.averageResolutionTime'
        }
      }
    }
  ]);
};

const Department = mongoose.model('Department', departmentSchema);

export default Department;
