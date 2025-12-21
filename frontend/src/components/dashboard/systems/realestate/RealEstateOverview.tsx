import React, { useEffect, useMemo, useState } from 'react';
import { 
  BadgeDollarSign, Home, Users, Calendar, Plus, 
  Calculator, FileText, Camera, Settings2 
} from 'lucide-react';
import ActionButton from '../../../common/buttons/ActionButton';
import StatCard from '../../../common/cards/StatCard';
import DashboardCustomizer from '../../DashboardCustomizer';
import { fetchDashboardOverview } from '../../../../services/analyticsService';

interface RealEstateOverviewProps {
  setActiveTab: (tab: string) => void;
}

const RealEstateOverview: React.FC<RealEstateOverviewProps> = ({ setActiveTab }) => {
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
        console.error('Failed to load realestate overview:', e);
        setError('تعذر تحميل بيانات لوحة التحكم');
        setOverview(null);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const defaultStats = useMemo(() => {
    const revenue = Number(overview?.overview?.revenue?.current ?? 0);
    const revenueChange = Number(overview?.overview?.revenue?.change ?? 0);
    const orders = Number(overview?.overview?.orders?.current ?? 0);
    return [
      { id: 'stat_sales', title: "الإيرادات", value: revenue.toLocaleString(), sub: `${revenueChange >= 0 ? '+' : ''}${revenueChange}%`, icon: BadgeDollarSign, color: "green" as const },
      { id: 'stat_units', title: "وحدات متاحة", value: "-", sub: "غير متاح", icon: Home, color: "blue" as const },
      { id: 'stat_leads', title: "عملاء جدد (Leads)", value: "-", sub: "غير متاح", icon: Users, color: "purple" as const },
      { id: 'stat_showings', title: "طلبات/حجوزات", value: String(orders), sub: "اليوم", icon: Calendar, color: "orange" as const },
    ];
  }, [overview]);

  const defaultActions = [
    { id: 'act_add_unit', label: "إضافة وحدة", icon: Plus, color: "bg-green-700 text-white", onClick: () => setActiveTab('properties') },
    { id: 'act_new_lead', label: "عميل جديد", icon: Users, color: "bg-white text-gray-700 border border-gray-200 hover:border-green-600", onClick: () => setActiveTab('leads') },
    { id: 'act_showing', label: "حجز معاينة", icon: Calendar, color: "bg-white text-gray-700 border border-gray-200 hover:border-green-600", onClick: () => setActiveTab('showings') },
    { id: 'act_calc', label: "حاسبة التمويل", icon: Calculator, color: "bg-white text-gray-700 border border-gray-200 hover:border-green-600", onClick: () => setActiveTab('installments') },
    { id: 'act_contract', label: "إنشاء عقد", icon: FileText, color: "bg-white text-gray-700 border border-gray-200 hover:border-green-600", onClick: () => setActiveTab('contracts') },
    { id: 'act_tour', label: "جولة افتراضية", icon: Camera, color: "bg-white text-gray-700 border border-gray-200 hover:border-green-600", onClick: () => setActiveTab('properties') },
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
          className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-green-600 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100 hover:border-green-600 transition"
        >
          <Settings2 className="w-3 h-3" />
          تخصيص
        </button>
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center text-gray-600">
          جاري التحميل...
        </div>
      ) : error ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center text-red-700">
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
         {/* Pipeline Visualization */}
         <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-lg text-gray-800 mb-6">مسار المبيعات (Pipeline)</h3>
            <div className="p-10 text-center text-gray-600">
              لا توجد خدمة Backend لهذا القسم حالياً
            </div>
         </div>

         {/* Recent Inquiries */}
         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-lg text-gray-800 mb-4">أحدث الاستفسارات</h3>
            <div className="p-10 text-center text-gray-600">
              لا توجد خدمة Backend لهذا القسم حالياً
            </div>
            <button 
              onClick={() => setActiveTab('leads')}
              className="w-full mt-4 py-2 text-sm font-bold text-green-700 bg-green-50 rounded-lg hover:bg-green-100 transition"
            >
              عرض كل العملاء
            </button>
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

export default RealEstateOverview;
