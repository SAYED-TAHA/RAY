import express from 'express';
import Offer from '../../models/Offer.js';
import { authenticateToken, authorize } from '../../middleware/auth.js';
import { rateLimiter, strictRateLimiter } from '../../middleware/rateLimiter.js';

const router = express.Router();

// جلب كل العروض
router.get('/', rateLimiter, (req, res) => {
  (async () => {
    try {
      const filter = {};
      if (req.query.featured !== undefined) {
        filter.featured = String(req.query.featured) === 'true';
      }
      if (req.query.category) {
        filter.category = req.query.category;
      }
      const offers = await Offer.find(filter).sort({ createdAt: -1 });
      res.json(offers);
    } catch (error) {
      console.error('Get offers error:', error);
      res.status(500).json({ error: 'خطأ في جلب العروض' });
    }
  })();
});

// جلب العروض المميزة
router.get('/featured', rateLimiter, (req, res) => {
  (async () => {
    try {
      const offers = await Offer.find({ featured: true }).sort({ createdAt: -1 }).limit(4);
      res.json(offers);
    } catch (error) {
      console.error('Get featured offers error:', error);
      res.status(500).json({ error: 'خطأ في جلب العروض' });
    }
  })();
});

// جلب عرض واحد
router.get('/:id', rateLimiter, (req, res) => {
  (async () => {
    try {
      const offer = await Offer.findById(req.params.id);
      if (!offer) {
        return res.status(404).json({ error: 'العرض غير موجود' });
      }
      res.json(offer);
    } catch (error) {
      console.error('Get offer error:', error);
      res.status(500).json({ error: 'خطأ في جلب العرض' });
    }
  })();
});

// إضافة عرض جديد (للإدمن)
router.post('/', authenticateToken, authorize('admin'), strictRateLimiter, (req, res) => {
  (async () => {
    try {
      const { title, shop, image, price, oldPrice, rating, tag, category, merchantId, featured } = req.body;

      if (!title || !shop || !image || !price || rating === undefined) {
        return res.status(400).json({ error: 'البيانات المطلوبة ناقصة' });
      }

      const offer = await Offer.create({
        title,
        shop,
        image,
        price,
        oldPrice,
        rating,
        tag,
        category,
        merchantId,
        featured: Boolean(featured)
      });

      res.status(201).json(offer);
    } catch (error) {
      console.error('Create offer error:', error);
      res.status(500).json({ error: 'خطأ في إضافة العرض' });
    }
  })();
});

// تحديث عرض
router.put('/:id', authenticateToken, authorize('admin'), strictRateLimiter, (req, res) => {
  (async () => {
    try {
      const offer = await Offer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!offer) {
        return res.status(404).json({ error: 'العرض غير موجود' });
      }
      res.json(offer);
    } catch (error) {
      console.error('Update offer error:', error);
      res.status(500).json({ error: 'خطأ في تحديث العرض' });
    }
  })();
});

// حذف عرض
router.delete('/:id', authenticateToken, authorize('admin'), strictRateLimiter, (req, res) => {
  (async () => {
    try {
      const offer = await Offer.findByIdAndDelete(req.params.id);
      if (!offer) {
        return res.status(404).json({ error: 'العرض غير موجود' });
      }
      res.json(offer);
    } catch (error) {
      console.error('Delete offer error:', error);
      res.status(500).json({ error: 'خطأ في حذف العرض' });
    }
  })();
});

export default router;
