
import React, { useState, useEffect } from 'react';
import { 
  DollarSign, ChefHat, Utensils, Truck, Plus, Calendar, 
  Clock, Package, Printer, AlertCircle, CheckCircle, Settings2, Loader
} from 'lucide-react';
import axios from 'axios';
import ActionButton from '../../../common/buttons/ActionButton';
import StatCard from '../../../common/cards/StatCard';
import StatusBadge from '../../../common/StatusBadge';
import DashboardCustomizer from '../../DashboardCustomizer';

interface RestaurantOverviewProps {
  setActiveTab: (tab: string) => void;
}

interface DashboardStats {
  id: string;
  title: string;
  value: string;
  sub: string;
  icon: any;
  color: 'orange' | 'yellow' | 'blue' | 'green';
  trend: string;
}

interface DashboardAction {
  id: string;
  label: string;
  icon: any;
  color: string;
  onClick: () => void;
}

const RestaurantOverview: React.FC<RestaurantOverviewProps> = ({ setActiveTab }) => {
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [stats, setStats] = useState<DashboardStats[]>([]);
  const [actions, setActions] = useState<DashboardAction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch dashboard data from API
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch stats from API
        const statsResponse = await axios.get<DashboardStats[]>('/api/dashboard/restaurant/stats');
        const fetchedStats = (statsResponse.data as DashboardStats[]).map((stat: any) => ({
          ...stat,
          icon: getIconForStat(stat.id)
        }));
        setStats(fetchedStats);

        // Fetch actions from API
        const actionsResponse = await axios.get<DashboardAction[]>('/api/dashboard/restaurant/actions');
        const fetchedActions = (actionsResponse.data as DashboardAction[]).map((action: any) => ({
          ...action,
          icon: getIconForAction(action.id),
          onClick: () => setActiveTab(action.tabId)
        }));
        setActions(fetchedActions);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('فشل في تحميل بيانات لوحة التحكم');
        // Set default empty arrays on error
        setStats([]);
        setActions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [setActiveTab]);

  // Helper function to get icon based on stat ID
  const getIconForStat = (statId: string) => {
    const iconMap: Record<string, any> = {
      'stat_sales': DollarSign,
      'stat_kitchen': ChefHat,
      'stat_tables': Utensils,
      'stat_delivery': Truck,
      'stat_rating': CheckCircle,
      'stat_revenue': DollarSign,
    };
    return iconMap[statId] || DollarSign;
  };

  // Helper function to get icon based on action ID
  const getIconForAction = (actionId: string) => {
    const iconMap: Record<string, any> = {
      'act_new_order': Plus,
      'act_book_table': Calendar,
      'act_shift': Clock,
      'act_expense': DollarSign,
      'act_stock': Package,
      'act_report': Printer,
    };
    return iconMap[actionId] || Plus;
  };

  const [visibleIds, setVisibleIds] = useState<string[]>([]);

  // Update visible IDs when stats and actions are loaded
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

  // Show loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader className="w-8 h-8 text-orange-500 animate-spin" />
        <span className="mr-2 text-gray-600">جاري تحميل لوحة التحكم...</span>
      </div>
    );
  }

  // Show error state
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
          className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-orange-600 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100 hover:border-orange-500 transition"
        >
          <Settings2 className="w-3 h-3" />
          تخصيص
        </button>
      </div>

      {/* Quick Stats Row */}
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

      {/* Quick Actions */}
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
        {/* Active Orders */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg text-gray-800">الطلبات النشطة</h3>
            <button 
              onClick={() => setActiveTab('orders')}
              className="text-sm text-orange-600 font-bold hover:underline"
            >
              عرض الكل
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead className="bg-gray-50 text-gray-500 text-xs">
                <tr>
                  <th className="p-3 rounded-r-lg">رقم الطلب</th>
                  <th className="p-3">النوع</th>
                  <th className="p-3">العميل/الطاولة</th>
                  <th className="p-3">الوقت</th>
                  <th className="p-3">الحالة</th>
                  <th className="p-3 rounded-l-lg">المبلغ</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-gray-50">
                  <td className="p-3 font-bold">#1054</td>
                  <td className="p-3"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">صالة</span></td>
                  <td className="p-3">T-05</td>
                  <td className="p-3 text-gray-500">منذ 12 د</td>
                  <td className="p-3"><StatusBadge status="preparing" /></td>
                  <td className="p-3 font-bold">450 ج</td>
                </tr>
                <tr className="border-b border-gray-50">
                  <td className="p-3 font-bold">#1055</td>
                  <td className="p-3"><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">توصيل</span></td>
                  <td className="p-3">أحمد محمد</td>
                  <td className="p-3 text-gray-500">منذ 5 د</td>
                  <td className="p-3"><StatusBadge status="pending" /></td>
                  <td className="p-3 font-bold">120 ج</td>
                </tr>
                <tr className="border-b border-gray-50">
                  <td className="p-3 font-bold">#1056</td>
                  <td className="p-3"><span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">تيك أواي</span></td>
                  <td className="p-3">كابتن علي</td>
                  <td className="p-3 text-gray-500">منذ 2 د</td>
                  <td className="p-3"><StatusBadge status="pending" /></td>
                  <td className="p-3 font-bold">85 ج</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Alerts & Kitchen Status */}
        <div className="space-y-6">
           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  تنبيهات المطبخ
                </h3>
                <button 
                  onClick={() => setActiveTab('inventory')}
                  className="text-xs font-bold text-orange-600 hover:bg-orange-50 px-2 py-1 rounded transition"
                >
                  المخزون
                </button>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-xl border border-red-100">
                  <span className="text-sm font-medium text-red-800">برجر لحم</span>
                  <span className="text-xs bg-white px-2 py-1 rounded text-red-600 font-bold">باقي 3 قطع</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-xl border border-yellow-100">
                  <span className="text-sm font-medium text-yellow-800">صوص جبنة</span>
                  <span className="text-xs bg-white px-2 py-1 rounded text-yellow-600 font-bold">ينفد قريباً</span>
                </div>
              </div>
           </div>

           <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-gray-400 text-sm">كفاءة المطبخ</p>
                  <h3 className="text-2xl font-bold">94%</h3>
                </div>
                <div className="bg-green-500/20 p-2 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                <div className="bg-green-500 h-2 rounded-full" style={{width: '94%'}}></div>
              </div>
              <p className="text-xs text-gray-400">متوسط وقت التحضير: 12 دقيقة</p>
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

export default RestaurantOverview;
