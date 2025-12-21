import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/controllers/productController.js';
import { authenticateToken, authenticateTokenOptional, authorize } from '../../middleware/auth.js';
import { validateProductInput, validateObjectId } from '../../middleware/validation.js';
import { rateLimiter, strictRateLimiter } from '../../middleware/rateLimiter.js';

const router = express.Router();

// Public routes
router.get('/', rateLimiter(), authenticateTokenOptional, getProducts);
router.get('/:id', rateLimiter(), authenticateTokenOptional, validateObjectId, getProductById);

// Protected admin routes
router.post('/', 
  strictRateLimiter,
  authenticateToken, 
  authorize('admin', 'merchant'),
  validateProductInput, 
  createProduct
);

router.put('/:id', 
  strictRateLimiter,
  authenticateToken, 
  authorize('admin', 'merchant'),
  validateObjectId, 
  validateProductInput, 
  updateProduct
);

router.delete('/:id', 
  strictRateLimiter,
  authenticateToken, 
  authorize('admin', 'merchant'),
  validateObjectId, 
  deleteProduct
);

export default router;
