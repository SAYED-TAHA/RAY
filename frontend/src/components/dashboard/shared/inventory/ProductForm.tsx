
"use client";

import React, { useState } from 'react';
import { 
  Box, DollarSign, Barcode, Tag, Save, X, Layers, AlertCircle, Sparkles, Loader2, Cuboid
} from 'lucide-react';
import FileUploader from '../../../common/FileUploader';
import { getGeminiResponse } from '@/services/geminiService';

interface ProductFormProps {
  onClose: () => void;
  onSave: (product: any) => void;
  initialData?: any;
}

const ProductForm: React.FC<ProductFormProps> = ({ onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    category: '',
    description: '',
    price: '',
    cost: '',
    stock: '',
    minStock: '',
    sku: '',
    barcode: '',
    status: 'active',
    image: '',
    model3d: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const generateDescription = async () => {
    if (!formData.name) return;
    setIsGenerating(true);
    try {
        const prompt = `اكتب وصف تسويقي جذاب ومختصر للمنتج التالي: ${formData.name} ${formData.category ? `من فئة ${formData.category}` : ''}. ركز على المميزات والجودة بلهجة مصرية احترافية.`;
        const desc = await getGeminiResponse(prompt);
        setFormData((prev: any) => ({ ...prev, description: desc }));
    } catch (e) {
        console.error(e);
    } finally {
        setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Box className="w-6 h-6 text-blue-600" />
              {initialData ? 'تعديل المنتج' : 'إضافة منتج جديد'}
            </h2>
            <p className="text-sm text-gray-500">أدخل بيانات المنتج والمخزون</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <form id="product-form" onSubmit={handleSubmit} className="space-y-6">
            
            {/* Basic Info */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">اسم المنتج</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:border-blue-500 outline-none transition"
                  placeholder="مثال: تيشيرت قطن أبيض"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">القسم / الفئة</label>
                  <div className="relative">
                    <Tag className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                    <select 
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 pr-10 pl-4 focus:border-blue-500 outline-none appearance-none"
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value})}
                    >
                      <option value="">اختر القسم...</option>
                      <option value="ملابس">ملابس</option>
                      <option value="أثاث">أثاث</option>
                      <option value="أحذية">أحذية</option>
                      <option value="إكسسوارات">إكسسوارات</option>
                      <option value="أدوات">أدوات</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">الحالة</label>
                  <select 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:border-blue-500 outline-none"
                    value={formData.status}
                    onChange={e => setFormData({...formData, status: e.target.value})}
                  >
                    <option value="active">نشط</option>
                    <option value="inactive">غير نشط</option>
                    <option value="draft">مسودة</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-bold text-gray-700">وصف المنتج</label>
                    <button 
                        type="button" 
                        onClick={generateDescription}
                        disabled={!formData.name || isGenerating}
                        className="text-xs font-bold text-purple-600 flex items-center gap-1 hover:bg-purple-50 px-2 py-1 rounded transition disabled:opacity-50"
                    >
                        {isGenerating ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                        كتابة وصف ذكي
                    </button>
                </div>
                <textarea 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 h-24 focus:border-blue-500 outline-none transition resize-none text-sm"
                  placeholder="وصف تفصيلي للمنتج..."
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                ></textarea>
              </div>
            </div>

            {/* Pricing & Stock */}
            <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 space-y-4">
              <h3 className="font-bold text-blue-800 text-sm flex items-center gap-2">
                <DollarSign className="w-4 h-4" /> التسعير والمخزون
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">سعر البيع</label>
                  <input 
                    type="number" 
                    required
                    className="w-full bg-white border border-gray-200 rounded-lg p-2 focus:border-blue-500 outline-none"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">سعر التكلفة</label>
                  <input 
                    type="number" 
                    className="w-full bg-white border border-gray-200 rounded-lg p-2 focus:border-blue-500 outline-none"
                    placeholder="0.00"
                    value={formData.cost}
                    onChange={e => setFormData({...formData, cost: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">الكمية الحالية</label>
                  <input 
                    type="number" 
                    required
                    className="w-full bg-white border border-gray-200 rounded-lg p-2 focus:border-blue-500 outline-none"
                    placeholder="0"
                    value={formData.stock}
                    onChange={e => setFormData({...formData, stock: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">حد الطلب (Low Stock)</label>
                  <input 
                    type="number" 
                    className="w-full bg-white border border-gray-200 rounded-lg p-2 focus:border-blue-500 outline-none"
                    placeholder="5"
                    value={formData.minStock}
                    onChange={e => setFormData({...formData, minStock: e.target.value})}
                  />
                </div>
              </div>
            </div>

            {/* Identification */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">SKU (كود المخزن)</label>
                <div className="relative">
                  <Layers className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                  <input 
                    type="text" 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 pr-10 pl-4 focus:border-blue-500 outline-none font-mono text-sm"
                    placeholder="PROD-001"
                    value={formData.sku}
                    onChange={e => setFormData({...formData, sku: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">الباركود</label>
                <div className="relative">
                  <Barcode className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                  <input 
                    type="text" 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 pr-10 pl-4 focus:border-blue-500 outline-none font-mono text-sm"
                    placeholder="Scan..."
                    value={formData.barcode}
                    onChange={e => setFormData({...formData, barcode: e.target.value})}
                  />
                </div>
              </div>
            </div>

            {/* Media */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">صورة المنتج (2D)</label>
                    <FileUploader label="صورة المنتج" accept="image/*" />
                </div>
                
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-1">
                        <Cuboid className="w-4 h-4 text-blue-600" /> 
                        ملف 3D (اختياري)
                    </label>
                    <FileUploader label="رفع ملف GLB/GLTF" accept=".glb,.gltf" />
                    <p className="text-[10px] text-gray-500 mt-1">الملفات المدعومة: .glb, .gltf (الحجم الأقصى 10MB)</p>
                </div>
            </div>

          </form>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 bg-white flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-6 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition"
          >
            إلغاء
          </button>
          <button 
            onClick={handleSubmit}
            className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition shadow-lg flex items-center gap-2"
          >
            <Save className="w-5 h-5" />
            حفظ المنتج
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
