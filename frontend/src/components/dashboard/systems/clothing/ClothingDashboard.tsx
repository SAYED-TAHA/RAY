
import React, { useState } from 'react';
import { 
  LayoutDashboard, Shirt, Layers, Users, FileText, LogOut, Scissors,
  Grid, Settings
} from 'lucide-react';
import { BusinessType, dashboardConfigs, colorClasses } from '../../shared/config';
import Header from '../../shared/layout/Header';
import MobileSidebar from '../../shared/layout/MobileSidebar';
import ClothingOverview from './ClothingOverview';
import ProductManager from '../../shared/inventory/ProductManager';
import CollectionsManager from './CollectionsManager';
import UniversalDataView from '../../shared/views/UniversalDataView';
import SettingsView from '../../shared/views/SettingsView';
import NotificationsView from '../../shared/views/NotificationsView';
import ProfileView from '../../shared/views/ProfileView';

interface Props {
  onLogout: () => void;
  onSwitchType: (type: BusinessType) => void;
}

const ClothingDashboard: React.FC<Props> = ({ onLogout, onSwitchType }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const config = dashboardConfigs['clothing'];
  const theme = colorClasses['pink'];

  const Sidebar = () => (
    <aside className="w-64 bg-gray-900 text-white hidden md:flex flex-col shadow-xl z-30">
      <div className="p-6 border-b border-gray-800 flex items-center gap-3">
         <div className="w-10 h-10 bg-pink-600 rounded-lg flex items-center justify-center shadow-lg">
            <Shirt className="text-white w-6 h-6" />
         </div>
         <div>
           <h1 className="font-bold text-xl tracking-wide">RAY Style</h1>
           <p className="text-gray-400 text-[10px]">نظام الملابس</p>
         </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <SidebarItem icon={LayoutDashboard} label="نظرة عامة" id="overview" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={Shirt} label="المنتجات" id="products" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={Grid} label="المجموعات (Collections)" id="collections" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={Layers} label="المخزون" id="inventory" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={Users} label="العملاء" id="customers" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={FileText} label="التقارير" id="reports" active={activeTab} setTab={setActiveTab} />
        
        <div className="my-4 border-t border-gray-800 opacity-50"></div>
        <SidebarItem icon={Settings} label="الإعدادات" id="settings" active={activeTab} setTab={setActiveTab} />
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
      case 'products':
      case 'inventory':
        return <ProductManager />;
      case 'collections':
        return <CollectionsManager />;
      case 'customers':
        return <UniversalDataView type="customers" theme={theme} />;
      case 'reports':
        return <UniversalDataView type="reports" theme={theme} />;
      case 'settings':
        return <SettingsView />;
      case 'notifications':
        return <NotificationsView />;
      case 'profile':
        return <ProfileView />;
      case 'overview':
      default:
        return <ClothingOverview setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-pink-50/30 flex font-sans">
      <Sidebar />
      
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
          currentBusinessType="clothing" 
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
        ? 'bg-pink-600 text-white font-bold shadow-lg' 
        : 'text-gray-400 hover:bg-gray-800 hover:text-white'}
      ${highlight && active !== id ? 'text-pink-400' : ''}
    `}
  >
    <Icon className={`w-5 h-5`} />
    <span>{label}</span>
  </button>
);

export default ClothingDashboard;
