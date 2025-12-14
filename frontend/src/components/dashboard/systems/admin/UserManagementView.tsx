"use client";

import React, { useState } from 'react';
import { 
  Users, UserPlus, Shield, Eye, Edit, Trash2, Search, Filter,
  Mail, Phone, Calendar, CheckCircle, XCircle, AlertTriangle
} from 'lucide-react';

const UserManagementView: React.FC = () => {
  const [users] = useState([
    { id: 1, name: 'أحمد محمد', email: 'ahmed@example.com', role: 'admin', status: 'active', lastLogin: '2025-12-05' },
    { id: 2, name: 'سارة أحمد', email: 'sara@example.com', role: 'user', status: 'active', lastLogin: '2025-12-04' },
    { id: 3, name: 'محمد علي', email: 'mohammed@example.com', role: 'manager', status: 'inactive', lastLogin: '2025-12-01' },
    { id: 4, name: 'فاطمة خالد', email: 'fatima@example.com', role: 'user', status: 'active', lastLogin: '2025-12-05' }
  ]);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active': return <span className="flex items-center gap-1 text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full"><CheckCircle className="w-3 h-3" /> نشط</span>;
      case 'inactive': return <span className="flex items-center gap-1 text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full"><XCircle className="w-3 h-3" /> غير نشط</span>;
      default: return <span className="flex items-center gap-1 text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full"><AlertTriangle className="w-3 h-3" /> معلق</span>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch(role) {
      case 'admin': return <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full font-bold">مشرف</span>;
      case 'manager': return <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">مدير</span>;
      default: return <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">مستخدم</span>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">إدارة المستخدمين</h1>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <UserPlus className="w-5 h-5" />
          إضافة مستخدم جديد
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <Users className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-800">24</span>
          </div>
          <h3 className="font-semibold text-gray-800">إجمالي المستخدمين</h3>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <span className="text-2xl font-bold text-gray-800">18</span>
          </div>
          <h3 className="font-semibold text-gray-800">مستخدمين نشطين</h3>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <Shield className="w-8 h-8 text-purple-600" />
            <span className="text-2xl font-bold text-gray-800">3</span>
          </div>
          <h3 className="font-semibold text-gray-800">مشرفين</h3>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <AlertTriangle className="w-8 h-8 text-yellow-600" />
            <span className="text-2xl font-bold text-gray-800">6</span>
          </div>
          <h3 className="font-semibold text-gray-800">يحتاج موافقة</h3>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="البحث عن مستخدم..."
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-5 h-5" />
            فلترة
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المستخدم</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الدور</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">آخر تسجيل</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">إجراءات</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-bold">{user.name.charAt(0)}</span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getRoleBadge(user.role)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(user.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.lastLogin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-4 h-4" />
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

export default UserManagementView;
