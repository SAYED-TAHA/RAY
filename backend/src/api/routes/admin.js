import express from 'express';

const router = express.Router();

// بيانات الإدمن (يمكن استبدالها بـ MongoDB لاحقاً)
const adminData = {
  financialAnalysis: {
    analysis: {
      revenue: 2456789,
      expenses: 1234567,
      profit: 1222222,
      marginPercentage: 49.7,
      growthRate: 12.5,
      roi: 85.3
    },
    monthlyData: [
      { month: 'يناير', revenue: 2100000, expenses: 950000, profit: 1150000 },
      { month: 'فبراير', revenue: 2300000, expenses: 1000000, profit: 1300000 },
      { month: 'مارس', revenue: 2456789, expenses: 1234567, profit: 1222222 }
    ]
  },
  expenses: [
    { category: 'الرواتب والأجور', amount: 450000, percentage: 40, trend: 2.5 },
    { category: 'البنية التحتية', amount: 225000, percentage: 20, trend: -1.2 },
    { category: 'التسويق والإعلانات', amount: 180000, percentage: 16, trend: 8.3 },
    { category: 'العمليات والصيانة', amount: 135000, percentage: 12, trend: 3.1 },
    { category: 'البحث والتطوير', amount: 90000, percentage: 8, trend: 5.7 },
    { category: 'أخرى', amount: 45000, percentage: 4, trend: 0 }
  ],
  conversions: [
    { source: 'الموقع الرئيسي', visitors: 5234, conversions: 523, rate: 9.98, trend: 'up' },
    { source: 'تطبيق الموبايل', visitors: 3456, conversions: 412, rate: 11.92, trend: 'up' },
    { source: 'البريد الإلكتروني', visitors: 2123, conversions: 298, rate: 14.05, trend: 'up' },
    { source: 'وسائل التواصل', visitors: 4567, conversions: 456, rate: 9.98, trend: 'down' },
    { source: 'الإعلانات المدفوعة', visitors: 3234, conversions: 567, rate: 17.53, trend: 'up' }
  ],
  revenue: [
    { source: 'المتجر الإلكتروني', amount: 1234567, percentage: 45, trend: 12.5 },
    { source: 'الخدمات', amount: 890123, percentage: 32, trend: 8.3 },
    { source: 'الاشتراكات', amount: 567890, percentage: 20, trend: 23.7 },
    { source: 'الإعلانات', amount: 123456, percentage: 3, trend: -5.2 }
  ],
  profit: [
    { month: 'يناير', revenue: 2500000, expenses: 1000000, profit: 1500000, margin: 60 },
    { month: 'فبراير', revenue: 2700000, expenses: 1050000, profit: 1650000, margin: 61 },
    { month: 'مارس', revenue: 2900000, expenses: 1100000, profit: 1800000, margin: 62 },
    { month: 'أبريل', revenue: 2600000, expenses: 1125000, profit: 1475000, margin: 57 }
  ]
};

// التحليل المالي
router.get('/financial-analysis', (req, res) => {
  try {
    res.json(adminData.financialAnalysis);
  } catch (error) {
    res.status(500).json({ error: 'خطأ في جلب البيانات المالية' });
  }
});

// الرسائل
router.get('/messages', (req, res) => {
  try {
    const messages = [
      {
        id: 'MSG001',
        sender: 'أحمد محمد',
        email: 'ahmed@email.com',
        phone: '+20 123 456 7890',
        subject: 'استفسار عن المنتجات',
        message: 'أود الاستفسار عن المنتجات المتوفرة وأسعارها. هل يوجد خصم على الكميات الكبيرة؟',
        date: '2025-12-05 14:30',
        status: 'unread',
        priority: 'high',
        category: 'inquiry',
        attachments: 0
      },
      {
        id: 'MSG002',
        sender: 'سارة أحمد',
        email: 'sara@email.com',
        phone: '+20 987 654 3210',
        subject: 'مشكلة في الطلب',
        message: 'لقد وصلني الطلب ولكن هناك منتج ناقص. رقم الطلب ORD1234',
        date: '2025-12-05 12:15',
        status: 'read',
        priority: 'medium',
        category: 'complaint',
        attachments: 2
      },
      {
        id: 'MSG003',
        sender: 'محمد علي',
        email: 'mohammed@email.com',
        phone: '+20 555 123 4567',
        subject: 'شكر وتقدير',
        message: 'أشكركم على الخدمة الممتازة والمنتجات عالية الجودة. سأستمر في التعامل معكم.',
        date: '2025-12-04 18:45',
        status: 'replied',
        priority: 'low',
        category: 'feedback',
        attachments: 0
      },
      {
        id: 'MSG004',
        sender: 'فاطمة حسن',
        email: 'fatima@email.com',
        phone: '+20 777 987 6543',
        subject: 'طلب استرداد أموال',
        message: 'أرغب في استرداد أموال الطلب ORD5678 بسبب عدم ملاءمة المنتج.',
        date: '2025-12-04 16:20',
        status: 'pending',
        priority: 'high',
        category: 'refund',
        attachments: 1
      }
    ];
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'خطأ في جلب الرسائل' });
  }
});

// المصروفات
router.get('/expenses', (req, res) => {
  try {
    res.json(adminData.expenses);
  } catch (error) {
    res.status(500).json({ error: 'خطأ في جلب بيانات المصروفات' });
  }
});

// التحويلات
router.get('/conversions', (req, res) => {
  try {
    res.json(adminData.conversions);
  } catch (error) {
    res.status(500).json({ error: 'خطأ في جلب بيانات التحويلات' });
  }
});

// الإيرادات
router.get('/revenue', (req, res) => {
  try {
    const period = req.query.period || 'month';
    res.json(adminData.revenue);
  } catch (error) {
    res.status(500).json({ error: 'خطأ في جلب بيانات الإيرادات' });
  }
});

// الأرباح
router.get('/profit', (req, res) => {
  try {
    res.json(adminData.profit);
  } catch (error) {
    res.status(500).json({ error: 'خطأ في جلب بيانات الأرباح' });
  }
});

// الإشعارات
router.get('/notifications', (req, res) => {
  try {
    const notifications = [
      {
        id: 'NOT001',
        title: 'تحديث النظام',
        message: 'سيتم تحديث النظام غداً الساعة 2 صباحاً. يرجى حفظ جميع أعمالك.',
        type: 'system',
        priority: 'high',
        status: 'sent',
        recipients: 'all_users',
        sentAt: '2025-12-05 14:30',
        scheduledAt: null,
        readBy: 12345,
        totalRecipients: 15234,
        deliveryRate: 81.2,
        createdBy: 'Admin'
      },
      {
        id: 'NOT002',
        title: 'عرض خاص',
        message: 'خصم 20% على جميع المنتجات لمدة 48 ساعة فقط!',
        type: 'promotion',
        priority: 'medium',
        status: 'scheduled',
        recipients: 'customers',
        sentAt: null,
        scheduledAt: '2025-12-06 09:00',
        readBy: 0,
        totalRecipients: 8456,
        deliveryRate: 0,
        createdBy: 'Marketing'
      },
      {
        id: 'NOT003',
        title: 'صيانة الخادم',
        message: 'سيتم إجراء صيانة دورية على الخوادم من الساعة 11 مساءً حتى 2 صباحاً.',
        type: 'maintenance',
        priority: 'medium',
        status: 'sent',
        recipients: 'all_users',
        sentAt: '2025-12-04 20:15',
        scheduledAt: null,
        readBy: 9876,
        totalRecipients: 15234,
        deliveryRate: 64.8,
        createdBy: 'IT'
      }
    ];
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: 'خطأ في جلب الإشعارات' });
  }
});

export default router;
