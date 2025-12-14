import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { ShoppingBag, Trash2, Plus, Minus, Store, Eye, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { fastCart, cartEvents } from '@/utils/performance';

interface CartViewProps {
  onNavigate?: (view: string) => void;
}

const CartView: React.FC<CartViewProps> = ({ onNavigate }) => {
  const router = useRouter();
  const [cart, setCart] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const loadCart = useCallback(() => {
    const cartData = fastCart.get();
    setCart(cartData);
  }, []);

  useEffect(() => {
    loadCart();
    
    // Subscribe to cart events
    const unsubscribe = cartEvents.subscribe(loadCart);
    
    return () => {
      unsubscribe();
    };
  }, [loadCart]);

  const removeFromCart = useCallback((id: number) => {
    const newCart = fastCart.remove(id);
    setCart(newCart);
    cartEvents.emit();
  }, []);

  const updateQuantity = useCallback((id: number, qty: number) => {
    if (qty < 1) return;
    const newCart = fastCart.update(id, qty);
    setCart(newCart);
    cartEvents.emit();
  }, []);

  const clearCart = useCallback(() => {
    const newCart = fastCart.clear();
    setCart(newCart);
    cartEvents.emit();
  }, []);

  const groupedCart = useMemo(() => {
    const groups: Record<string, any[]> = {};
    cart.forEach(item => {
      const shopName = item.shop || 'متجر عام';
      if (!groups[shopName]) groups[shopName] = [];
      groups[shopName].push(item);
    });
    return groups;
  }, [cart]);

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const removeItem = (id: number) => {
    removeFromCart(id);
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6 text-gray-400">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">سلة المشتريات فارغة</h2>
        <p className="text-gray-500 mb-8">لم تقم بإضافة أي منتجات للسلة بعد.</p>
        <button onClick={() => router.push('/')} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold">
          تصفح المنتجات
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">سلة المشتريات ({cart.length} منتجات)</h2>
        {cart.length > 0 && (
          <button
            onClick={clearCart}
            className="text-red-600 hover:text-red-700 font-medium text-sm"
          >
            إفراغ السلة
          </button>
        )}
      </div>
      
      {Object.entries(groupedCart).map(([shopName, items]) => (
        <div key={shopName} className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Store className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-gray-900">{shopName}</h3>
              <span className="text-sm text-gray-500">({items.length} منتجات)</span>
            </div>
            <span className="font-bold text-blue-600">
              {items.reduce((sum, item) => sum + (item.price * item.qty), 0)} ج.م
            </span>
          </div>
          
          {items.map(item => (
            <div key={item.id} className="flex items-center gap-4 py-4 border-b last:border-b-0">
              {/* Product Image */}
              <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                <img 
                  src={item.image || '/api/placeholder/80/80'} 
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-gray-900 truncate">{item.name}</h4>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                  {item.size && <span>المقاس: {item.size}</span>}
                  {item.color && <span>•</span>}
                  {item.color && <span>اللون: {item.color}</span>}
                </div>
                <p className="text-lg font-bold text-blue-600 mt-1">{item.price} ج.م</p>
              </div>
              
              {/* Quantity Controls */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => updateQuantity(item.id, item.qty - 1)}
                  className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 transition flex items-center justify-center"
                  disabled={item.qty <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-medium">{item.qty}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.qty + 1)}
                  className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 transition flex items-center justify-center"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              
              {/* Actions */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setSelectedItem(item)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                  title="عرض التفاصيل"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => removeItem(item.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                  title="حذف من السلة"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
      
      {/* Cart Summary */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">المجموع الفرعي</span>
            <span>{cartTotal} ج.م</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">رسوم الشحن</span>
            <span>30 ج.م</span>
          </div>
          <div className="flex justify-between font-bold text-lg pt-3 border-t">
            <span>الإجمالي</span>
            <span className="text-blue-600">{cartTotal + 30} ج.م</span>
          </div>
        </div>
        
        <div className="space-y-3">
          <button 
            onClick={() => router.push('/checkout')}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition"
          >
            إتمام الشراء
          </button>
          <button 
            onClick={() => router.push('/')}
            className="w-full border border-gray-300 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-50 transition"
          >
            مواصلة التسوق
          </button>
        </div>
      </div>

      {/* Product Details Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">تفاصيل المنتج</h2>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="flex gap-6 mb-6">
                <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src={selectedItem.image || '/api/placeholder/128/128'} 
                    alt={selectedItem.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedItem.name}</h3>
                  <p className="text-gray-600 mb-4">{selectedItem.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    {selectedItem.category && <span>التصنيف: {selectedItem.category}</span>}
                    {selectedItem.size && <span>المقاس: {selectedItem.size}</span>}
                    {selectedItem.color && <span>اللون: {selectedItem.color}</span>}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">السعر</p>
                  <p className="text-2xl font-bold text-blue-600">{selectedItem.price} ج.م</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">الكمية في السلة</p>
                  <p className="text-2xl font-bold text-gray-900">{selectedItem.qty}</p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-bold text-blue-900 mb-2">معلومات المتجر</h4>
                <div className="flex items-center gap-2 text-blue-700">
                  <Store className="w-4 h-4" />
                  <span>{selectedItem.shop}</span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-200">
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  إغلاق
                </button>
                <button
                  onClick={() => removeItem(selectedItem.id)}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  حذف من السلة
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartView;
