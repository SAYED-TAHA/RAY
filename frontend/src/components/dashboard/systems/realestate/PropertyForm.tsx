
import React, { useState } from 'react';
import { 
  Home, MapPin, DollarSign, Ruler, Bed, Bath, Camera, 
  Save, X, CheckSquare, UploadCloud, Sparkles, Loader2
} from 'lucide-react';
import { getGeminiResponse } from '@/services/geminiService';
import FileUploader from '../../../common/FileUploader';

interface PropertyFormProps {
  onClose: () => void;
  onSave: (property: any) => void;
  initialData?: any;
}

const PropertyForm: React.FC<PropertyFormProps> = ({ onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState(initialData || {
    title: '',
    type: 'sale',
    category: 'apartment',
    price: '',
    area: '',
    rooms: '',
    bathrooms: '',
    address: '',
    description: '',
    features: []
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const featuresList = [
    'أمن وحراسة', 'جراج خاص', 'مصعد', 'حمام سباحة', 
    'غاز طبيعي', 'تكييف مركزي', 'تشطيب سوبر لوكس', 'حديقة خاصة'
  ];

  const toggleFeature = (feature: string) => {
    setFormData((prev: any) => {
      const features = prev.features.includes(feature)
        ? prev.features.filter((f: string) => f !== feature)
        : [...prev.features, feature];
      return { ...prev, features };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const generateDescription = async () => {
    if (!formData.category) return;
    setIsGenerating(true);
    try {
        const prompt = `اكتب وصف إعلاني احترافي ومميز لعقار: ${formData.title}، نوعه ${formData.category}، مساحة ${formData.area}م، ${formData.rooms} غرف. ركز على الموقع والمميزات بلهجة عقارية فخمة.`;
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
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Home className="w-6 h-6 text-green-600" />
              {initialData ? 'تعديل الوحدة' : 'إضافة وحدة جديدة'}
            </h2>
            <p className="text-sm text-gray-500">أدخل تفاصيل العقار بدقة لزيادة فرص البيع</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <form id="property-form" onSubmit={handleSubmit} className="space-y-8">
            
            {/* Basic Info */}
            <section>
              <h3 className="text-lg font-bold text-gray-800 mb-4 border-r-4 border-green-500 pr-3">البيانات الأساسية</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-1">عنوان الإعلان</label>
                  <input 
                    type="text" 
                    required
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:border-green-500 outline-none transition"
                    placeholder="مثال: شقة فاخرة للبيع بالتجمع الخامس - 180م"
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-bold text-gray-700 mb-1">نوع العرض</label>
                  <div className="flex p-1 bg-gray-100 rounded-xl">
                    {['sale', 'rent'].map(type => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData({...formData, type})}
                        className={`flex-1 py-2 rounded-lg text-sm font-bold transition ${
                          formData.type === type ? 'bg-white text-green-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        {type === 'sale' ? 'بيع' : 'إيجار'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-bold text-gray-700 mb-1">نوع العقار</label>
                  <select 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:border-green-500 outline-none"
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="apartment">شقة</option>
                    <option value="villa">فيلا</option>
                    <option value="commercial">تجاري / إداري</option>
                    <option value="land">أرض</option>
                    <option value="chalet">شاليه</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-bold text-gray-700 mb-1">السعر المطلوب</label>
                  <div className="relative">
                    <DollarSign className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                    <input 
                      type="number" 
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 pr-10 pl-4 focus:border-green-500 outline-none"
                      placeholder="0.00"
                      value={formData.price}
                      onChange={e => setFormData({...formData, price: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-bold text-gray-700 mb-1">المساحة (م²)</label>
                  <div className="relative">
                    <Ruler className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                    <input 
                      type="number" 
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 pr-10 pl-4 focus:border-green-500 outline-none"
                      placeholder="المساحة بالمتر"
                      value={formData.area}
                      onChange={e => setFormData({...formData, area: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Details */}
            <section>
              <h3 className="text-lg font-bold text-gray-800 mb-4 border-r-4 border-green-500 pr-3">التفاصيل والمواصفات</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-1">
                  <label className="block text-sm font-bold text-gray-700 mb-1">عدد الغرف</label>
                  <div className="relative">
                    <Bed className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                    <input 
                      type="number" 
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 pr-10 pl-4 focus:border-green-500 outline-none"
                      value={formData.rooms}
                      onChange={e => setFormData({...formData, rooms: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-bold text-gray-700 mb-1">عدد الحمامات</label>
                  <div className="relative">
                    <Bath className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                    <input 
                      type="number" 
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 pr-10 pl-4 focus:border-green-500 outline-none"
                      value={formData.bathrooms}
                      onChange={e => setFormData({...formData, bathrooms: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-bold text-gray-700 mb-1">الموقع / العنوان</label>
                  <div className="relative">
                    <MapPin className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                    <input 
                      type="text" 
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 pr-10 pl-4 focus:border-green-500 outline-none"
                      placeholder="الحي، المنطقة"
                      value={formData.address}
                      onChange={e => setFormData({...formData, address: e.target.value})}
                    />
                  </div>
                </div>

                <div className="col-span-1 md:col-span-3">
                  <label className="block text-sm font-bold text-gray-700 mb-1">المميزات الإضافية</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {featuresList.map(feature => (
                      <label 
                        key={feature}
                        className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all
                          ${formData.features.includes(feature) ? 'bg-green-50 border-green-500 text-green-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}
                        `}
                      >
                        <div className={`w-5 h-5 rounded border flex items-center justify-center ${formData.features.includes(feature) ? 'bg-green-500 border-green-500' : 'bg-white border-gray-300'}`}>
                          {formData.features.includes(feature) && <CheckSquare className="w-3.5 h-3.5 text-white" />}
                        </div>
                        <input 
                          type="checkbox" 
                          className="hidden" 
                          checked={formData.features.includes(feature)}
                          onChange={() => toggleFeature(feature)}
                        />
                        <span className="text-sm font-bold">{feature}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="col-span-1 md:col-span-3">
                  <div className="flex justify-between items-center mb-1">
                      <label className="block text-sm font-bold text-gray-700">وصف العقار</label>
                      <button 
                          type="button" 
                          onClick={generateDescription}
                          disabled={!formData.title || isGenerating}
                          className="text-xs font-bold text-green-600 flex items-center gap-1 hover:bg-green-50 px-2 py-1 rounded transition disabled:opacity-50"
                      >
                          {isGenerating ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                          وصف إعلاني
                      </button>
                  </div>
                  <textarea 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm h-32 focus:border-green-500 outline-none resize-none"
                    placeholder="اكتب وصفاً تفصيلياً للعقار..."
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                  ></textarea>
                </div>
              </div>
            </section>

            {/* Media */}
            <section>
              <h3 className="text-lg font-bold text-gray-800 mb-4 border-r-4 border-green-500 pr-3">الصور والوسائط</h3>
              <FileUploader label="صور العقار" multiple />
            </section>

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
            className="px-8 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition shadow-lg flex items-center gap-2"
          >
            <Save className="w-5 h-5" />
            حفظ العقار
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyForm;
    
