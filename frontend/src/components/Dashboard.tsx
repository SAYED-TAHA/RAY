"use client";

import React, { useState, useEffect } from 'react';
import GeminiAssistant from './common/GeminiAssistant';
import Header from './dashboard/Header';
import Sidebar from './dashboard/Sidebar';
import { BusinessType, colorClasses, dashboardConfigs } from './dashboard/config';

// Import Specific Dashboards
import RestaurantDashboard from './dashboard/systems/restaurants/RestaurantDashboard';
import RetailDashboard from './dashboard/systems/retail/RetailDashboard';
import PharmacyDashboard from './dashboard/systems/pharmacy/PharmacyDashboard';
import BookingsDashboard from './dashboard/systems/bookings/BookingsDashboard';
import RealEstateDashboard from './dashboard/systems/realestate/RealEstateDashboard';
import CarsDashboard from './dashboard/systems/cars/CarsDashboard';
import ClinicDashboard from './dashboard/systems/clinic/ClinicDashboard';
import GymDashboard from './dashboard/systems/gym/GymDashboard';
import ServicesDashboard from './dashboard/systems/services/ServicesDashboard';
import LaundryDashboard from './dashboard/systems/laundry/LaundryDashboard';
import ClothingDashboard from './dashboard/systems/clothing/ClothingDashboard';
import SalonDashboard from './dashboard/systems/salon/SalonDashboard';
import ContractingDashboard from './dashboard/systems/contracting/ContractingDashboard';
import CarWashDashboard from './dashboard/systems/carwash/CarWashDashboard';

interface DashboardProps {
  onLogout: () => void;
  initialType: BusinessType;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout, initialType }) => {
  // Check for admin mode from URL or localStorage
  const [isAdmin, setIsAdmin] = useState(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const userStored = localStorage.getItem('userType');
      return urlParams.get('admin') === 'true' || userStored === 'admin';
    }
    return false;
  });

  const [currentBusinessType, setCurrentBusinessType] = useState<BusinessType>(isAdmin ? 'admin' : 'general');
  const [activeTab, setActiveTab] = useState('overview');
  const [theme, setTheme] = useState(colorClasses['slate']);

  // Update admin mode when localStorage or URL changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const userStored = localStorage.getItem('userType');
      const shouldBeAdmin = urlParams.get('admin') === 'true' || userStored === 'admin';
      
      if (shouldBeAdmin !== isAdmin) {
        setIsAdmin(shouldBeAdmin);
        setCurrentBusinessType(shouldBeAdmin ? 'admin' : 'general');
      }
    }
  }, [isAdmin]);

  // Ensure if initialType changes, we update
  useEffect(() => {
    if (initialType && !isAdmin) {
      setCurrentBusinessType(initialType);
    }
  }, [initialType, isAdmin]);

  const renderGenericContent = (type: BusinessType) => {
    const theme = colorClasses[dashboardConfigs[type]?.themeColor || 'blue'];
    
    switch (activeTab) {
      case 'settings':
        return <div className="p-6 text-center text-gray-600">الإعدادات</div>;
      case 'pos':
        return <div className="p-6 text-center text-gray-600">نقطة البيع</div>;
      case 'reports':
      case 'analytics':
        return <div className="p-6 text-center text-gray-600">التقارير والتحليلات</div>;
      case 'inventory':
      case 'products':
        return <div className="p-6 text-center text-gray-600">المخزون والمنتجات</div>;
      case 'customers':
      case 'users':
        return <div className="p-6 text-center text-gray-600">العملاء والمستخدمين</div>;
      case 'staff':
      case 'team':
        return <div className="p-6 text-center text-gray-600">الموظفين والفريق</div>;
      case 'overview':
      default:
        return <div className="p-6 text-center text-gray-600">نظرة عامة</div>;
    }
  };

  const renderGenericDashboard = () => {
    const config = dashboardConfigs[currentBusinessType] || dashboardConfigs['retail'];
    const theme = colorClasses[config.themeColor] || colorClasses['blue'];
    
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-950 flex font-sans transition-colors">
        <Sidebar 
          config={config} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          onLogout={onLogout} 
          currentBusinessType={currentBusinessType}
        />
        <main className="flex-1 overflow-y-auto h-screen flex flex-col">
          <Header 
            config={config} 
            currentBusinessType={currentBusinessType} 
            setCurrentBusinessType={setCurrentBusinessType} 
            theme={theme}
            onMenuClick={() => {}}
            onNavigate={setActiveTab}
          />
          <div className="p-4 md:p-6 max-w-7xl mx-auto flex-1 w-full">
            {renderGenericContent(currentBusinessType)}
          </div>
        </main>
      </div>
    );
  };

  const renderGeneralHub = () => {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex font-sans transition-colors">
        <Sidebar 
          config={dashboardConfigs['general']} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          onLogout={onLogout} 
          currentBusinessType={'general'}
        />
        <main className="flex-1 overflow-y-auto h-screen flex flex-col">
          <Header 
            config={dashboardConfigs['general']} 
            currentBusinessType={'general'} 
            setCurrentBusinessType={setCurrentBusinessType} 
            theme={colorClasses['slate']}
            onMenuClick={() => {}}
            onNavigate={setActiveTab}
          />
          <div className="flex-1 w-full max-w-7xl mx-auto p-6">
             <div className="text-center text-gray-600">
               {activeTab === 'settings' && 'الإعدادات'}
               {activeTab === 'system-management' && 'إدارة النظام'}
               {activeTab === 'user-management' && 'إدارة المستخدمين'}
               {activeTab === 'reports' && 'التقارير'}
             </div>
          </div>
        </main>
      </div>
    );
  };

  const renderAdminDashboard = () => {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex font-sans transition-colors">
        <Sidebar 
          config={dashboardConfigs['general']} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          onLogout={onLogout} 
          currentBusinessType={'admin'}
        />
        <main className="flex-1 overflow-y-auto h-screen flex flex-col">
          <Header 
            config={dashboardConfigs['general']} 
            currentBusinessType={'admin'} 
            setCurrentBusinessType={setCurrentBusinessType} 
            theme={colorClasses['slate']}
            onMenuClick={() => {}}
            onNavigate={setActiveTab}
          />
          <div className="flex-1 w-full max-w-7xl mx-auto p-6">
             <div className="text-center text-gray-600">
               {activeTab === 'settings' && 'الإعدادات'}
               {activeTab === 'system-management' && 'إدارة النظام'}
               {activeTab === 'user-management' && 'إدارة المستخدمين'}
               {activeTab === 'reports' && 'التقارير'}
             </div>
          </div>
        </main>
      </div>
    );
  };

  const renderBusinessDashboard = () => {
    switch (currentBusinessType) {
      case 'restaurant':
        return <RestaurantDashboard onLogout={onLogout} onSwitchType={setCurrentBusinessType} />;
      case 'retail':
      case 'supermarket':
      case 'electronics':
        return <RetailDashboard onLogout={onLogout} onSwitchType={setCurrentBusinessType} type={currentBusinessType} />;
      case 'pharmacy':
        return <PharmacyDashboard onLogout={onLogout} onSwitchType={setCurrentBusinessType} />;
      case 'clinic':
      case 'gym':
      case 'salon':
      case 'nursery':
        return <BookingsDashboard onLogout={onLogout} onSwitchType={setCurrentBusinessType} type={currentBusinessType} />;
      case 'realestate':
        return <RealEstateDashboard onLogout={onLogout} onSwitchType={setCurrentBusinessType} />;
      case 'cars':
        return <CarsDashboard onLogout={onLogout} onSwitchType={setCurrentBusinessType} />;
      case 'services':
        return <ServicesDashboard onLogout={onLogout} onSwitchType={setCurrentBusinessType} />;
      case 'laundry':
        return <LaundryDashboard onLogout={onLogout} onSwitchType={setCurrentBusinessType} />;
      case 'clothing':
        return <ClothingDashboard onLogout={onLogout} onSwitchType={setCurrentBusinessType} />;
      case 'contracting':
        return <ContractingDashboard onLogout={onLogout} onSwitchType={setCurrentBusinessType} />;
      case 'carwash':
        return <CarWashDashboard onLogout={onLogout} onSwitchType={setCurrentBusinessType} />;
      default:
        return renderGenericDashboard();
    }
  };

  const renderDashboard = () => {
    if (currentBusinessType === 'admin') {
      return renderAdminDashboard();
    }
    return renderBusinessDashboard();
  };

  return (
    <>
      {renderDashboard()}
      <GeminiAssistant context="merchant" />
    </>
  );
};

export default Dashboard;
