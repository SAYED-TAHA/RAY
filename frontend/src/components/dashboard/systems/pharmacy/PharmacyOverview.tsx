
import React, { useState, useEffect } from 'react';
import { 
  Pill, FileText, AlertCircle, DollarSign, Plus, 
  ShoppingBag, Truck, Search, Tag, Settings2, Clock, CheckCircle, MapPin, Phone, Loader
} from 'lucide-react';
import axios from 'axios';
import ActionButton from '../../../common/buttons/ActionButton';
import StatCard from '../../../common/cards/StatCard';
import DashboardCustomizer from '../../DashboardCustomizer';

interface PharmacyOverviewProps {
  setActiveTab: (tab: string) => void;
}

interface DashboardStats {
  id: string;
  title: string;
  value: string;
  sub: string;
  icon: any;
  color: 'orange' | 'green' | 'teal' | 'blue';
  trend?: string;
}

interface DashboardAction {
  id: string;
  label: string;
  icon: any;
  color: string;
  onClick: () => void;
}

const PharmacyOverview: React.FC<PharmacyOverviewProps> = ({ setActiveTab }) => {
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
        
        const statsResponse = await axios.get<DashboardStats[]>('/api/dashboard/pharmacy/stats');
        const fetchedStats = (statsResponse.data as DashboardStats[]).map((stat: any) => ({
          ...stat,
          icon: getIconForStat(stat.id)
        }));
        setStats(fetchedStats);

        const actionsResponse = await axios.get<DashboardAction[]>('/api/dashboard/pharmacy/actions');
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
      'stat_pending': Clock,
      'stat_completed': CheckCircle,
      'stat_earnings': DollarSign,
      'stat_rating': Pill,
    };
    return iconMap[statId] || Pill;
  };

  const getIconForAction = (actionId: string) => {
    const iconMap: Record<string, any> = {
      'act_pending': Clock,
      'act_messages': FileText,
      'act_location': MapPin,
      'act_earnings': DollarSign,
      'act_contact': Phone,
      'act_profile': Plus,
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
         {/* Pending Orders */}
         <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-orange-500" />
                    الطلبات المعلقة
                </h3>
                <span className="text-xs bg-orange-50 text-orange-800 px-2 py-1 rounded font-bold">12 طلب</span>
            </div>
            <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-xl border border-orange-100">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-orange-500 shadow-sm">
                         <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                         <h4 className="font-bold text-sm text-gray-800">طلب #1024</h4>
                         <p className="text-xs text-orange-600">العنوان: شارع النيل، القاهرة</p>
                      </div>
                   </div>
                   <button 
                     onClick={() => setActiveTab('messages')}
                     className="text-xs font-bold text-orange-700 border border-orange-200 px-3 py-1 rounded bg-white hover:bg-orange-50 transition"
                   >
                     تفاصيل
                   </button>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl border border-blue-100">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-sm">
                         <Phone className="w-5 h-5" />
                      </div>
                      <div>
                         <h4 className="font-bold text-sm text-gray-800">طلب #1023</h4>
                         <p className="text-xs text-blue-700">العميل: أحمد محمد - 01012345678</p>
                      </div>
                   </div>
                   <button 
                     onClick={() => setActiveTab('messages')}
                     className="text-xs font-bold text-blue-700 border border-blue-200 px-3 py-1 rounded bg-white hover:bg-blue-50 transition"
                   >
                     اتصل
                   </button>
                </div>
            </div>
         </div>

         {/* Earnings Summary */}
         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-lg text-gray-800 mb-4">ملخص أرباحك</h3>
            <div className="space-y-4">
               <ItemRow name="اليوم" count="1,200 ج" />
               <ItemRow name="هذا الأسبوع" count="7,500 ج" />
               <ItemRow name="هذا الشهر" count="28,000 ج" />
               <ItemRow name="الإجمالي" count="145,000 ج" />
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

const ItemRow = ({ name, count }: any) => (
    <div className="flex justify-between items-center border-b border-gray-50 pb-2 last:border-0 last:pb-0">
        <span className="text-sm font-medium text-gray-700">{name}</span>
        <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded">{count}</span>
    </div>
);

export default PharmacyOverview;
