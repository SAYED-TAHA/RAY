
import React, { useState } from 'react';
import { Plus, Star, TrendingUp } from 'lucide-react';

interface MerchantOrderingProps {
  categories: string[];
  menuItems: any[];
  addToCart: (item: any) => void;
  onProductClick?: (product: any) => void;
}

const MerchantOrdering: React.FC<MerchantOrderingProps> = ({ categories, menuItems, addToCart, onProductClick }) => {
  const [activeCategory, setActiveCategory] = useState('الكل');

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
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'}
              `}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-24">
        {menuItems.filter(i => activeCategory === 'الكل' || i.category === activeCategory).map((item) => (
          <div key={item.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group">
            {/* Product Image */}
            <div className="relative h-48 overflow-hidden bg-gray-100">
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                loading="lazy"
              />
              {item.popular && (
                <div className="absolute top-4 right-4 bg-ray-gold text-gray-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  الأكثر مبيعاً
                </div>
              )}
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
                {item.desc}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < 4
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  4.5 (23 تقييم)
                </span>
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
                  أضف للسلة
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
    </div>
  );
};

export default MerchantOrdering;
