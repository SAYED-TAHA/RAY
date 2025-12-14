
import React, { useState, useEffect } from 'react';
import { Stethoscope, Scissors, MapPin, Star, Calendar, Search, HeartPulse, Dumbbell, Loader } from 'lucide-react';

interface Props {
  onMerchantSelect: (merchant: any) => void;
  category?: 'health' | 'beauty';
}

const HealthBeautyListing: React.FC<Props> = ({ onMerchantSelect, category = 'health' }) => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const isHealth = category === 'health';
  const title = isHealth ? 'الصحة والطب' : 'الجمال والعناية';
  const subTitle = isHealth ? 'أفضل الأطباء والمراكز الطبية' : 'تألقي مع أفضل الصالونات ومراكز التجميل';
  const themeColor = isHealth ? 'text-teal-600' : 'text-pink-600';
  const btnColor = isHealth ? 'bg-teal-600 hover:bg-teal-700' : 'bg-pink-600 hover:bg-pink-700';

  // Fetch items from API
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const categoryParam = isHealth ? 'clinic' : 'gym';
        const response = await fetch(`/api/merchants?category=${categoryParam}`);
        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }
        const data = await response.json();
        const filteredItems = data.filter((merchant: any) => merchant.category === categoryParam);
        setItems(filteredItems);
      } catch (error) {
        console.error('Error fetching items:', error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [isHealth]);

  // Filter items based on search
  const filteredItems = items.filter(item =>
    item.name.includes(searchTerm) || item.type.includes(searchTerm)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in slide-in-from-bottom-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-ray-black flex items-center gap-2">
            {isHealth ? <HeartPulse className={`w-8 h-8 ${themeColor}`} /> : <Scissors className={`w-8 h-8 ${themeColor}`} />}
            {title}
          </h2>
          <p className="text-gray-500 mt-1">{subTitle}</p>
        </div>
        
        <div className="relative w-full md:w-72">
           <Search className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
           <input 
             type="text" 
             placeholder={isHealth ? "ابحث عن طبيب أو تخصص..." : "ابحث عن صالون أو خدمة..."} 
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
             className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pr-10 pl-4 text-sm focus:outline-none focus:border-ray-blue" 
           />
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader className="w-8 h-8 text-ray-blue animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">لا توجد {isHealth ? 'عيادات' : 'صالونات'} متاحة حالياً</p>
          <p className="text-gray-400 text-sm mt-2">يرجى المحاولة لاحقاً</p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">لا توجد نتائج متطابقة مع البحث</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
          <div 
            key={item.id} 
            onClick={() => onMerchantSelect({ ...item, category: isHealth ? 'clinic' : 'gym' })}
            className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col"
          >
            <div className="h-48 relative overflow-hidden">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700" 
                loading="lazy"
              />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 text-xs font-bold shadow-sm">
                {isHealth ? <Stethoscope className="w-3 h-3 text-teal-600" /> : <Dumbbell className="w-3 h-3 text-pink-600" />}
                {item.type}
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className={`text-lg font-bold text-gray-900 group-hover:${isHealth ? 'text-teal-600' : 'text-pink-600'} transition`}>{item.name}</h3>
                <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-100">
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <span className="text-xs font-bold text-gray-800">{item.rating}</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-500 mb-4">{item.specialty}</p>
              
              <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <MapPin className="w-3 h-3" />
                  {item.location}
                </div>
                <button className={`text-white px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 ${btnColor}`}>
                  <Calendar className="w-3 h-3" />
                  حجز موعد
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

export default HealthBeautyListing;
