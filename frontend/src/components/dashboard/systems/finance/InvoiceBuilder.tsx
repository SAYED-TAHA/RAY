
import React, { useState } from 'react';
import { 
  FileText, Plus, Trash2, Printer, Save, User, Calendar, 
  DollarSign, Calculator, CheckCircle, Image
} from 'lucide-react';

interface InvoiceItem {
  id: number;
  name: string;
  qty: number;
  price: number;
}

const InvoiceBuilder: React.FC = () => {
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
  const [invoiceNumber, setInvoiceNumber] = useState(`INV-${Math.floor(Math.random() * 10000)}`);
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: 1, name: '', qty: 1, price: 0 }
  ]);
  const [taxRate, setTaxRate] = useState(14);
  const [discount, setDiscount] = useState(0);
  const [notes, setNotes] = useState('');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Branding state (simulated for now, ideally comes from settings)
  const [brandColor, setBrandColor] = useState('bg-gray-900'); 

  const addItem = () => {
    setItems([...items, { id: Date.now(), name: '', qty: 1, price: 0 }]);
  };

  const removeItem = (id: number) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateItem = (id: number, field: keyof InvoiceItem, value: string | number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleSaveDraft = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const subtotal = items.reduce((sum, item) => sum + (item.qty * item.price), 0);
  const taxAmount = subtotal * (taxRate / 100);
  const discountAmount = subtotal * (discount / 100);
  const total = subtotal + taxAmount - discountAmount;

  if (isPreviewMode) {
    return (
      <div className="max-w-4xl mx-auto bg-white shadow-2xl animate-in zoom-in-95 duration-300 min-h-[1000px] relative print:shadow-none print:w-full print:m-0 print:h-auto">
        {/* Print Controls */}
        <div className="absolute top-0 -right-16 flex flex-col gap-2 print:hidden">
           <button onClick={() => window.print()} className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 tooltip" title="طباعة">
             <Printer className="w-6 h-6" />
           </button>
           <button onClick={() => setIsPreviewMode(false)} className="bg-gray-600 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 tooltip" title="تعديل">
             <FileText className="w-6 h-6" />
           </button>
        </div>

        {/* Professional Invoice Layout */}
        <div className="flex flex-col h-full p-12">
            {/* Header */}
            <div className="flex justify-between items-start border-b-2 pb-8 mb-8" style={{ borderColor: '#1a1a1a' }}>
               <div className="flex gap-6 items-center">
                  {/* Logo Placeholder */}
                  <div className={`w-20 h-20 ${brandColor} text-white flex items-center justify-center rounded-lg font-black text-3xl shadow-sm print:text-black print:bg-gray-200`}>R</div>
                  <div>
                     <h1 className="text-3xl font-bold text-gray-900">شركة النور</h1>
                     <p className="text-gray-500 mt-1 text-sm">شارع 9، المعادي، القاهرة</p>
                     <p className="text-gray-500 text-sm">info@alnoor.com | +20 123 456 789</p>
                  </div>
               </div>
               <div className="text-right">
                  <h2 className="text-4xl font-black text-gray-200 tracking-widest uppercase mb-2">Invoice</h2>
                  <p className="font-bold text-gray-900 text-lg">#{invoiceNumber}</p>
                  <p className="text-gray-500 text-sm">تاريخ الإصدار: {invoiceDate}</p>
               </div>
            </div>

            {/* Bill To */}
            <div className="mb-12">
               <h3 className="text-gray-400 font-bold text-xs uppercase mb-2 tracking-wider">فاتورة إلى</h3>
               <p className="font-bold text-gray-900 text-xl mb-1">{clientName || 'عميل نقدي'}</p>
               <p className="text-gray-600">{clientPhone}</p>
            </div>

            {/* Items Table */}
            <div className="flex-1">
                <table className="w-full mb-8">
                <thead>
                    <tr className={`text-white text-sm uppercase ${brandColor} print:bg-gray-800`}>
                        <th className="py-3 px-4 text-right font-bold rounded-tr-lg">البند</th>
                        <th className="py-3 px-4 text-center font-bold w-24">الكمية</th>
                        <th className="py-3 px-4 text-center font-bold w-32">السعر</th>
                        <th className="py-3 px-4 text-left font-bold w-32 rounded-tl-lg">الإجمالي</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {items.map((item, idx) => (
                        <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                            <td className="py-4 px-4 text-right font-medium">
                                {item.name}
                                <span className="block text-xs text-gray-400 mt-0.5">وصف مختصر للبند رقم {idx + 1}</span>
                            </td>
                            <td className="py-4 px-4 text-center">{item.qty}</td>
                            <td className="py-4 px-4 text-center">{item.price.toFixed(2)}</td>
                            <td className="py-4 px-4 text-left font-bold">{(item.qty * item.price).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
                </table>
            </div>

            {/* Totals */}
            <div className="flex justify-end mb-12">
               <div className="w-72 bg-gray-50 p-6 rounded-xl">
                  <div className="flex justify-between text-gray-600 text-sm mb-2">
                     <span>المجموع الفرعي</span>
                     <span>{subtotal.toFixed(2)} ج.م</span>
                  </div>
                  <div className="flex justify-between text-gray-600 text-sm mb-2">
                     <span>ضريبة ({taxRate}%)</span>
                     <span>{taxAmount.toFixed(2)} ج.م</span>
                  </div>
                  {discount > 0 && (
                     <div className="flex justify-between text-green-600 text-sm mb-2">
                        <span>خصم ({discount}%)</span>
                        <span>-{discountAmount.toFixed(2)} ج.م</span>
                     </div>
                  )}
                  <div className="border-t border-gray-200 my-3"></div>
                  <div className="flex justify-between text-xl font-black text-gray-900">
                     <span>الإجمالي</span>
                     <span>{total.toFixed(2)} ج.م</span>
                  </div>
               </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 pt-8 mt-auto">
               <div className="flex justify-between items-end">
                   <div className="text-sm text-gray-500 w-2/3">
                       <p className="font-bold text-gray-800 mb-1">ملاحظات وشروط:</p>
                       <p className="italic">{notes || 'شكراً لتعاملكم معنا. يرجى سداد المبلغ المستحق في غضون 14 يوماً.'}</p>
                   </div>
                   <div className="text-center">
                        <div className="font-dancing text-xl text-blue-800 opacity-50 transform -rotate-12 mb-2">Authorized Signature</div>
                        <div className="border-t border-gray-400 w-40 pt-1">
                            <p className="text-xs font-bold text-gray-400 uppercase">توقيع المدير</p>
                        </div>
                   </div>
               </div>
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
          <span className="font-bold">تم حفظ الفاتورة كمسودة</span>
        </div>
      )}

      <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Calculator className="w-6 h-6 text-blue-600" />
            منشئ الفواتير الذكي
          </h2>
          <p className="text-sm text-gray-500">إصدار فاتورة ضريبية احترافية</p>
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
             onClick={() => setIsPreviewMode(true)}
             className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 shadow-lg shadow-blue-200 flex items-center gap-2"
           >
             <Printer className="w-4 h-4" />
             معاينة وطباعة
           </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6">
         {/* Invoice Form */}
         <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 overflow-y-auto">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 pb-6 border-b border-gray-100">
               <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500">رقم الفاتورة</label>
                  <input type="text" value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm font-mono font-bold" />
               </div>
               <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500">تاريخ الإصدار</label>
                  <div className="relative">
                     <Calendar className="absolute right-2 top-2 w-4 h-4 text-gray-400" />
                     <input type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 pr-8 text-sm font-bold" />
                  </div>
               </div>
               <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500">الحالة</label>
                  <select className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm font-bold text-green-600">
                     <option>مدفوعة</option>
                     <option>مستحقة الدفع</option>
                     <option>مسودة</option>
                  </select>
               </div>
            </div>

            {/* Client Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
               <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500">اسم العميل</label>
                  <div className="relative">
                     <User className="absolute right-2 top-2.5 w-4 h-4 text-gray-400" />
                     <input type="text" placeholder="اسم العميل" value={clientName} onChange={(e) => setClientName(e.target.value)} className="w-full bg-white border border-gray-200 rounded-lg p-2 pr-8 text-sm focus:border-blue-500 outline-none" />
                  </div>
               </div>
               <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500">رقم الهاتف</label>
                  <input type="tel" placeholder="01xxxxxxxxx" value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} className="w-full bg-white border border-gray-200 rounded-lg p-2 text-sm focus:border-blue-500 outline-none" />
               </div>
            </div>

            {/* Items */}
            <div className="mb-8">
               <h3 className="font-bold text-gray-800 mb-3">البنود</h3>
               <div className="space-y-2">
                  {items.map((item, index) => (
                     <div key={item.id} className="flex flex-col md:flex-row gap-2 items-start md:items-center p-3 bg-gray-50 rounded-xl border border-gray-100 group">
                        <span className="text-xs font-bold text-gray-400 w-6 pt-2 md:pt-0">{index + 1}</span>
                        <input 
                          type="text" 
                          placeholder="اسم المنتج / الخدمة" 
                          className="flex-1 bg-white border border-gray-200 rounded-lg p-2 text-sm focus:border-blue-500 outline-none w-full"
                          value={item.name}
                          onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                        />
                        <div className="flex gap-2 w-full md:w-auto">
                           <input 
                             type="number" 
                             placeholder="الكمية" 
                             className="w-20 bg-white border border-gray-200 rounded-lg p-2 text-sm text-center outline-none"
                             value={item.qty}
                             onChange={(e) => updateItem(item.id, 'qty', Number(e.target.value))}
                           />
                           <input 
                             type="number" 
                             placeholder="السعر" 
                             className="w-24 bg-white border border-gray-200 rounded-lg p-2 text-sm text-center outline-none"
                             value={item.price}
                             onChange={(e) => updateItem(item.id, 'price', Number(e.target.value))}
                           />
                           <div className="w-24 p-2 bg-gray-200 rounded-lg text-sm font-bold text-center text-gray-700">
                              {(item.qty * item.price).toFixed(0)}
                           </div>
                           <button onClick={() => removeItem(item.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition">
                              <Trash2 className="w-4 h-4" />
                           </button>
                        </div>
                     </div>
                  ))}
               </div>
               <button onClick={addItem} className="mt-3 flex items-center gap-2 text-sm font-bold text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition">
                  <Plus className="w-4 h-4" />
                  إضافة بند آخر
               </button>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500">ملاحظات</label>
                <textarea 
                  className="w-full bg-white border border-gray-200 rounded-xl p-3 text-sm focus:border-blue-500 outline-none h-24 resize-none"
                  placeholder="أضف شروط الدفع أو ملاحظات للعميل..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                ></textarea>
            </div>
         </div>

         {/* Totals Sidebar */}
         <div className="w-full lg:w-80 bg-gray-50 rounded-2xl border border-gray-200 p-6 h-fit">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
               <DollarSign className="w-5 h-5 text-green-600" />
               ملخص الحساب
            </h3>
            <div className="space-y-4">
               <div className="flex justify-between text-sm text-gray-600">
                  <span>المجموع الفرعي</span>
                  <span className="font-bold">{subtotal.toFixed(2)}</span>
               </div>
               
               <div className="space-y-1">
                  <div className="flex justify-between text-sm text-gray-600">
                     <span>الضريبة (%)</span>
                     <span className="font-bold">{taxAmount.toFixed(2)}</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="30" 
                    value={taxRate} 
                    onChange={(e) => setTaxRate(Number(e.target.value))}
                    className="w-full accent-blue-600 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="text-right text-xs text-gray-400">{taxRate}%</div>
               </div>

               <div className="space-y-1">
                  <div className="flex justify-between text-sm text-gray-600">
                     <span>الخصم (%)</span>
                     <span className="font-bold text-red-500">-{discountAmount.toFixed(2)}</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="50" 
                    value={discount} 
                    onChange={(e) => setDiscount(Number(e.target.value))}
                    className="w-full accent-red-500 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="text-right text-xs text-gray-400">{discount}%</div>
               </div>

               <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                     <span className="font-bold text-gray-800">الإجمالي المستحق</span>
                     <span className="font-black text-2xl text-blue-900">{total.toFixed(2)} <span className="text-xs font-medium text-gray-500">ج.م</span></span>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default InvoiceBuilder;
