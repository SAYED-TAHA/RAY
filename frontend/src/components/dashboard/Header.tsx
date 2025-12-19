
import React from 'react';
import { Menu, Bell, Sun, Moon, Palette } from 'lucide-react';
import { DashboardConfig, BusinessType } from './config';
import { useTheme } from '../common/useTheme';

interface HeaderProps {
  config: DashboardConfig;
  currentBusinessType: BusinessType;
  setCurrentBusinessType: (type: BusinessType) => void;
  theme: any;
  onNavigate?: (view: string) => void;
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  config, 
  currentBusinessType, 
  setCurrentBusinessType, 
  theme, 
  onNavigate,
  onMenuClick
}) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm p-4 flex justify-between items-center sticky top-0 z-20 border-b border-gray-100 dark:border-gray-800 transition-colors">
      <div className="flex items-center gap-4">
        <button 
          className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-300 transition"
          onClick={onMenuClick}
        >
          <Menu className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{config.title}</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <span className={`w-2 h-2 rounded-full ${theme.btn}`}></span>
            متصل الآن
          </p>
        </div>
      </div>

      {/* Business Type Switcher (For Demo Purposes) */}
      <div className="hidden lg:flex items-center gap-3 bg-gray-50 dark:bg-gray-800 p-1 rounded-lg border border-gray-200 dark:border-gray-700">
        <span className="text-xs font-bold text-gray-500 dark:text-gray-400 px-2">جرب الأنظمة:</span>
        <select 
          value={currentBusinessType}
          onChange={(e) => setCurrentBusinessType(e.target.value as BusinessType)}
          className="bg-white dark:bg-gray-700 border-none text-sm font-bold text-ray-blue dark:text-white focus:ring-0 rounded cursor-pointer py-1 outline-none px-2"
        >
           <option value="retail">🛒 التجزئة</option>
           <option value="restaurant">🍔 المطاعم</option>
           <option value="realestate">🏘️ العقارات</option>
           <option value="cars">🚗 السيارات</option>
           <option value="clinic">🏥 العيادات</option>
           <option value="gym">🏋️ الجيم</option>
        </select>
      </div>

      <div className="flex items-center gap-4">
        {/* Customization Button */}
        <a 
          href="/merchant/dashboard/1" 
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 transition group"
          title="تخصيص الصفحة"
        >
          <Palette className="w-5 h-5 group-hover:scale-110 transition" />
        </a>

        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300 transition active:scale-95"
          aria-label="Toggle Dark Mode"
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <button 
          onClick={() => onNavigate && onNavigate('notifications')}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full relative transition group text-gray-600 dark:text-gray-300"
        >
           <Bell className="w-5 h-5 group-hover:text-ray-blue dark:group-hover:text-white" />
           <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-gray-900"></span>
        </button>
        <div 
          onClick={() => onNavigate && onNavigate('profile')}
          className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden border-2 border-ray-gold cursor-pointer hover:shadow-md transition"
        >
           <img src={`https://ui-avatars.com/api/?name=${config.title}&background=random`} alt="User" className="w-full h-full object-cover" />
        </div>
      </div>
    </header>
  );
};

export default Header;
 
