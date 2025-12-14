import React, { useState } from 'react';
import { 
  LayoutDashboard, Calendar, DollarSign, Users, Package, Sparkles, 
  LogOut, Star
} from 'lucide-react';
import { BusinessType, dashboardConfigs, colorClasses } from '../../shared/config';
import Header from '../../shared/layout/Header';
import SalonOverview from './SalonOverview';
import SalonAppointments from './SalonAppointments';
// import ServicePOS from '../../shared/pos/ServicePOS';
import UniversalDataView from '../../shared/views/UniversalDataView';
// import StaffManager from '../../shared/hr/StaffManager';
import ReviewsManager from '../../shared/feedback/ReviewsManager';
import SettingsView from '../../shared/views/SettingsView';
import NotificationsView from '../../shared/views/NotificationsView';
import ProfileView from '../../shared/views/ProfileView';

interface Props {
  onLogout: () => void;
  onSwitchType: (type: BusinessType) => void;
}

const SalonDashboard: React.FC<Props> = ({ onLogout, onSwitchType }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const config = dashboardConfigs['salon'];
  const theme = colorClasses['pink'];

  const Sidebar = () => (
    <aside className="w-64 bg-pink-900 text-white hidden md:flex flex-col shadow-xl z-30">
      <div className="p-6 border-b border-pink-800 flex items-center gap-3">
         <div className="w-10 h-10 bg-pink-500 rounded-lg flex items-center justify-center shadow-lg">
            <Sparkles className="text-white w-6 h-6" />
         </div>
         <div>
           <h1 className="font-bold text-xl tracking-wide">RAY Salon</h1>
           <p className="text-[10px] text-pink-200">إدارة الصالونات</p>
         </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <SidebarItem icon={LayoutDashboard} label="الرئيسية" id="overview" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={Calendar} label="المواعيد" id="appointments" active={activeTab} setTab={setActiveTab} highlight />
        <SidebarItem icon={DollarSign} label="كاشير وخدمات" id="pos" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={Users} label="العميلات" id="customers" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={Sparkles} label="فريق العمل" id="staff" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={Package} label="المخزون" id="inventory" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={Star} label="التقييمات" id="reviews" active={activeTab} setTab={setActiveTab} />
      </nav>

      <div className="p-4 border-t border-pink-800 bg-pink-950">
        <button onClick={onLogout} className="flex items-center gap-3 text-pink-200 hover:text-white transition w-full p-2 rounded-lg hover:bg-pink-800">
          <LogOut className="w-5 h-5" />
          <span>خروج</span>
        </button>
      </div>
    </aside>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'appointments':
        return <SalonAppointments />;
      case 'pos':
        return <div className="p-6 text-center text-gray-600">نقطة البيع</div>;
      case 'customers':
        return <UniversalDataView type="customers" theme={theme} />;
      case 'staff':
        return <div className="p-6 text-center text-gray-600">فريق العمل</div>; 
      case 'inventory':
        return <UniversalDataView type="products" theme={theme} />;
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
        return <SalonOverview setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-pink-50/30 flex font-sans">
      <Sidebar />
      <main className="flex-1 overflow-y-auto h-screen flex flex-col">
        <Header 
          config={config} 
          currentBusinessType="salon" 
          setCurrentBusinessType={onSwitchType} 
          theme={theme}
          onNavigate={setActiveTab}
        />
        <div className="p-6 max-w-7xl mx-auto flex-1 w-full">
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
        ? 'bg-white text-pink-900 font-bold shadow-lg' 
        : 'text-pink-200 hover:bg-pink-800 hover:text-white'}
      ${highlight && active !== id ? 'text-pink-300' : ''}
    `}
  >
    <Icon className={`w-5 h-5`} />
    <span>{label}</span>
  </button>
);

export default SalonDashboard;
