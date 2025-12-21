import React, { useEffect, useMemo, useState } from 'react';
import { 
  Truck, Droplets, Calendar, Users, 
  Settings2, Navigation, Gauge, Plus, Layers, AlertCircle, Loader
} from 'lucide-react';
import ActionButton from '../../../common/buttons/ActionButton';
import StatCard from '../../../common/cards/StatCard';
import DashboardCustomizer from '../../DashboardCustomizer';
import { fetchDashboardOverview } from '../../../../services/analyticsService';

interface CarWashOverviewProps {
  setActiveTab: (tab: string) => void;
}

const CarWashOverview: React.FC<CarWashOverviewProps> = ({ setActiveTab }) => {
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
        console.error('Failed to load carwash overview:', e);
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
      { id: 'stat_fleet', title: "الأسطول النشط", value: "-", sub: "سيارات", icon: Truck, color: "blue" as const },
      { id: 'stat_water', title: "مخزون المياه", value: "-", sub: "الإجمالي", icon: Droplets, color: "cyan" as const },
      { id: 'stat_jobs', title: "طلبات اليوم", value: String(orders), sub: `${ordersChange >= 0 ? '+' : ''}${ordersChange}%`, icon: Calendar, color: "green" as const },
      { id: 'stat_rev', title: "الإيرادات", value: revenue.toLocaleString(), sub: `${revenueChange >= 0 ? '+' : ''}${revenueChange}%`, icon: Gauge, color: "yellow" as const },
    ];
  }, [overview]);

  const defaultActions = [
    { id: 'act_book', label: "حجز جديد", icon: Plus, color: "bg-cyan-600 text-white", onClick: () => setActiveTab('schedule') },
    { id: 'act_dispatch', label: "توجيه وحدة", icon: Navigation, color: "bg-white text-gray-700 border border-gray-200 hover:border-cyan-500", onClick: () => setActiveTab('fleet') },
    { id: 'act_stock', label: "جرد المواد", icon: Layers, color: "bg-white text-gray-700 border border-gray-200 hover:border-cyan-500", onClick: () => setActiveTab('inventory') },
    { id: 'act_client', label: "عميل جديد", icon: Users, color: "bg-white text-gray-700 border border-gray-200 hover:border-cyan-500", onClick: () => setActiveTab('customers') },
  ];

  const [visibleIds, setVisibleIds] = useState<string[]>([
    ...defaultStats.map(s => s.id),
    ...defaultActions.map(a => a.id)
  ]);

  // Load saved config
  useEffect(() => {
    const savedConfig = localStorage.getItem('ray_dashboard_config_carwash');
    if (savedConfig) {
      try {
        setVisibleIds(JSON.parse(savedConfig));
      } catch (e) {
        console.error('Error parsing dashboard config', e);
      }
    }
  }, []);

  const handleToggle = (id: string) => {
    setVisibleIds(prev => {
      const newState = prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id];
      localStorage.setItem('ray_dashboard_config_carwash', JSON.stringify(newState));
      return newState;
    });
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
          className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-cyan-600 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100 hover:border-cyan-500 transition"
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
              <Truck className="w-5 h-5 text-cyan-600" />
              حالة الوحدات المتنقلة (Vans)
            </h3>
            <button
              onClick={() => setActiveTab('fleet')}
              className="text-sm text-cyan-600 font-bold hover:bg-cyan-50 px-3 py-1 rounded transition"
            >
              عرض الخريطة
            </button>
          </div>
          <div className="p-10 text-center text-gray-600 space-y-3">
            <div>لا توجد بيانات بعد</div>
            <button
              onClick={() => setActiveTab('fleet')}
              className="text-xs font-bold text-cyan-700 bg-cyan-50 px-3 py-2 rounded-lg hover:bg-cyan-100 transition"
            >
              إدارة الوحدات
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-bold text-lg text-gray-800 mb-4">الطلبات الحالية</h3>
          <div className="p-10 text-center text-gray-600 space-y-3">
            <div>لا توجد بيانات بعد</div>
            <button
              onClick={() => setActiveTab('schedule')}
              className="text-xs font-bold text-cyan-700 bg-cyan-50 px-3 py-2 rounded-lg hover:bg-cyan-100 transition"
            >
              إضافة حجز
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

export default CarWashOverview;
