
import React, { useState } from 'react';
import { X, User, Phone, Clock, DollarSign, Save, Briefcase, Star } from 'lucide-react';

interface StaffFormProps {
  onClose: () => void;
  onSave: (staff: any) => void;
  initialData?: any;
}

const StaffForm: React.FC<StaffFormProps> = ({ onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    role: '',
    phone: '',
    shift: '',
    salary: '',
    status: 'active'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-purple-50">
          <h2 className="text-lg font-bold text-purple-900 flex items-center gap-2">
            <User className="w-5 h-5 text-purple-600" />
            {initialData ? 'تعديل بيانات الموظف' : 'إضافة موظف جديد'}
          </h2>
          <button onClick={onClose} className="p-1.5 hover:bg-purple-100 rounded-full transition text-purple-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-600">الاسم بالكامل</label>
            <div className="relative">
              <User className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 pr-10 pl-4 text-sm focus:border-purple-500 outline-none"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-600">الوظيفة / الدور</label>
              <div className="relative">
                <Briefcase className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 pr-10 pl-4 text-sm focus:border-purple-500 outline-none"
                  placeholder="مثال: كاشير"
                  value={formData.role}
                  onChange={e => setFormData({...formData, role: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-600">رقم الهاتف</label>
              <div className="relative">
                <Phone className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
                <input 
                  type="tel" 
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 pr-10 pl-4 text-sm focus:border-purple-500 outline-none dir-ltr"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-600">الراتب الشهري</label>
              <div className="relative">
                <DollarSign className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
                <input 
                  type="number" 
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 pr-10 pl-4 text-sm focus:border-purple-500 outline-none"
                  value={formData.salary}
                  onChange={e => setFormData({...formData, salary: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-600">الوردية</label>
              <div className="relative">
                <Clock className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 pr-10 pl-4 text-sm focus:border-purple-500 outline-none"
                  placeholder="9 ص - 5 م"
                  value={formData.shift}
                  onChange={e => setFormData({...formData, shift: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-600">حالة الموظف</label>
            <select 
              className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm focus:border-purple-500 outline-none"
              value={formData.status}
              onChange={e => setFormData({...formData, status: e.target.value})}
            >
              <option value="active">نشط</option>
              <option value="break">في استراحة</option>
              <option value="off">إجازة</option>
              <option value="inactive">غير نشط / مفصول</option>
            </select>
          </div>

          <button type="submit" className="w-full bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700 transition flex items-center justify-center gap-2 mt-4 shadow-md">
            <Save className="w-4 h-4" />
            حفظ البيانات
          </button>
        </form>
      </div>
    </div>
  );
};

export default StaffForm;
