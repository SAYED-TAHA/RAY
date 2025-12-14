import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, QrCode, Dumbbell, Star, FileText, Utensils, ShoppingBag,
  LogOut
} from 'lucide-react';
import { BusinessType, dashboardConfigs, colorClasses } from '../../shared/config';
import Header from '../../shared/layout/Header';
import CalendarView from '../../shared/views/CalendarView';
import GymOverview from './GymOverview';
import MembersView from './MembersView';
import NutritionPlan from './NutritionPlan';
import AccessLogView from './AccessLogView';
// import SubscriptionManager from '../../shared/subscriptions/SubscriptionManager';
// import StaffManager from '../../shared/hr/StaffManager';
// import ServicePOS from '../../shared/pos/ServicePOS';
import SettingsView from '../../shared/views/SettingsView';
import NotificationsView from '../../shared/views/NotificationsView';
import ProfileView from '../../shared/views/ProfileView';

interface Props {
  onLogout: () => void;
  onSwitchType: (type: BusinessType) => void;
}

const GymDashboard: React.FC<Props> = ({ onLogout, onSwitchType }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const config = dashboardConfigs['gym'];
  const theme = colorClasses['yellow'];

  const Sidebar = () => (
    <aside className="w-64 bg-black text-white hidden md:flex flex-col shadow-xl z-30">
      <div className="p-6 border-b border-gray-800 flex items-center gap-3">
         <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center shadow-lg">
            <Dumbbell className="text-black w-6 h-6" />
         </div>
         <div>
           <h1 className="font-bold text-xl tracking-wide">RAY Fit</h1>
           <p className="text-[10px] text-yellow-500">إدارة الجيم</p>
         </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <SidebarItem icon={LayoutDashboard} label="الرئيسية" id="overview" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={Users} label="الأعضاء" id="members" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={QrCode} label="الدخول (Access)" id="access" active={activeTab} setTab={setActiveTab} highlight />
        <SidebarItem icon={Dumbbell} label="الحصص (Classes)" id="classes" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={Star} label="المدربين" id="trainers" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={FileText} label="الاشتراكات" id="subscriptions" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={Utensils} label="التغذية" id="diet" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={ShoppingBag} label="المتجر" id="store" active={activeTab} setTab={setActiveTab} />
      </nav>

      <div className="p-4 border-t border-gray-800 bg-gray-900">
        <button onClick={onLogout} className="flex items-center gap-3 text-gray-400 hover:text-white transition w-full p-2 rounded-lg hover:bg-gray-800">
          <LogOut className="w-5 h-5" />
          <span>خروج</span>
        </button>
      </div>
    </aside>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'classes':
        return <CalendarView type="gym" theme={theme} />;
      case 'members':
        return <MembersView />;
      case 'access':
        return <AccessLogView />;
      case 'trainers':
        return <div className="p-6 text-center text-gray-600">المدربين</div>;
      case 'subscriptions':
        return <div className="p-6 text-center text-gray-600">الاشتراكات</div>;
      case 'diet':
        return <NutritionPlan />;
      case 'store':
        return <div className="p-6 text-center text-gray-600">المتجر</div>;
      case 'settings':
        return <SettingsView />;
      case 'notifications':
        return <NotificationsView />;
      case 'profile':
        return <ProfileView />;
      case 'overview':
      default:
        return <GymOverview setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-yellow-50/30 flex font-sans">
      <Sidebar />
      <main className="flex-1 overflow-y-auto h-screen flex flex-col">
        <Header 
          config={config} 
          currentBusinessType="gym" 
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
        ? 'bg-yellow-500 text-black font-bold shadow-lg' 
        : 'text-gray-400 hover:bg-gray-800 hover:text-white'}
      ${highlight && active !== id ? 'text-yellow-400' : ''}
    `}
  >
    <Icon className={`w-5 h-5`} />
    <span>{label}</span>
  </button>
);

export default GymDashboard;
