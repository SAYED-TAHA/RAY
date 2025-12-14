
import React, { useState, useEffect } from 'react';
import { Wrench, MapPin, Star, Clock, Search, Filter, Shirt, Zap, Droplets, Loader } from 'lucide-react';

interface Props {
  onMerchantSelect: (merchant: any) => void;
}

const ServiceListing: React.FC<Props> = ({ onMerchantSelect }) => {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/merchants?category=services');
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        const data = await response.json();
        const filteredServices = data.filter((merchant: any) => merchant.category === 'services');
        setServices(filteredServices);
      } catch (error) {
        console.error('Error fetching services:', error);
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Filter services based on search
  const filteredServices = services.filter(service =>
    service.name.includes(searchTerm) || service.type.includes(searchTerm)
  );
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in slide-in-from-bottom-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-ray-black">الخدمات والصيانة</h2>
          <p className="text-gray-500 mt-1">فنيين محترفين وشركات خدمات موثوقة</p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
           <div className="relative flex-1 md:w-64">
             <Search className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
             <input 
               type="text" 
               placeholder="ابحث عن سباك، كهربائي..." 
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
      ) : services.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">لا توجد خدمات متاحة حالياً</p>
          <p className="text-gray-400 text-sm mt-2">يرجى المحاولة لاحقاً</p>
        </div>
      ) : filteredServices.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">لا توجد خدمات متطابقة مع البحث</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((item) => (
          <div 
            key={item.id} 
            onClick={() => onMerchantSelect({ ...item, category: 'services' })}
            className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col"
          >
            <div className="h-40 relative overflow-hidden">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700" 
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-3 right-3 text-white">
                 <div className="flex items-center gap-1 text-sm font-bold">
                    {item.type === 'دراي كلين' ? <Shirt className="w-4 h-4" /> : item.type === 'كهرباء' ? <Zap className="w-4 h-4" /> : <Wrench className="w-4 h-4" />}
                    {item.type}
                 </div>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-cyan-600 transition">{item.name}</h3>
                <div className="flex items-center gap-1 text-yellow-500 text-xs font-bold">
                  <Star className="w-3 h-3 fill-current" />
                  {item.rating}
                </div>
              </div>
              
              
              <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <MapPin className="w-3 h-3" />
                  {item.location}
                </div>
                <button className="text-xs font-bold text-cyan-600 bg-cyan-50 px-3 py-1.5 rounded-lg hover:bg-cyan-100 transition">
                  حجز خدمة
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

export default ServiceListing;
