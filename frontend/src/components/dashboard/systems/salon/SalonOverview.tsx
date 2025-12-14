
import React, { useState, useEffect } from 'react';
import { 
  Calendar, Users, DollarSign, ShoppingBag, Plus, Scissors, 
  Sparkles, Clock, Settings2, Loader, AlertCircle
} from 'lucide-react';
import axios from 'axios';
import ActionButton from '../../../common/buttons/ActionButton';
import StatCard from '../../../common/cards/StatCard';
import StatusBadge from '../../../common/StatusBadge';
import DashboardCustomizer from '../../DashboardCustomizer';
import LoyaltyWidget from '../../shared/widgets/LoyaltyWidget';

interface SalonOverviewProps {
  setActiveTab: (tab: string) => void;
}

interface DashboardStats {
  id: string;
  title: string;
  value: string;
  sub: string;
  icon: any;
  color: 'pink' | 'purple' | 'teal' | 'blue';
  trend?: string;
}

interface DashboardAction {
  id: string;
  label: string;
  icon: any;
  color: string;
  onClick: () => void;
}

const SalonOverview: React.FC<SalonOverviewProps> = ({ setActiveTab }) => {
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [stats, setStats] = useState<DashboardStats[]>([]);
  const [actions, setActions] = useState<DashboardAction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const statsResponse = await axios.get<DashboardStats[]>('/api/dashboard/salon/stats');
        const fetchedStats = (statsResponse.data as DashboardStats[]).map((stat: any) => ({
          ...stat,
          icon: getIconForStat(stat.id)
        }));
        setStats(fetchedStats);

        const actionsResponse = await axios.get<DashboardAction[]>('/api/dashboard/salon/actions');
        const fetchedActions = (actionsResponse.data as DashboardAction[]).map((action: any) => ({
          ...action,
          icon: getIconForAction(action.id),
          onClick: () => setActiveTab(action.tabId)
        }));
        setActions(fetchedActions);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('فشل في تحميل بيانات لوحة التحكم');
        setStats([]);
        setActions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [setActiveTab]);

  const getIconForStat = (statId: string) => {
    const iconMap: Record<string, any> = {
      'stat_appts': Calendar,
      'stat_sales': Scissors,
      'stat_new_clients': Users,
      'stat_products': ShoppingBag,
    };
    return iconMap[statId] || Calendar;
  };

  const getIconForAction = (actionId: string) => {
    const iconMap: Record<string, any> = {
      'act_book': Plus,
      'act_pos': DollarSign,
      'act_new_client': Users,
      'act_sell_prod': ShoppingBag,
      'act_add_service': Sparkles,
      'act_attendance': Clock,
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
        <Loader className="w-8 h-8 text-pink-500 animate-spin" />
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
          className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-pink-600 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100 hover:border-pink-500 transition"
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
         {/* Upcoming Appointments */}
         <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-pink-500" />
                    المواعيد القادمة
                </h3>
                <div className="flex gap-2">
                   <span className="text-xs bg-pink-50 text-pink-800 px-2 py-1 rounded font-bold">اليوم</span>
                   <button 
                     onClick={() => setActiveTab('appointments')} 
                     className="text-xs font-bold text-pink-600 hover:bg-pink-50 px-2 py-1 rounded transition"
                   >
                     عرض الكل
                   </button>
                </div>
            </div>
            <div className="space-y-3">
                <AppointmentRow client="سارة أحمد" service="قص وسيشوار" staff="م. نادين" time="10:00 ص" status="confirmed" />
                <AppointmentRow client="هبة محمود" service="صبغة شعر" staff="م. ريهام" time="11:30 ص" status="in_progress" />
                <AppointmentRow client="منى زكي" service="مانيكير وباديكير" staff="م. سها" time="12:00 م" status="waiting" />
                <AppointmentRow client="رانيا يوسف" service="مكياج كامل" staff="م. دينا" time="01:00 م" status="confirmed" />
            </div>
         </div>

         {/* Staff & Loyalty */}
         <div className="space-y-6">
            <LoyaltyWidget 
               type="points" 
               title="نقاط الجمال" 
               current={850} 
               total={1000} 
               reward="جلسة باديكير" 
               color="bg-pink-600"
            />

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
               <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-lg text-gray-800">حالة فريق العمل</h3>
                  <button 
                    onClick={() => setActiveTab('staff')} 
                    className="text-xs font-bold text-pink-600 hover:bg-pink-50 px-2 py-1 rounded transition"
                  >
                    عرض
                  </button>
               </div>
               <div className="space-y-4">
                  <StaffCard name="م. نادين" role="تصفيف شعر" status="busy" />
                  <StaffCard name="م. ريهام" role="صبغات" status="busy" />
                  <StaffCard name="م. سها" role="عناية أظافر" status="available" />
                  <StaffCard name="م. دينا" role="مكياج" status="offline" />
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

const AppointmentRow = ({ client, service, staff, time, status }: any) => (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-sm transition">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-sm text-pink-600 border border-pink-100">
                {client.charAt(0)}
            </div>
            <div>
                <h4 className="font-bold text-sm text-gray-800">{client}</h4>
                <p className="text-xs text-gray-500">{service} • {staff}</p>
            </div>
        </div>
        <div className="text-left">
            <StatusBadge status={status} />
            <p className="text-[10px] text-gray-400 mt-1">{time}</p>
        </div>
    </div>
);

const StaffCard = ({ name, role, status }: any) => (
    <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full 
                ${status === 'available' ? 'bg-green-500' : status === 'busy' ? 'bg-orange-500' : 'bg-gray-400'}`}>
            </div>
            <div>
                <h4 className="font-bold text-sm text-gray-800">{name}</h4>
                <p className="text-xs text-gray-400">{role}</p>
            </div>
        </div>
        <span className="text-[10px] font-bold text-gray-500">
            {status === 'available' ? 'متاح' : status === 'busy' ? 'مشغول' : 'غير متاح'}
        </span>
    </div>
);

export default SalonOverview;
