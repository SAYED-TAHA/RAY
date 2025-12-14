
import React from 'react';
import { Home, Calendar, User, MessageSquare, Check, X, Phone, Map } from 'lucide-react';

const showings = [
  { id: 1, property: 'شقة 180م - اللوتس', client: 'أستاذ محمود', date: 'اليوم', time: '04:00 م', agent: 'سيف الدين', status: 'confirmed', note: 'مهتم جداً بالسعر' },
  { id: 2, property: 'فيلا مستقلة - زايد', client: 'مدام ريهام', date: 'اليوم', time: '06:00 م', agent: 'خالد علي', status: 'confirmed', note: 'معاينة ثانية' },
  { id: 3, property: 'محل تجاري - العاصمة', client: 'شركة الأمل', date: 'غداً', time: '11:00 ص', agent: 'سيف الدين', status: 'pending', note: 'يريد التفاوض' },
];

const ShowingsView: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
         <div className="flex items-center gap-4">
            <div className="p-3 bg-green-50 rounded-xl">
               <Home className="w-6 h-6 text-green-600" />
            </div>
            <div>
               <h2 className="text-xl font-bold text-gray-800">جدول المعاينات</h2>
               <p className="text-sm text-gray-500">تنظيم زيارات العملاء للمواقع</p>
            </div>
         </div>
         <button className="bg-green-700 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-green-800 shadow-lg shadow-green-200 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            حجز معاينة جديدة
         </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Showings List */}
         <div className="lg:col-span-2 space-y-4">
            {showings.map(showing => (
               <ShowingCard key={showing.id} showing={showing} />
            ))}
         </div>

         {/* Quick Stats & Agent Activity */}
         <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
               <h3 className="font-bold text-gray-800 mb-4">نشاط الوكلاء اليوم</h3>
               <div className="space-y-4">
                  <AgentRow name="سيف الدين" visits={3} done={1} />
                  <AgentRow name="خالد علي" visits={2} done={0} />
                  <AgentRow name="نورهان أحمد" visits={4} done={2} />
               </div>
            </div>

            <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
               <h3 className="font-bold text-green-900 mb-2">نصيحة اليوم 💡</h3>
               <p className="text-sm text-green-800 leading-relaxed">
                  تأكيد الموعد قبل الزيارة بساعة يزيد من نسبة إتمام الصفقات بنسبة 20%. لا تنسى الاتصال بالعميل!
               </p>
            </div>
         </div>
      </div>
    </div>
  );
};

const ShowingCard = ({ showing }: any) => (
   <div className="bg-white p-5 rounded-2xl border border-gray-100 hover:shadow-lg hover:border-green-200 transition group">
      <div className="flex justify-between items-start mb-3">
         <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 font-bold text-xs">
               <Map className="w-6 h-6" />
            </div>
            <div>
               <h4 className="font-bold text-gray-900 text-lg">{showing.property}</h4>
               <p className="text-xs text-gray-500 flex items-center gap-1">
                  <User className="w-3 h-3" /> العميل: {showing.client}
               </p>
            </div>
         </div>
         <div className="bg-green-50 text-green-700 px-3 py-1 rounded-lg font-bold text-xs border border-green-100">
            {showing.time}
         </div>
      </div>
      
      <div className="flex items-center gap-2 mb-4">
         <span className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded flex items-center gap-1">
            <User className="w-3 h-3" /> الوكيل: {showing.agent}
         </span>
         <span className="text-xs bg-yellow-50 text-yellow-700 px-2 py-1 rounded flex items-center gap-1">
            <MessageSquare className="w-3 h-3" /> {showing.note}
         </span>
      </div>

      <div className="flex gap-2 pt-3 border-t border-gray-50">
         <button className="flex-1 bg-green-600 text-white py-2 rounded-lg font-bold text-xs hover:bg-green-700 transition">تأكيد الحضور</button>
         <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg font-bold text-xs hover:bg-gray-200 transition flex items-center justify-center gap-2">
            <Phone className="w-3 h-3" /> اتصال
         </button>
         <button className="w-10 bg-red-50 text-red-500 rounded-lg flex items-center justify-center hover:bg-red-100 transition">
            <X className="w-4 h-4" />
         </button>
      </div>
   </div>
);

const AgentRow = ({ name, visits, done }: any) => (
   <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
         <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-bold text-xs">
            {name.charAt(0)}
         </div>
         <span className="text-sm font-bold text-gray-700">{name}</span>
      </div>
      <div className="text-xs font-bold text-gray-500">
         <span className="text-green-600">{done}</span> / {visits} زيارة
      </div>
   </div>
);

export default ShowingsView;
