import React, { useState } from 'react';
import { CreditCard, Truck, Shield, ArrowLeft, MapPin, User, Phone, Mail, Clock, CheckCircle } from 'lucide-react';

interface CheckoutViewProps {
  onBack?: () => void;
  onComplete?: (orderId: string) => void;
}

const CheckoutView: React.FC<CheckoutViewProps> = ({ onBack, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Shipping Info
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    
    // Payment Info
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    paymentMethod: 'card'
  });

  const cartItems = [
    { id: 1, name: 'تيشيرت قطن', price: 120, qty: 2, shop: 'محمل أزياء' },
    { id: 2, name: 'جينز أزرق', price: 280, qty: 1, shop: 'محمل أزياء' },
  ];

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const shippingFee = 30;
  const finalTotal = cartTotal + shippingFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Generate order ID
    const orderId = `ORD-${Date.now()}`;
    if (onComplete) {
      onComplete(orderId);
    }
  };

  const steps = [
    { id: 1, title: 'معلومات الشحن', icon: MapPin },
    { id: 2, title: 'الدفع', icon: CreditCard },
    { id: 3, title: 'تأكيد', icon: CheckCircle }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">إتمام الشراء</h1>
          <p className="text-gray-600">أكمل عملية الشراء في 3 خطوات بسيطة</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className={`flex items-center gap-2 ${currentStep >= step.id ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                currentStep >= step.id ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300'
              }`}>
                <step.icon className="w-5 h-5" />
              </div>
              <span className="font-medium">{step.title}</span>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-16 h-0.5 mx-4 ${currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300'}`} />
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {currentStep === 1 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                معلومات الشحن
              </h2>
              
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">الاسم الأول</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">الاسم الأخير</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">العنوان التفصيلي</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">المدينة</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">الرمز البريدي</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition"
                >
                  المتابعة للدفع
                </button>
              </form>
            </div>
          )}

          {currentStep === 2 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-blue-600" />
                معلومات الدفع
              </h2>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">طريقة الدفع</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <label className="relative">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className={`p-4 border-2 rounded-lg cursor-pointer text-center ${
                        formData.paymentMethod === 'card' ? 'border-blue-600 bg-blue-50' : 'border-gray-300'
                      }`}>
                        <CreditCard className="w-6 h-6 mx-auto mb-2" />
                        <span className="text-sm font-medium">بطاقة ائتمان</span>
                      </div>
                    </label>
                    <label className="relative">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cash"
                        checked={formData.paymentMethod === 'cash'}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className={`p-4 border-2 rounded-lg cursor-pointer text-center ${
                        formData.paymentMethod === 'cash' ? 'border-blue-600 bg-blue-50' : 'border-gray-300'
                      }`}>
                        <Truck className="w-6 h-6 mx-auto mb-2" />
                        <span className="text-sm font-medium">دفع عند الاستلام</span>
                      </div>
                    </label>
                    <label className="relative">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="wallet"
                        checked={formData.paymentMethod === 'wallet'}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className={`p-4 border-2 rounded-lg cursor-pointer text-center ${
                        formData.paymentMethod === 'wallet' ? 'border-blue-600 bg-blue-50' : 'border-gray-300'
                      }`}>
                        <Shield className="w-6 h-6 mx-auto mb-2" />
                        <span className="text-sm font-medium">محفظة إلكترونية</span>
                      </div>
                    </label>
                  </div>
                </div>

                {formData.paymentMethod === 'card' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">رقم البطاقة</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">الاسم على البطاقة</label>
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">تاريخ الانتهاء</label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>
                  </>
                )}

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-50 transition"
                  >
                    العودة
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition"
                  >
                    مراجعة الطلب
                  </button>
                </div>
              </form>
            </div>
          )}

          {currentStep === 3 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                تأكيد الطلب
              </h2>

              <div className="space-y-6">
                {/* Shipping Info Summary */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">معلومات الشحن</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-medium">{formData.firstName} {formData.lastName}</p>
                    <p className="text-gray-600">{formData.phone}</p>
                    <p className="text-gray-600">{formData.email}</p>
                    <p className="text-gray-600">{formData.address}</p>
                    <p className="text-gray-600">{formData.city}</p>
                  </div>
                </div>

                {/* Payment Method Summary */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">طريقة الدفع</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-medium">
                      {formData.paymentMethod === 'card' && 'بطاقة ائتمان'}
                      {formData.paymentMethod === 'cash' && 'دفع عند الاستلام'}
                      {formData.paymentMethod === 'wallet' && 'محفظة إلكترونية'}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-50 transition"
                  >
                    العودة
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="flex-1 bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition"
                  >
                    تأكيد الطلب
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-4">
            <h3 className="font-bold text-gray-900 mb-4">ملخص الطلب</h3>
            
            <div className="space-y-3 mb-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.name} × {item.qty}</span>
                  <span className="font-medium">{item.price * item.qty} ج.م</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">المجموع الفرعي</span>
                <span>{cartTotal} ج.م</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">رسوم الشحن</span>
                <span>{shippingFee} ج.م</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>الإجمالي</span>
                <span className="text-blue-600">{finalTotal} ج.م</span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 text-blue-700 text-sm">
                <Truck className="w-4 h-4" />
                <span>التوصيل المتوقع: 2-3 أيام عمل</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutView;
