import React, { useState } from 'react';
import { useThemeContext } from '@/context/useThemeContext';
import { 
  Globe, Smartphone, ShoppingCart, Star, Heart, Search, Menu, X,
  ChevronLeft, ChevronRight, Filter, Grid, List, Package, Truck,
  Shield, CreditCard, User, Settings, Bell, Mail, Phone, MapPin
} from 'lucide-react';

const StoreDemo: React.FC = () => {
  const { theme, language } = useThemeContext();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [cart, setCart] = useState<number[]>([]);

  const categories = [
    { id: 'all', name: language === 'ar' ? 'الكل' : 'All' },
    { id: 'electronics', name: language === 'ar' ? 'إلكترونيات' : 'Electronics' },
    { id: 'fashion', name: language === 'ar' ? 'أزياء' : 'Fashion' },
    { id: 'home', name: language === 'ar' ? 'منزل' : 'Home' },
    { id: 'sports', name: language === 'ar' ? 'رياضة' : 'Sports' }
  ];

  const products = [
    {
      id: 1,
      name: language === 'ar' ? 'سماعات لاسلكية' : 'Wireless Headphones',
      price: 299,
      originalPrice: 399,
      rating: 4.5,
      reviews: 234,
      image: '/api/placeholder/300/300',
      category: 'electronics',
      badge: language === 'ar' ? 'الأكثر مبيعاً' : 'Bestseller'
    },
    {
      id: 2,
      name: language === 'ar' ? 'حقيبة يد' : 'Handbag',
      price: 189,
      originalPrice: 259,
      rating: 4.8,
      reviews: 156,
      image: '/api/placeholder/300/300',
      category: 'fashion'
    },
    {
      id: 3,
      name: language === 'ar' ? 'ساعة ذكية' : 'Smart Watch',
      price: 449,
      rating: 4.6,
      reviews: 89,
      image: '/api/placeholder/300/300',
      category: 'electronics',
      badge: language === 'ar' ? 'جديد' : 'New'
    },
    {
      id: 4,
      name: language === 'ar' ? 'حذاء رياضي' : 'Running Shoes',
      price: 129,
      originalPrice: 179,
      rating: 4.4,
      reviews: 312,
      image: '/api/placeholder/300/300',
      category: 'sports'
    }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleCart = (productId: number) => {
    setCart(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-white" />
                </div>
                <span className={`font-bold text-xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {language === 'ar' ? 'متجري' : 'MyStore'}
                </span>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-6">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`text-sm font-medium transition-colors ${
                      selectedCategory === category.id
                        ? 'text-blue-600'
                        : theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </nav>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className={`hidden md:flex items-center gap-2 px-3 py-2 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <Search className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={language === 'ar' ? 'بحث...' : 'Search...'}
                  className={`bg-transparent outline-none text-sm w-48 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                />
              </div>

              {/* Icons */}
              <button className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'text-red-500' : theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
              </button>
              
              <button className={`relative p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                <ShoppingCart className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>

              <button className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                <User className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`md:hidden p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={`md:hidden ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-t`}>
            <div className="px-4 py-4 space-y-4">
              <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <Search className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={language === 'ar' ? 'بحث...' : 'Search...'}
                  className={`bg-transparent outline-none text-sm flex-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                />
              </div>
              
              <nav className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`block w-full text-right px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-blue-50 text-blue-600'
                        : theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {language === 'ar' ? 'اكتشف أحدث المنتجات' : 'Discover Latest Products'}
          </h1>
          <p className="text-xl text-white/90 mb-8">
            {language === 'ar' ? 'خصومات تصل إلى 50% هذا الأسبوع' : 'Up to 50% off this week'}
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
            {language === 'ar' ? 'تسوق الآن' : 'Shop Now'}
          </button>
        </div>
      </section>

      {/* Filters and View */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              {language === 'ar' ? 'عرض' : 'Show'} {filteredProducts.length} {language === 'ar' ? 'منتج' : 'products'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            <button className={`flex items-center gap-2 px-3 py-2 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <Filter className="w-4 h-4" />
              <span className="text-sm">{language === 'ar' ? 'فلتر' : 'Filter'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            : 'grid-cols-1'
        }`}>
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow ${
                viewMode === 'list' ? 'flex gap-4' : ''
              }`}
            >
              {/* Product Image */}
              <div className={`relative ${viewMode === 'list' ? 'w-48 h-48' : 'h-64'}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                    {product.badge}
                  </div>
                )}

                {/* Discount */}
                {product.originalPrice && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </div>
                )}

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute bottom-2 right-2 p-2 bg-white/90 backdrop-blur rounded-full hover:bg-white transition-colors"
                >
                  <Heart className={`w-4 h-4 ${wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                </button>
              </div>

              {/* Product Info */}
              <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                <h3 className={`font-semibold text-lg mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-4">
                  <span className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className={`text-sm line-through ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                      ${product.originalPrice}
                    </span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => toggleCart(product.id)}
                  className={`w-full py-2 rounded-lg font-medium transition-colors ${
                    cart.includes(product.id)
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {cart.includes(product.id) 
                    ? (language === 'ar' ? 'تمت الإضافة' : 'Added to Cart')
                    : (language === 'ar' ? 'أضف للسلة' : 'Add to Cart')
                  }
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-t mt-12`}>
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-white" />
                </div>
                <span className={`font-bold text-xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {language === 'ar' ? 'متجري' : 'MyStore'}
                </span>
              </div>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {language === 'ar' ? 'متجر إلكتروني حديث لجميع احتياجاتك' : 'Modern e-commerce store for all your needs'}
              </p>
            </div>

            <div>
              <h4 className={`font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {language === 'ar' ? 'روابط سريعة' : 'Quick Links'}
              </h4>
              <ul className="space-y-2">
                <li><a href="#" className={`text-sm ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>{language === 'ar' ? 'عن المتجر' : 'About'}</a></li>
                <li><a href="#" className={`text-sm ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>{language === 'ar' ? 'اتصل بنا' : 'Contact'}</a></li>
                <li><a href="#" className={`text-sm ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>{language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}</a></li>
              </ul>
            </div>

            <div>
              <h4 className={`font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {language === 'ar' ? 'الفئات' : 'Categories'}
              </h4>
              <ul className="space-y-2">
                {categories.slice(1).map((category) => (
                  <li key={category.id}>
                    <a href="#" className={`text-sm ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                      {category.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className={`font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
              </h4>
              <div className="space-y-2">
                <div className={`flex items-center gap-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  <Mail className="w-4 h-4" />
                  info@mystore.com
                </div>
                <div className={`flex items-center gap-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  <Phone className="w-4 h-4" />
                  +1 234 567 890
                </div>
                <div className={`flex items-center gap-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  <MapPin className="w-4 h-4" />
                  New York, USA
                </div>
              </div>
            </div>
          </div>

          <div className={`mt-8 pt-8 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} text-center`}>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              © 2024 {language === 'ar' ? 'متجري' : 'MyStore'}. {language === 'ar' ? 'جميع الحقوق محفوظة' : 'All rights reserved'}.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StoreDemo;
