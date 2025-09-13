import express from 'express';
import {
  register,
  login,
  logout,
  getMe,
  updateDetails,
  updatePassword,
  forgotPassword,
  resetPassword,
  verifyEmail,
  refreshToken
} from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';
import {
  validateUserRegistration,
  validateUserLogin,
  validatePasswordReset,
  validateNewPassword,
  validateProfileUpdate
} from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.post('/register', validateUserRegistration, register);
router.post('/login', validateUserLogin, login);
router.post('/forgotpassword', validatePasswordReset, forgotPassword);
router.put('/resetpassword/:resettoken', validateNewPassword, resetPassword);
router.get('/verify-email/:token', verifyEmail);
router.post('/refresh', refreshToken);

// Protected routes
router.get('/me', authenticate, getMe);
router.put('/updatedetails', authenticate, validateProfileUpdate, updateDetails);
router.put('/updatepassword', authenticate, validateNewPassword, updatePassword);
router.post('/logout', authenticate, logout);

export default router;
