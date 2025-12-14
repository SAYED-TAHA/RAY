
import React from 'react';
import { LucideIcon } from 'lucide-react';

export type StatColor = 'orange' | 'yellow' | 'blue' | 'green' | 'red' | 'purple' | 'teal' | 'emerald' | 'gray' | 'pink' | 'black' | 'cyan';

interface StatCardProps {
  title: string;
  value: string;
  sub: string;
  icon: LucideIcon;
  color: StatColor;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, sub, icon: Icon, color }) => {
  const colors: Record<StatColor, string> = {
    orange: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
    yellow: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
    blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    green: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
    red: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
    purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
    teal: 'bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400',
    emerald: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
    gray: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
    pink: 'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400',
    black: 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
    cyan: 'bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400'
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
      <div className="flex justify-between items-start mb-3">
         <div className={`p-3 rounded-xl ${colors[color] || colors.blue}`}>
           <Icon className="w-6 h-6" />
         </div>
      </div>
      <p className="text-gray-500 dark:text-gray-400 text-xs font-bold">{title}</p>
      <h3 className="text-2xl font-black text-gray-800 dark:text-white mb-1">{value}</h3>
      <p className="text-xs text-gray-400 dark:text-gray-500">{sub}</p>
    </div>
  );
};

export default StatCard;
