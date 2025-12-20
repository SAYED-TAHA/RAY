"use client";

import React, { useState } from 'react';
import { useTheme } from '@/components/common/useTheme';
import { 
  Search, Plus, Minus, Trash2, CreditCard, Banknote, 
  ShoppingCart, Package, BarChart3, Store, Globe, Eye, EyeOff,
  Calculator, Receipt, Users, Settings, X, Save, Printer, ScanLine,
  Edit, Copy, Share2, ArrowUp, ArrowDown, MoreVertical, Bell,
  Calendar, Clock, TrendingUp, TrendingDown, AlertCircle, User,
  Tag, ShoppingBag, Loader2, CheckCircle, ChevronUp, FileText, DollarSign
} from 'lucide-react';
import { BusinessType } from '../../config';

interface Item {
  id: number;
  name: string;
  price: number;
  type: 'service' | 'product';
  category: string;
  image?: string;
  stock?: number;
  sku?: string;
  online?: boolean;
}

interface IntegratedPOSProps {
  type: BusinessType;
}

const UnifiedPOS: React.FC<IntegratedPOSProps> = ({ type }) => {
  const { theme } = useTheme();
  const [activeView, setActiveView] = useState<'overview' | 'pos' | 'transactions'>('overview');
  const [cart, setCart] = useState<{item: Item, qty: number}[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'digital'>('cash');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isMobileCartOpen, setIsMobileCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [notes, setNotes] = useState('');
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);

  // Local state for theme and language
  const language = 'ar';
  const themeColor = 'blue';

  const items = getRetailProducts(language);
  const recentTransactions = getRecentTransactions(language, items);

  const categories = ['all', ...Array.from(new Set(items.map(item => item.category)))];

  const filteredItems = items.filter(i => {
    const matchesSearch = i.name.includes(searchTerm);
    const matchesCategory = selectedCategory === 'all' || i.category === selectedCategory;
    const matchesOnline = !showOnlineOnly || i.online;
    return matchesSearch && matchesCategory && matchesOnline;
  });

  const addToCart = (item: Item) => {
    setCart(prev => {
      const existing = prev.find(cartItem => cartItem.item.id === item.id);
      if (existing) {
        return prev.map(cartItem => 
          cartItem.item.id === item.id 
            ? { ...cartItem, qty: cartItem.qty + 1 }
            : cartItem
        );
      }
      return [...prev, { item, qty: 1 }];
    });
    setIsMobileCartOpen(true);
  };

  const updateQty = (id: number, delta: number) => {
    setCart(prev => prev.map(cartItem => {
      if (cartItem.item.id === id) {
        const newQty = cartItem.qty + delta;
        return newQty > 0 ? { ...cartItem, qty: newQty } : cartItem;
      }
      return cartItem;
    }).filter(cartItem => cartItem.qty > 0));
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(cartItem => cartItem.item.id !== id));
  };

  const getTotal = () => {
    const subtotal = cart.reduce((sum, cartItem) => sum + (cartItem.item.price * cartItem.qty), 0);
    const discountAmount = subtotal * (discountPercent / 100);
    const afterDiscount = subtotal - discountAmount;
    const tax = afterDiscount * 0.14;
    const total = afterDiscount + tax;
    return { subtotal, discountAmount, afterDiscount, tax, total };
  };

  const processPayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setCart([]);
      setSelectedCustomer('');
    }, 3000);
  };

  if (activeView === 'overview') {
    return (
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">نظرة عامة</h2>
          <p className="text-gray-600">ملخص أداء نقطة البيع</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">مبيعات اليوم</p>
                <p className="text-2xl font-bold">15,200 ج</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">عدد الفواتير</p>
                <p className="text-2xl font-bold">142</p>
              </div>
              <FileText className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">منتجات تنفذ</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">قيمة المخزون</p>
                <p className="text-2xl font-bold">450k ج</p>
              </div>
              <Package className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">آخر المبيعات</h3>
            <div className="space-y-3">
              {recentTransactions.slice(0, 5).map((transaction, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div>
                    <p className="font-medium">{transaction.customer}</p>
                    <p className="text-sm text-gray-600">{transaction.items}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{transaction.amount}</p>
                    <p className="text-sm text-gray-600">{transaction.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">المنتجات الأكثر مبيعاً</h3>
            <div className="space-y-3">
              {items.slice(0, 5).map((item, index) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Package className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">{item.category}</p>
                    </div>
                  </div>
                  <p className="font-bold">{item.price} ج</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeView === 'transactions') {
    return (
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">سجل المعاملات</h2>
          <p className="text-gray-600">عرض جميع المعاملات السابقة</p>
        </div>
        
        <div className="bg-white rounded-lg shadow">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">رقم الفاتورة</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">العميل</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المنتجات</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجمالي</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">طريقة الدفع</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الوقت</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentTransactions.map((transaction, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">#{1000 + index}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{transaction.customer}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{transaction.items}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold">{transaction.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                        {transaction.payment}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setActiveView('overview')}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    activeView.toString() === 'overview' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  نظرة عامة
                </button>
                <button
                  onClick={() => setActiveView('pos')}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    activeView.toString() === 'pos' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  نقطة البيع
                </button>
                <button
                  onClick={() => setActiveView('transactions')}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    activeView.toString() === 'transactions' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  المعاملات
                </button>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="بحث عن منتج..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200">
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* POS Content */}
        <div className="flex-1 flex">
          {/* Products Grid */}
          <div className="flex-1 p-6">
            {/* Categories */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4 overflow-x-auto">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
                    selectedCategory === 'all' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-700 border border-gray-300'
                  }`}
                >
                  الكل
                </button>
                {categories.filter(cat => cat !== 'all').map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
                      selectedCategory === category 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-white text-gray-700 border border-gray-300'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Products */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredItems.map(item => (
                <div
                  key={item.id}
                  onClick={() => addToCart(item)}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition cursor-pointer border border-gray-200"
                >
                  <div className="p-4">
                    <div className="w-full h-24 bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                      <Package className="w-8 h-8 text-gray-400" />
                    </div>
                    <h4 className="font-medium text-sm mb-1 line-clamp-2">{item.name}</h4>
                    <p className="text-xs text-gray-500 mb-2">{item.category}</p>
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-blue-600">{item.price} ج</p>
                      {item.stock && (
                        <span className="text-xs text-gray-500">المتبقي: {item.stock}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Sidebar */}
          <div className={`w-96 bg-white shadow-lg border-l ${isMobileCartOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">السلة</h3>
                <button
                  onClick={() => setIsMobileCartOpen(false)}
                  className="lg:hidden p-2 hover:bg-gray-100 rounded"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">السلة فارغة</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map(cartItem => (
                    <div key={cartItem.item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Package className="w-6 h-6 text-gray-500" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{cartItem.item.name}</h4>
                        <p className="text-sm text-gray-600">{cartItem.item.price} ج</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQty(cartItem.item.id, -1)}
                          className="w-8 h-8 rounded-lg bg-white border hover:bg-gray-50"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium">{cartItem.qty}</span>
                        <button
                          onClick={() => updateQty(cartItem.item.id, 1)}
                          className="w-8 h-8 rounded-lg bg-white border hover:bg-gray-50"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removeFromCart(cartItem.item.id)}
                          className="w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t p-6">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>المجموع الفرعي</span>
                    <span>{getTotal().subtotal.toFixed(2)} ج</span>
                  </div>
                  {discountPercent > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>الخصم ({discountPercent}%)</span>
                      <span>-{getTotal().discountAmount.toFixed(2)} ج</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span>الضريبة (14%)</span>
                    <span>{getTotal().tax.toFixed(2)} ج</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>الإجمالي</span>
                    <span>{getTotal().total.toFixed(2)} ج</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value as any)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="cash">نقدي</option>
                    <option value="card">بطاقة</option>
                    <option value="digital">محفظة إلكترونية</option>
                  </select>

                  <button
                    onClick={processPayment}
                    disabled={isProcessing}
                    className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>جاري المعالجة...</span>
                      </div>
                    ) : (
                      'إتمام الدفع'
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Cart Toggle */}
      {cart.length > 0 && (
        <button
          onClick={() => setIsMobileCartOpen(true)}
          className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">
            {cart.reduce((sum, item) => sum + item.qty, 0)}
          </span>
        </button>
      )}

      {/* Success Modal */}
      {isSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md">
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">تمت العملية بنجاح!</h3>
              <p className="text-gray-600 mb-6">تم إتمام الدفع بنجاح</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper functions
function getRetailProducts(language: string): Item[] {
  return [
    { id: 1, name: 'تيشيرت أسود', price: 150, type: 'product', category: 'ملابس', stock: 50 },
    { id: 2, name: 'جينز أزرق', price: 250, type: 'product', category: 'ملابس', stock: 30 },
    { id: 3, name: 'حذاء رياضي', price: 350, type: 'product', category: 'أحذية', stock: 25 },
    { id: 4, name: 'ساعة يد', price: 500, type: 'product', category: 'إكسسوارات', stock: 15 },
    { id: 5, name: 'حقيبة ظهر', price: 200, type: 'product', category: 'حقائب', stock: 20 },
  ];
}

function getRecentTransactions(language: string, items: Item[]) {
  return [
    { customer: 'أحمد محمد', items: '2 قطعة', amount: '400 ج', payment: 'نقدي', time: 'منذ 5 دقائق' },
    { customer: 'سارة أحمد', items: '1 قطعة', amount: '250 ج', payment: 'بطاقة', time: 'منذ 15 دقيقة' },
    { customer: 'محمد علي', items: '3 قطع', amount: '600 ج', payment: 'نقدي', time: 'منذ 30 دقيقة' },
  ];
}

export default UnifiedPOS;
