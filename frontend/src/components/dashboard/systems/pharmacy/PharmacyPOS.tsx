/**
 * نقطة بيع الصيدلية
 * نظام نقطة البيع للصيدلية
 */

import React, { useState } from 'react';
import {
  ShoppingCart, Plus, Trash2, DollarSign, Percent,
  Save, X, AlertCircle, CheckCircle
} from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  discount: number;
}

const PharmacyPOS: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: '1', name: 'أموكسيسيلين 500mg', price: 25, quantity: 2, discount: 0 },
    { id: '2', name: 'باراسيتامول 500mg', price: 15, quantity: 1, discount: 10 }
  ]);
  const [paymentMethod, setPaymentMethod] = useState('cash');

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalDiscount = cartItems.reduce((sum, item) => sum + ((item.price * item.quantity * item.discount) / 100), 0);
  const tax = (subtotal - totalDiscount) * 0.14;
  const total = subtotal - totalDiscount + tax;

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <ShoppingCart className="w-6 h-6 text-green-600" />
          نقطة البيع
        </h2>
        <p className="text-sm text-gray-500">نظام نقطة البيع للصيدلية</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-bold text-gray-800 mb-4">سلة المشتريات</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{item.name}</p>
                  <p className="text-xs text-gray-500">السعر: {item.price} ج</p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    className="w-12 px-2 py-1 border border-gray-200 rounded text-center"
                  />
                  <span className="text-sm font-semibold text-gray-800">{item.price * item.quantity} ج</span>
                  <button className="p-1 hover:bg-red-100 rounded transition">
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold flex items-center justify-center gap-2">
            <Plus className="w-5 h-5" />
            إضافة منتج
          </button>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col">
          <h3 className="font-bold text-gray-800 mb-4">ملخص الفاتورة</h3>
          
          <div className="space-y-3 flex-1 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">الإجمالي:</span>
              <span className="font-semibold text-gray-800">{subtotal.toFixed(2)} ج</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">الخصم:</span>
              <span className="font-semibold text-red-600">-{totalDiscount.toFixed(2)} ج</span>
            </div>
            <div className="flex justify-between text-sm border-t border-gray-200 pt-2">
              <span className="text-gray-600">الضريبة (14%):</span>
              <span className="font-semibold text-gray-800">{tax.toFixed(2)} ج</span>
            </div>
            <div className="flex justify-between text-lg border-t border-gray-200 pt-2">
              <span className="font-bold text-gray-800">الإجمالي:</span>
              <span className="font-bold text-green-600">{total.toFixed(2)} ج</span>
            </div>
          </div>

          {/* Payment Method */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">طريقة الدفع</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="cash">نقداً</option>
              <option value="card">بطاقة ائتمان</option>
              <option value="transfer">تحويل بنكي</option>
            </select>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold flex items-center justify-center gap-2">
              <Save className="w-5 h-5" />
              إكمال الدفع
            </button>
            <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-semibold flex items-center justify-center gap-2">
              <X className="w-5 h-5" />
              إلغاء
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyPOS;
