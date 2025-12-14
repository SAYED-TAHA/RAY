
import React, { useState } from 'react';
import { 
  DollarSign, Calendar, CheckCircle, AlertCircle, Search, 
  Filter, FileText, ChevronDown, History
} from 'lucide-react';

interface Installment {
  id: string;
  client: string;
  item: string; // Car model or Property unit
  amount: number;
  paidAmount: number;
  nextDue: string;
  nextAmount: number;
  status: 'good' | 'overdue' | 'completed';
  progress: number;
}

const initialData: Installment[] = [
  { id: 'INS-101', client: 'أحمد محمد', item: 'Kia Sportage 2024', amount: 1800000, paidAmount: 600000, nextDue: '2025-12-01', nextAmount: 25000, status: 'good', progress: 33 },
  { id: 'INS-102', client: 'محمود سعيد', item: 'شقة اللوتس', amount: 3500000, paidAmount: 1500000, nextDue: '2025-11-15', nextAmount: 100000, status: 'overdue', progress: 42 },
  { id: 'INS-103', client: 'شركة الأمل', item: 'مقر إداري', amount: 4000000, paidAmount: 4000000, nextDue: '-', nextAmount: 0, status: 'completed', progress: 100 },
  { id: 'INS-104', client: 'سارة علي', item: 'Hyundai Tucson', amount: 2100000, paidAmount: 1050000, nextDue: '2025-12-05', nextAmount: 30000, status: 'good', progress: 50 },
];

const InstallmentTracker: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filteredData = initialData.filter(i => i.client.includes(searchTerm) || i.item.includes(searchTerm));

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'good': return 'text-green-600 bg-green-50 border-green-200';
      case 'overdue': return 'text-red-600 bg-red-50 border-red-200';
      case 'completed': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'good': return 'منتظم';
      case 'overdue': return 'متأخر';
      case 'completed': return 'خالص';
      default: return status;
    }
  };

  return (
    <div className="flex flex-col h-full space-y-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Header */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-600" />
            متابعة الأقساط
          </h2>
          <p className="text-sm text-gray-500">إدارة التحصيل والمديونيات</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
           <div className="relative flex-1 md:w-64">
              <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="بحث باسم العميل..." 
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 pr-10 pl-4 text-sm focus:outline-none focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>
           <button className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition text-gray-600">
              <Filter className="w-5 h-5" />
           </button>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
         <div className="overflow-x-auto">
            <table className="w-full text-right">
               <thead className="bg-gray-50 text-gray-500 text-xs font-bold">
                  <tr>
                     <th className="p-4">العميل / الوحدة</th>
                     <th className="p-4">نسبة السداد</th>
                     <th className="p-4">القسط القادم</th>
                     <th className="p-4">تاريخ الاستحقاق</th>
                     <th className="p-4">الحالة</th>
                     <th className="p-4 text-center">إجراء</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50 text-sm">
                  {filteredData.map(row => (
                     <tr key={row.id} className="hover:bg-blue-50/30 transition">
                        <td className="p-4">
                           <h4 className="font-bold text-gray-900">{row.client}</h4>
                           <p className="text-xs text-gray-500">{row.item}</p>
                        </td>
                        <td className="p-4 w-48">
                           <div className="flex items-center justify-between text-xs mb-1">
                              <span className="text-gray-600">{row.paidAmount.toLocaleString()} / {row.amount.toLocaleString()}</span>
                              <span className="font-bold">{row.progress}%</span>
                           </div>
                           <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                              <div className={`h-full rounded-full ${row.status === 'completed' ? 'bg-blue-500' : 'bg-green-500'}`} style={{width: `${row.progress}%`}}></div>
                           </div>
                        </td>
                        <td className="p-4 font-bold text-gray-800">
                           {row.nextAmount > 0 ? `${row.nextAmount.toLocaleString()} ج` : '-'}
                        </td>
                        <td className="p-4 text-gray-600">
                           {row.nextDue !== '-' && <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {row.nextDue}</span>}
                        </td>
                        <td className="p-4">
                           <span className={`px-3 py-1 rounded-lg text-xs font-bold border flex items-center gap-1 w-fit ${getStatusColor(row.status)}`}>
                              {row.status === 'overdue' && <AlertCircle className="w-3 h-3" />}
                              {row.status === 'completed' && <CheckCircle className="w-3 h-3" />}
                              {getStatusLabel(row.status)}
                           </span>
                        </td>
                        <td className="p-4 text-center">
                           {row.status !== 'completed' && (
                              <button className="text-xs font-bold bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition shadow-sm">
                                 تسجيل دفع
                              </button>
                           )}
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};

export default InstallmentTracker;
