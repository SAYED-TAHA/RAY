"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Users, Phone, Mail, MapPin, Star, Building2, Package, 
  Truck, Clock, Send, ArrowLeft, CheckCircle, MessageSquare
} from 'lucide-react';

export default function SupplierDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [orderData, setOrderData] = useState<{
    companyName: string;
    phone: string;
    email: string;
    notes: string;
    products: Record<string, string>;
  }>({
    companyName: '',
    phone: '',
    email: '',
    notes: '',
    products: {}
  });

  // بيانات وهمية للمورد (في التطبيق الحقيقي ستأتي من API)
  const supplier = {
    id: params.id,
    name: 'شركة النور للمواد الغذائية',
    category: 'food',
    rating: 4.8,
    location: 'القاهرة',
    phone: '01012345678',
    email: 'info@alnour-food.com',
    website: 'www.alnour-food.com',
    description: 'شركة رائدة في توريد المواد الغذائية للفنادق والمطاعم والمؤسسات. نعمل في السوق منذ 15 عاماً ونقدم منتجات عالية الجودة بأسعار تنافسية.',
    products: [
      { name: 'دقيق القمح', price: '25 ج/كجم', minOrder: '50 كجم' },
      { name: 'سكر', price: '18 ج/كجم', minOrder: '100 كجم' },
      { name: 'زيوت طعام', price: '45 ج/لتر', minOrder: '20 لتر' },
      { name: 'أرز', price: '22 ج/كجم', minOrder: '25 كجم' },
      { name: 'مكرونة', price: '15 ج/كجم', minOrder: '30 كجم' },
      { name: 'معلبات', price: '8 ج/علبة', minOrder: '100 علبة' }
    ],
    delivery: '24 ساعة',
    minOrder: '500 ج',
    paymentMethods: ['نقداً', 'تحويل بنكي', 'دفع إلكتروني'],
    verified: true,
    established: '2009',
    employees: '50+',
    responseRate: '98%',
    avgResponseTime: '2 ساعة'
  };

  const handleSendMessage = () => {
    if (!message.trim()) {
      alert('الرجاء كتابة رسالة');
      return;
    }
    
    // هنا سيتم إرسال الرسالة إلى المورد
    alert('تم إرسال رسالتك بنجاح! سيتواصل معك المورد قريباً.');
    setMessage('');
    setQuantity('1');
  };

  const handleQuickOrder = () => {
    if (!orderData.companyName || !orderData.phone || !orderData.email) {
      alert('الرجاء ملء جميع الحقول المطلوبة');
      return;
    }

    // Check if any products are selected
    const hasProducts = Object.values(orderData.products).some(qty => qty && parseInt(qty) > 0);
    if (!hasProducts) {
      alert('الرجاء اختيار كمية واحدة على الأقل');
      return;
    }

    // Create order object
    const newOrder = {
      id: Date.now(),
      customer: orderData.companyName,
      supplier: supplier.name,
      products: orderData.products,
      contactInfo: {
        phone: orderData.phone,
        email: orderData.email
      },
      notes: orderData.notes,
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
      total: calculateOrderTotal()
    };

    // Save order to localStorage (in real app, send to API)
    const existingOrders = JSON.parse(localStorage.getItem('supplierOrders') || '[]');
    existingOrders.push(newOrder);
    localStorage.setItem('supplierOrders', JSON.stringify(existingOrders));

    alert('تم إرسال طلبك بنجاح! سيتواصل معك المورد خلال 24 ساعة.');
    
    // Reset form
    setOrderData({
      companyName: '',
      phone: '',
      email: '',
      notes: '',
      products: {}
    });

    // Redirect to supplier dashboard to show the order
    router.push('/supplier/dashboard');
  };

  const calculateOrderTotal = () => {
    let total = 0;
    Object.entries(orderData.products).forEach(([productName, qty]) => {
      if (qty && parseInt(qty) > 0) {
        const product = supplier.products.find(p => p.name === productName);
        if (product) {
          const price = parseInt(product.price.replace(' ج/كجم', '').replace(' ج/لتر', ''));
          total += price * parseInt(qty);
        }
      }
    });
    return total + ' ج';
  };

  const updateProductQuantity = (productName: string, quantity: string) => {
    setOrderData(prev => ({
      ...prev,
      products: {
        ...prev.products,
        [productName]: quantity
      }
    }));
  };

  const handleCall = () => {
    window.open(`tel:${supplier.phone}`);
  };

  const handleEmail = () => {
    window.open(`mailto:${supplier.email}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => router.push('/suppliers')}
                className="text-gray-600 hover:text-gray-900 transition"
              >
                ← العودة للموردين
              </button>
              <div className="flex items-center gap-2">
                <Users className="w-6 h-6 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900">{supplier.name}</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Supplier Info */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Main Info */}
            <div className="lg:col-span-2">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-6">
                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">{supplier.name}</h2>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-gray-600">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-500" />
                      <span className="font-bold text-sm lg:text-base">{supplier.rating}</span>
                      <span className="text-xs lg:text-sm">(245 تقييم)</span>
                    </div>
                    {supplier.verified && (
                      <span className="inline-flex items-center gap-1 text-xs lg:text-sm bg-green-100 text-green-800 px-2 lg:px-3 py-1 rounded-full">
                        <CheckCircle className="w-3 h-3 lg:w-4 lg:h-4" />
                        مورد موثوق
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <p className="text-gray-700 text-sm lg:text-base mb-6">{supplier.description}</p>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-4 mb-8">
                <button
                  onClick={handleCall}
                  className="flex items-center justify-center gap-2 bg-green-600 text-white py-2 lg:py-3 rounded-lg font-bold hover:bg-green-700 transition text-sm lg:text-base"
                >
                  <Phone className="w-4 h-4 lg:w-5 lg:h-5" />
                  اتصل الآن
                </button>
                <button
                  onClick={handleEmail}
                  className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 lg:py-3 rounded-lg font-bold hover:bg-blue-700 transition text-sm lg:text-base"
                >
                  <Mail className="w-4 h-4 lg:w-5 lg:h-5" />
                  أرسل بريد
                </button>
                <button className="flex items-center justify-center gap-2 bg-purple-600 text-white py-2 lg:py-3 rounded-lg font-bold hover:bg-purple-700 transition text-sm lg:text-base">
                  <MessageSquare className="w-4 h-4 lg:w-5 lg:h-5" />
                  دردشة مباشرة
                </button>
              </div>

              {/* Products */}
              <div>
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-4">المنتجات المتاحة</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 lg:gap-4">
                  {supplier.products.map((product, index) => (
                    <div key={index} className="border rounded-lg p-3 lg:p-4 hover:shadow-md transition">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-gray-900 text-sm lg:text-base">{product.name}</h4>
                        <span className="text-sm lg:text-lg font-bold text-blue-600">{product.price}</span>
                      </div>
                      <p className="text-xs lg:text-sm text-gray-600">أدنى طلب: {product.minOrder}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4 lg:space-y-6">
              {/* Contact Info */}
              <div className="bg-gray-50 rounded-lg p-4 lg:p-6">
                <h3 className="font-bold text-gray-900 mb-4 text-sm lg:text-base">معلومات الاتصال</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 lg:w-5 lg:h-5 text-gray-400" />
                    <span className="text-gray-700 text-sm lg:text-base">{supplier.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 lg:w-5 lg:h-5 text-gray-400" />
                    <span className="text-gray-700 text-sm lg:text-base">{supplier.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 lg:w-5 lg:h-5 text-gray-400" />
                    <span className="text-gray-700 text-sm lg:text-base">{supplier.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Truck className="w-4 h-4 lg:w-5 lg:h-5 text-gray-400" />
                    <span className="text-gray-700 text-sm lg:text-base">توصيل خلال {supplier.delivery}</span>
                  </div>
                </div>
              </div>

              {/* Business Info */}
              <div className="bg-gray-50 rounded-lg p-4 lg:p-6">
                <h3 className="font-bold text-gray-900 mb-4 text-sm lg:text-base">معلومات العمل</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm lg:text-base">تأسست:</span>
                    <span className="font-bold text-sm lg:text-base">{supplier.established}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm lg:text-base">الموظفين:</span>
                    <span className="font-bold text-sm lg:text-base">{supplier.employees}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm lg:text-base">معدل الرد:</span>
                    <span className="font-bold text-sm lg:text-base">{supplier.responseRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm lg:text-base">متوسط وقت الرد:</span>
                    <span className="font-bold text-sm lg:text-base">{supplier.avgResponseTime}</span>
                  </div>
                </div>
              </div>

              {/* Order Info */}
              <div className="bg-blue-50 rounded-lg p-4 lg:p-6">
                <h3 className="font-bold text-gray-900 mb-4 text-sm lg:text-base">شروط الطلب</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm lg:text-base">أدنى طلب:</span>
                    <span className="font-bold text-blue-600 text-sm lg:text-base">{supplier.minOrder}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm lg:text-base">طرق الدفع:</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {supplier.paymentMethods.map((method, index) => (
                        <span key={index} className="text-xs bg-white px-2 py-1 rounded">
                          {method}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Order Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="text-center mb-6 lg:mb-8">
            <h3 className="text-xl lg:text-2xl font-bold mb-2 lg:mb-4">طلب سريع</h3>
            <p className="text-blue-100 text-sm lg:text-base">اطلب منتجاتك مباشرة من المورد</p>
          </div>
          
          {/* Mobile View - Single Column */}
          <div className="lg:hidden space-y-6">
            <div className="bg-white/10 backdrop-blur rounded-xl p-4">
              <h4 className="text-lg font-bold mb-4">تفاصيل الطلب</h4>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="اسم الشركة/المتجر"
                  className="w-full px-4 py-3 rounded-lg text-gray-900"
                  value={orderData.companyName}
                  onChange={(e) => setOrderData(prev => ({ ...prev, companyName: e.target.value }))}
                />
                <input
                  type="tel"
                  placeholder="رقم الهاتف"
                  className="w-full px-4 py-3 rounded-lg text-gray-900"
                  value={orderData.phone}
                  onChange={(e) => setOrderData(prev => ({ ...prev, phone: e.target.value }))}
                />
                <input
                  type="email"
                  placeholder="البريد الإلكتروني"
                  className="w-full px-4 py-3 rounded-lg text-gray-900"
                  value={orderData.email}
                  onChange={(e) => setOrderData(prev => ({ ...prev, email: e.target.value }))}
                />
                <textarea
                  placeholder="ملاحظات إضافية"
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg text-gray-900"
                  value={orderData.notes}
                  onChange={(e) => setOrderData(prev => ({ ...prev, notes: e.target.value }))}
                />
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur rounded-xl p-4">
              <h4 className="text-lg font-bold mb-4">اختر المنتجات</h4>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {supplier.products.map((product, index) => (
                  <div key={index} className="bg-white/20 backdrop-blur rounded-lg p-3 flex items-center justify-between">
                    <div>
                      <h5 className="font-bold text-sm">{product.name}</h5>
                      <p className="text-xs text-blue-100">{product.price}</p>
                    </div>
                    <input
                      type="number"
                      placeholder="الكمية"
                      className="w-20 px-2 py-1 rounded-lg text-gray-900 text-center text-sm"
                      min="0"
                      value={orderData.products[product.name] || ''}
                      onChange={(e) => updateProductQuantity(product.name, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <button 
              onClick={handleQuickOrder}
              className="w-full bg-yellow-400 text-gray-900 py-3 rounded-lg font-bold hover:bg-yellow-300 transition"
            >
              إرسال الطلب
            </button>
          </div>
          
          {/* Desktop View - Two Columns */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur rounded-xl p-6">
              <h4 className="text-xl font-bold mb-6">اختر المنتجات</h4>
              <div className="space-y-4 max-h-64 overflow-y-auto">
                {supplier.products.map((product, index) => (
                  <div key={index} className="bg-white/20 backdrop-blur rounded-lg p-4 flex items-center justify-between">
                    <div>
                      <h5 className="font-bold">{product.name}</h5>
                      <p className="text-sm text-blue-100">{product.price}</p>
                    </div>
                    <input
                      type="number"
                      placeholder="الكمية"
                      className="w-24 px-3 py-2 rounded-lg text-gray-900 text-center"
                      min="0"
                      value={orderData.products[product.name] || ''}
                      onChange={(e) => updateProductQuantity(product.name, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur rounded-xl p-6">
              <h4 className="text-xl font-bold mb-6">تفاصيل الطلب</h4>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="اسم الشركة/المتجر"
                  className="w-full px-4 py-3 rounded-lg text-gray-900"
                  value={orderData.companyName}
                  onChange={(e) => setOrderData(prev => ({ ...prev, companyName: e.target.value }))}
                />
                <input
                  type="tel"
                  placeholder="رقم الهاتف"
                  className="w-full px-4 py-3 rounded-lg text-gray-900"
                  value={orderData.phone}
                  onChange={(e) => setOrderData(prev => ({ ...prev, phone: e.target.value }))}
                />
                <input
                  type="email"
                  placeholder="البريد الإلكتروني"
                  className="w-full px-4 py-3 rounded-lg text-gray-900"
                  value={orderData.email}
                  onChange={(e) => setOrderData(prev => ({ ...prev, email: e.target.value }))}
                />
                <textarea
                  placeholder="ملاحظات إضافية"
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg text-gray-900"
                  value={orderData.notes}
                  onChange={(e) => setOrderData(prev => ({ ...prev, notes: e.target.value }))}
                />
              </div>
              <button 
                onClick={handleQuickOrder}
                className="w-full bg-yellow-400 text-gray-900 py-3 rounded-lg font-bold hover:bg-yellow-300 transition mt-6"
              >
                إرسال الطلب
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-6">أرسل رسالة للمورد</h3>
          
          {/* Mobile View - Single Column */}
          <div className="lg:hidden space-y-6">
            <div>
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  رسالتك
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="اكتب رسالتك للمورد هنا..."
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  الكمية المطلوبة
                </label>
                <input
                  type="text"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="مثال: 100 كجم"
                />
              </div>
              <button
                onClick={handleSendMessage}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                إرسال الرسالة
              </button>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-bold text-gray-900 mb-4 text-sm">نصائح للتواصل</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                  <span className="text-sm">كن واضحاً في طلباتك ومواصفات المنتج</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                  <span className="text-sm">حدد الكمية والموعد المطلوب للتسليم</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                  <span className="text-sm">اسأل عن الأسعار وخصم الكميات</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                  <span className="text-sm">استفسر عن شروط الدفع والتوصيل</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Desktop View - Two Columns */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-8">
            <div>
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  رسالتك
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="اكتب رسالتك للمورد هنا..."
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  الكمية المطلوبة
                </label>
                <input
                  type="text"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="مثال: 100 كجم"
                />
              </div>
              <button
                onClick={handleSendMessage}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                إرسال الرسالة
              </button>
            </div>
            <div className="bg-blue-50 rounded-lg p-6">
              <h4 className="font-bold text-gray-900 mb-4">نصائح للتواصل</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <span>كن واضحاً في طلباتك ومواصفات المنتج</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <span>حدد الكمية والموعد المطلوب للتسليم</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <span>اسأل عن الأسعار وخصم الكميات</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <span>استفسر عن شروط الدفع والتوصيل</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
