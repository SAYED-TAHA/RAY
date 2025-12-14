import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/controllers/productController.js';
import { authenticateToken, requireAdmin } from '../../middleware/auth.js';
import { validateProductInput, validateObjectId } from '../../middleware/validation.js';
import { rateLimiter, strictRateLimiter } from '../../middleware/rateLimiter.js';

const router = express.Router();

// Public routes (rate limiter temporarily disabled)
router.get('/', getProducts);
router.get('/:id', validateObjectId, getProductById);

// Protected admin routes (rate limiter temporarily disabled)
router.post('/', 
  authenticateToken, 
  requireAdmin, 
  validateProductInput, 
  createProduct
);

router.put('/:id', 
  authenticateToken, 
  requireAdmin, 
  validateObjectId, 
  validateProductInput, 
  updateProduct
);

router.delete('/:id', 
  authenticateToken, 
  requireAdmin, 
  validateObjectId, 
  deleteProduct
);

export default router;
