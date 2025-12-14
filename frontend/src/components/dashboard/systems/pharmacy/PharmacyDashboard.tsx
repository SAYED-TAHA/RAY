
import React, { useState } from 'react';
import { 
  LayoutDashboard, ShoppingBag, Pill, Truck, Users, 
  FileText, LogOut, Tag, MessageSquare, 
  Megaphone, Star, Gift, Settings, AlertCircle, DollarSign
} from 'lucide-react';
import { BusinessType } from '../../shared/config';
import Header from '../../shared/layout/Header';
import MobileSidebar from '../../shared/layout/MobileSidebar';
import PharmacyOverview from './PharmacyOverview';
import ProductManager from '../../shared/inventory/ProductManager';
import CustomerManager from '../../shared/crm/CustomerManager';
import FinancialReports from '../../shared/reports/FinancialReports';
// import SupplierManager from './SupplierManager'; 
import MarketingManager from '../../shared/marketing/MarketingManager';
import LoyaltyManager from '../../shared/loyalty/LoyaltyManager';
import MessagesCenter from '../../shared/communication/MessagesCenter';
import ReviewsManager from '../../shared/feedback/ReviewsManager';
import SettingsView from '../../shared/views/SettingsView';
import NotificationsView from '../../shared/views/NotificationsView';
import ProfileView from '../../shared/views/ProfileView';
import { dashboardConfigs, colorClasses } from '../../shared/config';

interface Props {
  onLogout: () => void;
  onSwitchType: (type: BusinessType) => void;
  type?: BusinessType;
}

const PharmacyDashboard: React.FC<Props> = ({ onLogout, onSwitchType, type = 'pharmacy' }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const config = dashboardConfigs[type] || dashboardConfigs['pharmacy'];
  const theme = colorClasses[config.themeColor];

  const PharmacySidebar = () => (
    <aside className="w-64 text-white hidden md:flex flex-col shadow-xl z-30 bg-teal-900">
      <div className="p-6 border-b flex items-center gap-3 border-teal-800">
         <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg">
            <Pill className="text-teal-900 w-6 h-6" />
         </div>
         <div>
           <h1 className="font-bold text-xl tracking-wide">RAY Pharma</h1>
           <p className="text-[10px] text-teal-200">إدارة الصيدليات</p>
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
        
        <div className="my-4 border-t border-teal-800 opacity-50"></div>
        
        <div className="px-3 py-2">
          <h3 className="text-xs font-bold text-teal-300 uppercase tracking-wider">موصل الطلبات</h3>
        </div>
        
        <SidebarItem icon={MessageSquare} label="الرسائل والتواصل" id="messages" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={FileText} label="الروشتات والطلبات" id="prescriptions" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={DollarSign} label="الدفع والفواتير" id="payments" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={Settings} label="الإعدادات" id="settings" active={activeTab} setTab={setActiveTab} />
      </nav>

      <div className="p-4 border-t border-teal-800 bg-teal-950">
        <button onClick={onLogout} className="flex items-center gap-3 transition w-full p-2 rounded-lg text-red-300 hover:text-red-100 hover:bg-teal-800">
          <LogOut className="w-5 h-5" />
          <span>خروج</span>
        </button>
      </div>
    </aside>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'pos':
        return <div className="p-6 bg-white rounded-2xl shadow-sm"><h2 className="text-2xl font-bold text-gray-800">نقطة البيع (POS)</h2><p className="text-gray-600 mt-2">قريباً...</p></div>;
      case 'products':
        return <ProductManager />;
      case 'suppliers':
        return <div className="p-6 text-center text-gray-600">الموردين</div>; 
      case 'customers':
        return <CustomerManager />;
      case 'reports':
        return <FinancialReports />; 
      case 'offers':
      case 'marketing':
        return <MarketingManager />;
      case 'loyalty':
        return <LoyaltyManager />;
      case 'messages':
        return <MessagesCenter />;
      case 'prescriptions':
        return <div className="p-6 bg-white rounded-2xl shadow-sm"><h2 className="text-2xl font-bold text-gray-800">الروشتات والطلبات</h2><p className="text-gray-600 mt-2">عرض وإدارة الروشتات والطلبات المعلقة</p></div>;
      case 'payments':
        return <FinancialReports />;
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
        return <PharmacyOverview setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen flex font-sans bg-teal-50/30">
      <PharmacySidebar />
      
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
          currentBusinessType={type} 
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

const SidebarItem = ({ icon: Icon, label, id, active, setTab }: any) => (
  <button 
    onClick={() => setTab(id)}
    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 
      ${active === id 
        ? 'bg-white font-bold shadow-lg text-teal-900' 
        : 'text-teal-200 hover:bg-teal-800 hover:text-white'}
    `}
  >
    <Icon className="w-5 h-5" />
    <span>{label}</span>
  </button>
);

export default PharmacyDashboard;
