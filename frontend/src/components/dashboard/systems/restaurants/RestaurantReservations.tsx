
import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Users, Clock, Plus, Search, MoreVertical, CheckCircle, XCircle } from 'lucide-react';

const tables = [
  { id: 'T1', name: 'طاولة 1', capacity: 2, location: 'صالة' },
  { id: 'T2', name: 'طاولة 2', capacity: 4, location: 'صالة' },
  { id: 'T3', name: 'طاولة 3', capacity: 4, location: 'تراس' },
  { id: 'T4', name: 'طاولة 4', capacity: 6, location: 'تراس' },
  { id: 'VIP', name: 'VIP Room', capacity: 10, location: 'خاص' },
];

const hours = Array.from({ length: 12 }, (_, i) => i + 12); // 12 PM to 11 PM

const initialReservations = [
  { id: 1, tableId: 'T2', start: 13, duration: 2, customer: 'عائلة سمير', pax: 4, status: 'confirmed' },
  { id: 2, tableId: 'VIP', start: 20, duration: 3, customer: 'شركة النور', pax: 10, status: 'confirmed' },
  { id: 3, tableId: 'T1', start: 14, duration: 1, customer: 'محمد علي', pax: 2, status: 'arrived' },
  { id: 4, tableId: 'T3', start: 18, duration: 2, customer: 'سارة أحمد', pax: 3, status: 'pending' },
];

const RestaurantReservations: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('22 نوفمبر 2025');

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-gray-50 rounded-lg p-1">
             <button className="p-2 hover:bg-white rounded-md shadow-sm transition"><ChevronRight className="w-5 h-5 text-gray-600" /></button>
             <span className="px-4 font-bold text-gray-800 min-w-[140px] text-center">{selectedDate}</span>
             <button className="p-2 hover:bg-white rounded-md shadow-sm transition"><ChevronLeft className="w-5 h-5 text-gray-600" /></button>
          </div>
          <button className="text-sm text-orange-600 font-bold hover:underline">اليوم</button>
        </div>
        
        <div className="flex gap-3 w-full sm:w-auto">
           <div className="relative flex-1">
             <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
             <input type="text" placeholder="بحث عن حجز..." className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 pr-10 pl-4 text-sm focus:outline-none focus:border-orange-500" />
           </div>
           <button className="bg-orange-600 text-white px-4 py-2 rounded-xl font-bold shadow-md flex items-center gap-2 hover:bg-orange-700 transition whitespace-nowrap">
             <Plus className="w-4 h-4" />
             حجز جديد
           </button>
        </div>
      </div>

      {/* Timeline Grid */}
      <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
        
        {/* Time Header */}
        <div className="flex border-b border-gray-200 bg-gray-50">
          <div className="w-32 p-4 shrink-0 border-l border-gray-200 font-bold text-gray-500 text-sm text-center">الطاولة</div>
          <div className="flex-1 flex overflow-x-auto">
            {hours.map(hour => (
              <div key={hour} className="flex-1 min-w-[100px] p-3 text-center border-l border-gray-100 text-xs font-bold text-gray-400">
                {hour > 12 ? `${hour - 12}:00 م` : `${hour}:00 م`}
              </div>
            ))}
          </div>
        </div>

        {/* Table Rows */}
        <div className="flex-1 overflow-y-auto">
          {tables.map(table => (
            <div key={table.id} className="flex border-b border-gray-100 hover:bg-gray-50/50 transition h-24">
              {/* Table Info Column */}
              <div className="w-32 p-3 shrink-0 border-l border-gray-200 flex flex-col justify-center items-center bg-white z-10">
                <h4 className="font-bold text-gray-800">{table.name}</h4>
                <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                  <Users className="w-3 h-3" />
                  <span>{table.capacity} أفراد</span>
                </div>
                <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded mt-1 text-gray-500">{table.location}</span>
              </div>

              {/* Timeline Cells */}
              <div className="flex-1 flex relative">
                {/* Grid Lines */}
                {hours.map(hour => (
                  <div key={hour} className="flex-1 min-w-[100px] border-l border-gray-50 h-full"></div>
                ))}

                {/* Reservations Bars */}
                {initialReservations.filter(r => r.tableId === table.id).map(res => {
                  // Calculate position
                  const startOffset = (res.start - 12) * 100 / hours.length;
                  const width = (res.duration) * 100 / hours.length;
                  
                  const statusStyles: Record<string, string> = {
                    confirmed: 'bg-blue-100 border-blue-300 text-blue-800',
                    pending: 'bg-yellow-100 border-yellow-300 text-yellow-800',
                    arrived: 'bg-green-100 border-green-300 text-green-800',
                  };

                  return (
                    <div 
                      key={res.id}
                      className={`absolute top-2 bottom-2 rounded-lg border px-3 py-1 flex flex-col justify-center cursor-pointer hover:brightness-95 transition shadow-sm group z-20 ${statusStyles[res.status]}`}
                      style={{ right: `${startOffset}%`, width: `${width}%` }}
                    >
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-xs truncate">{res.customer}</span>
                        <div className="opacity-0 group-hover:opacity-100 transition">
                           <MoreVertical className="w-3 h-3" />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] flex items-center gap-0.5"><Users className="w-3 h-3" /> {res.pax}</span>
                        <span className="text-[10px] flex items-center gap-0.5"><Clock className="w-3 h-3" /> {res.duration} س</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-6 text-xs text-gray-600 px-4">
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-blue-100 border border-blue-300"></div> مؤكد</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-yellow-100 border border-yellow-300"></div> انتظار</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-green-100 border border-green-300"></div> وصل</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-gray-100 border border-gray-300"></div> مغلق</div>
      </div>
    </div>
  );
};

export default RestaurantReservations;
