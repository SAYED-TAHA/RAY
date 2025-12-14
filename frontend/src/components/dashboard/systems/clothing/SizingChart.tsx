/**
 * جدول المقاسات للملابس
 * إدارة وعرض جداول المقاسات المختلفة
 */

import React, { useState } from 'react';
import {
  Ruler, Plus, Edit, Trash2, Copy, Download, Upload,
  Settings2, Search, Filter, Eye, EyeOff, Check, X
} from 'lucide-react';

interface SizeChart {
  id: string;
  name: string;
  category: 'shirts' | 'pants' | 'dresses' | 'shoes' | 'accessories';
  sizes: {
    size: string;
    chest?: number;
    waist?: number;
    length?: number;
    inseam?: number;
    width?: number;
  }[];
  isActive: boolean;
  createdDate: string;
  lastModified: string;
}

const initialCharts: SizeChart[] = [
  {
    id: 'chart-001',
    name: 'تيشيرتات وقمصان',
    category: 'shirts',
    sizes: [
      { size: 'XS', chest: 76, length: 66 },
      { size: 'S', chest: 84, length: 69 },
      { size: 'M', chest: 92, length: 72 },
      { size: 'L', chest: 100, length: 75 },
      { size: 'XL', chest: 108, length: 78 },
      { size: 'XXL', chest: 116, length: 81 }
    ],
    isActive: true,
    createdDate: '2024-01-15',
    lastModified: '2024-11-20'
  },
  {
    id: 'chart-002',
    name: 'بنطلونات',
    category: 'pants',
    sizes: [
      { size: '28', waist: 71, inseam: 76 },
      { size: '30', waist: 76, inseam: 76 },
      { size: '32', waist: 81, inseam: 76 },
      { size: '34', waist: 86, inseam: 76 },
      { size: '36', waist: 91, inseam: 76 },
      { size: '38', waist: 96, inseam: 76 }
    ],
    isActive: true,
    createdDate: '2024-02-10',
    lastModified: '2024-11-18'
  },
  {
    id: 'chart-003',
    name: 'فساتين',
    category: 'dresses',
    sizes: [
      { size: 'XS', chest: 78, waist: 61, length: 140 },
      { size: 'S', chest: 84, waist: 66, length: 142 },
      { size: 'M', chest: 90, waist: 71, length: 144 },
      { size: 'L', chest: 96, waist: 76, length: 146 },
      { size: 'XL', chest: 102, waist: 81, length: 148 }
    ],
    isActive: true,
    createdDate: '2024-03-05',
    lastModified: '2024-11-15'
  }
];

const SizingChart: React.FC = () => {
  const [charts, setCharts] = useState<SizeChart[]>(initialCharts);
  const [selectedChart, setSelectedChart] = useState<SizeChart | null>(charts[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);

  const filteredCharts = charts.filter(chart =>
    chart.name.includes(searchTerm) || chart.category.includes(searchTerm)
  );

  const categoryLabels: Record<string, string> = {
    shirts: 'تيشيرتات وقمصان',
    pants: 'بنطلونات',
    dresses: 'فساتين',
    shoes: 'أحذية',
    accessories: 'إكسسوارات'
  };

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Ruler className="w-6 h-6 text-pink-600" />
            جداول المقاسات
          </h2>
          <p className="text-sm text-gray-500">إدارة جداول المقاسات المختلفة</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition">
          <Plus className="w-5 h-5" />
          جدول جديد
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Charts List */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col">
          {/* Search */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="ابحث..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-pink-500"
              />
            </div>
          </div>

          {/* Charts */}
          <div className="flex-1 overflow-y-auto">
            {filteredCharts.map(chart => (
              <button
                key={chart.id}
                onClick={() => setSelectedChart(chart)}
                className={`w-full text-right p-4 border-b border-gray-100 transition ${
                  selectedChart?.id === chart.id
                    ? 'bg-pink-50 border-l-4 border-l-pink-600'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-gray-800 text-sm">{chart.name}</h4>
                  {chart.isActive && (
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  )}
                </div>
                <p className="text-xs text-gray-500">{categoryLabels[chart.category]}</p>
                <p className="text-xs text-gray-400 mt-1">{chart.sizes.length} مقاسات</p>
              </button>
            ))}
          </div>
        </div>

        {/* Chart Details */}
        {selectedChart && (
          <div className="lg:col-span-3 bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-gray-800">{selectedChart.name}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  آخر تعديل: {selectedChart.lastModified}
                </p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                  <Copy className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                  <Download className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={() => setIsEditMode(!isEditMode)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <Edit className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">المقاس</th>
                    {selectedChart.category === 'shirts' && (
                      <>
                        <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">الصدر (سم)</th>
                        <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">الطول (سم)</th>
                      </>
                    )}
                    {selectedChart.category === 'pants' && (
                      <>
                        <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">الخصر (سم)</th>
                        <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">الطول الداخلي (سم)</th>
                      </>
                    )}
                    {selectedChart.category === 'dresses' && (
                      <>
                        <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">الصدر (سم)</th>
                        <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">الخصر (سم)</th>
                        <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">الطول (سم)</th>
                      </>
                    )}
                    {isEditMode && (
                      <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">الإجراءات</th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {selectedChart.sizes.map((size, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 font-semibold text-gray-800">{size.size}</td>
                      {selectedChart.category === 'shirts' && (
                        <>
                          <td className="px-6 py-4 text-gray-600">{size.chest}</td>
                          <td className="px-6 py-4 text-gray-600">{size.length}</td>
                        </>
                      )}
                      {selectedChart.category === 'pants' && (
                        <>
                          <td className="px-6 py-4 text-gray-600">{size.waist}</td>
                          <td className="px-6 py-4 text-gray-600">{size.inseam}</td>
                        </>
                      )}
                      {selectedChart.category === 'dresses' && (
                        <>
                          <td className="px-6 py-4 text-gray-600">{size.chest}</td>
                          <td className="px-6 py-4 text-gray-600">{size.waist}</td>
                          <td className="px-6 py-4 text-gray-600">{size.length}</td>
                        </>
                      )}
                      {isEditMode && (
                        <td className="px-6 py-4">
                          <button className="p-1 hover:bg-red-100 rounded">
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
              <p className="text-sm text-gray-600">
                إجمالي المقاسات: <span className="font-semibold">{selectedChart.sizes.length}</span>
              </p>
              {isEditMode && (
                <button className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition text-sm font-semibold">
                  حفظ التغييرات
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SizingChart;
