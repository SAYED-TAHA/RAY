
import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, MoreVertical, User, ChevronLeft, ChevronRight, Plus, MapPin, Droplets } from 'lucide-react';
import { BusinessType } from '../../config';

const clinicAppointments = [
  { id: 1, time: '09:00', patient: 'أحمد محمد', type: 'كشف جديد', status: 'confirmed', provider: 'د. سارة' },
  { id: 2, time: '10:30', patient: 'منى زكي', type: 'استشارة', status: 'waiting', provider: 'د. أحمد' },
  { id: 3, time: '11:00', patient: 'كريم محمود', type: 'متابعة', status: 'confirmed', provider: 'د. سارة' },
  { id: 4, time: '12:15', patient: 'ياسمين صبري', type: 'إجراء طبي', status: 'cancelled', provider: 'د. نورهان' },
  { id: 5, time: '02:00', patient: 'محمود عبد العزيز', type: 'كشف مستعجل', status: 'confirmed', provider: 'د. أحمد' },
];

const carWashJobs = [
    { id: 1, time: '09:00', patient: 'محمد علي', type: 'غسيل كامل', status: 'confirmed', provider: 'Van-01' },
    { id: 2, time: '10:30', patient: 'سارة أحمد', type: 'غسيل وتشميع', status: 'in_progress', provider: 'Van-02' },
    { id: 3, time: '12:00', patient: 'شركة أوبر', type: 'عقد شهري', status: 'waiting', provider: 'Van-03' },
];

const gymClasses = [
    { id: 1, time: '10:00', patient: 'كلاس زومبا', type: 'جماعي', status: 'confirmed', provider: 'كابتن سارة' },
    { id: 2, time: '11:00', patient: 'كروس فيت', type: 'جماعي', status: 'confirmed', provider: 'كابتن علي' },
    { id: 3, time: '01:00', patient: 'تدريب خاص', type: 'PT', status: 'waiting', provider: 'كابتن مازن' },
    { id: 4, time: '04:00', patient: 'يوغا', type: 'جماعي', status: 'confirmed', provider: 'كابتن نورا' },
];

const salonAppointments = [
    { id: 1, time: '10:00', patient: 'سارة أحمد', type: 'قص وسيشوار', status: 'confirmed', provider: 'م. نادين' },
    { id: 2, time: '11:30', patient: 'هبة محمود', type: 'صبغة شعر', status: 'in_progress', provider: 'م. ريهام' },
    { id: 3, time: '12:00', patient: 'منى زكي', type: 'مانيكير', status: 'waiting', provider: 'م. سها' },
    { id: 4, time: '01:00', patient: 'رانيا يوسف', type: 'مكياج كامل', status: 'confirmed', provider: 'م. دينا' },
];

const restaurantReservations = [
    { id: 1, time: '01:00', patient: 'عائلة سمير', type: '4 أفراد', status: 'confirmed', provider: 'طاولة 5' },
    { id: 2, time: '02:30', patient: 'شركة النور', type: '10 أفراد', status: 'confirmed', provider: 'VIP Room' },
    { id: 3, time: '04:00', patient: 'محمد علي', type: '2 فرد', status: 'waiting', provider: 'طاولة 2' },
];

interface CalendarViewProps {
  theme: any;
  type: BusinessType;
}

const CalendarView: React.FC<CalendarViewProps> = ({ theme, type }) => {
  const isGym = type === 'gym';
  const isSalon = type === 'salon';
  const isClinic = type === 'clinic';
  const isRestaurant = type === 'restaurant';
  const isCarWash = type === 'carwash';
  
  // Select data based on type
  let appointments = clinicAppointments;
  if (isGym) appointments = gymClasses;
  else if (isSalon) appointments = salonAppointments;
  else if (isRestaurant) appointments = restaurantReservations;
  else if (isCarWash) appointments = carWashJobs;
  else if (type === 'realestate') appointments = [];
  
  const getLabels = () => {
      if (isGym) return { btn: 'حجز كلاس', provider: 'المدرب', client: 'الكلاس/العضو' };
      if (isClinic) return { btn: 'حجز كشف', provider: 'الطبيب', client: 'المريض' };
      if (isSalon) return { btn: 'حجز موعد', provider: 'الموظفة', client: 'العميلة' };
      if (isRestaurant) return { btn: 'حجز طاولة', provider: 'الطاولة', client: 'العميل' };
      if (isCarWash) return { btn: 'حجز غسيل', provider: 'الوحدة', client: 'العميل' };
      return { btn: 'حجز موعد', provider: 'الموظف', client: 'العميل' };
  };

  const labels = getLabels();

  return (
    <div className="flex flex-col h-full space-y-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-gray-50 rounded-lg p-1">
             <button className="p-2 hover:bg-white rounded-md shadow-sm transition"><ChevronRight className="w-5 h-5 text-gray-600" /></button>
             <span className="px-4 font-bold text-gray-800">22 نوفمبر 2025</span>
             <button className="p-2 hover:bg-white rounded-md shadow-sm transition"><ChevronLeft className="w-5 h-5 text-gray-600" /></button>
          </div>
          <button className="text-sm text-gray-500 font-bold hover:text-ray-blue">اليوم</button>
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto">
           <button className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 ${theme.btn} text-white rounded-lg font-bold shadow-md`}>
             <Plus className="w-4 h-4" />
             {labels.btn}
           </button>
           <select className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm font-bold text-gray-600 outline-none">
             <option>{labels.provider} 1</option>
             <option>{labels.provider} 2</option>
             <option>{labels.provider} 3</option>
           </select>
        </div>
      </div>

      {/* Mobile List View (Visible only on small screens) */}
      <div className="md:hidden space-y-3">
          {appointments.map(appt => (
              <div key={appt.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-start gap-4">
                  <div className="flex flex-col items-center min-w-[60px]">
                      <span className="text-lg font-black text-gray-800">{appt.time.split(':')[0]}</span>
                      <span className="text-xs text-gray-500">{appt.time.includes('ص') ? 'AM' : 'PM'}</span>
                  </div>
                  <div className="w-px h-10 bg-gray-100 self-center"></div>
                  <div className="flex-1">
                      <h4 className="font-bold text-gray-900">{appt.patient}</h4>
                      <p className="text-xs text-gray-500">{appt.type} • {appt.provider}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                      appt.status === 'confirmed' ? 'bg-green-100 text-green-700' : 
                      appt.status === 'waiting' ? 'bg-yellow-100 text-yellow-700' : 
                      appt.status === 'in_progress' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                  }`}>
                      {appt.status === 'confirmed' ? 'مؤكد' : appt.status === 'waiting' ? 'انتظار' : appt.status === 'in_progress' ? 'جاري' : 'ملغي'}
                  </span>
              </div>
          ))}
      </div>

      {/* Desktop Calendar Grid */}
      <div className="hidden md:flex flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex-col">
        {/* Timeline Header */}
        <div className="grid grid-cols-8 border-b border-gray-100 bg-gray-50/50">
           <div className="p-4 border-l border-gray-100 text-center font-bold text-gray-400 text-xs">الوقت</div>
           <div className="col-span-7 p-4 font-bold text-gray-600">جدول المواعيد</div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
           {['09:00', '10:00', '11:00', '12:00', '01:00', '02:00', '03:00', '04:00'].map((time) => {
             const appt = appointments.find(a => a.time.startsWith(time.split(':')[0]));
             return (
               <div key={time} className="grid grid-cols-8 border-b border-gray-50 min-h-[100px] hover:bg-gray-50/30 transition">
                  <div className="p-4 border-l border-gray-100 text-center text-sm font-medium text-gray-400 bg-gray-50/20">
                    {time}
                  </div>
                  <div className="col-span-7 p-2 relative">
                    {/* Time Slot Line */}
                    <div className="absolute top-1/2 left-0 w-full h-px bg-gray-100 border-t border-dashed border-gray-200"></div>
                    
                    {appt && (
                      <div className={`absolute top-2 right-4 left-4 bottom-2 rounded-xl p-3 border-r-4 shadow-sm flex justify-between items-center cursor-pointer hover:shadow-md transition group
                        ${appt.status === 'confirmed' ? 'bg-green-50 border-green-500' : 
                          appt.status === 'waiting' ? 'bg-yellow-50 border-yellow-500' : 
                          appt.status === 'in_progress' ? 'bg-blue-50 border-blue-500' : 'bg-red-50 border-red-500'}`}
                      >
                         <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white
                              ${appt.status === 'confirmed' ? 'bg-green-500' : 
                                appt.status === 'waiting' ? 'bg-yellow-500' : 
                                appt.status === 'in_progress' ? 'bg-blue-500' : 'bg-red-500'}`}
                            >
                              {isRestaurant ? <MapPin className="w-5 h-5" /> : isCarWash ? <Droplets className="w-5 h-5" /> : appt.patient.charAt(0)}
                            </div>
                            <div>
                               <h4 className="font-bold text-gray-800 text-sm">{appt.patient}</h4>
                               <p className="text-xs text-gray-500 flex items-center gap-1">
                                 <Clock className="w-3 h-3" />
                                 {appt.time} • {appt.type}
                               </p>
                            </div>
                         </div>
                         
                         <div className="flex items-center gap-4">
                            <div className="text-right hidden sm:block">
                              <p className="text-xs font-bold text-gray-600">{appt.provider}</p>
                              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold
                                ${appt.status === 'confirmed' ? 'bg-green-100 text-green-700' : 
                                  appt.status === 'waiting' ? 'bg-yellow-100 text-yellow-700' : 
                                  appt.status === 'in_progress' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}
                              >
                                {appt.status === 'confirmed' ? 'مؤكد' : appt.status === 'waiting' ? 'في الانتظار' : appt.status === 'in_progress' ? 'جاري العمل' : 'ملغي'}
                              </span>
                            </div>
                            <button className="p-1 hover:bg-white/50 rounded-full opacity-0 group-hover:opacity-100 transition">
                               <MoreVertical className="w-4 h-4 text-gray-500" />
                            </button>
                         </div>
                      </div>
                    )}
                  </div>
               </div>
             );
           })}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
