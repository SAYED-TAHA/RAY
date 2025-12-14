/**
 * التفاعلات الدوائية
 * إدارة وتحذير التفاعلات بين الأدوية
 */

import React, { useState } from 'react';
import {
  AlertTriangle, Search, Plus, Edit, Trash2, AlertCircle,
  CheckCircle, Eye, Filter, Download
} from 'lucide-react';

interface DrugInteraction {
  id: string;
  drug1: string;
  drug2: string;
  severity: 'high' | 'moderate' | 'low';
  description: string;
  recommendation: string;
  status: 'active' | 'inactive';
}

const initialInteractions: DrugInteraction[] = [
  {
    id: 'int-001',
    drug1: 'أموكسيسيلين',
    drug2: 'ميتفورمين',
    severity: 'moderate',
    description: 'قد يؤثر على امتصاص ميتفورمين',
    recommendation: 'يجب الفصل بين الجرعات بساعتين',
    status: 'active'
  },
  {
    id: 'int-002',
    drug1: 'أسبرين',
    drug2: 'وارفارين',
    severity: 'high',
    description: 'زيادة خطر النزيف',
    recommendation: 'تجنب الاستخدام المتزامن أو مراقبة دقيقة',
    status: 'active'
  },
  {
    id: 'int-003',
    drug1: 'باراسيتامول',
    drug2: 'الكحول',
    severity: 'high',
    description: 'قد يسبب تلف الكبد',
    recommendation: 'تجنب الكحول أثناء العلاج',
    status: 'active'
  }
];

const DrugInteractions: React.FC = () => {
  const [interactions, setInteractions] = useState<DrugInteraction[]>(initialInteractions);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'high' | 'moderate' | 'low'>('all');

  const filteredInteractions = interactions.filter(inter => {
    const matchesSearch = inter.drug1.includes(searchTerm) || inter.drug2.includes(searchTerm);
    const matchesSeverity = filterSeverity === 'all' || inter.severity === filterSeverity;
    return matchesSearch && matchesSeverity;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'moderate': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityLabel = (severity: string) => {
    switch (severity) {
      case 'high': return 'خطير';
      case 'moderate': return 'متوسط';
      case 'low': return 'منخفض';
      default: return severity;
    }
  };

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            التفاعلات الدوائية
          </h2>
          <p className="text-sm text-gray-500">إدارة وتحذير التفاعلات بين الأدوية</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
          <Plus className="w-5 h-5" />
          تفاعل جديد
        </button>
      </div>

      {/* Controls */}
      <div className="flex gap-4 flex-wrap">
        <div className="flex-1 min-w-64 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="ابحث عن دواء..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500"
          />
        </div>
        <select
          value={filterSeverity}
          onChange={(e) => setFilterSeverity(e.target.value as any)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500"
        >
          <option value="all">جميع المستويات</option>
          <option value="high">خطير</option>
          <option value="moderate">متوسط</option>
          <option value="low">منخفض</option>
        </select>
      </div>

      {/* Interactions Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden flex-1 flex flex-col">
        <div className="overflow-x-auto flex-1">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
              <tr>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">الدواء الأول</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">الدواء الثاني</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">الوصف</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">الشدة</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">التوصية</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredInteractions.map(inter => (
                <tr key={inter.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm text-gray-600">{inter.drug1}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{inter.drug2}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{inter.description}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getSeverityColor(inter.severity)}`}>
                      {getSeverityLabel(inter.severity)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{inter.recommendation}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-1 hover:bg-gray-100 rounded transition">
                        <Edit className="w-4 h-4 text-blue-600" />
                      </button>
                      <button className="p-1 hover:bg-red-100 rounded transition">
                        <Trash2 className="w-4 h-4 text-red-600" />
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

export default DrugInteractions;
