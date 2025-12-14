
import React, { useState } from 'react';
import { 
  Search, Filter, Plus, Edit, Trash2, 
  Users, DollarSign, TrendingUp, Star, UserCheck,
  Package, FileText, AlertCircle, Calendar, Wrench, Car, Home
} from 'lucide-react';
import StatusBadge from '../../../common/StatusBadge';
import StatCard from '../../../common/cards/StatCard';

interface UniversalDataViewProps {
  type: string;
  theme: any;
}

// --- Data Generators ---

const getStatsForType = (type: string) => {
  if (['staff', 'technicians', 'employees'].includes(type)) {
    return [
      { title: 'إجمالي الموظفين', value: '24', sub: 'موظف نشط', icon: Users, color: 'blue' },
      { title: 'الحضور اليوم', value: '22', sub: '92% نسبة حضور', icon: UserCheck, color: 'green' },
      { title: 'إجمالي الرواتب', value: '85k', sub: 'شهرياً', icon: DollarSign, color: 'yellow' },
      { title: 'الأداء العام', value: '4.8', sub: 'مستوى ممتاز', icon: Star, color: 'purple' },
    ];
  }
  if (['finance', 'sales', 'invoices', 'installments'].includes(type)) {
    return [
      { title: 'إيرادات الشهر', value: '145k', sub: '+12% عن السابق', icon: TrendingUp, color: 'green' },
      { title: 'مصروفات', value: '42k', sub: 'تشغيل ورواتب', icon: DollarSign, color: 'red' },
      { title: 'صافي الربح', value: '103k', sub: 'هامش 71%', icon: DollarSign, color: 'blue' },
      { title: 'مستحقات آجلة', value: '150k', sub: 'أقساط وشيكات', icon: FileText, color: 'orange' },
    ];
  }
  if (['products', 'inventory', 'menu', 'spare_parts'].includes(type)) {
    return [
      { title: 'إجمالي الأصناف', value: '1,240', sub: 'منتج', icon: Package, color: 'blue' },
      { title: 'قيمة المخزون', value: '450k', sub: 'سعر التكلفة', icon: DollarSign, color: 'green' },
      { title: 'نواقص', value: '15', sub: 'يحتاج شراء', icon: AlertCircle, color: 'red' },
      { title: 'الأكثر مبيعاً', value: 'برجر', sub: '150 قطعة/يوم', icon: Star, color: 'yellow' },
    ];
  }
  if (['leads', 'contracts'].includes(type)) {
    return [
      { title: 'عملاء جدد', value: '45', sub: 'هذا الشهر', icon: Users, color: 'blue' },
      { title: 'عقود موقعة', value: '12', sub: 'قيمة 8.5M', icon: FileText, color: 'green' },
      { title: 'نسبة التحويل', value: '26%', sub: '+5% تحسن', icon: TrendingUp, color: 'purple' },
      { title: 'معاينات', value: '30', sub: 'مجدولة', icon: Calendar, color: 'orange' },
    ];
  }
  return [];
};

const getDataConfig = (type: string) => {
  switch(type) {
    case 'menu':
    case 'products':
    case 'pharmacy':
    case 'store':
      return {
        title: 'إدارة المنتجات والمخزون',
        action: 'إضافة منتج',
        headers: ['الاسم', 'السعر', 'القسم', 'المخزون', 'الحالة'],
        data: [
          { id: 1, col1: 'برجر كلاسيك', col2: '80 ج', col3: 'برجر', col4: '150', status: 'active' },
          { id: 2, col1: 'بيتزا بيبيروني', col2: '120 ج', col3: 'بيتزا', col4: '45', status: 'active' },
          { id: 3, col1: 'بنادول إكسترا', col2: '45 ج', col3: 'أدوية', col4: '500', status: 'active' },
          { id: 4, col1: 'بروتين واي', col2: '2200 ج', col3: 'مكملات', col4: '5', status: 'expiring' },
        ]
      };
    case 'spare_parts':
      return {
        title: 'قطع الغيار والمخزون',
        action: 'إضافة قطعة',
        headers: ['اسم القطعة', 'رقم القطعة', 'السعر', 'الكمية', 'الحالة'],
        data: [
          { id: 101, col1: 'فلتر زيت تويوتا', col2: 'TY-9982', col3: '250 ج', col4: '12', status: 'active' },
          { id: 102, col1: 'تيل فرامل كيا', col2: 'KI-2210', col3: '850 ج', col4: '4', status: 'expiring' },
          { id: 103, col1: 'بوجيهات NGK', col2: 'SP-5541', col3: '400 ج', col4: '50', status: 'active' },
        ]
      };
    case 'staff':
    case 'technicians':
    case 'employees':
      return {
        title: 'إدارة فريق العمل',
        action: 'موظف جديد',
        headers: ['الموظف', 'الوظيفة', 'رقم الهاتف', 'الراتب', 'الحالة', 'الأداء'],
        data: [
          { id: 101, col1: 'أحمد محمد', col2: 'مدير فرع', col3: '010xxxxxxx', col4: '8,000 ج', status: 'active', rating: 5 },
          { id: 102, col1: 'سارة علي', col2: 'كاشير', col3: '012xxxxxxx', col4: '4,500 ج', status: 'active', rating: 4 },
          { id: 103, col1: 'م. حسن', col2: 'فني صيانة', col3: '011xxxxxxx', col4: '6,000 ج', status: 'busy', rating: 5 },
          { id: 104, col1: 'محمود السيد', col2: 'شيف', col3: '015xxxxxxx', col4: '7,500 ج', status: 'active', rating: 4 },
        ]
      };
    case 'customers':
    case 'patients':
    case 'members':
      return {
        title: 'قاعدة بيانات العملاء',
        action: 'عميل جديد',
        headers: ['الاسم', 'رقم الهاتف', 'آخر نشاط', 'إجمالي التعاملات', 'الحالة'],
        data: [
          { id: 201, col1: 'أحمد محمود', col2: '010xxxxxxx', col3: 'منذ يومين', col4: '1,500 ج', status: 'active' },
          { id: 202, col1: 'منى زكي', col2: '012xxxxxxx', col3: 'اليوم', col4: '450 ج', status: 'active' },
          { id: 203, col1: 'شركة النور', col2: '022xxxxxxx', col3: 'منذ شهر', col4: '12,000 ج', status: 'vip' },
          { id: 204, col1: 'كريم عبد العزيز', col2: '011xxxxxxx', col3: 'منذ سنة', col4: '0 ج', status: 'inactive' },
        ]
      };
    case 'leads':
      return {
        title: 'العملاء المحتملين (CRM)',
        action: 'إضافة Lead',
        headers: ['الاسم', 'الاهتمام', 'الميزانية', 'المصدر', 'الحالة'],
        data: [
          { id: 301, col1: 'د. محمد علي', col2: 'فيلا - التجمع', col3: '12M ج', col4: 'Facebook', status: 'waiting' },
          { id: 302, col1: 'م. سارة', col2: 'شقة - العاصمة', col3: '3.5M ج', col4: 'Website', status: 'in_progress' },
          { id: 303, col1: 'شركة الفتح', col2: 'مقر إداري', col3: '50k/شهر', col4: 'Referral', status: 'active' },
        ]
      };
    case 'orders':
    case 'delivery':
    case 'lab':
      return {
        title: 'الطلبات والعمليات',
        action: 'طلب جديد',
        headers: ['رقم الطلب', 'العميل', 'التفاصيل', 'المسؤول', 'الحالة'],
        data: [
          { id: 501, col1: '#ORD-1020', col2: 'منى زكي', col3: 'التجمع الخامس', col4: 'كابتن هيثم', status: 'delivering' },
          { id: 502, col1: '#LAB-55', col2: 'أحمد حلمي', col3: 'صورة دم كاملة', col4: 'د. ماجد', status: 'completed' },
          { id: 503, col1: '#ORD-1022', col2: 'كريم عبد العزيز', col3: 'المعادي', col4: '--', status: 'preparing' },
        ]
      };
    case 'service_orders':
      return {
        title: 'أوامر الشغل والصيانة',
        action: 'أمر شغل جديد',
        headers: ['رقم الأمر', 'العميل', 'السيارة/الجهاز', 'نوع الخدمة', 'الحالة'],
        data: [
          { id: 601, col1: '#SRV-990', col2: 'أحمد حسن', col3: 'Kia Sportage', col4: 'صيانة 10,000 كم', status: 'in_progress' },
          { id: 602, col1: '#SRV-991', col2: 'محمد علي', col3: 'BMW 320i', col4: 'سمكرة ودهان', status: 'waiting' },
          { id: 603, col1: '#SRV-988', col2: 'فندق الماسة', col3: 'تكييف مركزي', col4: 'صيانة دورية', status: 'completed' },
        ]
      };
    case 'installments':
      return {
        title: 'الأقساط والتحصيل',
        action: 'تحصيل قسط',
        headers: ['العميل', 'البند', 'قيمة القسط', 'تاريخ الاستحقاق', 'الحالة'],
        data: [
          { id: 701, col1: 'محمود سعيد', col2: 'شقة اللوتس', col3: '45,000 ج', col4: '25/11/2025', status: 'waiting' },
          { id: 702, col1: 'سارة أحمد', col2: 'Toyota Corolla', col3: '12,500 ج', col4: '01/12/2025', status: 'scheduled' },
          { id: 703, col1: 'كريم حسن', col2: 'Hyundai Tucson', col3: '18,000 ج', col4: '20/11/2025', status: 'paid' },
        ]
      };
    case 'contracts':
      return {
        title: 'العقود والمستندات',
        action: 'عقد جديد',
        headers: ['رقم العقد', 'الطرف الثاني', 'النوع', 'القيمة الإجمالية', 'الحالة'],
        data: [
          { id: 801, col1: 'CNT-2025-50', col2: 'أحمد محمود', col3: 'بيع نهائي - سيارة', col4: '1.8M ج', status: 'completed' },
          { id: 802, col1: 'CNT-2025-51', col2: 'شركة الأمل', col3: 'إيجار - مكتب', col4: '600k ج', status: 'active' },
        ]
      };
    case 'suppliers':
      return {
        title: 'الموردين والمشتريات',
        action: 'مورد جديد',
        headers: ['اسم الشركة', 'المسؤول', 'الهاتف', 'الرصيد المستحق', 'الحالة'],
        data: [
          { id: 801, col1: 'شركة جهينة', col2: 'أ. ماجد', col3: '010xxxxxxx', col4: '15,000 ج', status: 'active' },
          { id: 802, col1: 'تجار الجملة', col2: 'الحاج سيد', col3: '011xxxxxxx', col4: '2,400 ج', status: 'pending' },
        ]
      };
    case 'finance':
    case 'reports':
    case 'invoices':
    case 'subscriptions':
      return {
        title: 'التقارير والمالية',
        action: 'تصدير تقرير',
        headers: ['المعرف', 'البند', 'التاريخ', 'المبلغ', 'الحالة'],
        data: [
          { id: 901, col1: '#INV-9001', col2: 'مبيعات يومية', col3: '2025-11-22', col4: '+15,400 ج', status: 'paid' },
          { id: 902, col1: '#EXP-500', col2: 'شراء خامات', col3: '2025-11-22', col4: '-3,200 ج', status: 'paid' },
          { id: 903, col1: '#SUB-101', col2: 'اشتراك سنوي', col3: '2025-11-21', col4: '+4,500 ج', status: 'active' },
        ]
      };
    default:
      return {
        title: 'سجل البيانات',
        action: 'إضافة جديد',
        headers: ['الاسم', 'التفاصيل', 'التاريخ', 'المبلغ', 'الحالة'],
        data: [
          { id: 1, col1: 'بيان تجريبي', col2: 'تفاصيل السجل', col3: '2025-11-22', col4: '100 ج', status: 'active' },
        ]
      };
  }
};

const UniversalDataView: React.FC<UniversalDataViewProps> = ({ type, theme }) => {
  const config = getDataConfig(type);
  const stats = getStatsForType(type);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
      
      {/* Conditional Report Stats */}
      {stats.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, idx) => (
            <StatCard 
              key={idx} 
              title={stat.title} 
              value={stat.value} 
              sub={stat.sub} 
              icon={stat.icon} 
              color={stat.color as any} 
            />
          ))}
        </div>
      )}

      {/* Header & Controls */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">{config.title}</h2>
          <p className="text-sm text-gray-500">إدارة وعرض بيانات {config.title}</p>
        </div>
        
        <div className="flex flex-1 w-full md:w-auto gap-3 justify-end">
           <div className="relative flex-1 md:max-w-xs">
              <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="بحث..." 
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 pr-10 pl-4 focus:outline-none focus:border-blue-500 transition"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>
           <button className="p-2 bg-gray-100 rounded-xl text-gray-600 hover:bg-gray-200 transition">
              <Filter className="w-5 h-5" />
           </button>
           <button className={`${theme.btn} text-white px-4 py-2 rounded-xl font-bold shadow-md flex items-center gap-2 whitespace-nowrap`}>
              <Plus className="w-4 h-4" />
              {config.action}
           </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right whitespace-nowrap">
            <thead className="bg-gray-50 text-gray-500 text-xs font-bold border-b border-gray-100">
              <tr>
                {config.headers.map((header, idx) => (
                  <th key={idx} className="p-4">{header}</th>
                ))}
                <th className="p-4 w-20">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {config.data.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50/80 transition group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {type.includes('staff') && (
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-xs">
                          {row.col1.charAt(0)}
                        </div>
                      )}
                      {type === 'spare_parts' && <Wrench className="w-4 h-4 text-gray-400" />}
                      {type === 'installments' && <DollarSign className="w-4 h-4 text-gray-400" />}
                      {type === 'service_orders' && <Car className="w-4 h-4 text-gray-400" />}
                      {type === 'contracts' && <FileText className="w-4 h-4 text-gray-400" />}
                      <span className="font-bold text-gray-800">{row.col1}</span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600">{row.col2}</td>
                  <td className="p-4 text-gray-600">{row.col3}</td>
                  <td className={`p-4 font-bold ${theme.text}`}>{row.col4}</td>
                  <td className="p-4">
                    <StatusBadge status={row.status} />
                  </td>
                  {/* Optional Rating Column for staff */}
                  {'rating' in row && (row as any).rating && (
                    <td className="p-4">
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="text-xs font-bold">{row.rating}</span>
                      </div>
                    </td>
                  )}
                  <td className="p-4">
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
                      <button className="p-1.5 hover:bg-blue-50 rounded text-blue-600"><Edit className="w-4 h-4" /></button>
                      <button className="p-1.5 hover:bg-red-50 rounded text-red-600"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination / Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
           <p className="text-xs text-gray-500">عرض {config.data.length} من أصل 120 سجل</p>
           <div className="flex gap-2">
              <button className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-100">السابق</button>
              <button className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-100">التالي</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default UniversalDataView;
