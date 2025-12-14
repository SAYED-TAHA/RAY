import React, { useState } from 'react';
import { 
  Truck, Plus, Edit, Trash2, Phone, Mail, MapPin, 
  DollarSign, Package, Clock, AlertCircle, CheckCircle,
  Search, Filter, Download, Settings2, MoreVertical
} from 'lucide-react';

interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  rating: number;
  status: 'active' | 'inactive' | 'pending';
  totalOrders: number;
  totalSpent: number;
  lastOrder: string;
  paymentTerms: string;
}

const initialSuppliers: Supplier[] = [
  {
    id: 'SUP001',
    name: 'شركة الجودة للتوريد',
    email: 'info@quality.com',
    phone: '+20 100 123 4567',
    address: 'شارع النيل، القاهرة',
    city: 'القاهرة',
    rating: 4.8,
    status: 'active',
    totalOrders: 45,
    totalSpent: 125000,
    lastOrder: '2024-12-05',
    paymentTerms: '30 يوم'
  },
  {
    id: 'SUP002',
    name: 'مصنع النجم للمنتجات',
    email: 'sales@star.com',
    phone: '+20 100 234 5678',
    address: 'المنطقة الصناعية، الجيزة',
    city: 'الجيزة',
    rating: 4.5,
    status: 'active',
    totalOrders: 32,
    totalSpent: 98000,
    lastOrder: '2024-12-04',
    paymentTerms: '15 يوم'
  },
  {
    id: 'SUP003',
    name: 'شركة الثقة للتجارة',
    email: 'contact@trust.com',
    phone: '+20 100 345 6789',
    address: 'مدينة نصر، القاهرة',
    city: 'القاهرة',
    rating: 4.2,
    status: 'pending',
    totalOrders: 8,
    totalSpent: 32000,
    lastOrder: '2024-12-03',
    paymentTerms: '45 يوم'
  },
];

const SupplierManager: React.FC = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'pending'>('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.name.includes(searchTerm) || supplier.email.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || supplier.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'نشط';
      case 'inactive': return 'غير نشط';
      case 'pending': return 'قيد الانتظار';
      default: return status;
    }
  };

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Truck className="w-6 h-6 text-orange-600" />
            إدارة الموردين
          </h2>
          <p className="text-sm text-gray-500">إدارة الموردين والطلبات والدفعات</p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
        >
          <Plus className="w-5 h-5" />
          موردين جديد
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="ابحث عن موردين..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as any)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500"
        >
          <option value="all">الكل</option>
          <option value="active">نشط</option>
          <option value="inactive">غير نشط</option>
          <option value="pending">قيد الانتظار</option>
        </select>
      </div>

      {/* Suppliers Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">اسم الموردين</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">البريد الإلكتروني</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">الهاتف</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">التقييم</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">الحالة</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">الطلبات</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">الإجمالي</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredSuppliers.map(supplier => (
                <tr key={supplier.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900">{supplier.name}</div>
                    <div className="text-xs text-gray-500">{supplier.city}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{supplier.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{supplier.phone}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-semibold">{supplier.rating}</span>
                      <span className="text-yellow-500">★</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(supplier.status)}`}>
                      {getStatusLabel(supplier.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{supplier.totalOrders}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-orange-600">{supplier.totalSpent.toLocaleString()} ج</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition" title="تعديل">
                        <Edit className="w-4 h-4 text-blue-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition" title="حذف">
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

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">إجمالي الموردين</p>
              <p className="text-2xl font-bold text-gray-900">{suppliers.length}</p>
            </div>
            <Truck className="w-8 h-8 text-orange-600 opacity-20" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">الموردين النشطين</p>
              <p className="text-2xl font-bold text-green-600">{suppliers.filter(s => s.status === 'active').length}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600 opacity-20" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">إجمالي الطلبات</p>
              <p className="text-2xl font-bold text-blue-600">{suppliers.reduce((sum, s) => sum + s.totalOrders, 0)}</p>
            </div>
            <Package className="w-8 h-8 text-blue-600 opacity-20" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">إجمالي المشتريات</p>
              <p className="text-2xl font-bold text-orange-600">{(suppliers.reduce((sum, s) => sum + s.totalSpent, 0) / 1000).toFixed(0)}K ج</p>
            </div>
            <DollarSign className="w-8 h-8 text-orange-600 opacity-20" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierManager;
