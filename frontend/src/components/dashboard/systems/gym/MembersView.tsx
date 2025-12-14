
import React, { useState } from 'react';
import { Users, Search, Filter, MoreVertical, UserCheck, UserX, Clock, Activity } from 'lucide-react';

interface Member {
  id: string;
  name: string;
  phone: string;
  plan: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'expired' | 'frozen';
  lastVisit: string;
  avatar: string;
  visits: number;
  joinDate: string;
  totalSpent: number;
  rating: number;
}

const initialMembers: Member[] = [
  { id: '1001', name: 'عمرو دياب', phone: '01001234567', plan: 'سنوي VIP', startDate: '2025-01-01', endDate: '2026-01-01', status: 'active', lastVisit: 'اليوم 10 ص', avatar: 'AD', visits: 45, joinDate: '2024-01-15', totalSpent: 12000, rating: 4.8 },
  { id: '1002', name: 'تامر حسني', phone: '01234567890', plan: 'شهري', startDate: '2025-11-01', endDate: '2025-11-30', status: 'active', lastVisit: 'أمس 6 م', avatar: 'TH', visits: 28, joinDate: '2024-06-20', totalSpent: 3600, rating: 4.5 },
  { id: '1003', name: 'محمد رمضان', phone: '01122334455', plan: '3 شهور', startDate: '2025-08-01', endDate: '2025-11-01', status: 'expired', lastVisit: 'منذ 3 أيام', avatar: 'MR', visits: 15, joinDate: '2024-08-10', totalSpent: 2400, rating: 4.2 },
  { id: '1004', name: 'شيرين عبد الوهاب', phone: '01555667788', plan: 'سنوي', startDate: '2025-03-01', endDate: '2026-03-01', status: 'frozen', lastVisit: 'منذ أسبوع', avatar: 'SA', visits: 52, joinDate: '2024-03-05', totalSpent: 9600, rating: 4.9 },
  { id: '1005', name: 'أحمد حلمي', phone: '01099887766', plan: 'حصص خاصة (PT)', startDate: '2025-11-15', endDate: '2025-12-15', status: 'active', lastVisit: 'اليوم 2 م', avatar: 'AH', visits: 32, joinDate: '2024-09-01', totalSpent: 8000, rating: 4.7 },
];

const MembersView: React.FC = () => {
  const [members, setMembers] = useState(initialMembers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.includes(searchTerm) || member.phone.includes(searchTerm) || member.id.includes(searchTerm);
    const matchesFilter = filter === 'all' || member.status === filter;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active': return <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 w-fit"><UserCheck className="w-3 h-3" /> نشط</span>;
      case 'expired': return <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 w-fit"><UserX className="w-3 h-3" /> منتهي</span>;
      case 'frozen': return <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 w-fit"><Clock className="w-3 h-3" /> مجمد</span>;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col h-full space-y-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Controls */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex-1 w-full md:w-auto relative">
           <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
           <input 
             type="text" 
             placeholder="بحث بالاسم، الهاتف، أو رقم العضوية..." 
             className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 pr-10 pl-4 focus:outline-none focus:border-yellow-500 transition"
             value={searchTerm}
             onChange={e => setSearchTerm(e.target.value)}
           />
        </div>
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto">
           <select 
             className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-yellow-500"
             value={filter}
             onChange={e => setFilter(e.target.value)}
           >
             <option value="all">كل الحالات</option>
             <option value="active">نشط</option>
             <option value="expired">منتهي</option>
             <option value="frozen">مجمد</option>
           </select>
           <button className="bg-yellow-500 text-black px-6 py-2 rounded-xl font-bold text-sm hover:bg-yellow-400 shadow-md whitespace-nowrap">
             + عضو جديد
           </button>
        </div>
      </div>

      {/* Members Table */}
      <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-gray-50 text-gray-500 text-xs font-bold border-b border-gray-100">
              <tr>
                <th className="p-4">العضو</th>
                <th className="p-4">الباقة</th>
                <th className="p-4">تاريخ الانتهاء</th>
                <th className="p-4">الحالة</th>
                <th className="p-4">آخر حضور</th>
                <th className="p-4 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredMembers.map(member => (
                <tr key={member.id} className="hover:bg-yellow-50/10 transition group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-600 text-sm border border-gray-200">
                        {member.avatar}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-gray-900">{member.name}</h4>
                        <p className="text-xs text-gray-500 font-mono dir-ltr text-right">{member.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm font-medium bg-gray-100 px-2 py-1 rounded text-gray-700">{member.plan}</span>
                  </td>
                  <td className="p-4">
                    <span className={`text-sm font-bold ${member.status === 'expired' ? 'text-red-500' : 'text-gray-700'}`}>
                      {member.endDate}
                    </span>
                  </td>
                  <td className="p-4">
                    {getStatusBadge(member.status)}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Activity className="w-3 h-3" />
                      {member.lastVisit}
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <button className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredMembers.length === 0 && (
          <div className="flex flex-col items-center justify-center flex-1 p-8 text-gray-400">
            <Users className="w-12 h-12 mb-2 opacity-20" />
            <p>لا توجد نتائج مطابقة</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MembersView;
