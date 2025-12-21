import React, { useEffect, useMemo, useState } from 'react';
import { MapPin, Edit, Trash2, Eye, Package, Tag, Layers, Loader, AlertCircle } from 'lucide-react';
import { BusinessType } from '../../config';
import { fetchProducts, Product } from '../../../../services/productsService';

const InventoryView = ({ type, theme }: { type: BusinessType, theme: any }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetchProducts({ page: 1, limit: 48 });
        setProducts(Array.isArray(res?.products) ? res.products : []);
      } catch (e) {
        console.error('Failed to load products inventory:', e);
        setError('تعذر تحميل المنتجات حالياً');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const items = useMemo(() => {
    return products.map((p) => {
      const code = p.barcode || p.sku || '-';
      const sold = Number.isFinite(p.dailySales) ? p.dailySales : 0;
      return {
        id: p._id,
        title: p.name,
        price: `${Number(p.price ?? 0).toLocaleString()} ج`,
        location: p.category || '-',
        image: p.image || '',
        specs: {
          stock: String(p.stock ?? 0),
          code,
          sold: String(sold),
        },
      };
    });
  }, [products]);

  const getTitle = () => {
    if (type === 'restaurant') return 'قائمة الطعام';
    return 'المخزون والمنتجات';
  };

  const getButtonLabel = () => {
    if (type === 'restaurant') return 'إضافة طبق';
    return 'إضافة منتج';
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-gray-800">{getTitle()}</h2>
          <p className="text-sm text-gray-500">إدارة المخزون والعرض</p>
        </div>
        <button
          disabled={loading}
          className={`${theme.btn} text-white px-6 py-2 rounded-xl font-bold shadow-md hover:shadow-lg transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {getButtonLabel()}
        </button>
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center text-gray-600 flex items-center justify-center gap-2">
          <Loader className="w-5 h-5 animate-spin" />
          جاري التحميل...
        </div>
      ) : error ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center text-red-700 flex items-center justify-center gap-2">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center text-gray-600">
          لا توجد بيانات
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="relative h-48 overflow-hidden bg-gray-50">
                {item.image ? (
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <Package className="w-10 h-10" />
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                  {item.price}
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-900 line-clamp-1">{item.title}</h3>
                </div>
                <p className="text-sm text-gray-500 mb-4">{item.location}</p>

                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 bg-gray-50 p-2 rounded-lg justify-between">
                  <div className="flex items-center gap-1" title="المخزون"><Package className="w-3 h-3" /> {item.specs.stock}</div>
                  <div className="flex items-center gap-1" title="الكود"><Tag className="w-3 h-3" /> {item.specs.code}</div>
                  <div className="flex items-center gap-1" title="مبيعات"><Layers className="w-3 h-3" /> {item.specs.sold}</div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <MapPin className="w-3 h-3" />
                    الفرع الرئيسي
                  </span>
                  <div className="flex gap-2">
                    <button disabled className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition opacity-60 cursor-not-allowed"><Eye className="w-4 h-4" /></button>
                    <button disabled className="p-2 hover:bg-gray-100 rounded-lg text-blue-500 transition opacity-60 cursor-not-allowed"><Edit className="w-4 h-4" /></button>
                    <button disabled className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition opacity-60 cursor-not-allowed"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InventoryView;
