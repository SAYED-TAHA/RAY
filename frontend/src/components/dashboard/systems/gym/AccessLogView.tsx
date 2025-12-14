
import React, { useState } from 'react';
import { 
  QrCode, UserCheck, UserX, Clock, Search, 
  CheckCircle, XCircle, Activity
} from 'lucide-react';

interface AccessLog {
  id: string;
  name: string;
  memberId: string;
  plan: string;
  time: string;
  status: 'allowed' | 'denied';
  reason?: string;
  photo: string;
}

const initialLogs: AccessLog[] = [
  { id: 'LOG-001', name: 'عمرو دياب', memberId: '1001', plan: 'VIP سنوي', time: '10:05:23 ص', status: 'allowed', photo: 'AD' },
  { id: 'LOG-002', name: 'تامر حسني', memberId: '1002', plan: 'شهري', time: '10:02:15 ص', status: 'allowed', photo: 'TH' },
  { id: 'LOG-003', name: 'محمد رمضان', memberId: '1003', plan: '3 شهور', time: '09:55:00 ص', status: 'denied', reason: 'اشتراك منتهي', photo: 'MR' },
  { id: 'LOG-004', name: 'شيرين', memberId: '1004', plan: 'حصص خاصة', time: '09:45:30 ص', status: 'allowed', photo: 'SA' },
];

const AccessLogView: React.FC = () => {
  const [logs, setLogs] = useState(initialLogs);
  const [memberSearch, setMemberSearch] = useState('');

  // Simulate a check-in
  const handleManualCheckIn = () => {
    if (!memberSearch) return;
    const newLog: AccessLog = {
      id: `LOG-${Date.now()}`,
      name: memberSearch,
      memberId: '9999',
      plan: 'زائر يومي',
      time: new Date().toLocaleTimeString('ar-EG'),
      status: 'allowed',
      photo: memberSearch.charAt(0).toUpperCase()
    };
    setLogs([newLog, ...logs]);
    setMemberSearch('');
  };

  return (
    <div className="flex flex-col h-full space-y-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Header */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <QrCode className="w-6 h-6 text-yellow-500" />
            سجل الدخول (Access Control)
          </h2>
          <p className="text-sm text-gray-500">مراقبة حية لحركة دخول الأعضاء</p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
           <div className="relative flex-1 md:w-80">
              <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="بحث أو تسجيل يدوي (رقم العضوية)..." 
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 pr-10 pl-4 text-sm focus:outline-none focus:border-yellow-500"
                value={memberSearch}
                onChange={(e) => setMemberSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleManualCheckIn()}
              />
           </div>
           <button 
             onClick={handleManualCheckIn}
             className="bg-yellow-500 text-black px-4 py-2 rounded-xl font-bold shadow-md hover:bg-yellow-400 transition whitespace-nowrap"
           >
              تسجيل دخول
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Stats */}
         <div className="space-y-4">
            <div className="bg-green-50 p-6 rounded-2xl border border-green-100 text-center">
               <UserCheck className="w-10 h-10 text-green-600 mx-auto mb-2" />
               <h3 className="text-3xl font-black text-green-800">142</h3>
               <p className="text-sm font-bold text-green-600">دخول ناجح اليوم</p>
            </div>
            <div className="bg-red-50 p-6 rounded-2xl border border-red-100 text-center">
               <UserX className="w-10 h-10 text-red-600 mx-auto mb-2" />
               <h3 className="text-3xl font-black text-red-800">5</h3>
               <p className="text-sm font-bold text-red-600">محاولات مرفوضة</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
               <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-yellow-500" />
                  أوقات الذروة
               </h4>
               <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                     <span className="text-gray-600">06:00 م - 09:00 م</span>
                     <span className="font-bold text-red-500">مزدحم جداً</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                     <div className="bg-red-500 h-full w-[85%]"></div>
                  </div>
                  <div className="flex justify-between text-sm">
                     <span className="text-gray-600">09:00 ص - 12:00 م</span>
                     <span className="font-bold text-yellow-500">متوسط</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                     <div className="bg-yellow-500 h-full w-[45%]"></div>
                  </div>
               </div>
            </div>
         </div>

         {/* Live Log List */}
         <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col overflow-hidden h-[600px]">
            <div className="p-4 border-b border-gray-100 bg-gray-50">
               <h3 className="font-bold text-gray-700">السجل المباشر</h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
               {logs.map((log) => (
                  <div 
                    key={log.id} 
                    className={`flex items-center justify-between p-4 rounded-xl border-l-4 shadow-sm transition animate-in slide-in-from-right-2
                      ${log.status === 'allowed' ? 'bg-white border-l-green-500 border-gray-100' : 'bg-red-50 border-l-red-500 border-red-100'}
                    `}
                  >
                     <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg border-2
                           ${log.status === 'allowed' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'}
                        `}>
                           {log.photo}
                        </div>
                        <div>
                           <h4 className="font-bold text-gray-900 text-lg">{log.name}</h4>
                           <p className="text-sm text-gray-500 flex items-center gap-2">
                              <span className="font-mono bg-gray-100 px-1 rounded">#{log.memberId}</span>
                              • {log.plan}
                           </p>
                        </div>
                     </div>
                     
                     <div className="text-left">
                        <div className="flex items-center justify-end gap-2 mb-1">
                           <span className="text-sm font-bold font-mono text-gray-600 dir-ltr">{log.time}</span>
                           <Clock className="w-4 h-4 text-gray-400" />
                        </div>
                        {log.status === 'allowed' ? (
                           <span className="inline-flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                              <CheckCircle className="w-3 h-3" /> دخول مسموح
                           </span>
                        ) : (
                           <span className="inline-flex items-center gap-1 text-xs font-bold text-red-600 bg-white px-2 py-1 rounded-full border border-red-200">
                              <XCircle className="w-3 h-3" /> مرفوض: {log.reason}
                           </span>
                        )}
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default AccessLogView;
