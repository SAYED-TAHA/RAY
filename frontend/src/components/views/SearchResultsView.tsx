
"use client";

import React, { useState, useMemo } from 'react';
import { Search, Filter, Star, ArrowRight, SlidersHorizontal, Map, List, X, ArrowUpDown, Check, TrendingUp } from 'lucide-react';
import SearchFilterModal from '../modals/SearchFilterModal';
import SmartMapSearch from '../widgets/SmartMapSearch';
import { API_URL } from '@/utils/api';

interface SearchResult {
  id: string;
  type: string;
  name: string;
  rating: number;
  image: string;
  subtitle: string;
  price: string;
  priceValue: number;
  features: string[];
}

interface Props {
  query?: string;
}

const SearchResultsView: React.FC<Props> = ({ query = '' }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState(query);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [sortBy, setSortBy] = useState('recommended');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const [advancedFilters, setAdvancedFilters] = useState({
    priceRange: 5000000,
    minRating: 0,
    features: [] as string[]
  });

  const filters = [
    { id: 'all', label: 'الكل' },
    { id: 'restaurant', label: 'مطاعم' },
    { id: 'product', label: 'منتجات' },
    { id: 'realestate', label: 'عقارات' },
    { id: 'car', label: 'سيارات' },
  ];

  // جلب النتائج من API
  React.useEffect(() => {
    const fetchResults = async () => {
      try {
        setIsLoading(true);
        const params = new URLSearchParams({
          q: searchQuery,
          category: activeFilter,
          sort: sortBy
        });
        const response = await fetch(`${API_URL}/api/search?${params}`);
        if (response.ok) {
          const data = await response.json();
          setSearchResults(data);
        }
      } catch (error) {
        console.error('خطأ في البحث:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (searchQuery.trim()) {
      fetchResults();
    }
  }, [searchQuery, activeFilter, sortBy]);

  // Compute filtered results based on all criteria
  const filteredResults = useMemo(() => {
    let results = searchResults.filter(item => {
      // 1. Text Match
      const matchesText = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
      
      // 2. Category Match
      const matchesCategory = activeFilter === 'all' || item.type === activeFilter;

      // 3. Price Match (Handle generic '$$' for restaurants differently if needed, or strictly by value)
      // For '$$' we assume it's within most budgets, but let's use the hidden priceValue
      const matchesPrice = item.priceValue <= advancedFilters.priceRange;

      // 4. Rating Match
      const matchesRating = typeof item.rating === 'number' && item.rating >= advancedFilters.minRating;

      // 5. Features Match (Must have ALL selected features)
      const matchesFeatures = advancedFilters.features.every(f => item.features?.includes(f));

      return matchesText && matchesCategory && matchesPrice && matchesRating && matchesFeatures;
    });

    // Sorting
    if (sortBy === 'price_asc') {
      results.sort((a, b) => a.priceValue - b.priceValue);
    } else if (sortBy === 'price_desc') {
      results.sort((a, b) => b.priceValue - a.priceValue);
    } else if (sortBy === 'rating') {
      results.sort((a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0));
    }

    return results;
  }, [searchQuery, activeFilter, advancedFilters, sortBy]);

  const handleFilterApply = (filters: any) => {
    setAdvancedFilters(filters);
  };

  const clearFilters = () => {
    setAdvancedFilters({ priceRange: 5000000, minRating: 0, features: [] });
    setSortBy('recommended');
    setActiveFilter('all');
  };

  const toggleQuickFilter = (feature: string) => {
     const exists = advancedFilters.features.includes(feature);
     const newFeatures = exists 
        ? advancedFilters.features.filter(f => f !== feature)
        : [...advancedFilters.features, feature];
     setAdvancedFilters(prev => ({ ...prev, features: newFeatures }));
  };

  const activeFiltersCount = (advancedFilters.minRating > 0 ? 1 : 0) + advancedFilters.features.length + (advancedFilters.priceRange < 5000000 ? 1 : 0);

  return (
    <div className="min-h-screen bg-gray-50 animate-in fade-in duration-300">
      {/* Search Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30 px-4 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute right-4 top-3.5 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="ابحث عن أي شيء (مطاعم، منتجات، عقارات...)" 
                className="w-full bg-gray-100 border-transparent focus:bg-white border-2 focus:border-ray-blue rounded-2xl py-3 pr-12 pl-4 outline-none transition-all font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute left-3 top-3.5 text-gray-400 hover:text-gray-600">
                      <X className="w-5 h-5" />
                  </button>
              )}
            </div>
            
            {/* View Toggle */}
            <div className="flex bg-gray-100 p-1 rounded-xl shrink-0">
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2.5 rounded-lg transition flex items-center gap-2 text-sm font-bold ${viewMode === 'list' ? 'bg-white shadow text-ray-blue' : 'text-gray-500 hover:text-gray-800'}`}
              >
                <List className="w-4 h-4" />
                قائمة
              </button>
              <button 
                onClick={() => setViewMode('map')}
                className={`p-2.5 rounded-lg transition flex items-center gap-2 text-sm font-bold ${viewMode === 'map' ? 'bg-white shadow text-ray-blue' : 'text-gray-500 hover:text-gray-800'}`}
              >
                <Map className="w-4 h-4" />
                خريطة
              </button>
            </div>
          </div>
          
          {/* Quick Categories */}
          <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar pb-1">
            {filters.map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all
                  ${activeFilter === filter.id 
                    ? 'bg-ray-black text-white shadow-md transform scale-105' 
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-ray-blue'}
                `}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Area */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-xl font-bold text-ray-black">
             {searchQuery ? `نتائج البحث عن "${searchQuery}"` : 'جميع النتائج'} 
             <span className="text-gray-500 text-sm font-medium mr-2">({filteredResults.length})</span>
          </h2>
          
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
             {/* Quick Filters */}
             <button 
               onClick={() => toggleQuickFilter('offers')}
               className={`text-xs font-bold px-3 py-2 rounded-lg border transition flex items-center gap-1 ${advancedFilters.features.includes('offers') ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-gray-200 text-gray-600'}`}
             >
               {advancedFilters.features.includes('offers') && <Check className="w-3 h-3" />}
               عروض وخصومات
             </button>
             <button 
               onClick={() => toggleQuickFilter('open_now')}
               className={`text-xs font-bold px-3 py-2 rounded-lg border transition flex items-center gap-1 ${advancedFilters.features.includes('open_now') ? 'bg-green-50 border-green-200 text-green-700' : 'bg-white border-gray-200 text-gray-600'}`}
             >
               {advancedFilters.features.includes('open_now') && <Check className="w-3 h-3" />}
               مفتوح الآن
             </button>

             {/* Sort Dropdown */}
             <div className="relative group">
                 <button className="flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 text-gray-700">
                    <ArrowUpDown className="w-4 h-4" />
                    ترتيب
                 </button>
                 <div className="absolute top-full left-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden hidden group-hover:block z-20 animate-in fade-in slide-in-from-top-2">
                    <button onClick={() => setSortBy('recommended')} className={`block w-full text-right px-4 py-2 text-sm hover:bg-gray-50 ${sortBy === 'recommended' ? 'font-bold text-ray-blue' : 'text-gray-600'}`}>الأكثر تطابقاً</button>
                    <button onClick={() => setSortBy('rating')} className={`block w-full text-right px-4 py-2 text-sm hover:bg-gray-50 ${sortBy === 'rating' ? 'font-bold text-ray-blue' : 'text-gray-600'}`}>الأعلى تقييماً</button>
                    <button onClick={() => setSortBy('price_asc')} className={`block w-full text-right px-4 py-2 text-sm hover:bg-gray-50 ${sortBy === 'price_asc' ? 'font-bold text-ray-blue' : 'text-gray-600'}`}>الأقل سعراً</button>
                    <button onClick={() => setSortBy('price_desc')} className={`block w-full text-right px-4 py-2 text-sm hover:bg-gray-50 ${sortBy === 'price_desc' ? 'font-bold text-ray-blue' : 'text-gray-600'}`}>الأعلى سعراً</button>
                 </div>
             </div>

             <button 
              onClick={() => setIsFilterOpen(true)}
              className={`flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-xl border transition shadow-sm
                ${activeFiltersCount > 0 ? 'bg-ray-blue text-white border-ray-blue' : 'text-gray-600 bg-white border-gray-200 hover:bg-gray-50'}
              `}
            >
              <SlidersHorizontal className="w-4 h-4" />
              فلترة
              {activeFiltersCount > 0 && <span className="bg-white text-ray-blue text-[10px] w-5 h-5 rounded-full flex items-center justify-center">{activeFiltersCount}</span>}
            </button>
          </div>
        </div>

        {filteredResults.length > 0 ? (
          viewMode === 'map' ? (
            <SmartMapSearch results={filteredResults as any} onSelect={(item) => console.log(item)} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in slide-in-from-bottom-4">
              {filteredResults.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all group cursor-pointer h-full flex flex-col">
                  <div className="h-48 relative overflow-hidden shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-700" 
                      loading="lazy"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold shadow-sm text-ray-blue">
                      {item.type === 'restaurant' ? 'مطعم' : item.type === 'product' ? 'منتج' : item.type === 'car' ? 'سيارة' : 'عقار'}
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-lg text-ray-black group-hover:text-ray-blue transition">{item.name}</h3>
                      <div className="flex items-center gap-1 text-xs font-bold bg-yellow-50 text-yellow-700 px-2 py-1 rounded-lg">
                        <Star className="w-3 h-3 fill-current" /> {item.rating}
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mb-3 font-medium">{item.subtitle}</p>
                    
                    {/* Features Tags */}
                    {item.features && item.features.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                            {item.features.includes('free_delivery') && <span className="text-[10px] bg-green-50 text-green-700 px-1.5 py-0.5 rounded">توصيل مجاني</span>}
                            {item.features.includes('offers') && <span className="text-[10px] bg-red-50 text-red-700 px-1.5 py-0.5 rounded">خصم</span>}
                        </div>
                    )}

                    <div className="flex justify-between items-center pt-3 border-t border-gray-50 mt-auto">
                      <span className="font-black text-ray-black">{item.price}</span>
                      <button className="text-sm font-bold text-ray-blue flex items-center gap-1 hover:underline">
                        التفاصيل <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
              <Search className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-ray-black mb-2">لا توجد نتائج</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">لم نعثر على أي نتائج تطابق بحثك والفلاتر الحالية. جرب كلمات مختلفة أو أزل بعض الفلاتر.</p>
            <div className="flex justify-center gap-3">
                <button onClick={clearFilters} className="text-white bg-ray-blue px-6 py-2 rounded-xl font-bold hover:bg-blue-700 transition">مسح جميع الفلاتر</button>
                <button onClick={() => setSearchQuery('')} className="text-gray-600 bg-gray-100 px-6 py-2 rounded-xl font-bold hover:bg-gray-200 transition">بحث جديد</button>
            </div>
            
            <div className="mt-12 pt-8 border-t border-gray-100 max-w-2xl mx-auto">
                <p className="text-sm font-bold text-gray-400 mb-4">قد يعجبك أيضاً</p>
                <div className="flex flex-wrap justify-center gap-2">
                    {['بيتزا', 'ملابس رياضية', 'آيفون 15', 'شقق بالتجمع', 'سيارات هيونداي'].map((tag, i) => (
                        <button key={i} onClick={() => setSearchQuery(tag)} className="px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-full text-sm text-gray-600 transition flex items-center gap-2">
                            <TrendingUp className="w-3 h-3 text-gray-400" /> {tag}
                        </button>
                    ))}
                </div>
            </div>
          </div>
        )}
      </div>

      <SearchFilterModal 
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={handleFilterApply}
      />
    </div>
  );
};

export default SearchResultsView;
 
