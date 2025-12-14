import express from 'express';
import merchantsData from '../../data/merchantsData.js';

const router = express.Router();

// Helper function to generate a random price
const getRandomPrice = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Generate dynamic offers from merchants data
const allOffers = Object.values(merchantsData).map(merchant => {
  const price = getRandomPrice(50, 500);
  const oldPrice = price * (1 + Math.random() * 0.5 + 0.2).toFixed(2); // 20-70% higher
  const discount = Math.round(((oldPrice - price) / oldPrice) * 100);

  return {
    id: merchant.id,
    title: `خصم ${discount}% على ${merchant.type}`,
    shop: merchant.name,
    image: merchant.cover || merchant.image,
    price: price.toFixed(2),
    oldPrice: oldPrice.toFixed(2),
    rating: merchant.rating,
    tag: `خصم ${discount}%`,
    category: merchant.category,
  };
});

// بيانات العروض المميزة (يمكن استبدالها بـ MongoDB لاحقاً)
const featuredOffers = allOffers.slice(0, 4);

// جلب كل العروض
router.get('/', (req, res) => {
  try {
    res.json(allOffers);
  } catch (error) {
    res.status(500).json({ error: 'خطأ في جلب العروض' });
  }
});

// جلب العروض المميزة
router.get('/featured', (req, res) => {
  try {
    res.json(featuredOffers);
  } catch (error) {
    res.status(500).json({ error: 'خطأ في جلب العروض' });
  }
});

// جلب عرض واحد
router.get('/:id', (req, res) => {
  try {
    const offer = featuredOffers.find(o => o.id === req.params.id);
    if (!offer) {
      return res.status(404).json({ error: 'العرض غير موجود' });
    }
    res.json(offer);
  } catch (error) {
    res.status(500).json({ error: 'خطأ في جلب العرض' });
  }
});

// إضافة عرض جديد (للإدمن)
router.post('/', (req, res) => {
  try {
    const { title, shop, image, price, oldPrice, rating, tag } = req.body;
    
    if (!title || !shop || !image || !price || rating === undefined) {
      return res.status(400).json({ error: 'البيانات المطلوبة ناقصة' });
    }

    const newOffer = {
      id: Date.now().toString(),
      title,
      shop,
      image,
      price,
      oldPrice,
      rating,
      tag
    };

    featuredOffers.push(newOffer);
    res.status(201).json(newOffer);
  } catch (error) {
    res.status(500).json({ error: 'خطأ في إضافة العرض' });
  }
});

// تحديث عرض
router.put('/:id', (req, res) => {
  try {
    const offer = featuredOffers.find(o => o.id === req.params.id);
    if (!offer) {
      return res.status(404).json({ error: 'العرض غير موجود' });
    }

    const { title, shop, image, price, oldPrice, rating, tag } = req.body;
    
    if (title) offer.title = title;
    if (shop) offer.shop = shop;
    if (image) offer.image = image;
    if (price) offer.price = price;
    if (oldPrice) offer.oldPrice = oldPrice;
    if (rating !== undefined) offer.rating = rating;
    if (tag) offer.tag = tag;

    res.json(offer);
  } catch (error) {
    res.status(500).json({ error: 'خطأ في تحديث العرض' });
  }
});

// حذف عرض
router.delete('/:id', (req, res) => {
  try {
    const index = featuredOffers.findIndex(o => o.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'العرض غير موجود' });
    }

    const deletedOffer = featuredOffers.splice(index, 1);
    res.json(deletedOffer[0]);
  } catch (error) {
    res.status(500).json({ error: 'خطأ في حذف العرض' });
  }
});

export default router;
