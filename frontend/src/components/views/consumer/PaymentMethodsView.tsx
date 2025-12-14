
import React, { useState } from 'react';
import { CreditCard, Plus, Trash2, ShieldCheck, MoreVertical } from 'lucide-react';

const PaymentMethodsView: React.FC = () => {
  const [cards, setCards] = useState([
    { id: 1, type: 'visa', number: '**** **** **** 4242', holder: 'AHMED ALI', expiry: '12/25', color: 'from-blue-600 to-blue-800' },
    { id: 2, type: 'mastercard', number: '**** **** **** 8899', holder: 'AHMED ALI', expiry: '09/24', color: 'from-gray-700 to-gray-900' },
  ]);

  const [isAdding, setIsAdding] = useState(false);

  const handleDelete = (id: number) => {
    if (confirm('هل أنت متأكد من حذف هذه البطاقة؟')) {
      setCards(cards.filter(c => c.id !== id));
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold text-ray-black flex items-center gap-2">
          <CreditCard className="w-6 h-6 text-ray-blue" />
          طرق الدفع
        </h3>
        <button 
          onClick={() => setIsAdding(true)}
          className="text-sm font-bold text-ray-blue bg-blue-50 px-4 py-2 rounded-xl hover:bg-blue-100 transition flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          إضافة بطاقة
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card) => (
          <div key={card.id} className={`relative h-56 rounded-2xl p-6 text-white shadow-xl bg-gradient-to-br ${card.color} overflow-hidden group transition-transform hover:-translate-y-1`}>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="flex justify-between items-start">
                <div className="w-12 h-8 bg-white/20 rounded-md backdrop-blur-sm border border-white/30"></div>
                <button 
                  onClick={() => handleDelete(card.id)}
                  className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <p className="font-mono text-2xl tracking-widest shadow-sm">{card.number}</p>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[10px] text-white/70 uppercase tracking-wider mb-1">Card Holder</p>
                    <p className="font-bold tracking-wide">{card.holder}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-white/70 uppercase tracking-wider mb-1">Expires</p>
                    <p className="font-bold tracking-wide">{card.expiry}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Add Card Placeholder */}
        <button 
          onClick={() => setIsAdding(true)}
          className="h-56 rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:border-ray-blue hover:text-ray-blue hover:bg-blue-50/30 transition group"
        >
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4 group-hover:bg-white group-hover:shadow-md transition">
            <Plus className="w-8 h-8" />
          </div>
          <span className="font-bold">إضافة بطاقة جديدة</span>
        </button>
      </div>

      <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex items-start gap-3 mt-8">
        <ShieldCheck className="w-6 h-6 text-green-600 mt-0.5" />
        <div>
          <h4 className="font-bold text-gray-900 text-sm">بوابة دفع آمنة</h4>
          <p className="text-xs text-gray-500 leading-relaxed mt-1">
            يتم تشفير جميع بيانات البطاقات باستخدام معايير PCI-DSS العالمية لضمان أعلى مستويات الحماية والأمان. لا نقوم بتخزين رمز CVC.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodsView;
