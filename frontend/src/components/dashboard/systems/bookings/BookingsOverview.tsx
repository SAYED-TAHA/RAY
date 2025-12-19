
import React from 'react';
import { Calendar, Settings2, Users, MessageSquare, Zap } from 'lucide-react';

interface BookingsOverviewProps {
  setActiveTab: (tab: string) => void;
}

const BookingsOverview: React.FC<BookingsOverviewProps> = ({ setActiveTab }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-blue-600" />
          الحجوزات
        </h2>
        <button disabled className="flex items-center gap-2 text-xs font-bold text-gray-500 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100 opacity-60 cursor-not-allowed">
          <Settings2 className="w-3 h-3" />
          تخصيص
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center text-gray-600">
        لا توجد بيانات حجوزات حالياً. سيتم تفعيل لوحة الحجوزات عند توفر Backend لإدارة المواعيد والحجوزات.
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          disabled
          className="bg-white border border-gray-200 rounded-xl p-4 text-right opacity-60 cursor-not-allowed"
        >
          <div className="flex items-center gap-2 text-gray-700 font-bold">
            <Users className="w-5 h-5" />
            العملاء
          </div>
        </button>
        <button
          onClick={() => setActiveTab('messages')}
          className="bg-white border border-gray-200 rounded-xl p-4 text-right hover:border-blue-600 transition"
        >
          <div className="flex items-center gap-2 text-gray-700 font-bold">
            <MessageSquare className="w-5 h-5" />
            الرسائل
          </div>
        </button>
        <button
          onClick={() => setActiveTab('reports')}
          className="bg-white border border-gray-200 rounded-xl p-4 text-right hover:border-blue-600 transition"
        >
          <div className="flex items-center gap-2 text-gray-700 font-bold">
            <Zap className="w-5 h-5" />
            التقارير
          </div>
        </button>
      </div>
    </div>
  );
};

export default BookingsOverview;
