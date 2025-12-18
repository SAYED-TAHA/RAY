'use client';

import React, { useEffect, useState } from 'react';
import { 
  Users, Search, Filter, Download, Eye, Edit, Trash2,
  Mail, Phone, MapPin, Calendar, Clock, ShoppingCart,
  DollarSign, CheckCircle, XCircle, UserPlus, UserMinus,
  Star, Shield, User
} from 'lucide-react';
import Link from 'next/link';
import { deleteUser, fetchUsers, updateUser, User as ApiUser } from '../../../services/usersService';

interface UserInterface {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'merchant' | 'customer';
  status: 'active' | 'inactive' | 'suspended';
  joinDate: string;
  lastLogin: string;
  orders: number;
  spent: number;
  location: string;
  avatar?: string;
  rating?: number;
  verified: boolean;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const mapApiUser = (u: ApiUser): UserInterface => {
    const id = (u as any).id || u._id;
    return {
      id: String(id),
      name: u.name,
      email: u.email,
      phone: u.phone || '',
      role: u.role,
      status: (u.status as any) || 'inactive',
      joinDate: u.joinDate || '',
      lastLogin: u.lastLogin || '',
      orders: u.orders || 0,
      spent: u.spent || 0,
      location: u.location || '',
      avatar: u.avatar,
      rating: u.rating,
      verified: Boolean(u.verified)
    };
  };

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await fetchUsers({ limit: 200 });
      setUsers((data.users || []).map(mapApiUser));
    } catch (error) {
      console.error('Failed to load users:', error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone.includes(searchTerm);
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-bold';
      case 'merchant':
        return 'bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-bold';
      case 'customer':
        return 'bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold';
      default:
        return 'bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-bold';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold';
      case 'inactive':
        return 'bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-bold';
      case 'suspended':
        return 'bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-bold';
      default:
        return 'bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-bold';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'مدير';
      case 'merchant': return 'تاجر';
      case 'customer': return 'عميل';
      default: return role;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'نشط';
      case 'inactive': return 'غير نشط';
      case 'suspended': return 'موقوف';
      default: return status;
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا المستخدم؟')) return;
    try {
      await deleteUser(id);
      await loadUsers();
    } catch (error: any) {
      console.error('Failed to delete user:', error);
      alert(error?.message || 'فشل حذف المستخدم');
    }
  };

  const handleEdit = async (user: UserInterface) => {
    const name = window.prompt('الاسم:', user.name);
    if (!name) return;
    const roleInput = window.prompt('الدور: admin / merchant / customer', user.role);
    const role = (roleInput === 'admin' || roleInput === 'merchant' || roleInput === 'customer' ? roleInput : user.role) as any;
    const statusInput = window.prompt('الحالة: active / inactive / suspended', user.status);
    const status = (statusInput === 'active' || statusInput === 'inactive' || statusInput === 'suspended' ? statusInput : user.status) as any;

    try {
      await updateUser(user.id, { name, role, status });
      await loadUsers();
    } catch (error: any) {
      console.error('Failed to update user:', error);
      alert(error?.message || 'فشل تعديل المستخدم');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="text-gray-600 hover:text-gray-900 transition">
                ← لوحة التحكم
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">المستخدمون</h1>
              <span className="bg-ray-blue text-white px-3 py-1 rounded-full text-sm font-bold">
                {filteredUsers.length}
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <button disabled className="bg-ray-blue text-white px-4 py-2 rounded-lg opacity-60 cursor-not-allowed transition flex items-center gap-2">
                <UserPlus className="w-4 h-4" />
                إضافة مستخدم
              </button>
              <button disabled className="border border-gray-300 px-4 py-2 rounded-lg opacity-60 cursor-not-allowed transition flex items-center gap-2">
                <Download className="w-4 h-4" />
                تصدير
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="بحث بالاسم، البريد الإلكتروني، أو الهاتف..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ray-blue"
              />
            </div>
            
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ray-blue"
            >
              <option value="all">كل الأدوار</option>
              <option value="admin">مدير</option>
              <option value="merchant">تاجر</option>
              <option value="customer">عميل</option>
            </select>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ray-blue"
            >
              <option value="all">كل الحالات</option>
              <option value="active">نشط</option>
              <option value="inactive">غير نشط</option>
              <option value="suspended">موقوف</option>
            </select>
            
            <button disabled className="border border-gray-300 px-4 py-2 rounded-lg opacity-60 cursor-not-allowed transition flex items-center gap-2">
              <Filter className="w-4 h-4" />
              فلاتر متقدمة
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="p-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-10 text-center text-gray-600">جاري تحميل المستخدمين...</div>
            ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    المستخدم
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الدور
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الحالة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الطلبات
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الإنفاق
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    آخر تسجيل دخول
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    إجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <User className="w-5 h-5 text-gray-600" />
                        </div>
                        <div className="mr-3">
                          <div className="flex items-center gap-2">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            {user.verified && (
                              <CheckCircle className="w-4 h-4 text-blue-500" />
                            )}
                          </div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                          <div className="text-xs text-gray-400">{user.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getRoleBadge(user.role)}>
                        {getRoleLabel(user.role)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getStatusBadge(user.status)}>
                        {getStatusLabel(user.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.orders}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.spent.toLocaleString()} ج.م
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.lastLogin}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button disabled className="text-ray-blue opacity-60 cursor-not-allowed transition">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleEdit(user)} className="text-gray-600 hover:text-gray-900 transition">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(user.id)} className="text-red-600 hover:text-red-700 transition">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
