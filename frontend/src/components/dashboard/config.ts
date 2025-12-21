import { 
  ShoppingBag, Users, DollarSign, Star, 
  Package, Menu, LayoutDashboard, Store,
  ChefHat, Calendar, Home, Key, Car, Wrench,
  Stethoscope, Activity, Dumbbell, ClipboardList,
  Utensils, Clock, CheckCircle, Plus, FileText,
  Truck, Map, QrCode, CreditCard, Tag, 
  Briefcase, PenTool, Camera, ShieldCheck, HeartPulse,
  Syringe, Pill, School, GraduationCap, Video,
  Shirt, Droplets, Waves, Scissors, Ticket, Layers,
  Sparkles, Grid, LayoutGrid, BarChart3, HardHat, Warehouse, FileSpreadsheet,
  Settings, Bell, AlertCircle, Gauge, Monitor, Cpu, ShoppingBasket, Scale,
  Bike, RotateCcw, ClipboardCheck, Baby, Gavel, Umbrella, Sun, UserCheck, LogOut,
  ShoppingCart, TrendingUp, Eye, EyeOff, Printer, Download, Upload, Search, Filter,
  Edit, Trash2, Copy, MoreVertical, ArrowUp, ArrowDown, Box
} from 'lucide-react';

export type BusinessType = 'general' | 'restaurant' | 'retail' | 'realestate' | 'cars' | 'clinic' | 'gym' | 'services' | 'laundry' | 'clothing' | 'salon' | 'pharmacy' | 'contracting' | 'carwash' | 'supermarket' | 'electronics' | 'nursery' | 'law' | 'consulting' | 'resort' | 'admin';

export interface DashboardConfig {
  type: BusinessType;
  title: string;
  themeColor: string;
  navItems: { id: string; label: string; icon: any }[];
  stats: { label: string; value: string; trend: number; icon: any }[];
  quickActions: { label: string; icon: any; action: string }[];
  tableHeaders: string[];
  data: any[];
}

const sanitizeDashboardConfigs = (
  configs: Record<BusinessType, DashboardConfig>
 ): Record<BusinessType, DashboardConfig> => {
  return (Object.keys(configs) as BusinessType[]).reduce(
   (acc, key) => {
    const c = configs[key];
    acc[key] = { ...c, stats: [], data: [] };
    return acc;
   },
   {} as Record<BusinessType, DashboardConfig>
  );
 };

const dashboardConfigsRaw: Record<BusinessType, DashboardConfig> = {
  // ... (Previous Configs Remain - omitted for brevity, adding new ones below)
  supermarket: {
    type: 'supermarket',
    title: 'سوبر ماركت العائلة',
    themeColor: 'emerald',
    navItems: [
      { id: 'overview', label: 'نظرة عامة', icon: LayoutDashboard },
      { id: 'pos', label: 'نقطة البيع المتكاملة', icon: ShoppingCart },
      { id: 'products-management', label: 'إدارة المنتجات المتقدمة', icon: Package },
      { id: 'inventory', label: 'المخزون والجرد', icon: Layers },
      { id: 'expiry', label: 'الصلاحية', icon: AlertCircle },
      { id: 'suppliers', label: 'الموردين', icon: Truck },
      { id: 'delivery', label: 'طلبات التوصيل', icon: Bike },
      { id: 'offers', label: 'العروض الأسبوعية', icon: Tag },
      { id: 'analytics-integrated', label: 'التقارير المتكاملة', icon: BarChart3 },
    ],
    stats: [
      { label: 'مبيعات اليوم', value: '24,500 ج', trend: 12, icon: DollarSign },
      { label: 'عدد الفواتير', value: '320', trend: 5, icon: FileText },
      { label: 'نواقص', value: '15', trend: -2, icon: AlertCircle },
      { label: 'طلب توصيل', value: '45', trend: 8, icon: Truck },
    ],
    quickActions: [
      { label: 'بيع جديد', icon: ShoppingBasket, action: 'new_sale' },
      { label: 'إضافة منتج', icon: Plus, action: 'add_product' },
      { label: 'جرد', icon: ClipboardList, action: 'inventory_check' },
      { label: 'طلب نواقص', icon: Truck, action: 'order_stock' },
      { label: 'مرتجع', icon: RotateCcw, action: 'return' },
    ],
    tableHeaders: ['رقم الفاتورة', 'العميل', 'عدد القطع', 'الإجمالي', 'الدفع', 'الوقت'],
    data: [
      { id: '#INV-501', col1: 'عميل طيار', col2: '15 صنف', col3: '850 ج', status: 'paid', time: 'منذ 2 دقيقة' },
      { id: '#INV-502', col1: 'عميل صالة', col2: '3 أصناف', col3: '45 ج', status: 'paid', time: 'منذ 5 دقائق' },
      { id: '#INV-503', col1: 'توصيل منازل', col2: '22 صنف', col3: '1,200 ج', status: 'delivering', time: 'منذ 10 دقائق' },
    ]
  },
  electronics: {
    type: 'electronics',
    title: 'تكنو ستور للإلكترونيات',
    themeColor: 'indigo',
    navItems: [
      { id: 'overview', label: 'الرئيسية', icon: LayoutDashboard },
      { id: 'pos', label: 'المبيعات (POS)', icon: Monitor },
      { id: 'products', label: 'المنتجات والسيريال', icon: Cpu },
      { id: 'maintenance', label: 'الصيانة والضمان', icon: Wrench },
      { id: 'installments', label: 'التقسيط', icon: FileText },
      { id: 'customers', label: 'العملاء', icon: Users },
      { id: 'reports', label: 'التقارير', icon: BarChart3 },
    ],
    stats: [
      { label: 'مبيعات اليوم', value: '45,000 ج', trend: 8, icon: DollarSign },
      { label: 'أجهزة مباعة', value: '12', trend: 2, icon: Monitor },
      { label: 'أجهزة صيانة', value: '5', trend: 0, icon: Wrench },
      { label: 'أقساط مستحقة', value: '120k ج', trend: 5, icon: Calendar },
    ],
    quickActions: [
      { label: 'فاتورة بيع', icon: DollarSign, action: 'new_sale' },
      { label: 'استلام صيانة', icon: Wrench, action: 'new_repair' },
      { label: 'إضافة جهاز', icon: Plus, action: 'add_product' },
      { label: 'فحص ضمان', icon: ShieldCheck, action: 'check_warranty' },
      { label: 'تحصيل قسط', icon: FileText, action: 'collect_installment' },
    ],
    tableHeaders: ['رقم الفاتورة', 'العميل', 'الجهاز', 'السيريال', 'الإجمالي', 'الحالة'],
    data: [
      { id: '#INV-901', col1: 'محمد أحمد', col2: 'iPhone 15 Pro', col3: 'SN:8392...', col4: '55,000 ج', status: 'paid', time: 'منذ ساعة' },
      { id: '#INV-902', col1: 'شركة الأمل', col2: '3x HP Laptop', col3: 'SN:Multiple', col4: '45,000 ج', status: 'credit', time: 'أمس' },
      { id: '#REP-105', col1: 'علي حسن', col2: 'PlayStation 5', col3: 'صيانة HDMI', col4: '1,500 ج', status: 'in_progress', time: 'جاري العمل' },
    ]
  },
  // New Systems
  nursery: {
    type: 'nursery',
    title: 'حضانة المستقبل',
    themeColor: 'pink',
    navItems: [
      { id: 'overview', label: 'الرئيسية', icon: LayoutDashboard },
      { id: 'children', label: 'شؤون الأطفال', icon: Baby },
      { id: 'attendance', label: 'الحضور والانصراف', icon: Clock },
      { id: 'subscriptions', label: 'الاشتراكات', icon: CreditCard },
      { id: 'activities', label: 'الأنشطة والتقييم', icon: Star },
      { id: 'parents', label: 'أولياء الأمور', icon: Users },
      { id: 'finance', label: 'المصروفات', icon: DollarSign },
    ],
    stats: [
      { label: 'حضور اليوم', value: '45', trend: 0, icon: Baby },
      { label: 'اشتراكات جديدة', value: '3', trend: 10, icon: UserCheck },
      { label: 'رسوم مستحقة', value: '15,000 ج', trend: 5, icon: DollarSign },
      { label: 'شكاوى', value: '0', trend: 0, icon: AlertCircle },
    ],
    quickActions: [
      { label: 'تسجيل طفل', icon: Plus, action: 'new_child' },
      { label: 'تسجيل حضور', icon: CheckCircle, action: 'check_in' },
      { label: 'تحصيل رسوم', icon: DollarSign, action: 'payment' },
      { label: 'تقرير يومي', icon: FileText, action: 'daily_report' },
    ],
    tableHeaders: ['الطفل', 'المجموعة', 'ولي الأمر', 'حالة الاشتراك', 'الحضور', 'ملاحظات'],
    data: [
      { id: 'CH-101', col1: 'آدم أحمد', col2: 'KG 1', col3: 'أحمد علي', status: 'paid', time: 'حاضر' },
      { id: 'CH-102', col1: 'لارا محمد', col2: 'Baby Class', col3: 'محمد حسن', status: 'overdue', time: 'غائب' },
    ]
  },
  law: {
    type: 'law',
    title: 'مكتب العدالة للمحاماة',
    themeColor: 'slate',
    navItems: [
      { id: 'overview', label: 'المكتب', icon: LayoutDashboard },
      { id: 'cases', label: 'القضايا والملفات', icon: Gavel },
      { id: 'clients', label: 'الموكلين', icon: Users },
      { id: 'sessions', label: 'أجندة الجلسات', icon: Calendar },
      { id: 'documents', label: 'الأرشيف والوثائق', icon: FileText },
      { id: 'finance', label: 'الأتعاب والمصروفات', icon: DollarSign },
    ],
    stats: [
      { label: 'قضايا جارية', value: '24', trend: 2, icon: Gavel },
      { label: 'جلسات الأسبوع', value: '8', trend: 0, icon: Calendar },
      { label: 'أتعاب مستحقة', value: '45,000 ج', trend: 15, icon: DollarSign },
      { label: 'موكلين جدد', value: '3', trend: 5, icon: Users },
    ],
    quickActions: [
      { label: 'قضية جديدة', icon: Gavel, action: 'new_case' },
      { label: 'إضافة جلسة', icon: Calendar, action: 'new_session' },
      { label: 'توكيل جديد', icon: FileText, action: 'new_client' },
      { label: 'سداد دفعة', icon: DollarSign, action: 'payment' },
    ],
    tableHeaders: ['رقم الملف', 'الموكل', 'نوع القضية', 'تاريخ الجلسة', 'المحكمة', 'الحالة'],
    data: [
      { id: 'CAS-220', col1: 'شركة النور', col2: 'تجاري', col3: '25/11/2025', col4: 'القاهرة الجديدة', status: 'active' },
      { id: 'CAS-221', col1: 'محمود سعيد', col2: 'مدني', col3: '01/12/2025', col4: 'الجيزة', status: 'pending' },
    ]
  },
  consulting: {
    type: 'consulting',
    title: 'إيليت للاستشارات',
    themeColor: 'blue',
    navItems: [
      { id: 'overview', label: 'لوحة المعلومات', icon: LayoutDashboard },
      { id: 'projects', label: 'المشاريع الاستشارية', icon: Briefcase },
      { id: 'clients', label: 'العملاء', icon: Users },
      { id: 'hours', label: 'تتبع الساعات', icon: Clock },
      { id: 'invoices', label: 'الفواتير', icon: FileText },
      { id: 'team', label: 'فريق العمل', icon: Users },
    ],
    stats: [
      { label: 'مشاريع نشطة', value: '6', trend: 1, icon: Briefcase },
      { label: 'ساعات عمل', value: '120', trend: 10, icon: Clock },
      { label: 'إيرادات', value: '85,000 ج', trend: 20, icon: DollarSign },
      { label: 'نسبة الإنجاز', value: '75%', trend: 5, icon: Activity },
    ],
    quickActions: [
      { label: 'مشروع جديد', icon: Plus, action: 'new_project' },
      { label: 'تسجيل ساعات', icon: Clock, action: 'log_hours' },
      { label: 'إصدار فاتورة', icon: FileText, action: 'invoice' },
      { label: 'اجتماع عميل', icon: Users, action: 'meeting' },
    ],
    tableHeaders: ['المشروع', 'العميل', 'المرحلة', 'الموعد النهائي', 'الميزانية', 'الحالة'],
    data: [
      { id: 'PRJ-01', col1: 'دراسة جدوى', col2: 'مصنع الأمل', col3: 'التحليل المالي', status: 'in_progress', time: '30/11' },
      { id: 'PRJ-02', col1: 'هيكلة إدارية', col2: 'مجموعة الفارس', col3: 'التنفيذ', status: 'active', time: '15/12' },
    ]
  },
  resort: {
    type: 'resort',
    title: 'منتجع بلو لاجون',
    themeColor: 'cyan',
    navItems: [
      { id: 'overview', label: 'الاستقبال', icon: LayoutDashboard },
      { id: 'bookings', label: 'حجوزات الغرف', icon: Calendar },
      { id: 'guests', label: 'النزلاء', icon: Users },
      { id: 'housekeeping', label: 'الإشراف الداخلي', icon: Home },
      { id: 'services', label: 'خدمات الغرف', icon: Bell },
      { id: 'finance', label: 'المالية', icon: DollarSign },
    ],
    stats: [
      { label: 'نسبة الإشغال', value: '85%', trend: 15, icon: Home },
      { label: 'وصول اليوم', value: '12', trend: 2, icon: Users },
      { label: 'مغادرة اليوم', value: '8', trend: 0, icon: LogOut },
      { label: 'طلبات خدمة', value: '5', trend: -2, icon: Bell },
    ],
    quickActions: [
      { label: 'حجز جديد', icon: Calendar, action: 'new_booking' },
      { label: 'Check-in', icon: UserCheck, action: 'check_in' },
      { label: 'Check-out', icon: LogOut, action: 'check_out' },
      { label: 'طلب نظافة', icon: Sparkles, action: 'clean' },
    ],
    tableHeaders: ['رقم الغرفة', 'النزيل', 'الوصول', 'المغادرة', 'الحالة', 'الرصيد'],
    data: [
      { id: '101', col1: 'عائلة أحمد', col2: '20/11', col3: '25/11', status: 'occupied', time: '0.00' },
      { id: '102', col1: 'سارة محمود', col2: '22/11', col3: '24/11', status: 'reserved', time: 'مدفوع' },
      { id: '105', col1: '--', col2: '--', col3: '--', status: 'cleaning', time: '--' },
    ]
  },
  // Default fallbacks for existing ones...
  carwash: {
    type: 'carwash',
    title: 'سبيد واش المتنقل',
    themeColor: 'cyan',
    navItems: [
      { id: 'overview', label: 'الأسطول والعمليات', icon: LayoutDashboard },
      { id: 'schedule', label: 'جدول الغسيل', icon: Calendar },
      { id: 'fleet', label: 'وحدات الغسيل (Vans)', icon: Truck },
      { id: 'jobs', label: 'طلبات الغسيل', icon: Droplets },
      { id: 'inventory', label: 'مخزون المواد', icon: Layers },
      { id: 'customers', label: 'قاعدة العملاء', icon: Users },
      { id: 'finance', label: 'الإيرادات', icon: DollarSign },
      { id: 'reports', label: 'التقارير', icon: BarChart3 },
    ],
    stats: [
      { label: 'سيارات مغسولة', value: '24', trend: 15, icon: Car },
      { label: 'وحدات نشطة', value: '5/6', trend: 0, icon: Truck },
      { label: 'متوسط الوقت', value: '35 د', trend: -5, icon: Clock },
      { label: 'إيراد اليوم', value: '6,200 ج', trend: 12, icon: DollarSign },
    ],
    quickActions: [
      { label: 'حجز جديد', icon: Plus, action: 'new_booking' },
      { label: 'توجيه وحدة', icon: Map, action: 'dispatch_van' },
      { label: 'جرد مياه/مواد', icon: Gauge, action: 'check_supplies' },
      { label: 'فاتورة عميل', icon: FileText, action: 'invoice' },
    ],
    tableHeaders: ['رقم الطلب', 'العميل', 'السيارة', 'نوع الغسيل', 'الوحدة', 'الحالة'],
    data: [
      { id: '#WSH-101', col1: 'محمد علي', col2: 'Kia Sportage', col3: 'غسيل كيماوي', status: 'in_progress', time: 'Van-01' },
      { id: '#WSH-102', col1: 'سارة أحمد', col2: 'Toyota Corolla', col3: 'غسيل وتشميع', status: 'pending', time: 'Van-03' },
      { id: '#WSH-103', col1: 'شركة أوبر', col2: 'Nissan Sunny', col3: 'غسيل سريع', status: 'completed', time: 'Van-02' },
    ]
  },
  contracting: {
    type: 'contracting',
    title: 'شركة التعمير للمقاولات',
    themeColor: 'orange',
    navItems: [
      { id: 'overview', label: 'مركز العمليات', icon: LayoutDashboard },
      { id: 'projects', label: 'المشاريع الجارية', icon: HardHat },
      { id: 'tenders', label: 'المناقصات والعروض', icon: FileSpreadsheet },
      { id: 'warehouse', label: 'المخازن والتوريد', icon: Warehouse },
      { id: 'labor', label: 'العمالة والمقاولين', icon: Users },
      { id: 'finance', label: 'المستخلصات والمالية', icon: DollarSign },
      { id: 'procurement', label: 'المشتريات', icon: Truck },
      { id: 'reports', label: 'التقارير', icon: BarChart3 },
    ],
    stats: [
      { label: 'مشاريع نشطة', value: '5', trend: 0, icon: HardHat },
      { label: 'نسبة الإنجاز', value: '68%', trend: 5, icon: Activity },
      { label: 'قيمة المستخلصات', value: '2.4M', trend: 12, icon: DollarSign },
      { label: 'مواد في الموقع', value: '450k', trend: -2, icon: Package },
    ],
    quickActions: [
      { label: 'مشروع جديد', icon: Plus, action: 'new_project' },
      { label: 'طلب توريد', icon: Truck, action: 'supply_request' },
      { label: 'صرف خامات', icon: Warehouse, action: 'issue_material' },
      { label: 'إضافة مستخلص', icon: FileText, action: 'new_invoice' },
      { label: 'تسجيل عمالة', icon: Users, action: 'add_labor' },
    ],
    tableHeaders: ['المشروع', 'العميل', 'المرحلة الحالية', 'نسبة الإنجاز', 'تاريخ التسليم', 'الحالة'],
    data: [
      { id: 'PRJ-101', col1: 'أبراج العاصمة', col2: 'هيئة المجتمعات', col3: 'التشطيبات الداخلية', status: 'in_progress', time: '2025-12-30' },
      { id: 'PRJ-102', col1: 'فيلا د. خالد', col2: 'قطاع خاص', col3: 'تأسيس سباكة وكهرباء', status: 'active', time: '2025-06-15' },
      { id: 'PRJ-103', col1: 'مول الشروق', col2: 'مجموعة الفطيم', col3: 'صب الخرسانة', status: 'delayed', time: '2026-01-01' },
    ]
  },
  general: {
    type: 'general',
    title: 'مركز القيادة الموحد',
    themeColor: 'slate',
    navItems: [
      { id: 'overview', label: 'نظرة عامة', icon: LayoutGrid },
      { id: 'analytics', label: 'التحليلات المجمعة', icon: Activity },
      { id: 'users', label: 'المستخدمين والصلاحيات', icon: Users },
      { id: 'billing', label: 'الاشتراكات والفواتير', icon: CreditCard },
      { id: 'reports', label: 'التقارير المركزية', icon: BarChart3 },
    ],
    stats: [
      { label: 'إجمالي الإيرادات', value: '1.2M ج.م', trend: 15, icon: DollarSign },
      { label: 'الطلبات النشطة', value: '342', trend: 8, icon: ShoppingBag },
      { label: 'العملاء الجدد', value: '128', trend: 12, icon: Users },
      { label: 'الأنظمة النشطة', value: '11', trend: 0, icon: Store },
    ],
    quickActions: [],
    tableHeaders: [],
    data: []
  },
  restaurant: {
    type: 'restaurant',
    title: 'مطعم النور للمأكولات',
    themeColor: 'orange',
    navItems: [
      { id: 'overview', label: 'لوحة القيادة', icon: LayoutDashboard },
      { id: 'pos', label: 'كاشير الصالة', icon: DollarSign },
      { id: 'orders', label: 'إدارة الطلبات', icon: ShoppingBag },
      { id: 'kitchen', label: 'شاشة المطبخ (KDS)', icon: ChefHat },
      { id: 'menu', label: 'قائمة الطعام', icon: Menu },
      { id: 'tables', label: 'خريطة الطاولات', icon: Utensils },
      { id: 'reservations', label: 'دفتر الحجوزات', icon: Calendar },
      { id: 'delivery', label: 'فريق التوصيل', icon: Truck },
      { id: 'inventory', label: 'المخزون والمقادير', icon: Package },
      { id: 'reports', label: 'التقارير', icon: BarChart3 },
    ],
    stats: [
      { label: 'مبيعات اليوم', value: '4,850 ج.م', trend: 15, icon: DollarSign },
      { label: 'الطلبات النشطة', value: '12', trend: 8, icon: ShoppingBag },
      { label: 'طاولات مشغولة', value: '8/15', trend: -2, icon: Utensils },
      { label: 'وقت التحضير', value: '18 دقيقة', trend: -5, icon: Clock },
    ],
    quickActions: [
      { label: 'طلب جديد', icon: Plus, action: 'new_order' },
      { label: 'حجز طاولة', icon: Calendar, action: 'book_table' },
      { label: 'إغلاق الوردية', icon: CheckCircle, action: 'close_shift' },
      { label: 'مصروفات', icon: DollarSign, action: 'expense' },
      { label: 'نواقص المطبخ', icon: Package, action: 'kitchen_stock' },
      { label: 'طباعة باركود', icon: QrCode, action: 'print_qr' },
    ],
    tableHeaders: ['رقم الطلب', 'نوع الطلب', 'العميل', 'المبلغ', 'الحالة', 'الوقت المنقضي'],
    data: [
      { id: '#1847', col1: 'توصيل', col2: 'محمد علي', col3: '230 ج', status: 'preparing', time: '12 دقيقة' },
      { id: '#1846', col1: 'صالة - T4', col2: 'عائلة سمير', col3: '540 ج', status: 'completed', time: '45 دقيقة' },
      { id: '#1845', col1: 'تيك أواي', col2: 'سارة أحمد', col3: '120 ج', status: 'ready', time: '20 دقيقة' },
      { id: '#1844', col1: 'توصيل', col2: 'كريم محمود', col3: '310 ج', status: 'delivering', time: '35 دقيقة' },
    ]
  },
  
  retail: {
    type: 'retail',
    title: 'سوبر ماركت البركة',
    themeColor: 'blue',
    navItems: [
      { id: 'overview', label: 'نظرة عامة', icon: LayoutDashboard },
      { id: 'pos', label: 'نقطة البيع الموحدة', icon: ShoppingCart },
      { id: 'products-management', label: 'إدارة المنتجات المتقدمة', icon: Package },
      { id: 'inventory', label: 'المخزون والجرد', icon: ClipboardList },
      { id: 'suppliers', label: 'الموردين', icon: Truck },
      { id: 'customers', label: 'العملاء والديون', icon: Users },
      { id: 'analytics-integrated', label: 'التقارير المتكاملة', icon: BarChart3 },
      { id: 'offers', label: 'العروض والخصومات', icon: Star },
    ],
    stats: [
      { label: 'إيراد اليوم', value: '15,200 ج', trend: 5, icon: DollarSign },
      { label: 'عدد الفواتير', value: '142', trend: 10, icon: FileText },
      { label: 'منتجات تنفذ', value: '8', trend: -2, icon: Package },
      { label: 'قيمة المخزون', value: '450k ج', trend: 0, icon: Store },
    ],
    quickActions: [
      { label: 'فاتورة بيع', icon: ShoppingBag, action: 'new_sale' },
      { label: 'فاتورة شراء', icon: Truck, action: 'purchase_order' },
      { label: 'إضافة منتج', icon: Package, action: 'add_product' },
      { label: 'جرد سريع', icon: QrCode, action: 'inventory_check' },
      { label: 'مرتجع', icon: CheckCircle, action: 'return' },
      { label: 'تسديد مورد', icon: DollarSign, action: 'pay_supplier' },
    ],
    tableHeaders: ['رقم الفاتورة', 'العميل', 'عدد الأصناف', 'الإجمالي', 'طريقة الدفع', 'الحالة'],
    data: [
      { id: '#INV-990', col1: 'عميل نقدي', col2: '5 قطع', col3: '150 ج', status: 'paid', time: 'منذ دقيقة' },
      { id: '#INV-989', col1: 'أحمد كمال', col2: '12 قطعة', col3: '1,200 ج', status: 'paid', time: 'منذ 10 د' },
      { id: '#INV-988', col1: 'سارة علي', col2: '3 قطع', col3: '85 ج', status: 'credit', time: 'منذ 15 د' },
      { id: '#INV-987', col1: 'محمود حسن', col2: '1 قطعة', col3: '20 ج', status: 'cancelled', time: 'منذ 30 د' },
    ]
  },

  realestate: {
    type: 'realestate',
    title: 'أملاك للتطوير العقاري',
    themeColor: 'green',
    navItems: [
      { id: 'overview', label: 'لوحة المعلومات', icon: LayoutDashboard },
      { id: 'properties', label: 'وحدات البيع', icon: Home },
      { id: 'rentals', label: 'وحدات الإيجار', icon: Key },
      { id: 'map', label: 'الخريطة العقارية', icon: Map },
      { id: 'leads', label: 'العملاء المحتملين', icon: Users },
      { id: 'showings', label: 'جدول المعاينات', icon: Calendar },
      { id: 'contracts', label: 'العقود والأقساط', icon: FileText },
      { id: 'reports', label: 'التقارير', icon: BarChart3 },
      { id: 'marketing', label: 'الحملات الإعلانية', icon: Star },
    ],
    stats: [
      { label: 'المبيعات (Q3)', value: '3.2M ج.م', trend: 5, icon: DollarSign },
      { label: 'وحدات متاحة', value: '45', trend: -1, icon: Home },
      { label: 'معاينات اليوم', value: '8', trend: 12, icon: Users },
      { label: 'أقساط مستحقة', value: '120k ج', trend: 0, icon: FileText },
    ],
    quickActions: [
      { label: 'إضافة وحدة', icon: Home, action: 'add_property' },
      { label: 'عميل جديد', icon: Users, action: 'add_lead' },
      { label: 'حجز معاينة', icon: Calendar, action: 'schedule_viewing' },
      { label: 'إنشاء عقد', icon: FileText, action: 'create_contract' },
      { label: 'حاسبة أقساط', icon: DollarSign, action: 'calc' },
      { label: 'جولة 360', icon: Camera, action: 'tour_360' },
    ],
    tableHeaders: ['كود الوحدة', 'العنوان', 'النوع', 'السعر', 'العميل المهتم', 'حالة المعاينة'],
    data: [
      { id: 'APT-101', col1: 'التجمع الخامس - حي اللوتس', col2: 'شقة 180م', col3: '3.5M ج', status: 'scheduled', time: 'أحمد محمود' },
      { id: 'VIL-205', col1: 'الشيخ زايد - بيفرلي', col2: 'فيلا مستقلة', col3: '12M ج', status: 'completed', time: 'شركة الفرسان' },
      { id: 'SHP-003', col1: 'المعادي - شارع 9', col2: 'محل تجاري', col3: '45,000/ش', status: 'pending', time: 'د. سارة' },
      { id: 'LND-55', col1: 'العاصمة الإدارية', col2: 'أرض تجارية', col3: '8M ج', status: 'sold', time: 'مجموعة الصفا' },
    ]
  },

  cars: {
    type: 'cars',
    title: 'أوتو ستار للسيارات',
    themeColor: 'red',
    navItems: [
      { id: 'overview', label: 'الرئيسية', icon: LayoutDashboard },
      { id: 'inventory', label: 'معرض السيارات', icon: Car },
      { id: 'inspection', label: 'فحص فني', icon: ClipboardCheck },
      { id: 'test_drives', label: 'تجارب القيادة', icon: Key },
      { id: 'sales', label: 'المبيعات والفواتير', icon: DollarSign },
      { id: 'installments', label: 'نظام التقسيط', icon: FileText },
      { id: 'maintenance', label: 'مركز الصيانة', icon: Wrench },
      { id: 'insurance', label: 'التأمين والترخيص', icon: ShieldCheck },
      { id: 'reports', label: 'التقارير', icon: BarChart3 },
    ],
    stats: [
      { label: 'سيارات مباعة', value: '12', trend: 20, icon: Car },
      { label: 'متاح في المعرض', value: '58', trend: 5, icon: Store },
      { label: 'طلبات تجربة', value: '6', trend: 15, icon: Key },
      { label: 'أقساط مستحقة', value: '150k ج.م', trend: 0, icon: DollarSign },
    ],
    quickActions: [
      { label: 'إضافة سيارة', icon: Car, action: 'add_car' },
      { label: 'حجز تجربة', icon: Key, action: 'book_test' },
      { label: 'حاسبة قسط', icon: DollarSign, action: 'calc_installment' },
      { label: 'عقد بيع', icon: FileText, action: 'sale_contract' },
      { label: 'أمر صيانة', icon: Wrench, action: 'service_order' },
      { label: 'تقييم استبدال', icon: CheckCircle, action: 'trade_in' },
    ],
    tableHeaders: ['الموديل', 'سنة الصنع', 'السعر', 'اللون', 'الحالة', 'ملاحظات'],
    data: [
      { id: 'Kia-Spt', col1: 'Kia Sportage', col2: '2024', col3: '1.8M ج', status: 'available', time: 'أحمر' },
      { id: 'Hyun-Tuc', col1: 'Hyundai Tucson', col2: '2025', col3: '2.1M ج', status: 'sold', time: 'أسود' },
      { id: 'Corolla', col1: 'Toyota Corolla', col2: '2023', col3: '1.3M ج', status: 'reserved', time: 'فضي - عربون' },
      { id: 'Merc-C180', col1: 'Mercedes C180', col2: '2024', col3: '3.5M ج', status: 'available', time: 'أبيض' },
    ]
  },

  clinic: {
    type: 'clinic',
    title: 'عيادات الشفاء التخصصية',
    themeColor: 'teal',
    navItems: [
      { id: 'overview', label: 'الاستقبال', icon: LayoutDashboard },
      { id: 'appointments', label: 'جدول المواعيد', icon: Calendar },
      { id: 'patients', label: 'ملفات المرضى', icon: Users },
      { id: 'prescriptions', label: 'الروشتات الطبية', icon: FileText },
      { id: 'lab', label: 'التحاليل والأشعة', icon: Activity },
      { id: 'pharmacy', label: 'صيدلية العيادة', icon: Pill },
      { id: 'finance', label: 'الحسابات والتأمين', icon: DollarSign },
      { id: 'reports', label: 'التقارير الطبية', icon: BarChart3 },
    ],
    stats: [
      { label: 'حالات اليوم', value: '24', trend: 10, icon: Users },
      { label: 'في الانتظار', value: '3', trend: -5, icon: Clock },
      { label: 'إيراد العيادة', value: '12,500 ج', trend: 8, icon: DollarSign },
      { label: 'عمليات', value: '2', trend: 0, icon: HeartPulse },
    ],
    quickActions: [
      { label: 'حجز كشف', icon: Calendar, action: 'book_appointment' },
      { label: 'مريض جديد', icon: Users, action: 'add_patient' },
      { label: 'روشتة', icon: FileText, action: 'new_rx' },
      { label: 'طلب تحليل', icon: Activity, action: 'lab_request' },
      { label: 'متابعة', icon: Clock, action: 'follow_up' },
      { label: 'تطعيم', icon: Syringe, action: 'vaccine' },
    ],
    tableHeaders: ['رقم الملف', 'المريض', 'نوع الكشف', 'الطبيب', 'الحالة', 'الموعد'],
    data: [
      { id: '#PT-902', col1: 'منى زكي', col2: 'استشارة باطنة', col3: 'د. أحمد', status: 'waiting', time: '10:30 ص' },
      { id: '#PT-903', col1: 'كريم عبد العزيز', col2: 'كشف جديد', col3: 'د. سارة', status: 'in_progress', time: '11:00 ص' },
      { id: '#PT-904', col1: 'أحمد حلمي', col2: 'متابعة دورية', col3: 'د. أحمد', status: 'completed', time: '09:15 ص' },
      { id: '#PT-905', col1: 'ياسمين صبري', col2: 'جلدية', col3: 'د. نورهان', status: 'scheduled', time: '01:00 م' },
    ]
  },

  gym: {
    type: 'gym',
    title: 'باور جيم (Power Gym)',
    themeColor: 'yellow',
    navItems: [
      { id: 'overview', label: 'الرئيسية', icon: LayoutDashboard },
      { id: 'members', label: 'سجل الأعضاء', icon: Users },
      { id: 'access', label: 'الدخول والخروج', icon: QrCode },
      { id: 'classes', label: 'حصص التدريب', icon: Dumbbell },
      { id: 'trainers', label: 'المدربين', icon: Star },
      { id: 'subscriptions', label: 'الباقات والاشتراكات', icon: FileText },
      { id: 'diet', label: 'أنظمة التغذية', icon: Utensils },
      { id: 'store', label: 'متجر المكملات', icon: ShoppingBag },
      { id: 'reports', label: 'التقارير', icon: BarChart3 },
    ],
    stats: [
      { label: 'حضور اليوم', value: '145', trend: 12, icon: Users },
      { label: 'اشتراكات جديدة', value: '8', trend: 25, icon: CreditCard },
      { label: 'اشتراكات تنتهي', value: '12', trend: -5, icon: Clock },
      { label: 'مبيعات المتجر', value: '3,200 ج', trend: 10, icon: DollarSign },
    ],
    quickActions: [
      { label: 'عضو جديد', icon: Plus, action: 'new_member' },
      { label: 'تجديد اشتراك', icon: CreditCard, action: 'renew_sub' },
      { label: 'تسجيل دخول', icon: QrCode, action: 'checkin' },
      { label: 'بيع منتج', icon: ShoppingBag, action: 'sell_item' },
      { label: 'قياس InBody', icon: Activity, action: 'inbody' },
      { label: 'حجز كلاس', icon: Dumbbell, action: 'book_class' },
    ],
    tableHeaders: ['رقم العضوية', 'العضو', 'الباقة', 'تاريخ الانتهاء', 'حالة الاشتراك', 'آخر حضور'],
    data: [
      { id: 'GM-101', col1: 'عمرو دياب', col2: 'سنوي VIP', col3: '01/01/2026', status: 'active', time: 'الآن' },
      { id: 'GM-102', col1: 'تامر حسني', col2: 'شهري', col3: '25/11/2025', status: 'expiring', time: 'أمس' },
      { id: 'GM-103', col1: 'محمد رمضان', col2: '3 شهور', col3: '10/10/2025', status: 'expired', time: 'منذ 3 أيام' },
      { id: 'GM-104', col1: 'شيرين', col2: 'حصص خاصة', col3: '15/12/2025', status: 'active', time: 'اليوم 10 ص' },
    ]
  },

  services: {
    type: 'services',
    title: 'تكنو فيكس للصيانة',
    themeColor: 'blue',
    navItems: [
      { id: 'overview', label: 'الرئيسية', icon: LayoutDashboard },
      { id: 'jobs', label: 'أوامر الشغل', icon: ClipboardList },
      { id: 'requests', label: 'الطلبات الواردة', icon: Wrench },
      { id: 'schedule', label: 'جدول الفنيين', icon: Calendar },
      { id: 'technicians', label: 'فريق العمل', icon: Users },
      { id: 'spare_parts', label: 'قطع الغيار', icon: Settings },
      { id: 'invoices', label: 'الفواتير والضمان', icon: FileText },
      { id: 'reports', label: 'التقارير', icon: BarChart3 },
    ],
    stats: [
      { label: 'طلبات جديدة', value: '15', trend: 8, icon: Bell },
      { label: 'قيد التنفيذ', value: '7', trend: 0, icon: Wrench },
      { label: 'فنيين متاحين', value: '3/10', trend: -2, icon: Users },
      { label: 'إيراد الأسبوع', value: '25,000 ج', trend: 12, icon: DollarSign },
    ],
    quickActions: [
      { label: 'طلب صيانة', icon: Wrench, action: 'new_request' },
      { label: 'تعيين فني', icon: Users, action: 'assign_tech' },
      { label: 'صرف قطعة غيار', icon: Settings, action: 'issue_part' },
      { label: 'إنهاء أمر شغل', icon: CheckCircle, action: 'close_order' },
    ],
    tableHeaders: ['رقم الطلب', 'العميل', 'الجهاز', 'العطل', 'الحالة', 'الفني المسؤول'],
    data: [
      { id: '#SRV-551', col1: 'فندق الماسة', col2: 'تكييف مركزي', col3: 'صيانة دورية', status: 'in_progress', time: 'م. حسن' },
      { id: '#SRV-552', col1: 'مطعم حضرموت', col2: 'ثلاجة عرض', col3: 'لا تعمل', status: 'pending', time: 'لم يحدد' },
      { id: '#SRV-550', col1: 'فيلا 15', col2: 'شبكة مياه', col3: 'تسريب', status: 'completed', time: 'فني محمد' },
    ]
  },

  laundry: {
    type: 'laundry',
    title: 'مغسلة كلين أند واش',
    themeColor: 'teal',
    navItems: [
      { id: 'overview', label: 'لوحة التحكم', icon: LayoutDashboard },
      { id: 'received', label: 'الاستلام (Received)', icon: ShoppingBag },
      { id: 'processing', label: 'التشغيل (Washing)', icon: Waves },
      { id: 'ironing', label: 'الكي والتجهيز', icon: Shirt },
      { id: 'ready', label: 'جاهز للتسليم', icon: CheckCircle },
      { id: 'delivery', label: 'التوصيل', icon: Truck },
      { id: 'subscriptions', label: 'الاشتراكات', icon: Ticket },
      { id: 'reports', label: 'التقارير', icon: BarChart3 },
    ],
    stats: [
      { label: 'قطع مستلمة', value: '150', trend: 10, icon: Shirt },
      { label: 'في الغسيل', value: '45', trend: 5, icon: Waves },
      { label: 'جاهز للتسليم', value: '32', trend: 0, icon: CheckCircle },
      { label: 'مبيعات اليوم', value: '3,500 ج', trend: 12, icon: DollarSign },
    ],
    quickActions: [
      { label: 'استلام ملابس', icon: ShoppingBag, action: 'receive' },
      { label: 'تسليم عميل', icon: CheckCircle, action: 'deliver' },
      { label: 'طلب مستعجل', icon: Clock, action: 'urgent' },
      { label: 'اشتراك جديد', icon: Ticket, action: 'new_sub' },
      { label: 'طباعة تاج', icon: Tag, action: 'print_tag' },
    ],
    tableHeaders: ['رقم الإيصال', 'العميل', 'عدد القطع', 'المرحلة', 'الموعد', 'الحالة'],
    data: [
      { id: '#LND-101', col1: 'أحمد محمد', col2: '5 قطع', col3: 'غسيل', status: 'in_progress', time: 'اليوم 5 م' },
      { id: '#LND-102', col1: 'فندق النيل', col2: '50 قطعة', col3: 'كي وتجهيز', status: 'preparing', time: 'غداً 10 ص' },
      { id: '#LND-103', col1: 'سارة علي', col2: 'فستان سهرة', col3: 'جاهز', status: 'ready', time: 'جاهز' },
    ]
  },

  clothing: {
    type: 'clothing',
    title: 'فاشون ستايل (Fashion Style)',
    themeColor: 'pink',
    navItems: [
      { id: 'overview', label: 'نظرة عامة', icon: LayoutDashboard },
      { id: 'shop', label: 'المتجر (POS)', icon: Store },
      { id: 'products', label: 'المنتجات', icon: Shirt },
      { id: 'inventory', label: 'المخزون', icon: Layers },
      { id: 'customers', label: 'العملاء', icon: Users },
      { id: 'reports', label: 'التقارير والمبيعات', icon: BarChart3 },
    ],
    stats: [
      { label: 'مبيعات اليوم', value: '12,400 ج', trend: 18, icon: DollarSign },
      { label: 'قطع مباعة', value: '45', trend: 10, icon: Shirt },
      { label: 'نواقص المقاسات', value: '12', trend: -5, icon: Scissors },
      { label: 'عملاء جدد', value: '8', trend: 2, icon: Users },
    ],
    quickActions: [
      { label: 'بيع جديد', icon: ShoppingBag, action: 'new_sale' },
      { label: 'إضافة موديل', icon: Shirt, action: 'add_product' },
      { label: 'جرد سريع', icon: QrCode, action: 'stock_check' },
      { label: 'طباعة باركود', icon: Tag, action: 'print_barcode' },
      { label: 'مرتجع', icon: CheckCircle, action: 'return' },
    ],
    tableHeaders: ['رقم الفاتورة', 'العميل', 'عدد القطع', 'الإجمالي', 'الحالة', 'التاريخ'],
    data: [
      { id: '#INV-2024', col1: 'عميل نقدي', col2: '3 قطع', col3: '1,200 ج', status: 'paid', time: 'منذ 5 د' },
      { id: '#INV-2023', col1: 'منى أحمد', col2: '1 فستان', col3: '850 ج', status: 'paid', time: 'منذ ساعة' },
      { id: '#INV-2022', col1: 'علي حسن', col2: '2 بنطلون', col3: '900 ج', status: 'pending', time: 'منذ ساعتين' },
    ]
  },

  salon: {
    type: 'salon',
    title: 'صالون اللوتس للتجميل',
    themeColor: 'pink',
    navItems: [
      { id: 'overview', label: 'الرئيسية', icon: LayoutDashboard },
      { id: 'appointments', label: 'المواعيد', icon: Calendar },
      { id: 'pos', label: 'كاشير وخدمات', icon: DollarSign },
      { id: 'customers', label: 'العميلات', icon: Users },
      { id: 'staff', label: 'فريق العمل', icon: Sparkles },
      { id: 'inventory', label: 'المخزون', icon: Package },
      { id: 'reports', label: 'التقارير', icon: BarChart3 },
    ],
    stats: [
      { label: 'مواعيد اليوم', value: '18', trend: 5, icon: Calendar },
      { label: 'مبيعات الخدمات', value: '3,200 ج', trend: 12, icon: DollarSign },
      { label: 'عميلات جدد', value: '4', trend: 0, icon: Users },
      { label: 'منتجات مباعة', value: '12', trend: -5, icon: ShoppingBag },
    ],
    quickActions: [
      { label: 'حجز موعد', icon: Calendar, action: 'book_appt' },
      { label: 'فاتورة خدمة', icon: DollarSign, action: 'new_sale' },
      { label: 'عميلة جديدة', icon: Users, action: 'new_client' },
      { label: 'إضافة منتج', icon: Package, action: 'add_product' },
    ],
    tableHeaders: ['رقم الحجز', 'العميلة', 'الخدمة', 'الموظفة', 'الموعد', 'الحالة'],
    data: [
      { id: '#APT-881', col1: 'سارة أحمد', col2: 'قص وسيشوار', col3: 'م. نادين', status: 'confirmed', time: '10:00 ص' },
      { id: '#APT-882', col1: 'هبة محمود', col2: 'صبغة شعر', col3: 'م. ريهام', status: 'in_progress', time: '11:30 ص' },
      { id: '#APT-883', col1: 'منى زكي', col2: 'مانيكير وباديكير', col3: 'م. سها', status: 'waiting', time: '12:00 م' },
    ]
  },

  pharmacy: {
    type: 'pharmacy',
    title: 'صيدلية الشفاء',
    themeColor: 'teal',
    navItems: [
      { id: 'overview', label: 'نظرة عامة', icon: LayoutDashboard },
      { id: 'pos', label: 'الكاشير (POS)', icon: ShoppingBag },
      { id: 'products', label: 'الأدوية والمخزون', icon: Pill },
      { id: 'suppliers', label: 'الموردين', icon: Truck },
      { id: 'customers', label: 'العملاء', icon: Users },
      { id: 'reports', label: 'التقارير', icon: BarChart3 },
    ],
    stats: [
      { label: 'مبيعات اليوم', value: '8,500 ج', trend: 8, icon: DollarSign },
      { label: 'روشتات مصروفة', value: '45', trend: 12, icon: FileText },
      { label: 'أدوية تنفذ', value: '12', trend: -2, icon: AlertCircle },
      { label: 'عملاء جدد', value: '15', trend: 5, icon: Users },
    ],
    quickActions: [
      { label: 'بيع جديد', icon: ShoppingBag, action: 'new_sale' },
      { label: 'صرف روشتة', icon: FileText, action: 'dispense_rx' },
      { label: 'طلب نواقص', icon: Truck, action: 'order_stock' },
      { label: 'البدائل', icon: Tag, action: 'search_alternatives' },
    ],
    tableHeaders: ['رقم الفاتورة', 'العميل', 'عدد الأصناف', 'الإجمالي', 'طريقة الدفع', 'الحالة'],
    data: [
      { id: '#PH-101', col1: 'عميل نقدي', col2: '3 أدوية', col3: '450 ج', status: 'paid', time: 'منذ 10 د' },
      { id: '#PH-102', col1: 'أحمد محمد', col2: '1 دواء', col3: '85 ج', status: 'paid', time: 'منذ 30 د' },
      { id: '#PH-103', col1: 'شركة التأمين', col2: 'روشتة كاملة', col3: '1,200 ج', status: 'credit', time: 'منذ ساعة' },
    ]
  },

  admin: {
    type: 'admin',
    title: 'لوحة التحكم الإدارية',
    themeColor: 'purple',
    navItems: [
      { id: 'overview', label: 'نظرة عامة', icon: LayoutGrid },
      { id: 'system-management', label: 'إدارة النظام', icon: Monitor },
      { id: 'user-management', label: 'إدارة المستخدمين', icon: Users },
      { id: 'reports', label: 'التقارير', icon: FileText },
      { id: 'settings', label: 'الإعدادات', icon: Settings },
    ],
    stats: [
      { label: 'المستخدمين النشطين', value: '24', trend: 12, icon: Users },
      { label: 'أداء النظام', value: '99.9%', trend: 0.1, icon: Monitor },
      { label: 'الطلبات اليوم', value: '342', trend: 15, icon: ShoppingBag },
      { label: 'الدخل الشهري', value: '125.5K', trend: 8, icon: DollarSign },
    ],
    quickActions: [
      { label: 'إضافة مستخدم', icon: Plus, action: 'add-user' },
      { label: 'نسخ احتياطي', icon: ShieldCheck, action: 'backup' },
      { label: 'تقرير جديد', icon: FileText, action: 'report' },
      { label: 'صيانة', icon: Settings, action: 'maintenance' },
    ],
    tableHeaders: ['المستخدم', 'الدور', 'الحالة', 'آخر تسجيل', 'الإجراءات'],
    data: [
      { id: '#ADM-001', col1: 'أحمد محمد', col2: 'مشرف', col3: 'نشط', col4: '2025-12-05', status: 'active' },
      { id: '#ADM-002', col1: 'سارة أحمد', col2: 'مدير', col3: 'نشط', col4: '2025-12-04', status: 'active' },
      { id: '#ADM-003', col1: 'محمد علي', col2: 'مستخدم', col3: 'غير نشط', col4: '2025-12-01', status: 'inactive' },
    ]
  }
};

export const dashboardConfigs: Record<BusinessType, DashboardConfig> = sanitizeDashboardConfigs(dashboardConfigsRaw);

export const colorClasses: Record<string, any> = {
  slate: { bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-200', btn: 'bg-slate-800 hover:bg-slate-900', lightBtn: 'bg-slate-100 text-slate-800' },
  orange: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200', btn: 'bg-orange-600 hover:bg-orange-700', lightBtn: 'bg-orange-100 text-orange-700' },
  blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', btn: 'bg-blue-600 hover:bg-blue-700', lightBtn: 'bg-blue-100 text-blue-800' },
  green: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200', btn: 'bg-green-600 hover:bg-green-700', lightBtn: 'bg-green-100 text-green-700' },
  red: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200', btn: 'bg-red-600 hover:bg-red-700', lightBtn: 'bg-red-100 text-red-700' },
  teal: { bg: 'bg-teal-50', text: 'text-teal-600', border: 'border-teal-200', btn: 'bg-teal-600 hover:bg-teal-700', lightBtn: 'bg-teal-100 text-teal-700' },
  yellow: { bg: 'bg-yellow-50', text: 'text-yellow-600', border: 'border-yellow-200', btn: 'bg-yellow-600 hover:bg-yellow-700', lightBtn: 'bg-yellow-100 text-yellow-800' },
  cyan: { bg: 'bg-cyan-50', text: 'text-cyan-600', border: 'border-cyan-200', btn: 'bg-cyan-600 hover:bg-cyan-700', lightBtn: 'bg-cyan-100 text-cyan-700' },
  pink: { bg: 'bg-pink-50', text: 'text-pink-600', border: 'border-pink-200', btn: 'bg-pink-600 hover:bg-pink-700', lightBtn: 'bg-pink-100 text-pink-700' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', btn: 'bg-emerald-600 hover:bg-emerald-700', lightBtn: 'bg-emerald-100 text-emerald-700' },
  indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-200', btn: 'bg-indigo-600 hover:bg-indigo-700', lightBtn: 'bg-indigo-100 text-indigo-700' },
};