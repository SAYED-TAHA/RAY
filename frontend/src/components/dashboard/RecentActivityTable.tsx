import React from 'react';
import { DashboardConfig, BusinessType } from './config';
import StatusBadge from '../common/StatusBadge';

interface RecentActivityTableProps {
  config: DashboardConfig;
  currentBusinessType: BusinessType;
  theme: any;
  rows?: any[];
}

const RecentActivityTable: React.FC<RecentActivityTableProps> = ({ config, currentBusinessType, theme, rows }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h3 className="text-lg font-bold">
           {currentBusinessType === 'restaurant' ? 'أحدث الطلبات' : 
            currentBusinessType === 'clinic' ? 'قائمة الانتظار' : 
            currentBusinessType === 'realestate' ? 'آخر المعاينات' : 'السجلات الأخيرة'}
        </h3>
        <button className={`text-sm font-medium hover:underline ${theme.text}`}>عرض الكل</button>
      </div>
      <div className="overflow-x-auto">
        {Array.isArray(rows) && rows.length > 0 ? (
          <table className="w-full text-right">
            <thead className="bg-gray-50 text-gray-500 text-sm">
              <tr>
                {config.tableHeaders.map((header: any, idx: any) => (
                  <th key={idx} className="p-4 font-medium">{header}</th>
                ))}
                <th className="p-4 font-medium">إجراء</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map((row: any, idx: any) => (
                <tr key={idx} className="hover:bg-gray-50 transition">
                  <td className="p-4 font-medium text-gray-900">{row.id}</td>
                  <td className="p-4 text-gray-700">{row.col1}</td>
                  <td className="p-4 text-gray-700">{row.col2}</td>
                  <td className={`p-4 font-bold ${theme.text}`}>{row.col3}</td>
                  <td className="p-4">
                    <StatusBadge status={row.status || 'unknown'} />
                  </td>
                  <td className="p-4 text-gray-500 text-sm">{row.time || '-'}</td>
                  <td className="p-4">
                    <button disabled className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 opacity-50 cursor-not-allowed">
                      عرض
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-10 text-center text-gray-600">
            لا توجد بيانات حالياً
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentActivityTable;
