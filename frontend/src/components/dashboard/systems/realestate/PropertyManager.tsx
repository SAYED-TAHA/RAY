import React, { useState } from 'react';
import { Home, Search, Filter, Plus, MapPin, Bed, Bath, Ruler, Edit, Trash2, Eye, MoreHorizontal, CheckCircle, XCircle } from 'lucide-react';
import PropertyForm from './PropertyForm';

const properties = [
  { id: 'P-101', title: 'شقة فاخرة بالتجمع الخامس', price: '3,500,000', location: 'حي اللوتس', area: '180', rooms: 3, bath: 2, type: 'بيع', status: 'available', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500' },
  { id: 'P-102', title: 'فيلا مستقلة بالشيخ زايد', price: '12,000,000', location: 'بيفرلي هيلز', area: '450', rooms: 5, bath: 4, type: 'بيع', status: 'sold', image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=500' },
  { id: 'P-103', title: 'مكتب إداري بالعاصمة', price: '45,000', location: 'حي المال والأعمال', area: '90', rooms: 2, bath: 1, type: 'إيجار', status: 'available', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=500' },
  { id: 'P-104', title: 'شالية بالساحل الشمالي', price: '4,200,000', location: 'أمواج', area: '120', rooms: 3, bath: 2, type: 'بيع', status: 'reserved', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500' },
];

const PropertyManager: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [propertyList, setPropertyList] = useState(properties);
  const [editData, setEditData] = useState<any>(null);

  const filteredProps = propertyList.filter(p => filterStatus === 'all' || p.status === filterStatus);

  const handleSave = (data: any) => {
    if (editData) {
      setPropertyList(prev => prev.map(p => p.id === editData.id ? { ...p, ...data } : p));
    } else {
      const newProp = {
        id: `P-${Date.now()}`,
        ...data,
        status: 'available',
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500' // Placeholder
      };
      setPropertyList([newProp, ...propertyList]);
    }
    setIsFormOpen(false);
    setEditData(null);
  };

  const handleEdit = (prop: any) => {
    setEditData(prop);
    setIsFormOpen(true);
  };

  const handleAddNew = () => {
    setEditData(null);
    setIsFormOpen(true);
  };

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Controls */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col lg:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">إدارة الوحدات العقارية</h2>
          <p className="text-sm text-gray-500">عرض وتعديل وحذف العقارات</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
           <div className="relative flex-1 min-w-[250px]">
              <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
              <input type="text" placeholder="بحث بالعنوان، الكود..." className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 pr-10 pl-4 text-sm focus:outline-none focus:border-green-500" />
           </div>
           
           <select 
             className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-green-500 text-gray-600"
             onChange={(e) => setFilterStatus(e.target.value)}
           >
             <option value="all">كل الحالات</option>
             <option value="available">متاح</option>
             <option value="sold">تم البيع</option>
             <option value="reserved">محجوز</option>
           </select>

           <button 
             onClick={handleAddNew}
             className="bg-green-700 text-white px-4 py-2 rounded-xl font-bold shadow-md flex items-center justify-center gap-2 hover:bg-green-800 transition whitespace-nowrap"
           >
              <Plus className="w-4 h-4" />
              إضافة وحدة
           </button>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-4 overflow-y-auto">
        {filteredProps.map(item => (
          <div key={item.id} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
             <div className="h-48 relative overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                <div className="absolute top-3 right-3 flex gap-2">
                   <span className={`px-2 py-1 rounded-lg text-xs font-bold shadow-sm text-white
                     ${item.status === 'available' ? 'bg-green-500' : item.status === 'sold' ? 'bg-red-500' : 'bg-orange-500'}`}>
                     {item.status === 'available' ? 'متاح' : item.status === 'sold' ? 'تم البيع' : 'محجوز'}
                   </span>
                   <span className="px-2 py-1 rounded-lg text-xs font-bold shadow-sm bg-white text-gray-800 border border-gray-200">
                     {item.type === 'sale' ? 'بيع' : 'إيجار'}
                   </span>
                </div>
             </div>
             
             <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                   <h3 className="font-bold text-gray-900 text-lg line-clamp-1">{item.title}</h3>
                   <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal className="w-5 h-5" /></button>
                </div>
                
                <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
                   <MapPin className="w-4 h-4" /> {item.location}
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4 bg-gray-50 p-3 rounded-xl text-center">
                   <div className="flex flex-col items-center">
                      <div className="flex items-center gap-1 text-xs text-gray-400 mb-1"><Ruler className="w-3 h-3" /> المساحة</div>
                      <span className="font-bold text-gray-800 text-sm">{item.area} م</span>
                   </div>
                   <div className="flex flex-col items-center border-r border-gray-200">
                      <div className="flex items-center gap-1 text-xs text-gray-400 mb-1"><Bed className="w-3 h-3" /> الغرف</div>
                      <span className="font-bold text-gray-800 text-sm">{item.rooms}</span>
                   </div>
                   <div className="flex flex-col items-center border-r border-gray-200">
                      <div className="flex items-center gap-1 text-xs text-gray-400 mb-1"><Bath className="w-3 h-3" /> حمام</div>
                      <span className="font-bold text-gray-800 text-sm">{item.bath}</span>
                   </div>
                </div>

                <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
                   <span className="text-xl font-black text-green-700">{Number(item.price).toLocaleString()} ج</span>
                   <div className="flex gap-2">
                      <button className="p-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition"><Eye className="w-4 h-4" /></button>
                      <button onClick={() => handleEdit(item)} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"><Edit className="w-4 h-4" /></button>
                      <button className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"><Trash2 className="w-4 h-4" /></button>
                   </div>
                </div>
             </div>
          </div>
        ))}
      </div>

      {isFormOpen && (
        <PropertyForm 
          onClose={() => setIsFormOpen(false)} 
          onSave={handleSave}
          initialData={editData}
        />
      )}
    </div>
  );
};

export default PropertyManager;
