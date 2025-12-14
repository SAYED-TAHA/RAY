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

const router = express.Router();

// Public routes
router.get('/', authenticateToken, requireAdmin, getUsers);
router.get('/stats', authenticateToken, requireAdmin, getUserStats);
router.get('/:id', authenticateToken, requireAdmin, validateObjectId, getUserById);

// Protected admin routes
router.put('/:id', authenticateToken, requireAdmin, validateObjectId, updateUser);
router.delete('/:id', authenticateToken, requireAdmin, validateObjectId, deleteUser);

export default router;
