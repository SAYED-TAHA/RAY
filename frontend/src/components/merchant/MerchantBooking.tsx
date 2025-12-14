
import React, { useState } from 'react';
import { User, ShieldCheck, Calendar, Loader2, CheckCircle, Plus, Sparkles } from 'lucide-react';

interface MerchantBookingProps {
  staffList: any[];
  servicesList: any[];
}

const MerchantBooking: React.FC<MerchantBookingProps> = ({ staffList, servicesList }) => {
  const [selectedDate, setSelectedDate] = useState<number>(0);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<any | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<number | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  
  const [isBookingProcessing, setIsBookingProcessing] = useState(false);
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);

  // Suggested Add-ons for Up-selling
  const addOns = [
    { id: 'extra_1', name: 'ماسك ترطيب عميق', price: 150 },
    { id: 'extra_2', name: 'مساج للرأس 10 دقائق', price: 100 },
    { id: 'extra_3', name: 'سيروم فيتامين', price: 200 },
  ];

  const dates = Array.from({ length: 5 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      day: d.toLocaleDateString('ar-EG', { weekday: 'short' }),
      date: d.getDate(),
      full: d
    };
  });

  const timeSlots = {
    morning: ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30'],
    evening: ['04:00', '04:30', '05:00', '05:30', '06:00', '06:30', '07:00', '07:30', '08:00']
  };

  const toggleAddon = (id: string) => {
     setSelectedAddons(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleConfirmBooking = () => {
    setIsBookingProcessing(true);
    setTimeout(() => {
      setIsBookingProcessing(false);
      setIsBookingSuccess(true);
    }, 1500);
  };

  const calculateTotal = () => {
     let total = selectedService ? selectedService.price : 0;
     selectedAddons.forEach(id => {
        const addon = addOns.find(a => a.id === id);
        if (addon) total += addon.price;
     });
     return total;
  };

  if (isBookingSuccess) {
    return (
      <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-center py-16 animate-in zoom-in-95 duration-300 my-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">تم حجز موعدك بنجاح!</h3>
        <p className="text-gray-500 mb-8">رقم الحجز #BK-{Math.floor(Math.random() * 10000)}. تم إرسال التفاصيل إلى هاتفك.</p>
        <button onClick={() => { setIsBookingSuccess(false); setSelectedTime(null); setSelectedService(null); setSelectedAddons([]); }} className="bg-gray-100 text-gray-900 px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition">
          حجز موعد آخر
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 py-4">
      {/* 1. Staff Selection */}
      <section>
        <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2"><User className="w-5 h-5 text-teal-600" /> اختر الطبيب / المختص</h3>
        <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
          {staffList.map((staff) => (
            <div 
              key={staff.id}
              onClick={() => setSelectedStaff(staff.id)}
              className={`min-w-[120px] p-3 rounded-2xl border cursor-pointer transition-all text-center
                ${selectedStaff === staff.id ? 'border-teal-500 bg-teal-50 shadow-sm' : 'border-gray-100 bg-white hover:border-gray-300'}
              `}
            >
              <img src={staff.image} className="w-16 h-16 rounded-full mx-auto mb-2 border-2 border-white shadow-sm" alt={staff.name} />
              <p className="font-bold text-sm text-gray-900">{staff.name}</p>
              <p className="text-xs text-gray-500">{staff.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Service Selection */}
      <section>
        <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-teal-600" /> اختر الخدمة</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {servicesList.map((srv) => (
            <div 
              key={srv.id} 
              onClick={() => setSelectedService(srv)}
              className={`p-4 rounded-xl border cursor-pointer transition-all flex justify-between items-center
                ${selectedService?.id === srv.id ? 'border-teal-500 bg-teal-50 ring-1 ring-teal-500' : 'border-gray-100 bg-white hover:border-gray-300'}
              `}
            >
              <div>
                <p className="font-bold text-gray-900">{srv.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">{srv.duration} • {srv.desc}</p>
              </div>
              <p className="font-bold text-teal-700">{srv.price} ج</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Date & Time */}
      <section>
        <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2"><Calendar className="w-5 h-5 text-teal-600" /> الموعد المناسب</h3>
        
        {/* Dates Strip */}
        <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
          {dates.map((d, idx) => (
            <button 
              key={idx} 
              onClick={() => setSelectedDate(idx)}
              className={`flex-1 min-w-[70px] py-3 rounded-xl border text-center transition-all
                ${selectedDate === idx ? 'bg-teal-600 text-white border-teal-600 shadow-md' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}
              `}
            >
              <span className="block text-xs opacity-80 mb-1">{d.day}</span>
              <span className="block font-black text-lg leading-none">{d.date}</span>
            </button>
          ))}
        </div>

        {/* Time Slots */}
        <div className="bg-white p-4 rounded-2xl border border-gray-100">
          <p className="text-xs font-bold text-gray-400 mb-3">صباحاً</p>
          <div className="grid grid-cols-4 gap-2 mb-4">
            {timeSlots.morning.map(t => (
              <button key={t} onClick={() => setSelectedTime(t)} className={`py-2 rounded-lg text-sm font-bold transition ${selectedTime === t ? 'bg-teal-100 text-teal-800 ring-1 ring-teal-500' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}>{t}</button>
            ))}
          </div>
          <p className="text-xs font-bold text-gray-400 mb-3">مساءً</p>
          <div className="grid grid-cols-4 gap-2">
            {timeSlots.evening.map(t => (
              <button key={t} onClick={() => setSelectedTime(t)} className={`py-2 rounded-lg text-sm font-bold transition ${selectedTime === t ? 'bg-teal-100 text-teal-800 ring-1 ring-teal-500' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}>{t}</button>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Smart Up-selling (Add-ons) */}
      {selectedService && (
         <section className="bg-purple-50 p-5 rounded-2xl border border-purple-100 animate-in fade-in">
            <h3 className="font-bold text-purple-900 mb-3 flex items-center gap-2">
               <Sparkles className="w-5 h-5 text-purple-600" /> 
               دلّع نفسك (إضافات)
            </h3>
            <div className="space-y-2">
               {addOns.map(addon => (
                  <div 
                     key={addon.id} 
                     onClick={() => toggleAddon(addon.id)}
                     className={`flex justify-between items-center p-3 bg-white rounded-xl border cursor-pointer transition
                        ${selectedAddons.includes(addon.id) ? 'border-purple-500 ring-1 ring-purple-500' : 'border-purple-100 hover:border-purple-300'}
                     `}
                  >
                     <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition ${selectedAddons.includes(addon.id) ? 'bg-purple-600 border-purple-600' : 'border-gray-300'}`}>
                           {selectedAddons.includes(addon.id) && <Plus className="w-3 h-3 text-white" />}
                        </div>
                        <span className="text-sm font-bold text-gray-700">{addon.name}</span>
                     </div>
                     <span className="text-sm font-bold text-purple-700">+{addon.price} ج</span>
                  </div>
               ))}
            </div>
         </section>
      )}

      {/* Confirm Action */}
      <div className="pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm text-gray-500">الإجمالي</p>
            <p className="text-2xl font-black text-gray-900">{calculateTotal()} <span className="text-sm font-normal text-gray-500">ج.م</span></p>
          </div>
          <div className="text-left">
            <p className="text-xs text-gray-500">الدفع عند الوصول</p>
            {selectedAddons.length > 0 && <p className="text-xs text-purple-600 font-bold">شامل {selectedAddons.length} إضافات</p>}
          </div>
        </div>
        <button 
          disabled={!selectedService || !selectedTime || !selectedStaff || isBookingProcessing} 
          onClick={handleConfirmBooking} 
          className="w-full py-4 bg-teal-600 text-white rounded-xl font-bold shadow-lg hover:bg-teal-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isBookingProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle className="w-5 h-5" />}
          {isBookingProcessing ? 'جاري الحجز...' : 'تأكيد الحجز'}
        </button>
      </div>
    </div>
  );
};

export default MerchantBooking;
