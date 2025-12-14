
import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, MapPin, DollarSign, Gauge, Fuel, Car, Bed, Bath, Ruler, Home, X, CheckCircle, Scale, Loader, AlertCircle } from 'lucide-react';
import ContactSellerModal from '../modals/ContactSellerModal';
import SmartCompareModal from '../modals/SmartCompareModal';
import axios from 'axios';

interface Merchant {
  id: string;
  name: string;
  inventory?: any[];
  [key: string]: any;
}

interface MerchantShowcaseProps {
  galleryImages: string[];
  merchantType: string; // 'realestate' | 'cars'
  merchantId?: string;
}

const MerchantShowcase: React.FC<MerchantShowcaseProps> = ({ galleryImages, merchantType, merchantId }) => {
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Comparison State
  const [compareList, setCompareList] = useState<any[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  
  const isRealEstate = merchantType === 'realestate';

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!merchantId) {
          setError('معرف المتجر غير متاح');
          setLoading(false);
          return;
        }

        // Fetch merchant details to get inventory
        const response = await axios.get<Merchant>(`/api/merchants/${merchantId}`);
        const merchant = response.data;
        
        // Use merchant's inventory or generate default items
        const inventory = merchant.inventory || [];
        setItems(inventory.length > 0 ? inventory : []);
      } catch (err) {
        console.error('Error fetching inventory:', err);
        setError('فشل في تحميل المنتجات. يرجى المحاولة مرة أخرى.');
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, [merchantId]);

  const description = isRealEstate
    ? "نقدم لكم مجموعة متميزة من الوحدات السكنية والتجارية في أرقى المناطق. نتميز بالمصداقية في التعامل والالتزام بمواعيد التسليم، مع توفير أنظمة سداد مرنة تناسب الجميع."
    : "أحدث موديلات السيارات الزيرو والمستعملة بحالة الزيرو. نقدم أفضل الأسعار في السوق مع إمكانية التقسيط البنكي والمباشر. جميع سياراتنا مفحوصة ومضمونة.";

  const toggleCompare = (e: React.MouseEvent, item: any) => {
    e.stopPropagation();
    setCompareList(prev => {
      if (prev.find(i => i.id === item.id)) {
        return prev.filter(i => i.id !== item.id);
      }
      if (prev.length >= 2) {
        // Replace the first one if already 2
        return [prev[1], item];
      }
      return [...prev, item];
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 relative pb-24">
      
      {/* Main Description */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h3 className="font-bold text-lg text-gray-900 mb-4">عن الشركة</h3>
        <p className="text-gray-600 leading-relaxed text-sm">{description}</p>
      </div>

      {/* Inventory Grid */}
      <div>
        <h3 className="font-bold text-xl text-gray-900 mb-6 flex items-center gap-2">
          {isRealEstate ? <Home className="w-6 h-6 text-green-600" /> : <Car className="w-6 h-6 text-red-600" />}
          {isRealEstate ? 'الوحدات المتاحة' : 'السيارات المعروضة'}
        </h3>
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader className="w-8 h-8 text-blue-500 animate-spin" />
            <span className="mr-2">جاري تحميل المنتجات...</span>
          </div>
        ) : error ? (
          <div className="bg-red-50 p-4 rounded-lg text-red-700 flex items-center justify-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">لا توجد منتجات متاحة حالياً</p>
            <p className="text-gray-400 text-sm mt-2">يرجى المحاولة لاحقاً</p>
          </div>
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {items.map((item: any) => {
            const isSelectedForCompare = compareList.find(i => i.id === item.id);
            return (
              <div 
                key={item.id} 
                onClick={() => setSelectedItem(item)}
                className={`group bg-white rounded-2xl border overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer relative flex flex-col
                  ${isSelectedForCompare ? 'border-blue-500 ring-2 ring-blue-500 ring-offset-2' : 'border-gray-100'}
                `}
              >
                <div className="h-48 sm:h-56 relative overflow-hidden shrink-0">
                  <img 
                    src={item.image} 
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700" 
                    alt={item.title} 
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur text-white text-xs px-2 py-1 rounded-lg font-bold">
                    {isRealEstate ? item.type : item.year}
                  </div>
                  
                  {/* Compare Checkbox */}
                  <button 
                    onClick={(e) => toggleCompare(e, item)}
                    className={`absolute top-3 left-3 p-2 rounded-full backdrop-blur-md transition-all z-20
                      ${isSelectedForCompare ? 'bg-blue-600 text-white' : 'bg-white/80 text-gray-600 hover:bg-white'}
                    `}
                    title="أضف للمقارنة"
                  >
                    <Scale className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="p-4 flex-1 flex flex-col">
                  <h4 className="font-bold text-gray-900 text-base md:text-lg mb-1 line-clamp-1">{item.title}</h4>
                  <p className="font-black text-ray-blue text-lg mb-3">{item.price} <span className="text-xs text-gray-500 font-normal">ج.م</span></p>
                  
                  <div className="flex items-center gap-3 text-xs text-gray-500 border-t border-gray-50 pt-3 mt-auto">
                    {isRealEstate ? (
                      <>
                        <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded"><Ruler className="w-3 h-3" /> {item.specs.area}</span>
                        <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded"><Bed className="w-3 h-3" /> {item.specs.rooms}</span>
                        <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded"><Bath className="w-3 h-3" /> {item.specs.bath}</span>
                      </>
                    ) : (
                      <>
                        <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded"><Gauge className="w-3 h-3" /> {item.specs.km}</span>
                        <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded"><Car className="w-3 h-3" /> {item.specs.trans}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        )}
      </div>

      {/* Compare Floating Button */}
      {compareList.length > 0 && (
        <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-40 animate-in slide-in-from-bottom-10 fade-in w-[90%] md:w-auto">
           <div className="bg-gray-900 text-white p-3 rounded-2xl shadow-2xl flex items-center justify-between gap-4 border border-gray-700">
              <div className="flex items-center gap-3">
                  <div className="flex -space-x-2 rtl:space-x-reverse">
                    {compareList.map(i => (
                      <img key={i.id} src={i.image} className="w-10 h-10 rounded-full object-cover border-2 border-gray-700" />
                    ))}
                  </div>
                  <span className="font-bold text-sm whitespace-nowrap">
                    {compareList.length} للمقارنة
                  </span>
              </div>
              
              <div className="flex gap-2">
                  <button 
                    onClick={() => setIsCompareModalOpen(true)}
                    disabled={compareList.length < 2}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    قارن الآن
                  </button>
                  <button 
                    onClick={() => setCompareList([])}
                    className="p-2 hover:bg-gray-800 rounded-xl text-gray-400 bg-gray-800"
                  >
                    <X className="w-4 h-4" />
                  </button>
              </div>
           </div>
        </div>
      )}

      {/* Item Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setSelectedItem(null)}></div>
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            <div className="relative h-64 shrink-0">
              <img src={selectedItem.image} className="w-full h-full object-cover" alt={selectedItem.title} />
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 right-4 bg-ray-blue text-white px-4 py-1.5 rounded-xl font-black shadow-lg text-lg">
                {selectedItem.price} ج.م
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <h2 className="text-2xl font-black text-gray-900 mb-2">{selectedItem.title}</h2>
              <div className="flex gap-2 mb-4">
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-xs font-bold">
                  {isRealEstate ? selectedItem.type : selectedItem.year}
                </span>
                {isRealEstate && <span className="bg-green-50 text-green-700 px-3 py-1 rounded-lg text-xs font-bold">مميز</span>}
              </div>
              
              <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                {selectedItem.desc}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {isRealEstate ? (
                  <>
                    <div className="bg-gray-50 p-3 rounded-xl">
                      <span className="block text-xs text-gray-500 mb-1">المساحة</span>
                      <span className="font-bold text-gray-800 flex items-center gap-2"><Ruler className="w-4 h-4 text-green-600" /> {selectedItem.specs.area}</span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl">
                      <span className="block text-xs text-gray-500 mb-1">الغرف</span>
                      <span className="font-bold text-gray-800 flex items-center gap-2"><Bed className="w-4 h-4 text-green-600" /> {selectedItem.specs.rooms}</span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl">
                      <span className="block text-xs text-gray-500 mb-1">الحمامات</span>
                      <span className="font-bold text-gray-800 flex items-center gap-2"><Bath className="w-4 h-4 text-green-600" /> {selectedItem.specs.bath}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-gray-50 p-3 rounded-xl">
                      <span className="block text-xs text-gray-500 mb-1">المسافة</span>
                      <span className="font-bold text-gray-800 flex items-center gap-2"><Gauge className="w-4 h-4 text-red-600" /> {selectedItem.specs.km}</span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl">
                      <span className="block text-xs text-gray-500 mb-1">ناقل الحركة</span>
                      <span className="font-bold text-gray-800 flex items-center gap-2"><Car className="w-4 h-4 text-red-600" /> {selectedItem.specs.trans}</span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl">
                      <span className="block text-xs text-gray-500 mb-1">المحرك</span>
                      <span className="font-bold text-gray-800 flex items-center gap-2"><Fuel className="w-4 h-4 text-red-600" /> {selectedItem.specs.engine}</span>
                    </div>
                  </>
                )}
              </div>

              <button 
                onClick={() => setIsContactOpen(true)}
                className="w-full bg-ray-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition shadow-lg flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                أنا مهتم
              </button>
            </div>
          </div>
        </div>
      )}

      <ContactSellerModal 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
        itemName={selectedItem?.title}
      />

      <SmartCompareModal 
        isOpen={isCompareModalOpen} 
        onClose={() => setIsCompareModalOpen(false)} 
        items={compareList}
        type={merchantType}
        onContact={(item) => { setIsCompareModalOpen(false); setSelectedItem(item); setIsContactOpen(true); }}
      />

    </div>
  );
};

export default MerchantShowcase;
