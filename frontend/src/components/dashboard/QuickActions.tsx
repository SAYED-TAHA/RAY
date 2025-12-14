
import React from 'react';
import { Search } from 'lucide-react';
import { DashboardConfig } from './config';

interface QuickActionsProps {
  actions: DashboardConfig['quickActions'];
  theme: any;
  themeColor: string;
}

const QuickActions: React.FC<QuickActionsProps> = ({ actions, theme, themeColor }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
       {actions.map((action: any, idx: any) => (
         <button key={idx} className={`group flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-${themeColor}-200 transition gap-3 h-28`}>
            <div className={`w-10 h-10 rounded-full ${theme.lightBtn} flex items-center justify-center group-hover:scale-110 transition shadow-sm`}>
              <action.icon className="w-5 h-5" />
            </div>
            <span className="font-bold text-gray-700 text-xs sm:text-sm text-center group-hover:text-gray-900">{action.label}</span>
         </button>
       ))}
       {/* Generic Search Action */}
       {/* <button className="hidden lg:flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl border border-dashed border-gray-300 hover:bg-white hover:border-gray-400 transition gap-3 h-28 text-gray-400 hover:text-gray-600">
          <Search className="w-5 h-5" />
          <span className="text-sm font-medium">بحث متقدم...</span>
       </button> */}
    </div>
  );
};

export default QuickActions;
