
"use client";

import React, { useState, useEffect, useRef, useCallback, useLayoutEffect } from 'react';
import { 
  Search, MapPin, Heart, ShoppingCart, Bell, Menu, X,
  User, Moon, Sun, ChevronDown, Clock, TrendingUp, Store,
  Percent, Trash2
} from 'lucide-react';
import { allCategories } from '../data';
import CartIcon from '@/components/common/CartIcon';
import { fastCart, cartEvents } from '@/utils/performance';

interface HeaderProps {
  activeSystem?: string | null;
  onCategorySelect?: (categoryId: string) => void;
  goHome?: () => void;
  onNavigate?: (view: string, params?: any) => void;
  onAuth?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  activeSystem, 
  onCategorySelect,
  goHome,
  onNavigate,
  onAuth
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [location, setLocation] = useState('القاهرة، المعادي');
  const [cartTotal, setCartTotal] = useState(0);
  const [isHydrated, setIsHydrated] = useState(false);
  const searchContainerRef = useRef<HTMLFormElement>(null);
  // Mock theme and auth for now
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [language, setLanguage] = useState('ar');

  // Mark as hydrated after mount
  useLayoutEffect(() => {
    setIsHydrated(true);
  }, []);

  // Update cart total
  const updateCartTotal = useCallback(() => {
    const total = fastCart.total();
    setCartTotal(total);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    updateCartTotal();
    const unsubscribe = cartEvents.subscribe(updateCartTotal);
    return () => {
      unsubscribe();
    };
  }, [updateCartTotal, isHydrated]);
  
  // Initialize dark mode and language from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('ray_dark_mode') === 'true';
    // Always default to Arabic ('ar')
    const savedLanguage = localStorage.getItem('ray_language') || 'ar';
    
    setIsDarkMode(savedDarkMode);
    setLanguage(savedLanguage);
    
    // Apply to DOM
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Ensure Arabic is set
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'ar';
    localStorage.setItem('ray_language', 'ar');
  }, []);
  
  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('ray_dark_mode', String(newDarkMode));
    
    // Apply to DOM
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  
  // Language toggle disabled - keeping Arabic only for now
  // const toggleLanguage = () => {
  //   const newLang = language === 'ar' ? 'en' : 'ar';
  //   setLanguage(newLang);
  //   localStorage.setItem('ray_language', newLang);
  //   
  //   // Smooth transition effect
  //   document.body.style.transition = 'all 0.3s ease';
  //   document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  //   document.documentElement.lang = newLang;
  //   
  //   // Add visual feedback
  //   const button = document.querySelector('[aria-label="Toggle Language"]');
  //   if (button) {
  //     button.classList.add('scale-110');
  //     setTimeout(() => button.classList.remove('scale-110'), 200);
  //   }
  // };

  // Mock suggestions with categories
  const suggestions = language === 'ar' ? [
    { text: 'مطعم سوري', type: 'food' },
    { text: 'ملابس أطفال', type: 'shopping' },
    { text: 'سيارات مستعملة', type: 'cars' },
    { text: 'شقق للإيجار', type: 'realestate' },
    { text: 'جيم', type: 'health' },
    { text: 'صيدلية 24 ساعة', type: 'health' }
  ] : [
    { text: 'Syrian Restaurant', type: 'food' },
    { text: 'Kids Clothes', type: 'shopping' },
    { text: 'Used Cars', type: 'cars' },
    { text: 'Apartments for Rent', type: 'realestate' },
    { text: 'Gym', type: 'health' },
    { text: '24-Hour Pharmacy', type: 'health' }
  ];

  // Translation helper
  const t = (ar: string, en: string) => language === 'ar' ? ar : en;

  useEffect(() => {
    const saved = localStorage.getItem('ray_recent_searches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }

    // Click outside to close dropdown
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSearchDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);

  const saveSearch = (term: string) => {
    if (!term.trim()) return;
    const newHistory = [term, ...recentSearches.filter(s => s !== term)].slice(0, 5);
    setRecentSearches(newHistory);
    localStorage.setItem('ray_recent_searches', JSON.stringify(newHistory));
  };

  const clearHistory = () => {
    setRecentSearches([]);
    localStorage.removeItem('ray_recent_searches');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveSearch(searchValue);
    setShowSearchDropdown(false);
    setIsMenuOpen(false);
    if (onNavigate) onNavigate('search', { q: searchValue });
  };

  const handleSuggestionClick = (term: string) => {
    setSearchValue(term);
    saveSearch(term);
    setShowSearchDropdown(false);
    setIsMenuOpen(false);
    if (onNavigate) onNavigate('search', { q: term });
  };

  const removeRecentSearch = (e: React.MouseEvent, term: string) => {
    e.stopPropagation();
    const newHistory = recentSearches.filter(s => s !== term);
    setRecentSearches(newHistory);
    localStorage.setItem('ray_recent_searches', JSON.stringify(newHistory));
  };

  const handleAuthAction = () => {
      if (user) {
          if (onNavigate) onNavigate('profile');
      } else {
          if (onAuth) { 
            onAuth(); 
          } else if (onNavigate) {
            onNavigate('login');
          }
      }
  };

  const handleNavClick = (e: React.MouseEvent, view: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(view);
    } else {
    }
    setIsMenuOpen(false);
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (goHome) {
      goHome();
    }
    setIsMenuOpen(false);
  };

  // Helper to highlight matching text
  const HighlightedText = ({ text, highlight }: { text: string, highlight: string }) => {
    if (!highlight.trim()) return <span>{text}</span>;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) => 
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={i} className="font-extrabold text-ray-blue dark:text-ray-gold">{part}</span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </span>
    );
  };

  return (
    <>
      <div className="bg-gradient-to-r from-ray-blue to-blue-900 dark:from-gray-900 dark:to-gray-800 text-white py-2 px-4 text-center text-xs md:text-sm font-medium relative overflow-hidden transition-colors duration-300">
        <div className="absolute top-0 left-0 w-full h-full bg-white/5 animate-pulse"></div>
        <p className="relative z-10 flex justify-center items-center gap-2 cursor-pointer" onClick={(e) => handleNavClick(e, 'offers')}>
          <span className="bg-ray-gold text-ray-black px-2 py-0.5 rounded text-[10px] md:text-xs font-bold">{t('جديد', 'NEW')}</span>
          <span className="truncate">{t('🎯 عروض اليوم - خصم يصل إلى 50% على المطاعم والمحلات! اضغط هنا', '🎯 Today\'s Offers - Up to 50% Discount on Restaurants & Shops! Click Here')}</span>
        </p>
      </div>

      <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-40 border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Row: Logo, Search, Actions */}
          <div className="flex items-center justify-between h-16 md:h-20 gap-2 lg:gap-8">
            
            {/* Logo */}
            <a href="/" onClick={handleHomeClick} className="flex items-center gap-2 shrink-0 cursor-pointer group">
              <div className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br from-ray-gold to-yellow-600 rounded-xl flex items-center justify-center shadow-lg text-ray-blue font-black text-xl md:text-2xl group-hover:rotate-12 transition duration-300">
                R
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-black tracking-tight text-ray-blue dark:text-white group-hover:text-yellow-600 transition">RAY</h1>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 font-bold -mt-1">نور طريق نجاحك</p>
              </div>
            </a>

            {/* Location (Desktop) */}
            <div className="hidden lg:flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-ray-blue dark:hover:text-ray-gold cursor-pointer bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full transition">
              <MapPin className="w-4 h-4 text-ray-blue dark:text-ray-gold" />
              <span className="text-sm font-bold">{t('القاهرة، المعادي', 'Cairo, Maadi')}</span>
              <span className="text-xs text-gray-400">{t('تغيير', 'Change')}</span>
            </div>

            {/* Search Bar (Desktop/Tablet) */}
            <form 
              ref={searchContainerRef}
              onSubmit={handleSearchSubmit} 
              className="flex-1 max-w-2xl relative group mx-2"
            >
              <input 
                type="text" 
                placeholder={t('بحث...', 'Search...')} 
                className="w-full bg-gray-100 dark:bg-gray-800 border-2 border-transparent dark:border-gray-700 text-gray-900 dark:text-white rounded-full py-2.5 px-6 pl-10 text-sm focus:outline-none focus:bg-white dark:focus:bg-gray-900 focus:border-ray-blue dark:focus:border-ray-gold transition-all duration-300 placeholder-gray-400 font-medium"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => setShowSearchDropdown(true)}
              />
              <button type="submit" className="absolute left-2 top-1.5 bg-ray-blue dark:bg-ray-gold dark:text-gray-900 text-white p-1.5 rounded-full hover:bg-blue-800 dark:hover:bg-yellow-400 transition">
                <Search className="w-4 h-4" />
              </button>

              {/* Search Dropdown */}
              {showSearchDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                  {searchValue.length === 0 && recentSearches.length > 0 && (
                    <div className="p-2">
                      <div className="flex items-center justify-between px-3 py-2">
                        <h3 className="text-xs font-bold text-gray-400">{t('عمليات البحث الأخيرة', 'Recent Searches')}</h3>
                        <button onClick={clearHistory} type="button" className="text-xs text-red-500 hover:underline flex items-center gap-1">
                          <Trash2 className="w-3 h-3" /> {t('مسح الكل', 'Clear All')}
                        </button>
                      </div>
                      {recentSearches.map((term, idx) => (
                        <div 
                          key={idx} 
                          onClick={() => handleSuggestionClick(term)}
                          className="flex items-center justify-between px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg cursor-pointer group"
                        >
                          <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span>{term}</span>
                          </div>
                          <button onClick={(e) => removeRecentSearch(e, term)} className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition">
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="p-2 border-t border-gray-50 dark:border-gray-800">
                    <h3 className="text-xs font-bold text-gray-400 px-3 py-2">
                      {searchValue.length > 0 ? t('اقتراحات البحث', 'Search Suggestions') : t('الأكثر بحثاً', 'Most Searched')}
                    </h3>
                    {suggestions
                      .filter(s => s.text.toLowerCase().includes(searchValue.toLowerCase()))
                      .slice(0, 5)
                      .map((item, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => handleSuggestionClick(item.text)}
                        className="flex items-center justify-between px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg cursor-pointer text-gray-700 dark:text-gray-300"
                      >
                        <div className="flex items-center gap-3">
                            <TrendingUp className="w-4 h-4 text-gray-400" />
                            <HighlightedText text={item.text} highlight={searchValue} />
                        </div>
                        <span className="text-[10px] bg-gray-100 dark:bg-gray-700 text-gray-500 px-2 py-0.5 rounded-full">
                            {language === 'ar' ? (item.type === 'food' ? 'مطاعم' : item.type === 'shopping' ? 'تسوق' : 'عام') : (item.type === 'food' ? 'Restaurants' : item.type === 'shopping' ? 'Shopping' : 'General')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </form>
            
            {/* Actions */}
            <div className="flex items-center gap-1.5 md:gap-3 shrink-0">
               {/* Theme Toggle - Visible on all screens */}
               <button 
                 onClick={toggleTheme}
                 className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-300 active:scale-95 group"
                 aria-label="Toggle Dark Mode"
               >
                 {isDarkMode ? 
                   <Sun className="w-5 h-5 group-hover:text-yellow-500 transition-colors" /> : 
                   <Moon className="w-5 h-5 group-hover:text-ray-blue transition-colors" />
                 }
               </button>

               <button onClick={(e) => handleNavClick(e, 'notifications')} className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full relative transition group active:scale-95">
                 <Bell className="w-6 h-6 group-hover:text-ray-blue dark:group-hover:text-ray-gold" />
                 <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-gray-900 animate-pulse"></span>
               </button>
               
               {/* Hidden on mobile as they are in bottom nav */}
               <button onClick={(e) => handleNavClick(e, 'favorites')} className="hidden md:block p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full relative transition group active:scale-95">
                 <Heart className="w-6 h-6 group-hover:text-red-500 transition-colors" />
               </button>
               
               <div className="hidden md:flex items-center gap-2">
                 <CartIcon showCount={true} size="md" className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full relative transition group active:scale-95" />
                 <span className="hidden lg:block text-sm font-bold text-gray-700 dark:text-gray-200 hover:text-ray-blue dark:hover:text-ray-gold transition">
                  {isHydrated ? `${cartTotal} ج` : '...'}
                </span>
               </div>
               
               <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 mx-1 hidden md:block"></div>
               
               {/* Profile / Login - Hidden on mobile */}
               <button 
                 onClick={handleAuthAction} 
                 className="hidden md:flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-200 hover:text-ray-blue dark:hover:text-ray-gold transition group active:scale-95"
               >
                  <div className="w-9 h-9 bg-blue-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-ray-blue dark:text-ray-gold group-hover:bg-ray-blue group-hover:text-white transition">
                    <User className="w-5 h-5" />
                  </div>
                  <span className="hidden lg:inline">{user ? t('حسابي', 'My Account') : t('تسجيل الدخول', 'Sign In')}</span>
               </button>

               {/* Hamburger Menu (Secondary Links on Mobile) */}
               <button 
                 onClick={() => setIsMenuOpen(true)} 
                 className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg active:scale-95"
                 aria-label="Open menu"
               >
                 <Menu className="w-7 h-7" />
               </button>
            </div>
          </div>

          {/* Secondary Navigation (Desktop) */}
          <div className="hidden md:flex items-center justify-between border-t border-gray-100 dark:border-gray-800 py-1 relative">
            <ul className="flex gap-1 overflow-visible h-12 items-center">
              <li>
                <a href="/" onClick={handleHomeClick} className="text-sm font-black hover:text-ray-gold transition px-4 py-3 text-ray-blue dark:text-white block">{t('الرئيسية', 'Home')}</a>
              </li>

              {allCategories.map((category) => (
                <li key={category.id} className="group relative h-full flex items-center">
                  <button 
                    onClick={() => {
                      if(onCategorySelect) onCategorySelect(category.id);
                      else if(onNavigate) onNavigate('categories');
                    }}
                    className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-ray-blue dark:hover:text-ray-gold hover:bg-gray-50 dark:hover:bg-gray-800 px-3 py-2 rounded-lg transition flex items-center gap-1"
                  >
                    <category.icon className="w-4 h-4" />
                    <span>{category.name}</span>
                    <ChevronDown className="w-3 h-3 mt-0.5 opacity-50 group-hover:opacity-100 transition" />
                  </button>
                  <div className="absolute top-full right-0 w-64 bg-white dark:bg-gray-900 shadow-xl rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden hidden group-hover:block z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="bg-gray-50 dark:bg-gray-800 p-3 border-b border-gray-100 dark:border-gray-700 flex items-center gap-2">
                       <category.icon className="w-5 h-5 text-ray-blue dark:text-ray-gold" />
                       <span className="font-bold text-ray-blue dark:text-white">{category.name}</span>
                    </div>
                    <div className="p-2">
                      {category.sub.map((sub) => (
                        <button 
                          key={sub.id} 
                          onClick={() => onNavigate && onNavigate('search', { category: category.id, sub: sub.id })}
                          className="block w-full text-right px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-ray-blue hover:text-white dark:hover:bg-ray-gold dark:hover:text-ray-black rounded-lg transition-colors"
                        >
                          {sub.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-50 flex flex-col bg-white dark:bg-gray-900 md:hidden animate-in slide-in-from-right-10 duration-300">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2">
                 <div className="w-8 h-8 bg-ray-gold rounded-lg flex items-center justify-center font-black text-ray-black">R</div>
                 <span className="font-black text-lg text-ray-black dark:text-white">RAY</span>
              </div>
              <div className="flex items-center gap-2">
                <button 
                   onClick={toggleTheme}
                   className="p-2 text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-full transition"
                >
                   {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Mobile Menu Content */}
            <div className="flex-1 overflow-y-auto p-4 pb-safe">
              <div className="space-y-1 mb-6">
                {/* Important Mobile Links */}
                <button onClick={(e) => { handleNavClick(e, 'systems'); setIsMenuOpen(false); }} className="flex items-center gap-3 w-full text-right p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium">
                  <Store className="w-5 h-5 text-gray-400" />
                  {t('سجّل نشاطك (للتجار)', 'Register Your Business')}
                </button>
                <button onClick={(e) => { if(user) { handleNavClick(e, 'profile'); } else { handleAuthAction(); } setIsMenuOpen(false); }} className="flex items-center gap-3 w-full text-right p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium">
                   <User className="w-5 h-5 text-gray-400" />
                   {user ? t('إعدادات الحساب', 'Account Settings') : t('تسجيل الدخول', 'Sign In')}
                </button>
              </div>

              <div className="border-t border-gray-100 dark:border-gray-800 pt-6">
                <h3 className="text-xs font-bold text-gray-400 mb-4 px-2">{t('جميع الأقسام', 'All Categories')}</h3>
                <div className="space-y-2">
                  {allCategories.map(cat => (
                    <details key={cat.id} className="group bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden">
                      <summary className="flex items-center justify-between p-4 cursor-pointer list-none font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 active:bg-gray-200 dark:active:bg-gray-600 transition-colors">
                        <div className="flex items-center gap-3">
                          <cat.icon className="w-6 h-6 text-ray-blue dark:text-ray-gold" />
                          {cat.name}
                        </div>
                        <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" />
                      </summary>
                      <div className="px-3 pb-3 pt-1 space-y-1 border-t border-gray-200/50 dark:border-gray-700">
                        <button 
                          onClick={() => {
                            if(onNavigate) onNavigate('search', { category: cat.id });
                            setIsMenuOpen(false);
                          }}
                          className="block w-full text-right p-3 text-sm font-bold text-ray-blue dark:text-ray-gold bg-blue-50 dark:bg-gray-700 rounded-lg mb-2 active:scale-98 transition-transform"
                        >
                          {t('عرض الكل في', 'View All in')} {cat.name}
                        </button>
                        {cat.sub.map(sub => (
                          <button 
                            key={sub.id} 
                            onClick={() => {
                              if(onNavigate) onNavigate('search', { category: cat.id, sub: sub.id });
                              setIsMenuOpen(false);
                            }}
                            className="block w-full text-right p-3 text-sm text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-600 rounded-lg hover:text-ray-blue transition-colors active:bg-gray-200 dark:active:bg-gray-500"
                          >
                            {sub.name}
                          </button>
                        ))}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
