
import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Scissors, Clock, Plus, Search, User, Star, Sparkles } from 'lucide-react';

const staff = [
  { id: 'S1', name: 'م. نادين', role: 'شعر', rating: 4.9, image: 'N' },
  { id: 'S2', name: 'م. ريهام', role: 'صبغة', rating: 4.8, image: 'R' },
  { id: 'S3', name: 'م. سها', role: 'أظافر', rating: 4.7, image: 'S' },
  { id: 'S4', name: 'م. دينا', role: 'مكياج', rating: 5.0, image: 'D' },
];

const hours = ['10:00', '11:00', '12:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00'];

const initialAppointments = [
  { id: 1, staffId: 'S1', timeIndex: 0, duration: 1, client: 'سارة أحمد', service: 'قص وسيشوار', price: '250 ج', status: 'confirmed' },
  { id: 2, staffId: 'S2', timeIndex: 1, duration: 2, client: 'هبة محمود', service: 'صبغة وهايلايت', price: '1200 ج', status: 'in_progress' },
  { id: 3, staffId: 'S3', timeIndex: 2, duration: 1, client: 'منى زكي', service: 'مانيكير وباديكير', price: '300 ج', status: 'waiting' },
  { id: 4, staffId: 'S4', timeIndex: 4, duration: 2, client: 'رانيا يوسف', service: 'مكياج سواريه', price: '800 ج', status: 'confirmed' },
];

const SalonAppointments: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('22 نوفمبر 2025');

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-pink-50 rounded-lg p-1">
             <button className="p-2 hover:bg-white rounded-md shadow-sm transition text-pink-700"><ChevronRight className="w-5 h-5" /></button>
             <span className="px-4 font-bold text-gray-800 min-w-[140px] text-center">{selectedDate}</span>
             <button className="p-2 hover:bg-white rounded-md shadow-sm transition text-pink-700"><ChevronLeft className="w-5 h-5" /></button>
          </div>
          <button className="text-sm text-pink-600 font-bold hover:underline">اليوم</button>
        </div>
        
        <div className="flex gap-3 w-full sm:w-auto">
           <button className="bg-pink-600 text-white px-6 py-2 rounded-xl font-bold shadow-md flex items-center gap-2 hover:bg-pink-700 transition whitespace-nowrap">
             <Plus className="w-4 h-4" />
             حجز موعد
           </button>
        </div>
      </div>

      {/* Schedule Grid */}
      <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
        
        {/* Header Row (Time) */}
        <div className="flex border-b border-gray-100 bg-pink-50/30">
          <div className="w-48 p-4 shrink-0 border-l border-gray-100 font-bold text-gray-500 text-sm">الموظفة</div>
          <div className="flex-1 flex overflow-x-auto">
            {hours.map(hour => (
              <div key={hour} className="flex-1 min-w-[120px] p-3 text-center border-l border-gray-100 text-xs font-bold text-gray-500">
                {hour}
              </div>
            ))}
          </div>
        </div>

        {/* Staff Rows */}
        <div className="flex-1 overflow-y-auto">
          {staff.map(member => (
            <div key={member.id} className="flex border-b border-gray-50 hover:bg-pink-50/10 transition h-28">
              {/* Staff Info */}
              <div className="w-48 p-4 shrink-0 border-l border-gray-100 flex items-center gap-3 bg-white z-10">
                <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold border-2 border-white shadow-sm">
                  {member.image}
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">{member.name}</h4>
                  <p className="text-xs text-gray-500 mb-1">{member.role}</p>
                  <div className="flex items-center gap-0.5 text-[10px] text-yellow-600 bg-yellow-50 px-1.5 rounded w-fit">
                    <Star className="w-3 h-3 fill-current" /> {member.rating}
                  </div>
                </div>
              </div>

              {/* Time Slots */}
              <div className="flex-1 flex relative bg-white">
                {/* Grid Lines */}
                {hours.map((_, idx) => (
                  <div key={idx} className="flex-1 min-w-[120px] border-l border-gray-50 h-full relative group">
                     <button className="absolute inset-0 m-1 rounded-lg border border-dashed border-gray-200 opacity-0 group-hover:opacity-100 flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:border-pink-200 hover:text-pink-500 transition">
                        <Plus className="w-4 h-4" />
                     </button>
                  </div>
                ))}

                {/* Appointments */}
                {initialAppointments.filter(a => a.staffId === member.id).map(appt => {
                  const startLeft = (appt.timeIndex * 100) / hours.length;
                  const width = (appt.duration * 100) / hours.length;
                  
                  const statusColor = appt.status === 'confirmed' ? 'bg-purple-100 border-purple-200 text-purple-800' :
                                      appt.status === 'in_progress' ? 'bg-pink-100 border-pink-200 text-pink-800' :
                                      'bg-yellow-100 border-yellow-200 text-yellow-800';

                  return (
                    <div 
                      key={appt.id}
                      className={`absolute top-2 bottom-2 rounded-xl border shadow-sm px-3 py-2 cursor-pointer hover:shadow-md transition z-20 flex flex-col justify-center ${statusColor}`}
                      style={{ right: `${startLeft}%`, width: `calc(${width}% - 8px)`, marginRight: '4px' }}
                    >
                       <div className="flex justify-between items-start mb-1">
                          <span className="font-bold text-xs truncate flex items-center gap-1"><User className="w-3 h-3" /> {appt.client}</span>
                          <span className="text-[10px] font-black opacity-60">{appt.price}</span>
                       </div>
                       <div className="flex items-center gap-1 text-[10px] opacity-80 truncate">
                          <Scissors className="w-3 h-3" />
                          {appt.service}
                       </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalonAppointments;
