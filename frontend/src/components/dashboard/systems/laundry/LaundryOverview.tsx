import React, { useEffect, useMemo, useState } from 'react';
import { 
  Shirt, Waves, CheckCircle, Clock, Plus, Tag, 
  Ticket, Truck, Settings2, Loader, AlertCircle
} from 'lucide-react';
import ActionButton from '../../../common/buttons/ActionButton';
import StatCard from '../../../common/cards/StatCard';
import DashboardCustomizer from '../../DashboardCustomizer';
import { fetchDashboardOverview } from '../../../../services/analyticsService';

interface LaundryOverviewProps {
  setActiveTab: (tab: string) => void;
}

const LaundryOverview: React.FC<LaundryOverviewProps> = ({ setActiveTab }) => {
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
        console.error('Failed to load laundry overview:', e);
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
    return [
      { id: 'stat_received', title: "قطع مستلمة", value: String(orders), sub: `${ordersChange >= 0 ? '+' : ''}${ordersChange}%`, icon: Shirt, color: "blue" as const },
      { id: 'stat_processing', title: "في التشغيل", value: "-", sub: "غسيل وكي", icon: Waves, color: "cyan" as const },
      { id: 'stat_ready', title: "جاهز للتسليم", value: "-", sub: "انتظار عميل", icon: CheckCircle, color: "green" as const },
      { id: 'stat_urgent', title: "طلبات مستعجلة", value: "-", sub: "أولوية قصوى", icon: Clock, color: "red" as const },
    ];
  }, [overview]);

  const defaultActions = [
    { id: 'act_receive', label: "استلام ملابس", icon: Plus, color: "bg-cyan-600 text-white", onClick: () => setActiveTab('received') },
    { id: 'act_deliver', label: "تسليم عميل", icon: CheckCircle, color: "bg-white text-gray-700 border border-gray-200 hover:border-cyan-600", onClick: () => setActiveTab('ready') },
    { id: 'act_urgent', label: "طلب مستعجل", icon: Clock, color: "bg-white text-gray-700 border border-gray-200 hover:border-cyan-600", onClick: () => setActiveTab('received') },
    { id: 'act_tag', label: "طباعة تاج", icon: Tag, color: "bg-white text-gray-700 border border-gray-200 hover:border-cyan-600", onClick: () => setActiveTab('received') },
    { id: 'act_sub', label: "اشتراك جديد", icon: Ticket, color: "bg-white text-gray-700 border border-gray-200 hover:border-cyan-600", onClick: () => setActiveTab('subscriptions') },
    { id: 'act_delivery', label: "طلب توصيل", icon: Truck, color: "bg-white text-gray-700 border border-gray-200 hover:border-cyan-600", onClick: () => setActiveTab('delivery') },
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
          className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-cyan-600 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100 hover:border-cyan-600 transition"
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
              <Waves className="w-5 h-5 text-cyan-600" />
              مراحل التشغيل
            </h3>
          </div>
          <div className="p-10 text-center text-gray-600 space-y-3">
            <div>لا توجد بيانات بعد</div>
            <button
              onClick={() => setActiveTab('received')}
              className="text-xs font-bold text-cyan-700 bg-cyan-50 px-3 py-2 rounded-lg hover:bg-cyan-100 transition"
            >
              ابدأ بإضافة استلام
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 text-center text-gray-600 space-y-3">
            <div>لا توجد بيانات بعد</div>
            <button
              onClick={() => setActiveTab('subscriptions')}
              className="text-xs font-bold text-cyan-700 bg-cyan-50 px-3 py-2 rounded-lg hover:bg-cyan-100 transition"
            >
              إدارة الاشتراكات
            </button>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 text-center text-gray-600 space-y-3">
            <div>لا توجد بيانات بعد</div>
            <button
              onClick={() => setActiveTab('reports')}
              className="text-xs font-bold text-cyan-700 bg-cyan-50 px-3 py-2 rounded-lg hover:bg-cyan-100 transition"
            >
              عرض التقارير
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

export default LaundryOverview;
