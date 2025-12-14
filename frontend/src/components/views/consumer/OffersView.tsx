
import React, { useState, useEffect } from 'react';
import { Tag, Search, Utensils, Stethoscope, ShoppingBag, Home, Gift, Percent, Loader, AlertCircle } from 'lucide-react';
import ProductCard from '../../cards/ProductCard';
import axios from 'axios';

interface Offer {
  id?: string;
  _id?: string;
  title: string;
  shop: string;
  image: string;
  price: number | string;
  oldPrice?: number | string;
  rating: number;
  tag?: string;
  category: string;
  type?: string;
  merchant?: string;
  discount?: string;
}

interface Category {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface Props {
  onNavigate: (view: string, params?: any) => void;
  onProductClick?: (id: string) => void;
}

const OffersView: React.FC<Props> = ({ onNavigate, onProductClick }) => {
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const categories: Category[] = [
    { id: 'all', label: 'الكل', icon: Tag },
    { id: 'food', label: 'مطاعم', icon: Utensils },
    { id: 'clinic', label: 'صحة وجمال', icon: Stethoscope },
    { id: 'retail', label: 'تسوق', icon: ShoppingBag },
    { id: 'realestate', label: 'عقارات', icon: Home },
  ];

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Offer[]>('/api/offers');
        setOffers(response.data);
      } catch (err) {
        console.error('Error fetching offers:', err);
        setError('فشل في تحميل العروض. يرجى المحاولة مرة أخرى.');
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  const filteredOffers = offers
    .filter((o: Offer) => 
      (filter === 'all' || o.category === filter) &&
      (o.title.toLowerCase().includes(search.toLowerCase()) || 
       o.shop.toLowerCase().includes(search.toLowerCase()))
    )
    .map((offer: Offer) => ({
      id: offer._id || offer.id || '',
      title: offer.title,
      shop: offer.shop,
      image: offer.image,
      price: offer.price,
      oldPrice: offer.oldPrice || 0,
      rating: offer.rating,
      tag: offer.tag,
      category: offer.category,
      merchant: offer.shop,
      type: offer.category,
      discount: offer.tag || ''
    } as Offer));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-bottom-4">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-3xl p-8 text-white text-center mb-12 relative overflow-hidden shadow-xl">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
         <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
         <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
         
         <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-6 shadow-lg animate-bounce">
                <Gift className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4">عروض وتخفيضات حصرية</h1>
            <p className="text-pink-100 text-lg max-w-2xl mx-auto font-medium">
                استمتع بأقوى الخصومات من مئات المتاجر والمطاعم والخدمات في مكان واحد. وفر أكثر مع راي!
            </p>
         </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center sticky top-20 z-20 bg-gray-50/90 backdrop-blur-sm py-2 -mx-4 px-4 md:mx-0 md:px-0">
         <div className="flex gap-2 overflow-x-auto max-w-full pb-2 md:pb-0 no-scrollbar">
            {categories.map(cat => (
               <button
                 key={cat.id}
                 onClick={() => setFilter(cat.id)}
                 className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition whitespace-nowrap shadow-sm
                   ${filter === cat.id 
                     ? 'bg-gray-900 text-white transform scale-105' 
                     : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-100'}
                 `}
               >
                  <cat.icon className="w-4 h-4" />
                  {cat.label}
               </button>
            ))}
         </div>
         
         <div className="relative w-full md:w-72">
            <Search className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="بحث عن عرض..." 
              className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pr-10 pl-4 text-sm focus:outline-none focus:border-blue-500 shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
         </div>
      </div>

      {/* Loading and Error States */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader className="w-8 h-8 text-blue-500 animate-spin" />
          <span className="mr-2">جاري تحميل العروض...</span>
        </div>
      ) : error ? (
        <div className="bg-red-50 p-4 rounded-lg text-red-700 flex items-center justify-center gap-2">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      ) : filteredOffers.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">لا توجد عروض متاحة حالياً</p>
          <p className="text-gray-400 text-sm mt-2">يرجى المحاولة لاحقاً أو تغيير فلتر البحث</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredOffers.map((offer) => (
            <div key={offer.id} className="h-full">
              <ProductCard 
                onClick={onProductClick}
                product={{
                  id: offer.id,
                  name: offer.title,
                  price: offer.price,
                  oldPrice: offer.oldPrice,
                  image: offer.image,
                  rating: offer.rating,
                  merchant: offer.merchant,
                  discount: offer.discount,
                  category: offer.type
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OffersView;
 
