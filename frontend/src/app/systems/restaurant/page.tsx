"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  Utensils, Clock, Users, DollarSign, CheckCircle, Shield, Zap, 
  ShoppingCart, TrendingUp, ArrowLeft, Star, ChefHat, Package
} from 'lucide-react';

export default function RestaurantSystemPage() {
  const router = useRouter();

  const features = [
    {
      icon: ShoppingCart,
      title: "نظام الطلبات",
      description: "طلبات على الطاولة، تطبيق موبايل، طلبات توصيل"
    },
    {
      icon: ChefHat,
      title: "إدارة المطبخ",
      description: "شاشة المطبخ KDS، إعداد الوقت، إدارة الوصفات"
    },
    {
      icon: Package,
      title: "إدارة المخزون",
      description: "تتبع المواد الخام، تنبيهات النقص، تكاليف التشغيل"
    },
    {
      icon: Users,
      title: "إدارة العملاء",
      description: "برنامج ولاء، تقييمات، حملات تسويقية"
    },
    {
      icon: DollarSign,
      title: "نقطة البيع",
      description: "كاشير متكامل، انقسام الفواتير، دفعات متعددة"
    },
    {
      icon: Shield,
      title: "التقارير والتحليل",
      description: "مبيعات يومية، تحليل الأرباح، تقارير الموظفين"
    }
  ];

  const benefits = [
    "زيادة المبيعات بنسبة 40%",
    "تقليل الأخطاء بنسبة 85%",
    "تسريع الخدمة بنسبة 55%",
    "رضا العملاء 97%"
  ];

  const pricing = [
    {
      plan: "أساسي",
      price: "199 ج",
      features: ["حتى 3 طاولات", "10 منتجات", "تقارير أساسية", "دعم عبر البريد"]
    },
    {
      plan: "احترافي",
      price: "499 ج",
      features: ["طاولات غير محدودة", "منتجات غير محدودة", "تقارير متقدمة", "دعم على مدار الساعة"]
    },
    {
      plan: "مؤسسي",
      price: "899 ج",
      features: ["فروع متعددة", "تطبيق موبايل", "تخصيص كامل", "مدير حساب مخصص"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button 
              onClick={() => router.push('/systems')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
            >
              <ArrowLeft className="w-5 h-5" />
              العودة للأنظمة
            </button>
            <button 
              onClick={() => router.push('/dashboard?type=restaurant')}
              className="bg-orange-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-orange-700 transition"
            >
              ابدأ الآن
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <Utensils className="w-10 h-10 text-orange-600" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            نظام إدارة <span className="text-orange-600">المطاعم</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            نظام متكامل لإدارة المطاعم الحديثة. من الطلبات إلى المطبخ إلى الكاشير، 
            كل ما تحتاجه لتشغيل مطعمك بكفاءة عالية.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => router.push('/dashboard?type=restaurant')}
              className="bg-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-700 transition"
            >
              جرب مجاناً لمدة 14 يوم
            </button>
            <button className="bg-white text-orange-600 border-2 border-orange-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-50 transition">
              مشاهدة عرض توضيحي
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">مميزات النظام</h2>
            <p className="text-xl text-gray-600">كل ما تحتاجه لإدارة مطعمك بكفاءة</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4 bg-orange-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">نتائج حقيقية</h2>
            <p className="text-xl text-gray-600">نتائج ملموسة من مطاعم تستخدم نظامنا</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">{benefit}</div>
                <p className="text-gray-600">تحسن ملحوظ</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">الأسعار</h2>
            <p className="text-xl text-gray-600">اختر الخطة المناسبة لمطعمك</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricing.map((plan, index) => (
              <div key={index} className={`rounded-2xl p-8 ${index === 1 ? 'bg-orange-600 text-white ring-4 ring-orange-200' : 'bg-gray-50'}`}>
                <h3 className="text-2xl font-bold mb-2">{plan.plan}</h3>
                <div className="text-4xl font-bold mb-6">{plan.price}<span className="text-lg font-normal">/شهر</span></div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-lg font-bold transition ${index === 1 ? 'bg-white text-orange-600 hover:bg-gray-100' : 'bg-orange-600 text-white hover:bg-orange-700'}`}>
                  اختر الخطة
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-orange-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">هل أنت مستعد لتحويل مطعمك؟</h2>
          <p className="text-xl text-orange-100 mb-8">
            انضم إلى أكثر من 800 مطعم يستخدم نظامنا لزيادة المبيعات وتحسين الخدمة
          </p>
          <button 
            onClick={() => router.push('/dashboard?type=restaurant')}
            className="bg-white text-orange-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition"
          >
            ابدأ التجربة المجانية
          </button>
        </div>
      </section>
    </div>
  );
}
