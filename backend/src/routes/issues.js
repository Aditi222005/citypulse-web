import express from 'express';
import {
  getIssues,
  getIssue,
  createIssue,
  updateIssue,
  deleteIssue,
  assignIssue,
  resolveIssue,
  addComment,
  upvoteIssue,
  getIssueStatistics,
  getIssuesByLocation,
  getIssuesByCategory,
  getIssuesByStatus
} from '../controllers/issueController.js';
import { authenticate, authorize, authorizeResource } from '../middleware/auth.js';
import {
  validateIssueCreation,
  validateIssueUpdate,
  validateComment
} from '../middleware/validation.js';

const router = express.Router();

// All routes are protected
router.use(authenticate);

// Public issue routes (for citizens)
router.get('/', getIssues);
router.get('/statistics', getIssueStatistics);
router.get('/location', getIssuesByLocation);
router.get('/category/:category', getIssuesByCategory);
router.get('/status/:status', getIssuesByStatus);
router.get('/:id', getIssue);
router.post('/', validateIssueCreation, createIssue);
router.put('/:id', authorizeResource('reportedBy'), validateIssueUpdate, updateIssue);
router.delete('/:id', authorizeResource('reportedBy'), deleteIssue);
router.post('/:id/comment', validateComment, addComment);
router.post('/:id/upvote', upvoteIssue);

// Admin/Department routes
router.put('/:id/assign', authorize(['admin', 'department_head']), assignIssue);
router.put('/:id/resolve', authorize(['admin', 'department_head', 'municipal_officer']), resolveIssue);

export default router;
