import Department from '../models/Department.js';
import User from '../models/User.js';
import Issue from '../models/Issue.js';

// @desc    Get all departments
// @route   GET /api/departments
// @access  Private
export const getDepartments = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const filter = { isActive: true };
    
    // Filter by category
    if (req.query.category) {
      filter.categories = req.query.category;
    }
    
    // Search by name or description
    if (req.query.search) {
      filter.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    const departments = await Department.find(filter)
      .populate('head', 'firstName lastName email')
      .populate('staff.user', 'firstName lastName email role')
      .sort({ name: 1 })
      .skip(skip)
      .limit(limit);

    const total = await Department.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: departments.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: departments
    });
  } catch (error) {
    console.error('Get departments error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting departments'
    });
  }
};

// @desc    Get single department
// @route   GET /api/departments/:id
// @access  Private
export const getDepartment = async (req, res, next) => {
  try {
    const department = await Department.findById(req.params.id)
      .populate('head', 'firstName lastName email')
      .populate('staff.user', 'firstName lastName email role');

    if (!department) {
      return res.status(404).json({
        success: false,
        message: 'Department not found'
      });
    }

    res.status(200).json({
      success: true,
      data: department
    });
  } catch (error) {
    console.error('Get department error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting department'
    });
  }
};

// @desc    Create new department
// @route   POST /api/departments
// @access  Private/Admin
export const createDepartment = async (req, res, next) => {
  try {
    const department = await Department.create(req.body);

    await department.populate('head', 'firstName lastName email');

    res.status(201).json({
      success: true,
      data: department
    });
  } catch (error) {
    console.error('Create department error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating department'
    });
  }
};

// @desc    Update department
// @route   PUT /api/departments/:id
// @access  Private/Admin
export const updateDepartment = async (req, res, next) => {
  try {
    const department = await Department.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    ).populate('head', 'firstName lastName email')
     .populate('staff.user', 'firstName lastName email role');

    if (!department) {
      return res.status(404).json({
        success: false,
        message: 'Department not found'
      });
    }

    res.status(200).json({
      success: true,
      data: department
    });
  } catch (error) {
    console.error('Update department error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating department'
    });
  }
};

// @desc    Delete department
// @route   DELETE /api/departments/:id
// @access  Private/Admin
export const deleteDepartment = async (req, res, next) => {
  try {
    const department = await Department.findById(req.params.id);

    if (!department) {
      return res.status(404).json({
        success: false,
        message: 'Department not found'
      });
    }

    // Soft delete - just deactivate
    department.isActive = false;
    await department.save();

    res.status(200).json({
      success: true,
      message: 'Department deactivated successfully'
    });
  } catch (error) {
    console.error('Delete department error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting department'
    });
  }
};

// @desc    Add staff to department
// @route   POST /api/departments/:id/staff
// @access  Private/Admin
export const addStaff = async (req, res, next) => {
  try {
    const { userId, role } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({
        success: false,
        message: 'Department not found'
      });
    }

    await department.addStaff(userId, role);

    // Update user's department
    user.department = department._id;
    await user.save();

    await department.populate('staff.user', 'firstName lastName email role');

    res.status(200).json({
      success: true,
      data: department
    });
  } catch (error) {
    console.error('Add staff error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error adding staff'
    });
  }
};

// @desc    Remove staff from department
// @route   DELETE /api/departments/:id/staff/:userId
// @access  Private/Admin
export const removeStaff = async (req, res, next) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({
        success: false,
        message: 'Department not found'
      });
    }

    await department.removeStaff(req.params.userId);

    // Update user's department
    const user = await User.findById(req.params.userId);
    if (user) {
      user.department = undefined;
      await user.save();
    }

    await department.populate('staff.user', 'firstName lastName email role');

    res.status(200).json({
      success: true,
      data: department
    });
  } catch (error) {
    console.error('Remove staff error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error removing staff'
    });
  }
};

// @desc    Update department performance
// @route   PUT /api/departments/:id/performance
// @access  Private/Admin
export const updateDepartmentPerformance = async (req, res, next) => {
  try {
    const { issuesResolved, resolutionTime } = req.body;

    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({
        success: false,
        message: 'Department not found'
      });
    }

    await department.updatePerformance(issuesResolved, resolutionTime);

    res.status(200).json({
      success: true,
      data: department
    });
  } catch (error) {
    console.error('Update department performance error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating department performance'
    });
  }
};

// @desc    Get department statistics
// @route   GET /api/departments/statistics
// @access  Private
export const getDepartmentStatistics = async (req, res, next) => {
  try {
    const stats = await Department.getStatistics();
    
    // Get additional statistics
    const totalDepartments = await Department.countDocuments();
    const activeDepartments = await Department.countDocuments({ isActive: true });
    const totalStaff = await Department.aggregate([
      { $unwind: '$staff' },
      { $match: { 'staff.isActive': true } },
      { $count: 'totalStaff' }
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalDepartments,
        activeDepartments,
        totalStaff: totalStaff[0]?.totalStaff || 0,
        ...stats[0]
      }
    });
  } catch (error) {
    console.error('Get department statistics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting department statistics'
    });
  }
};
