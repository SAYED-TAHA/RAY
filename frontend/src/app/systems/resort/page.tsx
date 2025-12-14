"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  Sun, Calendar, Users, DollarSign, CheckCircle, Shield, 
  ArrowLeft, Home, Clock, MapPin
} from 'lucide-react';

export default function ResortSystemPage() {
  const router = useRouter();

  const features = [
    {
      icon: Calendar,
      title: "إدارة الحجوزات",
      description: "حجوزات الغرف، المواعيد، الإلغاء، المتابعة"
    },
    {
      icon: Home,
      title: "إدارة الغرف",
      description: "قائمة الغرف، الأسعار، الحالة، الصيانة"
    },
    {
      icon: Users,
      title: "إدارة الضيوف",
      description: "ملفات الضيوف، البيانات، الخدمات المطلوبة"
    },
    {
      icon: MapPin,
      title: "الخدمات والمرافق",
      description: "الخدمات المتاحة، المرافق، الأنشطة"
    },
    {
      icon: DollarSign,
      title: "إدارة المدفوعات",
      description: "الفواتير، الدفعات، الأسعار، الخصومات"
    },
    {
      icon: Shield,
      title: "التقارير",
      description: "إشغال الغرف، الإيرادات، رضا الضيوف"
    }
  ];

  const benefits = [
    "زيادة الحجوزات بنسبة 50%",
    "توفير الوقت بنسبة 70%",
    "تحسين الإشغال بنسبة 60%",
    "رضا الضيوف 98%"
  ];

  const pricing = [
    {
      plan: "أساسي",
      price: "399 ج",
      features: ["حتى 10 غرف", "100 حجز شهرياً", "تقارير أساسية", "دعم عبر البريد"]
    },
    {
      plan: "احترافي",
      price: "799 ج",
      features: ["حتى 50 غرفة", "حجوزات غير محدودة", "تقارير متقدمة", "دعم 24/7"]
    },
    {
      plan: "مؤسسي",
      price: "1499 ج",
      features: ["غرف غير محدودة", "فروع متعددة", "تخصيص كامل", "مدير حساب"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
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
              onClick={() => router.push('/dashboard?type=resort')}
              className="bg-amber-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-amber-700 transition"
            >
              ابدأ الآن
            </button>
          </div>
        </div>
      </header>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="w-20 h-20 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <Sun className="w-10 h-10 text-amber-600" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            نظام الشاليهات <span className="text-amber-600">والمنتجعات</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            نظام متكامل لإدارة الشاليهات والمنتجعات. من حجوزات الغرف إلى الضيوف، كل ما تحتاجه لتشغيل منتجعك بكفاءة.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => router.push('/dashboard?type=resort')}
              className="bg-amber-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-amber-700 transition"
            >
              جرب مجاناً لمدة 14 يوم
            </button>
            <button className="bg-white text-amber-600 border-2 border-amber-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-amber-50 transition">
              مشاهدة عرض توضيحي
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">مميزات النظام</h2>
            <p className="text-xl text-gray-600">كل ما تحتاجه لإدارة منتجعك بكفاءة</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-amber-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">نتائج حقيقية</h2>
            <p className="text-xl text-gray-600">نتائج ملموسة من منتجعات تستخدم نظامنا</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-amber-600 mb-2">{benefit}</div>
                <p className="text-gray-600">تحسن ملحوظ</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">الأسعار</h2>
            <p className="text-xl text-gray-600">اختر الخطة المناسبة لمنتجعك</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricing.map((plan, index) => (
              <div key={index} className={`rounded-2xl p-8 ${index === 1 ? 'bg-amber-600 text-white ring-4 ring-amber-200' : 'bg-gray-50'}`}>
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
                <button className={`w-full py-3 rounded-lg font-bold transition ${index === 1 ? 'bg-white text-amber-600 hover:bg-gray-100' : 'bg-amber-600 text-white hover:bg-amber-700'}`}>
                  اختر الخطة
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-amber-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">هل أنت مستعد لتحويل منتجعك؟</h2>
          <p className="text-xl text-amber-100 mb-8">
            انضم إلى أكثر من 90 منتجع وشاليه يستخدم نظامنا لزيادة الحجوزات وتحسين الخدمة
          </p>
          <button 
            onClick={() => router.push('/dashboard?type=resort')}
            className="bg-white text-amber-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition"
          >
            ابدأ التجربة المجانية
          </button>
        </div>
      </section>
    </div>
  );
}
