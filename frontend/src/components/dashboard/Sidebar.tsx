
import React, { useState } from 'react';
import { Settings, LogOut, LayoutGrid, Palette, ChevronLeft, ChevronRight } from 'lucide-react';
import { DashboardConfig, BusinessType } from './config';

interface SidebarProps {
  config: DashboardConfig;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  currentBusinessType: BusinessType;
}

const Sidebar: React.FC<SidebarProps> = ({ config, activeTab, setActiveTab, onLogout, currentBusinessType }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const getBusinessLabel = (type: BusinessType) => {
     const labels: Record<BusinessType, string> = {
       general: 'المركز الرئيسي',
       restaurant: 'للمطاعم',
       retail: 'للمحلات',
       realestate: 'للعقارات',
       cars: 'للسيارات',
       clinic: 'للعيادات',
       gym: 'للجيم',
       services: 'للخدمات',
       laundry: 'للمغاسل',
       clothing: 'لمحلات الملابس',
       salon: 'للصالونات',
       pharmacy: 'للصيدليات',
       contracting: 'للمقاولات',
       carwash: 'لغسيل السيارات',
       supermarket: 'للسوبر ماركت',
       electronics: 'للإلكترونيات',
       nursery: 'للحضانات',
       law: 'للمحاماة',
       consulting: 'للاستشارات',
       resort: 'للمنتجعات',
       admin: 'للإدارة'
     };
     return labels[type] || 'عام';
  };

  return (
    <aside className={`bg-ray-blue text-white hidden md:flex flex-col shadow-xl z-30 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className={`p-6 border-b border-blue-800 flex items-center gap-3 justify-between ${isCollapsed ? 'flex-col' : ''}`}>
         <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-ray-gold to-yellow-600 rounded-lg flex items-center justify-center shadow-lg">
               <span className="text-ray-blue font-black text-xl">R</span>
            </div>
            {!isCollapsed && (
              <div>
                <h1 className="font-bold text-xl tracking-wide">RAY Panel</h1>
                <p className="text-[10px] text-gray-300">إدارة ذكية {getBusinessLabel(currentBusinessType)}</p>
              </div>
            )}
         </div>
         <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-blue-700 rounded-lg transition text-white"
            title={isCollapsed ? 'فتح' : 'طي'}
         >
            {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
         </button>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {/* Show navigation to General Overview if not currently on it (though this component is mostly for generic fallbacks, specialized dashboards have their own sidebars) */}
        {currentBusinessType !== 'general' && (
           <div className="mb-4 pb-4 border-b border-blue-800">
              {/* Note: In a real app, navigation would be handled via routing context, here we rely on prop drilling or parent state which might need a dedicated callback for 'go home' in this specific generic Sidebar component. 
                  However, since specialized dashboards have their OWN sidebar components (e.g. RestaurantDashboard.tsx has its own Sidebar), this generic Sidebar is mostly used for the General Overview or fallbacks. 
              */}
           </div>
        )}

        {config.navItems.map((item) => (
          <SidebarItem 
            key={item.id} 
            icon={item.icon} 
            label={item.label} 
            active={activeTab === item.id} 
            onClick={() => setActiveTab(item.id)}
            isCollapsed={isCollapsed}
          />
        ))}
        
        <div className="my-4 border-t border-blue-800 opacity-50"></div>
        
        <button
            onClick={() => {}}
            className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-gray-300 hover:bg-white/5 hover:text-white group ${isCollapsed ? 'justify-center' : 'w-full'}`}
            title={isCollapsed ? '🎨 تخصيص الصفحة' : ''}
        >
            <Palette className="w-5 h-5 group-hover:text-ray-gold transition flex-shrink-0" />
            {!isCollapsed && <span>🎨 تخصيص الصفحة</span>}
        </button>
        
        <SidebarItem 
            icon={Settings} 
            label="الإعدادات" 
            active={activeTab === 'settings'}
            onClick={() => setActiveTab('settings')}
            isCollapsed={isCollapsed}
        />
      </nav>

      <div className={`p-4 border-t border-blue-800 bg-blue-950/30 ${isCollapsed ? 'flex justify-center' : ''}`}>
        <button 
          onClick={onLogout} 
          className={`flex items-center gap-3 text-red-300 hover:text-red-100 transition rounded-lg hover:bg-blue-800 ${isCollapsed ? 'p-2 justify-center' : 'w-full p-2'}`}
          title={isCollapsed ? 'تسجيل الخروج' : ''}
        >
          <LogOut className="w-5 h-5" />
          {!isCollapsed && <span>تسجيل الخروج</span>}
        </button>
      </div>
    </aside>
  );
};

const SidebarItem: React.FC<{ icon: any, label: string, active?: boolean, onClick: () => void, isCollapsed?: boolean }> = ({ icon: Icon, label, active, onClick, isCollapsed = false }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${isCollapsed ? 'justify-center' : 'w-full'} ${active ? 'bg-white/10 text-ray-gold font-bold shadow-inner' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}
    title={isCollapsed ? label : ''}
  >
    <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-ray-gold' : 'text-current'}`} />
    {!isCollapsed && <span>{label}</span>}
    {!isCollapsed && active && <div className="mr-auto w-1.5 h-1.5 rounded-full bg-ray-gold shadow-[0_0_10px_#FDB813]"></div>}
  </button>
);

export default Sidebar;
