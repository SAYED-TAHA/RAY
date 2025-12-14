
import React, { useState } from 'react';
import { 
  LayoutDashboard, Car, Key, DollarSign, FileText, Wrench, ShieldCheck, 
  LogOut, ClipboardCheck
} from 'lucide-react';
import { BusinessType, dashboardConfigs, colorClasses } from '../../shared/config';
import Header from '../../shared/layout/Header';
import InventoryView from '../../shared/views/InventoryView';
import TestDrivesView from './TestDrivesView';
import CarsOverview from './CarsOverview';
import VehicleInspection from './VehicleInspection';
// import InstallmentTracker from '../../shared/finance/InstallmentTracker';
import UniversalDataView from '../../shared/views/UniversalDataView';
import SettingsView from '../../shared/views/SettingsView';
import NotificationsView from '../../shared/views/NotificationsView';
import ProfileView from '../../shared/views/ProfileView';

interface Props {
  onLogout: () => void;
  onSwitchType: (type: BusinessType) => void;
}

const CarsDashboard: React.FC<Props> = ({ onLogout, onSwitchType }) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const config = dashboardConfigs['cars'];
  const theme = colorClasses['red'];

  const Sidebar = () => (
    <aside className="w-64 bg-red-950 text-white hidden md:flex flex-col shadow-xl z-30">
      <div className="p-6 border-b border-red-900 flex items-center gap-3">
         <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center shadow-lg">
            <Car className="text-white w-6 h-6" />
         </div>
         <div>
           <h1 className="font-bold text-xl tracking-wide">RAY Auto</h1>
           <p className="text-[10px] text-red-200">نظام معارض السيارات</p>
         </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <SidebarItem icon={LayoutDashboard} label="الرئيسية" id="overview" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={Car} label="معرض السيارات" id="inventory" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={ClipboardCheck} label="فحص فني" id="inspection" active={activeTab} setTab={setActiveTab} highlight />
        <SidebarItem icon={Key} label="تجارب القيادة" id="test_drives" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={DollarSign} label="المبيعات والفواتير" id="sales" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={FileText} label="نظام التقسيط" id="installments" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={Wrench} label="مركز الصيانة" id="maintenance" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={ShieldCheck} label="التأمين والترخيص" id="insurance" active={activeTab} setTab={setActiveTab} />
      </nav>

      <div className="p-4 border-t border-red-900 bg-red-950/50">
        <button onClick={onLogout} className="flex items-center gap-3 text-red-300 hover:text-red-100 transition w-full p-2 rounded-lg hover:bg-red-900">
          <LogOut className="w-5 h-5" />
          <span>خروج</span>
        </button>
      </div>
    </aside>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'inventory':
        return <InventoryView type="cars" theme={theme} />;
      case 'inspection':
        return <VehicleInspection />;
      case 'test_drives':
        return <TestDrivesView />;
      case 'sales':
        return <UniversalDataView type="finance" theme={theme} />;
      case 'installments':
        return <div className="p-6 text-center text-gray-600">متابعة الأقساط</div>;
      case 'maintenance':
        return <UniversalDataView type="service_orders" theme={theme} />;
      case 'insurance':
        return <UniversalDataView type="contracts" theme={theme} />;
      case 'settings':
        return <SettingsView />;
      case 'notifications':
        return <NotificationsView />;
      case 'profile':
        return <ProfileView />;
      case 'overview':
      default:
        return <CarsOverview setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-red-50/30 flex font-sans">
      <Sidebar />

      
      <main className="flex-1 overflow-y-auto h-screen flex flex-col">
        <Header 
          config={config} 
          currentBusinessType="cars" 
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
        ? 'bg-white text-red-900 font-bold shadow-lg' 
        : 'text-red-200 hover:bg-red-900 hover:text-white'}
      ${highlight && active !== id ? 'text-red-400' : ''}
    `}
  >
    <Icon className={`w-5 h-5`} />
    <span>{label}</span>
  </button>
);

export default CarsDashboard;
