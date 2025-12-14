
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { DashboardConfig } from './config';

interface StatsGridProps {
  stats: DashboardConfig['stats'];
  theme: any;
}

const StatsGrid: React.FC<StatsGridProps> = ({ stats, theme }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition relative overflow-hidden">
          <div className={`absolute top-0 left-0 w-1 h-full ${theme.btn}`}></div>
          <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-xl ${theme.bg}`}>
              <stat.icon className={`w-6 h-6 ${theme.text}`} />
            </div>
            <span className={`flex items-center text-sm font-bold ${stat.trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {stat.trend >= 0 ? <TrendingUp className="w-4 h-4 ml-1" /> : <TrendingDown className="w-4 h-4 ml-1" />}
              {Math.abs(stat.trend)}%
            </span>
          </div>
          <h3 className="text-gray-500 text-sm mb-1">{stat.label}</h3>
          <p className="text-2xl font-bold text-gray-900 font-mono">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
