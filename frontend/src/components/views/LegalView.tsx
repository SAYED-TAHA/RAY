
import React from 'react';
import { ScrollText, ShieldCheck, ArrowRight } from 'lucide-react';

interface LegalViewProps {
  type: 'terms' | 'privacy';
  onBack?: () => void;
}

const LegalView: React.FC<LegalViewProps> = ({ type, onBack }) => {
  const isTerms = type === 'terms';
  
  return (
    <div className="min-h-screen bg-gray-50 animate-in fade-in duration-500 pb-20">
      <div className="bg-white shadow-sm sticky top-0 z-30 px-4 h-16 flex items-center">
         <div className="max-w-4xl mx-auto w-full flex items-center gap-4">
            {onBack && (
               <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full text-gray-600">
                  <ArrowRight className="w-5 h-5" />
               </button>
            )}
            <h1 className="font-bold text-xl text-gray-900 flex items-center gap-2">
               {isTerms ? <ScrollText className="w-6 h-6 text-ray-blue" /> : <ShieldCheck className="w-6 h-6 text-green-600" />}
               {isTerms ? 'الشروط والأحكام' : 'سياسة الخصوصية'}
            </h1>
         </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
         <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12 text-gray-700 leading-relaxed space-y-8">
            <div>
               <p className="text-sm text-gray-400 mb-2">آخر تحديث: 20 نوفمبر 2025</p>
               <p>
                  مرحباً بك في منصة راي (RAY). {isTerms ? 'يرجى قراءة الشروط والأحكام التالية بعناية قبل استخدام خدماتنا.' : 'نحن نولي اهتماماً كبيراً لخصوصيتك وأمان بياناتك.'}
               </p>
            </div>

            {isTerms ? (
               <>
                  <section>
                     <h3 className="text-xl font-bold text-ray-black mb-3">1. قبول الشروط</h3>
                     <p>بوصولك إلى منصة راي واستخدامها، فإنك توافق على الالتزام بهذه الشروط والأحكام وجميع القوانين واللوائح المعمول بها. إذا كنت لا توافق على أي من هذه الشروط، فيحظر عليك استخدام أو الوصول إلى هذا الموقع.</p>
                  </section>
                  <section>
                     <h3 className="text-xl font-bold text-ray-black mb-3">2. ترخيص الاستخدام</h3>
                     <p>يتم منح إذن لتنزيل نسخة واحدة مؤقتة من المواد (المعلومات أو البرامج) على موقع راي للعرض الشخصي وغير التجاري العابر فقط. هذا هو منح ترخيص، وليس نقل ملكية.</p>
                  </section>
                  <section>
                     <h3 className="text-xl font-bold text-ray-black mb-3">3. حسابات المستخدمين</h3>
                     <p>عند إنشاء حساب معنا، يجب عليك تزويدنا بمعلومات دقيقة وكاملة وحديثة في جميع الأوقات. عدم القيام بذلك يشكل خرقاً للشروط، مما قد يؤدي إلى الإنهاء الفوري لحسابك على خدمتنا.</p>
                  </section>
                  <section>
                     <h3 className="text-xl font-bold text-ray-black mb-3">4. المسؤولية</h3>
                     <p>لا تتحمل راي أو موردوها بأي حال من الأحوال المسؤولية عن أي أضرار (بما في ذلك، دون حصر، الأضرار الناجمة عن فقدان البيانات أو الأرباح، أو بسبب انقطاع الأعمال) الناشئة عن استخدام أو عدم القدرة على استخدام المواد على موقع راي.</p>
                  </section>
               </>
            ) : (
               <>
                  <section>
                     <h3 className="text-xl font-bold text-ray-black mb-3">1. المعلومات التي نجمعها</h3>
                     <p>نقوم بجمع أنواع مختلفة من المعلومات لأغراض متنوعة لتوفير وتحسين خدماتنا لك. قد تتضمن البيانات الشخصية الاسم، البريد الإلكتروني، رقم الهاتف، والعنوان.</p>
                  </section>
                  <section>
                     <h3 className="text-xl font-bold text-ray-black mb-3">2. استخدام البيانات</h3>
                     <p>تستخدم راي البيانات التي تم جمعها لأغراض مختلفة: لتوفير وصيانة الخدمة، لإعلامك بالتغييرات في خدمتنا، للسماح لك بالمشاركة في الميزات التفاعلية، ولتوفير الدعم للعملاء.</p>
                  </section>
                  <section>
                     <h3 className="text-xl font-bold text-ray-black mb-3">3. أمن البيانات</h3>
                     <p>أمان بياناتك مهم بالنسبة لنا، ولكن تذكر أنه لا توجد طريقة نقل عبر الإنترنت أو طريقة تخزين إلكتروني آمنة بنسبة 100%. بينما نسعى جاهدين لاستخدام وسائل مقبولة تجارياً لحماية بياناتك الشخصية، لا يمكننا ضمان أمانها المطلق.</p>
                  </section>
                  <section>
                     <h3 className="text-xl font-bold text-ray-black mb-3">4. حقوقك</h3>
                     <p>تهدف راي إلى اتخاذ خطوات معقولة للسماح لك بتصحيح أو تعديل أو حذف أو الحد من استخدام بياناتك الشخصية. إذا كنت ترغب في معرفة البيانات الشخصية التي نحتفظ بها عنك، يرجى الاتصال بنا.</p>
                  </section>
               </>
            )}
         </div>
      </div>
    </div>
  );
};

export default LegalView;
