
import React, { useEffect, useMemo, useState } from 'react';
import { 
  Search, Filter, Plus, Edit, Trash2, Star
} from 'lucide-react';
import StatusBadge from '../../../common/StatusBadge';
import StatCard from '../../../common/cards/StatCard';
import { fetchOrders } from '../../../../services/ordersService';
import { fetchProducts } from '../../../../services/productsService';
import { fetchUsers } from '../../../../services/usersService';

interface UniversalDataViewProps {
  type: string;
  theme: any;
}

// --- Data Generators ---

type DataRow = {
  id: string;
  col1: string;
  col2: string;
  col3: string;
  col4: string;
  status?: string;
  rating?: number;
};

const UniversalDataView: React.FC<UniversalDataViewProps> = ({ type, theme }) => {
  const [rows, setRows] = useState<DataRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const viewConfig = useMemo(() => {
    switch (type) {
      case 'products':
      case 'inventory':
      case 'menu':
      case 'store':
      case 'pharmacy':
        return {
          title: 'إدارة المنتجات والمخزون',
          action: 'إضافة منتج',
          headers: ['الاسم', 'السعر', 'القسم', 'المخزون', 'الحالة'],
          supported: true,
          kind: 'products' as const,
        };
      case 'orders':
      case 'delivery':
      case 'lab':
        return {
          title: 'الطلبات والعمليات',
          action: 'طلب جديد',
          headers: ['رقم الطلب', 'الحالة', 'التاريخ', 'الإجمالي', 'الدفع'],
          supported: true,
          kind: 'orders' as const,
        };
      case 'customers':
      case 'patients':
      case 'members':
      case 'users':
        return {
          title: 'قاعدة بيانات العملاء',
          action: 'عميل جديد',
          headers: ['الاسم', 'البريد', 'الهاتف', 'الدور', 'الحالة'],
          supported: true,
          kind: 'users' as const,
        };
      default:
        return {
          title: 'سجل البيانات',
          action: 'إضافة جديد',
          headers: ['الاسم', 'التفاصيل', 'التاريخ', 'المبلغ', 'الحالة'],
          supported: false,
          kind: 'unsupported' as const,
        };
    }
  }, [type]);

  useEffect(() => {
    const load = async () => {
      if (!viewConfig.supported) {
        setRows([]);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        if (viewConfig.kind === 'products') {
          const res = await fetchProducts({ limit: 20 });
          const list = Array.isArray((res as any)?.products) ? (res as any).products : [];
          const mapped: DataRow[] = list.map((p: any) => ({
            id: String(p._id || p.id || ''),
            col1: String(p.name ?? '-'),
            col2: `${Number(p.price ?? 0).toLocaleString()} ج`,
            col3: String(p.category ?? '-'),
            col4: String(p.stock ?? 0),
            status: String(p.status ?? 'unknown'),
          }));
          setRows(mapped);
          return;
        }

        if (viewConfig.kind === 'orders') {
          const res = await fetchOrders({ limit: 20 });
          const list = Array.isArray((res as any)?.orders) ? (res as any).orders : [];
          const mapped: DataRow[] = list.map((o: any) => ({
            id: String(o.orderNumber ?? o._id ?? ''),
            col1: String(o.orderNumber ?? o._id ?? '-'),
            col2: String(o.status ?? '-'),
            col3: o.createdAt ? new Date(o.createdAt).toLocaleDateString() : '-',
            col4: `${Number(o.pricing?.total ?? 0).toLocaleString()} ج`,
            status: String(o.payment?.status ?? 'unknown'),
          }));
          setRows(mapped);
          return;
        }

        if (viewConfig.kind === 'users') {
          const res = await fetchUsers({ limit: '20', page: '1', search: searchTerm || undefined });
          const list = Array.isArray(res) ? res : Array.isArray((res as any)?.users) ? (res as any).users : [];
          const mapped: DataRow[] = list.map((u: any) => ({
            id: String(u._id ?? u.id ?? ''),
            col1: String(u.name ?? '-'),
            col2: String(u.email ?? '-'),
            col3: String(u.phone ?? '-'),
            col4: String(u.role ?? '-'),
            status: String(u.status ?? 'unknown'),
          }));
          setRows(mapped);
          return;
        }
      } catch (e) {
        console.error('Failed to load universal data view:', e);
        setError('تعذر تحميل البيانات حالياً');
        setRows([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [searchTerm, viewConfig.kind, viewConfig.supported]);

  const stats = useMemo(() => {
    if (!viewConfig.supported) return [];
    if (viewConfig.kind === 'products') {
      const active = rows.filter(r => r.status === 'active').length;
      return [
        { title: 'إجمالي المنتجات', value: String(rows.length), sub: 'منتج', icon: Star, color: 'blue' },
        { title: 'نشط', value: String(active), sub: 'منتج', icon: Star, color: 'green' },
      ];
    }
    if (viewConfig.kind === 'orders') {
      return [
        { title: 'إجمالي الطلبات', value: String(rows.length), sub: 'طلب', icon: Star, color: 'blue' },
      ];
    }
    if (viewConfig.kind === 'users') {
      return [
        { title: 'إجمالي المستخدمين', value: String(rows.length), sub: 'مستخدم', icon: Star, color: 'blue' },
      ];
    }
    return [];
  }, [rows, viewConfig.kind, viewConfig.supported]);

  const filteredRows = useMemo(() => {
    if (!searchTerm) return rows;
    const q = searchTerm.toLowerCase();
    return rows.filter(r =>
      [r.id, r.col1, r.col2, r.col3, r.col4].some(v => String(v ?? '').toLowerCase().includes(q))
    );
  }, [rows, searchTerm]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
      
      {/* Conditional Report Stats */}
      {stats.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, idx) => (
            <StatCard 
              key={idx} 
              title={stat.title} 
              value={stat.value} 
              sub={stat.sub} 
              icon={stat.icon} 
              color={stat.color as any} 
            />
          ))}
        </div>
      )}

      {/* Header & Controls */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">{viewConfig.title}</h2>
          <p className="text-sm text-gray-500">إدارة وعرض بيانات {viewConfig.title}</p>
        </div>
        
        <div className="flex flex-1 w-full md:w-auto gap-3 justify-end">
           <div className="relative flex-1 md:max-w-xs">
              <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="بحث..." 
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 pr-10 pl-4 focus:outline-none focus:border-blue-500 transition"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>
           <button className="p-2 bg-gray-100 rounded-xl text-gray-600 hover:bg-gray-200 transition">
              <Filter className="w-5 h-5" />
           </button>
           <button
              disabled={!viewConfig.supported || loading}
              className={`${theme.btn} text-white px-4 py-2 rounded-xl font-bold shadow-md flex items-center gap-2 whitespace-nowrap ${(!viewConfig.supported || loading) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Plus className="w-4 h-4" />
              {viewConfig.action}
           </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right whitespace-nowrap">
            <thead className="bg-gray-50 text-gray-500 text-xs font-bold border-b border-gray-100">
              <tr>
                {viewConfig.headers.map((header, idx) => (
                  <th key={idx} className="p-4">{header}</th>
                ))}
                <th className="p-4 w-20">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {loading ? (
                <tr>
                  <td className="p-6 text-center text-gray-600" colSpan={viewConfig.headers.length + 1}>
                    جاري التحميل...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td className="p-6 text-center text-gray-600" colSpan={viewConfig.headers.length + 1}>
                    {error}
                  </td>
                </tr>
              ) : !viewConfig.supported ? (
                <tr>
                  <td className="p-6 text-center text-gray-600" colSpan={viewConfig.headers.length + 1}>
                    لا توجد خدمة Backend لهذا القسم حالياً
                  </td>
                </tr>
              ) : filteredRows.length === 0 ? (
                <tr>
                  <td className="p-6 text-center text-gray-600" colSpan={viewConfig.headers.length + 1}>
                    لا توجد بيانات
                  </td>
                </tr>
              ) : (
                filteredRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/80 transition group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-gray-800">{row.col1}</span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600">{row.col2}</td>
                  <td className="p-4 text-gray-600">{row.col3}</td>
                  <td className={`p-4 font-bold ${theme.text}`}>{row.col4}</td>
                  <td className="p-4">
                    <StatusBadge status={row.status || 'unknown'} />
                  </td>
                  {/* Optional Rating Column for staff */}
                  {'rating' in row && (row as any).rating && (
                    <td className="p-4">
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="text-xs font-bold">{row.rating}</span>
                      </div>
                    </td>
                  )}
                  <td className="p-4">
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
                      <button disabled className="p-1.5 rounded text-blue-600 opacity-50 cursor-not-allowed"><Edit className="w-4 h-4" /></button>
                      <button disabled className="p-1.5 rounded text-red-600 opacity-50 cursor-not-allowed"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination / Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
           <p className="text-xs text-gray-500">عرض {filteredRows.length} سجل</p>
           <div className="flex gap-2">
              <button className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-100">السابق</button>
              <button className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-100">التالي</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default UniversalDataView;
