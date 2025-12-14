
import React from 'react';
import { Search, Plus, ScanBarcode, Pill, ShoppingBag, Loader2 } from 'lucide-react';

interface POSProductGridProps {
  products: any[];
  categories: string[];
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  barcodeInput: string;
  setBarcodeInput: (code: string) => void;
  onBarcodeSubmit: (e: React.FormEvent) => void;
  addToCart: (product: any) => void;
  isPharmacy: boolean;
  themeClasses: any;
  themeColor: string;
  barcodeInputRef?: React.RefObject<HTMLInputElement>;
  isLoading?: boolean;
}

const POSProductGrid: React.FC<POSProductGridProps> = ({
  products, categories, activeCategory, setActiveCategory,
  searchTerm, setSearchTerm, barcodeInput, setBarcodeInput, onBarcodeSubmit,
  addToCart, isPharmacy, themeClasses, themeColor, barcodeInputRef, isLoading
}) => {
  
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.barcode.includes(searchTerm);
    const matchesCategory = activeCategory === 'الكل' || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-4 lg:p-6 flex flex-col h-full overflow-hidden">
      {/* Top Bar: Barcode & Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <form onSubmit={onBarcodeSubmit} className="flex-1 relative">
           <ScanBarcode className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
           <input 
             ref={barcodeInputRef}
             type="text" 
             placeholder="امسح الباركود (Enter)..." 
             className={`w-full ${themeClasses.bg} border ${themeClasses.border} rounded-xl py-3 pr-10 pl-4 focus:outline-none ${themeClasses.focus} focus:ring-2 ${themeClasses.ring} font-mono text-left dir-ltr placeholder:text-right transition text-base md:text-sm`}
             value={barcodeInput}
             onChange={e => setBarcodeInput(e.target.value)}
             disabled={isLoading}
           />
        </form>
        <div className="flex-1 relative">
           <Search className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
           <input 
             type="text" 
             placeholder="بحث باسم المنتج..." 
             className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pr-10 pl-4 focus:outline-none focus:border-gray-400 text-base md:text-sm transition"
             value={searchTerm}
             onChange={e => setSearchTerm(e.target.value)}
             disabled={isLoading}
           />
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-2 no-scrollbar">
          {isLoading ? (
             // Loading Skeletons for Categories
             Array(6).fill(0).map((_, i) => (
                <div key={i} className="w-20 h-9 bg-gray-100 rounded-full animate-pulse shrink-0"></div>
             ))
          ) : (
             categories.map(cat => (
              <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition shrink-0
                      ${activeCategory === cat 
                          ? `${themeClasses.btn} text-white shadow-md` 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                  {cat}
              </button>
            ))
          )}
      </div>

      {/* Products Grid */}
      <div className="flex-1 overflow-y-auto pr-1">
        <h3 className="font-bold text-gray-700 mb-4 text-sm flex items-center gap-2">
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (isPharmacy ? <Pill className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />)}
          {isLoading ? 'جاري تحميل المنتجات...' : `المنتجات المتاحة (${filteredProducts.length})`}
        </h3>
        
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-4">
             {Array(8).fill(0).map((_, i) => (
               <div key={i} className="p-3 border border-gray-100 rounded-xl bg-white relative overflow-hidden">
                  <div className="aspect-square bg-gray-100 rounded-lg mb-3 animate-pulse"></div>
                  <div className="h-4 bg-gray-100 rounded w-3/4 mb-2 animate-pulse"></div>
                  <div className="flex justify-between mt-2">
                    <div className="h-5 w-12 bg-gray-100 rounded animate-pulse"></div>
                    <div className="h-5 w-16 bg-gray-100 rounded animate-pulse"></div>
                  </div>
               </div>
             ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 pb-20 lg:pb-4">
             {filteredProducts.map(product => (
               <div 
                 key={product.id}
                 onClick={() => addToCart(product)}
                 className={`group p-3 border border-gray-100 rounded-xl hover:border-${themeColor}-500 cursor-pointer hover:shadow-lg transition text-center bg-white relative overflow-hidden active:scale-95 active:shadow-inner`}
               >
                  <div className="aspect-square bg-gray-50 rounded-lg mb-3 overflow-hidden relative">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500" 
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition" />
                  </div>
                  <p className="font-bold text-sm text-gray-800 line-clamp-1 mb-1">{product.name}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-[10px] md:text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded truncate max-w-[60px]">{product.barcode}</span>
                    <span className={`${themeClasses.text} font-black text-sm`}>{product.price} <span className="text-[10px]">ج.م</span></span>
                  </div>
                  
                  {/* Add Indicator Overlay */}
                  <div className={`absolute inset-0 bg-${themeColor}-600/10 opacity-0 group-active:opacity-100 transition-opacity pointer-events-none flex items-center justify-center`}>
                      <Plus className={`w-8 h-8 text-${themeColor}-600`} />
                  </div>
               </div>
             ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default POSProductGrid;
