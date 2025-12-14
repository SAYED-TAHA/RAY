
import React from 'react';
import { MapPin, Ruler, Bed, Bath, Car, Gauge, Fuel, Edit, Trash2, Eye, Package, Tag, Layers } from 'lucide-react';
import { BusinessType } from '../../config';

const realEstateItems = [
  { id: 1, title: 'شقة فاخرة بالتجمع الخامس', price: '3,500,000 ج', location: 'حي اللوتس', specs: { area: '180م', rooms: 3, bath: 2 }, image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500' },
  { id: 2, title: 'فيلا مستقلة بالشيخ زايد', price: '12,000,000 ج', location: 'بيفرلي هيلز', specs: { area: '450م', rooms: 5, bath: 4 }, image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=500' },
  { id: 3, title: 'مكتب إداري بالعاصمة', price: '45,000 ج/م', location: 'حي المال والأعمال', specs: { area: '90م', rooms: 2, bath: 1 }, image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=500' },
  { id: 4, title: 'شالية بالساحل الشمالي', price: '4,200,000 ج', location: 'أمواج', specs: { area: '120م', rooms: 3, bath: 2 }, image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500' },
];

const carItems = [
  { id: 1, title: 'Mercedes-Benz C180', price: '3,200,000 ج', location: '2024', specs: { kms: '0 كم', fuel: 'بنزين', trans: 'أوتوماتيك' }, image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=500' },
  { id: 2, title: 'Kia Sportage TopLine', price: '1,850,000 ج', location: '2023', specs: { kms: '15,000 كم', fuel: 'بنزين', trans: 'أوتوماتيك' }, image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=500' },
  { id: 3, title: 'Toyota Corolla', price: '1,300,000 ج', location: '2022', specs: { kms: '45,000 كم', fuel: 'بنزين', trans: 'أوتوماتيك' }, image: 'https://images.unsplash.com/photo-1623869675785-00c88ee0778f?w=500' },
  { id: 4, title: 'BMW 320i M Sport', price: '4,100,000 ج', location: '2024', specs: { kms: '0 كم', fuel: 'بنزين', trans: 'أوتوماتيك' }, image: 'https://images.unsplash.com/photo-1555215695-3004980adade?w=500' },
];

const retailItems = [
  { id: 101, title: 'لبن جهينة 1 لتر', price: '42 ج', location: 'ألبان', specs: { stock: '150', code: '102394', sold: '50' }, image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500' },
  { id: 102, title: 'شيبسي عائلي', price: '15 ج', location: 'سناكس', specs: { stock: '400', code: '223049', sold: '120' }, image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=500' },
  { id: 103, title: 'زيت عباد الشمس', price: '65 ج', location: 'زيوت', specs: { stock: '80', code: '339402', sold: '15' }, image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500' },
  { id: 104, title: 'شاي العروسة', price: '15 ج', location: 'مشروبات', specs: { stock: '200', code: '992010', sold: '85' }, image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500' },
];

const InventoryView = ({ type, theme }: { type: BusinessType, theme: any }) => {
  const isCar = type === 'cars';
  const isRealEstate = type === 'realestate';
  const isRetail = type === 'retail' || type === 'restaurant';
  
  let items: any[] = realEstateItems;
  if (isCar) items = carItems;
  if (isRetail) items = retailItems;

  const getTitle = () => {
      if (isCar) return 'معرض السيارات';
      if (isRealEstate) return 'الوحدات العقارية';
      if (type === 'restaurant') return 'قائمة الطعام';
      return 'المخزون والمنتجات';
  };

  const getButtonLabel = () => {
      if (isCar) return 'إضافة سيارة';
      if (isRealEstate) return 'إضافة وحدة';
      if (type === 'restaurant') return 'إضافة طبق';
      return 'إضافة منتج';
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
         <div>
           <h2 className="text-xl font-bold text-gray-800">{getTitle()}</h2>
           <p className="text-sm text-gray-500">إدارة المخزون والعرض</p>
         </div>
         <button className={`${theme.btn} text-white px-6 py-2 rounded-xl font-bold shadow-md hover:shadow-lg transition`}>
           {getButtonLabel()}
         </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
             <div className="relative h-48 overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                   {isCar || isRealEstate ? item.location : item.price}
                </div>
             </div>
             <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                   <h3 className="font-bold text-gray-900 line-clamp-1">{item.title}</h3>
                </div>
                { (isCar || isRealEstate) ? (
                   <p className={`text-lg font-black ${theme.text} mb-4`}>{item.price}</p>
                ) : (
                   <p className="text-sm text-gray-500 mb-4">{item.location}</p>
                )}
                
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 bg-gray-50 p-2 rounded-lg justify-between">
                   {isCar && (
                     <>
                       <div className="flex items-center gap-1"><Gauge className="w-3 h-3" /> {item.specs.kms}</div>
                       <div className="flex items-center gap-1"><Fuel className="w-3 h-3" /> {item.specs.fuel}</div>
                       <div className="flex items-center gap-1"><Car className="w-3 h-3" /> {item.specs.trans}</div>
                     </>
                   )}
                   {isRealEstate && (
                     <>
                       <div className="flex items-center gap-1"><Ruler className="w-3 h-3" /> {item.specs.area}</div>
                       <div className="flex items-center gap-1"><Bed className="w-3 h-3" /> {item.specs.rooms}</div>
                       <div className="flex items-center gap-1"><Bath className="w-3 h-3" /> {item.specs.bath}</div>
                     </>
                   )}
                   {isRetail && (
                     <>
                        <div className="flex items-center gap-1" title="المخزون"><Package className="w-3 h-3" /> {item.specs.stock}</div>
                        <div className="flex items-center gap-1" title="الكود"><Tag className="w-3 h-3" /> {item.specs.code}</div>
                        <div className="flex items-center gap-1" title="مبيعات"><Layers className="w-3 h-3" /> {item.specs.sold}</div>
                     </>
                   )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                   <span className="flex items-center gap-1 text-xs text-gray-400">
                     <MapPin className="w-3 h-3" />
                     {isCar ? 'المعرض الرئيسي' : isRetail ? 'الفرع الرئيسي' : item.location}
                   </span>
                   <div className="flex gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition"><Eye className="w-4 h-4" /></button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg text-blue-500 transition"><Edit className="w-4 h-4" /></button>
                      <button className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition"><Trash2 className="w-4 h-4" /></button>
                   </div>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryView;
