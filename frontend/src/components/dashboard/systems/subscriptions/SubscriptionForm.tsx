
import React, { useState } from 'react';
import { X, User, Calendar, CreditCard, CheckCircle, Save } from 'lucide-react';

interface SubscriptionFormProps {
  onClose: () => void;
  onSave: (sub: any) => void;
  initialData?: any;
}

const SubscriptionForm: React.FC<SubscriptionFormProps> = ({ onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    phone: '',
    plan: 'شهري',
    price: '',
    startDate: new Date().toISOString().split('T')[0],
    status: 'active'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Calculate end date based on plan (simple logic)
    const start = new Date(formData.startDate);
    let end = new Date(start);
    if (formData.plan.includes('شهر')) end.setMonth(start.getMonth() + (formData.plan.includes('3') ? 3 : 1));
    else if (formData.plan.includes('سنة')) end.setFullYear(start.getFullYear() + 1);
    
    onSave({ ...formData, endDate: end.toISOString().split('T')[0] });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-indigo-50">
          <h2 className="text-lg font-bold text-indigo-900 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-indigo-600" />
            {initialData ? 'تجديد/تعديل الاشتراك' : 'اشتراك عضو جديد'}
          </h2>
          <button onClick={onClose} className="p-1.5 hover:bg-indigo-100 rounded-full transition text-indigo-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-600">اسم المشترك</label>
            <div className="relative">
              <User className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 pr-10 pl-4 text-sm focus:border-indigo-500 outline-none"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-600">رقم الهاتف</label>
            <input 
              type="tel" 
              required
              className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-4 text-sm focus:border-indigo-500 outline-none dir-ltr"
              value={formData.phone}
              onChange={e => setFormData({...formData, phone: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-600">نوع الباقة</label>
              <select 
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm focus:border-indigo-500 outline-none"
                value={formData.plan}
                onChange={e => setFormData({...formData, plan: e.target.value})}
              >
                <option value="شهري">شهري</option>
                <option value="3 شهور">3 شهور</option>
                <option value="6 شهور">6 شهور</option>
                <option value="سنة">سنة (VIP)</option>
                <option value="زيارة">زيارة واحدة</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-600">السعر المدفوع</label>
              <input 
                type="number" 
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-4 text-sm focus:border-indigo-500 outline-none"
                value={formData.price}
                onChange={e => setFormData({...formData, price: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-600">تاريخ البدء</label>
            <div className="relative">
              <Calendar className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
              <input 
                type="date" 
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 pr-10 pl-4 text-sm focus:border-indigo-500 outline-none"
                value={formData.startDate}
                onChange={e => setFormData({...formData, startDate: e.target.value})}
              />
            </div>
          </div>

          <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition flex items-center justify-center gap-2 mt-4 shadow-md">
            <Save className="w-4 h-4" />
            تفعيل الاشتراك
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubscriptionForm;
