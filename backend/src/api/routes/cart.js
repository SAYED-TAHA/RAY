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
import { rateLimiter } from '../../middleware/rateLimiter.js';

const router = express.Router();

// Protected routes - require authentication with rate limiting
router.get('/', authenticateToken, rateLimiter, getCart);
router.post('/add', authenticateToken, rateLimiter, addToCart);
router.put('/update', authenticateToken, rateLimiter, updateCartItem);
router.delete('/remove', authenticateToken, rateLimiter, removeFromCart);
router.delete('/clear', authenticateToken, rateLimiter, clearCart);

export default router;
