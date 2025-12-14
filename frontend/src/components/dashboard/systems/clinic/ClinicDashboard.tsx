
import React, { useState } from 'react';
import { 
  LayoutDashboard, Calendar, Users, FileText, Activity, Pill, DollarSign, 
  LogOut, Stethoscope, Star
} from 'lucide-react';
import { BusinessType } from '../../shared/config';
import { dashboardConfigs, colorClasses } from '../../shared/config';
import Header from '../../shared/layout/Header';
import CalendarView from '../../shared/views/CalendarView';
import ClinicOverview from './ClinicOverview';
import PrescriptionManager from './PrescriptionManager';
import PatientsDirectory from './PatientsDirectory';
// import ServicePOS from '../../shared/pos/ServicePOS';
import LabManager from './LabManager';
import UniversalDataView from '../../shared/views/UniversalDataView';
import ReviewsManager from '../../shared/feedback/ReviewsManager';
import SettingsView from '../../shared/views/SettingsView';
import NotificationsView from '../../shared/views/NotificationsView';
import ProfileView from '../../shared/views/ProfileView';

interface Props {
  onLogout: () => void;
  onSwitchType: (type: BusinessType) => void;
}

const ClinicDashboard: React.FC<Props> = ({ onLogout, onSwitchType }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const config = dashboardConfigs['clinic'];
  const theme = colorClasses['teal'];

  const Sidebar = () => (
    <aside className="w-64 bg-teal-900 text-white hidden md:flex flex-col shadow-xl z-30">
      <div className="p-6 border-b border-teal-800 flex items-center gap-3">
         <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center shadow-lg">
            <Stethoscope className="text-white w-6 h-6" />
         </div>
         <div>
           <h1 className="font-bold text-xl tracking-wide">RAY Med</h1>
           <p className="text-[10px] text-teal-200">إدارة العيادات</p>
         </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <SidebarItem icon={LayoutDashboard} label="الاستقبال" id="overview" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={Calendar} label="جدول المواعيد" id="appointments" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={Users} label="ملفات المرضى" id="patients" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={FileText} label="الروشتات" id="prescriptions" active={activeTab} setTab={setActiveTab} highlight />
        <SidebarItem icon={Activity} label="التحاليل" id="lab" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={Pill} label="الصيدلية" id="pharmacy" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={DollarSign} label="الحسابات" id="finance" active={activeTab} setTab={setActiveTab} />
        <SidebarItem icon={Star} label="التقييمات" id="reviews" active={activeTab} setTab={setActiveTab} />
      </nav>

      <div className="p-4 border-t border-teal-800 bg-teal-950">
        <button onClick={onLogout} className="flex items-center gap-3 text-teal-200 hover:text-white transition w-full p-2 rounded-lg hover:bg-teal-800">
          <LogOut className="w-5 h-5" />
          <span>خروج</span>
        </button>
      </div>
    </aside>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'appointments':
        return <CalendarView type="clinic" theme={theme} />;
      case 'patients':
        return <PatientsDirectory />;
      case 'prescriptions':
        return <PrescriptionManager />;
      case 'lab':
        return <LabManager />;
      case 'pharmacy':
        return <UniversalDataView type="pharmacy" theme={theme} />;
      case 'finance':
        return <div className="p-6 text-center text-gray-600">نقطة البيع</div>;
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
        return <ClinicOverview setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-teal-50/30 flex font-sans">
      <Sidebar />
      <main className="flex-1 overflow-y-auto h-screen flex flex-col">
        <Header 
          config={config} 
          currentBusinessType="clinic" 
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
        ? 'bg-white text-teal-900 font-bold shadow-lg' 
        : 'text-teal-200 hover:bg-teal-800 hover:text-white'}
      ${highlight && active !== id ? 'text-teal-300' : ''}
    `}
  >
    <Icon className={`w-5 h-5`} />
    <span>{label}</span>
  </button>
);

export default ClinicDashboard;
