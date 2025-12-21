import React, { useEffect, useMemo, useState } from 'react';
import { 
  HardHat, Activity, DollarSign, Package, Plus, Truck, 
  Warehouse, FileText, Users, Settings2, AlertTriangle, 
  Loader, AlertCircle
} from 'lucide-react';
import ActionButton from '../../../common/buttons/ActionButton';
import StatCard from '../../../common/cards/StatCard';
import DashboardCustomizer from '../../DashboardCustomizer';
import { fetchDashboardOverview } from '../../../../services/analyticsService';

interface ContractingOverviewProps {
  setActiveTab: (tab: string) => void;
}

const ContractingOverview: React.FC<ContractingOverviewProps> = ({ setActiveTab }) => {
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [overview, setOverview] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchDashboardOverview();
        setOverview(data);
      } catch (e) {
        console.error('Failed to load contracting overview:', e);
        setError('تعذر تحميل بيانات لوحة التحكم');
        setOverview(null);
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
      { id: 'stat_projects', title: "مشاريع/طلبات", value: String(orders), sub: `${ordersChange >= 0 ? '+' : ''}${ordersChange}%`, icon: HardHat, color: "orange" as const },
      { id: 'stat_progress', title: "نسبة الإنجاز", value: "-", sub: "غير متاح", icon: Activity, color: "blue" as const },
      { id: 'stat_billing', title: "الإيرادات", value: revenue.toLocaleString(), sub: `${revenueChange >= 0 ? '+' : ''}${revenueChange}%`, icon: DollarSign, color: "green" as const },
      { id: 'stat_stock', title: "مواد/منتجات", value: String(products), sub: "إجمالي", icon: Package, color: "purple" as const },
    ];
  }, [overview]);

  const defaultActions = [
    { id: 'act_project', label: "مشروع جديد", icon: Plus, color: "bg-orange-600 text-white", onClick: () => setActiveTab('projects') },
    { id: 'act_supply', label: "طلب توريد", icon: Truck, color: "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:border-orange-500", onClick: () => setActiveTab('suppliers') },
    { id: 'act_stock', label: "صرف خامات", icon: Warehouse, color: "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:border-orange-500", onClick: () => setActiveTab('warehouse') },
    { id: 'act_invoice', label: "إضافة مستخلص", icon: FileText, color: "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:border-orange-500", onClick: () => setActiveTab('finance') },
    { id: 'act_labor', label: "تسجيل عمالة", icon: Users, color: "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:border-orange-500", onClick: () => setActiveTab('labor') },
    { id: 'act_tender', label: "مناقصة جديدة", icon: FileText, color: "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:border-orange-500", onClick: () => setActiveTab('tenders') },
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
      
      <div className="flex justify-end mb-2">
        <button 
          onClick={() => setIsCustomizerOpen(true)}
          className="flex items-center gap-2 text-xs font-bold text-gray-500 dark:text-gray-400 hover:text-orange-600 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm border border-gray-200 dark:border-gray-700 hover:border-orange-500 transition-all active:scale-95"
        >
          <Settings2 className="w-3 h-3" />
          تخصيص
        </button>
      </div>

      {loading ? (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-10 text-center text-gray-600 dark:text-gray-300 flex items-center justify-center gap-2">
          <Loader className="w-5 h-5 animate-spin" />
          جاري التحميل...
        </div>
      ) : error ? (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-10 text-center text-red-700 dark:text-red-400 flex items-center justify-center gap-2">
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
         {/* Project Updates */}
         <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 hover:shadow-md transition-all">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-gray-800 dark:text-white">آخر تحديثات المشاريع</h3>
                <button 
                  onClick={() => setActiveTab('projects')}
                  className="text-sm text-orange-600 font-bold hover:underline hover:text-orange-700 transition-colors"
                >
                  عرض الجدول
                </button>
            </div>
            <div className="p-10 text-center text-gray-600 dark:text-gray-300">
              لا توجد خدمة Backend لهذا القسم حالياً
            </div>
         </div>

         {/* Material Alerts */}
         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 hover:shadow-md transition-all">
            <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-4 flex items-center gap-2">
               <AlertTriangle className="w-5 h-5 text-red-500" />
               نواقص المخزن والمواقع
            </h3>
            <div className="p-10 text-center text-gray-600 dark:text-gray-300">
              لا توجد خدمة Backend لهذا القسم حالياً
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

export default ContractingOverview;
