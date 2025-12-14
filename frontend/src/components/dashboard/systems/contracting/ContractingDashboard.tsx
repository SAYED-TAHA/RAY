
import React, { useState } from 'react';
import { 
  LayoutDashboard, HardHat, Truck, Warehouse, Users, DollarSign, 
  LogOut, FileSpreadsheet, Settings
} from 'lucide-react';
import { BusinessType, dashboardConfigs, colorClasses } from '../../shared/config';
import Header from '../../shared/layout/Header';
import ContractingOverview from './ContractingOverview';
import ProjectsManager from './ProjectsManager';
import UniversalDataView from '../../shared/views/UniversalDataView';
// import SupplierManager from '../../shared/retail/SupplierManager';
// import ExpensesManager from '../../shared/finance/ExpensesManager';
import SettingsView from '../../shared/views/SettingsView';
import NotificationsView from '../../shared/views/NotificationsView';
import ProfileView from '../../shared/views/ProfileView';

interface Props {
  onLogout: () => void;
  onSwitchType: (type: BusinessType) => void;
}

const ContractingDashboard: React.FC<Props> = ({ onLogout, onSwitchType }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const config = dashboardConfigs['contracting'];
  const theme = colorClasses['orange']; // Using orange for construction vibes

  const Sidebar = () => (
    <aside className="w-64 bg-gray-900 dark:bg-black text-white hidden md:flex flex-col shadow-xl z-30 transition-colors">
      <div className="p-6 border-b border-gray-800 flex items-center gap-3">
         <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center shadow-lg">
            <HardHat className="text-white w-6 h-6" />
         </div>
         <div>
           <h1 className="font-bold text-xl tracking-wide">RAY Build</h1>
           <p className="text-gray-400 text-[10px]">للمقاولات والتوريد</p>
         </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <SidebarItem icon={LayoutDashboard} label="مركز العمليات" id="overview" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={HardHat} label="المشاريع الجارية" id="projects" active={activeTab} setTab={setActiveTab} highlight />
        <SidebarItem icon={FileSpreadsheet} label="المناقصات والعروض" id="tenders" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={Warehouse} label="المخازن والمواد" id="warehouse" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={Truck} label="الموردين والمشتريات" id="suppliers" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={Users} label="العمالة والمقاولين" id="labor" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={DollarSign} label="المستخلصات والمالية" id="finance" active={activeTab} setTab={setActiveTab} />
        
        <div className="my-4 border-t border-gray-800 opacity-50"></div>
        <SidebarItem icon={Settings} label="الإعدادات" id="settings" active={activeTab} setTab={setActiveTab} />
      </nav>

      <div className="p-4 border-t border-gray-800 bg-gray-900 dark:bg-black">
        <button onClick={onLogout} className="flex items-center gap-3 text-gray-400 hover:text-white transition w-full p-2 rounded-lg hover:bg-gray-800">
          <LogOut className="w-5 h-5" />
          <span>خروج</span>
        </button>
      </div>
    </aside>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'projects':
        return <ProjectsManager />;
      case 'warehouse':
        return <UniversalDataView type="spare_parts" theme={theme} />; // Reusing generic parts view for now
      case 'suppliers':
        return <div className="p-6 text-center text-gray-600">الموردين</div>;
      case 'labor':
        return <UniversalDataView type="staff" theme={theme} />;
      case 'finance':
        return <div className="p-6 text-center text-gray-600">المستخلصات والمالية</div>;
      case 'settings':
        return <SettingsView />;
      case 'notifications':
        return <NotificationsView />;
      case 'profile':
        return <ProfileView />;
      case 'overview':
      default:
        return <ContractingOverview setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-orange-50/30 dark:bg-gray-900 flex font-sans transition-colors">
      <Sidebar />
      <main className="flex-1 overflow-y-auto h-screen flex flex-col">
        <Header 
          config={config} 
          currentBusinessType="contracting" 
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
        ? 'bg-orange-600 text-white font-bold shadow-lg' 
        : 'text-gray-400 hover:bg-gray-800 hover:text-white'}
      ${highlight && active !== id ? 'text-orange-400' : ''}
    `}
  >
    <Icon className={`w-5 h-5`} />
    <span>{label}</span>
  </button>
);

export default ContractingDashboard;
