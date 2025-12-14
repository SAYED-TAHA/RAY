
import React, { useState } from 'react';
import { MapPin, Save, ArrowRight, Home, Briefcase, Navigation } from 'lucide-react';

interface AddressFormProps {
  onSave: () => void;
  onCancel: () => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ onSave, onCancel }) => {
  const [type, setType] = useState('home');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave();
  };

  return (
    <div className="animate-in fade-in slide-in-from-right duration-300">
      <div className="flex items-center gap-3 mb-6">
         <button onClick={onCancel} className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
            <ArrowRight className="w-5 h-5" />
         </button>
         <h3 className="text-xl font-bold text-gray-800">إضافة عنوان جديد</h3>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col lg:flex-row">
         {/* Map Placeholder */}
         <div className="lg:w-1/2 bg-blue-50 relative min-h-[300px] lg:min-h-full group cursor-pointer">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                   <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg text-ray-blue mx-auto mb-3 animate-bounce">
                      <MapPin className="w-8 h-8" />
                   </div>
                   <p className="font-bold text-blue-900">تحديد الموقع على الخريطة</p>
                   <p className="text-xs text-blue-600 mt-1 opacity-0 group-hover:opacity-100 transition">اضغط للفتح</p>
                </div>
             </div>
             {/* Use current location button */}
             <button className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-xl shadow-md text-xs font-bold text-gray-700 flex items-center gap-2 hover:bg-gray-50 transition">
                <Navigation className="w-4 h-4 text-blue-600" />
                استخدام موقعي الحالي
             </button>
         </div>

         {/* Form */}
         <form onSubmit={handleSubmit} className="lg:w-1/2 p-6 space-y-4">
            <div>
               <label className="block text-xs font-bold text-gray-500 mb-2">نوع العنوان</label>
               <div className="flex gap-3">
                  <button 
                    type="button" 
                    onClick={() => setType('home')}
                    className={`flex-1 py-3 rounded-xl border-2 flex flex-col items-center justify-center gap-1 transition
                       ${type === 'home' ? 'border-ray-blue bg-blue-50 text-ray-blue' : 'border-gray-100 text-gray-500 hover:bg-gray-50'}
                    `}
                  >
                     <Home className="w-5 h-5" />
                     <span className="text-xs font-bold">المنزل</span>
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setType('work')}
                    className={`flex-1 py-3 rounded-xl border-2 flex flex-col items-center justify-center gap-1 transition
                       ${type === 'work' ? 'border-ray-blue bg-blue-50 text-ray-blue' : 'border-gray-100 text-gray-500 hover:bg-gray-50'}
                    `}
                  >
                     <Briefcase className="w-5 h-5" />
                     <span className="text-xs font-bold">العمل</span>
                  </button>
               </div>
            </div>

            <div className="space-y-1">
               <label className="text-xs font-bold text-gray-600">المنطقة / الحي</label>
               <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:border-ray-blue outline-none" placeholder="مثال: المعادي، شارع 9" />
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600">رقم المبنى</label>
                  <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:border-ray-blue outline-none" placeholder="15" />
               </div>
               <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600">رقم الطابق</label>
                  <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:border-ray-blue outline-none" placeholder="3" />
               </div>
            </div>

            <div className="space-y-1">
               <label className="text-xs font-bold text-gray-600">رقم الشقة / المكتب</label>
               <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:border-ray-blue outline-none" placeholder="5" />
            </div>

            <div className="space-y-1">
               <label className="text-xs font-bold text-gray-600">رقم الهاتف للتواصل</label>
               <input type="tel" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:border-ray-blue outline-none dir-ltr text-right" placeholder="01xxxxxxxxx" />
            </div>

            <button type="submit" className="w-full bg-ray-black text-white py-3.5 rounded-xl font-bold text-lg shadow-lg hover:bg-gray-800 transition flex items-center justify-center gap-2 mt-2">
               <Save className="w-5 h-5" />
               حفظ العنوان
            </button>
         </form>
      </div>
    </div>
  );
};

export default AddressForm;
