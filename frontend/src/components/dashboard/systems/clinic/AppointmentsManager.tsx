/**
 * مدير المواعيد
 * إدارة مواعيد المرضى والأطباء
 */

import React, { useState } from 'react';
import {
  Calendar, Search, Plus, Edit, Trash2, Clock, User,
  Phone, CheckCircle, AlertCircle, X, Eye
} from 'lucide-react';

interface Appointment {
  id: string;
  patientName: string;
  patientPhone: string;
  doctorName: string;
  date: string;
  time: string;
  duration: number;
  reason: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  notes?: string;
}

const initialAppointments: Appointment[] = [
  {
    id: 'apt-001',
    patientName: 'أحمد محمد',
    patientPhone: '+201001234567',
    doctorName: 'د. علي حسن',
    date: '2024-12-06',
    time: '10:00',
    duration: 30,
    reason: 'استشارة عامة',
    status: 'confirmed',
    notes: 'المريض يشكو من آلام في الرأس'
  },
  {
    id: 'apt-002',
    patientName: 'فاطمة علي',
    patientPhone: '+201101234567',
    doctorName: 'د. سارة محمود',
    date: '2024-12-06',
    time: '14:00',
    duration: 45,
    reason: 'متابعة',
    status: 'confirmed',
    notes: 'متابعة الحالة السابقة'
  },
  {
    id: 'apt-003',
    patientName: 'محمود حسن',
    patientPhone: '+201201234567',
    doctorName: 'د. علي حسن',
    date: '2024-12-07',
    time: '11:00',
    duration: 30,
    reason: 'فحص دوري',
    status: 'pending',
    notes: 'فحص دوري سنوي'
  }
];

const AppointmentsManager: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'confirmed' | 'pending' | 'completed' | 'cancelled'>('all');

  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = apt.patientName.includes(searchTerm) || apt.doctorName.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || apt.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'confirmed': return 'مؤكد';
      case 'pending': return 'معلق';
      case 'completed': return 'مكتمل';
      case 'cancelled': return 'ملغى';
      default: return status;
    }
  };

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-blue-600" />
            إدارة المواعيد
          </h2>
          <p className="text-sm text-gray-500">إدارة مواعيد المرضى والأطباء</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          <Plus className="w-5 h-5" />
          موعد جديد
        </button>
      </div>

      {/* Controls */}
      <div className="flex gap-4 flex-wrap">
        <div className="flex-1 min-w-64 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="ابحث عن موعد..."
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
          <option value="confirmed">مؤكد</option>
          <option value="pending">معلق</option>
          <option value="completed">مكتمل</option>
          <option value="cancelled">ملغى</option>
        </select>
      </div>

      {/* Appointments Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden flex-1 flex flex-col">
        <div className="overflow-x-auto flex-1">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
              <tr>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">المريض</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">الطبيب</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">التاريخ والوقت</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">السبب</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">الحالة</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAppointments.map(apt => (
                <tr key={apt.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-800">{apt.patientName}</p>
                      <p className="text-xs text-gray-500">{apt.patientPhone}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{apt.doctorName}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {apt.date} {apt.time}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{apt.reason}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(apt.status)}`}>
                      {getStatusLabel(apt.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-1 hover:bg-gray-100 rounded transition">
                        <Edit className="w-4 h-4 text-blue-600" />
                      </button>
                      <button className="p-1 hover:bg-red-100 rounded transition">
                        <Trash2 className="w-4 h-4 text-red-600" />
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

export default AppointmentsManager;
