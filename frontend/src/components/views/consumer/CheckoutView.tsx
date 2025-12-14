
import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, CreditCard, MapPin, Truck, ChevronRight, 
  ShieldCheck, Banknote, Wallet, ArrowLeft, Loader, ShoppingCart
} from 'lucide-react';

interface CheckoutViewProps {
  onBack: () => void;
  onComplete: (orderId: string) => void;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  image: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const CheckoutView: React.FC<CheckoutViewProps> = ({ onBack, onComplete }) => {
  const [step, setStep] = useState(1); // 1: Address, 2: Payment, 3: Review
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [isProcessing, setIsProcessing] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_URL}/api/cart`);
        if (response.ok) {
          const data = await response.json();
          setItems(data.items || []);
        }
      } catch (error) {
        console.error('خطأ في جلب عناصر السلة:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCart();
  }, []);

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const deliveryFee = 25;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
          paymentMethod,
          total,
          deliveryFee
        }),
      });

      if (response.ok) {
        const data = await response.json();
        onComplete(data.orderId);
      }
    } catch (error) {
      console.error('خطأ في إنشاء الطلب:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center gap-3">
            <Loader className="w-6 h-6 animate-spin text-blue-600" />
            <span className="text-gray-600">جاري تحميل السلة...</span>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">السلة فارغة</p>
          <button 
            onClick={onBack}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            العودة للتسوق
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="mb-8 flex items-center gap-4">
        <button onClick={onBack} className="p-2 bg-white rounded-full border border-gray-200 hover:bg-gray-50">
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-2xl font-black text-ray-black">إتمام الشراء</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Steps Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Progress Steps */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex justify-between relative overflow-hidden">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-100 -z-10"></div>
            <div className={`absolute top-1/2 right-0 h-1 bg-green-500 -z-10 transition-all duration-500`} style={{ width: step === 1 ? '15%' : step === 2 ? '50%' : '100%' }}></div>
            
            <div className="flex flex-col items-center gap-2 bg-white px-2 z-10">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors ${step >= 1 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
              <span className="text-xs font-bold text-gray-600">العنوان</span>
            </div>
            <div className="flex flex-col items-center gap-2 bg-white px-2 z-10">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors ${step >= 2 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
              <span className="text-xs font-bold text-gray-600">الدفع</span>
            </div>
            <div className="flex flex-col items-center gap-2 bg-white px-2 z-10">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors ${step >= 3 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>3</div>
              <span className="text-xs font-bold text-gray-600">المراجعة</span>
            </div>
          </div>

          {/* Step 1: Address */}
          {step === 1 && (
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm animate-in fade-in">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-ray-blue" />
                عنوان التوصيل
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="border-2 border-ray-blue bg-blue-50 p-4 rounded-xl cursor-pointer relative">
                  <div className="absolute top-3 left-3 bg-ray-blue text-white text-xs px-2 py-1 rounded font-bold">محدد</div>
                  <h4 className="font-bold text-gray-900 mb-1">المنزل</h4>
                  <p className="text-sm text-gray-600">شارع 9، المعادي، القاهرة<br/>الدور الثالث، شقة 5</p>
                </div>
                <div className="border-2 border-gray-100 p-4 rounded-xl cursor-pointer hover:border-gray-300 transition flex items-center justify-center text-gray-400 gap-2 min-h-[100px]">
                  <span className="font-bold text-2xl">+</span>
                  <span className="font-bold">عنوان جديد</span>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-100">
                <h4 className="font-bold text-sm text-gray-700">تفضيلات التوصيل</h4>
                <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                  <input type="checkbox" className="w-5 h-5 accent-ray-blue" />
                  <span className="text-sm text-gray-600">اترك الطلب عند الباب (توصيل بدون تلامس)</span>
                </label>
              </div>

              <div className="mt-6 flex justify-end">
                <button onClick={() => setStep(2)} className="bg-ray-blue text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-800 transition flex items-center gap-2">
                  التالي: الدفع
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm animate-in fade-in">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-ray-blue" />
                طريقة الدفع
              </h3>

              <div className="space-y-3 mb-6">
                <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition ${paymentMethod === 'credit' ? 'border-ray-blue bg-blue-50' : 'border-gray-100 hover:border-gray-200'}`}>
                  <input type="radio" name="payment" value="credit" checked={paymentMethod === 'credit'} onChange={() => setPaymentMethod('credit')} className="w-5 h-5 accent-ray-blue" />
                  <div className="p-2 bg-white rounded-lg text-blue-600 shadow-sm"><CreditCard className="w-6 h-6" /></div>
                  <div className="flex-1">
                    <span className="font-bold text-gray-900 block">بطاقة بنكية</span>
                    <span className="text-xs text-gray-500">Visa / MasterCard</span>
                  </div>
                </label>

                <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition ${paymentMethod === 'cash' ? 'border-ray-blue bg-blue-50' : 'border-gray-100 hover:border-gray-200'}`}>
                  <input type="radio" name="payment" value="cash" checked={paymentMethod === 'cash'} onChange={() => setPaymentMethod('cash')} className="w-5 h-5 accent-ray-blue" />
                  <div className="p-2 bg-white rounded-lg text-green-600 shadow-sm"><Banknote className="w-6 h-6" /></div>
                  <div className="flex-1">
                    <span className="font-bold text-gray-900 block">الدفع عند الاستلام (كاش)</span>
                    <span className="text-xs text-gray-500">دفع نقدي للمندوب</span>
                  </div>
                </label>

                <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition ${paymentMethod === 'wallet' ? 'border-ray-blue bg-blue-50' : 'border-gray-100 hover:border-gray-200'}`}>
                  <input type="radio" name="payment" value="wallet" checked={paymentMethod === 'wallet'} onChange={() => setPaymentMethod('wallet')} className="w-5 h-5 accent-ray-blue" />
                  <div className="p-2 bg-white rounded-lg text-ray-gold shadow-sm"><Wallet className="w-6 h-6" /></div>
                  <div className="flex-1">
                    <span className="font-bold text-gray-900 block">محفظة راي</span>
                    <span className="text-xs text-gray-500">الرصيد الحالي: 450.00 ج</span>
                  </div>
                </label>
              </div>

              <div className="flex justify-between mt-6">
                <button onClick={() => setStep(1)} className="px-6 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition">
                  رجوع
                </button>
                <button onClick={() => setStep(3)} className="bg-ray-blue text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-800 transition flex items-center gap-2">
                  التالي: المراجعة
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm animate-in fade-in">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-ray-blue" />
                مراجعة الطلب
              </h3>

              <div className="space-y-4 mb-6">
                {items.map(item => (
                  <div key={item.id} className="flex gap-4 bg-gray-50 p-3 rounded-xl">
                    <img src={item.image} className="w-16 h-16 rounded-lg object-cover bg-white" alt={item.name} />
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-500">{item.qty}x</p>
                    </div>
                    <p className="font-bold text-ray-blue">{item.price * item.qty} ج</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-3 border border-gray-100 rounded-xl">
                  <span className="text-xs text-gray-500 block mb-1">العنوان</span>
                  <span className="text-sm font-bold text-gray-800">المنزل (المعادي)</span>
                </div>
                <div className="p-3 border border-gray-100 rounded-xl">
                  <span className="text-xs text-gray-500 block mb-1">الدفع</span>
                  <span className="text-sm font-bold text-gray-800">
                    {paymentMethod === 'cash' ? 'كاش' : paymentMethod === 'credit' ? 'بطاقة بنكية' : 'محفظة راي'}
                  </span>
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button onClick={() => setStep(2)} className="px-6 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition">
                  رجوع
                </button>
                <button 
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="bg-ray-gold text-ray-black px-8 py-3 rounded-xl font-bold hover:bg-yellow-400 transition flex items-center gap-2 shadow-lg disabled:opacity-70"
                >
                  {isProcessing ? 'جاري التنفيذ...' : 'تأكيد الطلب'}
                  {!isProcessing && <CheckCircle className="w-5 h-5" />}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-lg sticky top-24">
            <h3 className="font-bold text-lg mb-4 text-ray-black">ملخص الفاتورة</h3>
            <div className="space-y-3 mb-6 pb-6 border-b border-gray-100">
              <div className="flex justify-between text-gray-600 font-medium">
                <span>المجموع الفرعي</span>
                <span>{subtotal} ج.م</span>
              </div>
              <div className="flex justify-between text-gray-600 font-medium">
                <span>التوصيل</span>
                <span>{deliveryFee} ج.م</span>
              </div>
              <div className="flex justify-between text-green-600 text-sm font-bold">
                <span>الخصم</span>
                <span>-0 ج.م</span>
              </div>
            </div>
            <div className="flex justify-between items-center mb-6">
              <span className="font-black text-xl text-ray-black">الإجمالي</span>
              <span className="font-black text-2xl text-ray-blue">{total} ج.م</span>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-xl flex items-start gap-2">
              <ShieldCheck className="w-5 h-5 text-green-600 mt-0.5" />
              <p className="text-xs text-gray-500 leading-relaxed">
                عملية الدفع آمنة 100%. يتم تشفير بياناتك ولن يتم مشاركتها مع أي طرف ثالث.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutView;
