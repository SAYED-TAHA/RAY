
import React, { useState, useEffect } from 'react';
import { Ticket, GraduationCap, MapPin, Calendar, Search, Music, Video, Loader } from 'lucide-react';

interface Props {
  onMerchantSelect: (merchant: any) => void;
  category?: 'education' | 'entertainment';
}

const EventListing: React.FC<Props> = ({ onMerchantSelect, category = 'entertainment' }) => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const isEdu = category === 'education';
  const title = isEdu ? 'التعليم والتدريب' : 'الترفيه والسياحة';
  const subTitle = isEdu ? 'طوّر مهاراتك مع أفضل المراكز التعليمية' : 'استمتع بأفضل الأوقات والفعاليات';
  const themeColor = isEdu ? 'text-indigo-600' : 'text-purple-600';

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const categoryParam = isEdu ? 'education' : 'entertainment';
        const response = await fetch(`/api/merchants?category=${categoryParam}`);
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        const filteredEvents = data.filter((merchant: any) => merchant.category === categoryParam);
        setEvents(filteredEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [isEdu]);

  // Filter events based on search
  const filteredEvents = events.filter(event =>
    event.name.includes(searchTerm) || event.type.includes(searchTerm)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in slide-in-from-bottom-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-ray-black flex items-center gap-2">
            {isEdu ? <GraduationCap className={`w-8 h-8 ${themeColor}`} /> : <Ticket className={`w-8 h-8 ${themeColor}`} />}
            {title}
          </h2>
          <p className="text-gray-500 mt-1">{subTitle}</p>
        </div>
        
        <div className="relative w-full md:w-72">
           <Search className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
           <input 
             type="text" 
             placeholder={isEdu ? "ابحث عن كورس أو مركز..." : "ابحث عن فعالية أو مكان..."} 
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
      ) : events.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">لا توجد {isEdu ? 'كورسات' : 'فعاليات'} متاحة حالياً</p>
          <p className="text-gray-400 text-sm mt-2">يرجى المحاولة لاحقاً</p>
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">لا توجد نتائج متطابقة مع البحث</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((item) => (
          <div 
            key={item.id} 
            onClick={() => onMerchantSelect({ ...item, category: isEdu ? 'education' : 'entertainment' })}
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
                {item.type === 'سينما' ? <Video className="w-3 h-3" /> : item.type === 'حفلات' ? <Music className="w-3 h-3" /> : <Ticket className="w-3 h-3" />}
                {item.type}
              </div>
              {item.date && (
                <div className="absolute bottom-3 left-3 bg-black/70 text-white px-2 py-1 rounded-lg text-xs flex items-center gap-1 backdrop-blur-md">
                   <Calendar className="w-3 h-3" /> {item.date}
                </div>
              )}
            </div>

            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className={`text-lg font-bold text-gray-900 group-hover:${isEdu ? 'text-indigo-600' : 'text-purple-600'} transition`}>{item.name}</h3>
              </div>
              
              <p className="text-sm text-gray-500 mb-4">{item.details}</p>
              
              <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <MapPin className="w-3 h-3" />
                  {item.location}
                </div>
                <span className="text-sm font-black text-gray-900 bg-gray-100 px-3 py-1 rounded-lg">
                  {item.price}
                </span>
              </div>
            </div>
          </div>
        ))}
        </div>
      )}
    </div>
  );
};

export default EventListing;
