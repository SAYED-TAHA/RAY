
import React, { useEffect, useMemo, useState } from 'react';
import { Plus, Edit2, Trash2, Image, Eye, EyeOff, GripVertical, Search } from 'lucide-react';
import MenuForm from './MenuForm';
import {
  createProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
  type Product
} from '@/services/productsService';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  calories?: number;
  category: string;
  image: string;
  available: boolean;
  featured?: boolean;
}

const categories = ['الكل', 'برجر', 'بيتزا', 'مقبلات', 'مشروبات', 'حلوى'];

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400';

const toMenuItem = (p: Product): MenuItem => {
  const tags = Array.isArray(p.tags) ? p.tags : [];
  return {
    id: p._id,
    name: p.name,
    description: p.description || '',
    price: Number(p.price ?? 0),
    category: p.category || 'الكل',
    image: p.image || DEFAULT_IMAGE,
    available: p.status === 'active',
    featured: tags.includes('featured')
  };
};

const MenuManager: React.FC = () => {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState('الكل');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchProducts({ limit: 200 })
      .then(res => {
        if (!mounted) return;
        const mapped = (res.products || []).map(toMenuItem);
        setMenu(mapped);
      })
      .catch(() => {
        // productsService already falls back to local store; keep UI safe
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const filteredMenu = useMemo(() => {
    return menu.filter(item =>
      (activeCategory === 'الكل' || item.category === activeCategory) &&
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [activeCategory, menu, searchTerm]);

  const toggleAvailability = async (id: string) => {
    const existing = menu.find(m => m.id === id);
    if (!existing) return;

    const nextAvailable = !existing.available;
    setMenu(prev => prev.map(item => item.id === id ? { ...item, available: nextAvailable } : item));

    const updated = await updateProduct(id, { status: nextAvailable ? 'active' : 'inactive' });
    if (updated) {
      setMenu(prev => prev.map(item => item.id === id ? toMenuItem(updated) : item));
    }
  };

  const handleAdd = () => {
    setEditingItem(null);
    setIsFormOpen(true);
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleSave = async (itemData: any) => {
    const payload: Partial<Product> = {
      name: String(itemData?.name ?? '').trim(),
      price: Number(itemData?.price ?? 0),
      category: itemData?.category ? String(itemData.category) : undefined,
      image: itemData?.image ? String(itemData.image) : (editingItem?.image || DEFAULT_IMAGE),
      description: itemData?.description ? String(itemData.description) : undefined,
      tags: itemData?.featured ? ['featured'] : undefined,
      stock: 0,
      minStock: 0,
      status: itemData?.available === false ? 'inactive' : 'active',
      dailySales: 0
    };

    if (editingItem) {
      const updated = await updateProduct(editingItem.id, payload);
      if (updated) {
        setMenu(prev => prev.map(i => i.id === editingItem.id ? toMenuItem(updated) : i));
      }
    } else {
      const created = await createProduct(payload as any);
      if (created) {
        setMenu(prev => [toMenuItem(created), ...prev]);
      }
    }

    setIsFormOpen(false);
  };

  const handleDelete = async (id: string) => {
    const ok = await deleteProduct(id);
    if (ok) {
      setMenu(prev => prev.filter(i => i.id !== id));
    }
  };

  return (
    <div className="flex flex-col h-full space-y-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Header Controls */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">إدارة قائمة الطعام</h2>
          <p className="text-sm text-gray-500">التحكم في الأصناف والأسعار والتوافر</p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
           <div className="relative flex-1 md:w-64">
             <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
             <input 
               type="text" 
               placeholder="بحث في المنيو..." 
               className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 pr-10 pl-4 text-sm focus:outline-none focus:border-orange-500"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
             />
           </div>
           <button 
             onClick={handleAdd}
             className="bg-orange-600 text-white px-4 py-2 rounded-xl font-bold shadow-md flex items-center gap-2 hover:bg-orange-700 transition whitespace-nowrap"
           >
             <Plus className="w-4 h-4" />
             إضافة صنف
           </button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2.5 rounded-xl font-bold whitespace-nowrap transition
              ${activeCategory === cat 
                ? 'bg-orange-50 text-orange-700 border border-orange-200 shadow-sm' 
                : 'bg-white text-gray-600 border border-gray-100 hover:bg-gray-50'}
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-6 overflow-y-auto">
        {loading && (
          <div className="col-span-full bg-white rounded-2xl border border-gray-100 p-6 text-center text-gray-500">
            جاري تحميل الأصناف...
          </div>
        )}
        {filteredMenu.map((item) => (
          <div 
            key={item.id} 
            className={`bg-white rounded-2xl border shadow-sm group transition-all hover:shadow-md flex flex-col overflow-hidden
              ${!item.available ? 'opacity-75 border-gray-200 grayscale-[0.5]' : 'border-gray-100'}
            `}
          >
            <div className="relative h-48">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 flex gap-2">
                 <button 
                   onClick={() => toggleAvailability(item.id)}
                   className={`p-2 rounded-lg backdrop-blur-md text-xs font-bold transition shadow-sm flex items-center gap-1
                     ${item.available ? 'bg-white/90 text-green-700 hover:bg-white' : 'bg-black/50 text-white hover:bg-black/70'}
                   `}
                 >
                   {item.available ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                   {item.available ? 'متاح' : 'غير متاح'}
                 </button>
              </div>
              {item.featured && (
                <span className="absolute bottom-3 right-3 bg-orange-500 text-white text-[10px] px-2 py-1 rounded-lg font-bold shadow-sm">
                  مميز
                </span>
              )}
            </div>

            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                <span className="font-black text-orange-600 text-lg">{item.price} <span className="text-xs text-gray-500 font-normal">ج.م</span></span>
              </div>
              <p className="text-sm text-gray-500 line-clamp-2 mb-4">{item.description}</p>
              
              <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-lg">
                  {item.category}
                </span>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition" title="تعديل">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition" title="حذف">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg cursor-move" title="إعادة ترتيب">
                    <GripVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Add New Card Placeholder */}
        <button 
          onClick={handleAdd}
          className="border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center text-gray-400 hover:border-orange-400 hover:text-orange-500 hover:bg-orange-50/50 transition min-h-[300px]"
        >
           <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-white group-hover:shadow-sm">
             <Image className="w-8 h-8" />
           </div>
           <h3 className="font-bold text-lg mb-1">إضافة صنف جديد</h3>
           <p className="text-sm text-gray-400 text-center max-w-[200px]">أضف وجبة جديدة، صورة، وصف، وسعر للقائمة</p>
        </button>
      </div>

      {isFormOpen && (
        <MenuForm 
          onClose={() => setIsFormOpen(false)} 
          onSave={handleSave} 
          initialData={editingItem}
        />
      )}
    </div>
  );
};

export default MenuManager;
