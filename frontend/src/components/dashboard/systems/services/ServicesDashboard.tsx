import React, { useState } from 'react';
import { 
  LayoutDashboard, Wrench, Calendar, Users, Settings, FileText, 
  LogOut, ClipboardList, Truck, Droplets, Layers, Map
} from 'lucide-react';
import { BusinessType, dashboardConfigs, colorClasses } from '../../shared/config';
import Header from '../../shared/layout/Header';
import MobileSidebar from '../../shared/layout/MobileSidebar';
import ServiceRequestsView from './ServiceRequestsView';
import ServicesOverview from './ServicesOverview';
import CarWashOverview from '../carwash/CarWashOverview';
import JobOrderManager from './JobOrderManager';
import TechnicianTeam from './TechnicianTeam';
import UniversalDataView from '../../shared/views/UniversalDataView';
// import InvoiceBuilder from '../../shared/finance/InvoiceBuilder';
import SettingsView from '../../shared/views/SettingsView';
import NotificationsView from '../../shared/views/NotificationsView';
import ProfileView from '../../shared/views/ProfileView';
import CalendarView from '../../shared/views/CalendarView';

interface Props {
  onLogout: () => void;
  onSwitchType: (type: BusinessType) => void;
  type?: BusinessType;
}

const ServicesDashboard: React.FC<Props> = ({ onLogout, onSwitchType, type = 'services' }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const config = dashboardConfigs[type] || dashboardConfigs['services'];
  const theme = colorClasses[config.themeColor] || colorClasses['blue'];
  const isCarWash = type === 'carwash';

  const Sidebar = () => (
    <aside className={`w-64 text-white hidden md:flex flex-col shadow-xl z-30 ${isCarWash ? 'bg-cyan-900' : 'bg-slate-900'}`}>
      <div className={`p-6 border-b flex items-center gap-3 ${isCarWash ? 'border-cyan-800' : 'border-slate-800'}`}>
         <div className={`w-10 h-10 rounded-lg flex items-center justify-center shadow-lg ${isCarWash ? 'bg-cyan-500' : 'bg-blue-600'}`}>
            {isCarWash ? <Truck className="text-white w-6 h-6" /> : <Wrench className="text-white w-6 h-6" />}
         </div>
         <div>
           <h1 className="font-bold text-xl tracking-wide">{isCarWash ? 'RAY Wash' : 'RAY Fix'}</h1>
           <p className={`text-[10px] ${isCarWash ? 'text-cyan-200' : 'text-blue-300'}`}>{isCarWash ? 'غسيل متنقل' : 'إدارة الصيانة'}</p>
         </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {isCarWash ? (
           <>
             <SidebarItem icon={LayoutDashboard} label="الأسطول والعمليات" id="overview" active={activeTab} setTab={setActiveTab} highlight />
             <SidebarItem icon={Calendar} label="جدول الغسيل" id="schedule" active={activeTab} setTab={setActiveTab} />
             <SidebarItem icon={Map} label="تتبع الوحدات" id="fleet" active={activeTab} setTab={setActiveTab} />
             <SidebarItem icon={Droplets} label="الطلبات" id="jobs" active={activeTab} setTab={setActiveTab} />
             <SidebarItem icon={Layers} label="المخزون" id="inventory" active={activeTab} setTab={setActiveTab} />
             <SidebarItem icon={Users} label="العملاء" id="customers" active={activeTab} setTab={setActiveTab} />
             <SidebarItem icon={FileText} label="الفواتير" id="invoices" active={activeTab} setTab={setActiveTab} />
             
             <div className="my-4 border-t border-cyan-800 opacity-50"></div>
             <SidebarItem icon={Settings} label="الإعدادات" id="settings" active={activeTab} setTab={setActiveTab} />
           </>
        ) : (
           <>
             <SidebarItem icon={LayoutDashboard} label="الرئيسية" id="overview" active={activeTab} setTab={setActiveTab} />
             <SidebarItem icon={ClipboardList} label="أوامر الشغل" id="jobs" active={activeTab} setTab={setActiveTab} highlight />
             <SidebarItem icon={Wrench} label="الطلبات الواردة" id="requests" active={activeTab} setTab={setActiveTab} />
             <SidebarItem icon={Calendar} label="جدول الفنيين" id="schedule" active={activeTab} setTab={setActiveTab} />
             <SidebarItem icon={Users} label="فريق العمل" id="technicians" active={activeTab} setTab={setActiveTab} />
             <SidebarItem icon={Settings} label="قطع الغيار" id="spare_parts" active={activeTab} setTab={setActiveTab} />
             <SidebarItem icon={FileText} label="الفواتير والضمان" id="invoices" active={activeTab} setTab={setActiveTab} />
             
             <div className="my-4 border-t border-slate-800 opacity-50"></div>
             <SidebarItem icon={Settings} label="الإعدادات" id="settings" active={activeTab} setTab={setActiveTab} />
           </>
        )}
      </nav>

      <div className={`p-4 border-t ${isCarWash ? 'border-cyan-800 bg-cyan-950' : 'border-slate-800 bg-slate-950'}`}>
        <button onClick={onLogout} className={`flex items-center gap-3 transition w-full p-2 rounded-lg ${isCarWash ? 'text-cyan-200 hover:text-white hover:bg-cyan-800' : 'text-gray-400 hover:text-white hover:bg-slate-800'}`}>
          <LogOut className="w-5 h-5" />
          <span>خروج</span>
        </button>
      </div>
    </aside>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'jobs':
        return <JobOrderManager />;
      case 'requests':
        return <ServiceRequestsView />;
      case 'schedule':
        return <CalendarView type={type} theme={theme} />;
      case 'technicians':
      case 'fleet':
        return <TechnicianTeam />;
      case 'spare_parts':
      case 'inventory':
        return <UniversalDataView type="spare_parts" theme={theme} />;
      case 'customers':
        return <UniversalDataView type="customers" theme={theme} />;
      case 'invoices':
        return <div className="p-6 text-center text-gray-600">الفواتير</div>;
      case 'settings':
        return <SettingsView />;
      case 'notifications':
        return <NotificationsView />;
      case 'profile':
        return <ProfileView />;
      case 'overview':
      default:
        return isCarWash ? <CarWashOverview setActiveTab={setActiveTab} /> : <ServicesOverview />;
    }
  };

  return (
    <div className={`min-h-screen flex font-sans ${isCarWash ? 'bg-cyan-50/30' : 'bg-slate-50/30'}`}>
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

const SidebarItem = ({ icon: Icon, label, id, active, setTab, highlight }: any) => (
  <button 
    onClick={() => setTab(id)}
    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 
      ${active === id 
        ? 'bg-white/10 text-white font-bold shadow-md' 
        : 'opacity-70 hover:opacity-100 hover:bg-white/5'}
      ${highlight && active !== id ? 'text-yellow-400' : ''}
    `}
  >
    <Icon className={`w-5 h-5`} />
    <span>{label}</span>
  </button>
);

export default ServicesDashboard;
