
"use client";

import React, { useState } from 'react';
import { 
  ChefHat, DollarSign, Flame, Image as ImageIcon, Save, X, Tag, Utensils, Sparkles, Loader2
} from 'lucide-react';
import FileUploader from '../../../common/FileUploader';
import { getGeminiResponse } from '@/services/geminiService';

interface MenuFormProps {
  onClose: () => void;
  onSave: (item: any) => void;
  initialData?: any;
}

const MenuForm: React.FC<MenuFormProps> = ({ onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    description: '',
    price: '',
    category: '',
    calories: '',
    available: true,
    featured: false,
    spicy: false,
    vegetarian: false
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
        const prompt = `اكتب وصف شهي ومغري لوجبة: ${formData.name} في مطعم. ركز على الطعم والمكونات بلهجة مصرية محببة.`;
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
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <ChefHat className="w-6 h-6 text-orange-600" />
              {initialData ? 'تعديل الصنف' : 'إضافة صنف جديد'}
            </h2>
            <p className="text-sm text-gray-500">أضف وجبة جديدة لقائمة الطعام</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">اسم الوجبة</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:border-orange-500 outline-none transition"
                  placeholder="مثال: برجر دجاج كرسبي"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">القسم</label>
                  <div className="relative">
                    <Tag className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                    <select 
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 pr-10 pl-4 focus:border-orange-500 outline-none appearance-none"
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value})}
                    >
                      <option value="">اختر القسم...</option>
                      <option value="برجر">برجر</option>
                      <option value="بيتزا">بيتزا</option>
                      <option value="مقبلات">مقبلات</option>
                      <option value="مشروبات">مشروبات</option>
                      <option value="حلوى">حلوى</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">السعر</label>
                  <div className="relative">
                    <DollarSign className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                    <input 
                      type="number" 
                      required
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 pr-10 pl-4 focus:border-orange-500 outline-none"
                      placeholder="0.00"
                      value={formData.price}
                      onChange={e => setFormData({...formData, price: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-bold text-gray-700">الوصف / المكونات</label>
                    <button 
                        type="button" 
                        onClick={generateDescription}
                        disabled={!formData.name || isGenerating}
                        className="text-xs font-bold text-orange-600 flex items-center gap-1 hover:bg-orange-50 px-2 py-1 rounded transition disabled:opacity-50"
                    >
                        {isGenerating ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                        وصف ذكي
                    </button>
                </div>
                <textarea 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 h-24 resize-none focus:border-orange-500 outline-none"
                  placeholder="اكتب وصفاً شهياً للوجبة..."
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">السعرات الحرارية (اختياري)</label>
                    <div className="relative">
                       <Flame className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                       <input 
                         type="number" 
                         className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 pr-10 pl-4 focus:border-orange-500 outline-none"
                         placeholder="kcal"
                         value={formData.calories}
                         onChange={e => setFormData({...formData, calories: e.target.value})}
                       />
                    </div>
                 </div>
              </div>

              <div>
                 <label className="block text-sm font-bold text-gray-700 mb-2">خصائص إضافية</label>
                 <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer bg-gray-50 px-4 py-2 rounded-lg border border-gray-200 hover:border-orange-300 transition">
                       <input type="checkbox" checked={formData.available} onChange={e => setFormData({...formData, available: e.target.checked})} className="accent-orange-600 w-4 h-4" />
                       <span className="text-sm font-medium">متاح للطلب</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer bg-gray-50 px-4 py-2 rounded-lg border border-gray-200 hover:border-orange-300 transition">
                       <input type="checkbox" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} className="accent-orange-600 w-4 h-4" />
                       <span className="text-sm font-medium">مميز (Featured)</span>
                    </label>
                 </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">صورة الوجبة</label>
                <FileUploader label="صورة الطبق" />
              </div>
            </div>
          </form>
        </div>

        <div className="p-6 border-t border-gray-100 bg-white flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-6 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition"
          >
            إلغاء
          </button>
          <button 
            onClick={handleSubmit}
            className="px-8 py-3 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 transition shadow-lg flex items-center gap-2"
          >
            <Save className="w-5 h-5" />
            حفظ الصنف
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuForm;
    
