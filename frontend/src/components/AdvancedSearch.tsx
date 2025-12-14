'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, Filter, X, TrendingUp, DollarSign, Package, ChevronDown, Loader2 } from 'lucide-react';
import { searchProducts, getKeywordSuggestions, SearchOptions, SearchResult } from '../services/searchService';

interface AdvancedSearchProps {
  onSearchResults: (results: SearchResult) => void;
  placeholder?: string;
}

export default function AdvancedSearch({ onSearchResults, placeholder = 'ابحث عن منتجات...' }: AdvancedSearchProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [popularKeywords, setPopularKeywords] = useState<string[]>([]);
  
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    minPrice: '',
    maxPrice: '',
    minStock: '',
    maxStock: '',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  const searchRef = useRef<HTMLDivElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();

  // Load popular keywords on mount
  useEffect(() => {
    const loadPopularKeywords = async () => {
      try {
        const keywords = await getKeywordSuggestions('');
        setPopularKeywords(keywords.slice(0, 5).map(k => k.keyword));
      } catch (error) {
        console.error('Failed to load popular keywords:', error);
      }
    };
    loadPopularKeywords();
  }, []);

  // Handle search with debouncing
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (query.length > 2) {
      searchTimeoutRef.current = setTimeout(() => {
        handleSearch();
      }, 300);
    } else if (query.length === 0) {
      handleSearch(); // Load all products when empty
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [query, filters]);

  // Handle suggestions
  useEffect(() => {
    if (query.length > 2) {
      const loadSuggestions = async () => {
        try {
          const data = await getKeywordSuggestions(query);
          setSuggestions(data.map(s => s.keyword));
          setShowSuggestions(true);
        } catch (error) {
          console.error('Failed to load suggestions:', error);
        }
      };
      loadSuggestions();
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = async () => {
    setIsSearching(true);
    try {
      const searchOptions: SearchOptions = {
        query,
        category: filters.category || undefined,
        status: filters.status || undefined,
        sortBy: filters.sortBy as any,
        sortOrder: filters.sortOrder as any,
        page: 1,
        limit: 20
      };

      // Add price range if specified
      if (filters.minPrice || filters.maxPrice) {
        searchOptions.priceRange = {
          min: parseFloat(filters.minPrice) || 0,
          max: parseFloat(filters.maxPrice) || 999999
        };
      }

      // Add stock range if specified
      if (filters.minStock || filters.maxStock) {
        searchOptions.stockRange = {
          min: parseInt(filters.minStock) || 0,
          max: parseInt(filters.maxStock) || 999999
        };
      }

      const results = await searchProducts(searchOptions);
      onSearchResults(results);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
  };

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      status: '',
      minPrice: '',
      maxPrice: '',
      minStock: '',
      maxStock: '',
      sortBy: 'createdAt',
      sortOrder: 'desc'
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '' && value !== 'createdAt' && value !== 'desc');

  return (
    <div className="w-full max-w-4xl mx-auto" ref={searchRef}>
      {/* Main Search Bar */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.length > 2 && setShowSuggestions(true)}
            placeholder={placeholder}
            className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-ray-blue focus:border-transparent"
          />
          {isSearching && (
            <Loader2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 animate-spin text-ray-blue" />
          )}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-lg transition"
          >
            <Filter className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
            <div className="p-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full text-right px-3 py-2 hover:bg-gray-100 rounded-lg transition flex items-center justify-between"
                >
                  <span>{suggestion}</span>
                  <Search className="w-3 h-3 text-gray-400" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Popular Keywords */}
      {popularKeywords.length > 0 && query.length === 0 && (
        <div className="mt-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <TrendingUp className="w-4 h-4" />
            <span>عمليات البحث الشائعة:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {popularKeywords.map((keyword, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(keyword)}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition"
              >
                {keyword}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Advanced Filters */}
      {showFilters && (
        <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">فلاتر متقدمة</h3>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-red-600 hover:text-red-700 transition"
              >
                مسح الفلاتر
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">الفئة</label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ray-blue"
              >
                <option value="">كل الفئات</option>
                <option value="إلكترونيات">إلكترونيات</option>
                <option value="هواتف">هواتف</option>
                <option value="إكسسوارات">إكسسوارات</option>
                <option value="تصوير">تصوير</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">الحالة</label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ray-blue"
              >
                <option value="">كل الحالات</option>
                <option value="active">نشط</option>
                <option value="inactive">غير نشط</option>
              </select>
            </div>

            {/* Sort Options */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">الترتيب حسب</label>
              <select
                value={`${filters.sortBy}-${filters.sortOrder}`}
                onChange={(e) => {
                  const [sortBy, sortOrder] = e.target.value.split('-');
                  handleFilterChange('sortBy', sortBy);
                  handleFilterChange('sortOrder', sortOrder);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ray-blue"
              >
                <option value="createdAt-desc">الأحدث أولاً</option>
                <option value="createdAt-asc">الأقدم أولاً</option>
                <option value="name-asc">الاسم (أ-ي)</option>
                <option value="name-desc">الاسم (ي-أ)</option>
                <option value="price-asc">السعر (الأقل)</option>
                <option value="price-desc">السعر (الأعلى)</option>
                <option value="stock-desc">المخزون (الأكثر)</option>
                <option value="dailySales-desc">المبيعات (الأكثر)</option>
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">نطاق السعر</label>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  placeholder="الحد الأدنى"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ray-blue"
                />
                <span className="text-gray-500">-</span>
                <input
                  type="number"
                  placeholder="الحد الأعلى"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ray-blue"
                />
              </div>
            </div>

            {/* Stock Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">نطاق المخزون</label>
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  placeholder="الحد الأدنى"
                  value={filters.minStock}
                  onChange={(e) => handleFilterChange('minStock', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ray-blue"
                />
                <span className="text-gray-500">-</span>
                <input
                  type="number"
                  placeholder="الحد الأعلى"
                  value={filters.maxStock}
                  onChange={(e) => handleFilterChange('maxStock', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ray-blue"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
