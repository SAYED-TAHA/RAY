
import React, { useState } from 'react';
import { 
  FileText, Plus, Trash2, Printer, Save, User, Calendar, 
  Stethoscope, Activity, Pill
} from 'lucide-react';

interface Medicine {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  notes?: string;
}

const PrescriptionManager: React.FC = () => {
  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [medicines, setMedicines] = useState<Medicine[]>([
    { id: 1, name: '', dosage: '', frequency: '', duration: '', notes: '' }
  ]);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const addMedicine = () => {
    setMedicines([...medicines, { id: Date.now(), name: '', dosage: '', frequency: '', duration: '', notes: '' }]);
  };

  const removeMedicine = (id: number) => {
    if (medicines.length > 1) {
      setMedicines(medicines.filter(m => m.id !== id));
    }
  };

  const updateMedicine = (id: number, field: keyof Medicine, value: string) => {
    setMedicines(medicines.map(m => 
      m.id === id ? { ...m, [field]: value } : m
    ));
  };

  if (isPreviewMode) {
    return (
      <div className="max-w-4xl mx-auto bg-white p-12 shadow-2xl rounded-sm animate-in zoom-in-95 duration-300 min-h-[800px] relative print:shadow-none print:w-full print:m-0">
        {/* Print Controls */}
        <div className="absolute top-0 -right-16 flex flex-col gap-2 print:hidden">
           <button onClick={() => window.print()} className="bg-teal-600 text-white p-3 rounded-full shadow-lg hover:bg-teal-700 tooltip" title="طباعة">
             <Printer className="w-6 h-6" />
           </button>
           <button onClick={() => setIsPreviewMode(false)} className="bg-gray-600 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 tooltip" title="تعديل">
             <FileText className="w-6 h-6" />
           </button>
        </div>

        {/* Header */}
        <div className="flex justify-between items-end border-b-4 border-teal-600 pb-6 mb-8">
           <div className="text-right">
              <h1 className="text-3xl font-black text-teal-800 mb-2">عيادات الشفاء التخصصية</h1>
              <p className="text-gray-600 font-bold">د. أحمد محمد</p>
              <p className="text-gray-500 text-sm">استشاري الأمراض الباطنة والقلب</p>
           </div>
           <div className="text-left text-sm text-gray-500">
              <p>123 شارع الثورة، مصر الجديدة</p>
              <p>هاتف: 010xxxxxxx</p>
              <p>www.elshifa-clinic.com</p>
           </div>
        </div>

        {/* Patient Info */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-100 flex justify-between items-center">
           <div className="flex gap-8">
              <div>
                 <span className="text-xs text-gray-500 font-bold block mb-1">اسم المريض</span>
                 <span className="font-bold text-lg text-gray-800">{patientName}</span>
              </div>
              <div>
                 <span className="text-xs text-gray-500 font-bold block mb-1">السن</span>
                 <span className="font-bold text-lg text-gray-800">{age} سنة</span>
              </div>
           </div>
           <div className="text-left">
              <span className="text-xs text-gray-500 font-bold block mb-1">التاريخ</span>
              <span className="font-bold text-gray-800">{date}</span>
           </div>
        </div>

        {/* Diagnosis (Optional) */}
        {diagnosis && (
          <div className="mb-8">
             <h3 className="text-sm font-bold text-gray-400 uppercase mb-2">التشخيص</h3>
             <p className="text-gray-800 font-medium italic">{diagnosis}</p>
          </div>
        )}

        {/* Rx Symbol */}
        <div className="mb-6">
           <span className="text-4xl font-serif font-black text-teal-600">Rx</span>
        </div>

        {/* Medicines */}
        <div className="space-y-6 mb-12">
           {medicines.map((med, idx) => (
              <div key={med.id} className="border-b border-dashed border-gray-200 pb-4 last:border-0">
                 <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-bold text-gray-400 text-sm">{idx + 1}.</span>
                    <h4 className="text-xl font-bold text-gray-900">{med.name}</h4>
                    <span className="text-sm text-gray-600 bg-gray-100 px-2 py-0.5 rounded">{med.dosage}</span>
                 </div>
                 <p className="text-gray-600 mr-6">
                    {med.frequency} — لمدة {med.duration}
                 </p>
                 {med.notes && <p className="text-sm text-gray-500 mr-6 mt-1 italic">({med.notes})</p>}
              </div>
           ))}
        </div>

        {/* Footer */}
        <div className="mt-auto pt-12 border-t border-gray-200 flex justify-between items-center">
           <div className="text-sm text-gray-400">
              <p>تم الكشف بواسطة نظام RAY الطبي</p>
           </div>
           <div className="text-center">
              <div className="h-16 w-32 mb-2 mx-auto">
                 {/* Signature Placeholder */}
                 <div className="font-dancing text-2xl text-teal-800 opacity-50 transform -rotate-6 mt-4">Dr. Ahmed</div>
              </div>
              <div className="border-t border-gray-300 w-40 mx-auto pt-2">
                 <p className="text-sm font-bold text-gray-600">توقيع الطبيب</p>
              </div>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full space-y-6 animate-in fade-in slide-in-from-bottom-2">
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Stethoscope className="w-6 h-6 text-teal-600" />
            روشتة إلكترونية
          </h2>
          <p className="text-sm text-gray-500">كتابة وصفة طبية جديدة</p>
        </div>
        <div className="flex gap-2">
           <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-50 flex items-center gap-2">
             <Save className="w-4 h-4" />
             حفظ في الملف
           </button>
           <button 
             onClick={() => setIsPreviewMode(true)}
             className="px-6 py-2 bg-teal-600 text-white rounded-xl font-bold text-sm hover:bg-teal-700 shadow-lg shadow-teal-200 flex items-center gap-2"
           >
             <Printer className="w-4 h-4" />
             طباعة
           </button>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 overflow-y-auto">
         {/* Patient Info Form */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className="space-y-1">
               <label className="text-xs font-bold text-gray-500">اسم المريض</label>
               <div className="relative">
                  <User className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
                  <input 
                    type="text" 
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-lg py-2 pr-10 pl-4 text-sm focus:border-teal-500 outline-none"
                    placeholder="اسم المريض ثلاثي"
                  />
               </div>
            </div>
            <div className="space-y-1">
               <label className="text-xs font-bold text-gray-500">السن</label>
               <input 
                 type="number" 
                 value={age}
                 onChange={(e) => setAge(e.target.value)}
                 className="w-full bg-white border border-gray-200 rounded-lg py-2 px-4 text-sm focus:border-teal-500 outline-none"
                 placeholder="العمر"
               />
            </div>
            <div className="space-y-1">
               <label className="text-xs font-bold text-gray-500">التاريخ</label>
               <div className="relative">
                  <Calendar className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
                  <input 
                    type="date" 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-lg py-2 pr-10 pl-4 text-sm focus:border-teal-500 outline-none"
                  />
               </div>
            </div>
            <div className="col-span-1 md:col-span-3 space-y-1">
               <label className="text-xs font-bold text-gray-500">التشخيص المبدئي</label>
               <div className="relative">
                  <Activity className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
                  <input 
                    type="text" 
                    value={diagnosis}
                    onChange={(e) => setDiagnosis(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-lg py-2 pr-10 pl-4 text-sm focus:border-teal-500 outline-none"
                    placeholder="التشخيص (اختياري)"
                  />
               </div>
            </div>
         </div>

         {/* Medicines Editor */}
         <div>
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
               <Pill className="w-5 h-5 text-teal-600" />
               الأدوية والعلاج
            </h3>
            
            <div className="space-y-3">
               {medicines.map((med, idx) => (
                  <div key={med.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-teal-200 transition relative group">
                     <button 
                       onClick={() => removeMedicine(med.id)}
                       className="absolute top-4 left-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"
                     >
                        <Trash2 className="w-4 h-4" />
                     </button>
                     
                     <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                        <div className="md:col-span-4 space-y-1">
                           <label className="text-[10px] font-bold text-gray-400">اسم الدواء</label>
                           <input 
                             type="text" 
                             placeholder="مثال: Panadol Extra" 
                             className="w-full bg-white border border-gray-200 rounded-lg p-2 text-sm font-bold text-gray-800 focus:border-teal-500 outline-none"
                             value={med.name}
                             onChange={(e) => updateMedicine(med.id, 'name', e.target.value)}
                           />
                        </div>
                        <div className="md:col-span-2 space-y-1">
                           <label className="text-[10px] font-bold text-gray-400">التركيز/الشكل</label>
                           <input 
                             type="text" 
                             placeholder="500mg Tablet" 
                             className="w-full bg-white border border-gray-200 rounded-lg p-2 text-sm focus:border-teal-500 outline-none"
                             value={med.dosage}
                             onChange={(e) => updateMedicine(med.id, 'dosage', e.target.value)}
                           />
                        </div>
                        <div className="md:col-span-3 space-y-1">
                           <label className="text-[10px] font-bold text-gray-400">الجرعة</label>
                           <input 
                             type="text" 
                             placeholder="قرص كل 8 ساعات" 
                             className="w-full bg-white border border-gray-200 rounded-lg p-2 text-sm focus:border-teal-500 outline-none"
                             value={med.frequency}
                             onChange={(e) => updateMedicine(med.id, 'frequency', e.target.value)}
                           />
                        </div>
                        <div className="md:col-span-3 space-y-1">
                           <label className="text-[10px] font-bold text-gray-400">المدة</label>
                           <input 
                             type="text" 
                             placeholder="لمدة 5 أيام" 
                             className="w-full bg-white border border-gray-200 rounded-lg p-2 text-sm focus:border-teal-500 outline-none"
                             value={med.duration}
                             onChange={(e) => updateMedicine(med.id, 'duration', e.target.value)}
                           />
                        </div>
                        <div className="md:col-span-12 space-y-1">
                           <input 
                             type="text" 
                             placeholder="ملاحظات إضافية (مثال: بعد الأكل)" 
                             className="w-full bg-transparent border-b border-gray-200 py-1 text-xs text-gray-600 focus:border-teal-500 outline-none"
                             value={med.notes}
                             onChange={(e) => updateMedicine(med.id, 'notes', e.target.value)}
                           />
                        </div>
                     </div>
                  </div>
               ))}
            </div>

            <button 
              onClick={addMedicine}
              className="mt-4 w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 font-bold text-sm hover:border-teal-500 hover:text-teal-600 hover:bg-teal-50 transition flex items-center justify-center gap-2"
            >
               <Plus className="w-4 h-4" />
               إضافة دواء آخر
            </button>
         </div>
      </div>
    </div>
  );
};

export default PrescriptionManager;
