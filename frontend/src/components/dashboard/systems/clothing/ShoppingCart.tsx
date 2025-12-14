

import React, { useState } from 'react';
import { ShoppingBag, Trash2, Plus, Minus, CreditCard, Printer, Share2, FileText, Download, Send, X } from 'lucide-react';
import { ClothingItem } from './ProductGrid';

export interface CartItem {
  product: ClothingItem;
  size: string;
  color: string;
  qty: number;
  uniqueId: string; // combination of id+size+color
}

interface Props {
  cart: CartItem[];
  updateQty: (uniqueId: string, delta: number) => void;
  removeFromCart: (uniqueId: string) => void;
  onCheckout: () => void;
}

const ShoppingCart: React.FC<Props> = ({ cart, updateQty, removeFromCart, onCheckout }) => {
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: ''
  });
  
  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.qty), 0);
  const tax = subtotal * 0.14;
  const total = subtotal + tax;

  // Generate invoice data
  const generateInvoiceData = () => {
    const invoiceNumber = `INV-${Date.now()}`;
    const date = new Date().toLocaleDateString('ar-EG');
    
    return {
      invoiceNumber,
      date,
      customer: customerInfo,
      items: cart.map(item => ({
        name: item.product.name,
        size: item.size,
        color: item.color,
        qty: item.qty,
        price: item.product.price,
        total: item.product.price * item.qty
      })),
      subtotal,
      tax,
      total
    };
  };

  // Print invoice
  const printInvoice = () => {
    const invoice = generateInvoiceData();
    const printWindow = window.open('', '_blank');
    
    if (!printWindow) {
      alert('يرجى السماح بالنوافذ المنبثقة لطباعة الفاتورة');
      return;
    }
    
    const printContent = `
      <html dir="rtl" lang="ar">
        <head>
          <title>فاتورة رقم ${invoice.invoiceNumber}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; direction: rtl; }
            .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px; }
            .customer-info { margin-bottom: 20px; }
            .items-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            .items-table th, .items-table td { border: 1px solid #ddd; padding: 8px; text-align: right; }
            .items-table th { background-color: #f4f4f4; }
            .totals { text-align: left; margin-top: 20px; }
            .footer { margin-top: 30px; text-align: center; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>فاتورة بيع</h1>
            <p>رقم الفاتورة: ${invoice.invoiceNumber}</p>
            <p>التاريخ: ${invoice.date}</p>
          </div>
          
          <div class="customer-info">
            <h3>بيانات العميل</h3>
            <p><strong>الاسم:</strong> ${invoice.customer.name || 'عميل نقدي'}</p>
            <p><strong>الهاتف:</strong> ${invoice.customer.phone || '-'}</p>
            <p><strong>العنوان:</strong> ${invoice.customer.address || '-'}</p>
          </div>
          
          <table class="items-table">
            <thead>
              <tr>
                <th>المنتج</th>
                <th>المقاس</th>
                <th>اللون</th>
                <th>الكمية</th>
                <th>السعر</th>
                <th>الإجمالي</th>
              </tr>
            </thead>
            <tbody>
              ${invoice.items.map(item => `
                <tr>
                  <td>${item.name}</td>
                  <td>${item.size}</td>
                  <td><span style="display: inline-block; width: 20px; height: 20px; background-color: ${item.color}; border: 1px solid #ccc;"></span></td>
                  <td>${item.qty}</td>
                  <td>${item.price} ج</td>
                  <td>${item.total} ج</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          
          <div class="totals">
            <p><strong>المجموع الفرعي:</strong> ${invoice.subtotal.toFixed(2)} ج</p>
            <p><strong>الضريبة (14%):</strong> ${invoice.tax.toFixed(2)} ج</p>
            <p><strong>الإجمالي:</strong> ${invoice.total.toFixed(2)} ج</p>
          </div>
          
          <div class="footer">
            <p>شكراً لتعاملكم معنا</p>
          </div>
        </body>
      </html>
    `;
    
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  // Send via WhatsApp
  const sendViaWhatsApp = () => {
    const invoice = generateInvoiceData();
    const message = `
🧾 *فاتورة رقم ${invoice.invoiceNumber}*
📅 التاريخ: ${invoice.date}

👤 *بيانات العميل:*
${customerInfo.name || 'عميل نقدي'}
📞 ${customerInfo.phone || '-'}
📍 ${customerInfo.address || '-'}

📦 *المنتجات:*
${invoice.items.map(item => 
  `• ${item.name} (${item.size}) - ${item.qty} × ${item.price} = ${item.total} ج`
).join('\n')}

💰 *الإجماليات:*
المجموع: ${invoice.subtotal.toFixed(2)} ج
الضريبة: ${invoice.tax.toFixed(2)} ج
الإجمالي: ${invoice.total.toFixed(2)} ج

شكراً لتعاملكم معنا! 🙏
    `.trim();
    
    const whatsappUrl = `https://wa.me/${customerInfo.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Download invoice as PDF (simplified - would need a PDF library for full implementation)
  const downloadInvoice = () => {
    const invoice = generateInvoiceData();
    const dataStr = JSON.stringify(invoice, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `invoice-${invoice.invoiceNumber}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 flex flex-col h-full overflow-hidden">
      <div className="p-5 bg-gray-900 text-white flex justify-between items-center">
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-pink-500" />
          <h2 className="font-bold text-lg">سلة المشتريات</h2>
        </div>
        <span className="bg-pink-600 text-white text-xs font-bold px-2 py-1 rounded-full">
          {cart.reduce((acc, item) => acc + item.qty, 0)} قطع
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {cart.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-60">
            <ShoppingBag className="w-16 h-16 mb-4" />
            <p>السلة فارغة</p>
            <p className="text-xs mt-1">أضف منتجات من المعرض</p>
          </div>
        ) : (
          <div className="space-y-3">
            {cart.map(item => (
              <div key={item.uniqueId} className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex items-start gap-3 animate-in slide-in-from-right-2">
                <img src={item.product.image} alt={item.product.name} className="w-14 h-16 rounded-lg object-cover bg-gray-100" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm text-gray-800 truncate">{item.product.name}</h4>
                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                    <span className="bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">{item.size}</span>
                    <span className="w-3 h-3 rounded-full border border-gray-200" style={{ backgroundColor: item.color }}></span>
                  </div>
                  <p className="text-pink-600 font-bold text-sm mt-1">{item.product.price * item.qty} ج</p>
                </div>
                <div className="flex flex-col items-end justify-between self-stretch">
                  <button 
                    onClick={() => removeFromCart(item.uniqueId)}
                    className="text-gray-300 hover:text-red-500 transition p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-0.5">
                    <button onClick={() => updateQty(item.uniqueId, -1)} className="w-5 h-5 flex items-center justify-center hover:bg-white rounded transition"><Minus className="w-3 h-3" /></button>
                    <span className="w-4 text-center text-xs font-bold">{item.qty}</span>
                    <button onClick={() => updateQty(item.uniqueId, 1)} className="w-5 h-5 flex items-center justify-center hover:bg-white rounded transition"><Plus className="w-3 h-3" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-5 bg-white border-t border-gray-100 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] z-10">
        <div className="space-y-2 mb-4 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>المجموع الفرعي</span>
            <span>{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>الضريبة (14%)</span>
            <span>{tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xl font-black text-gray-900 pt-2 border-t border-dashed border-gray-200">
            <span>الإجمالي</span>
            <span>{total.toFixed(2)} ج.م</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <button 
            onClick={() => setShowInvoiceModal(true)}
            disabled={cart.length === 0}
            className="w-full py-3 bg-pink-600 text-white rounded-xl font-bold hover:bg-pink-700 transition shadow-lg shadow-pink-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FileText className="w-5 h-5" />
            إنشاء فاتورة
          </button>
          
          <div className="grid grid-cols-3 gap-2">
            <button 
              onClick={printInvoice}
              disabled={cart.length === 0}
              className="py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition flex items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
              title="طباعة الفاتورة"
            >
              <Printer className="w-4 h-4" />
              <span className="text-xs">طباعة</span>
            </button>
            
            <button 
              onClick={sendViaWhatsApp}
              disabled={cart.length === 0 || !customerInfo.phone}
              className="py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition flex items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
              title="إرسال عبر واتساب"
            >
              <Share2 className="w-4 h-4" />
              <span className="text-xs">واتساب</span>
            </button>
            
            <button 
              onClick={downloadInvoice}
              disabled={cart.length === 0}
              className="py-2 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition flex items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
              title="تحميل الفاتورة"
            >
              <Download className="w-4 h-4" />
              <span className="text-xs">تحميل</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Invoice Modal */}
      {showInvoiceModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-900">بيانات العميل</h3>
            <button 
              onClick={() => setShowInvoiceModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">اسم العميل</label>
              <input
                type="text"
                value={customerInfo.name}
                onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="أدخل اسم العميل (اختياري)"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف</label>
              <input
                type="tel"
                value={customerInfo.phone}
                onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="أدخل رقم الهاتف للواتساب"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">العنوان</label>
              <textarea
                value={customerInfo.address}
                onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                rows={2}
                placeholder="أدخل العنوان (اختياري)"
              />
            </div>
          </div>
          
          <div className="mt-6 flex gap-2">
            <button
              onClick={() => setShowInvoiceModal(false)}
              className="flex-1 py-2 bg-gray-200 text-gray-800 rounded-lg font-bold hover:bg-gray-300 transition"
            >
              إلغاء
            </button>
            <button
              onClick={() => {
                setShowInvoiceModal(false);
                printInvoice();
              }}
              className="flex-1 py-2 bg-pink-600 text-white rounded-lg font-bold hover:bg-pink-700 transition"
            >
              إنشاء الفاتورة
            </button>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default ShoppingCart;
