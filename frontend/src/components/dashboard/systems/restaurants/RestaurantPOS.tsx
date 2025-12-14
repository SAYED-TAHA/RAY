
import React, { useState } from 'react';
import { Search, Plus, Minus, ChefHat, CreditCard, Banknote, Utensils, X, ShoppingBag, ChevronUp, Percent, Clock, AlertCircle } from 'lucide-react';

const products = [
  { id: 1, name: 'برجر كلاسيك', price: 80, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200', category: 'برجر' },
  { id: 2, name: 'بيتزا مارجريتا', price: 120, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200', category: 'بيتزا' },
  { id: 3, name: 'كولا بارد', price: 20, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=200', category: 'مشروبات' },
  { id: 4, name: 'بطاطس مقلية', price: 40, image: 'https://images.unsplash.com/photo-1573080496987-a199f8cd4054?w=200', category: 'مقبلات' },
  { id: 5, name: 'تشيز كيك', price: 65, image: 'https://images.unsplash.com/photo-1508737027454-e6454ef45afd?w=200', category: 'حلوى' },
  { id: 6, name: 'قهوة لاتيه', price: 45, image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=200', category: 'مشروبات' },
];

const categories = ['الكل', 'برجر', 'بيتزا', 'مشروبات', 'مقبلات', 'حلوى'];

const RestaurantPOS: React.FC = () => {
  const [cart, setCart] = useState<{product: any, qty: number}[]>([]);
  const [activeCategory, setActiveCategory] = useState('الكل');
  const [selectedTable, setSelectedTable] = useState('T-01');
  const [isMobileCartOpen, setIsMobileCartOpen] = useState(false);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'both'>('cash');

  const addToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find(p => p.product.id === product.id);
      if (existing) return prev.map(p => p.product.id === product.id ? {...p, qty: p.qty + 1} : p);
      return [...prev, { product, qty: 1 }];
    });
  };

  const updateQty = (id: number, delta: number) => {
    setCart(prev => prev.map(p => {
      if (p.product.id === id) return {...p, qty: Math.max(0, p.qty + delta)};
      return p;
    }).filter(p => p.qty > 0));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.qty), 0);
  const discountAmount = subtotal * (discountPercent / 100);
  const afterDiscount = subtotal - discountAmount;
  const tax = afterDiscount * 0.14;
  const total = afterDiscount + tax;
  const itemsCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const CartPanel = () => (
    <div className="flex flex-col h-full overflow-hidden bg-white dark:bg-gray-800 transition-colors">
        {/* Table Selector */}
        <div className="p-4 bg-gray-800 dark:bg-gray-900 text-white flex justify-between items-center shrink-0">
           <div className="flex items-center gap-2">
             <div className="p-2 bg-white/10 rounded-lg"><Utensils className="w-5 h-5 text-orange-400" /></div>
             <div>
               <p className="text-xs text-gray-400">طاولة رقم</p>
               <h3 className="font-bold text-lg">{selectedTable}</h3>
             </div>
           </div>
           <button className="text-xs bg-orange-600 px-3 py-2 rounded-lg hover:bg-orange-700 transition font-bold active:scale-95">تغيير الطاولة</button>
        </div>
        
        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-gray-900/50">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 dark:text-gray-600 opacity-60">
              <ChefHat className="w-16 h-16 mb-2" />
              <p>ابدأ بتسجيل الطلب</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.product.id} className="flex items-center gap-3 bg-white dark:bg-gray-700 p-3 rounded-xl border border-gray-100 dark:border-gray-600 shadow-sm">
                 <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-gray-200">
                    <img src={item.product.image} className="w-full h-full object-cover" />
                 </div>
                 <div className="flex-1">
                   <h4 className="font-bold text-sm text-gray-800 dark:text-white">{item.product.name}</h4>
                   <p className="text-xs text-orange-600 font-bold">{item.product.price * item.qty} ج.م</p>
                 </div>
                 <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                   <button onClick={() => updateQty(item.product.id, -1)} className="w-8 h-8 rounded bg-white dark:bg-gray-600 shadow flex items-center justify-center text-gray-600 dark:text-gray-200 hover:text-red-500 active:scale-95 transition"><Minus className="w-4 h-4" /></button>
                   <span className="font-bold text-sm w-4 text-center text-gray-800 dark:text-white">{item.qty}</span>
                   <button onClick={() => updateQty(item.product.id, 1)} className="w-8 h-8 rounded bg-white dark:bg-gray-600 shadow flex items-center justify-center text-gray-600 dark:text-gray-200 hover:text-green-500 active:scale-95 transition"><Plus className="w-4 h-4" /></button>
                 </div>
              </div>
            ))
          )}
        </div>

        {/* Totals & Actions */}
        <div className="p-5 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] pb-safe">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>المجموع الفرعي</span>
              <span>{total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>الضريبة والخدمة (14%)</span>
              <span>{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-black text-gray-900 dark:text-white pt-2 border-t border-dashed border-gray-200 dark:border-gray-700">
              <span>الإجمالي</span>
              <span>{(total + tax).toFixed(2)} ج.م</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
             <button className="col-span-2 py-3 bg-gray-800 dark:bg-gray-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black dark:hover:bg-gray-600 transition shadow-md active:scale-95">
               <ChefHat className="w-5 h-5" />
               إرسال للمطبخ (KDS)
             </button>
             <button className="py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition flex items-center justify-center gap-2 shadow-md active:scale-95">
               <Banknote className="w-5 h-5" />
               كاش
             </button>
             <button className="py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-md active:scale-95">
               <CreditCard className="w-5 h-5" />
               فيزا
             </button>
          </div>
        </div>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row h-full gap-6 animate-in fade-in relative">
      {/* Menu Area */}
      <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-3 md:p-6 flex flex-col overflow-hidden transition-colors pb-20 lg:pb-0">
        
        {/* Categories */}
        <div className="flex gap-3 overflow-x-auto pb-4 mb-2 no-scrollbar shrink-0">
          {categories.map(cat => (
            <button 
              key={cat} 
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-xl font-bold whitespace-nowrap transition text-sm active:scale-95
                ${activeCategory === cat 
                  ? 'bg-orange-600 text-white shadow-lg' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 overflow-y-auto pr-1">
          {products
            .filter(p => activeCategory === 'الكل' || p.category === activeCategory)
            .map(product => (
            <div 
              key={product.id} 
              onClick={() => addToCart(product)}
              className="group bg-white dark:bg-gray-700 rounded-2xl p-2 border border-gray-100 dark:border-gray-600 hover:border-orange-500 cursor-pointer transition shadow-sm hover:shadow-md flex flex-col h-48 md:h-56 active:scale-95"
            >
              <div className="h-24 md:h-32 mb-2 rounded-xl overflow-hidden relative">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition"></div>
              </div>
              <h4 className="font-bold text-gray-800 dark:text-white text-xs md:text-sm mb-1 line-clamp-1">{product.name}</h4>
              <div className="mt-auto flex justify-between items-center">
                <span className="font-black text-orange-600 text-sm md:text-lg">{product.price} <span className="text-[10px]">ج.م</span></span>
                <div className="w-7 h-7 md:w-8 md:h-8 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center text-orange-600 dark:text-orange-400 shadow-sm">
                  <Plus className="w-4 h-4 md:w-5 md:h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Cart Button */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 z-40">
        <button 
          onClick={() => setIsMobileCartOpen(true)}
          className="w-full py-3.5 rounded-xl shadow-2xl flex items-center justify-between px-5 bg-gray-900 text-white active:scale-95 transition-transform"
        >
           <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg">
                 <ShoppingBag className="w-5 h-5" />
              </div>
              <div className="text-right">
                 <p className="font-bold text-sm">{itemsCount} عناصر</p>
                 <p className="text-[10px] opacity-90">عرض الطلب</p>
              </div>
           </div>
           <div className="flex items-center gap-2">
              <span className="font-black text-lg">{(total + tax).toFixed(0)} ج.م</span>
              <ChevronUp className="w-5 h-5" />
           </div>
        </button>
      </div>

      {/* Mobile Cart Overlay */}
      {isMobileCartOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-in fade-in" onClick={() => setIsMobileCartOpen(false)}>
           <div className="absolute bottom-0 left-0 right-0 h-[85vh] bg-white dark:bg-gray-900 rounded-t-3xl overflow-hidden animate-in slide-in-from-bottom-10 flex flex-col" onClick={e => e.stopPropagation()}>
              <div className="w-full h-6 flex items-center justify-center bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 cursor-pointer shrink-0" onClick={() => setIsMobileCartOpen(false)}>
                 <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
              </div>
              <CartPanel />
           </div>
        </div>
      )}

      {/* Desktop Order Panel */}
      <div className="hidden lg:block w-[400px] bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 h-full overflow-hidden">
         <CartPanel />
      </div>
    </div>
  );
};

export default RestaurantPOS;
