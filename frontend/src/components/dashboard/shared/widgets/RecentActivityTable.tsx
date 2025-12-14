
import React from 'react';
import { DashboardConfig, BusinessType } from '../../config';
import StatusBadge from '../../../common/StatusBadge';
import { ArrowLeft } from 'lucide-react';

interface RecentActivityTableProps {
  config: DashboardConfig;
  currentBusinessType: BusinessType;
  theme: any;
  onNavigate: (tab: string) => void;
}

const RecentActivityTable: React.FC<RecentActivityTableProps> = ({ config, currentBusinessType, theme, onNavigate }) => {
  
  const getTargetView = () => {
    const map: Record<string, string> = {
      restaurant: 'orders',
      retail: 'reports',
      clothing: 'reports',
      pharmacy: 'reports',
      realestate: 'showings',
      cars: 'test_drives',
      clinic: 'appointments',
      gym: 'access',
      services: 'jobs',
      salon: 'appointments',
      laundry: 'processing',
      contracting: 'projects'
    };
    return map[currentBusinessType] || 'overview';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-all hover:shadow-md">
      <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
           {currentBusinessType === 'restaurant' ? 'أحدث الطلبات' : 
            currentBusinessType === 'clinic' ? 'قائمة الانتظار' : 
            currentBusinessType === 'realestate' ? 'آخر المعاينات' : 
            currentBusinessType === 'contracting' ? 'آخر المشاريع' : 'السجلات الأخيرة'}
        </h3>
        <button 
          onClick={() => onNavigate(getTargetView())}
          className={`text-sm font-bold hover:underline ${theme.text} dark:text-gray-300 dark:hover:text-white flex items-center gap-1 transition-colors`}
        >
          عرض الكل
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-right">
          <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400 text-sm">
            <tr>
              {config.tableHeaders.map((header, idx) => (
                <th key={idx} className="p-4 font-medium whitespace-nowrap">{header}</th>
              ))}
              <th className="p-4 font-medium">إجراء</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {config.data.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition cursor-default">
                <td className="p-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{row.id}</td>
                <td className="p-4 text-gray-700 dark:text-gray-300 whitespace-nowrap">{row.col1}</td>
                <td className="p-4 text-gray-700 dark:text-gray-300 whitespace-nowrap">{row.col2}</td>
                <td className={`p-4 font-bold ${theme.text} dark:text-gray-200 whitespace-nowrap`}>{row.col3}</td>
                <td className="p-4 whitespace-nowrap">
                  <StatusBadge status={row.status} />
                </td>
                <td className="p-4 text-gray-500 dark:text-gray-400 text-sm whitespace-nowrap">{row.time}</td>
                <td className="p-4 whitespace-nowrap">
                  <button 
                    onClick={() => onNavigate(getTargetView())}
                    className="px-4 py-1.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-xs font-bold hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 transition shadow-sm hover:shadow active:scale-95"
                  >
                    تفاصيل
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentActivityTable;
