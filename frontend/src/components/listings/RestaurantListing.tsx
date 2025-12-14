
import React, { useState, useEffect } from 'react';
import { Star, Clock, MapPin, Bike, Filter, Search, Loader } from 'lucide-react';
import Image from 'next/image';

interface Props {
  onMerchantSelect: (merchant: any) => void;
  title?: string;
}

const RestaurantListing: React.FC<Props> = ({ onMerchantSelect, title = "المطاعم والكافيهات" }) => {
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch restaurants from API
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/merchants?category=restaurant');
        if (!response.ok) {
          throw new Error('Failed to fetch restaurants');
        }
        const data = await response.json();
        const filteredRestaurants = data.filter((merchant: any) => merchant.category === 'restaurant');
        setRestaurants(filteredRestaurants);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
        setRestaurants([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  // Filter restaurants based on search
  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.name.includes(searchTerm) || restaurant.type.includes(searchTerm)
  );
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in slide-in-from-bottom-4">
      {/* Header & Filter */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-ray-black">{title}</h2>
          <p className="text-gray-500 mt-1">اكتشف أفضل الأماكن القريبة منك</p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
           <div className="relative flex-1 md:w-64">
             <Search className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
             <input 
               type="text" 
               placeholder="بحث باسم المطعم..." 
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

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader className="w-8 h-8 text-ray-blue animate-spin" />
        </div>
      ) : restaurants.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">لا توجد مطاعم متاحة حالياً</p>
          <p className="text-gray-400 text-sm mt-2">يرجى المحاولة لاحقاً</p>
        </div>
      ) : filteredRestaurants.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">لا توجد مطاعم متطابقة مع البحث</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((item) => (
          <div 
            key={item.id} 
            onClick={() => onMerchantSelect(item)}
            className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
          >
            {/* Image */}
            <div className="h-48 overflow-hidden relative">
              <Image 
                src={item.image} 
                alt={item.name} 
                fill
                className="object-cover group-hover:scale-110 transition duration-700" 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 text-xs font-bold shadow-sm">
                <Clock className="w-3 h-3 text-gray-500" />
                {item.time}
              </div>
              {item.delivery === 0 && (
                <div className="absolute bottom-3 right-3 bg-green-500 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-sm">
                  توصيل مجاني
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-5">
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-ray-blue transition">{item.name}</h3>
                <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-100">
                  <Star className="w-3.5 h-3.5 text-yellow-500 fill-current" />
                  <span className="text-xs font-bold text-gray-800">{item.rating}</span>
                  <span className="text-[10px] text-gray-400">({item.reviews})</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-500 mb-4">{item.type}</p>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-50 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Bike className="w-3.5 h-3.5" />
                  <span>توصيل: {item.delivery === 0 ? 'مجاني' : `${item.delivery} ج`}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>المعادي</span>
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

export default RestaurantListing;
