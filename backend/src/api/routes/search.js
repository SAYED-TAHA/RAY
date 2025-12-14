import express from 'express';
import {
  searchProducts,
  getSuggestions,
  getPopularKeywords
} from '../controllers/controllers/searchController.js';
import { rateLimiter } from '../../middleware/rateLimiter.js';

const router = express.Router();

// Search products with advanced filters (rate limiter temporarily disabled)
router.get('/', searchProducts);

// Get search suggestions (rate limiter temporarily disabled)
router.get('/suggestions', getSuggestions);

// Get popular keywords (rate limiter temporarily disabled)
router.get('/keywords/popular', getPopularKeywords);

export default router;
