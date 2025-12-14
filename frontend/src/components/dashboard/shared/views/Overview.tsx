
import React, { useState, useEffect } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { Bell, Settings, Settings2 } from 'lucide-react';
import QuickActions from '../widgets/QuickActions';
import StatsGrid from '../widgets/StatsGrid';
import RecentActivityTable from '../widgets/RecentActivityTable';
import DashboardCustomizer from '../../DashboardCustomizer';
import Breadcrumbs from '../../../common/Breadcrumbs';
import { DashboardConfig, BusinessType } from '../../config';

const chartData = [
  { name: 'السبت', sales: 4000 },
  { name: 'الأحد', sales: 3000 },
  { name: 'الاثنين', sales: 2000 },
  { name: 'الثلاثاء', sales: 2780 },
  { name: 'الأربعاء', sales: 1890 },
  { name: 'الخميس', sales: 2390 },
  { name: 'الجمعة', sales: 3490 },
];

interface OverviewProps {
  config: DashboardConfig;
  currentBusinessType: BusinessType;
  theme: any;
  onNavigate: (tab: string) => void;
}

const Overview: React.FC<OverviewProps> = ({ config, currentBusinessType, theme, onNavigate }) => {
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [visibleIds, setVisibleIds] = useState<string[]>([]);

  const statItems = config.stats.map((stat, idx) => ({
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
  }, [currentBusinessType]);

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

  const displayedStats = config.stats.filter((_, idx) => visibleIds.includes(`stat-${idx}`));
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
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
          <h3 className="text-lg font-bold mb-4 text-gray-800">تنبيهات النظام</h3>
          <div className="flex-1 space-y-4">
              <div className={`p-4 rounded-xl border ${theme.border} ${theme.bg} flex gap-3 items-start`}>
                  <Bell className={`w-5 h-5 ${theme.text} mt-0.5`} />
                  <div>
                    <h4 className={`font-bold text-sm ${theme.text}`}>طلب جديد</h4>
                    <p className="text-xs text-gray-600 mt-1">تم استلام طلب جديد بقيمة 450 ج منذ دقيقتين.</p>
                  </div>
              </div>
              
              <div className="p-4 rounded-xl border border-gray-100 bg-gray-50 flex gap-3 items-start">
                  <Settings className="w-5 h-5 text-gray-500 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-gray-700">تحديث المخزون</h4>
                    <p className="text-xs text-gray-600 mt-1">بعض المنتجات قاربت على النفاذ، يرجى المراجعة.</p>
                  </div>
              </div>
          </div>
          <button className={`w-full py-3 rounded-xl text-white font-bold mt-4 transition ${theme.btn}`}>
            عرض كل التنبيهات
          </button>
        </div>
      </div>

      <RecentActivityTable 
        config={config} 
        currentBusinessType={currentBusinessType} 
        theme={theme} 
        onNavigate={onNavigate}
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
