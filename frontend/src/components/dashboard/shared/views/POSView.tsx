
import React, { useState } from 'react';
import { Search, Plus, Minus, Trash2, CreditCard, Banknote, QrCode, ShoppingBag } from 'lucide-react';
import { BusinessType } from '../../config';

const restaurantProducts = [
  { id: 1, name: 'برجر كلاسيك', price: 80, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200', category: 'برجر' },
  { id: 2, name: 'بيتزا مارجريتا', price: 120, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200', category: 'بيتزا' },
  { id: 3, name: 'كولا بارد', price: 20, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=200', category: 'مشروبات' },
  { id: 4, name: 'بطاطس مقلية', price: 40, image: 'https://images.unsplash.com/photo-1573080496987-a199f8cd4054?w=200', category: 'مقبلات' },
  { id: 5, name: 'تشيز كيك', price: 65, image: 'https://images.unsplash.com/photo-1508737027454-e6454ef45afd?w=200', category: 'حلوى' },
  { id: 6, name: 'قهوة لاتيه', price: 45, image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=200', category: 'مشروبات' },
  { id: 7, name: 'سلطة سيزر', price: 55, image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=200', category: 'مقبلات' },
  { id: 8, name: 'مياه معدنية', price: 10, image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=200', category: 'مشروبات' },
];

const retailProducts = [
  { id: 101, name: 'لبن جهينة 1 لتر', price: 42, image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200', category: 'ألبان' },
  { id: 102, name: 'شيبسي عائلي', price: 15, image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=200', category: 'سناكس' },
  { id: 103, name: 'أرز الضحى 1ك', price: 35, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200', category: 'بقوليات' },
  { id: 104, name: 'مكرونة الملكة', price: 12, image: 'https://images.unsplash.com/photo-1551462147-37885acc36f1?w=200', category: 'مكرونة' },
  { id: 105, name: 'زيت عباد الشمس', price: 65, image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=200', category: 'زيوت' },
  { id: 106, name: 'سكر الأسرة', price: 28, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=200', category: 'بقالة' },
  { id: 107, name: 'شاي العروسة', price: 15, image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=200', category: 'مشروبات' },
  { id: 108, name: 'نسكافيه كلاسيك', price: 95, image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=200', category: 'مشروبات' },
];

interface POSViewProps {
  theme: any;
  type: BusinessType;
}

const POSView: React.FC<POSViewProps> = ({ theme, type }) => {
  const [cart, setCart] = useState<{product: any, qty: number}[]>([]);
  const [search, setSearch] = useState('');
  
  const isRetail = type === 'retail';
  const products = isRetail ? retailProducts : restaurantProducts;
  const categories = isRetail 
    ? ['الكل', 'ألبان', 'سناكس', 'بقوليات', 'مكرونة', 'زيوت', 'بقالة', 'مشروبات']
    : ['الكل', 'برجر', 'بيتزا', 'مشروبات', 'مقبلات', 'حلوى'];

  const addToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find(p => p.product.id === product.id);
      if (existing) {
        return prev.map(p => p.product.id === product.id ? {...p, qty: p.qty + 1} : p);
      }
      return [...prev, { product, qty: 1 }];
    });
  };

  const updateQty = (id: number, delta: number) => {
    setCart(prev => prev.map(p => {
      if (p.product.id === id) {
        const newQty = Math.max(0, p.qty + delta);
        return {...p, qty: newQty};
      }
      return p;
    }).filter(p => p.qty > 0));
  };

  const total = cart.reduce((sum, item) => sum + (item.product.price * item.qty), 0);
  const tax = total * 0.14;

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-140px)] gap-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Products Grid */}
      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col overflow-hidden">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
             <Search className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
             <input 
               type="text" 
               placeholder="بحث عن منتج..." 
               className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pr-10 pl-4 focus:outline-none focus:border-ray-blue"
               value={search}
               onChange={e => setSearch(e.target.value)}
             />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
            {categories.map(cat => (
              <button key={cat} className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-bold hover:bg-gray-200 text-gray-600 whitespace-nowrap">
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto pr-1">
          {products.filter(p => p.name.includes(search)).map(product => (
            <div 
              key={product.id} 
              onClick={() => addToCart(product)}
              className="group bg-gray-50 rounded-xl p-3 border border-gray-100 hover:border-ray-blue cursor-pointer transition relative overflow-hidden flex flex-col"
            >
              <div className="aspect-square mb-3 rounded-lg overflow-hidden bg-white">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
              </div>
              <h4 className="font-bold text-gray-800 text-sm">{product.name}</h4>
              <p className={`font-bold mt-auto pt-2 ${theme.text}`}>{product.price} ج.م</p>
              
              <div className="absolute top-2 left-2 w-6 h-6 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-sm">
                <Plus className="w-4 h-4 text-ray-black" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart */}
      <div className="w-full lg:w-96 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-2xl">
           <h3 className="font-bold text-lg">{isRetail ? 'فاتورة بيع' : 'الطلب الحالي'} #405</h3>
           <span className={`text-xs font-bold px-2 py-1 rounded ${theme.lightBtn}`}>{isRetail ? 'عميل نقدي' : 'صالة - T4'}</span>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <ShoppingBag className="w-16 h-16 mb-4 opacity-10" />
              <p>السلة فارغة</p>
              <p className="text-sm opacity-60 mt-1">اضغط على المنتجات لإضافتها</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.product.id} className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl animate-in slide-in-from-right-2">
                 <img src={item.product.image} className="w-12 h-12 rounded-lg object-cover" />
                 <div className="flex-1">
                   <h4 className="font-bold text-sm text-gray-800">{item.product.name}</h4>
                   <p className="text-xs text-gray-500">{item.product.price} ج.م</p>
                 </div>
                 <div className="flex items-center gap-2">
                   <button onClick={() => updateQty(item.product.id, -1)} className="w-6 h-6 rounded bg-white shadow flex items-center justify-center text-gray-600 hover:text-red-500 transition"><Minus className="w-3 h-3" /></button>
                   <span className="font-bold text-sm w-4 text-center">{item.qty}</span>
                   <button onClick={() => updateQty(item.product.id, 1)} className="w-6 h-6 rounded bg-white shadow flex items-center justify-center text-gray-600 hover:text-green-500 transition"><Plus className="w-3 h-3" /></button>
                 </div>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t border-gray-100 space-y-3 bg-gray-50 rounded-b-2xl">
          <div className="flex justify-between text-sm text-gray-600">
            <span>المجموع</span>
            <span>{total.toFixed(2)} ج.م</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>الضريبة (14%)</span>
            <span>{tax.toFixed(2)} ج.م</span>
          </div>
          <div className="flex justify-between text-xl font-black text-gray-900 pt-2 border-t border-gray-200">
            <span>الإجمالي</span>
            <span>{(total + tax).toFixed(2)} ج.م</span>
          </div>
          
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button className="flex items-center justify-center gap-2 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition shadow-lg shadow-green-200">
              <Banknote className="w-4 h-4" />
              كاش
            </button>
            <button className="flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200">
              <CreditCard className="w-4 h-4" />
              فيزا
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default POSView;
