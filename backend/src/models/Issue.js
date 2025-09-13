import mongoose from 'mongoose';

const issueSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Issue title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Issue description is required'],
    trim: true,
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
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
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['reported', 'assigned', 'in_progress', 'resolved', 'closed', 'rejected'],
    default: 'reported'
  },
  location: {
    address: {
      type: String,
      required: [true, 'Location address is required'],
      trim: true
    },
    coordinates: {
      lat: {
        type: Number,
        required: [true, 'Latitude is required'],
        min: -90,
        max: 90
      },
      lng: {
        type: Number,
        required: [true, 'Longitude is required'],
        min: -180,
        max: 180
      }
    },
    city: {
      type: String,
      required: true,
      trim: true
    },
    state: {
      type: String,
      required: true,
      trim: true
    },
    zipCode: {
      type: String,
      trim: true
    }
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    publicId: String,
    caption: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assignedTo: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department'
    },
    assignedAt: Date,
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  estimatedResolutionDate: Date,
  actualResolutionDate: Date,
  resolutionNotes: String,
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  upvotes: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    votedAt: {
      type: Date,
      default: Date.now
    }
  }],
  comments: [{
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: [1000, 'Comment cannot exceed 1000 characters']
    },
    isInternal: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  }],
  statusHistory: [{
    status: {
      type: String,
      required: true
    },
    changedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    changedAt: {
      type: Date,
      default: Date.now
    },
    notes: String
  }],
  isPublic: {
    type: Boolean,
    default: true
  },
  isAnonymous: {
    type: Boolean,
    default: false
  },
  resolutionRating: {
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    feedback: String,
    ratedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    ratedAt: Date
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for upvote count
issueSchema.virtual('upvoteCount').get(function() {
  return this.upvotes.length;
});

// Virtual for comment count
issueSchema.virtual('commentCount').get(function() {
  return this.comments.length;
});

// Virtual for days since reported
issueSchema.virtual('daysSinceReported').get(function() {
  const now = new Date();
  const reported = this.createdAt;
  const diffTime = Math.abs(now - reported);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

// Indexes for better query performance
issueSchema.index({ status: 1 });
issueSchema.index({ category: 1 });
issueSchema.index({ priority: 1 });
issueSchema.index({ reportedBy: 1 });
issueSchema.index({ 'assignedTo.user': 1 });
issueSchema.index({ 'assignedTo.department': 1 });
issueSchema.index({ 'location.coordinates': '2dsphere' });
issueSchema.index({ createdAt: -1 });
issueSchema.index({ tags: 1 });

// Pre-save middleware to add initial status to history
issueSchema.pre('save', function(next) {
  if (this.isNew && this.statusHistory.length === 0) {
    this.statusHistory.push({
      status: this.status,
      changedBy: this.reportedBy,
      changedAt: new Date(),
      notes: 'Issue reported'
    });
  }
  next();
});

// Instance method to add status change
issueSchema.methods.addStatusChange = function(newStatus, changedBy, notes = '') {
  this.status = newStatus;
  this.statusHistory.push({
    status: newStatus,
    changedBy,
    changedAt: new Date(),
    notes
  });
  return this.save();
};

// Instance method to add comment
issueSchema.methods.addComment = function(author, content, isInternal = false) {
  this.comments.push({
    author,
    content,
    isInternal,
    createdAt: new Date(),
    updatedAt: new Date()
  });
  return this.save();
};

// Instance method to upvote
issueSchema.methods.upvote = function(userId) {
  const existingUpvote = this.upvotes.find(upvote => 
    upvote.user.toString() === userId.toString()
  );
  
  if (existingUpvote) {
    this.upvotes = this.upvotes.filter(upvote => 
      upvote.user.toString() !== userId.toString()
    );
    return this.save();
  } else {
    this.upvotes.push({ user: userId });
    return this.save();
  }
};

// Static method to find issues by location
issueSchema.statics.findByLocation = function(coordinates, maxDistance = 1000) {
  return this.find({
    'location.coordinates': {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [coordinates.lng, coordinates.lat]
        },
        $maxDistance: maxDistance
      }
    }
  });
};

// Static method to find issues by status
issueSchema.statics.findByStatus = function(status) {
  return this.find({ status }).populate('reportedBy', 'firstName lastName email');
};

// Static method to get issue statistics
issueSchema.statics.getStatistics = function() {
  return this.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    }
  ]);
};

const Issue = mongoose.model('Issue', issueSchema);

export default Issue;
