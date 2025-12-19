
import React, { useMemo, useState, useEffect } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { Package, Settings2, ShoppingCart, DollarSign, TrendingUp } from 'lucide-react';
import QuickActions from '../widgets/QuickActions';
import StatsGrid from '../widgets/StatsGrid';
import RecentActivityTable from '../widgets/RecentActivityTable';
import DashboardCustomizer from '../../DashboardCustomizer';
import Breadcrumbs from '../../../common/Breadcrumbs';
import { DashboardConfig, BusinessType } from '../../config';
import { fetchDashboardOverview, fetchSalesReport } from '../../../../services/analyticsService';

interface OverviewProps {
  config: DashboardConfig;
  currentBusinessType: BusinessType;
  theme: any;
  onNavigate: (tab: string) => void;
}

const Overview: React.FC<OverviewProps> = ({ config, currentBusinessType, theme, onNavigate }) => {
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [visibleIds, setVisibleIds] = useState<string[]>([]);
  const [chartData, setChartData] = useState<Array<{ name: string; sales: number }>>([]);
  const [recentRows, setRecentRows] = useState<
    Array<{ id: string; col1?: string; col2?: string; col3?: string; status?: string; time?: string }>
  >([]);
  const [stats, setStats] = useState<DashboardConfig['stats']>([]);
  const [apiError, setApiError] = useState<string | null>(null);

  const statItems = stats.map((stat, idx) => ({
    id: `stat-${idx}`,
    label: stat.label,
    category: 'stats' as const
  }));

  const actionItems = config.quickActions.map((action, idx) => ({
    id: `action-${idx}`,
    label: action.label,
    category: 'actions' as const
  }));

  useEffect(() => {
    const allIds = [...statItems.map(i => i.id), ...actionItems.map(i => i.id)];
    setVisibleIds(allIds);
  }, [currentBusinessType, stats.length]);

  useEffect(() => {
    const load = async () => {
      try {
        setApiError(null);
        const [overview, sales] = await Promise.all([
          fetchDashboardOverview(),
          fetchSalesReport(undefined, undefined, 'day')
        ]);

        const nextStats: DashboardConfig['stats'] = [
          {
            label: 'الطلبات',
            value: String(overview.overview.orders.current ?? 0),
            trend: Math.round(overview.overview.orders.change ?? 0),
            icon: ShoppingCart,
          },
          {
            label: 'الإيرادات',
            value: `${(overview.overview.revenue.current ?? 0).toLocaleString()} ج`,
            trend: Math.round(overview.overview.revenue.change ?? 0),
            icon: DollarSign,
          },
          {
            label: 'المنتجات',
            value: String(overview.overview.products.total ?? 0),
            trend: 0,
            icon: Package,
          },
          {
            label: 'متوسط الطلب',
            value: overview.overview.orders.current
              ? `${Math.round((overview.overview.revenue.current ?? 0) / overview.overview.orders.current).toLocaleString()} ج`
              : 'N/A',
            trend: 0,
            icon: TrendingUp,
          },
        ];
        setStats(nextStats);

        const nextRecent = (overview.recentOrders || []).slice(0, 5).map((o) => ({
          id: o.orderNumber,
          col1: o.status,
          col2: new Date(o.createdAt).toLocaleDateString(),
          col3: `${(o.pricing?.total ?? 0).toLocaleString()} ج`,
          status: o.status,
          time: new Date(o.createdAt).toLocaleString(),
        }));
        setRecentRows(nextRecent);

        const nextChart = (sales.salesData || []).slice(-7).map((p) => ({
          name: p.period,
          sales: p.revenue
        }));
        setChartData(nextChart);
      } catch (e) {
        console.error('Failed to load dashboard overview data:', e);
        setApiError('تعذر تحميل بيانات التحليلات حالياً');
        setChartData([]);
        setRecentRows([]);
        setStats([]);
      }
    };

    load();
  }, []);

  const handleToggle = (id: string) => {
    setVisibleIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleQuickAction = (action: string) => {
    if (action.includes('pos') || action.includes('sale') || action.includes('sell')) onNavigate('pos');
    else if (action.includes('order') || action.includes('receive')) onNavigate('orders');
    else if (action.includes('product') || action.includes('inventory') || action.includes('car')) onNavigate('inventory');
    else if (action.includes('report') || action.includes('expense') || action.includes('invoice')) onNavigate('reports');
    else if (action.includes('customer') || action.includes('patient') || action.includes('member') || action.includes('lead')) onNavigate('customers');
    else if (action.includes('appointment') || action.includes('book') || action.includes('schedule')) onNavigate('appointments');
    else if (action.includes('shift') || action.includes('setting')) onNavigate('settings');
    else if (action.includes('contract')) onNavigate('contracts');
    else if (action.includes('job') || action.includes('request')) onNavigate('jobs');
    else if (action.includes('class')) onNavigate('classes');
    else if (action.includes('supplier')) onNavigate('suppliers');
    else onNavigate(action);
  };

  const displayedStats = useMemo(
    () => stats.filter((_, idx) => visibleIds.includes(`stat-${idx}`)),
    [stats, visibleIds]
  );
  const displayedActions = config.quickActions.filter((_, idx) => visibleIds.includes(`action-${idx}`));

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 relative pb-20">
      
      <div className="flex justify-between items-end mb-[-20px]">
        <Breadcrumbs items={[{ label: config.title }]} />
        
        <button 
          onClick={() => setIsCustomizerOpen(true)}
          className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-ray-blue bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100 hover:border-ray-blue transition"
        >
          <Settings2 className="w-3 h-3" />
          تخصيص الواجهة
        </button>
      </div>

      {displayedActions.length > 0 && (
        <QuickActions 
            actions={displayedActions} 
            theme={theme} 
            themeColor={config.themeColor} 
            onActionClick={handleQuickAction}
        />
      )}

      {displayedStats.length > 0 && (
        <StatsGrid stats={displayedStats} theme={theme} />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-800">
                {currentBusinessType === 'clinic' ? 'تحليل الزيارات' : 'تحليل المبيعات'} (الأسبوع الحالي)
              </h3>
              <select className="bg-gray-50 border border-gray-200 rounded-lg text-sm p-1 text-gray-700">
                <option>هذا الأسبوع</option>
                <option>الشهر الماضي</option>
              </select>
          </div>
          <div className="h-64 md:h-80 w-full" dir="ltr">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={config.themeColor === 'orange' ? '#F97316' : '#1E3A8A'} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={config.themeColor === 'orange' ? '#F97316' : '#1E3A8A'} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF'}} width={40} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="sales" 
                  stroke={config.themeColor === 'orange' ? '#F97316' : '#1E3A8A'} 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorSales)" 
                />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-600">
                {apiError ? apiError : 'لا توجد بيانات متاحة'}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
          <h3 className="text-lg font-bold mb-4 text-gray-800">تنبيهات النظام</h3>
          <div className="flex-1 p-6 text-center text-gray-600">
            لا توجد تنبيهات متاحة حالياً. سيتم ربط التنبيهات ببيانات النظام عند توفر API.
          </div>
          <button disabled className={`w-full py-3 rounded-xl text-white font-bold mt-4 transition ${theme.btn} opacity-60 cursor-not-allowed`}>
            عرض كل التنبيهات
          </button>
        </div>
      </div>

      <RecentActivityTable 
        config={config} 
        currentBusinessType={currentBusinessType} 
        theme={theme} 
        onNavigate={onNavigate}
        rows={recentRows}
      />

      <DashboardCustomizer 
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        items={[...statItems, ...actionItems]}
        visibleIds={visibleIds}
        onToggle={handleToggle}
      />
    </div>
  );
};

export default Overview;
