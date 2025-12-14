
import React, { useState } from 'react';
import { 
  Shirt, Scissors, TrendingUp, Users, ShoppingBag, 
  Tag, RotateCcw, Printer, Search, AlertTriangle, Settings2,
  Grid, Plus, ArrowRight, DollarSign, Calendar
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ActionButton from '../../../common/buttons/ActionButton';
import StatCard from '../../../common/cards/StatCard';
import DashboardCustomizer from '../../DashboardCustomizer';

interface ClothingOverviewProps {
  setActiveTab: (tab: string) => void;
}

const data = [
  { name: 'السبت', sales: 4000 },
  { name: 'الأحد', sales: 3000 },
  { name: 'الاثنين', sales: 2000 },
  { name: 'الثلاثاء', sales: 2780 },
  { name: 'الأربعاء', sales: 1890 },
  { name: 'الخميس', sales: 2390 },
  { name: 'الجمعة', sales: 3490 },
];

const ClothingOverview: React.FC<ClothingOverviewProps> = ({ setActiveTab }) => {
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  const defaultStats = [
    { id: 'stat_sales', title: "مبيعات اليوم", value: "12,400 ج", sub: "45 قطعة", icon: TrendingUp, color: "pink" as const },
    { id: 'stat_items', title: "قطع مباعة", value: "45", sub: "+10 عن أمس", icon: Shirt, color: "blue" as const },
    { id: 'stat_collections', title: "الكولكشن النشط", value: "3", sub: "مجموعات", icon: Grid, color: "purple" as const },
    { id: 'stat_returns', title: "المرتجعات", value: "3", sub: "قطع", icon: RotateCcw, color: "orange" as const },
  ];

  const defaultActions = [
    { id: 'act_sale', label: "بيع جديد", icon: ShoppingBag, color: "bg-pink-600 text-white", onClick: () => setActiveTab('shop') },
    { id: 'act_add', label: "إضافة موديل", icon: Shirt, color: "bg-white text-gray-700 border border-gray-200 hover:border-pink-500", onClick: () => setActiveTab('products') },
    { id: 'act_collection', label: "كولكشن جديد", icon: Grid, color: "bg-white text-gray-700 border border-gray-200 hover:border-pink-500", onClick: () => setActiveTab('collections') },
    { id: 'act_stock', label: "جرد سريع", icon: Search, color: "bg-white text-gray-700 border border-gray-200 hover:border-pink-500", onClick: () => setActiveTab('inventory') },
    { id: 'act_barcode', label: "طباعة باركود", icon: Printer, color: "bg-white text-gray-700 border border-gray-200 hover:border-pink-500", onClick: () => setActiveTab('products') },
    { id: 'act_return', label: "مرتجع", icon: RotateCcw, color: "bg-white text-gray-700 border border-gray-200 hover:border-pink-500", onClick: () => setActiveTab('reports') },
  ];

  const [visibleIds, setVisibleIds] = useState<string[]>([
    ...defaultStats.map(s => s.id),
    ...defaultActions.map(a => a.id)
  ]);

  const handleToggle = (id: string) => {
    setVisibleIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const customizerItems = [
    ...defaultStats.map(s => ({ id: s.id, label: s.title, category: 'stats' as const })),
    ...defaultActions.map(a => ({ id: a.id, label: a.label, category: 'actions' as const }))
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      
      <div className="flex justify-end mb-[-10px]">
        <button 
          onClick={() => setIsCustomizerOpen(true)}
          className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-pink-600 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100 hover:border-pink-500 transition"
        >
          <Settings2 className="w-3 h-3" />
          تخصيص
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         {defaultStats.filter(s => visibleIds.includes(s.id)).map(stat => (
           <StatCard 
             key={stat.id}
             title={stat.title} 
             value={stat.value} 
             sub={stat.sub} 
             icon={stat.icon} 
             color={stat.color} 
           />
         ))}
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {defaultActions.filter(a => visibleIds.includes(a.id)).map(action => (
          <ActionButton 
            key={action.id}
            icon={action.icon} 
            label={action.label} 
            color={action.color} 
            onClick={action.onClick} 
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Sales Chart */}
         <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-pink-600" />
                    تحليل المبيعات الأسبوعي
                </h3>
                <div className="flex items-center gap-2 text-sm">
                   <span className="w-3 h-3 rounded-full bg-pink-500"></span>
                   <span className="text-gray-500">المبيعات (ج.م)</span>
                </div>
            </div>
            <div className="h-64 w-full" dir="ltr">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                     <defs>
                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#EC4899" stopOpacity={0.2}/>
                           <stop offset="95%" stopColor="#EC4899" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
                     <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                     <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                     />
                     <Area type="monotone" dataKey="sales" stroke="#EC4899" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Stock Alerts & Top Selling */}
         <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  نواقص المقاسات
                </h3>
                <div className="space-y-3">
                  <div className="flex gap-3 items-center p-2 rounded-xl hover:bg-gray-50 transition border border-transparent hover:border-gray-100">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 shrink-0">
                        <Shirt className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm text-gray-800 truncate">بنطلون جينز Slim</h4>
                        <p className="text-xs text-red-500 font-bold">مقاس 32 غير متوفر</p>
                      </div>
                      <button onClick={() => setActiveTab('inventory')} className="text-xs bg-pink-50 text-pink-600 px-2 py-1 rounded-lg font-bold hover:bg-pink-100">طلب</button>
                  </div>
                  <div className="flex gap-3 items-center p-2 rounded-xl hover:bg-gray-50 transition border border-transparent hover:border-gray-100">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 shrink-0">
                        <Shirt className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm text-gray-800 truncate">فستان صيفي مشجر</h4>
                        <p className="text-xs text-yellow-600 font-bold">مقاس M وشك النفاذ</p>
                      </div>
                      <button onClick={() => setActiveTab('inventory')} className="text-xs bg-pink-50 text-pink-600 px-2 py-1 rounded-lg font-bold hover:bg-pink-100">طلب</button>
                  </div>
                </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white shadow-lg">
               <h4 className="font-bold text-sm text-gray-300 mb-2">الأعلى مبيعاً هذا الأسبوع</h4>
               <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-black">تيشيرت بيزيك</span>
                  <span className="bg-white/20 px-2 py-1 rounded text-xs font-bold">150 قطعة</span>
               </div>
               <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-pink-500 h-full" style={{width: '85%'}}></div>
               </div>
               <p className="text-xs text-gray-400 mt-2 text-left">85% من الهدف الأسبوعي</p>
            </div>
         </div>
      </div>

      <DashboardCustomizer 
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        items={customizerItems}
        visibleIds={visibleIds}
        onToggle={handleToggle}
      />
    </div>
  );
};

export default ClothingOverview;
