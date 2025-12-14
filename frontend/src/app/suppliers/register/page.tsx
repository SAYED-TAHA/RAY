"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Building2, Mail, Phone, MapPin, Package, Upload, 
  CheckCircle, ArrowLeft, Eye, EyeOff, Star
} from 'lucide-react';

export default function SupplierRegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<{
    companyName: string;
    contactPerson: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    category: string;
    description: string;
    location: string;
    website: string;
    established: string;
    products: string[];
    minOrder: string;
    delivery: string;
    paymentMethods: string[];
    documents: File | null;
  }>({
    // Step 1: Basic Info
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    
    // Step 2: Business Info
    category: '',
    description: '',
    location: '',
    website: '',
    established: '',
    
    // Step 3: Products
    products: [''],
    
    // Step 4: Operations
    minOrder: '',
    delivery: '',
    paymentMethods: [],
    
    // Verification
    documents: null
  });

  const categories = [
    { id: 'electronics', name: 'إلكترونيات' },
    { id: 'food', name: 'مواد غذائية' },
    { id: 'clothing', name: 'ملابس' },
    { id: 'medical', name: 'مستلزمات طبية' },
    { id: 'construction', name: 'مواد بناء' },
    { id: 'furniture', name: 'أثاث' },
    { id: 'cosmetics', name: 'مستحضرات تجميل' },
    { id: 'cleaning', name: 'مواد تنظيف' },
    { id: 'other', name: 'أخرى' }
  ];

  const paymentOptions = [
    'نقداً',
    'تحويل بنكي', 
    'دفع إلكتروني',
    'شيكات',
    'الدفع عند الاستلام'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProductChange = (index: number, value: string) => {
    const newProducts = [...formData.products];
    newProducts[index] = value;
    setFormData(prev => ({
      ...prev,
      products: newProducts
    }));
  };

  const addProduct = () => {
    setFormData(prev => ({
      ...prev,
      products: [...prev.products, '']
    }));
  };

  const removeProduct = (index: number) => {
    const newProducts = formData.products.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      products: newProducts
    }));
  };

  const handlePaymentToggle = (method: string) => {
    setFormData(prev => ({
      ...prev,
      paymentMethods: prev.paymentMethods.includes(method)
        ? prev.paymentMethods.filter(m => m !== method)
        : [...prev.paymentMethods, method]
    }));
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('كلمات المرور غير متطابقة');
      return;
    }
    
    console.log('تسجيل مورد:', formData);
    alert('تم تسجيلك ك مورد بنجاح! مرحباً بك في منصة راي مصر.');
    router.push('/supplier/dashboard');
  };

  const progress = (step / 4) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button 
              onClick={() => router.push('/suppliers')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
            >
              <ArrowLeft className="w-5 h-5" />
              العودة للموردين
            </button>
            <div className="flex items-center gap-2">
              <Building2 className="w-6 h-6 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">تسجيل مورد جديد</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-gray-700">الخطوة {step} من 4</span>
            <span className="text-sm text-gray-500">{Math.round(progress)}% مكتمل</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">المعلومات الأساسية</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    اسم الشركة *
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="مثال: شركة النور للمواد الغذائية"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    شخص الاتصال *
                  </label>
                  <input
                    type="text"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="الاسم الكامل"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    البريد الإلكتروني *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    رقم الهاتف *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="01012345678"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    كلمة المرور *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 pr-10"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3 top-3 text-gray-400"
                    >
                      {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    تأكيد كلمة المرور *
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Business Info */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">معلومات العمل</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    فئة النشاط *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">اختر الفئة</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    الموقع *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="مثال: القاهرة، مصر"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    الموقع الإلكتروني
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="www.example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    سنة التأسيس
                  </label>
                  <input
                    type="number"
                    name="established"
                    value={formData.established}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="مثال: 2010"
                    min="1950"
                    max={new Date().getFullYear()}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  وصف الشركة *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="اكتب وصفاً موجزاً لشركتك ومنتجاتك..."
                  required
                />
              </div>
            </div>
          )}

          {/* Step 3: Products */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">المنتجات والخدمات</h2>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  المنتجات الرئيسية *
                </label>
                {formData.products.map((product, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={product}
                      onChange={(e) => handleProductChange(index, e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="مثال: دقيق القمح"
                    />
                    {formData.products.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeProduct(index)}
                        className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        حذف
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addProduct}
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  + إضافة منتج
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Operations */}
          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">العمليات والشروط</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    أدنى طلب *
                  </label>
                  <input
                    type="text"
                    name="minOrder"
                    value={formData.minOrder}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="مثال: 500 ج"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    وقت التوصيل *
                  </label>
                  <select
                    name="delivery"
                    value={formData.delivery}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">اختر وقت التوصيل</option>
                    <option value="24 ساعة">24 ساعة</option>
                    <option value="48 ساعة">48 ساعة</option>
                    <option value="72 ساعة">72 ساعة</option>
                    <option value="أسبوع">أسبوع</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  طرق الدفع المقبولة *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {paymentOptions.map(method => (
                    <label key={method} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.paymentMethods.includes(method)}
                        onChange={() => handlePaymentToggle(method)}
                        className="w-4 h-4 rounded"
                      />
                      <span className="text-sm">{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  رفع المستندات (اختياري)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 mb-2">اسحب وأفلت الملفات هنا أو</p>
                  <button
                    type="button"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    اختر ملفات
                  </button>
                  <p className="text-xs text-gray-500 mt-2">
                    السجل التجاري، ترخيص العمل، شهادات الجودة (PDF, JPG, PNG)
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-50"
              >
                السابق
              </button>
            )}
            
            {step < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 mr-auto"
              >
                التالي
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 mr-auto"
              >
                إرسال طلب التسجيل
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
