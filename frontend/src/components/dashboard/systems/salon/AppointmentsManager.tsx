/**
 * مدير المواعيد - الصالون
 * إدارة مواعيد العملاء والموظفين
 */

import React, { useState } from 'react';
import {
  Calendar, Search, Plus, Edit, Trash2, User, Phone,
  Clock, CheckCircle, AlertCircle, X, Eye
} from 'lucide-react';

interface SalonAppointment {
  id: string;
  clientName: string;
  clientPhone: string;
  staffName: string;
  date: string;
  time: string;
  duration: number;
  service: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  notes?: string;
}

const initialAppointments: SalonAppointment[] = [
  {
    id: 'apt-001',
    clientName: 'أحمد محمد',
    clientPhone: '+201001234567',
    staffName: 'فاطمة',
    date: '2024-12-06',
    time: '10:00',
    duration: 60,
    service: 'قص شعر',
    status: 'confirmed',
    notes: 'قص شعر عادي'
  },
  {
    id: 'apt-002',
    clientName: 'فاطمة علي',
    clientPhone: '+201101234567',
    staffName: 'سارة',
    date: '2024-12-06',
    time: '14:00',
    duration: 90,
    service: 'تسريحة شعر',
    status: 'confirmed',
    notes: 'تسريحة حفلة'
  },
  {
    id: 'apt-003',
    clientName: 'محمود حسن',
    clientPhone: '+201201234567',
    staffName: 'ليلى',
    date: '2024-12-07',
    time: '11:00',
    duration: 45,
    service: 'تجميل أظافر',
    status: 'pending',
    notes: 'تجميل أظافر'
  }
];

const AppointmentsManager: React.FC = () => {
  const [appointments, setAppointments] = useState<SalonAppointment[]>(initialAppointments);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'confirmed' | 'pending' | 'completed' | 'cancelled'>('all');

  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = apt.clientName.includes(searchTerm) || apt.service.includes(searchTerm);
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
            <Calendar className="w-6 h-6 text-pink-600" />
            إدارة المواعيد
          </h2>
          <p className="text-sm text-gray-500">إدارة مواعيد العملاء والموظفين</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition">
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
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as any)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500"
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
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">العميل</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">الموظف</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">التاريخ والوقت</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">الخدمة</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">الحالة</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAppointments.map(apt => (
                <tr key={apt.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-800">{apt.clientName}</p>
                      <p className="text-xs text-gray-500">{apt.clientPhone}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{apt.staffName}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {apt.date} {apt.time}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{apt.service}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(apt.status)}`}>
                      {getStatusLabel(apt.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-1 hover:bg-gray-100 rounded transition">
                        <Edit className="w-4 h-4 text-pink-600" />
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
