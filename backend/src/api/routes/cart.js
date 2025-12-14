import express from 'express';

const router = express.Router();

// بيانات السلة (يمكن استبدالها بـ MongoDB لاحقاً)
const cartItems = [
  { id: 1, name: 'برجر كلاسيك', price: 120, qty: 2, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200' },
  { id: 2, name: 'بيتزا مارجريتا', price: 150, qty: 1, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200' },
];

// جلب عناصر السلة
router.get('/', (req, res) => {
  try {
    res.json({ items: cartItems });
  } catch (error) {
    res.status(500).json({ error: 'خطأ في جلب عناصر السلة' });
  }
});

// إضافة عنصر للسلة
router.post('/', (req, res) => {
  try {
    const { item } = req.body;
    cartItems.push(item);
    res.json({ items: cartItems });
  } catch (error) {
    res.status(500).json({ error: 'خطأ في إضافة العنصر للسلة' });
  }
});

// حذف عنصر من السلة
router.delete('/:id', (req, res) => {
  try {
    const itemId = parseInt(req.params.id);
    const index = cartItems.findIndex(item => item.id === itemId);
    if (index > -1) {
      cartItems.splice(index, 1);
    }
    res.json({ items: cartItems });
  } catch (error) {
    res.status(500).json({ error: 'خطأ في حذف العنصر من السلة' });
  }
});

export default router;
