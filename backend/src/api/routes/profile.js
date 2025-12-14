import express from 'express';

const router = express.Router();

// بيانات الملف الشخصي (يمكن استبدالها بـ MongoDB لاحقاً)
const profileData = {
  orders: [
    {
      id: '1',
      orderNumber: '#ORD-2024-001',
      date: '2024-12-01',
      status: 'delivered',
      total: '250 ج.م',
      items: 3,
      merchant: 'سوبر ماركت الخير',
      merchantId: 'supermarket-khair-zaman'
    },
    {
      id: '2',
      orderNumber: '#ORD-2024-002',
      date: '2024-12-03',
      status: 'processing',
      total: '180 ج.م',
      items: 2,
      merchant: 'مطعم المزة',
      merchantId: 'restaurant-almaza'
    },
    {
      id: '3',
      orderNumber: '#ORD-2024-003',
      date: '2024-12-05',
      status: 'shipped',
      total: '450 ج.م',
      items: 5,
      merchant: 'محلات الملابس العصرية',
      merchantId: 'clothing-store'
    }
  ],
  bookings: [
    {
      id: '1',
      bookingNumber: '#BK-2024-001',
      date: '2024-12-10',
      time: '14:00',
      status: 'confirmed',
      service: 'حجز طاولة',
      merchant: 'مطعم المزة',
      merchantId: 'restaurant-almaza',
      location: 'القاهرة، المعادي',
      price: 'مجاني',
      duration: '2 ساعة',
      paid: '0 ج.م'
    },
    {
      id: '2',
      bookingNumber: '#BK-2024-002',
      date: '2024-12-12',
      time: '10:00',
      status: 'pending',
      service: 'جلسة تجميل',
      merchant: 'صالون التجميل الأنيق',
      merchantId: 'salon-elegant',
      location: 'القاهرة، مصر الجديدة',
      price: '300 ج.م',
      duration: '1.5 ساعة',
      paid: '150 ج.م'
    }
  ],
  paymentMethods: [
    {
      id: '1',
      type: 'card',
      title: 'بطاقة الائتمان',
      last4: '1234',
      expiryDate: '12/25',
      isDefault: true
    },
    {
      id: '2',
      type: 'bank',
      title: 'الحساب البنكي',
      bankName: 'البنك الأهلي',
      isDefault: false
    }
  ],
  addresses: [
    {
      id: '1',
      type: 'home',
      title: 'المنزل',
      street: 'شارع التحرير',
      building: '15',
      floor: '5',
      apartment: '12',
      city: 'القاهرة',
      governorate: 'القاهرة',
      postalCode: '11511',
      isDefault: true
    },
    {
      id: '2',
      type: 'work',
      title: 'العمل',
      street: 'شارع النيل',
      building: '25',
      floor: '10',
      apartment: '100',
      city: 'الجيزة',
      governorate: 'الجيزة',
      postalCode: '12511',
      isDefault: false
    }
  ],
  jobApplications: [
    {
      id: '1',
      applicationNumber: '#APP-2024-001',
      jobTitle: 'محاسب متخصص',
      company: 'مطعم المزة',
      location: 'القاهرة، المعادي',
      type: 'دوام كامل',
      salary: '8,000 - 12,000 ج.م',
      appliedDate: '2024-12-01',
      status: 'reviewing',
      jobId: '1',
      department: 'المالية'
    },
    {
      id: '2',
      applicationNumber: '#APP-2024-002',
      jobTitle: 'مدير تسويق',
      company: 'صالون التجميل الأنيق',
      location: 'القاهرة، مصر الجديدة',
      type: 'دوام كامل',
      salary: '10,000 - 15,000 ج.م',
      appliedDate: '2024-12-03',
      status: 'applied',
      jobId: '2',
      department: 'التسويق'
    }
  ]
};

// الطلبات
router.get('/orders', (req, res) => {
  try {
    res.json(profileData.orders);
  } catch (error) {
    res.status(500).json({ error: 'خطأ في جلب الطلبات' });
  }
});

// الحجوزات
router.get('/bookings', (req, res) => {
  try {
    res.json(profileData.bookings);
  } catch (error) {
    res.status(500).json({ error: 'خطأ في جلب الحجوزات' });
  }
});

// طرق الدفع
router.get('/payment-methods', (req, res) => {
  try {
    res.json(profileData.paymentMethods);
  } catch (error) {
    res.status(500).json({ error: 'خطأ في جلب طرق الدفع' });
  }
});

// العناوين
router.get('/addresses', (req, res) => {
  try {
    res.json(profileData.addresses);
  } catch (error) {
    res.status(500).json({ error: 'خطأ في جلب العناوين' });
  }
});

// طلبات التوظيف
router.get('/job-applications', (req, res) => {
  try {
    res.json(profileData.jobApplications);
  } catch (error) {
    res.status(500).json({ error: 'خطأ في جلب طلبات التوظيف' });
  }
});

export default router;
