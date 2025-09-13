import express from 'express';
import {
  getDepartments,
  getDepartment,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  addStaff,
  removeStaff,
  updateDepartmentPerformance,
  getDepartmentStatistics
} from '../controllers/departmentController.js';
import { authenticate, authorize } from '../middleware/auth.js';
import {
  validateDepartmentCreation
} from '../middleware/validation.js';

const router = express.Router();

// All routes are protected
router.use(authenticate);

// Public department routes
router.get('/', getDepartments);
router.get('/statistics', getDepartmentStatistics);
router.get('/:id', getDepartment);

// Admin only routes
router.post('/', authorize('admin'), validateDepartmentCreation, createDepartment);
router.put('/:id', authorize('admin'), updateDepartment);
router.delete('/:id', authorize('admin'), deleteDepartment);
router.post('/:id/staff', authorize('admin'), addStaff);
router.delete('/:id/staff/:userId', authorize('admin'), removeStaff);
router.put('/:id/performance', authorize('admin'), updateDepartmentPerformance);

export default router;
