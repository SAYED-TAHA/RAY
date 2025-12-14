import express from 'express';

const router = express.Router();

// بيانات الوظائف (يمكن استبدالها بـ MongoDB لاحقاً)
const jobsData = [
  {
    id: '1',
    title: 'محاسب متخصص',
    company: 'مطعم المزة',
    location: 'القاهرة، المعادي',
    type: 'full-time',
    category: 'مطاعم',
    salary: '8,000 - 12,000 ج.م',
    posted: 'منذ 2 أيام',
    description: 'نبحث عن محاسب متخصص لإدارة الحسابات اليومية والمصروفات للمطعم',
    requirements: ['خبرة 3+ سنوات', 'إجادة برامج المحاسبة', 'شهادة محاسبة'],
    benefits: ['تأمين صحي', 'إجازة سنوية', 'وجبات مجانية'],
    responsibilities: ['إدارة الحسابات اليومية', 'إعداد التقارير المالية', 'متابعة المدفوعات'],
    logo: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=400',
    rating: 4.5,
    reviews: 12,
    urgent: true,
    featured: true,
    contactInfo: {
      phone: '+20 2 123456789',
      email: 'careers@almazza.com',
      website: 'www.almazza.com'
    },
    companyInfo: {
      size: '50-100 موظف',
      founded: '2015',
      industry: 'مطاعم'
    }
  },
  {
    id: '2',
    title: 'مدير تسويق',
    company: 'صالون التجميل الأنيق',
    location: 'القاهرة، مصر الجديدة',
    type: 'full-time',
    category: 'صالونات',
    salary: '10,000 - 15,000 ج.م',
    posted: 'منذ 3 أيام',
    description: 'مدير تسويق لتطوير استراتيجيات التسويق وجذب عملاء جدد',
    requirements: ['خبرة 5+ سنوات', 'شهادة تسويق', 'مهارات قيادية'],
    benefits: ['عمولات', 'تأمين صحي', 'تدريب متخصص'],
    responsibilities: ['تطوير الاستراتيجيات', 'إدارة الحملات', 'تحليل البيانات'],
    logo: 'https://images.unsplash.com/photo-1560066988-bc21368275c6?w=400',
    rating: 4.8,
    reviews: 8,
    urgent: false,
    featured: true,
    contactInfo: {
      phone: '+20 2 987654321',
      email: 'hr@salon-elegant.com',
      website: 'www.salon-elegant.com'
    },
    companyInfo: {
      size: '20-50 موظف',
      founded: '2018',
      industry: 'صالونات'
    }
  },
  {
    id: '3',
    title: 'مدرب شخصي',
    company: 'الجيم المثالي',
    location: 'القاهرة، الشيخ زايد',
    type: 'part-time',
    category: 'أندية رياضية',
    salary: '150 - 300 ج.م/ساعة',
    posted: 'منذ يوم',
    description: 'مدرب شخصي متخصص لتدريب الأفراد وتصميم برامج رياضية',
    requirements: ['شهادة تدريب', 'خبرة 2+ سنوات', 'مهارات تواصل'],
    benefits: ['مرونة الوقت', 'عمولات', 'تدريب مجاني'],
    responsibilities: ['تدريب العملاء', 'تصميم البرامج', 'متابعة التقدم'],
    logo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
    rating: 4.7,
    reviews: 15,
    urgent: false,
    featured: false,
    contactInfo: {
      phone: '+20 2 555666777',
      email: 'info@gym-ideal.com',
      website: 'www.gym-ideal.com'
    },
    companyInfo: {
      size: '10-20 موظف',
      founded: '2020',
      industry: 'أندية رياضية'
    }
  },
  {
    id: '4',
    title: 'أخصائي علاج طبيعي',
    company: 'مركز العلاج الطبيعي المتقدم',
    location: 'الإسكندرية',
    type: 'full-time',
    category: 'مراكز طبية',
    salary: '12,000 - 18,000 ج.م',
    posted: 'منذ 5 أيام',
    description: 'أخصائي علاج طبيعي لتقديم العلاج للمرضى في مركزنا المتقدم',
    requirements: ['بكالوريوس علاج طبيعي', 'خبرة 3+ سنوات', 'ترخيص مزاولة'],
    benefits: ['تأمين شامل', 'إجازات مرضية', 'تطوير مهني'],
    responsibilities: ['تقديم العلاج', 'متابعة المرضى', 'إعداد التقارير'],
    logo: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400',
    rating: 4.9,
    reviews: 20,
    urgent: true,
    featured: true,
    contactInfo: {
      phone: '+20 3 111222333',
      email: 'careers@physio-center.com',
      website: 'www.physio-center.com'
    },
    companyInfo: {
      size: '30-50 موظف',
      founded: '2016',
      industry: 'مراكز طبية'
    }
  },
  {
    id: '5',
    title: 'مندوب مبيعات',
    company: 'محلات الملابس العصرية',
    location: 'القاهرة، وسط البلد',
    type: 'contract',
    category: 'محلات تجارية',
    salary: '5,000 + عمولات',
    posted: 'منذ أسبوع',
    description: 'مندوب مبيعات لزيادة المبيعات وتوسيع قاعدة العملاء',
    requirements: ['خبرة مبيعات', 'مهارات تواصل', 'رخصة قيادة'],
    benefits: ['عمولات سخية', 'مكافآت', 'تدريب'],
    responsibilities: ['زيارة العملاء', 'تقديم العروض', 'إغلاق الصفقات'],
    logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400',
    rating: 4.3,
    reviews: 6,
    urgent: false,
    featured: false,
    contactInfo: {
      phone: '+20 2 444555666',
      email: 'sales@clothing-store.com',
      website: 'www.clothing-store.com'
    },
    companyInfo: {
      size: '15-30 موظف',
      founded: '2019',
      industry: 'محلات تجارية'
    }
  },
  {
    id: '6',
    title: 'مطور واجهات أمامية',
    company: 'شركة التطوير التقني',
    location: 'القاهرة، 6 أكتوبر',
    type: 'full-time',
    category: 'شركات تقنية',
    salary: '15,000 - 25,000 ج.م',
    posted: 'منذ يومين',
    description: 'مطور واجهات أمامية للعمل على مشاريع الويب والمتاجر الإلكترونية',
    requirements: ['React/Next.js', 'TypeScript', 'خبرة 3+ سنوات'],
    benefits: ['عمل عن بعد', 'تأمين صحي', 'أسهم الشركة'],
    responsibilities: ['تطوير الواجهات', 'تحسين الأداء', 'اختبار الكود'],
    logo: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
    rating: 4.6,
    reviews: 9,
    urgent: false,
    featured: true,
    contactInfo: {
      phone: '+20 2 777888999',
      email: 'careers@tech-dev.com',
      website: 'www.tech-dev.com'
    },
    companyInfo: {
      size: '50-100 موظف',
      founded: '2017',
      industry: 'شركات تقنية'
    }
  }
];

// جلب جميع الوظائف
router.get('/', (req, res) => {
  try {
    res.json(jobsData);
  } catch (error) {
    res.status(500).json({ error: 'خطأ في جلب الوظائف' });
  }
});

// جلب وظيفة واحدة
router.get('/:id', (req, res) => {
  try {
    const job = jobsData.find(j => j.id === req.params.id);
    if (!job) {
      return res.status(404).json({ error: 'الوظيفة غير موجودة' });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: 'خطأ في جلب الوظيفة' });
  }
});

// إضافة وظيفة جديدة
router.post('/', (req, res) => {
  try {
    const newJob = {
      id: Date.now().toString(),
      ...req.body
    };
    jobsData.push(newJob);
    res.status(201).json(newJob);
  } catch (error) {
    res.status(500).json({ error: 'خطأ في إضافة الوظيفة' });
  }
});

export default router;
