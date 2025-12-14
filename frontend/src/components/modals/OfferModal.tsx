
import React, { useState } from 'react';
import { X, Copy, Check, Clock, Tag, ShoppingBag } from 'lucide-react';

interface OfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  offer: any;
}

const OfferModal: React.FC<OfferModalProps> = ({ isOpen, onClose, offer }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !offer) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText('RAY50'); // Mock code
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl relative z-10 overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
        <div className="h-48 relative">
           <img src={offer.image} alt={offer.title} className="w-full h-full object-cover" />
           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
           <button onClick={onClose} className="absolute top-4 left-4 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full transition backdrop-blur-md">
             <X className="w-5 h-5" />
           </button>
           <div className="absolute bottom-4 right-4 text-white">
              <span className="bg-ray-gold text-ray-black px-3 py-1 rounded-full text-xs font-bold mb-2 inline-block">عرض محدود</span>
              <h3 className="text-2xl font-black">{offer.title}</h3>
           </div>
        </div>
        
        <div className="p-6 space-y-6">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                 <Clock className="w-4 h-4" />
                 <span>ينتهي في: 20 نوفمبر</span>
              </div>
              <div className="flex items-center gap-1 text-yellow-500 font-bold text-sm">
                 <Tag className="w-4 h-4 fill-current" />
                 <span>خصم حصري</span>
              </div>
           </div>

           <p className="text-gray-600 leading-relaxed">
              استمتع بخصم خاص عند الشراء من {offer.shop}. العرض ساري على جميع المنتجات لفترة محدودة. لا تفوت الفرصة!
           </p>

           <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-4 flex items-center justify-between">
              <div>
                 <p className="text-xs text-gray-500 font-bold mb-1">كود الخصم</p>
                 <p className="text-xl font-black text-ray-blue tracking-widest font-mono">RAY50</p>
              </div>
              <button 
                onClick={handleCopy}
                className={`px-4 py-2 rounded-lg font-bold text-sm transition flex items-center gap-2
                   ${copied ? 'bg-green-100 text-green-700' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100'}
                `}
              >
                 {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                 {copied ? 'تم النسخ' : 'نسخ الكود'}
              </button>
           </div>

           <button className="w-full bg-ray-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition shadow-lg flex items-center justify-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              تسوق الآن
           </button>
        </div>
      </div>
    </div>
  );
};

export default OfferModal;
