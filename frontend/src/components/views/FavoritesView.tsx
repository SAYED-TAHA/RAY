import React, { useState } from 'react';
import { Heart, Star } from 'lucide-react';

interface FavoritesViewProps {
  onNavigate?: (view: string) => void;
}

const FavoritesView: React.FC<FavoritesViewProps> = ({ onNavigate }) => {
  const [favorites, setFavorites] = useState([
    { id: 1, name: 'تيشيرت قطن', price: 120, rating: 4.8 },
    { id: 2, name: 'حذاء رياضي', price: 450, rating: 4.9 },
  ]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
        <Heart className="w-8 h-8 text-red-500" />
        المفضلات
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {favorites.map(item => (
          <div key={item.id} className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="w-full h-48 bg-gray-100 rounded-xl mb-4"></div>
            <h3 className="font-bold text-gray-900 mb-2">{item.name}</h3>
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-500">{item.rating}</span>
            </div>
            <p className="text-xl font-bold text-gray-900 mb-4">{item.price} ج.م</p>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold">
              أضف للسلة
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesView;
