import express from 'express';
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  updateUserRole,
  updateUserPermissions,
  deactivateUser,
  activateUser
} from '../controllers/userController.js';
import { authenticate, authorize, checkPermission } from '../middleware/auth.js';
import {
  validateUserRegistration,
  validateProfileUpdate
} from '../middleware/validation.js';

const router = express.Router();

// All routes are protected
router.use(authenticate);

// Admin only routes
router.get('/', authorize('admin'), getUsers);
router.post('/', authorize('admin'), validateUserRegistration, createUser);
router.get('/:id', authorize('admin'), getUser);
router.put('/:id', authorize('admin'), validateProfileUpdate, updateUser);
router.delete('/:id', authorize('admin'), deleteUser);
router.put('/:id/role', authorize('admin'), updateUserRole);
router.put('/:id/permissions', authorize('admin'), updateUserPermissions);
router.put('/:id/deactivate', authorize('admin'), deactivateUser);
router.put('/:id/activate', authorize('admin'), activateUser);

export default router;
