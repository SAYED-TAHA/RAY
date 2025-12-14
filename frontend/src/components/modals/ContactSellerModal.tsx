
import React, { useState } from 'react';
import { X, User, Phone, MessageSquare, Send, CheckCircle } from 'lucide-react';

interface ContactSellerModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemName: string;
}

const ContactSellerModal: React.FC<ContactSellerModalProps> = ({ isOpen, onClose, itemName }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: `أنا مهتم بـ ${itemName}، أرجو التواصل لمزيد من التفاصيل.`
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-200">
        
        {isSubmitted ? (
          <div className="p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-in zoom-in duration-300">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">تم الإرسال بنجاح!</h3>
            <p className="text-gray-500 mb-8">سيقوم البائع بالتواصل معك في أقرب وقت ممكن.</p>
            <button 
              onClick={onClose} 
              className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-black w-full transition"
            >
              إغلاق
            </button>
          </div>
        ) : (
          <>
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-lg text-gray-800">تواصل مع البائع</h3>
              <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">الاسم</label>
                <div className="relative">
                  <User className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                  <input 
                    type="text" 
                    required
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pr-10 pl-4 focus:outline-none focus:border-ray-blue transition"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">رقم الهاتف</label>
                <div className="relative">
                  <Phone className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                  <input 
                    type="tel" 
                    required
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pr-10 pl-4 focus:outline-none focus:border-ray-blue transition dir-ltr text-right"
                    placeholder="01xxxxxxxxx"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">الرسالة</label>
                <div className="relative">
                  <MessageSquare className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                  <textarea 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 pr-10 pl-4 focus:outline-none focus:border-ray-blue transition h-24 resize-none text-sm"
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full bg-ray-black text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition flex items-center justify-center gap-2 shadow-lg mt-2"
              >
                <Send className="w-4 h-4 rtl:rotate-180" />
                إرسال الطلب
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ContactSellerModal;
