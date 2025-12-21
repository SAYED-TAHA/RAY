import React, { useEffect, useMemo, useState } from 'react';
import { 
  Car, Key, UserCheck, DollarSign, Plus, Calculator, 
  FileText, Wrench, Printer, Settings2, Loader, AlertCircle
} from 'lucide-react';
import ActionButton from '../../../common/buttons/ActionButton';
import StatCard from '../../../common/cards/StatCard';
import DashboardCustomizer from '../../DashboardCustomizer';
import { fetchDashboardOverview } from '../../../../services/analyticsService';

interface CarsOverviewProps {
  setActiveTab: (tab: string) => void;
}

const CarsOverview: React.FC<CarsOverviewProps> = ({ setActiveTab }) => {
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
        console.error('Failed to load cars overview:', e);
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
    return [
      { id: 'stat_sales', title: "طلبات/مبيعات", value: String(orders), sub: `${ordersChange >= 0 ? '+' : ''}${ordersChange}%`, icon: Car, color: "red" as const },
      { id: 'stat_inventory', title: "متاح في المعرض", value: "-", sub: "سيارة", icon: Key, color: "blue" as const },
      { id: 'stat_drives', title: "طلبات تجربة", value: "-", sub: "اليوم", icon: UserCheck, color: "yellow" as const },
      { id: 'stat_finance', title: "الإيرادات", value: revenue.toLocaleString(), sub: `${revenueChange >= 0 ? '+' : ''}${revenueChange}%`, icon: DollarSign, color: "green" as const },
    ];
  }, [overview]);

  const defaultActions = [
    { id: 'act_add_car', label: "إضافة سيارة", icon: Plus, color: "bg-red-700 text-white", onClick: () => setActiveTab('inventory') },
    { id: 'act_test_drive', label: "حجز تجربة", icon: Key, color: "bg-white text-gray-700 border border-gray-200 hover:border-red-600", onClick: () => setActiveTab('test_drives') },
    { id: 'act_calc', label: "حاسبة أقساط", icon: Calculator, color: "bg-white text-gray-700 border border-gray-200 hover:border-red-600", onClick: () => setActiveTab('installments') },
    { id: 'act_contract', label: "عقد بيع", icon: FileText, color: "bg-white text-gray-700 border border-gray-200 hover:border-red-600", onClick: () => setActiveTab('sales') },
    { id: 'act_service', label: "أمر صيانة", icon: Wrench, color: "bg-white text-gray-700 border border-gray-200 hover:border-red-600", onClick: () => setActiveTab('maintenance') },
    { id: 'act_report', label: "تقرير المخزون", icon: Printer, color: "bg-white text-gray-700 border border-gray-200 hover:border-red-600", onClick: () => setActiveTab('inventory') },
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
          className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-red-600 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100 hover:border-red-600 transition"
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
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
              <Wrench className="w-5 h-5 text-gray-500" />
              حالة مركز الصيانة
            </h3>
            <button
              onClick={() => setActiveTab('maintenance')}
              className="text-xs font-bold text-red-600 hover:bg-red-50 px-2 py-1 rounded transition"
            >
              عرض الكل
            </button>
          </div>
          <div className="p-10 text-center text-gray-600 space-y-3">
            <div>لا توجد بيانات بعد</div>
            <button
              onClick={() => setActiveTab('maintenance')}
              className="text-xs font-bold text-red-700 bg-red-50 px-3 py-2 rounded-lg hover:bg-red-100 transition"
            >
              إضافة أمر صيانة
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg text-gray-800">تجارب القيادة اليوم</h3>
            <button
              onClick={() => setActiveTab('test_drives')}
              className="text-xs font-bold text-red-600 hover:bg-red-50 px-2 py-1 rounded transition"
            >
              عرض الجدول
            </button>
          </div>
          <div className="p-10 text-center text-gray-600 space-y-3">
            <div>لا توجد بيانات بعد</div>
            <button
              onClick={() => setActiveTab('test_drives')}
              className="text-xs font-bold text-red-700 bg-red-50 px-3 py-2 rounded-lg hover:bg-red-100 transition"
            >
              إضافة حجز تجربة
            </button>
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

export default CarsOverview;
