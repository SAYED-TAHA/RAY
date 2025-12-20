import express from 'express';
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserStats
} from '../controllers/controllers/userController.js';
import { authenticateToken, requireAdmin } from '../../middleware/auth.js';
import { validateObjectId } from '../../middleware/validation.js';
import { strictRateLimiter } from '../../middleware/rateLimiter.js';

const router = express.Router();

// Admin routes - all require strict rate limiting
router.get('/', authenticateToken, requireAdmin, strictRateLimiter, getUsers);
router.get('/stats', authenticateToken, requireAdmin, strictRateLimiter, getUserStats);
router.get('/:id', authenticateToken, requireAdmin, validateObjectId, strictRateLimiter, getUserById);

// Protected admin routes
router.put('/:id', authenticateToken, requireAdmin, validateObjectId, strictRateLimiter, updateUser);
router.delete('/:id', authenticateToken, requireAdmin, validateObjectId, strictRateLimiter, deleteUser);

export default router;
