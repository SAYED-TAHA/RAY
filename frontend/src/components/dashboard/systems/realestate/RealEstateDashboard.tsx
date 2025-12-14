
import React, { useState } from 'react';
import { 
  LayoutDashboard, Home, Users, Key, Map, Calendar, FileText, LogOut, Megaphone, MessageSquare, DollarSign
} from 'lucide-react';
import { BusinessType } from '../../shared/config';
import Header from '../../shared/layout/Header';
import PropertyManager from './PropertyManager';
import ShowingsView from './ShowingsView';
import RealEstateOverview from './RealEstateOverview';
import RealEstateMap from './RealEstateMap';
import ContractBuilder from './ContractBuilder';
import LeadsKanban from './LeadsKanban';
// import InstallmentTracker from '../../shared/finance/InstallmentTracker';
import MarketingManager from '../../shared/marketing/MarketingManager';
import MessagesCenter from '../../shared/communication/MessagesCenter';
import SettingsView from '../../shared/views/SettingsView';
import NotificationsView from '../../shared/views/NotificationsView';
import ProfileView from '../../shared/views/ProfileView';
import { dashboardConfigs, colorClasses } from '../../shared/config';

interface Props {
  onLogout: () => void;
  onSwitchType: (type: BusinessType) => void;
}

const RealEstateDashboard: React.FC<Props> = ({ onLogout, onSwitchType }) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const config = dashboardConfigs['realestate'];
  const theme = colorClasses['green'];

  const RealEstateSidebar = () => (
    <aside className="w-64 bg-green-900 text-white hidden md:flex flex-col shadow-xl z-30">
      <div className="p-6 border-b border-green-800 flex items-center gap-3">
         <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg">
            <Home className="text-green-800 w-6 h-6" />
         </div>
         <div>
           <h1 className="font-bold text-xl tracking-wide">RAY Estate</h1>
           <p className="text-[10px] text-green-200">إدارة العقارات</p>
         </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <SidebarItem icon={LayoutDashboard} label="لوحة المعلومات" id="overview" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={Home} label="وحدات البيع" id="properties" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={Key} label="وحدات الإيجار" id="rentals" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={Map} label="الخريطة العقارية" id="map" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={Users} label="العملاء (CRM)" id="leads" active={activeTab} setTab={setActiveTab} highlight />
        <SidebarItem icon={Calendar} label="المعاينات" id="showings" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={FileText} label="العقود" id="contracts" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={DollarSign} label="الأقساط" id="installments" active={activeTab} setTab={setActiveTab} />
        <div className="my-2 border-t border-green-800 opacity-50"></div>
        <SidebarItem icon={Megaphone} label="الحملات الإعلانية" id="marketing" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={MessageSquare} label="الرسائل" id="messages" active={activeTab} setTab={setActiveTab} />
      </nav>

      <div className="p-4 border-t border-green-800 bg-green-950">
        <button onClick={onLogout} className="flex items-center gap-3 text-red-300 hover:text-red-100 transition w-full p-2 rounded-lg hover:bg-green-900">
          <LogOut className="w-5 h-5" />
          <span>خروج</span>
        </button>
      </div>
    </aside>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'properties':
      case 'rentals':
        return <PropertyManager />;
      case 'showings':
        return <ShowingsView />;
      case 'leads':
        return <LeadsKanban />;
      case 'contracts':
        return <ContractBuilder />;
      case 'installments':
        return <div className="p-6 text-center text-gray-600">متابعة الأقساط</div>;
      case 'map':
        return <RealEstateMap />;
      case 'marketing':
        return <MarketingManager />;
      case 'messages':
        return <MessagesCenter />;
      case 'settings':
        return <SettingsView />;
      case 'notifications':
        return <NotificationsView />;
      case 'profile':
        return <ProfileView />;
      case 'overview':
      default:
        return <RealEstateOverview setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-green-50/30 flex font-sans">
      <RealEstateSidebar />

      
      <main className="flex-1 overflow-y-auto h-screen flex flex-col">
        <Header 
          config={config} 
          currentBusinessType="realestate" 
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
        ? 'bg-white text-green-900 font-bold shadow-lg' 
        : 'text-green-200 hover:bg-green-800 hover:text-white'}
      ${highlight && active !== id ? 'text-green-400' : ''}
    `}
  >
    <Icon className={`w-5 h-5`} />
    <span>{label}</span>
  </button>
);

export default RealEstateDashboard;
