
import React, { useState } from 'react';
import { 
  LayoutDashboard, DollarSign, ShoppingBag, ChefHat, Menu, 
  Utensils, Calendar, Truck, Package, LogOut, Star, Grid, Gift, Settings,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import { BusinessType } from '../../shared/config';
import Header from '../../shared/layout/Header';
import MobileSidebar from '../../shared/layout/MobileSidebar';
import RestaurantPOS from './RestaurantPOS';
import RestaurantOverview from './RestaurantOverview';
import KitchenDisplay from './KitchenDisplay';
import RestaurantReservations from './RestaurantReservations';
import TableMap from './TableMap';
import TableLayoutEditor from './TableLayoutEditor';
import MenuManager from './MenuManager';
import DeliveryManager from './DeliveryManager';
import RestaurantInventory from './RestaurantInventory';
import LoyaltyManager from '../../shared/loyalty/LoyaltyManager';
import SettingsView from '../../shared/views/SettingsView';
import NotificationsView from '../../shared/views/NotificationsView';
import ProfileView from '../../shared/views/ProfileView';
import ReviewsManager from '../../shared/feedback/ReviewsManager';
import { colorClasses, dashboardConfigs } from '../../shared/config';

interface Props {
  onLogout: () => void;
  onSwitchType: (type: BusinessType) => void;
  isDemo?: boolean;
}

const RestaurantDashboard: React.FC<Props> = ({ onLogout, onSwitchType, isDemo = false }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  const config = dashboardConfigs['restaurant'];
  const theme = colorClasses['orange'];

  const RestaurantSidebar = () => (
    <aside className={`bg-gray-900 text-white hidden md:flex flex-col shadow-xl z-30 transition-all duration-300 ${isSidebarCollapsed ? 'w-20' : 'w-64'}`}>
      <div className={`p-6 border-b border-gray-800 flex items-center gap-3 justify-between ${isSidebarCollapsed ? 'flex-col' : ''}`}>
         <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center shadow-lg">
               <Utensils className="text-white w-6 h-6" />
            </div>
            {!isSidebarCollapsed && (
              <div>
                <h1 className="font-bold text-xl tracking-wide">RAY Resto</h1>
                <p className="text-[10px] text-gray-400">إدارة المطاعم</p>
              </div>
            )}
         </div>
         <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="p-2 hover:bg-gray-800 rounded-lg transition text-white"
            title={isSidebarCollapsed ? 'فتح' : 'طي'}
         >
            {isSidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
         </button>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {!isSidebarCollapsed && <div className="text-xs font-bold text-gray-500 px-3 py-2">الرئيسية</div>}
        <SidebarItem icon={LayoutDashboard} label="لوحة القيادة" id="overview" active={activeTab} setTab={setActiveTab} isCollapsed={isSidebarCollapsed} />
        <SidebarItem icon={DollarSign} label="كاشير الصالة" id="pos" active={activeTab} setTab={setActiveTab} highlight isCollapsed={isSidebarCollapsed} />
        
        {!isSidebarCollapsed && <div className="text-xs font-bold text-gray-500 px-3 py-2 mt-4">العمليات</div>}
        <SidebarItem icon={ShoppingBag} label="الطلبات الحالية" id="orders" active={activeTab} setTab={setActiveTab} isCollapsed={isSidebarCollapsed} />
        <SidebarItem icon={ChefHat} label="شاشة المطبخ (KDS)" id="kitchen" active={activeTab} setTab={setActiveTab} isCollapsed={isSidebarCollapsed} />
        <SidebarItem icon={Utensils} label="خريطة الطاولات" id="tables" active={activeTab} setTab={setActiveTab} isCollapsed={isSidebarCollapsed} />
        <SidebarItem icon={Grid} label="تصميم الصالة" id="table_layout" active={activeTab} setTab={setActiveTab} isCollapsed={isSidebarCollapsed} />
        <SidebarItem icon={Truck} label="فريق التوصيل" id="delivery" active={activeTab} setTab={setActiveTab} isCollapsed={isSidebarCollapsed} />

        {!isSidebarCollapsed && <div className="text-xs font-bold text-gray-500 px-3 py-2 mt-4">الإدارة</div>}
        <SidebarItem icon={Menu} label="قائمة الطعام" id="menu" active={activeTab} setTab={setActiveTab} isCollapsed={isSidebarCollapsed} />
        <SidebarItem icon={Package} label="المخزون" id="inventory" active={activeTab} setTab={setActiveTab} isCollapsed={isSidebarCollapsed} />
        <SidebarItem icon={Gift} label="الولاء والمكافآت" id="loyalty" active={activeTab} setTab={setActiveTab} isCollapsed={isSidebarCollapsed} />
        <SidebarItem icon={Calendar} label="الحجوزات" id="reservations" active={activeTab} setTab={setActiveTab} isCollapsed={isSidebarCollapsed} />
        <SidebarItem icon={Star} label="التقييمات" id="reviews" active={activeTab} setTab={setActiveTab} isCollapsed={isSidebarCollapsed} />
        
        <div className="my-4 border-t border-gray-800 opacity-50"></div>
        <SidebarItem icon={Settings} label="الإعدادات والقوالب" id="settings" active={activeTab} setTab={setActiveTab} isCollapsed={isSidebarCollapsed} />
      </nav>

      <div className={`p-4 border-t border-gray-800 bg-gray-900 ${isSidebarCollapsed ? 'flex justify-center' : ''}`}>
        <button 
          onClick={onLogout} 
          className={`flex items-center gap-3 text-red-400 hover:text-red-300 transition rounded-lg hover:bg-gray-800 ${isSidebarCollapsed ? 'p-2 justify-center' : 'w-full p-2'}`}
          title={isSidebarCollapsed ? 'خروج' : ''}
        >
          <LogOut className="w-5 h-5" />
          {!isSidebarCollapsed && <span>خروج</span>}
        </button>
      </div>
    </aside>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'pos':
        return <RestaurantPOS />;
      case 'kitchen':
      case 'orders':
        return <KitchenDisplay />;
      case 'menu':
        return <MenuManager />;
      case 'inventory':
        return <RestaurantInventory />;
      case 'delivery':
        return <DeliveryManager />;
      case 'reservations':
        return <RestaurantReservations />;
      case 'tables':
        return <TableMap />;
      case 'table_layout':
        return <TableLayoutEditor />;
      case 'loyalty':
        return <LoyaltyManager />;
      case 'reviews':
        return <ReviewsManager />;
      case 'settings':
        return <SettingsView />;
      case 'notifications':
        return <NotificationsView />;
      case 'profile':
        return <ProfileView />;
      case 'overview':
      default:
        return <RestaurantOverview setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-orange-50/30 flex font-sans">
      <RestaurantSidebar />
      
      <MobileSidebar 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        config={config}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={onLogout}
      />

      <main className="flex-1 overflow-y-auto h-screen flex flex-col">
        <Header 
          config={config} 
          currentBusinessType="restaurant" 
          setCurrentBusinessType={onSwitchType} 
          theme={theme}
          onNavigate={setActiveTab}
          onMenuClick={() => setIsMobileMenuOpen(true)}
        />
        <div className="p-4 md:p-6 max-w-7xl mx-auto flex-1 w-full">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

const SidebarItem = ({ icon: Icon, label, id, active, setTab, highlight }: any) => (
  <button 
    onClick={() => setTab(id)}
    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 
      ${active === id 
        ? 'bg-orange-600 text-white font-bold shadow-lg' 
        : 'text-gray-400 hover:bg-gray-800 hover:text-white'}
      ${highlight && active !== id ? 'text-orange-400' : ''}
    `}
  >
    <Icon className={`w-5 h-5`} />
    <span>{label}</span>
  </button>
);

export default RestaurantDashboard;
