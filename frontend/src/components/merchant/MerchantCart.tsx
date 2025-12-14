
import React from 'react';
import { ShoppingBag, X, Plus, Minus, Loader2, CheckCircle, CreditCard, Banknote } from 'lucide-react';

interface MerchantCartProps {
  isOpen: boolean;
  onClose: () => void;
  cart: any[];
  updateCartQty: (id: number, delta: number) => void;
  isOrderProcessing: boolean;
  isOrderSuccess: boolean;
  onCheckout: () => void;
  onCloseSuccess: () => void;
}

const MerchantCart: React.FC<MerchantCartProps> = ({
  isOpen, onClose, cart, updateCartQty, isOrderProcessing, isOrderSuccess, onCheckout, onCloseSuccess
}) => {
  if (!isOpen) return null;

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center pointer-events-none">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto transition-opacity" onClick={() => !isOrderProcessing && !isOrderSuccess && onClose()}></div>
      <div className="bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-3xl shadow-2xl pointer-events-auto max-h-[85vh] flex flex-col animate-in slide-in-from-bottom-10 duration-300 relative">
        
        {isOrderSuccess ? (
           <div className="p-12 text-center flex flex-col items-center justify-center h-full min-h-[400px]">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-2">تم الطلب بنجاح!</h3>
              <p className="text-gray-500 mb-8 max-w-xs mx-auto">سيصلك الطلب خلال 45 دقيقة. شكراً لثقتك في راي.</p>
              <button onClick={onCloseSuccess} className="bg-gray-900 text-white px-12 py-4 rounded-xl font-bold hover:bg-black w-full transition">إغلاق</button>
           </div>
        ) : (
          <>
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-3xl sm:rounded-t-2xl">
              <h3 className="font-bold text-lg flex items-center gap-2"><ShoppingBag className="w-5 h-5" /> سلة المشتريات</h3>
              <button onClick={onClose} className="p-2 bg-white rounded-full hover:bg-gray-200 transition shadow-sm"><X className="w-5 h-5" /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gray-50/30">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4 p-3 bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                    <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <p className="font-bold text-gray-900 text-sm line-clamp-1">{item.name}</p>
                      <p className="text-xs text-gray-500 font-medium mt-0.5">{item.price} ج.م</p>
                    </div>
                    <div className="flex justify-between items-end">
                      <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1 border border-gray-200">
                        <button onClick={() => updateCartQty(item.id, -1)} className="w-6 h-6 flex items-center justify-center hover:bg-white rounded transition hover:shadow-sm"><Minus className="w-3 h-3" /></button>
                        <span className="font-bold text-xs w-4 text-center">{item.qty}</span>
                        <button onClick={() => updateCartQty(item.id, 1)} className="w-6 h-6 flex items-center justify-center hover:bg-white rounded transition hover:shadow-sm"><Plus className="w-3 h-3" /></button>
                      </div>
                      <span className="font-bold text-ray-blue">{item.price * item.qty} ج</span>
                    </div>
                  </div>
                </div>
              ))}
              {cart.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>السلة فارغة</p>
                </div>
              )}
            </div>

            <div className="p-5 border-t border-gray-100 bg-white rounded-b-2xl shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm"><span className="text-gray-500">المجموع</span><span className="font-bold">{cartTotal} ج.م</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500">التوصيل</span><span className="font-bold">20 ج.م</span></div>
                <div className="flex justify-between pt-3 border-t border-gray-100 text-lg font-black text-gray-900"><span>الإجمالي</span><span>{cartTotal > 0 ? cartTotal + 20 : 0} ج.م</span></div>
              </div>
              
              {cartTotal > 0 && (
                <div className="grid grid-cols-2 gap-3 mb-4">
                   <button className="py-3 border border-ray-blue bg-blue-50 text-ray-blue rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-100 transition"><CreditCard className="w-4 h-4" /> فيزا</button>
                   <button className="py-3 border border-transparent bg-gray-100 text-gray-700 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-200 transition"><Banknote className="w-4 h-4" /> كاش</button>
                </div>
              )}

              <button 
                onClick={onCheckout}
                disabled={isOrderProcessing || cart.length === 0}
                className="w-full py-4 bg-ray-black text-white rounded-xl font-bold shadow-lg hover:bg-gray-800 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isOrderProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : 'تأكيد الطلب (20 دقيقة)'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MerchantCart;
