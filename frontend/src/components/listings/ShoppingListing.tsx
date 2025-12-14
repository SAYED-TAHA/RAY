
import React, { useState, useEffect } from 'react';
import { ShoppingBag, MapPin, Star, Tag, Filter, Search, Heart, Loader } from 'lucide-react';
import { useMarketplace } from '@/context/MarketplaceContext';
import ProductCard from '../cards/ProductCard';

interface Props {
  onMerchantSelect: (merchant: any) => void;
  onProductClick?: (id: string) => void;
}

const ShoppingListing: React.FC<Props> = ({ onMerchantSelect, onProductClick }) => {
  const { toggleFavorite, isFavorite } = useMarketplace();
  const [shops, setShops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');

  const categories = ['الكل', 'سوبر ماركت', 'ملابس', 'إلكترونيات', 'مكتبات', 'هدايا', 'أثاث'];

  // Fetch shops from API
  useEffect(() => {
    const fetchShops = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/merchants/shops?category=shopping');
        if (!response.ok) {
          throw new Error('Failed to fetch shops');
        }
        const data = await response.json();
        setShops(data);
      } catch (error) {
        console.error('Error fetching shops:', error);
        setShops([]);
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, []);

  // Filter shops based on search and category
  const filteredShops = shops.filter(shop => {
    const matchesSearch = shop.name.includes(searchTerm) || shop.type.includes(searchTerm);
    const matchesCategory = selectedCategory === 'الكل' || shop.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in slide-in-from-bottom-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-ray-black">التسوق والمحلات</h2>
          <p className="text-gray-500 mt-1">أفضل الماركات والمحلات التجارية حولك</p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
           <div className="relative flex-1 md:w-64">
             <Search className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
             <input 
               type="text" 
               placeholder="بحث عن محل أو منتج..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pr-10 pl-4 text-sm focus:outline-none focus:border-ray-blue" 
             />
           </div>
           <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2.5 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50">
             <Filter className="w-4 h-4" />
             فلتر
           </button>
        </div>
      </div>

      {/* Categories Pills */}
      <div className="flex gap-3 overflow-x-auto pb-6 mb-2 no-scrollbar">
        {categories.map((cat) => (
          <button 
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap transition ${selectedCategory === cat ? 'bg-ray-black text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <h3 className="text-xl font-bold mb-4 text-gray-800">المتاجر</h3>
      
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader className="w-8 h-8 text-ray-blue animate-spin" />
        </div>
      ) : shops.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">لا توجد متاجر متاحة حالياً</p>
          <p className="text-gray-400 text-sm mt-2">يرجى المحاولة لاحقاً</p>
        </div>
      ) : filteredShops.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">لا توجد متاجر متطابقة مع البحث</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredShops.map((item) => (
          <div 
            key={item.id} 
            className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col relative"
          >
             {/* Favorite Button Overlay */}
             <button 
                onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(item.id.toString());
                }}
                className={`absolute top-3 left-3 z-20 p-2 rounded-full bg-white/80 backdrop-blur shadow-sm transition ${isFavorite(item.id.toString()) ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
             >
                <Heart className={`w-4 h-4 ${isFavorite(item.id.toString()) ? 'fill-current' : ''}`} />
             </button>

            <div className="h-48 relative overflow-hidden" onClick={() => onMerchantSelect({ ...item, category: 'shopping' })}>
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700" 
                loading="lazy"
              />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 text-xs font-bold shadow-sm">
                <Tag className="w-3 h-3 text-blue-500" />
                {item.type}
              </div>
              <div className={`absolute bottom-3 right-3 px-2 py-1 rounded-lg text-xs font-bold shadow-sm ${item.status === 'open' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                {item.status === 'open' ? 'مفتوح الآن' : 'مغلق'}
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col" onClick={() => onMerchantSelect({ ...item, category: 'shopping' })}>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition line-clamp-1">{item.name}</h3>
                <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-100 shrink-0">
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <span className="text-xs font-bold text-gray-800">{item.rating}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
                <MapPin className="w-3.5 h-3.5" />
                {item.location}
              </div>
              
              <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
                <span className="text-xs text-gray-400">{item.reviews} تقييم</span>
                <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 group-hover:bg-ray-blue group-hover:text-white transition">
                  <ShoppingBag className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
        </div>
      )}
    </div>
  );
};

export default ShoppingListing;
