
import React, { useState } from 'react';
import { User, Phone, Calendar, Droplets, Save, X, FileText } from 'lucide-react';

interface PatientFormProps {
  onClose: () => void;
  onSave: (patient: any) => void;
}

const PatientForm: React.FC<PatientFormProps> = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    phone: '',
    gender: 'male',
    bloodType: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-teal-50">
          <h2 className="text-lg font-bold text-teal-900 flex items-center gap-2">
            <User className="w-5 h-5 text-teal-600" />
            تسجيل مريض جديد
          </h2>
          <button onClick={onClose} className="p-1.5 hover:bg-teal-100 rounded-full transition text-teal-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-600">الاسم بالكامل</label>
            <input 
              type="text" 
              required
              className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm focus:border-teal-500 outline-none"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-600">السن</label>
              <input 
                type="number" 
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm focus:border-teal-500 outline-none"
                value={formData.age}
                onChange={e => setFormData({...formData, age: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-600">رقم الهاتف</label>
              <input 
                type="tel" 
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm focus:border-teal-500 outline-none dir-ltr"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-600">النوع</label>
              <div className="flex bg-gray-50 p-1 rounded-lg border border-gray-200">
                <button
                  type="button"
                  onClick={() => setFormData({...formData, gender: 'male'})}
                  className={`flex-1 py-1.5 text-xs font-bold rounded transition ${formData.gender === 'male' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}
                >
                  ذكر
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({...formData, gender: 'female'})}
                  className={`flex-1 py-1.5 text-xs font-bold rounded transition ${formData.gender === 'female' ? 'bg-white text-pink-600 shadow-sm' : 'text-gray-500'}`}
                >
                  أنثى
                </button>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-600">فصيلة الدم (اختياري)</label>
              <select 
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm focus:border-teal-500 outline-none"
                value={formData.bloodType}
                onChange={e => setFormData({...formData, bloodType: e.target.value})}
              >
                <option value="">غير معروف</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-600">ملاحظات طبية / أمراض مزمنة</label>
            <textarea 
              className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm focus:border-teal-500 outline-none h-24 resize-none"
              placeholder="سكر، ضغط، حساسية..."
              value={formData.notes}
              onChange={e => setFormData({...formData, notes: e.target.value})}
            ></textarea>
          </div>

          <button type="submit" className="w-full bg-teal-600 text-white py-3 rounded-xl font-bold hover:bg-teal-700 transition flex items-center justify-center gap-2 mt-4 shadow-md">
            <Save className="w-4 h-4" />
            حفظ الملف
          </button>
        </form>
      </div>
    </div>
  );
};

export default PatientForm;
