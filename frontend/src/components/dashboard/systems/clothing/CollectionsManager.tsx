
import React, { useState, useEffect } from 'react';
import { Grid, Plus, Edit2, Trash2, Calendar, Tag, Image as ImageIcon, Save, X, Search, Loader2, MoreVertical } from 'lucide-react';
import FileUploader from '../../../common/FileUploader';
import { fetchCollections, saveCollection, deleteCollection, Collection } from '../../../../services/collectionService';
import { useToast } from '../../../common/useToast';

const CollectionsManager: React.FC = () => {
  const { showToast } = useToast();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Form State
  const defaultForm = {
    id: '',
    name: '',
    season: 'الصيف',
    status: 'draft' as const,
    discount: '',
    itemCount: 0,
    image: ''
  };
  const [formData, setFormData] = useState<any>(defaultForm);

  useEffect(() => {
    loadCollections();
  }, []);

  const loadCollections = async () => {
    setIsLoading(true);
    try {
      const data = await fetchCollections();
      setCollections(data);
    } catch (error) {
      showToast('فشل تحميل البيانات', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (collection: Collection) => {
    setFormData({ ...collection });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number | string) => {
    if (confirm('هل أنت متأكد من حذف هذا الكولكشن؟')) {
      try {
        await deleteCollection(id.toString());
        setCollections(prev => prev.filter(c => c.id !== id));
        showToast('تم الحذف بنجاح', 'success');
      } catch (error) {
        showToast('حدث خطأ أثناء الحذف', 'error');
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const savedCollection = await saveCollection({
        ...formData,
        image: formData.image || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400'
      });
      
      if (formData.id) {
         setCollections(prev => prev.map(c => c.id === savedCollection.id ? savedCollection : c));
      } else {
         setCollections(prev => [savedCollection, ...prev]);
      }
      
      setIsModalOpen(false);
      showToast('تم حفظ الكولكشن بنجاح', 'success');
    } catch (error) {
      showToast('فشل الحفظ', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const openNewModal = () => {
    setFormData(defaultForm);
    setIsModalOpen(true);
  };

  const filteredCollections = collections.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.season.includes(searchTerm)
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
      {/* Header */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Grid className="w-6 h-6 text-pink-600" />
            إدارة المجموعات (Collections)
          </h2>
          <p className="text-sm text-gray-500">نظم منتجاتك في مواسم وكولكشنز جذابة</p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
           <div className="relative flex-1 md:w-64">
              <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="بحث..." 
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 pr-10 pl-4 text-sm focus:outline-none focus:border-pink-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>
           <button 
             onClick={openNewModal}
             className="bg-pink-600 text-white px-4 py-2 rounded-xl font-bold shadow-md flex items-center gap-2 hover:bg-pink-700 transition whitespace-nowrap"
           >
              <Plus className="w-4 h-4" />
              كولكشن جديد
           </button>
        </div>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="flex justify-center py-20">
           <Loader2 className="w-10 h-10 text-pink-500 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCollections.map((col) => (
            <div key={col.id} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative">
              <div className="h-48 relative overflow-hidden">
                <img src={col.image} alt={col.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                
                <div className="absolute top-3 right-3 flex gap-2">
                  <span className={`px-2 py-1 rounded-lg text-xs font-bold text-white shadow-sm backdrop-blur-md ${col.status === 'active' ? 'bg-green-500/80' : 'bg-gray-500/80'}`}>
                    {col.status === 'active' ? 'نشط' : 'مسودة'}
                  </span>
                  {col.discount && (
                    <span className="px-2 py-1 rounded-lg text-xs font-bold bg-red-500/90 text-white flex items-center gap-1 shadow-sm">
                        <Tag className="w-3 h-3" /> {col.discount}
                    </span>
                  )}
                </div>

                <div className="absolute bottom-4 right-4 text-white z-10">
                  <h3 className="text-xl font-black mb-1 shadow-black drop-shadow-md">{col.name}</h3>
                  <p className="text-xs opacity-90 flex items-center gap-1 font-medium">
                      <Calendar className="w-3 h-3" /> موسم: {col.season}
                  </p>
                </div>
              </div>

              <div className="p-4 flex justify-between items-center bg-white relative">
                <span className="text-sm font-bold text-gray-600 bg-gray-50 px-3 py-1 rounded-lg border border-gray-200">
                    {col.itemCount} منتج
                </span>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute left-4 top-1/2 -translate-y-1/2 bg-white p-1 rounded-lg shadow-sm border border-gray-100">
                    <button onClick={() => handleEdit(col)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition" title="تعديل">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(col.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition" title="حذف">
                      <Trash2 className="w-4 h-4" />
                    </button>
                </div>
                <div className="opacity-100 group-hover:opacity-0 transition-opacity">
                   <MoreVertical className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>
          ))}
          
          {/* Add Button Card */}
          <button 
            onClick={openNewModal}
            className="border-2 border-dashed border-gray-300 rounded-2xl p-6 flex flex-col items-center justify-center text-gray-400 hover:border-pink-400 hover:text-pink-500 hover:bg-pink-50/30 transition min-h-[280px] group"
          >
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-white group-hover:shadow-md transition-all duration-300">
              <Plus className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-lg mb-1">إضافة كولكشن</h3>
            <p className="text-sm text-gray-400 text-center">إنشاء مجموعة جديدة</p>
          </button>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95">
               <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                  <h3 className="font-bold text-gray-800">{formData.id ? 'تعديل الكولكشن' : 'إضافة مجموعة جديدة'}</h3>
                  <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-full hover:bg-gray-200"><X className="w-5 h-5 text-gray-500" /></button>
               </div>
               
               <form onSubmit={handleSave} className="p-6 space-y-4">
                  <div className="space-y-1">
                     <label className="text-xs font-bold text-gray-600">اسم الكولكشن</label>
                     <input 
                       type="text" 
                       required
                       className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm focus:border-pink-500 outline-none transition"
                       placeholder="مثال: صيف 2026"
                       value={formData.name}
                       onChange={e => setFormData({...formData, name: e.target.value})}
                     />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-600">الموسم</label>
                        <select 
                          className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm focus:border-pink-500 outline-none transition"
                          value={formData.season}
                          onChange={e => setFormData({...formData, season: e.target.value})}
                        >
                           <option>الصيف</option>
                           <option>الشتاء</option>
                           <option>الربيع</option>
                           <option>الخريف</option>
                           <option>طوال العام</option>
                        </select>
                     </div>
                     <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-600">الحالة</label>
                        <select 
                          className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm focus:border-pink-500 outline-none transition"
                          value={formData.status}
                          onChange={e => setFormData({...formData, status: e.target.value})}
                        >
                           <option value="draft">مسودة (مخفي)</option>
                           <option value="active">نشط (معروض)</option>
                           <option value="archived">مؤرشف</option>
                        </select>
                     </div>
                  </div>

                  <div className="space-y-1">
                     <label className="text-xs font-bold text-gray-600">خصم (اختياري)</label>
                     <div className="relative">
                        <Tag className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
                        <input 
                          type="text" 
                          className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 pr-10 pl-4 text-sm focus:border-pink-500 outline-none transition"
                          placeholder="مثال: 20%"
                          value={formData.discount}
                          onChange={e => setFormData({...formData, discount: e.target.value})}
                        />
                     </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-xs font-bold text-gray-600">صورة الغلاف</label>
                     <FileUploader label="رفع صورة الكولكشن" />
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSaving}
                    className="w-full bg-pink-600 text-white py-3 rounded-xl font-bold hover:bg-pink-700 transition flex items-center justify-center gap-2 mt-2 shadow-md disabled:opacity-70"
                  >
                     {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                     {formData.id ? 'حفظ التعديلات' : 'إنشاء الكولكشن'}
                  </button>
               </form>
            </div>
         </div>
      )}
    </div>
  );
};

export default CollectionsManager;
