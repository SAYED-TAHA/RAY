
import React, { useState } from 'react';
import { MapPin, Home, Building, Navigation, Layers, Search, Filter } from 'lucide-react';

const properties = [
  { id: 1, title: 'شقة 180م - اللوتس', price: '3.5M', lat: 40, lng: 30, type: 'sale', category: 'apartment' },
  { id: 2, title: 'فيلا مستقلة - زايد', price: '12M', lat: 20, lng: 60, type: 'sale', category: 'villa' },
  { id: 3, title: 'مقر إداري - التجمع', price: '45k', lat: 60, lng: 45, type: 'rent', category: 'commercial' },
  { id: 4, title: 'شالية - الساحل', price: '4.2M', lat: 15, lng: 20, type: 'sale', category: 'chalet' },
  { id: 5, title: 'دوبلكس - الشروق', price: '6.5M', lat: 70, lng: 70, type: 'sale', category: 'apartment' },
];

const RealEstateMap: React.FC = () => {
  const [selectedProp, setSelectedProp] = useState<number | null>(null);
  const [filterType, setFilterType] = useState('all');

  const filteredProps = filterType === 'all' ? properties : properties.filter(p => p.type === filterType);

  return (
    <div className="h-full flex flex-col space-y-4 animate-in fade-in">
      {/* Map Header */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Navigation className="w-6 h-6 text-green-600" />
            الخريطة العقارية
          </h2>
          <p className="text-sm text-gray-500">استكشف الوحدات المتاحة على الخريطة</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
           <div className="relative flex-1 md:w-64">
              <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="بحث بمنطقة..." className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 pr-10 pl-4 text-sm outline-none focus:border-green-500" />
           </div>
           <div className="flex bg-gray-100 p-1 rounded-xl">
              <button 
                onClick={() => setFilterType('all')}
                className={`px-4 py-1.5 rounded-lg text-sm font-bold transition ${filterType === 'all' ? 'bg-white text-green-700 shadow-sm' : 'text-gray-500'}`}
              >
                الكل
              </button>
              <button 
                onClick={() => setFilterType('sale')}
                className={`px-4 py-1.5 rounded-lg text-sm font-bold transition ${filterType === 'sale' ? 'bg-white text-green-700 shadow-sm' : 'text-gray-500'}`}
              >
                بيع
              </button>
              <button 
                onClick={() => setFilterType('rent')}
                className={`px-4 py-1.5 rounded-lg text-sm font-bold transition ${filterType === 'rent' ? 'bg-white text-green-700 shadow-sm' : 'text-gray-500'}`}
              >
                إيجار
              </button>
           </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 bg-blue-50 rounded-3xl overflow-hidden relative border border-gray-200 shadow-inner group">
        {/* Simulated Map Background */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
           <div className="text-center opacity-10">
              <Navigation className="w-32 h-32 mx-auto mb-4" />
              <h3 className="text-4xl font-black">Map View</h3>
           </div>
        </div>

        {/* Grid Lines for Effect */}
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(#00000005 1px, transparent 1px), linear-gradient(90deg, #00000005 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

        {/* Pins */}
        {filteredProps.map((prop) => (
          <button
            key={prop.id}
            onClick={() => setSelectedProp(prop.id)}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 group/pin
              ${selectedProp === prop.id ? 'scale-125 z-20' : 'scale-100 hover:scale-110 z-10'}
            `}
            style={{ top: `${prop.lat}%`, left: `${prop.lng}%` }}
          >
            <div className={`relative flex flex-col items-center ${selectedProp === prop.id ? '-mt-12' : ''}`}>
               {/* Tooltip / Label */}
               <div className={`mb-2 bg-white px-3 py-1.5 rounded-lg shadow-lg border border-gray-100 whitespace-nowrap transition-all
                 ${selectedProp === prop.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 group-hover/pin:opacity-100 group-hover/pin:translate-y-0'}
               `}>
                  <p className="text-xs font-bold text-gray-800">{prop.title}</p>
                  <p className="text-[10px] font-black text-green-600">{prop.price} {prop.type === 'rent' ? '/شهر' : ''}</p>
               </div>
               
               {/* Pin Icon */}
               <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-2 border-white
                 ${prop.type === 'sale' ? 'bg-green-600' : 'bg-blue-600'}
               `}>
                  {prop.category === 'apartment' ? <Building className="w-5 h-5 text-white" /> : 
                   prop.category === 'villa' ? <Home className="w-5 h-5 text-white" /> : 
                   <Layers className="w-5 h-5 text-white" />}
               </div>
               {/* Pulse Effect */}
               {selectedProp === prop.id && (
                 <div className={`absolute bottom-0 w-10 h-10 rounded-full animate-ping opacity-50
                   ${prop.type === 'sale' ? 'bg-green-400' : 'bg-blue-400'}
                 `}></div>
               )}
            </div>
          </button>
        ))}

        {/* Property Details Overlay */}
        {selectedProp && (
          <div className="absolute bottom-4 left-4 right-4 md:left-auto md:w-80 bg-white p-4 rounded-2xl shadow-2xl border border-gray-100 animate-in slide-in-from-bottom-10 fade-in z-30">
             <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-gray-900 text-lg">{properties.find(p => p.id === selectedProp)?.title}</h3>
                <button onClick={() => setSelectedProp(null)} className="text-gray-400 hover:text-gray-600">×</button>
             </div>
             <div className="h-32 bg-gray-100 rounded-xl mb-3 overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400" className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">
                   {properties.find(p => p.id === selectedProp)?.type === 'sale' ? 'بيع' : 'إيجار'}
                </span>
             </div>
             <div className="flex justify-between items-center">
                <span className="text-xl font-black text-green-700">{properties.find(p => p.id === selectedProp)?.price}</span>
                <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-black transition">التفاصيل</button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RealEstateMap;
