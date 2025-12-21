
"use client";

import React, { useState } from 'react';
import { 
  LayoutDashboard, ShoppingCart, Tag, ClipboardList, Users, 
  FileText, Truck, Percent, LogOut, Store, Pill, MessageSquare, 
  Megaphone, Star, Gift, Settings
} from 'lucide-react';
import { BusinessType } from '../../shared/config';
import Header from '../../shared/layout/Header';
import MobileSidebar from '../../shared/layout/MobileSidebar';
import UnifiedPOS from './UnifiedPOS';
import RetailOverview from './RetailOverview';
import PharmacyOverview from './PharmacyOverview';
import UniversalDataView from '../../shared/views/UniversalDataView';
import ProductManager from '../../shared/inventory/ProductManager';
import CustomerManager from '../../shared/crm/CustomerManager';
import FinancialReports from '../../shared/reports/FinancialReports';
import SupplierManager from './SupplierManager'; 
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

const RetailDashboard: React.FC<Props> = ({ onLogout, onSwitchType, type = 'retail' }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const config = dashboardConfigs[type] || dashboardConfigs['retail'];
  const theme = colorClasses[config.themeColor];
  const isPharmacy = type === 'pharmacy';

  const RetailSidebar = () => (
    <aside className={`w-64 text-white hidden md:flex flex-col shadow-xl z-30 ${isPharmacy ? 'bg-teal-900' : 'bg-blue-900'}`}>
      <div className={`p-6 border-b flex items-center gap-3 ${isPharmacy ? 'border-teal-800' : 'border-blue-800'}`}>
         <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg">
            {isPharmacy ? <Pill className="text-teal-900 w-6 h-6" /> : <Store className="text-blue-900 w-6 h-6" />}
         </div>
         <div>
           <h1 className="font-bold text-xl tracking-wide">{isPharmacy ? 'RAY Pharma' : 'RAY Retail'}</h1>
           <p className={`text-[10px] ${isPharmacy ? 'text-teal-200' : 'text-blue-200'}`}>{isPharmacy ? 'إدارة الصيدليات' : 'إدارة المحلات'}</p>
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
            isPharmacy={isPharmacy}
          />
        ))}
        
        <div className={`my-4 border-t ${isPharmacy ? 'border-teal-800' : 'border-blue-800'} opacity-50`}></div>
        
        <SidebarItem icon={Megaphone} label="التسويق والعروض" id="marketing" active={activeTab} setTab={setActiveTab} isPharmacy={isPharmacy} />
        <SidebarItem icon={Gift} label="الولاء والمكافآت" id="loyalty" active={activeTab} setTab={setActiveTab} isPharmacy={isPharmacy} />
        <SidebarItem icon={MessageSquare} label="الرسائل" id="messages" active={activeTab} setTab={setActiveTab} isPharmacy={isPharmacy} />
        <SidebarItem icon={Star} label="التقييمات" id="reviews" active={activeTab} setTab={setActiveTab} isPharmacy={isPharmacy} />
        <SidebarItem icon={Settings} label="الإعدادات والقوالب" id="settings" active={activeTab} setTab={setActiveTab} isPharmacy={isPharmacy} />
      </nav>

      <div className={`p-4 border-t ${isPharmacy ? 'border-teal-800 bg-teal-950' : 'border-blue-800 bg-blue-950'}`}>
        <button onClick={onLogout} className={`flex items-center gap-3 transition w-full p-2 rounded-lg ${isPharmacy ? 'text-red-300 hover:text-red-100 hover:bg-teal-800' : 'text-red-300 hover:text-red-100 hover:bg-blue-900'}`}>
          <LogOut className="w-5 h-5" />
          <span>خروج</span>
        </button>
      </div>
    </aside>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'pos':
        return <UnifiedPOS type={type} />;
      case 'products':
      case 'inventory':
        return <ProductManager />;
      case 'offers':
      case 'marketing':
        return <MarketingManager />;
      case 'loyalty':
        return <LoyaltyManager />;
      case 'messages':
        return <MessagesCenter />;
      case 'suppliers':
        return <SupplierManager />; 
      case 'customers':
        return <CustomerManager />;
      case 'reports':
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
        return isPharmacy ?
          <PharmacyOverview /> :
          <RetailOverview setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className={`min-h-screen flex font-sans ${isPharmacy ? 'bg-teal-50/30' : 'bg-blue-50/30'}`}>
      <RetailSidebar />
      
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

const SidebarItem = ({ icon: Icon, label, id, active, setTab, highlight, isPharmacy }: any) => (
  <button 
    onClick={() => setTab(id)}
    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 
      ${active === id 
        ? `bg-white font-bold shadow-lg ${isPharmacy ? 'text-teal-900' : 'text-blue-900'}` 
        : `${isPharmacy ? 'text-teal-200 hover:bg-teal-800' : 'text-blue-200 hover:bg-blue-800'} hover:text-white`}
      ${highlight && active !== id ? `${isPharmacy ? 'bg-teal-800/50' : 'bg-blue-800/50'} text-white` : ''}
    `}
  >
    <Icon className={`w-5 h-5`} />
    <span>{label}</span>
  </button>
);

export default RetailDashboard;
 
