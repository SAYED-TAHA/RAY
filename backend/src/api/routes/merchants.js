import express from 'express';
import merchantsData from '../../data/merchantsData.js';

const router = express.Router();

// بيانات المتاجر (يمكن استبدالها بـ MongoDB لاحقاً)
// بيانات المتاجر (يمكن استبدالها بـ MongoDB لاحقاً)

// جلب متجر واحد
router.get('/:id', (req, res) => {
  try {
    const merchant = merchantsData[req.params.id];
    if (!merchant) {
      return res.status(404).json({ error: 'المتجر غير موجود' });
    }
    res.json(merchant);
  } catch (error) {
    res.status(500).json({ error: 'خطأ في جلب بيانات المتجر' });
  }
});

// جلب المتاجر حسب الفئة (للتسوق)
router.get('/shops', (req, res) => {
  try {
    const category = req.query.category;
    let shops = Object.values(merchantsData);
    
    if (category === 'shopping') {
      shops = shops.filter(shop => 
        ['supermarket', 'retail'].includes(shop.category)
      );
    }
    
    res.json(shops);
  } catch (error) {
    res.status(500).json({ error: 'خطأ في جلب المتاجر' });
  }
});

// جلب جميع المتاجر
router.get('/', (req, res) => {
  try {
    res.json(Object.values(merchantsData));
  } catch (error) {
    res.status(500).json({ error: 'خطأ في جلب المتاجر' });
  }
});

export default router;
