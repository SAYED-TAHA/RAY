import React, { useEffect, useMemo, useState } from 'react';
import { 
  TrendingUp, ShoppingBag, 
  RotateCcw, Printer, Search, AlertTriangle, Settings2,
  Grid, DollarSign, Loader, AlertCircle
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ActionButton from '../../../common/buttons/ActionButton';
import StatCard from '../../../common/cards/StatCard';
import DashboardCustomizer from '../../DashboardCustomizer';
import { fetchDashboardOverview, fetchSalesReport } from '../../../../services/analyticsService';

interface ClothingOverviewProps {
  setActiveTab: (tab: string) => void;
}

const ClothingOverview: React.FC<ClothingOverviewProps> = ({ setActiveTab }) => {
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [overview, setOverview] = useState<any>(null);
  const [chartData, setChartData] = useState<Array<{ name: string; sales: number }>>([]);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const [o, sales] = await Promise.all([
          fetchDashboardOverview(),
          fetchSalesReport(undefined, undefined, 'day')
        ]);
        setOverview(o);
        const nextChart = (sales.salesData || []).slice(-7).map((p: any) => ({
          name: String(p.period ?? ''),
          sales: Number(p.revenue ?? 0)
        }));
        setChartData(nextChart);
      } catch (e) {
        console.error('Failed to load clothing overview:', e);
        setError('تعذر تحميل بيانات لوحة التحكم');
        setOverview(null);
        setChartData([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const defaultStats = useMemo(() => {
    const orders = Number(overview?.overview?.orders?.current ?? 0);
    const ordersChange = Number(overview?.overview?.orders?.change ?? 0);
    const revenue = Number(overview?.overview?.revenue?.current ?? 0);
    const revenueChange = Number(overview?.overview?.revenue?.change ?? 0);
    const products = Number(overview?.overview?.products?.total ?? 0);

    return [
      { id: 'stat_sales', title: "الإيرادات", value: `${revenue.toLocaleString()} ج`, sub: `${revenueChange >= 0 ? '+' : ''}${revenueChange}%`, icon: DollarSign, color: "pink" as const },
      { id: 'stat_items', title: "الطلبات", value: String(orders), sub: `${ordersChange >= 0 ? '+' : ''}${ordersChange}%`, icon: ShoppingBag, color: "blue" as const },
      { id: 'stat_collections', title: "المنتجات", value: String(products), sub: "إجمالي", icon: Grid, color: "purple" as const },
      { id: 'stat_returns', title: "المرتجعات", value: "-", sub: "غير متاح", icon: RotateCcw, color: "orange" as const },
    ];
  }, [overview]);

  const defaultActions = [
    { id: 'act_sale', label: "بيع جديد", icon: ShoppingBag, color: "bg-pink-600 text-white", onClick: () => setActiveTab('shop') },
    { id: 'act_add', label: "إضافة موديل", icon: Grid, color: "bg-white text-gray-700 border border-gray-200 hover:border-pink-500", onClick: () => setActiveTab('products') },
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

      {loading ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center text-gray-600 flex items-center justify-center gap-2">
          <Loader className="w-5 h-5 animate-spin" />
          جاري التحميل...
        </div>
      ) : error ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center text-red-700 flex items-center justify-center gap-2">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      ) : null}

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
               {chartData.length > 0 ? (
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
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
               ) : (
                 <div className="h-full flex items-center justify-center text-gray-600">
                   {error ? error : 'لا توجد بيانات متاحة'}
                 </div>
               )}
            </div>
         </div>

         {/* Stock Alerts & Top Selling */}
         <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  نواقص المقاسات
                </h3>
                <div className="p-10 text-center text-gray-600">
                  لا توجد خدمة Backend لهذا القسم حالياً
                </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white shadow-lg">
               <div className="text-center text-gray-200">
                 لا توجد خدمة Backend لهذا القسم حالياً
               </div>
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
