
import React, { useState } from 'react';
import { User, Mail, Phone, Lock, Camera, Edit2, CheckCircle } from 'lucide-react';

const ProfileView: React.FC = () => {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleUpdate = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-2 relative">
      
      {/* Success Toast */}
      {showSuccess && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2 z-50">
          <CheckCircle className="w-5 h-5" />
          <span className="font-bold">تم التحديث بنجاح</span>
        </div>
      )}

      {/* Header / Cover */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
         <div className="h-32 bg-gradient-to-r from-blue-600 to-blue-900"></div>
         <div className="px-6 pb-6 relative">
            <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-12 mb-4 gap-4">
               <div className="w-24 h-24 bg-white p-1 rounded-full shadow-lg relative group cursor-pointer">
                  <img 
                    src="https://ui-avatars.com/api/?name=Ahmed+Mohamed&background=0D8ABC&color=fff&size=128" 
                    alt="Profile" 
                    className="w-full h-full rounded-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
               </div>
               <div className="text-center sm:text-right flex-1">
                  <h2 className="text-2xl font-black text-gray-900">أحمد محمد</h2>
                  <p className="text-gray-500">مدير النظام • مطعم النور للمأكولات</p>
               </div>
               <button onClick={handleUpdate} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-xl font-bold text-sm hover:bg-gray-200 flex items-center gap-2 transition">
                  <Edit2 className="w-4 h-4" />
                  تعديل
               </button>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Info */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
           <h3 className="font-bold text-lg text-gray-800 mb-6">المعلومات الشخصية</h3>
           <div className="space-y-4">
              <div className="space-y-2">
                 <label className="text-xs font-bold text-gray-500 flex items-center gap-1">
                    <User className="w-3 h-3" /> الاسم بالكامل
                 </label>
                 <input type="text" defaultValue="أحمد محمد علي" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm font-bold text-gray-700" />
              </div>
              <div className="space-y-2">
                 <label className="text-xs font-bold text-gray-500 flex items-center gap-1">
                    <Mail className="w-3 h-3" /> البريد الإلكتروني
                 </label>
                 <input type="email" defaultValue="ahmed@example.com" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm font-bold text-gray-700" />
              </div>
              <div className="space-y-2">
                 <label className="text-xs font-bold text-gray-500 flex items-center gap-1">
                    <Phone className="w-3 h-3" /> رقم الهاتف
                 </label>
                 <input type="tel" defaultValue="01012345678" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm font-bold text-gray-700" />
              </div>
           </div>
        </div>

        {/* Security */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
           <h3 className="font-bold text-lg text-gray-800 mb-6">الأمان وكلمة المرور</h3>
           <div className="space-y-4">
              <div className="space-y-2">
                 <label className="text-xs font-bold text-gray-500 flex items-center gap-1">
                    <Lock className="w-3 h-3" /> كلمة المرور الحالية
                 </label>
                 <input type="password" placeholder="••••••••" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm" />
              </div>
              <div className="space-y-2">
                 <label className="text-xs font-bold text-gray-500">كلمة المرور الجديدة</label>
                 <input type="password" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm" />
              </div>
              <div className="pt-4">
                 <button onClick={handleUpdate} className="w-full bg-gray-800 text-white py-3 rounded-xl font-bold text-sm hover:bg-black transition shadow-md">
                    تحديث كلمة المرور
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
