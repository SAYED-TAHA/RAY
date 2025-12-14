
import React, { useState, useEffect } from 'react';
import { Car, MapPin, Search, Filter, Star, ShieldCheck, Phone, Loader } from 'lucide-react';

interface Props {
  onMerchantSelect: (merchant: any) => void;
}

const CarListing: React.FC<Props> = ({ onMerchantSelect }) => {
  const [dealerships, setDealerships] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('الكل');

  // Fetch dealerships from API
  useEffect(() => {
    const fetchDealerships = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/merchants?category=cars');
        if (!response.ok) {
          throw new Error('Failed to fetch dealerships');
        }
        const data = await response.json();
        const filteredDealerships = data.filter((merchant: any) => merchant.category === 'cars');
        setDealerships(filteredDealerships);
      } catch (error) {
        console.error('Error fetching dealerships:', error);
        setDealerships([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDealerships();
  }, []);

  // Filter dealerships based on search and type
  const filteredDealerships = dealerships.filter(dealership => {
    const matchesSearch = dealership.name.includes(searchTerm) || dealership.location.includes(searchTerm);
    const matchesType = selectedType === 'الكل' || dealership.type === selectedType;
    return matchesSearch && matchesType;
  });
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in slide-in-from-bottom-4">
      {/* Header */}
      <div className="mb-8 text-center md:text-right">
        <h2 className="text-3xl font-black text-ray-black mb-2">معارض السيارات والوكلاء</h2>
        <p className="text-gray-500">أكبر تجمع لمعارض السيارات الجديدة والمستعملة في مصر</p>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm mb-8 flex flex-col md:flex-row gap-4">
         <div className="flex-1 relative">
            <Search className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="ابحث عن معرض أو وكيل..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pr-10 pl-4 outline-none focus:border-red-500" 
            />
         </div>
         <div className="flex gap-2 w-full md:w-auto overflow-x-auto">
            <button 
              onClick={() => setSelectedType('الكل')}
              className={`px-4 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap border transition ${selectedType === 'الكل' ? 'bg-red-50 text-red-700 border-red-100' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
            >
              الكل
            </button>
            <button 
              onClick={() => setSelectedType('وكيل معتمد')}
              className={`px-4 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap border transition ${selectedType === 'وكيل معتمد' ? 'bg-red-50 text-red-700 border-red-100' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
            >
              وكيل معتمد
            </button>
            <button 
              onClick={() => setSelectedType('مستعمل')}
              className={`px-4 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap border transition ${selectedType === 'مستعمل' ? 'bg-red-50 text-red-700 border-red-100' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
            >
              مستعمل
            </button>
         </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader className="w-8 h-8 text-ray-blue animate-spin" />
        </div>
      ) : dealerships.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">لا توجد معارض سيارات متاحة حالياً</p>
          <p className="text-gray-400 text-sm mt-2">يرجى المحاولة لاحقاً</p>
        </div>
      ) : filteredDealerships.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">لا توجد معارض متطابقة مع البحث</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDealerships.map((item) => (
          <div 
            key={item.id} 
            onClick={() => onMerchantSelect(item)}
            className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden flex flex-col"
          >
            <div className="h-52 relative overflow-hidden">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700" 
                loading="lazy"
              />
              <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-lg text-xs font-bold shadow-sm">
                {item.type}
              </div>
              <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-xs font-bold text-gray-800 flex items-center gap-1 shadow-sm">
                 <ShieldCheck className="w-3 h-3 text-green-600" /> موثق
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                 <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition">{item.name}</h3>
                 <div className="flex items-center gap-1 text-yellow-500 text-sm font-bold bg-yellow-50 px-2 py-1 rounded-lg">
                    <Star className="w-3 h-3 fill-current" />
                    {item.rating}
                 </div>
              </div>
              
              <p className="text-sm text-gray-500 flex items-center gap-1 mb-4">
                 <MapPin className="w-4 h-4" /> {item.location}
              </p>

              <div className="bg-gray-50 p-3 rounded-xl mb-4 flex items-center justify-between border border-gray-100">
                 <span className="text-sm font-bold text-gray-600">المخزون المتاح</span>
                 <span className="text-sm text-gray-500">{item.reviews} تقييم</span>
              </div>

              <div className="mt-auto flex gap-2">
                 <button className="flex-1 py-2 bg-red-600 text-white rounded-lg font-bold text-sm hover:bg-red-700 transition">
                    عرض السيارات
                 </button>
                 <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition">
                    <Phone className="w-5 h-5" />
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

export default CarListing;
