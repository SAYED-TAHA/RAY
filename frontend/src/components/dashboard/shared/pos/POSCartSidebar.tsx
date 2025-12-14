
import React, { useState } from 'react';
import { Trash2, ShoppingBag, Pill, Minus, Plus, Banknote, CreditCard, Printer, Receipt, Send, Mail, MessageCircle, Share2, CheckCircle } from 'lucide-react';

interface POSCartSidebarProps {
  cart: { product: any; qty: number }[];
  updateQty: (id: number, delta: number) => void;
  clearCart: () => void;
  subtotal: number;
  tax: number;
  total: number;
  isPharmacy: boolean;
  themeClasses: any;
  onCheckout: (method: string) => void;
}

const POSCartSidebar: React.FC<POSCartSidebarProps> = ({
  cart, updateQty, clearCart, subtotal, tax, total, isPharmacy, themeClasses, onCheckout
}) => {
  const [showShareOptions, setShowShareOptions] = useState(false);

  const generateBillText = () => {
    let text = `🧾 *فاتورة إلكترونية - RAY*\n`;
    text += `------------------------\n`;
    cart.forEach(item => {
      text += `${item.qty}x ${item.product.name} (${(item.product.price * item.qty).toFixed(2)})\n`;
    });
    text += `------------------------\n`;
    text += `الإجمالي: ${total.toFixed(2)} ج.م\n`;
    text += `شكراً لزيارتكم!`;
    return encodeURIComponent(text);
  };

  const sendWhatsApp = () => {
    const url = `https://wa.me/?text=${generateBillText()}`;
    window.open(url, '_blank');
    setShowShareOptions(false);
  };

  const sendEmail = () => {
    const url = `mailto:?subject=فاتورة شراء&body=${generateBillText()}`;
    window.open(url, '_blank');
    setShowShareOptions(false);
  };

  return (
    <div className="w-full lg:w-[400px] bg-white rounded-2xl shadow-xl border border-gray-100 flex flex-col h-full overflow-hidden relative">
       <div className={`p-5 ${isPharmacy ? 'bg-teal-900' : 'bg-blue-900'} text-white flex justify-between items-center relative overflow-hidden shrink-0`}>
          <div className="relative z-10">
              <h2 className="font-bold text-lg">فاتورة بيع</h2>
              <p className="text-xs opacity-80 flex items-center gap-1">
                <Receipt className="w-3 h-3" />
                #INV-{Math.floor(Date.now() / 1000)}
              </p>
          </div>
          <div className="flex items-center gap-2 relative z-10">
              <button onClick={() => setShowShareOptions(!showShareOptions)} className="p-2 hover:bg-white/20 rounded-lg transition text-white" title="مشاركة الفاتورة">
                  <Share2 className="w-5 h-5" />
              </button>
              <button onClick={clearCart} className="p-2 hover:bg-red-500/20 rounded-lg transition text-red-400 hover:text-red-300" title="إفراغ السلة">
                  <Trash2 className="w-5 h-5" />
              </button>
          </div>
       </div>

       {/* Share Overlay */}
       {showShareOptions && (
         <div className="absolute top-20 left-0 right-0 z-20 bg-white border-b border-gray-100 p-4 shadow-md animate-in slide-in-from-top-2">
            <p className="text-xs font-bold text-gray-500 mb-3 text-center">إرسال الفاتورة الإلكترونية</p>
            <div className="flex gap-3">
               <button onClick={sendWhatsApp} className="flex-1 flex flex-col items-center gap-1 p-3 bg-green-50 text-green-600 rounded-xl hover:bg-green-100 transition">
                  <MessageCircle className="w-6 h-6" />
                  <span className="text-xs font-bold">واتساب</span>
               </button>
               <button onClick={sendEmail} className="flex-1 flex flex-col items-center gap-1 p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition">
                  <Mail className="w-6 h-6" />
                  <span className="text-xs font-bold">بريد</span>
               </button>
            </div>
         </div>
       )}

       {/* Cart Items List (No Images) */}
       <div className="flex-1 overflow-y-auto p-4 bg-gray-50/50">
         {cart.length === 0 ? (
           <div className="h-full flex flex-col items-center justify-center text-gray-400">
             <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
               {isPharmacy ? <Pill className="w-10 h-10 opacity-40" /> : <ShoppingBag className="w-10 h-10 opacity-40" />}
             </div>
             <p className="font-bold">السلة فارغة</p>
             <p className="text-xs mt-1">قم بمسح الباركود أو اختيار منتج</p>
           </div>
         ) : (
           <div className="space-y-2">
               {cart.map(item => (
                 <div key={item.product.id} className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between animate-in slide-in-from-right-2">
                   <div className="flex-1">
                      <h4 className="font-bold text-sm text-gray-800 line-clamp-1">{item.product.name}</h4>
                      <div className="text-xs text-gray-500 mt-0.5 font-mono">
                          {item.product.price} ج × {item.qty}
                      </div>
                   </div>
                   <div className="flex items-center gap-3">
                      <span className={`font-bold ${themeClasses.text} text-sm`}>{(item.product.price * item.qty).toFixed(0)} ج</span>
                      <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-0.5">
                          <button onClick={() => updateQty(item.product.id, -1)} className="w-8 h-8 flex items-center justify-center hover:bg-white hover:text-red-500 rounded-lg transition active:scale-90 shadow-sm bg-white/50"><Minus className="w-4 h-4" /></button>
                          <span className="w-8 text-center text-sm font-bold">{item.qty}</span>
                          <button onClick={() => updateQty(item.product.id, 1)} className="w-8 h-8 flex items-center justify-center hover:bg-white hover:text-green-500 rounded-lg transition active:scale-90 shadow-sm bg-white/50"><Plus className="w-4 h-4" /></button>
                      </div>
                   </div>
                 </div>
               ))}
           </div>
         )}
       </div>

       {/* Totals Section */}
       <div className="p-5 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-10 shrink-0 pb-safe">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm text-gray-600 font-medium">
              <span>المجموع الفرعي</span>
              <span>{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600 font-medium">
              <span>الضريبة (14%)</span>
              <span>{tax.toFixed(2)}</span>
            </div>
            <div className="my-2 border-t border-dashed border-gray-300"></div>
            <div className="flex justify-between items-end">
              <span className="text-lg font-black text-gray-800">الإجمالي</span>
              <span className={`text-2xl font-black ${isPharmacy ? 'text-teal-900' : 'text-blue-900'}`}>{total.toFixed(2)} <span className="text-sm text-gray-400 font-normal">ج.م</span></span>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2 mt-4">
            <button 
              onClick={() => onCheckout('cash')}
              disabled={cart.length === 0}
              className="flex flex-col items-center justify-center gap-1 py-3 bg-green-600 text-white rounded-xl font-bold text-sm hover:bg-green-700 transition shadow-lg shadow-green-100 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Banknote className="w-5 h-5" />
              كاش
            </button>
            <button 
              onClick={() => onCheckout('card')}
              disabled={cart.length === 0}
              className={`flex flex-col items-center justify-center gap-1 py-3 text-white rounded-xl font-bold text-sm ${themeClasses.btn} transition shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <CreditCard className="w-5 h-5" />
              فيزا
            </button>
            <button 
              onClick={() => window.print()}
              disabled={cart.length === 0}
              className="flex flex-col items-center justify-center gap-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-200 transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              title="طباعة إيصال"
            >
              <Printer className="w-5 h-5" />
              طباعة
            </button>
          </div>
       </div>
    </div>
  );
};

export default POSCartSidebar;
