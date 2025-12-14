
import React, { useState } from 'react';
import { 
  Search, User, Plus, Calendar, FileText, Activity, 
  Heart, Thermometer, Pill, Clock, ChevronRight, Edit
} from 'lucide-react';
import PatientForm from './PatientForm';

interface Patient {
  id: string;
  name: string;
  age: number;
  phone: string;
  gender: 'male' | 'female';
  lastVisit: string;
  bloodType: string;
  conditions: string[];
  email?: string;
  joinDate: string;
  visits: number;
  totalSpent: number;
  allergies?: string[];
}

const initialPatients: Patient[] = [
  { id: 'P-1001', name: 'منى زكي', age: 34, phone: '012xxxxxxx', gender: 'female', lastVisit: '2025-11-20', bloodType: 'A+', conditions: ['حساسية', 'ضغط'], email: 'mona@email.com', joinDate: '2024-03-15', visits: 12, totalSpent: 4500, allergies: ['البنسلين'] },
  { id: 'P-1002', name: 'كريم عبد العزيز', age: 45, phone: '010xxxxxxx', gender: 'male', lastVisit: '2025-11-18', bloodType: 'O+', conditions: [], email: 'karim@email.com', joinDate: '2024-05-20', visits: 8, totalSpent: 3200 },
  { id: 'P-1003', name: 'أحمد حلمي', age: 42, phone: '011xxxxxxx', gender: 'male', lastVisit: '2025-10-05', bloodType: 'B-', conditions: ['سكر'], email: 'ahmed@email.com', joinDate: '2024-01-10', visits: 15, totalSpent: 5800, allergies: ['الأسبرين'] },
  { id: 'P-1004', name: 'ياسمين صبري', age: 29, phone: '015xxxxxxx', gender: 'female', lastVisit: '2025-11-22', bloodType: 'AB+', conditions: [], email: 'yasmin@email.com', joinDate: '2024-07-05', visits: 6, totalSpent: 2100 },
];

const PatientsDirectory: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const activePatient = patients.find(p => p.id === selectedPatientId);

  const filteredPatients = patients.filter(p => p.name.includes(searchTerm) || p.phone.includes(searchTerm));

  const handleAddPatient = (patientData: any) => {
    const newPatient = {
      id: `P-${Date.now()}`,
      ...patientData,
      lastVisit: new Date().toISOString().split('T')[0],
      conditions: patientData.notes ? [patientData.notes] : []
    };
    setPatients([newPatient, ...patients]);
    setIsFormOpen(false);
    setSelectedPatientId(newPatient.id);
  };

  return (
    <div className="h-full flex flex-col lg:flex-row gap-6 animate-in fade-in slide-in-from-bottom-2 relative">
      {/* List Column */}
      <div className={`${selectedPatientId ? 'hidden lg:flex' : 'flex'} flex-col flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden`}>
        <div className="p-4 border-b border-gray-100">
           <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                 <User className="w-6 h-6 text-teal-600" />
                 سجل المرضى
              </h2>
              <button 
                onClick={() => setIsFormOpen(true)}
                className="bg-teal-600 text-white p-2 rounded-xl hover:bg-teal-700 transition shadow-md"
              >
                 <Plus className="w-5 h-5" />
              </button>
           </div>
           <div className="relative">
              <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="بحث باسم المريض..." 
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 pr-10 pl-4 text-sm focus:outline-none focus:border-teal-500 transition"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
           {filteredPatients.map(patient => (
              <div 
                key={patient.id} 
                onClick={() => setSelectedPatientId(patient.id)}
                className={`p-4 border-b border-gray-50 cursor-pointer transition hover:bg-teal-50/50 flex items-center gap-4
                  ${selectedPatientId === patient.id ? 'bg-teal-50 border-teal-100' : ''}
                `}
              >
                 <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shrink-0 border-2 
                    ${patient.gender === 'male' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-pink-50 text-pink-600 border-pink-100'}`}>
                    {patient.name.charAt(0)}
                 </div>
                 <div className="flex-1 min-w-0">
                    <h4 className={`font-bold text-sm truncate ${selectedPatientId === patient.id ? 'text-teal-900' : 'text-gray-800'}`}>{patient.name}</h4>
                    <p className="text-xs text-gray-500 mb-1">{patient.age} سنة • {patient.phone}</p>
                    <div className="flex gap-1">
                       {patient.conditions.map(c => (
                          <span key={c} className="text-[10px] bg-red-50 text-red-600 px-1.5 rounded font-bold">{c}</span>
                       ))}
                    </div>
                 </div>
                 <ChevronRight className={`w-4 h-4 text-gray-300 transform rotate-180 ${selectedPatientId === patient.id ? 'text-teal-500' : ''}`} />
              </div>
           ))}
        </div>
      </div>

      {/* Detail Column */}
      <div className={`${selectedPatientId ? 'flex' : 'hidden lg:flex'} flex-[2] bg-white rounded-2xl border border-gray-100 shadow-sm flex-col overflow-hidden`}>
         {activePatient ? (
            <>
               {/* Patient Header */}
               <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-start">
                  <div className="flex items-center gap-5">
                     <div className={`w-20 h-20 rounded-2xl flex items-center justify-center font-black text-4xl shadow-sm border-2
                        ${activePatient.gender === 'male' ? 'bg-blue-100 text-blue-600 border-blue-200' : 'bg-pink-100 text-pink-600 border-pink-200'}`}>
                        {activePatient.name.charAt(0)}
                     </div>
                     <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-1">{activePatient.name}</h2>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                           <span className="font-bold text-gray-700">{activePatient.age} سنة</span>
                           <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                           <span className="dir-ltr">{activePatient.phone}</span>
                           <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                           <span className="bg-red-100 text-red-700 px-2 rounded font-bold text-xs">فصيلة {activePatient.bloodType || 'غير معروف'}</span>
                        </div>
                     </div>
                  </div>
                  <div className="flex gap-2">
                     <button onClick={() => setSelectedPatientId(null)} className="lg:hidden p-2 bg-white border border-gray-200 rounded-lg text-gray-600">رجوع</button>
                     <button className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-xl font-bold text-sm hover:bg-teal-700 transition shadow-sm">
                        <Plus className="w-4 h-4" /> زيارة جديدة
                     </button>
                     <button className="p-2 bg-white border border-gray-200 rounded-xl text-gray-600 hover:text-teal-600 transition">
                        <Edit className="w-5 h-5" />
                     </button>
                  </div>
               </div>

               <div className="flex-1 overflow-y-auto p-6">
                  {/* Vitals Row */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                     <div className="bg-red-50 p-4 rounded-2xl border border-red-100 text-center">
                        <Heart className="w-6 h-6 text-red-500 mx-auto mb-2" />
                        <p className="text-xs text-gray-500 font-bold mb-1">نبض القلب</p>
                        <p className="text-xl font-black text-red-900">78 <span className="text-xs font-normal text-gray-400">bpm</span></p>
                     </div>
                     <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 text-center">
                        <Activity className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                        <p className="text-xs text-gray-500 font-bold mb-1">ضغط الدم</p>
                        <p className="text-xl font-black text-blue-900">120/80</p>
                     </div>
                     <div className="bg-yellow-50 p-4 rounded-2xl border border-yellow-100 text-center">
                        <Thermometer className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                        <p className="text-xs text-gray-500 font-bold mb-1">حرارة الجسم</p>
                        <p className="text-xl font-black text-yellow-900">36.6 <span className="text-xs font-normal text-gray-400">°C</span></p>
                     </div>
                     <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-center">
                        <Clock className="w-6 h-6 text-gray-500 mx-auto mb-2" />
                        <p className="text-xs text-gray-500 font-bold mb-1">آخر زيارة</p>
                        <p className="text-lg font-bold text-gray-900">{activePatient.lastVisit}</p>
                     </div>
                  </div>

                  {/* Medical History */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                     <div className="space-y-4">
                        <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                           <FileText className="w-5 h-5 text-teal-600" />
                           سجل الزيارات
                        </h3>
                        {[1, 2].map((i) => (
                           <div key={i} className="p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition group cursor-pointer">
                              <div className="flex justify-between items-start mb-2">
                                 <h4 className="font-bold text-gray-900">كشف باطنة عام</h4>
                                 <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">20 Nov 2025</span>
                              </div>
                              <p className="text-sm text-gray-600 mb-3 line-clamp-2">المريض يشتكي من آلام في المعدة وغثيان مستمر منذ يومين...</p>
                              <div className="flex gap-2">
                                 <span className="text-[10px] bg-teal-50 text-teal-700 px-2 py-1 rounded font-bold">تشخيص: التهاب معدة</span>
                              </div>
                           </div>
                        ))}
                     </div>

                     <div className="space-y-4">
                        <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                           <Pill className="w-5 h-5 text-purple-600" />
                           الأدوية الحالية
                        </h3>
                        <div className="space-y-2">
                           {['Panadol Extra', 'Antinal'].map((med, i) => (
                              <div key={i} className="flex items-center justify-between p-3 bg-purple-50 rounded-xl border border-purple-100">
                                 <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-purple-500 shadow-sm">
                                       <Pill className="w-4 h-4" />
                                    </div>
                                    <div>
                                       <p className="font-bold text-sm text-purple-900">{med}</p>
                                       <p className="text-xs text-purple-700">قرص كل 8 ساعات</p>
                                    </div>
                                 </div>
                                 <Clock className="w-4 h-4 text-purple-400" />
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            </>
         ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-300">
               <User className="w-24 h-24 mb-4 opacity-20" />
               <p className="text-lg font-medium">اختر مريضاً لعرض الملف الطبي</p>
            </div>
         )}
      </div>

      {isFormOpen && (
        <PatientForm 
          onClose={() => setIsFormOpen(false)} 
          onSave={handleAddPatient} 
        />
      )}
    </div>
  );
};

export default PatientsDirectory;
