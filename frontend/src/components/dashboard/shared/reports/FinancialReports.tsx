
import React, { useState } from 'react';
import { 
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';
import { Download, Calendar, TrendingUp, TrendingDown, DollarSign, CreditCard, Wallet, CheckCircle, Loader2, FileText } from 'lucide-react';
import ExpensesManager from '../../systems/finance/ExpensesManager';

const salesData = [
  { name: '1', sales: 4000, expense: 2400 },
  { name: '2', sales: 3000, expense: 1398 },
  { name: '3', sales: 2000, expense: 9800 },
  { name: '4', sales: 2780, expense: 3908 },
  { name: '5', sales: 1890, expense: 4800 },
  { name: '6', sales: 2390, expense: 3800 },
  { name: '7', sales: 3490, expense: 4300 },
];

const pieData = [
  { name: 'مبيعات مباشرة', value: 65, color: '#10B981' },
  { name: 'توصيل', value: 25, color: '#3B82F6' },
  { name: 'تيك أواي', value: 10, color: '#F59E0B' },
];

const FinancialReports: React.FC = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [isExported, setIsExported] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'expenses'>('overview');

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setIsExported(true);
      setTimeout(() => setIsExported(false), 3000);
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Main Header with Tabs */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
         <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-100">
            <button 
               onClick={() => setActiveTab('overview')}
               className={`px-6 py-2 rounded-lg text-sm font-bold transition flex items-center gap-2 ${activeTab === 'overview' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
            >
               <TrendingUp className="w-4 h-4" />
               نظرة عامة
            </button>
            <button 
               onClick={() => setActiveTab('expenses')}
               className={`px-6 py-2 rounded-lg text-sm font-bold transition flex items-center gap-2 ${activeTab === 'expenses' ? 'bg-red-600 text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
            >
               <TrendingDown className="w-4 h-4" />
               إدارة المصروفات
            </button>
         </div>

         {/* Global Actions */}
         <div className="flex gap-2 bg-white p-1 rounded-xl border border-gray-100 relative">
           <button 
             onClick={() => setShowDatePicker(!showDatePicker)}
             className={`flex items-center gap-2 px-4 py-2 text-gray-700 rounded-lg text-sm font-bold border transition
               ${showDatePicker ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-gray-200 hover:bg-gray-50'}
             `}
           >
             <Calendar className="w-4 h-4" />
             نوفمبر 2025
           </button>
           
           {showDatePicker && (
             <div className="absolute top-full mt-2 left-0 bg-white shadow-xl rounded-xl border border-gray-100 p-2 z-50 min-w-[150px] animate-in zoom-in-95 duration-200">
                <button className="w-full text-right p-2 text-sm hover:bg-gray-50 rounded-lg font-bold">أكتوبر 2025</button>
                <button className="w-full text-right p-2 text-sm hover:bg-gray-50 rounded-lg font-bold">سبتمبر 2025</button>
                <button className="w-full text-right p-2 text-sm hover:bg-gray-50 rounded-lg font-bold">أغسطس 2025</button>
             </div>
           )}

           <button 
             onClick={handleExport}
             disabled={isExporting || isExported}
             className={`flex items-center gap-2 px-4 py-2 text-white rounded-lg shadow-sm text-sm font-bold transition min-w-[140px] justify-center
               ${isExported ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'}
             `}
           >
             {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : isExported ? <CheckCircle className="w-4 h-4" /> : <Download className="w-4 h-4" />}
             {isExporting ? 'جاري التصدير...' : isExported ? 'تم التحميل' : 'تصدير Excel'}
           </button>
        </div>
      </div>

      {/* Content Switch */}
      {activeTab === 'expenses' ? (
         <ExpensesManager />
      ) : (
         <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                     <div className="p-3 bg-green-50 rounded-xl text-green-600"><Wallet className="w-6 h-6" /></div>
                     <span className="text-gray-500 font-bold text-sm">إجمالي الإيرادات</span>
                  </div>
                  <h3 className="text-3xl font-black text-gray-900 mb-1">145,680 ج</h3>
                  <p className="text-green-600 text-sm font-bold flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" /> +12.5% عن الشهر الماضي
                  </p>
               </div>
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                     <div className="p-3 bg-red-50 rounded-xl text-red-600"><CreditCard className="w-6 h-6" /></div>
                     <span className="text-gray-500 font-bold text-sm">المصروفات</span>
                  </div>
                  <h3 className="text-3xl font-black text-gray-900 mb-1">42,300 ج</h3>
                  <p className="text-red-600 text-sm font-bold flex items-center gap-1">
                  <TrendingDown className="w-4 h-4" /> +5% زيادة تكاليف
                  </p>
               </div>
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                     <div className="p-3 bg-blue-50 rounded-xl text-blue-600"><DollarSign className="w-6 h-6" /></div>
                     <span className="text-gray-500 font-bold text-sm">صافي الربح</span>
                  </div>
                  <h3 className="text-3xl font-black text-gray-900 mb-1">103,380 ج</h3>
                  <p className="text-blue-600 text-sm font-bold flex items-center gap-1">
                  هامش ربح 71%
                  </p>
               </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
               {/* Main Chart */}
               <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-800 mb-6">تحليل الإيرادات والمصروفات (أسبوعي)</h3>
                  <div className="h-72 w-full" dir="ltr">
                     <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={salesData}>
                           <defs>
                              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                 <stop offset="5%" stopColor="#10B981" stopOpacity={0.1}/>
                                 <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                              </linearGradient>
                              <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                                 <stop offset="5%" stopColor="#EF4444" stopOpacity={0.1}/>
                                 <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                              </linearGradient>
                           </defs>
                           <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                           <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF'}} dy={10} />
                           <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF'}} />
                           <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
                           <Area type="monotone" dataKey="sales" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" name="الإيرادات" />
                           <Area type="monotone" dataKey="expense" stroke="#EF4444" strokeWidth={3} fillOpacity={1} fill="url(#colorExpense)" name="المصروفات" />
                        </AreaChart>
                     </ResponsiveContainer>
                  </div>
               </div>

               {/* Breakdown Chart */}
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-800 mb-4">مصادر الدخل</h3>
                  <div className="h-56 w-full relative">
                     <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                           <Pie
                              data={pieData}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              paddingAngle={5}
                              dataKey="value"
                           >
                              {pieData.map((entry, index) => (
                                 <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                           </Pie>
                           <Tooltip />
                        </PieChart>
                     </ResponsiveContainer>
                     {/* Center Text */}
                     <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-3xl font-black text-gray-800">100%</span>
                        <span className="text-xs text-gray-500">المجموع</span>
                     </div>
                  </div>
                  <div className="space-y-3 mt-4">
                     {pieData.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-sm">
                           <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full" style={{backgroundColor: item.color}}></div>
                              <span className="text-gray-600">{item.name}</span>
                           </div>
                           <span className="font-bold text-gray-800">{item.value}%</span>
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
               <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="font-bold text-lg text-gray-800">سجل المعاملات المالية</h3>
               </div>
               <table className="w-full text-right">
                  <thead className="bg-gray-50 text-gray-500 text-xs font-bold">
                     <tr>
                        <th className="p-4">المعرف</th>
                        <th className="p-4">الوصف</th>
                        <th className="p-4">التاريخ</th>
                        <th className="p-4">النوع</th>
                        <th className="p-4">المبلغ</th>
                        <th className="p-4">الحالة</th>
                     </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-50">
                     {[1, 2, 3, 4].map((i) => (
                        <tr key={i} className="hover:bg-gray-50/50 transition">
                           <td className="p-4 font-mono text-gray-600">#TRX-99{i}</td>
                           <td className="p-4 font-bold text-gray-800">فاتورة مبيعات {i % 2 === 0 ? 'نقدية' : 'آجلة'}</td>
                           <td className="p-4 text-gray-500">22 نوفمبر 2025</td>
                           <td className="p-4"><span className={`px-2 py-1 rounded text-xs font-bold ${i % 2 === 0 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>{i % 2 === 0 ? 'دخل' : 'دخل'}</span></td>
                           <td className="p-4 font-bold text-gray-900">+1,250.00 ج</td>
                           <td className="p-4"><span className="text-green-600 text-xs font-bold">مكتمل</span></td>
                        </tr>
                     ))}
                     <tr className="bg-red-50/30 hover:bg-red-50/50 transition">
                        <td className="p-4 font-mono text-gray-600">#EXP-502</td>
                        <td className="p-4 font-bold text-gray-800">فاتورة كهرباء</td>
                        <td className="p-4 text-gray-500">21 نوفمبر 2025</td>
                        <td className="p-4"><span className="px-2 py-1 rounded text-xs font-bold bg-red-100 text-red-700">مصروف</span></td>
                        <td className="p-4 font-bold text-red-600">-850.00 ج</td>
                        <td className="p-4"><span className="text-green-600 text-xs font-bold">مدفوع</span></td>
                     </tr>
                  </tbody>
               </table>
            </div>
         </>
      )}
    </div>
  );
};

export default FinancialReports;
