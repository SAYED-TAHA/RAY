import express from 'express';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
} from '../controllers/controllers/cartController.js';
import { authenticateToken } from '../../middleware/auth.js';
import { validateObjectId } from '../../middleware/validation.js';

const router = express.Router();

// Protected routes - require authentication
router.get('/', authenticateToken, getCart);
router.post('/add', authenticateToken, addToCart);
router.put('/update', authenticateToken, updateCartItem);
router.delete('/remove', authenticateToken, removeFromCart);
router.delete('/clear', authenticateToken, clearCart);

export default router;
