
import React, { useState } from 'react';
import { Users, User, Phone, Star, Clock, Calendar, Briefcase, Plus, CheckCircle, ChevronLeft, ChevronRight, Save, Sparkles, RefreshCw } from 'lucide-react';
import StaffForm from './StaffForm';

const initialStaff = [
  { id: 1, name: 'أحمد محمد', role: 'مدير فرع', phone: '010xxxxxxx', status: 'active', shift: '09:00 ص - 05:00 م', rating: 4.9, image: 'A' },
  { id: 2, name: 'سارة علي', role: 'موظفة استقبال', phone: '012xxxxxxx', status: 'active', shift: '10:00 ص - 06:00 م', rating: 4.8, image: 'S' },
  { id: 3, name: 'محمود حسن', role: 'فني', phone: '011xxxxxxx', status: 'break', shift: '08:00 ص - 04:00 م', rating: 4.5, image: 'M' },
  { id: 4, name: 'خالد سعيد', role: 'عامل', phone: '015xxxxxxx', status: 'off', shift: 'إجازة', rating: 4.2, image: 'K' },
];

const weekDays = ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'];

const StaffManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'list' | 'schedule'>('list');
  const [staffList, setStaffList] = useState(initialStaff);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<any>(null);
  const [schedule, setSchedule] = useState<Record<string, string>>({}); // format: "staffId-dayIndex": "Morning"
  const [isAutoScheduling, setIsAutoScheduling] = useState(false);

  const handleAdd = () => {
    setEditingStaff(null);
    setIsFormOpen(true);
  };

  const handleEdit = (staff: any) => {
    setEditingStaff(staff);
    setIsFormOpen(true);
  };

  const handleSave = (data: any) => {
    if (editingStaff) {
      setStaffList(prev => prev.map(s => s.id === editingStaff.id ? { ...s, ...data } : s));
    } else {
      const newStaff = {
        id: Date.now(),
        image: data.name.charAt(0).toUpperCase(),
        rating: 0,
        ...data
      };
      setStaffList([...staffList, newStaff]);
    }
    setIsFormOpen(false);
  };

  const cycleShift = (staffId: number, dayIndex: number) => {
    const key = `${staffId}-${dayIndex}`;
    const current = schedule[key] || 'Morning';
    const shifts = ['Morning', 'Evening', 'Night', 'Off'];
    const nextIndex = (shifts.indexOf(current) + 1) % shifts.length;
    setSchedule(prev => ({ ...prev, [key]: shifts[nextIndex] }));
  };

  const getShiftColor = (shift: string) => {
    switch(shift) {
      case 'Morning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Evening': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Night': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'Off': return 'bg-gray-100 text-gray-400 border-gray-200';
      default: return 'bg-gray-50 border-gray-100 text-gray-400';
    }
  };

  const getShiftLabel = (shift: string) => {
    switch(shift) {
        case 'Morning': return 'صباحي';
        case 'Evening': return 'مسائي';
        case 'Night': return 'ليلي';
        case 'Off': return 'إجازة';
        default: return 'صباحي';
    }
  };

  const handleAutoSchedule = () => {
      setIsAutoScheduling(true);
      // Simulate AI scheduling
      setTimeout(() => {
          const newSchedule: Record<string, string> = {};
          staffList.forEach(staff => {
              weekDays.forEach((_, dayIdx) => {
                  // Random distribution for demo
                  const rand = Math.random();
                  let shift = 'Morning';
                  if (rand > 0.3) shift = 'Evening';
                  if (rand > 0.6) shift = 'Off';
                  if (dayIdx === 5) shift = 'Off'; // Friday off for most
                  newSchedule[`${staff.id}-${dayIdx}`] = shift;
              });
          });
          setSchedule(newSchedule);
          setIsAutoScheduling(false);
      }, 1500);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Header */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Users className="w-6 h-6 text-purple-600" />
            فريق العمل
          </h2>
          <p className="text-sm text-gray-500">إدارة الموظفين وجدولة الورديات</p>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-xl">
           <button 
             onClick={() => setActiveTab('list')}
             className={`px-4 py-2 rounded-lg text-sm font-bold transition ${activeTab === 'list' ? 'bg-white text-purple-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
           >
             قائمة الموظفين
           </button>
           <button 
             onClick={() => setActiveTab('schedule')}
             className={`px-4 py-2 rounded-lg text-sm font-bold transition ${activeTab === 'schedule' ? 'bg-white text-purple-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
           >
             جدول الورديات
           </button>
        </div>
      </div>

      {/* Stats */}
      {activeTab === 'list' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
           <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600"><Users className="w-6 h-6" /></div>
              <div><p className="text-xs text-gray-500 font-bold">إجمالي الفريق</p><h3 className="text-xl font-black text-gray-800">{staffList.length}</h3></div>
           </div>
           <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600"><CheckCircle className="w-6 h-6" /></div>
              <div><p className="text-xs text-gray-500 font-bold">حاضر الآن</p><h3 className="text-xl font-black text-gray-800">{staffList.filter(s => s.status === 'active').length}</h3></div>
           </div>
           <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center text-yellow-600"><Clock className="w-6 h-6" /></div>
              <div><p className="text-xs text-gray-500 font-bold">استراحة</p><h3 className="text-xl font-black text-gray-800">{staffList.filter(s => s.status === 'break').length}</h3></div>
           </div>
           <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600"><Calendar className="w-6 h-6" /></div>
              <div><p className="text-xs text-gray-500 font-bold">إجازة</p><h3 className="text-xl font-black text-gray-800">{staffList.filter(s => s.status === 'off').length}</h3></div>
           </div>
        </div>
      )}

      {/* Content */}
      {activeTab === 'list' ? (
        <div className="space-y-6">
           <div className="flex justify-end">
              <button 
                onClick={handleAdd}
                className="bg-purple-600 text-white px-4 py-2 rounded-xl font-bold shadow-md flex items-center gap-2 hover:bg-purple-700 transition"
              >
                 <Plus className="w-4 h-4" />
                 موظف جديد
              </button>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {staffList.map((member) => (
                 <div key={member.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition overflow-hidden group">
                    <div className="p-6 flex flex-col items-center text-center border-b border-gray-50">
                       <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-2xl font-bold text-gray-500 mb-4 border-4 border-white shadow-lg relative">
                          {member.image}
                          <div className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white 
                             ${member.status === 'active' ? 'bg-green-500' : member.status === 'break' ? 'bg-yellow-500' : 'bg-gray-400'}`}
                          ></div>
                       </div>
                       <h3 className="font-bold text-gray-900 text-lg">{member.name}</h3>
                       <p className="text-purple-600 text-sm font-medium mb-2">{member.role}</p>
                       <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg text-xs font-bold text-yellow-700">
                          <Star className="w-3 h-3 fill-current" /> {member.rating}
                       </div>
                    </div>
                    
                    <div className="p-4 bg-gray-50/50 space-y-3">
                       <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500 flex items-center gap-2"><Phone className="w-4 h-4" /> الهاتف</span>
                          <span className="font-bold text-gray-700 dir-ltr">{member.phone}</span>
                       </div>
                       <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500 flex items-center gap-2"><Clock className="w-4 h-4" /> الوردية</span>
                          <span className="font-bold text-gray-700">{member.shift}</span>
                       </div>
                    </div>

                    <div className="p-3 flex gap-2 border-t border-gray-100">
                       <button 
                         onClick={() => handleEdit(member)}
                         className="flex-1 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-600 hover:bg-purple-50 hover:text-purple-600 hover:border-purple-200 transition"
                       >
                          تعديل
                       </button>
                       <button className="flex-1 py-2 bg-purple-600 text-white rounded-lg text-sm font-bold hover:bg-purple-700 transition shadow-sm">
                          تواصل
                       </button>
                    </div>
                 </div>
              ))}
           </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col animate-in fade-in">
           {/* Scheduler Toolbar */}
           <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center bg-gray-50 gap-4">
              <div className="flex items-center gap-4">
                 <div className="flex items-center bg-white rounded-lg border border-gray-200 p-1 shadow-sm">
                    <button className="p-1 hover:bg-gray-100 rounded"><ChevronRight className="w-5 h-5 text-gray-500" /></button>
                    <span className="px-4 text-sm font-bold text-gray-800">22 - 28 نوفمبر 2025</span>
                    <button className="p-1 hover:bg-gray-100 rounded"><ChevronLeft className="w-5 h-5 text-gray-500" /></button>
                 </div>
              </div>
              <div className="flex gap-2">
                 <button 
                   onClick={handleAutoSchedule}
                   disabled={isAutoScheduling}
                   className="bg-white border border-purple-200 text-purple-600 px-4 py-2 rounded-xl font-bold text-sm hover:bg-purple-50 flex items-center gap-2 shadow-sm transition disabled:opacity-50"
                 >
                    {isAutoScheduling ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    توزيع تلقائي ذكي
                 </button>
                 <button 
                   onClick={() => alert('تم حفظ الجدول وإرسال الإشعارات للموظفين')}
                   className="bg-purple-600 text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-purple-700 flex items-center gap-2 shadow-sm transition"
                 >
                    <Save className="w-4 h-4" />
                    حفظ ونشر
                 </button>
              </div>
           </div>

           {/* Calendar Grid */}
           <div className="overflow-x-auto">
              <table className="w-full text-center border-collapse">
                 <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                       <th className="p-4 text-right w-48 border-l border-gray-200 sticky right-0 bg-gray-50 z-10 text-gray-500 font-bold text-xs uppercase tracking-wider">الموظف</th>
                       {weekDays.map((day) => (
                          <th key={day} className="p-4 min-w-[120px] text-sm font-bold text-gray-700 border-l border-gray-200 last:border-0">{day}</th>
                       ))}
                    </tr>
                 </thead>
                 <tbody>
                    {staffList.map((staff) => (
                       <tr key={staff.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition">
                          <td className="p-3 text-right border-l border-gray-100 sticky right-0 bg-white z-10">
                             <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-600 text-sm border border-gray-100">{staff.image}</div>
                                <div>
                                   <p className="font-bold text-sm text-gray-800">{staff.name}</p>
                                   <p className="text-[10px] text-gray-500">{staff.role}</p>
                                </div>
                             </div>
                          </td>
                          {weekDays.map((_, dayIdx) => {
                             const shiftKey = `${staff.id}-${dayIdx}`;
                             const shift = schedule[shiftKey] || (dayIdx === 5 ? 'Off' : 'Morning');
                             return (
                                <td key={dayIdx} className="p-2 border-l border-gray-100 last:border-0">
                                   <button 
                                     onClick={() => cycleShift(staff.id, dayIdx)}
                                     className={`w-full py-2 px-1 rounded-lg text-xs font-bold border-2 transition-all hover:brightness-95 hover:scale-105 active:scale-95 ${getShiftColor(shift)}`}
                                   >
                                      {getShiftLabel(shift)}
                                   </button>
                                </td>
                             );
                          })}
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
           
           {/* Legend */}
           <div className="p-4 border-t border-gray-100 flex flex-wrap gap-4 justify-center bg-gray-50 text-xs font-bold text-gray-500">
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-yellow-100 border border-yellow-200"></span> صباحي</div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-blue-100 border border-blue-200"></span> مسائي</div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-indigo-100 border border-indigo-200"></span> ليلي</div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-gray-100 border border-gray-200"></span> إجازة</div>
           </div>
        </div>
      )}

      {isFormOpen && (
        <StaffForm 
          onClose={() => setIsFormOpen(false)} 
          onSave={handleSave} 
          initialData={editingStaff} 
        />
      )}
    </div>
  );
};

export default StaffManager;
