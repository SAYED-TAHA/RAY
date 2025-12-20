import express from 'express';
import DirectoryMerchant from '../../models/DirectoryMerchant.js';
import { authenticateToken, authorize } from '../../middleware/auth.js';
import { rateLimiter, strictRateLimiter } from '../../middleware/rateLimiter.js';

const router = express.Router();

// جلب المتاجر حسب الفئة (للتسوق)
router.get('/shops', rateLimiter, (req, res) => {
  (async () => {
    try {
      const category = req.query.category;
      const filter = {};

      if (category === 'shopping') {
        filter.category = { $in: ['supermarket', 'retail'] };
      }

      const shops = await DirectoryMerchant.find(filter).sort({ createdAt: -1 });
      res.json(shops);
    } catch (error) {
      console.error('Get shops error:', error);
      res.status(500).json({ error: 'خطأ في جلب المتاجر' });
    }
  })();
});

// جلب جميع المتاجر
router.get('/', rateLimiter, (req, res) => {
  (async () => {
    try {
      const filter = {};
      if (req.query.category) {
        filter.category = req.query.category;
      }
      const merchants = await DirectoryMerchant.find(filter).sort({ createdAt: -1 });
      res.json(merchants);
    } catch (error) {
      console.error('Get merchants error:', error);
      res.status(500).json({ error: 'خطأ في جلب المتاجر' });
    }
  })();
});

// جلب متجر واحد
router.get('/:id', rateLimiter, (req, res) => {
  (async () => {
    try {
      const merchant = await DirectoryMerchant.findById(req.params.id);
      if (!merchant) {
        return res.status(404).json({ error: 'المتجر غير موجود' });
      }
      res.json(merchant);
    } catch (error) {
      console.error('Get merchant error:', error);
      res.status(500).json({ error: 'خطأ في جلب بيانات المتجر' });
    }
  })();
});

// جلب عروض المتجر
router.get('/:id/offers', rateLimiter, (req, res) => {
  (async () => {
    try {
      const merchant = await DirectoryMerchant.findById(req.params.id).select('offers');
      if (!merchant) {
        return res.status(404).json({ error: 'المتجر غير موجود' });
      }
      res.json(merchant.offers || []);
    } catch (error) {
      console.error('Get merchant offers error:', error);
      res.status(500).json({ error: 'خطأ في جلب عروض المتجر' });
    }
  })();
});

// جلب منتجات الخصومات للمتجر
router.get('/:id/discounts', rateLimiter, (req, res) => {
  (async () => {
    try {
      const merchant = await DirectoryMerchant.findById(req.params.id).select('discounts');
      if (!merchant) {
        return res.status(404).json({ error: 'المتجر غير موجود' });
      }
      res.json(merchant.discounts || []);
    } catch (error) {
      console.error('Get merchant discounts error:', error);
      res.status(500).json({ error: 'خطأ في جلب المنتجات المخفضة' });
    }
  })();
});

// جلب طاولات المطعم
router.get('/:id/tables', rateLimiter, (req, res) => {
  (async () => {
    try {
      const merchant = await DirectoryMerchant.findById(req.params.id).select('tables');
      if (!merchant) {
        return res.status(404).json({ error: 'المتجر غير موجود' });
      }
      res.json(merchant.tables || []);
    } catch (error) {
      console.error('Get merchant tables error:', error);
      res.status(500).json({ error: 'خطأ في جلب الطاولات' });
    }
  })();
});

export default router;
