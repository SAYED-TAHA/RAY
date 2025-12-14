
import React, { useState } from 'react';
import { X, User, MapPin, Phone, CreditCard, CheckCircle, Loader2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  total: number;
  onComplete: () => void;
}

const CheckoutModal: React.FC<Props> = ({ isOpen, onClose, total, onComplete }) => {
  const [step, setStep] = useState<'details' | 'processing' | 'success'>('details');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    setTimeout(() => {
      setStep('success');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative animate-in zoom-in-95 duration-200">
        
        {step !== 'success' && (
          <button 
            onClick={onClose}
            className="absolute top-4 left-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition z-10"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        )}

        {step === 'details' && (
          <form onSubmit={handleSubmit} className="p-6">
            <h2 className="text-2xl font-black text-gray-900 mb-1 text-center">إتمام الطلب</h2>
            <p className="text-gray-500 text-sm text-center mb-6">أدخل بيانات العميل لاستكمال الدفع</p>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">اسم العميل</label>
                <div className="relative">
                  <User className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
                  <input required type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pr-10 pl-4 text-sm focus:outline-none focus:border-pink-500" placeholder="الاسم ثلاثي" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">رقم الهاتف</label>
                <div className="relative">
                  <Phone className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
                  <input required type="tel" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pr-10 pl-4 text-sm focus:outline-none focus:border-pink-500" placeholder="01xxxxxxxxx" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">طريقة الدفع</label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex items-center gap-2 p-3 border border-pink-500 bg-pink-50 rounded-xl cursor-pointer">
                    <input type="radio" name="payment" defaultChecked className="accent-pink-600" />
                    <span className="text-sm font-bold text-pink-900">كاش</span>
                  </label>
                  <label className="flex items-center gap-2 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                    <input type="radio" name="payment" className="accent-pink-600" />
                    <span className="text-sm font-bold text-gray-700">فيزا</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-gray-600">المبلغ المطلوب</span>
                <span className="text-xl font-black text-gray-900">{total.toFixed(2)} ج.م</span>
              </div>
              <button type="submit" className="w-full bg-black text-white py-3 rounded-xl font-bold hover:bg-gray-900 transition shadow-lg flex items-center justify-center gap-2">
                <CreditCard className="w-5 h-5" />
                تأكيد الدفع
              </button>
            </div>
          </form>
        )}

        {step === 'processing' && (
          <div className="p-12 flex flex-col items-center justify-center text-center h-[400px]">
            <Loader2 className="w-16 h-16 text-pink-600 animate-spin mb-6" />
            <h3 className="text-xl font-bold text-gray-900">جاري معالجة الطلب...</h3>
            <p className="text-gray-500 text-sm mt-2">برجاء الانتظار لحظات</p>
          </div>
        )}

        {step === 'success' && (
          <div className="p-12 flex flex-col items-center justify-center text-center h-[400px]">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-300">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-black text-gray-900">تم بنجاح!</h3>
            <p className="text-gray-500 mt-2 mb-8">تم تسجيل عملية البيع وإصدار الفاتورة.</p>
            <button 
              onClick={onComplete}
              className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-black transition shadow-lg"
            >
              طلب جديد
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;
