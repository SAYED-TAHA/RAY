
import React from 'react';
import { Search } from 'lucide-react';
import { DashboardConfig } from '../../config';

interface QuickActionsProps {
  actions: DashboardConfig['quickActions'];
  theme: any;
  themeColor: string;
  onActionClick?: (action: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ actions, theme, themeColor, onActionClick }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
       {actions.map((action, idx) => (
         <button 
            key={idx} 
            onClick={() => onActionClick && onActionClick(action.action)}
            className={`group flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 
              hover:shadow-md hover:border-${themeColor}-200 dark:hover:border-${themeColor}-500 
              hover:-translate-y-1 active:scale-95 active:shadow-inner transition-all duration-200 gap-3 h-28 relative overflow-hidden`}
         >
            {/* Hover Background Effect */}
            <div className={`absolute inset-0 bg-gradient-to-br from-${themeColor}-50 to-transparent dark:from-${themeColor}-900/20 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
            
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-sm relative z-10
              ${theme.lightBtn} dark:bg-gray-700 dark:text-${themeColor}-400 group-hover:bg-${themeColor}-100 dark:group-hover:bg-${themeColor}-900
            `}>
              <action.icon className="w-5 h-5" />
            </div>
            
            <span className="font-bold text-gray-600 dark:text-gray-300 text-xs text-center z-10 group-hover:text-gray-900 dark:group-hover:text-white transition-colors line-clamp-2">
              {action.label}
            </span>
         </button>
       ))}
    </div>
  );
};

export default QuickActions;
