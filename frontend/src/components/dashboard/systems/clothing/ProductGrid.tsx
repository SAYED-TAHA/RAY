
import React, { useState } from 'react';
import { Search, Filter, Plus, Eye, Heart } from 'lucide-react';

export interface ClothingItem {
  id: number;
  name: string;
  price: number;
  image: string;
  brand: string;
  sizes: string[];
  colors: string[];
  category: string;
}

interface Props {
  addToCart: (item: ClothingItem, size: string, color: string) => void;
}

const clothingItems: ClothingItem[] = [
  { id: 1, name: 'تيشيرت قطن بيزيك', price: 250, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', brand: 'Zara', sizes: ['S', 'M', 'L', 'XL'], colors: ['white', 'black', 'navy'], category: 'تيشيرت' },
  { id: 2, name: 'بنطلون جينز سليم', price: 550, image: 'https://images.unsplash.com/photo-1542272617-08f086302542?w=400', brand: 'Levis', sizes: ['30', '32', '34', '36'], colors: ['blue', 'black'], category: 'بنطلون' },
  { id: 3, name: 'قميص كاجوال كاروهات', price: 400, image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400', brand: 'H&M', sizes: ['M', 'L', 'XL'], colors: ['red', 'blue'], category: 'قميص' },
  { id: 4, name: 'فستان صيفي مشجر', price: 650, image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400', brand: 'Mango', sizes: ['S', 'M', 'L'], colors: ['pink', 'yellow'], category: 'فستان' },
  { id: 5, name: 'جاكيت بومبر', price: 850, image: 'https://images.unsplash.com/photo-1551028919-33f54764fa5d?w=400', brand: 'Pull&Bear', sizes: ['M', 'L', 'XL'], colors: ['green', 'black'], category: 'جاكيت' },
  { id: 6, name: 'سويت شيرت هودي', price: 450, image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400', brand: 'Nike', sizes: ['S', 'M', 'L', 'XL'], colors: ['gray', 'black'], category: 'سويت شيرت' },
];

const ProductGrid: React.FC<Props> = ({ addToCart }) => {
  const [filterBrand, setFilterBrand] = useState<string>('All');
  const [filterSize, setFilterSize] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Selection state for each card (temporary selection before adding to cart)
  const [selectedOptions, setSelectedOptions] = useState<Record<number, {size: string, color: string}>>({});
  const [favorites, setFavorites] = useState<number[]>([]);

  const handleOptionSelect = (id: number, type: 'size' | 'color', value: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [id]: { ...prev[id], [type]: value }
    }));
  };

  const toggleFavorite = (id: number) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]);
  };

  const filteredItems = clothingItems.filter(item => {
    const matchBrand = filterBrand === 'All' || item.brand === filterBrand;
    const matchSize = filterSize === 'All' || item.sizes.includes(filterSize);
    const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchBrand && matchSize && matchSearch;
  });

  const brands = ['All', ...Array.from(new Set(clothingItems.map(i => i.brand)))];
  const allSizes = ['All', 'S', 'M', 'L', 'XL', '30', '32', '34', '36'];

  return (
    <div className="flex flex-col h-full bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden">
      {/* Filters Header */}
      <div className="p-4 bg-white border-b border-gray-200 space-y-3">
        <div className="relative">
          <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="بحث عن موديل..." 
            className="w-full bg-gray-100 rounded-xl py-3 pr-10 pl-4 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg shrink-0">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-xs font-bold text-gray-600">فلتر:</span>
          </div>
          <select 
            className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-pink-500"
            value={filterBrand}
            onChange={(e) => setFilterBrand(e.target.value)}
          >
            <option value="All">كل الماركات</option>
            {brands.filter(b => b !== 'All').map(b => <option key={b} value={b}>{b}</option>)}
          </select>
          <select 
            className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-pink-500"
            value={filterSize}
            onChange={(e) => setFilterSize(e.target.value)}
          >
            <option value="All">كل المقاسات</option>
            {allSizes.filter(s => s !== 'All').map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredItems.map(item => {
            const currentSelection = selectedOptions[item.id] || { size: item.sizes[0], color: item.colors[0] };
            const isFav = favorites.includes(item.id);
            
            return (
              <div key={item.id} className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group relative">
                <div className="aspect-[4/5] relative bg-gray-100 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700" 
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 bg-black/70 text-white text-xs font-bold px-2.5 py-1 rounded-md backdrop-blur-sm">
                    {item.brand}
                  </span>
                  
                  {/* Quick Actions Overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                     <button className="bg-white text-gray-800 p-2 rounded-full hover:bg-pink-50 hover:text-pink-600 transition shadow-lg transform translate-y-4 group-hover:translate-y-0 duration-300">
                        <Eye className="w-5 h-5" />
                     </button>
                  </div>
                </div>
                
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-gray-800 text-base line-clamp-1">{item.name}</h4>
                    <span className="font-black text-pink-600 text-base">{item.price} ج</span>
                  </div>
                  
                  {/* Selection Controls */}
                  <div className="mt-auto space-y-4">
                    <div className="space-y-2">
                      <p className="text-[10px] font-bold text-gray-400 uppercase">المقاس</p>
                      <div className="flex flex-wrap gap-1.5">
                        {item.sizes.map(size => (
                          <button
                            key={size}
                            onClick={() => handleOptionSelect(item.id, 'size', size)}
                            className={`min-w-[2rem] h-8 rounded-md text-xs font-bold border flex items-center justify-center transition active:scale-95
                              ${currentSelection.size === size ? 'bg-pink-600 text-white border-pink-600 shadow-sm' : 'bg-white text-gray-600 border-gray-200 hover:border-pink-300'}
                            `}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                      <div className="flex items-center gap-2">
                        {item.colors.map(color => (
                          <button
                            key={color}
                            onClick={() => handleOptionSelect(item.id, 'color', color)}
                            className={`w-6 h-6 rounded-full border transition shadow-sm flex items-center justify-center
                              ${currentSelection.color === color ? 'border-pink-600 ring-1 ring-pink-600 ring-offset-1' : 'border-gray-200 hover:scale-110'}
                            `}
                            style={{ backgroundColor: color }}
                            title={color}
                          >
                          </button>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => toggleFavorite(item.id)}
                          className={`p-2 rounded-lg border transition shadow-sm ${isFav ? 'border-red-200 bg-red-50 text-red-500' : 'border-gray-200 text-gray-400 hover:text-red-500'}`}
                          title="إضافة للمفضلة"
                        >
                          <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                        </button>
                        <button 
                          onClick={() => addToCart(item, currentSelection.size, currentSelection.color)}
                          className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition shadow-md active:scale-95 flex items-center justify-center gap-2 text-xs font-bold"
                          aria-label="Add to cart"
                        >
                          <Plus className="w-4 h-4" />
                          إضافة
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
