
import React, { useState, useEffect } from 'react';
import { 
  Users, Clock, DollarSign, Activity, Plus, FileText, 
  Syringe, ClipboardList, Settings2, Loader, AlertCircle
} from 'lucide-react';
import ActionButton from '../../../common/buttons/ActionButton';
import StatCard from '../../../common/cards/StatCard';
import StatusBadge from '../../../common/StatusBadge';
import DashboardCustomizer from '../../DashboardCustomizer';
import { fetchDashboardOverview } from '../../../../services/analyticsService';

interface ClinicOverviewProps {
  setActiveTab: (tab: string) => void;
}

interface DashboardStats {
  id: string;
  title: string;
  value: string;
  sub: string;
  icon: any;
  color: 'blue' | 'yellow' | 'green' | 'red';
  trend?: string;
}

interface DashboardAction {
  id: string;
  label: string;
  icon: any;
  color: string;
  tabId: string;
  onClick: () => void;
}

const ClinicOverview: React.FC<ClinicOverviewProps> = ({ setActiveTab }) => {
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [stats, setStats] = useState<DashboardStats[]>([]);
  const [actions, setActions] = useState<DashboardAction[]>([]);
  const [queueRows, setQueueRows] = useState<
    Array<{ id: string; type?: string; time?: string; status?: string }>
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        const overview = await fetchDashboardOverview();

        const nextStats: DashboardStats[] = [
          {
            id: 'stat_patients',
            title: 'الزيارات/المواعيد',
            value: String(overview.overview.orders.current ?? 0),
            sub: `${overview.overview.orders.change >= 0 ? '+' : ''}${Math.round(overview.overview.orders.change ?? 0)}%`,
            icon: getIconForStat('stat_patients'),
            color: 'blue',
          },
          {
            id: 'stat_revenue',
            title: 'الإيرادات',
            value: `${(overview.overview.revenue.current ?? 0).toLocaleString()} ج`,
            sub: `${overview.overview.revenue.change >= 0 ? '+' : ''}${Math.round(overview.overview.revenue.change ?? 0)}%`,
            icon: getIconForStat('stat_revenue'),
            color: 'green',
          },
          {
            id: 'stat_services',
            title: 'الخدمات/المنتجات',
            value: String(overview.overview.products.total ?? 0),
            sub: `نشط: ${overview.overview.products.active ?? 0}`,
            icon: getIconForStat('stat_services'),
            color: 'yellow',
          },
          {
            id: 'stat_avg',
            title: 'متوسط الزيارة',
            value:
              overview.overview.orders.current
                ? `${Math.round((overview.overview.revenue.current ?? 0) / overview.overview.orders.current).toLocaleString()} ج`
                : 'N/A',
            sub: 'حسب بيانات الفترة',
            icon: getIconForStat('stat_avg'),
            color: 'red',
          },
        ];
        setStats(nextStats);

        const nextActions: DashboardAction[] = [
          {
            id: 'act_book',
            label: 'حجز موعد',
            icon: getIconForAction('act_book'),
            color: 'bg-teal-600 text-white',
            tabId: 'appointments',
            onClick: () => setActiveTab('appointments'),
          },
          {
            id: 'act_new_patient',
            label: 'مريض جديد',
            icon: getIconForAction('act_new_patient'),
            color: 'bg-white text-gray-700 border border-gray-200 hover:border-teal-600',
            tabId: 'patients',
            onClick: () => setActiveTab('patients'),
          },
          {
            id: 'act_rx',
            label: 'روشتة',
            icon: getIconForAction('act_rx'),
            color: 'bg-white text-gray-700 border border-gray-200 hover:border-teal-600',
            tabId: 'prescriptions',
            onClick: () => setActiveTab('prescriptions'),
          },
          {
            id: 'act_lab',
            label: 'تحاليل',
            icon: getIconForAction('act_lab'),
            color: 'bg-white text-gray-700 border border-gray-200 hover:border-teal-600',
            tabId: 'lab',
            onClick: () => setActiveTab('lab'),
          },
          {
            id: 'act_vaccine',
            label: 'تطعيم',
            icon: getIconForAction('act_vaccine'),
            color: 'bg-white text-gray-700 border border-gray-200 hover:border-teal-600',
            tabId: 'appointments',
            onClick: () => setActiveTab('appointments'),
          },
          {
            id: 'act_followup',
            label: 'متابعة',
            icon: getIconForAction('act_followup'),
            color: 'bg-white text-gray-700 border border-gray-200 hover:border-teal-600',
            tabId: 'appointments',
            onClick: () => setActiveTab('appointments'),
          },
        ];
        setActions(nextActions);

        const nextQueue = (overview.recentOrders || []).slice(0, 5).map((o) => ({
          id: o.orderNumber,
          type: o.status,
          time: new Date(o.createdAt).toLocaleTimeString(),
          status: o.status,
        }));
        setQueueRows(nextQueue);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('فشل في تحميل بيانات لوحة التحكم');
        setStats([]);
        setActions([]);
        setQueueRows([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [setActiveTab]);

  const getIconForStat = (statId: string) => {
    const iconMap: Record<string, any> = {
      'stat_patients': Users,
      'stat_waiting': Clock,
      'stat_revenue': DollarSign,
      stat_services: Activity,
      stat_avg: DollarSign,
      'stat_doctors': Users,
      'stat_monthly': DollarSign,
    };
    return iconMap[statId] || Users;
  };

  const getIconForAction = (actionId: string) => {
    const iconMap: Record<string, any> = {
      'act_book': Plus,
      'act_new_patient': Users,
      'act_rx': FileText,
      'act_lab': Activity,
      'act_vaccine': Syringe,
      'act_followup': ClipboardList,
    };
    return iconMap[actionId] || Plus;
  };

  const [visibleIds, setVisibleIds] = useState<string[]>([]);

  useEffect(() => {
    setVisibleIds([
      ...stats.map(s => s.id),
      ...actions.map(a => a.id)
    ]);
  }, [stats, actions]);

  const handleToggle = (id: string) => {
    setVisibleIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const customizerItems = [
    ...stats.map((s: DashboardStats) => ({ id: s.id, label: s.title, category: 'stats' as const })),
    ...actions.map((a: DashboardAction) => ({ id: a.id, label: a.label, category: 'actions' as const }))
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader className="w-8 h-8 text-teal-500 animate-spin" />
        <span className="mr-2 text-gray-600">جاري تحميل لوحة التحكم...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg text-red-700 flex items-center justify-center gap-2">
        <AlertCircle className="w-5 h-5" />
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      
      <div className="flex justify-end mb-[-10px]">
        <button 
          onClick={() => setIsCustomizerOpen(true)}
          className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-teal-600 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100 hover:border-teal-600 transition"
        >
          <Settings2 className="w-3 h-3" />
          تخصيص
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         {stats.filter((s: DashboardStats) => visibleIds.includes(s.id)).map((stat: DashboardStats) => (
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
        {actions.filter((a: DashboardAction) => visibleIds.includes(a.id)).map((action: DashboardAction) => (
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
         {/* Waiting Room List */}
         <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                    <Users className="w-5 h-5 text-gray-500" />
                    السجل الأخير ({queueRows.length})
                </h3>
                <div className="flex gap-2">
                   <button 
                     onClick={() => setActiveTab('appointments')} 
                     className="text-xs font-bold text-teal-600 hover:bg-teal-50 px-2 py-1 rounded transition"
                   >
                     عرض الجدول
                   </button>
                </div>
            </div>
            {queueRows.length === 0 ? (
              <div className="p-8 text-center text-gray-600">
                لا توجد بيانات حالياً
              </div>
            ) : (
              <div className="space-y-3">
                {queueRows.map((row) => (
                  <PatientRow key={row.id} name={row.id} type={row.type} time={row.time} status={row.status} />
                ))}
              </div>
            )}
         </div>

         {/* Doctor Status */}
         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-lg text-gray-800 mb-4">حالة الأطباء</h3>
            <div className="p-6 text-center text-gray-600">
              سيتم ربط حالة الأطباء ببيانات API عند توفرها.
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

const PatientRow = ({ name, type, time, status }: any) => (
    <div className={`flex items-center justify-between p-3 rounded-xl border transition
        ${status === 'current' ? 'bg-teal-50 border-teal-200 shadow-sm' : 'bg-white border-gray-100'}`}>
        <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm
                ${status === 'current' ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                {name.charAt(0)}
            </div>
            <div>
                <h4 className="font-bold text-sm text-gray-800">{name}</h4>
                <p className="text-xs text-gray-500">{type}</p>
            </div>
        </div>
        <div className="text-left">
            <StatusBadge status={status} />
            <p className="text-[10px] text-gray-400 mt-1">{time}</p>
        </div>
    </div>
);

export default ClinicOverview;
