
import React, { useState } from 'react';
import { 
  CheckCircle, AlertTriangle, XCircle, Car, Save, Printer, 
  Camera, FileText, Gauge, Battery, Disc, Wind
} from 'lucide-react';

interface InspectionItem {
  id: string;
  label: string;
  status: 'pass' | 'warning' | 'fail' | 'none';
  note: string;
}

interface Category {
  id: string;
  title: string;
  icon: any;
  items: InspectionItem[];
}

const initialCategories: Category[] = [
  {
    id: 'engine',
    title: 'المحرك والأداء',
    icon: Gauge,
    items: [
      { id: 'oil', label: 'مستوى الزيت', status: 'pass', note: '' },
      { id: 'coolant', label: 'سائل التبريد', status: 'pass', note: '' },
      { id: 'battery', label: 'حالة البطارية', status: 'warning', note: 'تحتاج تغيير قريباً' },
      { id: 'belts', label: 'السيور', status: 'pass', note: '' },
    ]
  },
  {
    id: 'brakes',
    title: 'الفرامل والإطارات',
    icon: Disc,
    items: [
      { id: 'pads_front', label: 'تيل فرامل أمامي', status: 'fail', note: 'متآكل بالكامل' },
      { id: 'pads_rear', label: 'تيل فرامل خلفي', status: 'pass', note: '' },
      { id: 'tires', label: 'ضغط الإطارات', status: 'pass', note: '' },
      { id: 'fluid', label: 'زيت الفرامل', status: 'pass', note: '' },
    ]
  },
  {
    id: 'body',
    title: 'الهيكل الخارجي',
    icon: Car,
    items: [
      { id: 'paint', label: 'الدهان', status: 'pass', note: '' },
      { id: 'glass', label: 'الزجاج', status: 'pass', note: '' },
      { id: 'lights', label: 'المصابيح', status: 'warning', note: 'المصباح الأيسر ضعيف' },
      { id: 'bumper', label: 'الاكصدامات', status: 'pass', note: '' },
    ]
  },
  {
    id: 'interior',
    title: 'المقصورة الداخلية',
    icon: Wind,
    items: [
      { id: 'ac', label: 'التكييف', status: 'pass', note: '' },
      { id: 'seats', label: 'المقاعد', status: 'pass', note: '' },
      { id: 'electronics', label: 'الكهرباء والعدادات', status: 'pass', note: '' },
    ]
  }
];

const VehicleInspection: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [carDetails, setCarDetails] = useState({
    model: 'Kia Sportage',
    year: '2023',
    plate: 'أ ب ج 123',
    mileage: '45,000'
  });

  const handleStatusChange = (catId: string, itemId: string, status: InspectionItem['status']) => {
    setCategories(prev => prev.map(cat => {
      if (cat.id !== catId) return cat;
      return {
        ...cat,
        items: cat.items.map(item => item.id === itemId ? { ...item, status } : item)
      };
    }));
  };

  const handleNoteChange = (catId: string, itemId: string, note: string) => {
    setCategories(prev => prev.map(cat => {
      if (cat.id !== catId) return cat;
      return {
        ...cat,
        items: cat.items.map(item => item.id === itemId ? { ...item, note } : item)
      };
    }));
  };

  // Calculate Score
  const totalItems = categories.reduce((acc, cat) => acc + cat.items.length, 0);
  const passedItems = categories.reduce((acc, cat) => acc + cat.items.filter(i => i.status === 'pass').length, 0);
  const score = Math.round((passedItems / totalItems) * 100);

  return (
    <div className="flex flex-col h-full space-y-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Header */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <FileText className="w-6 h-6 text-red-600" />
            تقرير فحص السيارة
          </h2>
          <p className="text-sm text-gray-500">فحص فني شامل (Entry Inspection)</p>
        </div>
        <div className="flex gap-2">
           <div className="px-4 py-2 bg-gray-100 rounded-xl text-center">
              <span className="text-xs text-gray-500 block">نتيجة الفحص</span>
              <span className={`font-black text-lg ${score > 80 ? 'text-green-600' : score > 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                {score}%
              </span>
           </div>
           <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-50 flex items-center gap-2">
             <Save className="w-4 h-4" />
             حفظ
           </button>
           <button className="px-6 py-2 bg-red-600 text-white rounded-xl font-bold text-sm hover:bg-red-700 shadow-lg shadow-red-200 flex items-center gap-2">
             <Printer className="w-4 h-4" />
             طباعة التقرير
           </button>
        </div>
      </div>

      {/* Car Details */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-1">
               <label className="text-xs font-bold text-gray-500">موديل السيارة</label>
               <input 
                 type="text" 
                 value={carDetails.model}
                 onChange={e => setCarDetails({...carDetails, model: e.target.value})}
                 className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm font-bold text-gray-800 focus:border-red-500 outline-none"
               />
            </div>
            <div className="space-y-1">
               <label className="text-xs font-bold text-gray-500">سنة الصنع</label>
               <input 
                 type="text" 
                 value={carDetails.year}
                 onChange={e => setCarDetails({...carDetails, year: e.target.value})}
                 className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm font-bold text-gray-800 focus:border-red-500 outline-none"
               />
            </div>
            <div className="space-y-1">
               <label className="text-xs font-bold text-gray-500">رقم اللوحة</label>
               <input 
                 type="text" 
                 value={carDetails.plate}
                 onChange={e => setCarDetails({...carDetails, plate: e.target.value})}
                 className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm font-bold text-gray-800 focus:border-red-500 outline-none"
               />
            </div>
            <div className="space-y-1">
               <label className="text-xs font-bold text-gray-500">عداد الكيلومترات</label>
               <input 
                 type="text" 
                 value={carDetails.mileage}
                 onChange={e => setCarDetails({...carDetails, mileage: e.target.value})}
                 className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm font-bold text-gray-800 focus:border-red-500 outline-none"
               />
            </div>
         </div>
      </div>

      {/* Inspection Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
         {categories.map(category => (
            <div key={category.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
               <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center gap-2">
                  <category.icon className="w-5 h-5 text-red-600" />
                  <h3 className="font-bold text-gray-800">{category.title}</h3>
               </div>
               <div className="p-4 space-y-4">
                  {category.items.map(item => (
                     <div key={item.id} className="flex flex-col sm:flex-row sm:items-center gap-4 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                        <div className="w-32 font-medium text-sm text-gray-700">{item.label}</div>
                        
                        {/* Status Toggles */}
                        <div className="flex bg-gray-100 rounded-lg p-1 gap-1">
                           <button 
                             onClick={() => handleStatusChange(category.id, item.id, 'pass')}
                             className={`p-1.5 rounded flex-1 flex justify-center transition ${item.status === 'pass' ? 'bg-green-500 text-white shadow-sm' : 'text-gray-400 hover:bg-white'}`}
                             title="سليم"
                           >
                              <CheckCircle className="w-4 h-4" />
                           </button>
                           <button 
                             onClick={() => handleStatusChange(category.id, item.id, 'warning')}
                             className={`p-1.5 rounded flex-1 flex justify-center transition ${item.status === 'warning' ? 'bg-yellow-500 text-white shadow-sm' : 'text-gray-400 hover:bg-white'}`}
                             title="تنبيه"
                           >
                              <AlertTriangle className="w-4 h-4" />
                           </button>
                           <button 
                             onClick={() => handleStatusChange(category.id, item.id, 'fail')}
                             className={`p-1.5 rounded flex-1 flex justify-center transition ${item.status === 'fail' ? 'bg-red-500 text-white shadow-sm' : 'text-gray-400 hover:bg-white'}`}
                             title="معيب"
                           >
                              <XCircle className="w-4 h-4" />
                           </button>
                        </div>

                        {/* Notes */}
                        <input 
                          type="text" 
                          placeholder="ملاحظات..." 
                          className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:border-red-300 outline-none transition"
                          value={item.note}
                          onChange={(e) => handleNoteChange(category.id, item.id, e.target.value)}
                        />
                        
                        <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg">
                           <Camera className="w-4 h-4" />
                        </button>
                     </div>
                  ))}
               </div>
            </div>
         ))}
      </div>
    </div>
  );
};

export default VehicleInspection;
