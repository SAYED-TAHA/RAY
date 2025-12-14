
import React from 'react';
import { X, Check, AlertCircle, ShoppingCart } from 'lucide-react';

interface SmartCompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: any[];
  type: string; // 'realestate' | 'cars'
  onContact: (item: any) => void;
}

const SmartCompareModal: React.FC<SmartCompareModalProps> = ({ isOpen, onClose, items, type, onContact }) => {
  if (!isOpen || items.length < 2) return null;

  const item1 = items[0];
  const item2 = items[1];

  const getSpecValue = (item: any, key: string) => {
    if (!item.specs) return '-';
    return item.specs[key] || '-';
  };

  // Define comparison keys based on type
  const keys = type === 'realestate' 
    ? [
        { key: 'area', label: 'المساحة' },
        { key: 'rooms', label: 'الغرف' },
        { key: 'bath', label: 'الحمامات' },
        { key: 'price', label: 'السعر', highlight: true },
      ]
    : [
        { key: 'year', label: 'السنة' }, // Root property
        { key: 'km', label: 'المسافة' },
        { key: 'engine', label: 'المحرك' },
        { key: 'trans', label: 'ناقل الحركة' },
        { key: 'price', label: 'السعر', highlight: true },
      ];

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 className="font-black text-xl text-gray-900">مقارنة المواصفات</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Comparison Grid */}
        <div className="flex-1 overflow-y-auto p-6">
           <div className="grid grid-cols-3 gap-4 min-w-[600px]">
              {/* Column 1: Labels */}
              <div className="space-y-4 pt-48 md:pt-64">
                 {keys.map((k, idx) => (
                    <div key={idx} className={`h-12 flex items-center text-sm font-bold text-gray-500 ${k.highlight ? 'text-lg text-gray-800' : ''}`}>
                       {k.label}
                    </div>
                 ))}
                 <div className="h-12"></div>
              </div>

              {/* Column 2: Item 1 */}
              <div className="bg-blue-50/30 rounded-2xl p-4 border border-blue-100">
                 <div className="h-40 md:h-56 mb-4 rounded-xl overflow-hidden relative">
                    <img src={item1.image} className="w-full h-full object-cover" alt={item1.title} />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-center text-xs font-bold backdrop-blur-sm">
                       الخيار الأول
                    </div>
                 </div>
                 <h4 className="font-bold text-gray-900 text-center mb-6 min-h-[3rem]">{item1.title}</h4>
                 
                 <div className="space-y-4">
                    {keys.map((k, idx) => {
                        const val = k.key === 'price' || k.key === 'year' ? item1[k.key] : getSpecValue(item1, k.key);
                        return (
                            <div key={idx} className={`h-12 flex items-center justify-center border-b border-blue-100 font-bold ${k.highlight ? 'text-blue-600 text-lg' : 'text-gray-700'}`}>
                                {val}
                            </div>
                        );
                    })}
                    <div className="h-12 flex items-center justify-center pt-2">
                       <button onClick={() => onContact(item1)} className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold text-sm shadow-lg hover:bg-blue-700 transition w-full">
                          أنا مهتم
                       </button>
                    </div>
                 </div>
              </div>

              {/* Column 3: Item 2 */}
              <div className="bg-green-50/30 rounded-2xl p-4 border border-green-100">
                 <div className="h-40 md:h-56 mb-4 rounded-xl overflow-hidden relative">
                    <img src={item2.image} className="w-full h-full object-cover" alt={item2.title} />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-center text-xs font-bold backdrop-blur-sm">
                       الخيار الثاني
                    </div>
                 </div>
                 <h4 className="font-bold text-gray-900 text-center mb-6 min-h-[3rem]">{item2.title}</h4>
                 
                 <div className="space-y-4">
                    {keys.map((k, idx) => {
                        const val = k.key === 'price' || k.key === 'year' ? item2[k.key] : getSpecValue(item2, k.key);
                        return (
                            <div key={idx} className={`h-12 flex items-center justify-center border-b border-green-100 font-bold ${k.highlight ? 'text-green-600 text-lg' : 'text-gray-700'}`}>
                                {val}
                            </div>
                        );
                    })}
                    <div className="h-12 flex items-center justify-center pt-2">
                       <button onClick={() => onContact(item2)} className="bg-green-600 text-white px-6 py-2 rounded-xl font-bold text-sm shadow-lg hover:bg-green-700 transition w-full">
                          أنا مهتم
                       </button>
                    </div>
                 </div>
              </div>
           </div>
        </div>
        
        <div className="bg-yellow-50 p-3 text-center text-xs text-yellow-700 font-bold border-t border-yellow-100">
            <AlertCircle className="w-4 h-4 inline-block mx-1 mb-0.5" />
            نصيحة: قارن بعناية، السعر ليس العامل الوحيد!
        </div>
      </div>
    </div>
  );
};

export default SmartCompareModal;
