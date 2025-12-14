
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, CheckCircle, Loader2, RefreshCcw } from 'lucide-react';

const ContactView: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
    }, 1500);
  };

  const handleReset = () => {
    setIsSent(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-in fade-in duration-500">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-ray-black mb-4">تواصل معنا</h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
          فريق خدمة العملاء جاهز للرد على استفساراتك ومساعدتك في أي وقت.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {/* Contact Cards */}
        <div className="bg-blue-50 p-8 rounded-3xl text-center border border-blue-100 hover:shadow-lg transition">
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-ray-blue shadow-sm">
            <Phone className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-xl mb-2">اتصل بنا</h3>
          <p className="text-gray-600 mb-4">متاحين يومياً من 9 ص - 10 م</p>
          <a href="tel:16XXX" className="text-2xl font-black text-ray-blue dir-ltr block hover:scale-105 transition">16XXX</a>
        </div>

        <div className="bg-orange-50 p-8 rounded-3xl text-center border border-orange-100 hover:shadow-lg transition">
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-orange-600 shadow-sm">
            <Mail className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-xl mb-2">راسلنا</h3>
          <p className="text-gray-600 mb-4">للشكاوى والمقترحات</p>
          <a href="mailto:support@ray.app" className="text-xl font-bold text-orange-600 hover:underline">support@ray.app</a>
        </div>

        <div className="bg-green-50 p-8 rounded-3xl text-center border border-green-100 hover:shadow-lg transition">
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-green-600 shadow-sm">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-xl mb-2">شات مباشر</h3>
          <p className="text-gray-600 mb-4">تحدث مع فريق الدعم</p>
          <button className="bg-green-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-green-700 transition shadow-md">
            ابدأ المحادثة
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Form */}
        <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 relative overflow-hidden h-[500px] flex flex-col">
          {isSent ? (
             <div className="absolute inset-0 bg-white z-10 flex flex-col items-center justify-center text-center p-8 animate-in fade-in">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
                   <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-3">تم استلام رسالتك!</h3>
                <p className="text-gray-500 mb-8 max-w-xs">شكراً لتواصلك معنا. سيقوم أحد ممثلي خدمة العملاء بالرد عليك في أقرب وقت ممكن.</p>
                <button 
                  onClick={handleReset} 
                  className="text-ray-blue bg-blue-50 hover:bg-blue-100 font-bold py-3 px-6 rounded-xl transition flex items-center gap-2"
                >
                  <RefreshCcw className="w-4 h-4" />
                  إرسال رسالة أخرى
                </button>
             </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Send className="w-6 h-6 text-ray-gold" />
                أرسل لنا رسالة
              </h2>
              <form className="space-y-4 flex-1 flex flex-col" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">الاسم</label>
                    <input type="text" required className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-ray-blue transition" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">رقم الهاتف</label>
                    <input type="tel" required className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-ray-blue transition" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">البريد الإلكتروني</label>
                  <input type="email" required className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-ray-blue transition" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">الموضوع</label>
                  <select className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-ray-blue transition">
                    <option>استفسار عام</option>
                    <option>مشكلة فنية</option>
                    <option>شكوى</option>
                    <option>اقتراح</option>
                    <option>شراكة أعمال</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-bold text-gray-700 mb-1">الرسالة</label>
                  <textarea required className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-ray-blue transition h-full resize-none"></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-ray-blue text-white py-4 rounded-xl font-bold hover:bg-blue-900 transition shadow-lg flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'إرسال الرسالة'}
                </button>
              </form>
            </>
          )}
        </div>

        {/* Map Info */}
        <div className="space-y-8">
          <div className="bg-gray-100 rounded-3xl h-80 w-full overflow-hidden relative shadow-inner">
             {/* Placeholder for Map */}
             <div className="absolute inset-0 flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30"></div>
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white px-6 py-3 rounded-full shadow-xl flex items-center gap-2 animate-bounce">
                   <MapPin className="w-5 h-5 text-red-500" />
                   <span className="font-bold text-gray-800">مقرنا الرئيسي</span>
                </div>
             </div>
          </div>
          
          <div className="space-y-4">
             <h3 className="text-xl font-bold border-r-4 border-ray-gold pr-3">زيارتك تشرفنا</h3>
             <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-gray-400 mt-1" />
                <div>
                   <p className="font-bold text-gray-800">القاهرة الجديدة، التجمع الخامس</p>
                   <p className="text-gray-600 text-sm mt-1">كايرو بيزنس بارك، مبنى B2، الدور الثالث</p>
                </div>
             </div>
             <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-gray-400 mt-1" />
                <div>
                   <p className="font-bold text-gray-800">ساعات العمل</p>
                   <p className="text-gray-600 text-sm mt-1">الأحد - الخميس: 9:00 ص - 6:00 م</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactView;
