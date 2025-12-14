
import React, { useState } from 'react';
import { 
  Search, Plus, Filter, AlertTriangle, Scale, 
  Package, Trash2, Edit2, ArrowDown
} from 'lucide-react';
import StatCard from '../../../common/cards/StatCard';

interface Ingredient {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  minStock: number;
  cost: number;
  expiry?: string;
}

const initialIngredients: Ingredient[] = [
  { id: 'ING-001', name: 'لحم بلدي مفروم', category: 'لحوم', quantity: 15, unit: 'كجم', minStock: 5, cost: 4500 },
  { id: 'ING-002', name: 'طماطم طازجة', category: 'خضروات', quantity: 8, unit: 'كجم', minStock: 10, cost: 120 },
  { id: 'ING-003', name: 'جبنة شيدر', category: 'ألبان', quantity: 2, unit: 'كجم', minStock: 3, cost: 800 },
  { id: 'ING-004', name: 'خبز برجر', category: 'مخبوزات', quantity: 150, unit: 'قطعة', minStock: 50, cost: 450 },
  { id: 'ING-005', name: 'زيت قلي', category: 'زيوت', quantity: 40, unit: 'لتر', minStock: 10, cost: 2400 },
];

const RestaurantInventory: React.FC = () => {
  const [ingredients, setIngredients] = useState(initialIngredients);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const filteredItems = ingredients.filter(item => 
    (filterCategory === 'all' || item.category === filterCategory) &&
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalValue = ingredients.reduce((sum, item) => sum + item.cost, 0);
  const lowStockCount = ingredients.filter(i => i.quantity <= i.minStock).length;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="إجمالي الأصناف" value={ingredients.length.toString()} sub="مكون" icon={Package} color="blue" />
        <StatCard title="قيمة المخزون" value={`${totalValue.toLocaleString()} ج.م`} sub="التكلفة الحالية" icon={Scale} color="green" />
        <StatCard title="نواقص المخزون" value={lowStockCount.toString()} sub="يحتاج شراء" icon={AlertTriangle} color="red" />
      </div>

      {/* Header & Controls */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">المخزون والمقادير</h2>
          <p className="text-sm text-gray-500">متابعة كميات المواد الخام والمكونات</p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
           <div className="relative flex-1 md:w-64">
              <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="بحث عن صنف..." 
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 pr-10 pl-4 text-sm focus:outline-none focus:border-orange-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>
           <button className="bg-orange-600 text-white px-4 py-2 rounded-xl font-bold shadow-md flex items-center gap-2 hover:bg-orange-700 transition whitespace-nowrap">
              <Plus className="w-4 h-4" />
              إضافة مكون
           </button>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-gray-50 text-gray-500 text-xs font-bold border-b border-gray-100">
              <tr>
                <th className="p-4">الصنف</th>
                <th className="p-4">القسم</th>
                <th className="p-4">الكمية الحالية</th>
                <th className="p-4">حد الطلب</th>
                <th className="p-4">التكلفة</th>
                <th className="p-4 text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {filteredItems.map(item => (
                <tr key={item.id} className="hover:bg-orange-50/10 transition group">
                  <td className="p-4 font-bold text-gray-800">{item.name}</td>
                  <td className="p-4">
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">{item.category}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className={`font-black ${item.quantity <= item.minStock ? 'text-red-600' : 'text-gray-800'}`}>
                        {item.quantity} {item.unit}
                      </span>
                      {item.quantity <= item.minStock && (
                        <AlertTriangle className="w-4 h-4 text-red-500 animate-pulse" />
                      )}
                    </div>
                  </td>
                  <td className="p-4 text-gray-500">{item.minStock} {item.unit}</td>
                  <td className="p-4 font-bold text-gray-700">{item.cost} ج.م</td>
                  <td className="p-4">
                    <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
                      <button className="p-1.5 hover:bg-blue-50 text-blue-600 rounded-lg" title="تعديل">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 hover:bg-red-50 text-red-600 rounded-lg" title="هالك">
                        <ArrowDown className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 hover:bg-gray-100 text-gray-500 rounded-lg" title="حذف">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RestaurantInventory;
