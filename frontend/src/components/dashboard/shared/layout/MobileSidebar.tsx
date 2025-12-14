
import React from 'react';
import { X, LogOut, Settings, User } from 'lucide-react';
import { DashboardConfig } from '../../config';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  config: DashboardConfig;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ 
  isOpen, onClose, config, activeTab, setActiveTab, onLogout 
}) => {
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex md:hidden justify-end dir-rtl">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      ></div>

      {/* Sidebar Panel */}
      <aside className="relative w-[80%] max-w-[300px] h-full bg-gray-900 text-white flex flex-col shadow-2xl animate-in slide-in-from-right duration-300 border-l border-gray-800">
        <div className="p-5 border-b border-gray-800 flex justify-between items-center bg-black/20">
          <div className="flex items-center gap-3">
             <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-${config.themeColor}-600 text-white shadow-lg`}>
                <span className="font-black text-lg">R</span>
             </div>
             <h2 className="font-bold text-lg">{config.title}</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-800 transition text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 bg-gray-800/50">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center border border-gray-600">
                    <User className="w-5 h-5 text-gray-300" />
                </div>
                <div>
                    <p className="text-sm font-bold text-white">مدير النظام</p>
                    <p className="text-xs text-green-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        متصل الآن
                    </p>
                </div>
            </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {config.navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                onClose();
              }}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 
                ${activeTab === item.id 
                  ? `bg-${config.themeColor}-600 text-white font-bold shadow-md ring-1 ring-white/10` 
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'}
              `}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
          
          <div className="my-4 border-t border-gray-800 opacity-50"></div>
          
          <button
            onClick={() => {
              setActiveTab('settings');
              onClose();
            }}
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${activeTab === 'settings' ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
          >
            <Settings className="w-5 h-5" />
            <span>الإعدادات</span>
          </button>
        </nav>

        <div className="p-4 border-t border-gray-800 bg-black/20 pb-safe">
          <button 
            onClick={onLogout} 
            className="flex items-center gap-3 text-red-400 hover:text-red-300 transition w-full p-3 rounded-xl hover:bg-red-900/20"
          >
            <LogOut className="w-5 h-5" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>
    </div>
  );
};

export default MobileSidebar;
