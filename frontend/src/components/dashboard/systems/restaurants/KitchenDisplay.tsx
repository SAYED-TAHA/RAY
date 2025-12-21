
import React, { useEffect, useState } from 'react';
import { CheckCircle, ChefHat, Flame, Check, List, LayoutGrid } from 'lucide-react';
import { fetchOrders, updateOrderStatus, type Order } from '@/services/ordersService';

interface OrderItem {
  id: string;
  name: string;
  qty: number;
  notes?: string;
}

interface KitchenOrder {
  id: string; // internal id (Order._id)
  orderNumber: string;
  type: 'dine_in' | 'delivery' | 'takeaway';
  table?: string;
  customer?: string;
  time: string;
  status: 'new' | 'preparing' | 'ready';
  items: OrderItem[];
  priority: 'normal' | 'urgent' | 'vip';
  estimatedTime: number; // بالدقائق
}

const formatTime = (iso: string) => {
  try {
    return new Date(iso).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
  } catch {
    return '';
  }
};

const toKitchenOrderType = (o: Order): KitchenOrder['type'] => {
  const dType = o.delivery?.type;
  if (dType === 'delivery') return 'delivery';
  if (dType === 'pickup') return 'takeaway';
  return 'dine_in';
};

const toKitchenStatus = (status: Order['status']): KitchenOrder['status'] => {
  if (status === 'preparing') return 'preparing';
  if (status === 'ready') return 'ready';
  return 'new';
};

const estimateMinutes = (o: Order) => {
  const count = (o.items || []).reduce((s, i) => s + (i.quantity || 0), 0);
  return Math.max(5, Math.min(30, 5 + count * 2));
};

const toKitchenOrder = (o: Order): KitchenOrder => {
  const notes = o.delivery?.deliveryNotes || o.notes?.customerNotes || '';
  return {
    id: o._id,
    orderNumber: o.orderNumber,
    type: toKitchenOrderType(o),
    table: o.delivery?.type === 'on-site' ? 'T-01' : undefined,
    customer: o.customerId,
    time: formatTime(o.createdAt),
    status: toKitchenStatus(o.status),
    items: (o.items || []).map((it, idx) => ({
      id: String(it.itemId || idx),
      name: it.name,
      qty: it.quantity,
      notes: notes || it.description
    })),
    priority: 'normal',
    estimatedTime: estimateMinutes(o)
  };
};

const KitchenDisplay: React.FC = () => {
  const [orders, setOrders] = useState<KitchenOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const loadOrders = async () => {
    setLoading(true);
    try {
      const res = await fetchOrders({ limit: 50, sortBy: 'createdAt', sortOrder: 'desc' });
      const mapped = (res.orders || []).map(toKitchenOrder);
      // KDS focus on current tickets
      const filtered = mapped.filter(o => ['new', 'preparing', 'ready'].includes(o.status));
      setOrders(filtered);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
    const t = setInterval(loadOrders, 8000);
    return () => clearInterval(t);
  }, []);

  const updateStatus = async (orderId: string, nextStatus: KitchenOrder['status']) => {
    setOrders(prev => prev.map(order => order.id === orderId ? { ...order, status: nextStatus } : order));

    const apiStatus = nextStatus === 'preparing' ? 'preparing' : 'ready';
    const updated = await updateOrderStatus(orderId, apiStatus);
    if (updated) {
      setOrders(prev => prev.map(o => o.id === orderId ? toKitchenOrder(updated) : o));
    }
  };

  const getTypeLabel = (type: string) => {
    switch(type) {
      case 'dine_in': return 'صالة';
      case 'delivery': return 'توصيل';
      case 'takeaway': return 'تيك أواي';
      default: return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'dine_in': return 'bg-blue-500';
      case 'delivery': return 'bg-green-500';
      case 'takeaway': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] bg-gray-900 rounded-2xl p-4 overflow-hidden flex flex-col">
      {/* KDS Header */}
      <div className="flex justify-between items-center mb-6 bg-gray-800 p-4 rounded-xl border border-gray-700">
        <div className="flex items-center gap-3">
          <div className="bg-orange-600 p-2 rounded-lg">
            <ChefHat className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">شاشة المطبخ (KDS)</h2>
            <p className="text-gray-400 text-xs">المتوسط: 12 دقيقة</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
            <div className="flex gap-4 text-sm hidden md:flex">
                <div className="flex items-center gap-2 text-gray-300">
                    <span className="w-3 h-3 rounded-full bg-blue-500"></span> صالة
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                    <span className="w-3 h-3 rounded-full bg-green-500"></span> توصيل
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                    <span className="w-3 h-3 rounded-full bg-purple-500"></span> تيك أواي
                </div>
            </div>
            <div className="flex bg-gray-700 rounded-lg p-1">
                <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded transition ${viewMode === 'grid' ? 'bg-gray-600 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                    <LayoutGrid className="w-5 h-5" />
                </button>
                <button 
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded transition ${viewMode === 'list' ? 'bg-gray-600 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                    <List className="w-5 h-5" />
                </button>
            </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pr-2">
        {loading && (
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 text-center text-gray-300 mb-4">
            جاري تحميل الطلبات...
          </div>
        )}
        {!loading && orders.length === 0 && (
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 text-center text-gray-300 mb-4">
            لا توجد طلبات بعد
          </div>
        )}
        {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {orders.map(order => (
                <div 
                key={order.id} 
                className={`bg-gray-800 rounded-xl overflow-hidden border-2 flex flex-col min-h-[300px]
                    ${order.status === 'new' ? 'border-red-500 animate-pulse-slow' : order.status === 'preparing' ? 'border-yellow-500' : 'border-green-500'}
                `}
                >
                {/* Ticket Header */}
                <div className={`${getTypeColor(order.type)} text-white p-3 flex justify-between items-center`}>
                    <div className="flex flex-col">
                    <span className="font-black text-lg">{order.orderNumber}</span>
                    <span className="text-xs opacity-90 font-medium">{getTypeLabel(order.type)}</span>
                    </div>
                    <div className="text-left">
                    <span className="font-bold block">{order.time}</span>
                    <span className="text-xs opacity-80 block">{order.table || order.customer}</span>
                    </div>
                </div>

                {/* Items List */}
                <div className="p-4 flex-1 space-y-3 bg-gray-800">
                    {order.items.map(item => (
                    <div key={item.id} className="flex items-start gap-3 border-b border-gray-700 pb-2 last:border-0">
                        <div className="bg-gray-700 text-white w-6 h-6 flex items-center justify-center rounded font-bold text-sm shrink-0">
                        {item.qty}
                        </div>
                        <div>
                        <p className="text-gray-200 font-bold text-sm">{item.name}</p>
                        {item.notes && <p className="text-red-400 text-xs mt-1 font-medium">⚠️ {item.notes}</p>}
                        </div>
                    </div>
                    ))}
                </div>

                {/* Actions */}
                <div className="p-3 bg-gray-750 border-t border-gray-700">
                    {order.status === 'new' ? (
                    <button 
                        onClick={() => updateStatus(order.id, 'preparing')}
                        className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition"
                    >
                        <Flame className="w-5 h-5 text-orange-500" />
                        بدء التحضير
                    </button>
                    ) : order.status === 'preparing' ? (
                    <button 
                        onClick={() => updateStatus(order.id, 'ready')}
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition"
                    >
                        <CheckCircle className="w-5 h-5" />
                        جاهز للتقديم
                    </button>
                    ) : (
                      <div className="w-full bg-green-600/10 text-green-400 py-3 rounded-lg font-bold flex items-center justify-center gap-2">
                        <Check className="w-5 h-5" />
                        تم التجهيز
                      </div>
                    )}
                </div>
                </div>
            ))}
            </div>
        ) : (
            <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
                <table className="w-full text-right">
                    <thead className="bg-gray-700 text-gray-300 text-xs font-bold uppercase">
                        <tr>
                            <th className="p-4">رقم الطلب</th>
                            <th className="p-4">النوع</th>
                            <th className="p-4">التفاصيل (العميل/الطاولة)</th>
                            <th className="p-4">الوقت</th>
                            <th className="p-4">المحتويات</th>
                            <th className="p-4">الحالة</th>
                            <th className="p-4 text-center">إجراء</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-200 divide-y divide-gray-700">
                        {orders.map(order => (
                            <tr key={order.id} className="hover:bg-gray-700/50 transition">
                                <td className="p-4 font-black">{order.orderNumber}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold text-white ${getTypeColor(order.type)}`}>
                                        {getTypeLabel(order.type)}
                                    </span>
                                </td>
                                <td className="p-4 font-bold">{order.table || order.customer}</td>
                                <td className="p-4 text-sm font-mono">{order.time}</td>
                                <td className="p-4">
                                    <span className="text-sm text-gray-400">{order.items.length} أصناف</span>
                                </td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                                        order.status === 'new' ? 'bg-red-500/20 text-red-400' :
                                        order.status === 'preparing' ? 'bg-yellow-500/20 text-yellow-400' :
                                        'bg-green-500/20 text-green-400'
                                    }`}>
                                        {order.status === 'new' ? 'جديد' : order.status === 'preparing' ? 'جاري التحضير' : 'جاهز'}
                                    </span>
                                </td>
                                <td className="p-4 text-center">
                                    {order.status === 'new' ? (
                                        <button 
                                            onClick={() => updateStatus(order.id, 'preparing')}
                                            className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1.5 rounded text-xs font-bold"
                                        >
                                            بدء
                                        </button>
                                    ) : order.status === 'preparing' ? (
                                        <button 
                                            onClick={() => updateStatus(order.id, 'ready')}
                                            className="bg-green-600 hover:bg-green-500 text-white px-3 py-1.5 rounded text-xs font-bold"
                                        >
                                            إتمام
                                        </button>
                                    ) : (
                                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}
      </div>
    </div>
  );
};

export default KitchenDisplay;
