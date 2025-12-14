
import React, { useState } from 'react';
import { X, Filter, Check, Star, RotateCcw, Truck, BadgePercent } from 'lucide-react';

interface SearchFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
}

const SearchFilterModal: React.FC<SearchFilterModalProps> = ({ isOpen, onClose, onApply }) => {
  const [priceRange, setPriceRange] = useState(500);
  const [minRating, setMinRating] = useState(0);
  const [features, setFeatures] = useState<string[]>([]);

  if (!isOpen) return null;

  const toggleFeature = (feature: string) => {
    setFeatures(prev => 
      prev.includes(feature) ? prev.filter(f => f !== feature) : [...prev, feature]
    );
  };

  const handleApply = () => {
    onApply({ priceRange, minRating, features });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="bg-white w-full sm:max-w-md sm:rounded-3xl rounded-t-3xl shadow-2xl relative z-10 flex flex-col max-h-[90vh] animate-in slide-in-from-bottom-10 duration-300">
        
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-xl flex items-center gap-2">
            <Filter className="w-5 h-5 text-ray-blue" />
            تصفية النتائج
          </h3>
          <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Price Range */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-gray-800 text-sm">نطاق السعر</h4>
              <span className="text-xs font-bold text-ray-blue bg-blue-50 px-2 py-1 rounded">
                حتى {priceRange > 2000 ? '2000+' : priceRange} ج.م
              </span>
            </div>
            <input 
              type="range" 
              min="50" 
              max="2500" 
              step="50"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-ray-blue h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>50 ج</span>
              <span>2500+ ج</span>
            </div>
          </div>

          {/* Rating */}
          <div className="space-y-3">
            <h4 className="font-bold text-gray-800 text-sm">التقييم</h4>
            <div className="flex gap-2">
              {[4, 3, 2, 1].map((rate) => (
                <button
                  key={rate}
                  onClick={() => setMinRating(rate)}
                  className={`flex-1 py-2 rounded-xl border text-sm font-bold flex items-center justify-center gap-1 transition
                    ${minRating === rate 
                      ? 'bg-ray-black text-white border-ray-black' 
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}
                  `}
                >
                  {rate}+ <Star className="w-3 h-3 fill-current" />
                </button>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="space-y-3">
            <h4 className="font-bold text-gray-800 text-sm">المميزات</h4>
            <div className="grid grid-cols-2 gap-3">
              <FeatureToggle 
                label="توصيل مجاني" 
                icon={Truck} 
                active={features.includes('free_delivery')} 
                onClick={() => toggleFeature('free_delivery')} 
              />
              <FeatureToggle 
                label="عروض وخصومات" 
                icon={BadgePercent} 
                active={features.includes('offers')} 
                onClick={() => toggleFeature('offers')} 
              />
              <FeatureToggle 
                label="مفتوح الآن" 
                icon={Check} 
                active={features.includes('open_now')} 
                onClick={() => toggleFeature('open_now')} 
              />
              <FeatureToggle 
                label="استرجاع مجاني" 
                icon={RotateCcw} 
                active={features.includes('free_return')} 
                onClick={() => toggleFeature('free_return')} 
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-gray-100 bg-gray-50 flex gap-3">
          <button 
            onClick={() => {
              setPriceRange(500);
              setMinRating(0);
              setFeatures([]);
            }}
            className="flex-1 bg-white text-gray-700 py-3 rounded-xl font-bold border border-gray-200 hover:bg-gray-100 transition"
          >
            إعادة ضبط
          </button>
          <button 
            onClick={handleApply}
            className="flex-[2] bg-ray-blue text-white py-3 rounded-xl font-bold hover:bg-blue-800 transition shadow-lg"
          >
            عرض النتائج
          </button>
        </div>
      </div>
    </div>
  );
};

const FeatureToggle = ({ label, icon: Icon, active, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`p-3 rounded-xl border text-right transition flex items-center gap-3
      ${active 
        ? 'bg-blue-50 border-blue-200 text-blue-800' 
        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}
    `}
  >
    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${active ? 'bg-white text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
      <Icon className="w-4 h-4" />
    </div>
    <span className="text-sm font-bold">{label}</span>
  </button>
);

export default SearchFilterModal;
