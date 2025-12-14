
import React, { useState, useEffect } from 'react';
import { Building2, MapPin, Search, Filter, Star, Home, Users, Loader } from 'lucide-react';

interface Props {
  onMerchantSelect: (merchant: any) => void;
}

const RealEstateListing: React.FC<Props> = ({ onMerchantSelect }) => {
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('الكل');

  // Fetch companies from API
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/merchants?category=realestate');
        if (!response.ok) {
          throw new Error('Failed to fetch companies');
        }
        const data = await response.json();
        const filteredCompanies = data.filter((merchant: any) => merchant.category === 'realestate');
        setCompanies(filteredCompanies);
      } catch (error) {
        console.error('Error fetching companies:', error);
        setCompanies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  // Filter companies based on search and type
  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.includes(searchTerm) || company.location.includes(searchTerm);
    const matchesType = selectedType === 'الكل' || company.type === selectedType;
    return matchesSearch && matchesType;
  });
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in slide-in-from-bottom-4">
      {/* Header */}
      <div className="mb-8 text-center md:text-right">
        <h2 className="text-3xl font-black text-ray-black mb-2">شركات العقارات والمطورين</h2>
        <p className="text-gray-500">تصفح أفضل شركات التطوير والوساطة العقارية في مصر</p>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm mb-8 flex flex-col md:flex-row gap-4">
         <div className="flex-1 relative">
            <Search className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="ابحث عن شركة أو مطور..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pr-10 pl-4 outline-none focus:border-green-500" 
            />
         </div>
         <div className="flex gap-2 w-full md:w-auto overflow-x-auto">
            <button 
              onClick={() => setSelectedType('الكل')}
              className={`px-4 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap border transition ${selectedType === 'الكل' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
            >
              الكل
            </button>
            <button 
              onClick={() => setSelectedType('مطور عقاري')}
              className={`px-4 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap border transition ${selectedType === 'مطور عقاري' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
            >
              مطور عقاري
            </button>
            <button 
              onClick={() => setSelectedType('وسيط عقاري')}
              className={`px-4 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap border transition ${selectedType === 'وسيط عقاري' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
            >
              وسيط عقاري
            </button>
         </div>
         <button className="px-4 py-2.5 bg-white text-gray-700 rounded-xl font-bold text-sm border border-gray-200 hover:bg-gray-50 flex items-center gap-2">
            <Filter className="w-4 h-4" /> فلتر
         </button>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader className="w-8 h-8 text-ray-blue animate-spin" />
        </div>
      ) : companies.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">لا توجد شركات عقارات متاحة حالياً</p>
          <p className="text-gray-400 text-sm mt-2">يرجى المحاولة لاحقاً</p>
        </div>
      ) : filteredCompanies.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">لا توجد شركات متطابقة مع البحث</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCompanies.map((item) => (
          <div 
            key={item.id} 
            onClick={() => onMerchantSelect(item)}
            className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden flex flex-col"
          >
            <div className="h-48 relative overflow-hidden">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700" 
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 right-4 text-white">
                 <h3 className="text-xl font-bold mb-1">{item.name}</h3>
                 <p className="text-xs opacity-90 flex items-center gap-1"><MapPin className="w-3 h-3" /> {item.location}</p>
              </div>
              <div className="absolute top-4 left-4 bg-white text-green-700 px-3 py-1 rounded-lg text-xs font-bold shadow-md">
                {item.type}
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                 <div className="flex items-center gap-2">
                    <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                       <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                       <p className="text-xs text-gray-500 font-bold">مشاريع نشطة</p>
                       <p className="text-xs text-gray-500">{item.reviews} تقييم</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                       <Home className="w-5 h-5" />
                    </div>
                    <div>
                       <p className="text-xs text-gray-500 font-bold">وحدات متاحة</p>
                    </div>
                 </div>
              </div>

              <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
                 <div className="flex items-center gap-1 text-yellow-500 text-sm font-bold">
                    <Star className="w-4 h-4 fill-current" />
                    {item.rating}
                 </div>
                 <button className="text-sm font-bold text-green-700 bg-green-50 px-4 py-2 rounded-lg hover:bg-green-100 transition">
                    تصفح الوحدات
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

export default RealEstateListing;
