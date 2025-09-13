import Issue from '../models/Issue.js';
import User from '../models/User.js';
import Department from '../models/Department.js';

// @desc    Get all issues
// @route   GET /api/issues
// @access  Private
export const getIssues = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const filter = {};
    
    // Filter by status
    if (req.query.status) {
      filter.status = req.query.status;
    }
    
    // Filter by category
    if (req.query.category) {
      filter.category = req.query.category;
    }
    
    // Filter by priority
    if (req.query.priority) {
      filter.priority = req.query.priority;
    }
    
    // Filter by user role
    if (req.user.role === 'citizen') {
      // Citizens can only see public issues
      filter.isPublic = true;
    }
    
    // Search by title or description
    if (req.query.search) {
      filter.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    const issues = await Issue.find(filter)
      .populate('reportedBy', 'firstName lastName email avatar')
      .populate('assignedTo.user', 'firstName lastName email')
      .populate('assignedTo.department', 'name code')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Issue.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: issues.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: issues
    });
  } catch (error) {
    console.error('Get issues error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting issues'
    });
  }
};

// @desc    Get single issue
// @route   GET /api/issues/:id
// @access  Private
export const getIssue = async (req, res, next) => {
  try {
    const issue = await Issue.findById(req.params.id)
      .populate('reportedBy', 'firstName lastName email avatar')
      .populate('assignedTo.user', 'firstName lastName email')
      .populate('assignedTo.department', 'name code')
      .populate('comments.author', 'firstName lastName email avatar');

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: 'Issue not found'
      });
    }

    // Check if user can view this issue
    if (issue.isAnonymous && req.user.role === 'citizen' && 
        issue.reportedBy._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied to anonymous issue'
      });
    }

    res.status(200).json({
      success: true,
      data: issue
    });
  } catch (error) {
    console.error('Get issue error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting issue'
    });
  }
};

// @desc    Create new issue
// @route   POST /api/issues
// @access  Private
export const createIssue = async (req, res, next) => {
  try {
    // Add reportedBy to request body
    req.body.reportedBy = req.user._id;

    const issue = await Issue.create(req.body);

    // Populate the created issue
    await issue.populate('reportedBy', 'firstName lastName email avatar');

    res.status(201).json({
      success: true,
      data: issue
    });
  } catch (error) {
    console.error('Create issue error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating issue'
    });
  }
};

// @desc    Update issue
// @route   PUT /api/issues/:id
// @access  Private
export const updateIssue = async (req, res, next) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: 'Issue not found'
      });
    }

    // Check if user can update this issue
    if (req.user.role === 'citizen' && 
        issue.reportedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only update your own issues.'
      });
    }

    const updatedIssue = await Issue.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    ).populate('reportedBy', 'firstName lastName email avatar')
     .populate('assignedTo.user', 'firstName lastName email')
     .populate('assignedTo.department', 'name code');

    res.status(200).json({
      success: true,
      data: updatedIssue
    });
  } catch (error) {
    console.error('Update issue error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating issue'
    });
  }
};

// @desc    Delete issue
// @route   DELETE /api/issues/:id
// @access  Private
export const deleteIssue = async (req, res, next) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: 'Issue not found'
      });
    }

    // Check if user can delete this issue
    if (req.user.role === 'citizen' && 
        issue.reportedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only delete your own issues.'
      });
    }

    await Issue.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Issue deleted successfully'
    });
  } catch (error) {
    console.error('Delete issue error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting issue'
    });
  }
};

// @desc    Assign issue
// @route   PUT /api/issues/:id/assign
// @access  Private/Admin/Department Head
export const assignIssue = async (req, res, next) => {
  try {
    const { assignedTo, department, notes } = req.body;

    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: 'Issue not found'
      });
    }

    // Update assignment
    issue.assignedTo = {
      user: assignedTo,
      department: department,
      assignedAt: new Date(),
      assignedBy: req.user._id
    };

    // Add status change
    await issue.addStatusChange('assigned', req.user._id, notes || 'Issue assigned');

    await issue.save();

    res.status(200).json({
      success: true,
      data: issue
    });
  } catch (error) {
    console.error('Assign issue error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error assigning issue'
    });
  }
};

// @desc    Resolve issue
// @route   PUT /api/issues/:id/resolve
// @access  Private/Admin/Department Head/Municipal Officer
export const resolveIssue = async (req, res, next) => {
  try {
    const { resolutionNotes } = req.body;

    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: 'Issue not found'
      });
    }

    // Update issue
    issue.status = 'resolved';
    issue.actualResolutionDate = new Date();
    issue.resolutionNotes = resolutionNotes;

    // Add status change
    await issue.addStatusChange('resolved', req.user._id, resolutionNotes || 'Issue resolved');

    await issue.save();

    res.status(200).json({
      success: true,
      data: issue
    });
  } catch (error) {
    console.error('Resolve issue error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error resolving issue'
    });
  }
};

// @desc    Add comment to issue
// @route   POST /api/issues/:id/comment
// @access  Private
export const addComment = async (req, res, next) => {
  try {
    const { content, isInternal } = req.body;

    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: 'Issue not found'
      });
    }

    // Add comment
    await issue.addComment(req.user._id, content, isInternal || false);

    // Populate the updated issue
    await issue.populate('comments.author', 'firstName lastName email avatar');

    res.status(200).json({
      success: true,
      data: issue.comments[issue.comments.length - 1]
    });
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error adding comment'
    });
  }
};

// @desc    Upvote issue
// @route   POST /api/issues/:id/upvote
// @access  Private
export const upvoteIssue = async (req, res, next) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: 'Issue not found'
      });
    }

    // Toggle upvote
    await issue.upvote(req.user._id);

    res.status(200).json({
      success: true,
      upvoteCount: issue.upvoteCount
    });
  } catch (error) {
    console.error('Upvote issue error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error upvoting issue'
    });
  }
};

// @desc    Get issue statistics
// @route   GET /api/issues/statistics
// @access  Private
export const getIssueStatistics = async (req, res, next) => {
  try {
    const stats = await Issue.getStatistics();
    
    // Get additional statistics
    const totalIssues = await Issue.countDocuments();
    const recentIssues = await Issue.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
    });

    res.status(200).json({
      success: true,
      data: {
        totalIssues,
        recentIssues,
        statusBreakdown: stats
      }
    });
  } catch (error) {
    console.error('Get issue statistics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting issue statistics'
    });
  }
};

// @desc    Get issues by location
// @route   GET /api/issues/location
// @access  Private
export const getIssuesByLocation = async (req, res, next) => {
  try {
    const { lat, lng, maxDistance = 1000 } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({
        success: false,
        message: 'Latitude and longitude are required'
      });
    }

    const issues = await Issue.findByLocation(
      { lat: parseFloat(lat), lng: parseFloat(lng) },
      parseInt(maxDistance)
    ).populate('reportedBy', 'firstName lastName email avatar');

    res.status(200).json({
      success: true,
      count: issues.length,
      data: issues
    });
  } catch (error) {
    console.error('Get issues by location error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting issues by location'
    });
  }
};

// @desc    Get issues by category
// @route   GET /api/issues/category/:category
// @access  Private
export const getIssuesByCategory = async (req, res, next) => {
  try {
    const issues = await Issue.findByCategory(req.params.category)
      .populate('reportedBy', 'firstName lastName email avatar');

    res.status(200).json({
      success: true,
      count: issues.length,
      data: issues
    });
  } catch (error) {
    console.error('Get issues by category error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting issues by category'
    });
  }
};

// @desc    Get issues by status
// @route   GET /api/issues/status/:status
// @access  Private
export const getIssuesByStatus = async (req, res, next) => {
  try {
    const issues = await Issue.findByStatus(req.params.status);

    res.status(200).json({
      success: true,
      count: issues.length,
      data: issues
    });
  } catch (error) {
    console.error('Get issues by status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting issues by status'
    });
  }
};
