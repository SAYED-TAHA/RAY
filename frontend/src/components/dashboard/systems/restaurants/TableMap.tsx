
import React, { useState } from 'react';
import { Users, Clock, Coffee, CheckCircle, AlertCircle, DollarSign, MoreVertical, Utensils, Zap, TrendingUp } from 'lucide-react';

interface Table {
  id: string;
  name: string;
  zone: 'indoor' | 'terrace' | 'vip';
  capacity: number;
  status: 'available' | 'occupied' | 'reserved' | 'billed' | 'cleaning';
  guests?: number;
  time?: string;
  amount?: number;
  waitTime?: number; // بالدقائق
  priority?: 'normal' | 'urgent' | 'vip';
}

const initialTables: Table[] = [
  { id: 'T1', name: 'T-01', zone: 'indoor', capacity: 2, status: 'occupied', guests: 2, time: '12:30', amount: 450, waitTime: 25, priority: 'normal' },
  { id: 'T2', name: 'T-02', zone: 'indoor', capacity: 4, status: 'available', priority: 'normal' },
  { id: 'T3', name: 'T-03', zone: 'indoor', capacity: 4, status: 'reserved', time: '02:00 PM', priority: 'normal' },
  { id: 'T4', name: 'T-04', zone: 'indoor', capacity: 6, status: 'billed', guests: 5, time: '01:15', amount: 1200, priority: 'urgent' },
  { id: 'T5', name: 'T-05', zone: 'terrace', capacity: 2, status: 'cleaning', priority: 'normal' },
  { id: 'T6', name: 'T-06', zone: 'terrace', capacity: 4, status: 'occupied', guests: 3, time: '01:00', amount: 320, waitTime: 35, priority: 'normal' },
  { id: 'V1', name: 'VIP-1', zone: 'vip', capacity: 8, status: 'reserved', time: '08:00 PM', priority: 'vip' },
  { id: 'V2', name: 'VIP-2', zone: 'vip', capacity: 10, status: 'available', priority: 'vip' },
];

const TableMap: React.FC = () => {
  const [activeZone, setActiveZone] = useState('all');
  const [tables, setTables] = useState(initialTables);

  const filterTables = activeZone === 'all' ? tables : tables.filter(t => t.zone === activeZone);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-50 border-green-200 text-green-700 hover:border-green-400';
      case 'occupied': return 'bg-red-50 border-red-200 text-red-700 hover:border-red-400';
      case 'reserved': return 'bg-orange-50 border-orange-200 text-orange-700 hover:border-orange-400';
      case 'billed': return 'bg-blue-50 border-blue-200 text-blue-700 hover:border-blue-400';
      case 'cleaning': return 'bg-yellow-50 border-yellow-200 text-yellow-700 hover:border-yellow-400';
      default: return 'bg-white border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'available': return 'متاح';
      case 'occupied': return 'مشغول';
      case 'reserved': return 'محجوز';
      case 'billed': return 'فاتورة';
      case 'cleaning': return 'تنظيف';
      default: return status;
    }
  };

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Header & Controls */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Utensils className="w-6 h-6 text-orange-600" />
            خريطة الطاولات
          </h2>
          <p className="text-sm text-gray-500">إدارة الصالة والتسكين</p>
        </div>
        
        <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
          {['all', 'indoor', 'terrace', 'vip'].map((zone) => (
            <button
              key={zone}
              onClick={() => setActiveZone(zone)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition capitalize ${
                activeZone === zone ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {zone === 'all' ? 'الكل' : zone === 'indoor' ? 'الصالة الداخلية' : zone === 'terrace' ? 'التراس' : 'VIP'}
            </button>
          ))}
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 bg-gray-50 rounded-2xl border border-gray-200 p-8 overflow-y-auto relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filterTables.map((table) => (
            <div 
              key={table.id}
              className={`relative p-4 rounded-2xl border-2 transition-all cursor-pointer shadow-sm hover:shadow-md flex flex-col justify-between h-40 ${getStatusColor(table.status)}`}
            >
              <div className="flex justify-between items-start">
                <span className="font-black text-lg">{table.name}</span>
                <div className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                  table.status === 'available' ? 'bg-green-100 text-green-700 border-green-200' :
                  table.status === 'occupied' ? 'bg-red-100 text-red-700 border-red-200' :
                  table.status === 'reserved' ? 'bg-orange-100 text-orange-700 border-orange-200' :
                  'bg-blue-100 text-blue-700 border-blue-200'
                }`}>
                  {getStatusLabel(table.status)}
                </div>
              </div>

              <div className="space-y-2">
                {table.status === 'available' ? (
                  <div className="flex items-center justify-center h-12 text-gray-300">
                    <Coffee className="w-8 h-8" />
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {table.time}</span>
                      {table.guests && <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {table.guests}</span>}
                    </div>
                    {table.amount && (
                      <div className="bg-white/50 p-2 rounded-lg text-center font-black text-sm border border-black/5">
                        {table.amount} ج.م
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-black/5 mt-2">
                <span className="text-xs opacity-70 flex items-center gap-1">
                  <Users className="w-3 h-3" /> {table.capacity} مقاعد
                </span>
                <button className="p-1 hover:bg-black/5 rounded-full transition">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-wrap gap-6 justify-center">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="w-4 h-4 rounded bg-white border-2 border-gray-200"></div> متاح
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="w-4 h-4 rounded bg-red-50 border-2 border-red-200"></div> مشغول
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="w-4 h-4 rounded bg-orange-50 border-2 border-orange-200"></div> محجوز
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="w-4 h-4 rounded bg-blue-50 border-2 border-blue-200"></div> طلب الفاتورة
        </div>
      </div>
    </div>
  );
};

export default TableMap;
