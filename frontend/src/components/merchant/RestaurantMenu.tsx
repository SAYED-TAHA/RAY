import React, { useState } from 'react';
import { Plus, Star, Clock, Users, TrendingUp } from 'lucide-react';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  prepTime: string;
  popular?: boolean;
  spicy?: boolean;
  vegetarian?: boolean;
}

interface RestaurantMenuProps {
  categories: string[];
  menuItems: MenuItem[];
  addToCart: (item: MenuItem) => void;
  onProductClick?: (item: MenuItem) => void;
}

const RestaurantMenu: React.FC<RestaurantMenuProps> = ({ 
  categories, 
  menuItems, 
  addToCart, 
  onProductClick 
}) => {
  const [activeCategory, setActiveCategory] = useState('الكل');

  const filteredItems = menuItems.filter(item => 
    activeCategory === 'الكل' || item.category === activeCategory
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4">
      {/* Sticky Categories */}
      <div className="sticky top-[135px] z-20 bg-gray-50/95 dark:bg-gray-900/95 backdrop-blur py-3 -mx-4 px-4 mb-4 border-b border-gray-200/50 dark:border-gray-800/50 transition-colors">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => (
            <button 
              key={cat} 
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition shadow-sm border min-w-[80px]
                ${activeCategory === cat 
                  ? 'bg-ray-black dark:bg-white text-white dark:text-ray-black border-ray-black dark:border-white' 
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-24">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group">
            {/* Product Image */}
            <div className="relative h-48 overflow-hidden bg-gray-100">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                loading="lazy"
              />
              
              {/* Badges */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                {item.popular && (
                  <div className="bg-ray-gold text-gray-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    الأكثر طلباً
                  </div>
                )}
                {item.spicy && (
                  <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    حار
                  </div>
                )}
                {item.vegetarian && (
                  <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    نباتي
                  </div>
                )}
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Product Info */}
            <div className="p-4">
              {/* Category */}
              <div className="text-xs text-gray-500 mb-1">{item.category}</div>
              
              {/* Name */}
              <h3 className="font-bold text-gray-900 mb-2 group-hover:text-ray-blue transition">
                {item.name}
              </h3>
              
              {/* Description */}
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {item.description}
              </p>

              {/* Rating and Prep Time */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(item.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    {item.rating} ({item.reviews} تقييم)
                  </span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>{item.prepTime}</span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xl font-bold text-ray-blue">
                  {item.price} جنيه
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button 
                  onClick={() => onProductClick ? onProductClick(item) : addToCart(item)}
                  className="flex-1 bg-ray-gold text-ray-black py-2 rounded-lg font-bold hover:bg-ray-gold/90 transition flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  أضف للطلب
                </button>
                <button 
                  onClick={() => onProductClick && onProductClick(item)}
                  className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  <TrendingUp className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-6 h-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">لا توجد أطباق في هذه الفئة</h3>
          <p className="text-gray-500">جرب فئة أخرى من القائمة</p>
        </div>
      )}
    </div>
  );
};

export default RestaurantMenu;
