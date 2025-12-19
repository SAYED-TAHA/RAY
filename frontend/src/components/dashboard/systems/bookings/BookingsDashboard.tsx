
import React, { useState } from 'react';
import { 
  LayoutDashboard, Calendar, Users, Clock, CheckCircle, LogOut, 
  MessageSquare, DollarSign, Settings, AlertCircle, Phone, MapPin,
  Stethoscope, User, Bell, TrendingUp
} from 'lucide-react';
import { BusinessType } from '../../shared/config';
import Header from '../../shared/layout/Header';
import BookingsOverview from './BookingsOverview';
import CustomerManager from '../../shared/crm/CustomerManager';
import FinancialReports from '../../shared/reports/FinancialReports';
import MessagesCenter from '../../shared/communication/MessagesCenter';
import SettingsView from '../../shared/views/SettingsView';
import NotificationsView from '../../shared/views/NotificationsView';
import ProfileView from '../../shared/views/ProfileView';
import { dashboardConfigs, colorClasses } from '../../shared/config';

interface Props {
  onLogout: () => void;
  onSwitchType: (type: BusinessType) => void;
  type?: BusinessType;
}

const BookingsDashboard: React.FC<Props> = ({ onLogout, onSwitchType, type = 'clinic' }) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const config = dashboardConfigs[type] || dashboardConfigs['clinic'];
  const theme = colorClasses[config.themeColor];

  const BookingsSidebar = () => (
    <aside className="w-64 text-white hidden md:flex flex-col shadow-xl z-30 bg-blue-900">
      <div className="p-6 border-b flex items-center gap-3 border-blue-800">
         <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg">
            <Calendar className="text-blue-900 w-6 h-6" />
         </div>
         <div>
           <h1 className="font-bold text-xl tracking-wide">RAY Bookings</h1>
           <p className="text-[10px] text-blue-200">إدارة الحجوزات</p>
         </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {config.navItems.map((item) => (
          <SidebarItem 
            key={item.id} 
            icon={item.icon} 
            label={item.label} 
            id={item.id} 
            active={activeTab} 
            setTab={setActiveTab}
          />
        ))}
        
        <div className="my-4 border-t border-blue-800 opacity-50"></div>
        
        <div className="px-3 py-2">
          <h3 className="text-xs font-bold text-blue-300 uppercase tracking-wider">إدارة الحجوزات</h3>
        </div>
        
        <SidebarItem icon={MessageSquare} label="الرسائل والتواصل" id="messages" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={Users} label="العملاء والحضور" id="customers" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={DollarSign} label="الدفع والفواتير" id="payments" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={TrendingUp} label="التقارير والإحصائيات" id="reports" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={Settings} label="الإعدادات" id="settings" active={activeTab} setTab={setActiveTab} />
      </nav>

      <div className="p-4 border-t border-blue-800 bg-blue-950">
        <button onClick={onLogout} className="flex items-center gap-3 transition w-full p-2 rounded-lg text-red-300 hover:text-red-100 hover:bg-blue-800">
          <LogOut className="w-5 h-5" />
          <span>خروج</span>
        </button>
      </div>
    </aside>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'customers':
        return <CustomerManager />;
      case 'messages':
        return <MessagesCenter />;
      case 'payments':
      case 'reports':
        return <FinancialReports />;
      case 'settings':
        return <SettingsView />;
      case 'notifications':
        return <NotificationsView />;
      case 'profile':
        return <ProfileView />;
      case 'overview':
      default:
        return <BookingsOverview setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen flex font-sans bg-blue-50/30">
      <BookingsSidebar />
      
      
      <main className="flex-1 overflow-y-auto h-screen flex flex-col">
        <Header 
          config={config} 
          currentBusinessType={type} 
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

const SidebarItem = ({ icon: Icon, label, id, active, setTab }: any) => (
  <button 
    onClick={() => setTab(id)}
    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 
      ${active === id 
        ? 'bg-white font-bold shadow-lg text-blue-900' 
        : 'text-blue-200 hover:bg-blue-800 hover:text-white'}
    `}
  >
    <Icon className="w-5 h-5" />
    <span>{label}</span>
  </button>
);

export default BookingsDashboard;
