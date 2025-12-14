
import React, { useState } from 'react';
import { Search, ChevronDown, HelpCircle, Store, ShoppingBag, Shield } from 'lucide-react';

const faqs = [
  { id: 1, category: 'generic', q: 'كيف يمكنني إنشاء حساب على راي؟', a: 'يمكنك إنشاء حساب بسهولة عن طريق الضغط على زر "تسجيل الدخول" في أعلى الصفحة ثم اختيار "إنشاء حساب جديد". يمكنك التسجيل باستخدام بريدك الإلكتروني أو رقم الهاتف.' },
  { id: 2, category: 'merchant', q: 'هل التسجيل كتاجر مجاني؟', a: 'نعم، التسجيل كتاجر على منصة راي مجاني تماماً. لا توجد رسوم اشتراك شهرية أو رسوم تأسيس. نحن نطبق عمولة بسيطة فقط على المبيعات المحققة.' },
  { id: 3, category: 'orders', q: 'كيف يمكنني تتبع طلبي؟', a: 'بعد إتمام الطلب، يمكنك الذهاب إلى "حسابي" ثم "طلباتي" وستجد حالة كل طلب بالتفصيل، ويمكنك تتبع المندوب على الخريطة.' },
  { id: 4, category: 'merchant', q: 'كيف أستلم أرباحي كتاجر؟', a: 'يتم تحويل أرباحك أسبوعياً إلى حسابك البنكي أو محفظتك الإلكترونية المسجلة لدينا بعد خصم نسبة العمولة.' },
  { id: 5, category: 'generic', q: 'نسيت كلمة المرور، ماذا أفعل؟', a: 'اضغط على "نسيت كلمة المرور" في صفحة تسجيل الدخول، وسنرسل لك رمز التحقق على هاتفك أو بريدك لإعادة تعيين كلمة مرور جديدة.' },
  { id: 6, category: 'orders', q: 'ما هي سياسة الاسترجاع؟', a: 'تختلف سياسة الاسترجاع حسب التاجر، ولكن بشكل عام يضمن راي حقك في استرجاع المنتج إذا كان تالفاً أو غير مطابق للمواصفات خلال 14 يوم.' },
];

interface HelpCenterProps {
  onNavigate?: (view: string) => void;
}

const HelpCenterView: React.FC<HelpCenterProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [search, setSearch] = useState('');

  const filteredFaqs = faqs.filter(f => 
    (activeTab === 'all' || f.category === activeTab) &&
    (f.q.includes(search) || f.a.includes(search))
  );

  const handleContactClick = () => {
    if (onNavigate) {
      onNavigate('contact');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 animate-in fade-in duration-500 pb-20">
      {/* Header */}
      <div className="bg-ray-blue text-white py-16 px-4 text-center relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
         <h1 className="text-4xl font-black mb-4 relative z-10">كيف يمكننا مساعدتك؟</h1>
         <div className="max-w-2xl mx-auto relative z-10">
            <div className="relative">
               <Search className="absolute right-4 top-3.5 w-6 h-6 text-gray-400" />
               <input 
                 type="text" 
                 placeholder="ابحث عن سؤال أو مشكلة..." 
                 className="w-full py-4 pr-12 pl-4 rounded-2xl text-gray-800 focus:outline-none shadow-lg text-lg"
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
               />
            </div>
         </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
         {/* Categories */}
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
               { id: 'all', label: 'الكل', icon: HelpCircle },
               { id: 'merchant', label: 'للتجار', icon: Store },
               { id: 'orders', label: 'الطلبات', icon: ShoppingBag },
               { id: 'generic', label: 'الحساب والأمان', icon: Shield },
            ].map(cat => (
               <button 
                 key={cat.id}
                 onClick={() => setActiveTab(cat.id)}
                 className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all
                   ${activeTab === cat.id 
                     ? 'bg-white border-ray-blue shadow-md text-ray-blue transform -translate-y-1' 
                     : 'bg-white border-gray-100 text-gray-500 hover:bg-gray-50 hover:text-gray-700'}
                 `}
               >
                  <cat.icon className="w-8 h-8" />
                  <span className="font-bold">{cat.label}</span>
               </button>
            ))}
         </div>

         {/* FAQs */}
         <div className="space-y-4">
            {filteredFaqs.map((faq) => (
               <div 
                 key={faq.id} 
                 className="bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-sm"
               >
                  <button 
                    onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                    className="w-full p-5 flex justify-between items-center text-right font-bold text-gray-800 hover:bg-gray-50"
                  >
                     <span className="text-lg">{faq.q}</span>
                     <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${openFaq === faq.id ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaq === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                     <div className="p-5 pt-0 text-gray-600 leading-relaxed border-t border-gray-50">
                        {faq.a}
                     </div>
                  </div>
               </div>
            ))}
            {filteredFaqs.length === 0 && (
               <div className="text-center py-12 text-gray-400">
                  <p>لم نتمكن من العثور على نتائج لبحثك.</p>
               </div>
            )}
         </div>

         {/* Still Need Help */}
         <div className="mt-16 bg-blue-50 rounded-3xl p-8 text-center border border-blue-100">
            <h3 className="text-2xl font-bold text-ray-blue mb-2">لم تجد ما تبحث عنه؟</h3>
            <p className="text-gray-600 mb-6">فريق الدعم لدينا متاح 24/7 لمساعدتك في أي مشكلة</p>
            <div className="flex justify-center gap-4">
               <button 
                 onClick={handleContactClick}
                 className="bg-ray-blue text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-900 transition"
               >
                 تواصل معنا
               </button>
               <button 
                 onClick={handleContactClick}
                 className="bg-white text-ray-blue border border-ray-blue px-8 py-3 rounded-xl font-bold hover:bg-blue-50 transition"
               >
                 الدردشة المباشرة
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default HelpCenterView;
