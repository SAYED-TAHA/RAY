
import React, { useState } from 'react';
import { 
  LayoutDashboard, Calendar, Truck, Layers, Users, DollarSign, 
  LogOut, Settings, Droplets
} from 'lucide-react';
import { BusinessType, dashboardConfigs, colorClasses } from '../../shared/config';
import Header from '../../shared/layout/Header';
import CarWashOverview from './CarWashOverview';
import CalendarView from '../../shared/views/CalendarView';
import UniversalDataView from '../../shared/views/UniversalDataView';
import SettingsView from '../../shared/views/SettingsView';
import NotificationsView from '../../shared/views/NotificationsView';
import ProfileView from '../../shared/views/ProfileView';
// import ExpensesManager from '../../shared/finance/ExpensesManager';

interface Props {
  onLogout: () => void;
  onSwitchType: (type: BusinessType) => void;
}

const CarWashDashboard: React.FC<Props> = ({ onLogout, onSwitchType }) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const config = dashboardConfigs['carwash'];
  const theme = colorClasses['cyan'];

  const Sidebar = () => (
    <aside className="w-64 bg-cyan-900 text-white hidden md:flex flex-col shadow-xl z-30">
      <div className="p-6 border-b border-cyan-800 flex items-center gap-3">
         <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center shadow-lg">
            <Droplets className="text-white w-6 h-6" />
         </div>
         <div>
           <h1 className="font-bold text-xl tracking-wide">RAY Wash</h1>
           <p className="text-cyan-200 text-[10px]">إدارة الغسيل المتنقل</p>
         </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <SidebarItem icon={LayoutDashboard} label="الأسطول والعمليات" id="overview" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={Calendar} label="جدول الغسيل" id="schedule" active={activeTab} setTab={setActiveTab} highlight />
        <SidebarItem icon={Truck} label="وحدات الغسيل (Vans)" id="fleet" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={Layers} label="مخزون المواد" id="inventory" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={Users} label="قاعدة العملاء" id="customers" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={DollarSign} label="الإيرادات" id="finance" active={activeTab} setTab={setActiveTab} />
        
        <div className="my-4 border-t border-cyan-800 opacity-50"></div>
        <SidebarItem icon={Settings} label="الإعدادات" id="settings" active={activeTab} setTab={setActiveTab} />
      </nav>

      <div className="p-4 border-t border-cyan-800 bg-cyan-950">
        <button onClick={onLogout} className="flex items-center gap-3 text-cyan-200 hover:text-white transition w-full p-2 rounded-lg hover:bg-cyan-800">
          <LogOut className="w-5 h-5" />
          <span>خروج</span>
        </button>
      </div>
    </aside>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'schedule':
        return <CalendarView type="carwash" theme={theme} />;
      case 'fleet':
        return <UniversalDataView type="service_orders" theme={theme} />;
      case 'inventory':
        return <UniversalDataView type="products" theme={theme} />;
      case 'customers':
        return <UniversalDataView type="customers" theme={theme} />;
      case 'expenses':
        return <div className="p-6 text-center text-gray-600">المصروفات</div>;
      case 'settings':
        return <SettingsView />;
      case 'notifications':
        return <NotificationsView />;
      case 'profile':
        return <ProfileView />;
      case 'overview':
      default:
        return <CarWashOverview setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-cyan-50/30 flex font-sans">
      <Sidebar />
      
      
      <main className="flex-1 overflow-y-auto h-screen flex flex-col">
        <Header 
          config={config} 
          currentBusinessType="carwash" 
          setCurrentBusinessType={onSwitchType} 
          theme={theme}
          onNavigate={setActiveTab}
          onMenuClick={() => {}}
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
        ? 'bg-cyan-600 text-white font-bold shadow-lg' 
        : 'text-cyan-200 hover:bg-cyan-800 hover:text-white'}
      ${highlight && active !== id ? 'text-cyan-300' : ''}
    `}
  >
    <Icon className={`w-5 h-5`} />
    <span>{label}</span>
  </button>
);

export default CarWashDashboard;
