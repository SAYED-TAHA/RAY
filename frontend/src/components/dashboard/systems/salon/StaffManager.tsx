/**
 * مدير الموظفين
 * إدارة موظفي الصالون
 */

import React, { useState } from 'react';
import {
  Users, Search, Plus, Edit, Trash2, Phone, Mail,
  Calendar, Star, TrendingUp, AlertCircle, CheckCircle
} from 'lucide-react';

interface Staff {
  id: string;
  name: string;
  phone: string;
  email: string;
  position: string;
  specialization: string;
  hireDate: string;
  rating: number;
  reviews: number;
  status: 'active' | 'inactive' | 'on_leave';
  salary: number;
}

const initialStaff: Staff[] = [
  {
    id: 'staff-001',
    name: 'فاطمة محمد',
    phone: '+201001234567',
    email: 'fatima@salon.com',
    position: 'مصففة شعر',
    specialization: 'تسريحات حديثة',
    hireDate: '2022-01-15',
    rating: 4.9,
    reviews: 245,
    status: 'active',
    salary: 3500
  },
  {
    id: 'staff-002',
    name: 'سارة علي',
    phone: '+201101234567',
    email: 'sara@salon.com',
    position: 'خبيرة تجميل',
    specialization: 'مكياج وعناية بالبشرة',
    hireDate: '2022-06-20',
    rating: 4.8,
    reviews: 198,
    status: 'active',
    salary: 3200
  },
  {
    id: 'staff-003',
    name: 'ليلى حسن',
    phone: '+201201234567',
    email: 'leila@salon.com',
    position: 'فني أظافر',
    specialization: 'تجميل أظافر',
    hireDate: '2023-03-10',
    rating: 4.7,
    reviews: 156,
    status: 'active',
    salary: 2800
  }
];

const StaffManager: React.FC = () => {
  const [staff, setStaff] = useState<Staff[]>(initialStaff);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'on_leave'>('all');

  const filteredStaff = staff.filter(s => {
    const matchesSearch = s.name.includes(searchTerm) || s.position.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || s.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'on_leave': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'نشط';
      case 'inactive': return 'غير نشط';
      case 'on_leave': return 'في إجازة';
      default: return status;
    }
  };

  const stats = {
    total: staff.length,
    active: staff.filter(s => s.status === 'active').length,
    totalSalary: staff.reduce((sum, s) => sum + s.salary, 0)
  };

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Users className="w-6 h-6 text-pink-600" />
            إدارة الموظفين
          </h2>
          <p className="text-sm text-gray-500">إدارة موظفي الصالون</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition">
          <Plus className="w-5 h-5" />
          موظف جديد
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">إجمالي الموظفين</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-xl border border-green-200">
          <p className="text-sm text-green-700 mb-1">موظفين نشطين</p>
          <p className="text-2xl font-bold text-green-900">{stats.active}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
          <p className="text-sm text-blue-700 mb-1">إجمالي الرواتب</p>
          <p className="text-2xl font-bold text-blue-900">{(stats.totalSalary / 1000).toFixed(1)}K</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-4 flex-wrap">
        <div className="flex-1 min-w-64 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="ابحث عن موظف..."
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
          <option value="active">نشط</option>
          <option value="inactive">غير نشط</option>
          <option value="on_leave">في إجازة</option>
        </select>
      </div>

      {/* Staff Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden flex-1 flex flex-col">
        <div className="overflow-x-auto flex-1">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
              <tr>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">الاسم</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">الوظيفة</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">التخصص</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">التقييم</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">الراتب</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">الحالة</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredStaff.map(s => (
                <tr key={s.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-800">{s.name}</p>
                      <p className="text-xs text-gray-500">{s.phone}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{s.position}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{s.specialization}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-semibold">{s.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-800">{s.salary} ج</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(s.status)}`}>
                      {getStatusLabel(s.status)}
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

export default StaffManager;
