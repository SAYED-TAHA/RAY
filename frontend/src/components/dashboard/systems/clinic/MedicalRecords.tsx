/**
 * السجلات الطبية
 * إدارة السجلات الطبية للمرضى
 */

import React, { useState } from 'react';
import {
  FileText, Search, Plus, Edit, Trash2, User, Calendar,
  AlertCircle, CheckCircle, Eye, Download
} from 'lucide-react';

interface MedicalRecord {
  id: string;
  patientName: string;
  patientId: string;
  date: string;
  diagnosis: string;
  treatment: string;
  doctor: string;
  status: 'completed' | 'pending' | 'archived';
  notes: string;
}

const initialRecords: MedicalRecord[] = [
  {
    id: 'rec-001',
    patientName: 'أحمد محمد',
    patientId: 'P-001',
    date: '2024-12-01',
    diagnosis: 'نزلة برد',
    treatment: 'راحة وأدوية',
    doctor: 'د. علي حسن',
    status: 'completed',
    notes: 'المريض في حالة جيدة'
  },
  {
    id: 'rec-002',
    patientName: 'فاطمة علي',
    patientId: 'P-002',
    date: '2024-12-03',
    diagnosis: 'ارتفاع ضغط الدم',
    treatment: 'أدوية وتغيير نمط الحياة',
    doctor: 'د. سارة محمود',
    status: 'completed',
    notes: 'متابعة دورية مطلوبة'
  }
];

const MedicalRecords: React.FC = () => {
  const [records, setRecords] = useState<MedicalRecord[]>(initialRecords);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'pending' | 'archived'>('all');

  const filteredRecords = records.filter(rec => {
    const matchesSearch = rec.patientName.includes(searchTerm) || rec.diagnosis.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || rec.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-600" />
            السجلات الطبية
          </h2>
          <p className="text-sm text-gray-500">إدارة السجلات الطبية للمرضى</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          <Plus className="w-5 h-5" />
          سجل جديد
        </button>
      </div>

      {/* Controls */}
      <div className="flex gap-4 flex-wrap">
        <div className="flex-1 min-w-64 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="ابحث عن سجل..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as any)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">جميع الحالات</option>
          <option value="completed">مكتمل</option>
          <option value="pending">معلق</option>
          <option value="archived">مؤرشف</option>
        </select>
      </div>

      {/* Records Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden flex-1 flex flex-col">
        <div className="overflow-x-auto flex-1">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
              <tr>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">المريض</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">التشخيص</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">العلاج</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">الطبيب</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">التاريخ</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">الحالة</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredRecords.map(rec => (
                <tr key={rec.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-800">{rec.patientName}</p>
                      <p className="text-xs text-gray-500">{rec.patientId}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{rec.diagnosis}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{rec.treatment}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{rec.doctor}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{rec.date}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(rec.status)}`}>
                      {rec.status === 'completed' ? 'مكتمل' : rec.status === 'pending' ? 'معلق' : 'مؤرشف'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-1 hover:bg-gray-100 rounded transition">
                        <Eye className="w-4 h-4 text-blue-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded transition">
                        <Download className="w-4 h-4 text-green-600" />
                      </button>
                    </div>
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

export default MedicalRecords;
