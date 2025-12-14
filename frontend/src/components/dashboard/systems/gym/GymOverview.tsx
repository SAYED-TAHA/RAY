
import React, { useState, useEffect } from 'react';
import { 
  Users, CreditCard, Clock, ShoppingBag, Plus, QrCode, Activity, Dumbbell, Settings2, Loader, AlertCircle
} from 'lucide-react';
import axios from 'axios';
import ActionButton from '../../../common/buttons/ActionButton';
import StatCard from '../../../common/cards/StatCard';
import DashboardCustomizer from '../../DashboardCustomizer';

interface GymOverviewProps {
  setActiveTab: (tab: string) => void;
}

interface DashboardStats {
  id: string;
  title: string;
  value: string;
  sub: string;
  icon: any;
  color: 'yellow' | 'green' | 'red' | 'blue';
  trend?: string;
}

interface DashboardAction {
  id: string;
  label: string;
  icon: any;
  color: string;
  onClick: () => void;
}

const GymOverview: React.FC<GymOverviewProps> = ({ setActiveTab }) => {
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
        
        const statsResponse = await axios.get<DashboardStats[]>('/api/dashboard/gym/stats');
        const fetchedStats = (statsResponse.data as DashboardStats[]).map((stat: any) => ({
          ...stat,
          icon: getIconForStat(stat.id)
        }));
        setStats(fetchedStats);

        const actionsResponse = await axios.get<DashboardAction[]>('/api/dashboard/gym/actions');
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
      'stat_attendance': Users,
      'stat_new': CreditCard,
      'stat_expiring': Clock,
      'stat_sales': ShoppingBag,
      'stat_revenue': CreditCard,
      'stat_members': Users,
    };
    return iconMap[statId] || Users;
  };

  const getIconForAction = (actionId: string) => {
    const iconMap: Record<string, any> = {
      'act_new_member': Plus,
      'act_renew': CreditCard,
      'act_checkin': QrCode,
      'act_sell': ShoppingBag,
      'act_inbody': Activity,
      'act_class': Dumbbell,
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
        <Loader className="w-8 h-8 text-yellow-500 animate-spin" />
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
          className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-yellow-600 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100 hover:border-yellow-500 transition"
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
         {/* Live Access Log */}
         <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                    <QrCode className="w-5 h-5 text-gray-500" />
                    سجل الدخول المباشر
                </h3>
                <div className="flex gap-2">
                   <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded font-bold">معدل الذروة: 65%</span>
                   <button 
                     onClick={() => setActiveTab('access')}
                     className="text-xs bg-yellow-50 text-yellow-700 px-2 py-1 rounded font-bold hover:bg-yellow-100 transition"
                   >
                     عرض السجل
                   </button>
                </div>
            </div>
            <div className="space-y-3">
                <AccessRow name="عمرو دياب" plan="VIP سنوي" time="منذ دقيقة" status="valid" />
                <AccessRow name="تامر حسني" plan="شهري" time="منذ 5 دقائق" status="valid" />
                <AccessRow name="محمد رمضان" plan="3 شهور" time="منذ 12 دقيقة" status="expired" />
                <AccessRow name="شيرين" plan="حصص خاصة" time="منذ 20 دقيقة" status="valid" />
            </div>
         </div>

         {/* Class Capacity */}
         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-4">
               <h3 className="font-bold text-lg text-gray-800">حصص اليوم</h3>
               <button 
                 onClick={() => setActiveTab('classes')}
                 className="text-xs font-bold text-yellow-600 hover:bg-yellow-50 px-2 py-1 rounded transition"
               >
                 الجدول الكامل
               </button>
            </div>
            <div className="space-y-4">
               <ClassCard title="Zumba" time="05:00 م" trainer="كابتن سارة" capacity={20} filled={15} />
               <ClassCard title="CrossFit" time="07:00 م" trainer="كابتن علي" capacity={12} filled={12} />
               <ClassCard title="Yoga" time="09:00 م" trainer="كابتن نورا" capacity={15} filled={8} />
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

const AccessRow = ({ name, plan, time, status }: any) => (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
        <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border
                ${status === 'valid' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
                {status === 'valid' ? '✔' : '✕'}
            </div>
            <div>
                <h4 className="font-bold text-sm text-gray-800">{name}</h4>
                <p className="text-xs text-gray-500">{plan}</p>
            </div>
        </div>
        <div className="text-left">
            <span className="text-[10px] text-gray-400">{time}</span>
            {status === 'expired' && <p className="text-[10px] text-red-500 font-bold mt-1">منتهي</p>}
        </div>
    </div>
);

const ClassCard = ({ title, time, trainer, capacity, filled }: any) => {
    const percent = (filled / capacity) * 100;
    return (
        <div className="p-3 rounded-xl border border-gray-100 bg-gray-50">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h4 className="font-bold text-sm">{title}</h4>
                    <p className="text-xs text-gray-500">{trainer}</p>
                </div>
                <span className="text-xs font-bold bg-white px-2 py-1 rounded border">{time}</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
                <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${percent >= 100 ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${percent}%` }}></div>
                </div>
                <span className="text-[10px] text-gray-500">{filled}/{capacity}</span>
            </div>
        </div>
    );
};

export default GymOverview;
