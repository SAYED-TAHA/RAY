
import React, { useState } from 'react';
import { Activity, Search, Plus, FileText, Upload, Eye, CheckCircle, Clock, FlaskConical } from 'lucide-react';
import StatusBadge from '../../../common/StatusBadge';

interface LabRequest {
  id: string;
  patient: string;
  tests: string;
  date: string;
  status: 'pending' | 'processing' | 'completed';
  resultFile?: string;
}

const initialRequests: LabRequest[] = [
  { id: 'LAB-501', patient: 'منى زكي', tests: 'صورة دم كاملة (CBC), سكر تراكمي', date: '2025-11-22', status: 'processing' },
  { id: 'LAB-502', patient: 'أحمد حلمي', tests: 'وظائف كبد, وظائف كلى', date: '2025-11-22', status: 'pending' },
  { id: 'LAB-503', patient: 'كريم عبد العزيز', tests: 'تحليل بول كامل', date: '2025-11-21', status: 'completed', resultFile: 'result.pdf' },
];

const LabManager: React.FC = () => {
  const [requests, setRequests] = useState(initialRequests);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRequests = requests.filter(r => r.patient.includes(searchTerm) || r.id.includes(searchTerm));

  return (
    <div className="flex flex-col h-full space-y-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Header */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <FlaskConical className="w-6 h-6 text-teal-600" />
            المعمل والتحاليل
          </h2>
          <p className="text-sm text-gray-500">إدارة طلبات التحاليل والنتائج</p>
        </div>
        <button className="bg-teal-600 text-white px-4 py-2 rounded-xl font-bold shadow-md flex items-center gap-2 hover:bg-teal-700 transition">
           <Plus className="w-4 h-4" />
           طلب تحليل جديد
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-yellow-50 text-yellow-600 rounded-full"><Clock className="w-6 h-6" /></div>
            <div>
               <p className="text-gray-500 text-xs font-bold">قيد الانتظار</p>
               <h3 className="text-xl font-black text-gray-900">5</h3>
            </div>
         </div>
         <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-full"><Activity className="w-6 h-6" /></div>
            <div>
               <p className="text-gray-500 text-xs font-bold">جاري التحليل</p>
               <h3 className="text-xl font-black text-gray-900">3</h3>
            </div>
         </div>
         <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-green-50 text-green-600 rounded-full"><CheckCircle className="w-6 h-6" /></div>
            <div>
               <p className="text-gray-500 text-xs font-bold">نتائج جاهزة</p>
               <h3 className="text-xl font-black text-gray-900">12</h3>
            </div>
         </div>
      </div>

      {/* Requests List */}
      <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
         <div className="p-4 border-b border-gray-100">
            <div className="relative max-w-md">
               <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
               <input 
                 type="text" 
                 placeholder="بحث باسم المريض..." 
                 className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 pr-10 pl-4 text-sm focus:outline-none focus:border-teal-500"
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>
         </div>
         
         <div className="flex-1 overflow-y-auto">
            <table className="w-full text-right">
               <thead className="bg-gray-50 text-gray-500 text-xs font-bold">
                  <tr>
                     <th className="p-4">رقم الطلب</th>
                     <th className="p-4">المريض</th>
                     <th className="p-4">التحاليل المطلوبة</th>
                     <th className="p-4">التاريخ</th>
                     <th className="p-4">الحالة</th>
                     <th className="p-4 text-center">النتيجة</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50 text-sm">
                  {filteredRequests.map(req => (
                     <tr key={req.id} className="hover:bg-teal-50/30 transition">
                        <td className="p-4 font-mono text-gray-600">{req.id}</td>
                        <td className="p-4 font-bold text-gray-800">{req.patient}</td>
                        <td className="p-4 text-gray-600 max-w-xs truncate" title={req.tests}>{req.tests}</td>
                        <td className="p-4 text-gray-500">{req.date}</td>
                        <td className="p-4">
                           <StatusBadge status={req.status === 'processing' ? 'in_progress' : req.status} />
                        </td>
                        <td className="p-4 text-center">
                           {req.status === 'completed' ? (
                              <button className="text-teal-600 hover:bg-teal-50 p-2 rounded-lg transition flex items-center justify-center gap-1 mx-auto text-xs font-bold">
                                 <Eye className="w-4 h-4" /> عرض
                              </button>
                           ) : (
                              <button className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition flex items-center justify-center gap-1 mx-auto text-xs font-bold">
                                 <Upload className="w-4 h-4" /> رفع
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

export default LabManager;
