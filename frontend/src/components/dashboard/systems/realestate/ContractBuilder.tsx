
import React, { useState } from 'react';
import { 
  FileText, Printer, Save, Home, User, Calendar, 
  DollarSign, PenTool, CheckCircle
} from 'lucide-react';

const ContractBuilder: React.FC = () => {
  const [contractType, setContractType] = useState<'sale' | 'rent'>('sale');
  const [isPreview, setIsPreview] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    firstParty: '', // Seller/Landlord
    firstPartyId: '',
    secondParty: '', // Buyer/Tenant
    secondPartyId: '',
    propertyAddress: '',
    propertyArea: '',
    totalPrice: '',
    advancePayment: '',
    installments: '',
    handoverDate: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveDraft = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  if (isPreview) {
    return (
      <div className="max-w-4xl mx-auto bg-white p-12 shadow-2xl rounded-sm animate-in zoom-in-95 duration-300 min-h-[800px] relative print:shadow-none print:w-full print:m-0 text-black">
        {/* Controls */}
        <div className="absolute top-0 -right-16 flex flex-col gap-2 print:hidden">
           <button onClick={() => window.print()} className="bg-green-700 text-white p-3 rounded-full shadow-lg hover:bg-green-800 tooltip" title="طباعة">
             <Printer className="w-6 h-6" />
           </button>
           <button onClick={() => setIsPreview(false)} className="bg-gray-600 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 tooltip" title="تعديل">
             <FileText className="w-6 h-6" />
           </button>
        </div>

        <div className="text-center mb-12 border-b-2 border-black pb-6">
           <h1 className="text-3xl font-black mb-2">
             {contractType === 'sale' ? 'عقد بيع ابتدائي' : 'عقد إيجار وحدة سكنية'}
           </h1>
           <p className="text-sm">تحرر هذا العقد بتاريخ: <span className="font-bold">{formData.date}</span></p>
        </div>

        <div className="space-y-8 leading-relaxed text-justify">
           <p>
             إنه في يوم <span className="font-bold">{formData.date}</span>، تم الاتفاق والتراضي بين كل من:
           </p>

           <div className="bg-gray-50 p-4 rounded border border-gray-200">
              <p className="mb-2">
                 <span className="font-bold underline">أولاً (الطرف الأول):</span> السيد/ <span className="font-bold">{formData.firstParty}</span>،
                 بطاقة رقم قومي: <span className="font-mono font-bold">{formData.firstPartyId}</span>.
                 <br/>
                 <span className="text-sm text-gray-500">({contractType === 'sale' ? 'البائع' : 'المؤجر'})</span>
              </p>
              <p>
                 <span className="font-bold underline">ثانياً (الطرف الثاني):</span> السيد/ <span className="font-bold">{formData.secondParty}</span>،
                 بطاقة رقم قومي: <span className="font-mono font-bold">{formData.secondPartyId}</span>.
                 <br/>
                 <span className="text-sm text-gray-500">({contractType === 'sale' ? 'المشتري' : 'المستأجر'})</span>
              </p>
           </div>

           <div>
              <h3 className="font-bold text-lg mb-2 underline">البند الأول: موضوع العقد</h3>
              <p>
                 باع وأسقط وتنازل (أو أجر) الطرف الأول للطرف الثاني القابل لذلك، ما هو الوحدة الكائنة في:
                 <br/>
                 <span className="font-bold">{formData.propertyAddress}</span>.
                 <br/>
                 وتبلغ مساحتها الإجمالية <span className="font-bold">{formData.propertyArea} متر مربع</span> تقريباً.
              </p>
           </div>

           <div>
              <h3 className="font-bold text-lg mb-2 underline">البند الثاني: الثمن وطريقة الدفع</h3>
              <p>
                 تم هذا البيع (أو الإيجار) نظير مبلغ إجمالي وقدره <span className="font-bold">{formData.totalPrice} جنيه مصري</span>.
                 <br/>
                 دفع الطرف الثاني مبلغ <span className="font-bold">{formData.advancePayment} جنيه مصري</span> عند التوقيع.
                 {formData.installments && (
                   <>
                     <br/>
                     والباقي يسدد على أقساط كالتالي: <span className="font-bold">{formData.installments}</span>.
                   </>
                 )}
              </p>
           </div>

           <div>
              <h3 className="font-bold text-lg mb-2 underline">البند الثالث: التسليم</h3>
              <p>
                 اتفق الطرفان على أن يكون تاريخ تسليم الوحدة هو: <span className="font-bold">{formData.handoverDate}</span>.
              </p>
           </div>

           <div className="pt-12 flex justify-between">
              <div className="text-center w-1/3">
                 <p className="font-bold mb-8">الطرف الأول</p>
                 <div className="border-t border-black w-full"></div>
              </div>
              <div className="text-center w-1/3">
                 <p className="font-bold mb-8">الطرف الثاني</p>
                 <div className="border-t border-black w-full"></div>
              </div>
           </div>
           
           <div className="text-center w-1/3 mx-auto mt-8">
              <p className="font-bold mb-8">الشهود</p>
              <div className="border-t border-black w-full"></div>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full space-y-6 animate-in fade-in slide-in-from-bottom-2 relative">
      
      {/* Success Toast */}
      {showSuccess && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2 z-50">
          <CheckCircle className="w-5 h-5" />
          <span className="font-bold">تم حفظ مسودة العقد بنجاح</span>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <PenTool className="w-6 h-6 text-green-700" />
            محرر العقود الذكي
          </h2>
          <p className="text-sm text-gray-500">إنشاء عقود بيع وإيجار قانونية</p>
        </div>
        <div className="flex gap-2">
           <button 
             onClick={handleSaveDraft}
             className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-50 flex items-center gap-2"
           >
             <Save className="w-4 h-4" />
             حفظ مسودة
           </button>
           <button 
             onClick={() => setIsPreview(true)}
             className="px-6 py-2 bg-green-700 text-white rounded-xl font-bold text-sm hover:bg-green-800 shadow-lg shadow-green-200 flex items-center gap-2"
           >
             <Printer className="w-4 h-4" />
             معاينة وطباعة
           </button>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 overflow-y-auto">
         {/* Type Selector */}
         <div className="flex gap-4 mb-8 border-b border-gray-100 pb-6">
            <label className={`flex-1 cursor-pointer p-4 rounded-xl border-2 flex items-center gap-3 transition ${contractType === 'sale' ? 'border-green-600 bg-green-50 text-green-800' : 'border-gray-100 hover:border-green-200'}`}>
               <input type="radio" name="type" className="hidden" checked={contractType === 'sale'} onChange={() => setContractType('sale')} />
               <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${contractType === 'sale' ? 'border-green-600' : 'border-gray-300'}`}>
                  {contractType === 'sale' && <div className="w-3 h-3 bg-green-600 rounded-full" />}
               </div>
               <span className="font-bold text-lg">عقد بيع نهائي/ابتدائي</span>
            </label>
            <label className={`flex-1 cursor-pointer p-4 rounded-xl border-2 flex items-center gap-3 transition ${contractType === 'rent' ? 'border-green-600 bg-green-50 text-green-800' : 'border-gray-100 hover:border-green-200'}`}>
               <input type="radio" name="type" className="hidden" checked={contractType === 'rent'} onChange={() => setContractType('rent')} />
               <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${contractType === 'rent' ? 'border-green-600' : 'border-gray-300'}`}>
                  {contractType === 'rent' && <div className="w-3 h-3 bg-green-600 rounded-full" />}
               </div>
               <span className="font-bold text-lg">عقد إيجار</span>
            </label>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Parties Info */}
            <div className="space-y-6">
               <h3 className="font-bold text-gray-800 border-r-4 border-green-600 pr-2">أطراف العقد</h3>
               
               <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-4">
                  <div className="space-y-1">
                     <label className="text-xs font-bold text-gray-500">الطرف الأول ({contractType === 'sale' ? 'البائع' : 'المؤجر'})</label>
                     <div className="relative">
                        <User className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
                        <input 
                          type="text" 
                          name="firstParty"
                          value={formData.firstParty}
                          onChange={handleChange}
                          className="w-full bg-white border border-gray-200 rounded-lg py-2 pr-10 pl-4 text-sm focus:border-green-500 outline-none"
                          placeholder="الاسم رباعي"
                        />
                     </div>
                  </div>
                  <div className="space-y-1">
                     <label className="text-xs font-bold text-gray-500">رقم القومي</label>
                     <input 
                       type="text" 
                       name="firstPartyId"
                       value={formData.firstPartyId}
                       onChange={handleChange}
                       className="w-full bg-white border border-gray-200 rounded-lg p-2 text-sm focus:border-green-500 outline-none"
                       placeholder="14 رقم"
                     />
                  </div>
               </div>

               <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-4">
                  <div className="space-y-1">
                     <label className="text-xs font-bold text-gray-500">الطرف الثاني ({contractType === 'sale' ? 'المشتري' : 'المستأجر'})</label>
                     <div className="relative">
                        <User className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
                        <input 
                          type="text" 
                          name="secondParty"
                          value={formData.secondParty}
                          onChange={handleChange}
                          className="w-full bg-white border border-gray-200 rounded-lg py-2 pr-10 pl-4 text-sm focus:border-green-500 outline-none"
                          placeholder="الاسم رباعي"
                        />
                     </div>
                  </div>
                  <div className="space-y-1">
                     <label className="text-xs font-bold text-gray-500">رقم القومي</label>
                     <input 
                       type="text" 
                       name="secondPartyId"
                       value={formData.secondPartyId}
                       onChange={handleChange}
                       className="w-full bg-white border border-gray-200 rounded-lg p-2 text-sm focus:border-green-500 outline-none"
                       placeholder="14 رقم"
                     />
                  </div>
               </div>
            </div>

            {/* Property & Financial Info */}
            <div className="space-y-6">
               <h3 className="font-bold text-gray-800 border-r-4 border-green-600 pr-2">تفاصيل الوحدة والماليات</h3>
               
               <div className="space-y-4">
                  <div className="space-y-1">
                     <label className="text-xs font-bold text-gray-500">عنوان الوحدة بالكامل</label>
                     <div className="relative">
                        <Home className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
                        <input 
                          type="text" 
                          name="propertyAddress"
                          value={formData.propertyAddress}
                          onChange={handleChange}
                          className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 pr-10 pl-4 text-sm focus:border-green-500 outline-none"
                          placeholder="المحافظة - الحي - الشارع - رقم العمارة/الشقة"
                        />
                     </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500">المساحة (م2)</label>
                        <input 
                          type="number" 
                          name="propertyArea"
                          value={formData.propertyArea}
                          onChange={handleChange}
                          className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm focus:border-green-500 outline-none"
                        />
                     </div>
                     <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500">تاريخ التسليم</label>
                        <div className="relative">
                           <Calendar className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
                           <input 
                             type="date" 
                             name="handoverDate"
                             value={formData.handoverDate}
                             onChange={handleChange}
                             className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 pr-10 pl-4 text-sm focus:border-green-500 outline-none"
                           />
                        </div>
                     </div>
                  </div>
                  
                  <div className="p-4 bg-green-50/50 rounded-xl border border-green-100 space-y-4 mt-4">
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                           <label className="text-xs font-bold text-green-700">إجمالي السعر</label>
                           <div className="relative">
                              <DollarSign className="absolute right-3 top-2.5 w-4 h-4 text-green-600" />
                              <input 
                                type="text" 
                                name="totalPrice"
                                value={formData.totalPrice}
                                onChange={handleChange}
                                className="w-full bg-white border border-green-200 rounded-lg py-2 pr-10 pl-4 text-sm font-bold text-green-800 focus:border-green-500 outline-none"
                                placeholder="0.00"
                              />
                           </div>
                        </div>
                        <div className="space-y-1">
                           <label className="text-xs font-bold text-green-700">المقدم / التأمين</label>
                           <input 
                             type="text" 
                             name="advancePayment"
                             value={formData.advancePayment}
                             onChange={handleChange}
                             className="w-full bg-white border border-green-200 rounded-lg py-2 px-4 text-sm font-bold text-green-800 focus:border-green-500 outline-none"
                             placeholder="0.00"
                           />
                        </div>
                     </div>
                     <div className="space-y-1">
                        <label className="text-xs font-bold text-green-700">تفاصيل الأقساط (اختياري)</label>
                        <input 
                          type="text" 
                          name="installments"
                          value={formData.installments}
                          onChange={handleChange}
                          className="w-full bg-white border border-green-200 rounded-lg p-2 text-sm text-gray-700 focus:border-green-500 outline-none"
                          placeholder="مثال: 10,000 شهرياً لمدة سنة"
                        />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default ContractBuilder;
