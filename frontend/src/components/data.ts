
import { 
  ShoppingBag, Utensils, Home, Car, Sparkles, Stethoscope, 
  GraduationCap, Ticket, Dumbbell, Wrench, Store, ChefHat, Pill, Shirt, Droplets, Scissors
} from 'lucide-react';

export interface SubCategory {
  id: string;
  name: string;
}

export interface MainCategory {
  id: string;
  name: string;
  icon: any;
  color: string;
  sub: SubCategory[];
}

export const allCategories: MainCategory[] = [
  {
    id: 'shopping',
    name: 'التسوق والمحلات',
    icon: ShoppingBag,
    color: 'bg-blue-50 text-ray-blue',
    sub: [
      { id: 'supermarket', name: 'السوبر ماركت والبقالة' },
      { id: 'fashion', name: 'الأزياء والموضة' },
      { id: 'electronics', name: 'الإلكترونيات' },
      { id: 'books', name: 'المكتبات والكتب' },
      { id: 'flowers', name: 'الورود والهدايا' },
      { id: 'crafts', name: 'الحرف اليدوية' }
    ]
  },
  {
    id: 'food',
    name: 'المطاعم والمقاهي',
    icon: Utensils,
    color: 'bg-orange-50 text-orange-600',
    sub: [
      { id: 'fastfood', name: 'مطاعم الوجبات السريعة' },
      { id: 'family', name: 'المطاعم العائلية' },
      { id: 'cafes', name: 'الكافيهات' },
      { id: 'desserts', name: 'الحلويات' },
      { id: 'healthy', name: 'الأكل الصحي' }
    ]
  },
  {
    id: 'services',
    name: 'الخدمات والمغاسل',
    icon: Wrench,
    color: 'bg-cyan-50 text-cyan-700',
    sub: [
      { id: 'laundry', name: 'المغاسل والدراي كلين' },
      { id: 'electric', name: 'كهربائيين' },
      { id: 'plumber', name: 'سباكين' },
      { id: 'cleaning', name: 'شركات تنظيف' },
      { id: 'tech', name: 'فنيي الأجهزة' }
    ]
  },
  {
    id: 'realestate',
    name: 'العقارات',
    icon: Home,
    color: 'bg-green-50 text-green-600',
    sub: [
      { id: 'sale', name: 'شقق للبيع' },
      { id: 'rent', name: 'شقق للإيجار' },
      { id: 'commercial', name: 'عقارات تجارية' },
      { id: 'chalets', name: 'شاليهات ومصايف' },
      { id: 'land', name: 'أراضي' }
    ]
  },
  {
    id: 'cars',
    name: 'السيارات',
    icon: Car,
    color: 'bg-red-50 text-red-600',
    sub: [
      { id: 'new', name: 'معارض سيارات جديدة' },
      { id: 'used', name: 'سيارات مستعملة' },
      { id: 'parts', name: 'قطع غيار' },
      { id: 'maintenance', name: 'ورش صيانة' },
      { id: 'rental', name: 'تأجير سيارات' }
    ]
  },
  {
    id: 'beauty',
    name: 'الجيم والصالة',
    icon: Sparkles,
    color: 'bg-pink-50 text-pink-600',
    sub: [
      { id: 'gym', name: 'جيم أونلاين' },
      { id: 'fitness', name: 'صالات رياضية' },
      { id: 'spa', name: 'سبا ومساج' },
      { id: 'women', name: 'صالونات نسائية' },
      { id: 'men', name: 'صالونات رجالية' }
    ]
  },
  {
    id: 'health',
    name: 'الصحة والطب',
    icon: Stethoscope,
    color: 'bg-teal-50 text-teal-600',
    sub: [
      { id: 'clinic', name: 'عيادات عامة' },
      { id: 'dentist', name: 'عيادات أسنان' },
      { id: 'optics', name: 'مراكز بصريات' },
      { id: 'pharmacy', name: 'صيدليات' },
      { id: 'lab', name: 'معامل تحاليل' }
    ]
  },
];

export interface Offer {
  id: number;
  title: string;
  shop: string;
  image: string;
  price: string;
  oldPrice: string;
  rating: number;
  tag?: string;
}

export const featuredOffers: Offer[] = [
  { id: 1, title: 'خصم 50% على البرجر', shop: 'مطعم النور', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', price: '80 ج', oldPrice: '160 ج', rating: 4.8, tag: 'خصم 50%' },
  { id: 2, title: 'عروض الصيف - كاجوال', shop: 'فاشون ستور', image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', price: '199 ج', oldPrice: '350 ج', rating: 4.5 },
  { id: 3, title: 'غسيل وكوي بدلة', shop: 'دراي كلين', image: 'https://images.unsplash.com/photo-1582735689369-4fe8d7499698?auto=format&fit=crop&w=500&q=60', price: '40 ج', oldPrice: '60 ج', rating: 4.9 },
  { id: 4, title: 'تغيير زيت وفلتر', shop: 'مركز الصيانة', image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', price: '450 ج', oldPrice: '600 ج', rating: 4.7, tag: 'خدمة سريعة' },
];

export const systemsData: Record<string, any> = {
  retail: {
    id: 'retail',
    title: 'نظام إدارة محلات التجزئة',
    description: 'النظام الأمثل لإدارة السوبر ماركت، محلات الملابس، والأحذية. حوّل محلك لمتجر ذكي مع كاشير سريع ومخزون دقيق.',
    icon: Store,
    features: [
      { title: 'كاشير ذكي (POS)', desc: 'بيع بسرعة وسهولة من الموبايل أو الكمبيوتر، ويعمل بدون إنترنت.' },
      { title: 'إدارة مخزون دقيقة', desc: 'تتبع كل قطعة في محلك مع تنبيهات للنواقص وتواريخ الصلاحية.' },
      { title: 'فواتير وباركود', desc: 'اطبع فواتير احترافية وملصقات الباركود لمنتجاتك بضغطة زر.' },
      { title: 'متجر إلكتروني مجاني', desc: 'احصل على صفحة خاصة لمحلك تعرض فيها منتجاتك ويطلب منها العملاء.' }
    ],
    benefits: [
      { title: 'زيادة الأرباح', desc: 'تحليلات دقيقة للمبيعات تساعدك في التركيز على المنتجات الرابحة.' },
      { title: 'توفير الوقت', desc: 'عمليات جرد وبيع أسرع توفر ساعات يومياً من وقتك وموظفيك.' },
      { title: 'منع الخسائر', desc: 'تنبيهات النواقص وتواريخ الصلاحية تقلل الهالك والسرقات.' },
      { title: 'اتخاذ قرارات صحيحة', desc: 'تقارير يومية وشهرية توضح لك اتجاهات السوق وطلب العملاء.' }
    ],
    color: 'from-blue-600 to-blue-800',
    accent: 'text-blue-600',
    bg: 'bg-blue-50',
    image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=1000&q=80'
  },
  clothing: {
    id: 'clothing',
    title: 'نظام إدارة محلات الملابس',
    description: 'نظام متخصص لمحلات الأزياء والأحذية. إدارة المقاسات والألوان، والباركود الذكي، ومتابعة المخزون بدقة.',
    icon: Shirt,
    features: [
      { title: 'إدارة المقاسات والألوان', desc: 'تتبع كل قطعة حسب الموديل واللون والمقاس لضمان دقة المخزون.' },
      { title: 'طباعة باركود للملابس', desc: 'إنشاء وطباعة ملصقات باركود مخصصة لكل قطعة.' },
      { title: 'إدارة التبديل والمرتجع', desc: 'نظام مرن للتعامل مع سياسات الاستبدال والاسترجاع.' },
      { title: 'تقارير الموديلات', desc: 'اعرف أكثر الموديلات مبيعاً وأيها يحتاج لتخفيضات.' }
    ],
    benefits: [
      { title: 'تنظيم المخزون', desc: 'القضاء على فوضى المقاسات والألوان في المخزن.' },
      { title: 'سرعة الكاشير', desc: 'بيع سريع باستخدام الباركود لتقليل وقت انتظار العملاء.' },
      { title: 'تحليل الموضة', desc: 'معرفة اتجاهات الشراء وتفضيلات العملاء في المواسم المختلفة.' },
      { title: 'تجربة عميل مميزة', desc: 'سهولة البحث عن المقاسات المتاحة تزيد من رضا العملاء.' }
    ],
    color: 'from-pink-600 to-purple-800',
    accent: 'text-pink-600',
    bg: 'bg-pink-50',
    image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=1000&q=80'
  },
  restaurant: {
    id: 'restaurant',
    title: 'نظام إدارة المطاعم والكافيهات',
    description: 'سيطر على مطعمك بالكامل. من أول استلام الطلب، للمطبخ، لحد التوصيل والحسابات. كل ده في نظام واحد.',
    icon: ChefHat,
    features: [
      { title: 'منيو رقمي QR', desc: 'وفر لعملائك منيو تفاعلي بالصور يطلبوا منه مباشرة من الطاولة.' },
      { title: 'إدارة الطاولات', desc: 'خريطة كاملة لمطعمك لمتابعة حالة الطاولات والحجوزات لحظة بلحظة.' },
      { title: 'شاشة مطبخ (KDS)', desc: 'نظم طلباتك في المطبخ واستغني عن الورق والأخطاء.' },
      { title: 'إدارة التوصيل', desc: 'ربط كامل مع الطيارين وشركات التوصيل لتتبع الطلبات.' }
    ],
    benefits: [
      { title: 'خدمة أسرع', desc: 'تقليل وقت التحضير والانتظار يرفع رضا العملاء ويزيد الدوران.' },
      { title: 'تحكم كامل', desc: 'مراقبة المخزون والمقادير (Recipe Costing) تمنع الهدر والسرقات.' },
      { title: 'ولاء العملاء', desc: 'نظام النقاط والعروض المخصص يعيد العملاء لمطعمك مرة أخرى.' },
      { title: 'تنظيم المطبخ', desc: 'شاشات KDS تنهي فوضى الأوراق وتضمن خروج الطلبات بالترتيب الصحيح.' }
    ],
    color: 'from-orange-500 to-red-600',
    accent: 'text-orange-600',
    bg: 'bg-orange-50',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1000&q=80'
  },
  laundry: {
    id: 'laundry',
    title: 'نظام إدارة المغاسل والدراي كلين',
    description: 'النظام المتخصص لإدارة دورة الغسيل بالكامل، من الاستلام للتسليم، مع تتبع دقيق لكل قطعة ملابس.',
    icon: Shirt,
    features: [
      { title: 'تتبع القطع (Item Tracking)', desc: 'نظام تتبع دقيق لكل قطعة ملابس ومرحلة الغسيل (غسيل، كوي، تجهيز) باستخدام التاجات والباركود لضمان عدم الضياع.' },
      { title: 'إدارة الاشتراكات (Subscriptions)', desc: 'إدارة اشتراكات العملاء والباقات الشهرية (عدد قطع أو قيمة) مع التجديد التلقائي ومتابعة الرصيد.' },
      { title: 'إشعارات العملاء (Notifications)', desc: 'إرسال رسائل SMS أو واتساب للعميل تلقائياً عند الانتهاء من الغسيل وجاهزية الملابس للاستلام.' },
      { title: 'طباعة الفواتير (Receipts)', desc: 'طباعة فواتير استلام وتسليم احترافية وتاجات حرارية للملابس.' }
    ],
    benefits: [
      { title: 'عدم ضياع القطع', desc: 'نظام تتبع صارم لكل قطعة ملابس يمنع الأخطاء والتبديل.' },
      { title: 'تسليم في الموعد', desc: 'تنظيم مراحل الغسيل يضمن الالتزام بالمواعيد مع العملاء.' },
      { title: 'تواصل أفضل', desc: 'رسائل تلقائية تبقي العميل على اطلاع دائم بحالة ملابسه.' },
      { title: 'زيادة الكفاءة', desc: 'معرفة مكان كل قطعة في أي وقت يوفر وقت البحث والفرز.' }
    ],
    color: 'from-cyan-600 to-blue-600',
    accent: 'text-cyan-600',
    bg: 'bg-cyan-50',
    image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb8f?auto=format&fit=crop&w=1000&q=80'
  },
  services: {
    id: 'services',
    title: 'نظام إدارة الخدمات والصيانة',
    description: 'لشركات النظافة، الصيانة، والخدمات المنزلية. نظم مواعيدك وفريق عملك وارفع كفاءة التشغيل.',
    icon: Wrench,
    features: [
      { title: 'جدولة الزيارات', desc: 'وزع المهام على الفنيين بذكاء حسب الموقع والتخصص.' },
      { title: 'تتبع الفريق GPS', desc: 'اعرف مكان فريقك ووقت الوصول والانتهاء من كل مهمة.' },
      { title: 'فواتير خدمات', desc: 'أصدر فواتير دقيقة تشمل قطع الغيار والمصنعية.' },
      { title: 'تقييمات العملاء', desc: 'اجمع آراء العملاء بعد كل خدمة لتحسين الأداء.' }
    ],
    benefits: [
      { title: 'كفاءة التشغيل', desc: 'توزيع ذكي للمهام يرفع إنتاجية الفنيين ويقلل وقت التنقل.' },
      { title: 'جودة الخدمة', desc: 'تقييمات ومتابعة دورية تضمن تقديم أعلى مستويات الجودة.' },
      { title: 'ضبط التكاليف', desc: 'حساب دقيق لقطع الغيار والمصنعية يضمن هامش ربح جيد.' },
      { title: 'مصداقية أعلى', desc: 'الالتزام بالمواعيد والفواتير الرسمية يبني ثقة قوية مع العملاء.' }
    ],
    color: 'from-gray-700 to-gray-900',
    accent: 'text-gray-700',
    bg: 'bg-gray-100',
    image: 'https://images.unsplash.com/photo-1581578014828-160951805da8?auto=format&fit=crop&w=1000&q=80'
  },
  realestate: {
    id: 'realestate',
    title: 'نظام إدارة العقارات',
    description: 'اعرض عقاراتك باحترافية، ونظم مواعيد المعاينات، وتابع عملائك في مكان واحد لتغلق صفقات أكثر.',
    icon: Home,
    features: [
      { title: 'معرض عقاري 360°', desc: 'ارفع صور وفيديوهات وجولات افتراضية لعقاراتك لتبهر العملاء.' },
      { title: 'إدارة العقود والتحصيل', desc: 'تابع الأقساط ومواعيد الإيجار مع تنبيهات تلقائية.' },
      { title: 'جدولة المعاينات', desc: 'نظم مواعيدك مع العملاء وأرسل لهم تذكيرات تلقائية.' },
      { title: 'CRM للمطورين', desc: 'سجل كل مكالمة وتفاعل مع العملاء لضمان أفضل متابعة.' }
    ],
    benefits: [
      { title: 'إغلاق صفقات أكثر', desc: 'متابعة العملاء (Leads) بدقة تزيد فرص البيع بشكل ملحوظ.' },
      { title: 'تنظيم المواعيد', desc: 'جدول معاينات منظم يمنع التضارب ويظهر الاحترافية أمام العميل.' },
      { title: 'وصول أوسع', desc: 'معرض عقاري أونلاين يجذب عملاء من كل مكان وليس المحليين فقط.' },
      { title: 'تحصيل منتظم', desc: 'تنبيهات الأقساط والإيجارات تضمن التدفق المالي المنتظم.' }
    ],
    color: 'from-green-600 to-emerald-800',
    accent: 'text-green-600',
    bg: 'bg-green-50',
    image: 'https://images.unsplash.com/photo-1560518883-3d1312f9c1be?auto=format&fit=crop&w=1000&q=80'
  },
  cars: {
    id: 'cars',
    title: 'نظام معارض السيارات',
    description: 'أدر معرضك، مخزون السيارات، وحسابات الأقساط والعملاء بسهولة واحترافية.',
    icon: Car,
    features: [
      { title: 'إدارة المخزون', desc: 'سجل كل سيارة بمواصفاتها وصورها وحالتها الفنية.' },
      { title: 'حاسبة أقساط', desc: 'احسب الأقساط والفوائد واطبع جداول السداد للعملاء.' },
      { title: 'طلبات التجربة', desc: 'نظم مواعيد تجربة القيادة واجمع بيانات المهتمين.' },
      { title: 'عقود إلكترونية', desc: 'أصدر عقود بيع وشراء موثقة ومطبوعة فورياً.' }
    ],
    benefits: [
      { title: 'إدارة احترافية', desc: 'كل سيارة لها ملف كامل من الشراء للبيع يشمل التكاليف والصيانة.' },
      { title: 'حسابات دقيقة', desc: 'نظام أقساط آلي يضبط التدفقات المالية ويحسب الفوائد بدقة.' },
      { title: 'ثقة العملاء', desc: 'عقود وتقارير فحص موثقة تبني سمعة قوية للمعرض.' },
      { title: 'تسويق فعال', desc: 'قاعدة بيانات العملاء تساعدك في إعادة استهدافهم بعروض جديدة.' }
    ],
    color: 'from-red-600 to-red-800',
    accent: 'text-red-600',
    bg: 'bg-red-50',
    image: 'https://images.unsplash.com/photo-1562519819-016930ada31b?auto=format&fit=crop&w=1000&q=80'
  },
  clinic: {
    id: 'clinic',
    title: 'نظام إدارة العيادات',
    description: 'ركز في علاج مرضاك وسيب الإدارة علينا. ملفات إلكترونية، حجوزات، وروشيتات في نظام طبي متكامل.',
    icon: Stethoscope,
    features: [
      { title: 'حجز مواعيد ذكي', desc: 'نظام حجز يمنع التكدس ويرسل تذكيرات للمرضى.' },
      { title: 'ملف مريض إلكتروني', desc: 'تاريخ مرضي كامل، تحاليل، وأشعة في مكان واحد.' },
      { title: 'روشتة إلكترونية', desc: 'اطبع روشتات احترافية واحفظ الأدوية المفضلة لديك.' },
      { title: 'تقارير مالية', desc: 'تابع إيرادات العيادة والمصروفات بدقة.' }
    ],
    benefits: [
      { title: 'راحة المرضى', desc: 'حجز منظم يقلل الانتظار ويحترم وقت المريض والطبيب.' },
      { title: 'ملفات منظمة', desc: 'تاريخ مرضي كامل بضغطة زر يساعد في تشخيص أدق وعلاج أفضل.' },
      { title: 'كفاءة مالية', desc: 'ضبط الإيرادات والمصروفات يمنع التلاعب والأخطاء الحسابية.' },
      { title: 'صورة احترافية', desc: 'الروشتات والحجز الإلكتروني يعطي انطباعاً ممتازاً عن العيادة.' }
    ],
    color: 'from-teal-500 to-cyan-700',
    accent: 'text-teal-600',
    bg: 'bg-teal-50',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80'
  },
  pharmacy: {
    id: 'pharmacy',
    title: 'نظام إدارة الصيدليات',
    description: 'إدارة شاملة للصيدلية من المخزون وتواريخ الصلاحية، للروشتات الإلكترونية وملفات المرضى.',
    icon: Pill,
    features: [
      { title: 'إدارة الروشتات', desc: 'ربط مع العيادات لاستقبال الروشتات وصرفها بدقة.' },
      { title: 'تنبيهات الصلاحية', desc: 'نظام ذكي ينبهك قبل انتهاء صلاحية الأدوية بفترة كافية.' },
      { title: 'البدائل والمثائل', desc: 'قاعدة بيانات للأدوية تقترح البدائل المتاحة في حالة النواقص.' },
      { title: 'حسابات الموردين', desc: 'إدارة فواتير الشراء وحسابات شركات الأدوية.' }
    ],
    benefits: [
      { title: 'إدارة الصلاحية', desc: 'تنبيهات مبكرة قبل انتهاء الصلاحية لتقليل الخسائر والمرتجعات.' },
      { title: 'بدائل ذكية', desc: 'اقتراح البدائل المتاحة فوراً عند نقص دواء لعدم خسارة البيع.' },
      { title: 'سرعة الصرف', desc: 'بحث سريع وقراءة باركود لخدمة عملاء أسرع وتقليل الطوابير.' },
      { title: 'ضبط المخزون', desc: 'جرد دقيق يمنع السرقات والنقص المفاجئ في الأدوية الهامة.' }
    ],
    color: 'from-teal-600 to-teal-800',
    accent: 'text-teal-600',
    bg: 'bg-teal-50',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1000&q=80'
  },
  gym: {
    id: 'gym',
    title: 'نظام الجيم والصالات الرياضية',
    description: 'تحكم في الاشتراكات، الحضور والانصراف، وجداول المدربين بذكاء.',
    icon: Dumbbell,
    features: [
      { title: 'إدارة العضويات', desc: 'تنبيهات انتهاء الاشتراك والتجديد والتجميد.' },
      { title: 'دخول QR Code', desc: 'سجل حضور الأعضاء بسرعة باستخدام الموبايل.' },
      { title: 'حجز الكلاسات', desc: 'نظم أعداد المشتركين في كل حصة تدريبية.' },
      { title: 'متابعة القياسات', desc: 'سجل تطور وزن وعضلات الأعضاء في بروفايلهم.' }
    ],
    benefits: [
      { title: 'متابعة العضويات', desc: 'نظام آلي للتنبيه بالتجديد يضمن استمرار الدخل وعدم انقطاع المشتركين.' },
      { title: 'تحكم في الدخول', desc: 'بوابات ذكية أو QR Code تمنع دخول غير المشتركين وتضبط الأعداد.' },
      { title: 'مجتمع نشط', desc: 'تفاعل المدربين والأعضاء عبر التطبيق يزيد الارتباط بالجيم.' },
      { title: 'إدارة مبيعات', desc: 'بيع المكملات والمنتجات وتسجيلها في نفس النظام لسهولة الحسابات.' }
    ],
    color: 'from-yellow-500 to-orange-600',
    accent: 'text-yellow-600',
    bg: 'bg-yellow-50',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80'
  },
  salon: {
    id: 'salon',
    title: 'نظام إدارة الصالونات ومراكز التجميل',
    description: 'نظم مواعيدك، وتابع موظفيك، وقدم أفضل تجربة لعملائك. الحل المتكامل للصالونات.',
    icon: Scissors,
    features: [
      { title: 'حجز المواعيد', desc: 'جدول إلكتروني سهل الاستخدام لتنظيم مواعيد العملاء ومنع التضارب.' },
      { title: 'إدارة الموظفين', desc: 'حساب العمولات وتقييم أداء كل موظف بناءً على الخدمات المقدمة.' },
      { title: 'تاريخ العميل', desc: 'سجل كامل لكل عميل (الخدمات السابقة، التفضيلات، الملاحظات).' },
      { title: 'إدارة المنتجات', desc: 'بيع منتجات العناية ومتابعة مخزون الصالون في نفس النظام.' }
    ],
    benefits: [
      { title: 'تنظيم الوقت', desc: 'تقليل وقت الانتظار والفجوات في الجدول لزيادة الإنتاجية.' },
      { title: 'رضا العملاء', desc: 'خدمة شخصية بناءً على سجل العميل تزيد من ولائهم.' },
      { title: 'حسابات دقيقة', desc: 'حساب تلقائي للإيرادات والعمولات يمنع الأخطاء المالية.' },
      { title: 'تسويق ذكي', desc: 'إرسال عروض وتذكيرات للعملاء لزيادة معدل التردد على الصالون.' }
    ],
    color: 'from-pink-500 to-purple-600',
    accent: 'text-pink-600',
    bg: 'bg-pink-50',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=80'
  }
};
