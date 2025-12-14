
import React from 'react';
import { Car, Calendar, Clock, CheckCircle, XCircle, User, FileText, Phone, MapPin } from 'lucide-react';

const appointments = [
  { id: 1, car: 'Kia Sportage 2025', client: 'أحمد محمد', phone: '010xxxxxxx', date: '22 Nov', time: '10:00 AM', status: 'upcoming', license: 'Valid' },
  { id: 2, car: 'Hyundai Tucson', client: 'سارة علي', phone: '012xxxxxxx', date: '22 Nov', time: '12:30 PM', status: 'upcoming', license: 'Valid' },
  { id: 3, car: 'BMW 320i', client: 'كريم حسن', phone: '011xxxxxxx', date: '22 Nov', time: '02:00 PM', status: 'completed', license: 'Valid' },
  { id: 4, car: 'Mercedes C180', client: 'منى زكي', phone: '015xxxxxxx', date: '22 Nov', time: '04:00 PM', status: 'cancelled', license: 'Expired' },
];

const TestDrivesView: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
         <div className="flex items-center gap-4">
            <div className="p-3 bg-red-50 rounded-xl">
               <Car className="w-6 h-6 text-red-600" />
            </div>
            <div>
               <h2 className="text-xl font-bold text-gray-800">جدول تجارب القيادة</h2>
               <p className="text-sm text-gray-500">22 نوفمبر 2025</p>
            </div>
         </div>
         <div className="flex gap-3">
            <div className="flex items-center bg-gray-50 rounded-lg p-1">
                <button className="px-4 py-1.5 rounded-md bg-white shadow-sm text-xs font-bold">اليوم</button>
                <button className="px-4 py-1.5 rounded-md text-gray-500 text-xs font-bold hover:bg-gray-200 transition">الأسبوع</button>
            </div>
            <button className="bg-red-600 text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-red-700 shadow-lg shadow-red-200 flex items-center gap-2">
               <Calendar className="w-4 h-4" />
               حجز جديد
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="lg:col-span-2 space-y-4">
            <h3 className="font-bold text-gray-700 px-2">المواعيد القادمة</h3>
            {appointments.filter(a => a.status === 'upcoming').map(appt => (
               <AppointmentCard key={appt.id} appt={appt} />
            ))}
            
            <h3 className="font-bold text-gray-700 px-2 mt-8">تم الانتهاء / ملغي</h3>
            <div className="opacity-75">
                {appointments.filter(a => a.status !== 'upcoming').map(appt => (
                <AppointmentCard key={appt.id} appt={appt} compact />
                ))}
            </div>
         </div>

         <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
               <h3 className="font-bold text-gray-800 mb-4">السيارات الأكثر طلباً</h3>
               <div className="space-y-4">
                  <PopularCar name="Kia Sportage" count={12} />
                  <PopularCar name="Hyundai Tucson" count={9} />
                  <PopularCar name="Toyota Corolla" count={8} />
               </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl text-white shadow-xl">
               <h3 className="font-bold text-lg mb-2">إحصائيات التحويل</h3>
               <div className="flex items-end gap-2 mb-4">
                  <span className="text-4xl font-black text-red-500">35%</span>
                  <span className="text-sm text-gray-400 mb-1">من التجارب تنتهي بشراء</span>
               </div>
               <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-red-500 h-full w-[35%]"></div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

const AppointmentCard = ({ appt, compact }: any) => (
  <div className="bg-white p-4 rounded-2xl border border-gray-100 hover:shadow-md transition flex flex-col md:flex-row items-start md:items-center gap-4">
     <div className="flex flex-col items-center justify-center min-w-[80px] bg-gray-50 rounded-xl p-2 self-stretch">
        <span className="text-red-600 font-black text-xl">{appt.time.split(' ')[0]}</span>
        <span className="text-[10px] font-bold text-gray-400">{appt.time.split(' ')[1]}</span>
     </div>
     
     <div className="flex-1">
        <h4 className="font-bold text-gray-900 text-lg">{appt.car}</h4>
        <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
           <span className="flex items-center gap-1"><User className="w-3 h-3" /> {appt.client}</span>
           <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {appt.phone}</span>
        </div>
        {!compact && (
           <div className="flex gap-2 mt-3">
              <span className={`text-[10px] px-2 py-1 rounded bg-gray-100 flex items-center gap-1 ${appt.license === 'Valid' ? 'text-green-600' : 'text-red-600'}`}>
                 <FileText className="w-3 h-3" /> الرخصة: {appt.license}
              </span>
              <span className="text-[10px] px-2 py-1 rounded bg-gray-100 flex items-center gap-1">
                 <MapPin className="w-3 h-3" /> مسار: التجمع
              </span>
           </div>
        )}
     </div>

     <div className="flex items-center gap-2 w-full md:w-auto mt-2 md:mt-0">
        {appt.status === 'upcoming' ? (
           <>
             <button className="flex-1 md:flex-none bg-green-50 text-green-600 hover:bg-green-100 px-4 py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1 transition">
                <CheckCircle className="w-4 h-4" /> بدء
             </button>
             <button className="flex-1 md:flex-none bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1 transition">
                <XCircle className="w-4 h-4" /> إلغاء
             </button>
           </>
        ) : (
           <span className={`px-3 py-1 rounded-lg text-xs font-bold ${appt.status === 'completed' ? 'bg-gray-100 text-gray-500' : 'bg-red-50 text-red-400'}`}>
              {appt.status === 'completed' ? 'مكتمل' : 'ملغي'}
           </span>
        )}
     </div>
  </div>
);

const PopularCar = ({ name, count }: any) => (
   <div className="flex items-center justify-between">
      <span className="text-sm font-bold text-gray-700">{name}</span>
      <div className="flex items-center gap-2">
         <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-red-500 rounded-full" style={{width: `${count * 8}%`}}></div>
         </div>
         <span className="text-xs font-bold text-gray-500 w-4">{count}</span>
      </div>
   </div>
);

export default TestDrivesView;
