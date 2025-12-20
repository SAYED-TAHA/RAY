
import React, { useState, useEffect } from 'react';
import { ChevronRight, MapPin, Phone, MessageSquare, CheckCircle, Clock, ChefHat, Bike, Home, Package, Star, Loader } from 'lucide-react';
import FeedbackModal from '../common/FeedbackModal';
import { API_URL } from '@/utils/api';

interface OrderTrackingViewProps {
  onBack: () => void;
  orderId?: string;
}

interface Order {
  id: string;
  restaurant: string;
  items: Array<{ name: string; qty: number; price: number }>;
  total: number;
  deliveryFee: number;
  status: string;
  driver: {
    name: string;
    rating: number;
    phone: string;
    image: string;
  };
}

const OrderTrackingView: React.FC<OrderTrackingViewProps> = ({ onBack, orderId }) => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_URL}/api/orders/${orderId || 'current'}`);
        if (response.ok) {
          const data = await response.json();
          setOrder(data);
        }
      } catch (error) {
        console.error('خطأ في جلب بيانات الطلب:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const getSteps = (status: string) => {
  const baseSteps = [
    { id: 'confirmed', label: 'تم التأكيد', time: '', icon: CheckCircle, active: false },
    { id: 'preparing', label: 'جاري التحضير', time: '', icon: ChefHat, active: false },
    { id: 'delivering', label: 'في الطريق', time: '', icon: Bike, active: false },
    { id: 'delivered', label: 'تم التوصيل', time: '', icon: Home, active: false },
  ];

  // Update steps based on order status
  const statusIndex = baseSteps.findIndex(step => step.id === status);
  for (let i = 0; i <= statusIndex && i < baseSteps.length; i++) {
    baseSteps[i].active = true;
  }

  return baseSteps;
};

  const handleFeedbackSubmit = (rating: number, comment: string) => {
    console.log('Feedback:', rating, comment);
    // Handle feedback submission logic here
  };

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center gap-3">
            <Loader className="w-6 h-6 animate-spin text-blue-600" />
            <span className="text-gray-600">جاري تحميل بيانات الطلب...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="text-center py-12">
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">لم يتم العثور على الطلب</p>
        </div>
      </div>
    );
  }

  const steps = getSteps(order.status);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 animate-in fade-in slide-in-from-bottom-4 pb-24">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={onBack}
          className="p-2 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-xl font-black text-ray-black">تتبع الطلب</h1>
          <p className="text-sm text-gray-500">طلب رقم <span className="font-mono">{order.id}</span></p>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="bg-gray-200 rounded-3xl h-64 w-full mb-6 relative overflow-hidden border border-gray-300 shadow-inner">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-full text-sm font-bold text-gray-600 shadow-sm flex items-center gap-2">
            <MapPin className="w-4 h-4 text-ray-blue" />
            الخريطة التفاعلية (تجريبي)
          </div>
        </div>
        {/* Simulated Path */}
        <div className="absolute top-1/2 left-1/4 w-1/2 h-1 bg-blue-400/50 border-t-2 border-dashed border-blue-500 transform -rotate-12"></div>
        <div className="absolute top-[40%] left-[25%] p-2 bg-white rounded-full shadow-lg animate-bounce">
          <StoreIcon className="w-6 h-6 text-orange-500" />
        </div>
        <div className="absolute top-[60%] right-[25%] p-2 bg-ray-blue rounded-full shadow-lg z-10">
          <Bike className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Status Timeline */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        <div className="flex justify-between items-start relative">
          {/* Connecting Line */}
          <div className="absolute top-5 left-0 right-0 h-1 bg-gray-100 -z-10 rounded-full">
            <div className="h-full bg-green-500 rounded-full transition-all duration-1000" style={{ width: '66%' }}></div>
          </div>

          {steps.map((step, idx) => (
            <div key={step.id} className="flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all duration-500 ${step.active ? 'bg-green-500 border-white text-white shadow-md scale-110' : 'bg-gray-100 border-white text-gray-400'}`}>
                <step.icon className="w-5 h-5" />
              </div>
              <div className="text-center">
                <p className={`text-xs font-bold ${step.active ? 'text-gray-800' : 'text-gray-400'}`}>{step.label}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{step.time}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100 flex justify-between items-center">
          <div className="flex items-center gap-3">
             <Clock className="w-5 h-5 text-ray-blue" />
             <p className="text-sm font-bold text-blue-800">وقت الوصول المتوقع: 15 دقيقة</p>
          </div>
          {/* Demo Feedback Button */}
          <button onClick={() => setIsFeedbackOpen(true)} className="text-xs font-bold bg-white px-3 py-1.5 rounded-lg text-blue-600 border border-blue-200 hover:bg-blue-50 transition">
             قيم الطلب
          </button>
        </div>
      </div>

      {/* Driver Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-6 flex items-center gap-4">
        <div className="relative">
          <img src={order.driver.image} alt="Driver" className="w-14 h-14 rounded-full object-cover border-2 border-gray-100" />
          <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center shadow-sm">
            ★ {order.driver.rating}
          </div>
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900">{order.driver.name}</h3>
          <p className="text-xs text-gray-500">مندوب توصيل • دراجة نارية</p>
        </div>
        <div className="flex gap-2">
          <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition">
            <MessageSquare className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 hover:bg-green-100 transition">
            <Phone className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-100">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <Package className="w-5 h-5 text-gray-500" />
            ملخص الطلب
          </h3>
        </div>
        <div className="p-4 space-y-3">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs font-bold">{item.qty}x</span>
                <span className="text-gray-700">{item.name}</span>
              </div>
              <span className="font-medium text-gray-900">{item.price} ج</span>
            </div>
          ))}
          <div className="border-t border-gray-100 my-2 pt-2 space-y-2">
            <div className="flex justify-between text-xs text-gray-500">
              <span>التوصيل</span>
              <span>{order.deliveryFee} ج</span>
            </div>
            <div className="flex justify-between text-lg font-black text-ray-black">
              <span>الإجمالي</span>
              <span>{order.total + order.deliveryFee} ج</span>
            </div>
          </div>
        </div>
      </div>

      <FeedbackModal 
        isOpen={isFeedbackOpen} 
        onClose={() => setIsFeedbackOpen(false)} 
        onSubmit={handleFeedbackSubmit} 
      />
    </div>
  );
};

// Helper Icon
const StoreIcon = (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7"/></svg>;

export default OrderTrackingView;
