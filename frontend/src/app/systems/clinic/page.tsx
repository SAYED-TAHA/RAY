"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  Calendar, Clock, Users, DollarSign, CheckCircle, Shield, Zap, 
  Phone, TrendingUp, ArrowLeft, Star, Stethoscope, MessageSquare
} from 'lucide-react';

export default function ClinicSystemPage() {
  const router = useRouter();

  const features = [
    {
      icon: Calendar,
      title: "إدارة الحجوزات",
      description: "حجوزات ذكية، تذكيرات تلقائية، إلغاء وإعادة جدولة"
    },
    {
      icon: Users,
      title: "ملفات المرضى",
      description: "سجلات طبية كاملة، التاريخ المرضي، الوصفات الطبية"
    },
    {
      icon: Clock,
      title: "جدولة الأطباء",
      description: "جدول عمل الأطباء، الأقسام، العيادات المتعددة"
    },
    {
      icon: DollarSign,
      title: "إدارة الفواتير",
      description: "فواتير الكشف، التأمين، الدفعات الإلكترونية"
    },
    {
      icon: MessageSquare,
      title: "التواصل مع المرضى",
      description: "رسائل تذكير، متابعة الحالة، استبيانات رضا"
    },
    {
      icon: Shield,
      title: "الامتثال الطبي",
      description: "سجلات طبية آمنة، خصوصية البيانات، معايير HIPAA"
    }
  ];

  const benefits = [
    "زيادة الحجوزات بنسبة 45%",
    "تقليل حالات عدم الحضور بنسبة 75%",
    "توفير الوقت بنسبة 60%",
    "رضا المرضى 96%"
  ];

  const pricing = [
    {
      plan: "أساسي",
      price: "399 ج",
      features: ["حتى 5 أطباء", "100 مريض شهرياً", "تقارير أساسية", "دعم عبر البريد"]
    },
    {
      plan: "احترافي",
      price: "799 ج",
      features: ["حتى 15 طبيباً", "مرضى غير محدودين", "تقارير متقدمة", "دعم على مدار الساعة"]
    },
    {
      plan: "مؤسسي",
      price: "1299 ج",
      features: ["أطباء غير محدودين", "فروع متعددة", "تخصيص كامل", "مدير حساب مخصص"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
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
              onClick={() => router.push('/dashboard?type=clinic')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition"
            >
              ابدأ الآن
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <Stethoscope className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            نظام إدارة <span className="text-blue-600">العيادات والمستشفيات</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            نظام متكامل لإدارة المنشآت الطبية. من حجوزات المرضى إلى السجلات الطبية، 
            كل ما تحتاجه لتشغيل عيادتك بكفاءة عالية.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => router.push('/dashboard?type=clinic')}
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition"
            >
              جرب مجاناً لمدة 14 يوم
            </button>
            <button className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition">
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
            <p className="text-xl text-gray-600">كل ما تحتاجه لإدارة عيادتك بكفاءة</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4 bg-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">نتائج حقيقية</h2>
            <p className="text-xl text-gray-600">نتائج ملموسة من عيادات تستخدم نظامنا</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{benefit}</div>
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
            <p className="text-xl text-gray-600">اختر الخطة المناسبة لعيادتك</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricing.map((plan, index) => (
              <div key={index} className={`rounded-2xl p-8 ${index === 1 ? 'bg-blue-600 text-white ring-4 ring-blue-200' : 'bg-gray-50'}`}>
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
                <button className={`w-full py-3 rounded-lg font-bold transition ${index === 1 ? 'bg-white text-blue-600 hover:bg-gray-100' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                  اختر الخطة
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">هل أنت مستعد لتحويل عيادتك؟</h2>
          <p className="text-xl text-blue-100 mb-8">
            انضم إلى أكثر من 300 عيادة تستخدم نظامنا لزيادة الكفاءة وتحسين رعاية المرضى
          </p>
          <button 
            onClick={() => router.push('/dashboard?type=clinic')}
            className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition"
          >
            ابدأ التجربة المجانية
          </button>
        </div>
      </section>
    </div>
  );
}
