
import React, { useState } from 'react';
import { MapPin, Star, ChevronRight, Navigation } from 'lucide-react';

interface Result {
  id: number;
  type: string;
  name: string;
  rating: number | string;
  image: string;
  subtitle: string;
  price: string;
  lat?: number; // Simulated latitude %
  lng?: number; // Simulated longitude %
}

interface SmartMapSearchProps {
  results: Result[];
  onSelect: (item: Result) => void;
}

const SmartMapSearch: React.FC<SmartMapSearchProps> = ({ results, onSelect }) => {
  const [activeId, setActiveId] = useState<number | null>(null);

  // Assign random coordinates if not present for simulation
  const mapResults = results.map((r, i) => ({
    ...r,
    lat: r.lat || 20 + (i * 15) % 60,
    lng: r.lng || 20 + (i * 25) % 60
  }));

  return (
    <div className="bg-blue-50 rounded-3xl overflow-hidden relative h-[600px] border border-gray-200 shadow-inner group">
      {/* Map Background Pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      
      {/* Grid Lines for Map Effect */}
      <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(#00000005 1px, transparent 1px), linear-gradient(90deg, #00000005 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>

      {/* Center Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
        <Navigation className="w-48 h-48 text-gray-900" />
      </div>

      {/* Pins */}
      {mapResults.map((item) => (
        <div
          key={item.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 z-10"
          style={{ top: `${item.lat}%`, left: `${item.lng}%` }}
          onMouseEnter={() => setActiveId(item.id)}
        >
          {/* Pulse Animation */}
          <div className={`absolute inset-0 bg-ray-blue rounded-full animate-ping opacity-20 ${activeId === item.id ? 'block' : 'hidden'}`}></div>
          
          <button 
            onClick={() => onSelect(item)}
            className={`relative w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-2 border-white transition-transform
              ${activeId === item.id ? 'bg-ray-black scale-125 z-20' : 'bg-ray-blue text-white hover:scale-110'}
            `}
          >
             <MapPin className={`w-5 h-5 ${activeId === item.id ? 'text-ray-gold' : 'text-white'}`} />
          </button>

          {/* Popup Card */}
          <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 origin-bottom
             ${activeId === item.id ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
          `}>
             <div className="h-24 relative">
                <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-0.5 rounded-lg text-[10px] font-bold">
                   {item.type}
                </div>
             </div>
             <div className="p-3">
                <div className="flex justify-between items-start mb-1">
                   <h4 className="font-bold text-sm text-gray-900 line-clamp-1">{item.name}</h4>
                   <div className="flex items-center gap-1 text-[10px] font-bold text-yellow-500">
                      <Star className="w-3 h-3 fill-current" /> {item.rating}
                   </div>
                </div>
                <p className="text-xs text-gray-500 mb-2">{item.subtitle}</p>
                <div className="flex justify-between items-center pt-2 border-t border-gray-50">
                   <span className="font-black text-ray-blue text-sm">{item.price}</span>
                   <button className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center hover:bg-ray-blue hover:text-white transition">
                      <ChevronRight className="w-4 h-4 rtl:rotate-180" />
                   </button>
                </div>
             </div>
             {/* Triangle Arrow */}
             <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white transform rotate-45 border-r border-b border-gray-100"></div>
          </div>
        </div>
      ))}
      
      {/* Map Controls */}
      <div className="absolute bottom-6 right-6 flex flex-col gap-2">
         <button className="w-10 h-10 bg-white rounded-xl shadow-md flex items-center justify-center text-gray-600 hover:text-ray-blue transition font-bold">+</button>
         <button className="w-10 h-10 bg-white rounded-xl shadow-md flex items-center justify-center text-gray-600 hover:text-ray-blue transition font-bold">-</button>
      </div>

      <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-sm border border-gray-200 text-xs font-bold text-gray-500 flex items-center gap-2">
         <Navigation className="w-4 h-4 text-ray-blue" />
         جاري عرض النتائج في منطقتك
      </div>
    </div>
  );
};

export default SmartMapSearch;
