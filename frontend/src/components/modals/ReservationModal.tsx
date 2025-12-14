
import React, { useState } from 'react';
import { X, CalendarClock, DollarSign, CheckCircle, AlertCircle } from 'lucide-react';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: any;
  onConfirm: (deposit: number, date: string) => void;
}

const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose, product, onConfirm }) => {
  const [step, setStep] = useState(1);
  const [depositAmount] = useState(Math.round(product.price * 0.10)); // 10% deposit
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dateString = tomorrow.toLocaleDateString('ar-EG', { weekday: 'long', day: 'numeric', month: 'long' });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl relative z-10 overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
        
        <button onClick={onClose} className="absolute top-4 left-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition">
            <X className="w-5 h-5 text-gray-500" />
        </button>

        <div className="p-8 text-center">
           {step === 1 ? (
               <>
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                      <CalendarClock className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-2">حجز المنتج</h3>
                  <p className="text-gray-500 mb-6 text-sm">
                      يمكنك حجز هذا المنتج لمدة 24 ساعة فقط. سيتم خصم مبلغ العربون من السعر الكلي.
                  </p>

                  <div className="bg-purple-50 rounded-2xl p-4 border border-purple-100 mb-6">
                      <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600 font-bold">سعر المنتج</span>
                          <span className="font-bold">{product.price} ج.م</span>
                      </div>
                      <div className="flex justify-between items-center border-t border-purple-200 pt-2">
                          <span className="text-sm text-purple-800 font-bold">مبلغ العربون (10%)</span>
                          <span className="font-black text-xl text-purple-700">{depositAmount} ج.م</span>
                      </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-6 bg-gray-50 p-2 rounded-lg justify-center">
                      <AlertCircle className="w-4 h-4 text-orange-500" />
                      <span>العربون غير مسترد في حالة عدم الشراء خلال 24 ساعة.</span>
                  </div>

                  <button 
                    onClick={() => setStep(2)}
                    className="w-full bg-purple-600 text-white py-3.5 rounded-xl font-bold hover:bg-purple-700 transition shadow-lg flex items-center justify-center gap-2"
                  >
                      متابعة للدفع
                  </button>
               </>
           ) : (
               <>
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-in zoom-in">
                      <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-2">تم تأكيد الحجز!</h3>
                  <p className="text-gray-500 mb-6 text-sm">
                      المنتج محجوز باسمك حتى <strong>{dateString}</strong>.
                  </p>

                  <div className="bg-gray-50 rounded-xl p-4 mb-6 text-right space-y-2 border border-gray-200">
                      <div className="flex justify-between">
                          <span className="text-gray-500 text-xs">رقم الحجز</span>
                          <span className="font-mono font-bold">#RES-{Math.floor(Math.random() * 10000)}</span>
                      </div>
                      <div className="flex justify-between">
                          <span className="text-gray-500 text-xs">المبلغ المدفوع</span>
                          <span className="font-bold text-green-600">{depositAmount} ج.م</span>
                      </div>
                      <div className="flex justify-between">
                          <span className="text-gray-500 text-xs">المتبقي</span>
                          <span className="font-bold">{product.price - depositAmount} ج.م</span>
                      </div>
                  </div>

                  <button 
                    onClick={() => onConfirm(depositAmount, dateString)}
                    className="w-full bg-gray-900 text-white py-3.5 rounded-xl font-bold hover:bg-black transition shadow-lg"
                  >
                      تم
                  </button>
               </>
           )}
        </div>
      </div>
    </div>
  );
};

export default ReservationModal;
