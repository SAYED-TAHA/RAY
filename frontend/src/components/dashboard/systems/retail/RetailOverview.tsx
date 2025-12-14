import React, { useState, useEffect } from 'react';
import { 
  Store, DollarSign, ShoppingCart, Users, TrendingUp, 
  Package, AlertCircle, Settings2, Plus, Loader
} from 'lucide-react';
import axios from 'axios';
import StatCard from '../../../common/cards/StatCard';
import ActionButton from '../../../common/buttons/ActionButton';
import DashboardCustomizer from '../../DashboardCustomizer';

interface RetailOverviewProps {
  setActiveTab: (tab: string) => void;
}

interface DashboardStats {
  id: string;
  title: string;
  value: string;
  sub: string;
  icon: any;
  color: 'green' | 'orange' | 'blue' | 'yellow';
  trend?: string;
}

interface DashboardAction {
  id: string;
  label: string;
  icon: any;
  color: string;
  onClick: () => void;
}

const RetailOverview: React.FC<RetailOverviewProps> = ({ setActiveTab }) => {
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
        
        const statsResponse = await axios.get<DashboardStats[]>('/api/dashboard/retail/stats');
        const fetchedStats = (statsResponse.data as DashboardStats[]).map((stat: any) => ({
          ...stat,
          icon: getIconForStat(stat.id)
        }));
        setStats(fetchedStats);

        const actionsResponse = await axios.get<DashboardAction[]>('/api/dashboard/retail/actions');
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
      'stat_sales': DollarSign,
      'stat_orders': ShoppingCart,
      'stat_customers': Users,
      'stat_stock': Package,
      'stat_revenue': TrendingUp,
      'stat_growth': TrendingUp,
    };
    return iconMap[statId] || DollarSign;
  };

  const getIconForAction = (actionId: string) => {
    const iconMap: Record<string, any> = {
      'act_new_sale': Plus,
      'act_inventory': Package,
      'act_customers': Users,
      'act_orders': ShoppingCart,
      'act_suppliers': Store,
      'act_reports': TrendingUp,
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
        <Loader className="w-8 h-8 text-green-500 animate-spin" />
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
    <div className="h-full flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Store className="w-6 h-6 text-green-600" />
            نظرة عامة على المبيعات
          </h2>
          <p className="text-sm text-gray-500">ملخص الأداء اليومي والشهري</p>
        </div>
        <button
          onClick={() => setIsCustomizerOpen(true)}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <Settings2 className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat: DashboardStats) => 
          visibleIds.includes(stat.id) && (
            <StatCard
              key={stat.id}
              title={stat.title}
              value={stat.value}
              sub={stat.sub}
              icon={stat.icon}
              color={stat.color}
            />
          )
        )}
      </div>

      {/* Actions Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {actions.map((action: DashboardAction) =>
          visibleIds.includes(action.id) && (
            <ActionButton
              key={action.id}
              label={action.label}
              icon={action.icon}
              className={action.color}
              onClick={action.onClick}
            />
          )
        )}
      </div>

      {/* Customizer */}
      {isCustomizerOpen && (
        <DashboardCustomizer
          isOpen={isCustomizerOpen}
          items={customizerItems}
          visibleIds={visibleIds}
          onToggle={handleToggle}
          onClose={() => setIsCustomizerOpen(false)}
        />
      )}
    </div>
  );
};

export default RetailOverview;
