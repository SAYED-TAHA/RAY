"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  Car, Wrench, Users, DollarSign, CheckCircle, Shield, Zap, 
  TrendingUp, ArrowLeft, Star, Calendar, Settings
} from 'lucide-react';

export default function CarsSystemPage() {
  const router = useRouter();

  const features = [
    {
      icon: Car,
      title: "إدارة السيارات",
      description: "قائمة السيارات، المواصفات، الصور، الحالة"
    },
    {
      icon: Wrench,
      title: "ورشة الصيانة",
      description: "حجز الصيانة، سجل الإصلاحات، قطع الغيار"
    },
    {
      icon: Calendar,
      title: "حجز المواعيد",
      description: "مواعيد العرض، اختبار القيادة، الصيانة"
    },
    {
      icon: Users,
      title: "إدارة العملاء",
      description: "ملفات العملاء، سجل المشتريات، الخدمة"
    },
    {
      icon: DollarSign,
      title: "إدارة المبيعات",
      description: "عقود البيع، التمويل، التأمين"
    },
    {
      icon: Shield,
      title: "التقارير والتحليل",
      description: "مبيعات، مخزون، أداء الموظفين، تقارير مالية"
    }
  ];

  const benefits = [
    "زيادة المبيعات بنسبة 38%",
    "تسريع الخدمة بنسبة 52%",
    "توفير الوقت بنسبة 45%",
    "رضا العملاء 93%"
  ];

  const pricing = [
    {
      plan: "أساسي",
      price: "349 ج",
      features: ["حتى 30 سيارة", "مستخدم واحد", "تقارير أساسية", "دعم عبر البريد"]
    },
    {
      plan: "احترافي",
      price: "699 ج",
      features: ["سيارات غير محدودة", "5 مستخدمين", "تقارير متقدمة", "دعم على مدار الساعة"]
    },
    {
      plan: "مؤسسي",
      price: "1199 ج",
      features: ["فروع متعددة", "مستخدمين غير محدودين", "تخصيص كامل", "مدير حساب مخصص"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
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
              onClick={() => router.push('/dashboard?type=cars')}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-purple-700 transition"
            >
              ابدأ الآن
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <Car className="w-10 h-10 text-purple-600" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            نظام إدارة <span className="text-purple-600">السيارات</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            نظام متكامل لإدارة معارض السيارات وورش الصيانة. من عرض السيارات إلى الصيانة، 
            كل ما تحتاجه لتشغيل عملك بكفاءة عالية.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => router.push('/dashboard?type=cars')}
              className="bg-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-purple-700 transition"
            >
              جرب مجاناً لمدة 14 يوم
            </button>
            <button className="bg-white text-purple-600 border-2 border-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-purple-50 transition">
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
            <p className="text-xl text-gray-600">كل ما تحتاجه لإدارة عمل السيارات بكفاءة</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4 bg-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">نتائج حقيقية</h2>
            <p className="text-xl text-gray-600">نتائج ملموسة من معارض سيارات تستخدم نظامنا</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">{benefit}</div>
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
            <p className="text-xl text-gray-600">اختر الخطة المناسبة لعملك</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricing.map((plan, index) => (
              <div key={index} className={`rounded-2xl p-8 ${index === 1 ? 'bg-purple-600 text-white ring-4 ring-purple-200' : 'bg-gray-50'}`}>
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
                <button className={`w-full py-3 rounded-lg font-bold transition ${index === 1 ? 'bg-white text-purple-600 hover:bg-gray-100' : 'bg-purple-600 text-white hover:bg-purple-700'}`}>
                  اختر الخطة
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">هل أنت مستعد لتحويل عمل السيارات؟</h2>
          <p className="text-xl text-purple-100 mb-8">
            انضم إلى أكثر من 200 معرض وورشة تستخدم نظامنا لزيادة المبيعات وتحسين الخدمة
          </p>
          <button 
            onClick={() => router.push('/dashboard?type=cars')}
            className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition"
          >
            ابدأ التجربة المجانية
          </button>
        </div>
      </section>
    </div>
  );
}
