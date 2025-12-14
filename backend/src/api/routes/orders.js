import express from 'express';

const router = express.Router();

// بيانات الطلبات (يمكن استبدالها بـ MongoDB لاحقاً)
const orders = {
  'ORD-9921': {
    id: '#ORD-9921',
    restaurant: 'مطعم النور للمأكولات',
    items: [
      { name: 'برجر كلاسيك', qty: 2, price: 160 },
      { name: 'بطاطس مقلية', qty: 1, price: 40 },
      { name: 'بيبسي', qty: 2, price: 30 },
    ],
    total: 280,
    deliveryFee: 20,
    status: 'delivering',
    driver: {
      name: 'كابتن محمد',
      rating: 4.9,
      phone: '010xxxxxxx',
      image: 'https://ui-avatars.com/api/?name=Mohamed+Ali&background=0D8ABC&color=fff'
    }
  }
};

// جلب طلب محدد
router.get('/:id', (req, res) => {
  try {
    const orderId = req.params.id;
    const order = orders[orderId] || orders['ORD-9921']; // Fallback to default order
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'خطأ في جلب بيانات الطلب' });
  }
});

// جلب الطلب الحالي
router.get('/current', (req, res) => {
  try {
    res.json(orders['ORD-9921']);
  } catch (error) {
    res.status(500).json({ error: 'خطأ في جلب بيانات الطلب الحالي' });
  }
});

export default router;
