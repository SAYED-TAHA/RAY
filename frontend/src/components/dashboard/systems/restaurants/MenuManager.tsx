
import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Image, Eye, EyeOff, GripVertical, Search } from 'lucide-react';
import MenuForm from './MenuForm';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  calories?: number;
  category: string;
  image: string;
  available: boolean;
  featured?: boolean;
}

const initialMenu: MenuItem[] = [
  { id: 1, name: 'برجر كلاسيك', description: 'قطعة لحم أنجوس 200 جرام مع خس وطماطم وصوص خاص', price: 120, category: 'برجر', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400', available: true, featured: true },
  { id: 2, name: 'برجر مشروم', description: 'قطعة لحم مع صوص المشروم الكريمي والجبنة السويسرية', price: 150, category: 'برجر', image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400', available: true },
  { id: 3, name: 'بيتزا مارجريتا', description: 'صوص طماطم إيطالي، جبنة موتزاريلا، وريحان', price: 110, category: 'بيتزا', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400', available: true },
  { id: 4, name: 'بيتزا بيبيروني', description: 'شرائح البيبيروني مع الجبنة الموتزاريلا', price: 140, category: 'بيتزا', image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400', available: true, featured: true },
  { id: 5, name: 'سلطة سيزر', description: 'خس، قطع دجاج مشوي، جبنة بارميزان، توست محمص', price: 85, category: 'مقبلات', image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=400', available: false },
  { id: 6, name: 'تشيز كيك', description: 'تشيز كيك نيويورك مع صوص الفراولة', price: 75, category: 'حلوى', image: 'https://images.unsplash.com/photo-1508737027454-e6454ef45afd?w=400', available: true },
];

const categories = ['الكل', 'برجر', 'بيتزا', 'مقبلات', 'مشروبات', 'حلوى'];

const MenuManager: React.FC = () => {
  const [menu, setMenu] = useState<MenuItem[]>(initialMenu);
  const [activeCategory, setActiveCategory] = useState('الكل');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const filteredMenu = menu.filter(item => 
    (activeCategory === 'الكل' || item.category === activeCategory) &&
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleAvailability = (id: number) => {
    setMenu(menu.map(item => item.id === id ? { ...item, available: !item.available } : item));
  };

  const handleAdd = () => {
    setEditingItem(null);
    setIsFormOpen(true);
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleSave = (itemData: any) => {
    if (editingItem) {
      setMenu(prev => prev.map(i => i.id === editingItem.id ? { ...i, ...itemData } : i));
    } else {
      const newItem = {
        id: Date.now(),
        ...itemData,
        image: itemData.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'
      };
      setMenu([...menu, newItem]);
    }
    setIsFormOpen(false);
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
                  <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition" title="حذف">
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
