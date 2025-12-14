
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { DashboardConfig } from '../../config';

interface StatsGridProps {
  stats: DashboardConfig['stats'];
  theme: any;
}

const StatsGrid: React.FC<StatsGridProps> = ({ stats, theme }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 
                     hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group cursor-default"
        >
          <div className={`absolute top-0 left-0 w-1 h-full ${theme.btn} transition-all duration-300 group-hover:w-1.5`}></div>
          <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-xl ${theme.bg} dark:bg-opacity-20 transition-colors group-hover:bg-opacity-80 dark:group-hover:bg-opacity-30`}>
              <stat.icon className={`w-6 h-6 ${theme.text}`} />
            </div>
            <span className={`flex items-center text-sm font-bold ${stat.trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {stat.trend >= 0 ? <TrendingUp className="w-4 h-4 ml-1" /> : <TrendingDown className="w-4 h-4 ml-1" />}
              {Math.abs(stat.trend)}%
            </span>
          </div>
          <h3 className="text-gray-500 dark:text-gray-400 text-sm mb-1 font-medium">{stat.label}</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white font-mono tracking-tight">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
