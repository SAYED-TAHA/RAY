
import React, { useEffect, useMemo, useState } from 'react';
import { 
  DollarSign, ChefHat, Utensils, Truck, Plus, Calendar, 
  Clock, Package, Printer, AlertCircle, CheckCircle, Settings2, Loader
} from 'lucide-react';
import ActionButton from '../../../common/buttons/ActionButton';
import StatCard from '../../../common/cards/StatCard';
import StatusBadge from '../../../common/StatusBadge';
import DashboardCustomizer from '../../DashboardCustomizer';
import { fetchDashboardOverview } from '../../../../services/analyticsService';

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
  const [recentOrders, setRecentOrders] = useState<
    Array<{ orderNumber: string; status: string; pricing: { total: number }; createdAt: string }>
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch dashboard data from API
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        const overview = await fetchDashboardOverview();

        const nextStats: DashboardStats[] = [
          {
            id: 'stat_orders',
            title: 'الطلبات',
            value: String(overview.overview.orders.current ?? 0),
            sub: `${overview.overview.orders.change >= 0 ? '+' : ''}${overview.overview.orders.change ?? 0}%`,
            icon: getIconForStat('stat_orders'),
            color: 'orange'
          },
          {
            id: 'stat_revenue',
            title: 'الإيرادات',
            value: `${(overview.overview.revenue.current ?? 0).toLocaleString()} ج`,
            sub: `${overview.overview.revenue.change >= 0 ? '+' : ''}${overview.overview.revenue.change ?? 0}%`,
            icon: getIconForStat('stat_revenue'),
            color: 'green'
          },
          {
            id: 'stat_products',
            title: 'المنتجات',
            value: String(overview.overview.products.total ?? 0),
            sub: `نشط: ${overview.overview.products.active ?? 0}`,
            icon: getIconForStat('stat_products'),
            color: 'blue'
          },
          {
            id: 'stat_pending',
            title: 'طلبات حديثة',
            value: String(Array.isArray(overview.recentOrders) ? overview.recentOrders.length : 0),
            sub: 'آخر الطلبات',
            icon: getIconForStat('stat_pending'),
            color: 'yellow'
          }
        ];

        setStats(nextStats);
        setRecentOrders(Array.isArray(overview.recentOrders) ? overview.recentOrders : []);

        const nextActions: DashboardAction[] = [
          { id: 'act_new_order', label: 'طلب جديد', icon: getIconForAction('act_new_order'), color: 'bg-orange-600 text-white', onClick: () => setActiveTab('orders') },
          { id: 'act_pos', label: 'الكاشير', icon: getIconForAction('act_pos'), color: 'bg-white text-gray-700 border border-gray-200 hover:border-orange-500', onClick: () => setActiveTab('pos') },
          { id: 'act_menu', label: 'قائمة الطعام', icon: getIconForAction('act_menu'), color: 'bg-white text-gray-700 border border-gray-200 hover:border-orange-500', onClick: () => setActiveTab('menu') },
          { id: 'act_stock', label: 'المخزون', icon: getIconForAction('act_stock'), color: 'bg-white text-gray-700 border border-gray-200 hover:border-orange-500', onClick: () => setActiveTab('inventory') },
          { id: 'act_reports', label: 'التقارير', icon: getIconForAction('act_report'), color: 'bg-white text-gray-700 border border-gray-200 hover:border-orange-500', onClick: () => setActiveTab('reports') },
          { id: 'act_reservations', label: 'الحجوزات', icon: getIconForAction('act_reservations'), color: 'bg-white text-gray-700 border border-gray-200 hover:border-orange-500', onClick: () => setActiveTab('reservations') }
        ];

        setActions(nextActions);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('فشل في تحميل بيانات لوحة التحكم');
        // Set default empty arrays on error
        setStats([]);
        setActions([]);
        setRecentOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [setActiveTab]);

  // Helper function to get icon based on stat ID
  const getIconForStat = (statId: string) => {
    const iconMap: Record<string, any> = {
      stat_orders: Utensils,
      stat_revenue: DollarSign,
      stat_products: Package,
      stat_pending: Clock,
    };
    return iconMap[statId] || DollarSign;
  };

  // Helper function to get icon based on action ID
  const getIconForAction = (actionId: string) => {
    const iconMap: Record<string, any> = {
      'act_new_order': Plus,
      act_pos: Utensils,
      act_menu: ChefHat,
      act_reservations: Calendar,
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

  const customizerItems = useMemo(
    () => [
      ...stats.map((s: DashboardStats) => ({ id: s.id, label: s.title, category: 'stats' as const })),
      ...actions.map((a: DashboardAction) => ({ id: a.id, label: a.label, category: 'actions' as const }))
    ],
    [actions, stats]
  );

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
                {recentOrders.length === 0 ? (
                  <tr>
                    <td className="p-6 text-center text-gray-600" colSpan={6}>
                      لا توجد طلبات حالياً
                    </td>
                  </tr>
                ) : (
                  recentOrders.slice(0, 5).map((o) => (
                    <tr key={o.orderNumber} className="border-b border-gray-50">
                      <td className="p-3 font-bold">{o.orderNumber}</td>
                      <td className="p-3"><span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">-</span></td>
                      <td className="p-3">-</td>
                      <td className="p-3 text-gray-500">{new Date(o.createdAt).toLocaleString()}</td>
                      <td className="p-3"><StatusBadge status={o.status} /></td>
                      <td className="p-3 font-bold">{(o.pricing?.total ?? 0).toLocaleString()} ج</td>
                    </tr>
                  ))
                )}
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
              <div className="p-6 text-center text-gray-600">
                لا توجد تنبيهات متاحة حالياً. سيتم ربط تنبيهات المطبخ ببيانات المخزون عند توفر API.
              </div>
           </div>

           <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-gray-400 text-sm">كفاءة المطبخ</p>
                  <h3 className="text-2xl font-bold">N/A</h3>
                </div>
                <div className="bg-green-500/20 p-2 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                <div className="bg-green-500 h-2 rounded-full" style={{width: '0%'}}></div>
              </div>
              <p className="text-xs text-gray-400">متوسط وقت التحضير: N/A</p>
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
