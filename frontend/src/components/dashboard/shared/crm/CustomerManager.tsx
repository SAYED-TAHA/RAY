
import React, { useState } from 'react';
import { 
  Search, Plus, User, Phone, Mail, MapPin, 
  ShoppingBag, Star, History, ChevronDown, ChevronUp,
  MessageCircle, MoreHorizontal, X, Save, Trophy, AlertCircle, CheckCircle, Clock, FileText, Tag
} from 'lucide-react';
import { useToast } from '../../../common/useToast';

interface OrderHistory {
  id: string;
  date: string;
  items: string;
  total: number;
  status: 'completed' | 'pending' | 'cancelled';
}

interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  totalSpent: number;
  ordersCount: number;
  lastOrder: string;
  rating: number;
  tags: string[];
  status: 'active' | 'inactive' | 'vip';
  loyaltyPoints: number;
  history: OrderHistory[];
  notes?: string;
  preferredCategory?: string;
}

const initialCustomers: Customer[] = [
  { 
    id: 'C-101', 
    name: 'أحمد محمد علي', 
    phone: '01098765432', 
    email: 'ahmed@example.com', 
    address: 'المعادي، القاهرة', 
    totalSpent: 15400, 
    ordersCount: 12, 
    lastOrder: '2025-11-20', 
    rating: 5, 
    tags: ['VIP', 'مشتري دائم'], 
    status: 'vip',
    loyaltyPoints: 1250,
    notes: 'عميل مميز، يفضل التواصل في الفترة الصباحية. مهتم بالعروض الموسمية.',
    preferredCategory: 'ملابس رجالي',
    history: [
      { id: '#ORD-101', date: '2025-11-20', items: 'بدلة رجالي، قميص', total: 3500, status: 'completed' },
      { id: '#ORD-098', date: '2025-10-15', items: 'حذاء جلد', total: 1200, status: 'completed' },
      { id: '#ORD-090', date: '2025-09-01', items: 'اكسسوارات', total: 450, status: 'cancelled' },
    ]
  },
  { 
    id: 'C-102', 
    name: 'سارة محمود', 
    phone: '01234567890', 
    email: 'sara@example.com', 
    address: 'مدينة نصر', 
    totalSpent: 2300, 
    ordersCount: 3, 
    lastOrder: '2025-11-18', 
    rating: 4, 
    tags: ['جديد'], 
    status: 'active',
    loyaltyPoints: 120,
    notes: 'تم تسجيل شكوى سابقة بخصوص تأخير التوصيل.',
    preferredCategory: 'اكسسوارات',
    history: [
      { id: '#ORD-112', date: '2025-11-18', items: 'فستان صيفي', total: 800, status: 'completed' },
      { id: '#ORD-105', date: '2025-11-05', items: 'حقيبة يد', total: 1500, status: 'pending' },
    ]
  },
];

const CustomerManager: React.FC = () => {
  const { showToast } = useToast();
  const [customers, setCustomers] = useState(initialCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCustomers, setExpandedCustomers] = useState<string[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'segments'>('list');

  // New customer form state
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    phone: '',
    email: '',
    address: ''
  });

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.phone.includes(searchTerm)
  );

  const toggleExpand = (id: string) => {
    setExpandedCustomers(prev => 
      prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
    );
  };

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    const customer: Customer = {
      id: `C-${Date.now()}`,
      ...newCustomer,
      totalSpent: 0,
      ordersCount: 0,
      lastOrder: '-',
      rating: 0,
      tags: ['جديد'],
      status: 'active',
      loyaltyPoints: 0,
      history: []
    };
    setCustomers([customer, ...customers]);
    setIsAddModalOpen(false);
    setNewCustomer({ name: '', phone: '', email: '', address: '' });
    showToast('تم إضافة العميل بنجاح', 'success');
  };

  const getStatusColor = (status: string) => {
     switch(status) {
        case 'completed': return 'text-green-600 bg-green-50';
        case 'pending': return 'text-yellow-600 bg-yellow-50';
        case 'cancelled': return 'text-red-600 bg-red-50';
        default: return 'text-gray-600 bg-gray-50';
     }
  };

  const getStatusLabel = (status: string) => {
     switch(status) {
        case 'completed': return 'مكتمل';
        case 'pending': return 'قيد الانتظار';
        case 'cancelled': return 'ملغي';
        default: return status;
     }
  };

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-2 relative">
      {/* Header & View Toggle */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
         <div>
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
               <User className="w-6 h-6 text-purple-600" />
               إدارة العملاء (CRM)
            </h2>
            <p className="text-sm text-gray-500">قاعدة بيانات العملاء وسجل التعاملات</p>
         </div>
         <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
               <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
               <input 
                  type="text" 
                  placeholder="بحث بالاسم أو الهاتف..." 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 pr-10 pl-4 text-sm focus:outline-none focus:border-purple-500 transition"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>
            <button 
               onClick={() => setIsAddModalOpen(true)}
               className="bg-purple-600 text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-purple-700 transition flex items-center justify-center gap-2 shadow-md whitespace-nowrap"
            >
               <Plus className="w-4 h-4" />
               جديد
            </button>
         </div>
      </div>

      {/* Customers List */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex-1">
         <div className="overflow-x-auto">
            <table className="w-full text-right">
               <thead className="bg-gray-50 text-gray-500 text-xs font-bold border-b border-gray-100">
                  <tr>
                     <th className="p-4">العميل</th>
                     <th className="p-4 hidden md:table-cell">معلومات الاتصال</th>
                     <th className="p-4 hidden md:table-cell">حالة العميل</th>
                     <th className="p-4">آخر طلب</th>
                     <th className="p-4">إجمالي الشراء</th>
                     <th className="p-4 w-10"></th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                  {filteredCustomers.map(customer => (
                     <React.Fragment key={customer.id}>
                        <tr 
                           onClick={() => toggleExpand(customer.id)}
                           className={`cursor-pointer transition hover:bg-purple-50/30 ${expandedCustomers.includes(customer.id) ? 'bg-purple-50/50' : ''}`}
                        >
                           <td className="p-4">
                              <div className="flex items-center gap-3">
                                 <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500 text-sm shrink-0 border border-gray-200">
                                    {customer.name.charAt(0)}
                                 </div>
                                 <div>
                                    <h4 className="font-bold text-sm text-gray-800">{customer.name}</h4>
                                    <p className="text-[10px] text-gray-400 md:hidden">{customer.phone}</p>
                                 </div>
                              </div>
                           </td>
                           <td className="p-4 hidden md:table-cell">
                              <div className="flex flex-col text-xs">
                                 <span className="font-bold text-gray-700 dir-ltr text-right mb-0.5">{customer.phone}</span>
                                 <span className="text-gray-500">{customer.email}</span>
                              </div>
                           </td>
                           <td className="p-4 hidden md:table-cell">
                              <div className="flex gap-1">
                                 {customer.status === 'vip' && <span className="text-[10px] bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full font-bold flex items-center gap-1 w-fit"><Trophy className="w-3 h-3" /> VIP</span>}
                                 {customer.tags.map(tag => <span key={tag} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{tag}</span>)}
                              </div>
                           </td>
                           <td className="p-4 text-sm text-gray-600">{customer.lastOrder}</td>
                           <td className="p-4 font-bold text-purple-700">{customer.totalSpent.toLocaleString()} ج</td>
                           <td className="p-4 text-center">
                              <button className={`p-2 rounded-full transition ${expandedCustomers.includes(customer.id) ? 'bg-purple-100 text-purple-600' : 'text-gray-400 hover:bg-gray-100'}`}>
                                 {expandedCustomers.includes(customer.id) ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                              </button>
                           </td>
                        </tr>
                        
                        {/* Expanded Details Section */}
                        {expandedCustomers.includes(customer.id) && (
                           <tr className="bg-gray-50/50 animate-in fade-in slide-in-from-top-1 border-b border-gray-100">
                              <td colSpan={6} className="p-0">
                                 <div className="p-6">
                                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                                       
                                       {/* 1. Loyalty & Stats */}
                                       <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm h-full flex flex-col">
                                          <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-sm">
                                             <Trophy className="w-4 h-4 text-yellow-500" />
                                             برنامج الولاء
                                          </h4>
                                          
                                          <div className="flex items-center justify-between mb-2">
                                             <span className="text-xs text-gray-500">المستوى الحالي</span>
                                             <span className="text-sm font-black text-purple-700 flex items-center gap-1">
                                                {customer.status === 'vip' ? 'ذهبي (VIP)' : 'فضي'}
                                             </span>
                                          </div>
                                          
                                          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden mb-2">
                                             <div 
                                                className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-1000" 
                                                style={{ width: `${Math.min((customer.loyaltyPoints / 2000) * 100, 100)}%` }}
                                             ></div>
                                          </div>
                                          <p className="text-[10px] text-gray-400 mb-6 flex justify-between">
                                             <span>{customer.loyaltyPoints} نقطة</span>
                                             <span>2000 نقطة (هدف)</span>
                                          </p>
                                          
                                          <div className="grid grid-cols-2 gap-3 mt-auto">
                                             <div className="p-3 bg-green-50 rounded-lg text-center border border-green-100">
                                                <p className="text-[10px] text-green-600 font-bold mb-1">عدد الطلبات</p>
                                                <p className="text-lg font-black text-green-800">{customer.ordersCount}</p>
                                             </div>
                                             <div className="p-3 bg-blue-50 rounded-lg text-center border border-blue-100">
                                                <p className="text-[10px] text-blue-600 font-bold mb-1">متوسط السلة</p>
                                                <p className="text-lg font-black text-blue-800">{Math.round(customer.totalSpent / (customer.ordersCount || 1))} ج</p>
                                             </div>
                                          </div>
                                       </div>

                                       {/* 2. Notes & Preferences */}
                                       <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm h-full flex flex-col">
                                          <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-sm">
                                             <FileText className="w-4 h-4 text-gray-500" />
                                             ملاحظات وتفضيلات
                                          </h4>
                                          <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-100 mb-4 flex-1">
                                             <p className="text-xs text-yellow-800 leading-relaxed">
                                                {customer.notes || 'لا توجد ملاحظات مسجلة.'}
                                             </p>
                                          </div>
                                          <div className="mt-auto">
                                             <p className="text-xs font-bold text-gray-500 mb-2">القسم المفضل</p>
                                             <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 px-3 py-1.5 rounded text-xs font-bold">
                                                <Tag className="w-3 h-3" /> {customer.preferredCategory || 'غير محدد'}
                                             </span>
                                          </div>
                                       </div>

                                       {/* 3. Purchase History */}
                                       <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full">
                                          <div className="p-4 border-b border-gray-100">
                                             <h4 className="font-bold text-gray-800 flex items-center gap-2 text-sm">
                                                <History className="w-4 h-4 text-gray-500" />
                                                سجل المشتريات
                                             </h4>
                                          </div>
                                          <div className="flex-1 overflow-y-auto max-h-[250px]">
                                             {customer.history.length > 0 ? (
                                                <table className="w-full text-right text-xs">
                                                   <thead className="bg-gray-50 text-gray-500 sticky top-0">
                                                      <tr>
                                                         <th className="p-3 font-medium">الطلب</th>
                                                         <th className="p-3 font-medium">المنتجات</th>
                                                         <th className="p-3 font-medium">التاريخ</th>
                                                         <th className="p-3 font-medium">القيمة</th>
                                                         <th className="p-3 font-medium">الحالة</th>
                                                      </tr>
                                                   </thead>
                                                   <tbody className="divide-y divide-gray-50">
                                                      {customer.history.map(order => (
                                                         <tr key={order.id} className="hover:bg-gray-50">
                                                            <td className="p-3 font-mono font-bold text-gray-700">{order.id}</td>
                                                            <td className="p-3 text-gray-600 truncate max-w-[150px]" title={order.items}>{order.items}</td>
                                                            <td className="p-3 text-gray-500 whitespace-nowrap">{order.date}</td>
                                                            <td className="p-3 font-bold text-gray-800 whitespace-nowrap">{order.total} ج</td>
                                                            <td className="p-3">
                                                               <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold whitespace-nowrap ${getStatusColor(order.status)}`}>
                                                                  {getStatusLabel(order.status)}
                                                               </span>
                                                            </td>
                                                         </tr>
                                                      ))}
                                                   </tbody>
                                                </table>
                                             ) : (
                                                <div className="p-8 text-center text-gray-400 flex flex-col items-center justify-center h-full">
                                                   <ShoppingBag className="w-8 h-8 mb-2 opacity-30" />
                                                   <p className="text-xs">لا يوجد سجل مشتريات</p>
                                                </div>
                                             )}
                                          </div>
                                       </div>
                                    </div>

                                    {/* Quick Actions Footer */}
                                    <div className="flex gap-2 mt-6 justify-end pt-4 border-t border-gray-200/50">
                                        <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-50 flex items-center gap-2 transition">
                                            <MessageCircle className="w-4 h-4" />
                                            واتساب
                                        </button>
                                        <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-50 flex items-center gap-2 transition">
                                            <Mail className="w-4 h-4" />
                                            بريد إلكتروني
                                        </button>
                                        <button className="px-4 py-2 bg-purple-50 text-purple-700 border border-purple-100 rounded-lg text-sm font-bold hover:bg-purple-100 flex items-center gap-2 transition">
                                            <FileText className="w-4 h-4" />
                                            تعديل الملاحظات
                                        </button>
                                    </div>
                                 </div>
                              </td>
                           </tr>
                        )}
                     </React.Fragment>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      {/* Add Customer Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm animate-in fade-in">
           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                 <h3 className="font-bold text-gray-800">إضافة عميل جديد</h3>
                 <button onClick={() => setIsAddModalOpen(false)} className="p-1 hover:bg-gray-200 rounded-full"><X className="w-5 h-5 text-gray-500" /></button>
              </div>
              <form onSubmit={handleAddCustomer} className="p-6 space-y-4">
                 <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-600">الاسم بالكامل</label>
                    <input 
                      type="text" 
                      required
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm focus:border-purple-500 outline-none transition"
                      value={newCustomer.name}
                      onChange={e => setNewCustomer({...newCustomer, name: e.target.value})}
                    />
                 </div>
                 <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-600">رقم الهاتف</label>
                    <input 
                      type="tel" 
                      required
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm focus:border-purple-500 outline-none transition dir-ltr text-right"
                      value={newCustomer.phone}
                      onChange={e => setNewCustomer({...newCustomer, phone: e.target.value})}
                    />
                 </div>
                 <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-600">البريد الإلكتروني</label>
                    <input 
                      type="email" 
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm focus:border-purple-500 outline-none transition"
                      value={newCustomer.email}
                      onChange={e => setNewCustomer({...newCustomer, email: e.target.value})}
                    />
                 </div>
                 <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-600">العنوان</label>
                    <input 
                      type="text" 
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm focus:border-purple-500 outline-none transition"
                      value={newCustomer.address}
                      onChange={e => setNewCustomer({...newCustomer, address: e.target.value})}
                    />
                 </div>
                 
                 <button type="submit" className="w-full bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700 transition flex items-center justify-center gap-2 mt-4 shadow-lg">
                    <Save className="w-4 h-4" />
                    حفظ العميل
                 </button>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default CustomerManager;
