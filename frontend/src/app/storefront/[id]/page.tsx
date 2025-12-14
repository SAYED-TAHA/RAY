'use client';

import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';

interface StorefrontConfig {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  headerColor: string;
  headerTextColor: string;
  footerColor: string;
  footerTextColor: string;
  bannerType: 'image' | 'video';
  bannerImage: string;
  bannerVideo: string;
  bannerHeight: number;
  showHeaderPhone: boolean;
  showHeaderWhatsapp: boolean;
  showHeaderEmail: boolean;
  showHeaderSearch: boolean;
  showHeaderCart: boolean;
  showFooterPhone: boolean;
  showFooterWhatsapp: boolean;
  showFooterEmail: boolean;
  showFooterAddress: boolean;
  showFooterSocial: boolean;
  showContactPhone: boolean;
  showContactWhatsapp: boolean;
  showContactEmail: boolean;
  showHero: boolean;
  showGallery: boolean;
  showMenu: boolean;
  showProducts: boolean;
  showReviews: boolean;
  showBookings: boolean;
  showMap: boolean;
}

const defaultConfig: StorefrontConfig = {
  primaryColor: '#FF6B6B',
  secondaryColor: '#4ECDC4',
  accentColor: '#FFE66D',
  backgroundColor: '#FFFFFF',
  textColor: '#333333',
  headerColor: '#FFFFFF',
  headerTextColor: '#333333',
  footerColor: '#1F2937',
  footerTextColor: '#FFFFFF',
  bannerType: 'image',
  bannerImage: 'https://via.placeholder.com/1200x400',
  bannerVideo: '',
  bannerHeight: 400,
  showHeaderPhone: true,
  showHeaderWhatsapp: true,
  showHeaderEmail: false,
  showHeaderSearch: true,
  showHeaderCart: true,
  showFooterPhone: true,
  showFooterWhatsapp: true,
  showFooterEmail: true,
  showFooterAddress: true,
  showFooterSocial: true,
  showContactPhone: true,
  showContactWhatsapp: true,
  showContactEmail: true,
  showHero: true,
  showGallery: true,
  showMenu: true,
  showProducts: true,
  showReviews: true,
  showBookings: true,
  showMap: true,
};

export default function StorefrontDisplayPage({ params }: { params: { id: string } }) {
  const [config, setConfig] = useState<StorefrontConfig>(defaultConfig);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(`storefront-${params.id}`);
    if (saved) {
      try {
        setConfig(JSON.parse(saved));
      } catch (e) {
        setConfig(defaultConfig);
      }
    }
  }, [params.id]);

  if (!mounted) return null;

  return (
    <div style={{ backgroundColor: config.backgroundColor, color: config.textColor }} className="min-h-screen">
      {/* Header */}
      <header style={{ backgroundColor: config.headerColor, color: config.headerTextColor }} className="sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg" style={{ backgroundColor: config.primaryColor }}></div>
            <h1 className="text-2xl font-bold">متجري</h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {config.showHeaderSearch && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ backgroundColor: config.accentColor }}>
                <Search className="w-4 h-4" />
                <input type="text" placeholder="بحث..." className="bg-transparent outline-none text-sm" />
              </div>
            )}
            <div className="flex items-center gap-4">
              {config.showHeaderPhone && (
                <button className="p-2 hover:opacity-70 transition">
                  📞
                </button>
              )}
              {config.showHeaderWhatsapp && (
                <button className="p-2 hover:opacity-70 transition">
                  💬
                </button>
              )}
              {config.showHeaderEmail && (
                <button className="p-2 hover:opacity-70 transition">
                  ✉️
                </button>
              )}
              {config.showHeaderCart && (
                <button className="p-2 hover:opacity-70 transition">
                  <ShoppingCart className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t p-4 space-y-3">
            {config.showHeaderSearch && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ backgroundColor: config.accentColor }}>
                <Search className="w-4 h-4" />
                <input type="text" placeholder="بحث..." className="bg-transparent outline-none text-sm flex-1" />
              </div>
            )}
            <div className="flex gap-2">
              {config.showHeaderPhone && <button className="flex-1 p-2 rounded-lg" style={{ backgroundColor: config.primaryColor, color: 'white' }}>📞</button>}
              {config.showHeaderWhatsapp && <button className="flex-1 p-2 rounded-lg" style={{ backgroundColor: config.primaryColor, color: 'white' }}>💬</button>}
              {config.showHeaderCart && <button className="flex-1 p-2 rounded-lg" style={{ backgroundColor: config.primaryColor, color: 'white' }}>🛒</button>}
            </div>
          </div>
        )}
      </header>

      {/* Banner/Hero */}
      {config.showHero && (
        <div style={{ height: `${config.bannerHeight}px`, backgroundColor: config.primaryColor }} className="w-full flex items-center justify-center text-white font-bold text-2xl overflow-hidden">
          {config.bannerType === 'image' ? (
            <img src={config.bannerImage} alt="Banner" className="w-full h-full object-cover" onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }} />
          ) : (
            <div className="w-full h-full" style={{ backgroundImage: `linear-gradient(135deg, ${config.primaryColor}, ${config.secondaryColor})` }}></div>
          )}
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Menu Section */}
          {config.showMenu && (
            <div className="p-6 rounded-xl shadow-lg" style={{ backgroundColor: config.backgroundColor, borderLeft: `4px solid ${config.primaryColor}` }}>
              <h2 className="text-xl font-bold mb-4" style={{ color: config.primaryColor }}>📋 القائمة</h2>
              <div className="space-y-2">
                {['الطلبات', 'الحجوزات', 'الخدمات', 'المنتجات'].map((item, i) => (
                  <div key={i} className="p-3 rounded-lg" style={{ backgroundColor: config.accentColor, opacity: 0.7 }}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Products Section */}
          {config.showProducts && (
            <div className="p-6 rounded-xl shadow-lg" style={{ backgroundColor: config.backgroundColor, borderLeft: `4px solid ${config.secondaryColor}` }}>
              <h2 className="text-xl font-bold mb-4" style={{ color: config.secondaryColor }}>🛍️ المنتجات</h2>
              <div className="space-y-3">
                {['منتج 1', 'منتج 2', 'منتج 3'].map((item, i) => (
                  <div key={i} className="p-3 rounded-lg" style={{ backgroundColor: config.accentColor, opacity: 0.7 }}>
                    <div className="font-semibold">{item}</div>
                    <div className="text-sm opacity-75">السعر: 99 ج.م</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gallery Section */}
          {config.showGallery && (
            <div className="p-6 rounded-xl shadow-lg" style={{ backgroundColor: config.backgroundColor, borderLeft: `4px solid ${config.accentColor}` }}>
              <h2 className="text-xl font-bold mb-4" style={{ color: config.accentColor }}>📸 المعرض</h2>
              <div className="grid grid-cols-2 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-square rounded-lg" style={{ backgroundColor: config.primaryColor, opacity: 0.3 }}></div>
                ))}
              </div>
            </div>
          )}

          {/* Reviews Section */}
          {config.showReviews && (
            <div className="p-6 rounded-xl shadow-lg" style={{ backgroundColor: config.backgroundColor, borderLeft: `4px solid ${config.primaryColor}` }}>
              <h2 className="text-xl font-bold mb-4" style={{ color: config.primaryColor }}>⭐ التقييمات</h2>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-3 rounded-lg" style={{ backgroundColor: config.accentColor, opacity: 0.7 }}>
                    <div className="font-semibold">⭐⭐⭐⭐⭐</div>
                    <div className="text-sm">تقييم رائع جداً</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bookings Section */}
          {config.showBookings && (
            <div className="p-6 rounded-xl shadow-lg" style={{ backgroundColor: config.backgroundColor, borderLeft: `4px solid ${config.secondaryColor}` }}>
              <h2 className="text-xl font-bold mb-4" style={{ color: config.secondaryColor }}>📅 احجز الآن</h2>
              <button className="w-full py-3 rounded-lg font-bold text-white transition hover:opacity-90" style={{ backgroundColor: config.primaryColor }}>
                احجز موعد
              </button>
              <div className="mt-4 text-sm opacity-75">
                <div>الساعات: 9 ص - 6 م</div>
                <div>الأيام: السبت - الخميس</div>
              </div>
            </div>
          )}

          {/* Map Section */}
          {config.showMap && (
            <div className="p-6 rounded-xl shadow-lg" style={{ backgroundColor: config.backgroundColor, borderLeft: `4px solid ${config.accentColor}` }}>
              <h2 className="text-xl font-bold mb-4" style={{ color: config.accentColor }}>🗺️ موقعنا</h2>
              <div className="w-full h-40 rounded-lg flex items-center justify-center" style={{ backgroundColor: config.primaryColor, opacity: 0.2 }}>
                <span>خريطة</span>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Contact Buttons - Floating */}
      <div className="fixed bottom-6 left-6 flex flex-col gap-3 z-40">
        {config.showContactWhatsapp && (
          <button className="w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl shadow-lg hover:scale-110 transition" style={{ backgroundColor: '#25D366' }}>
            💬
          </button>
        )}
        {config.showContactPhone && (
          <button className="w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl shadow-lg hover:scale-110 transition" style={{ backgroundColor: config.primaryColor }}>
            📞
          </button>
        )}
        {config.showContactEmail && (
          <button className="w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl shadow-lg hover:scale-110 transition" style={{ backgroundColor: config.secondaryColor }}>
            ✉️
          </button>
        )}
      </div>

      {/* Footer */}
      <footer style={{ backgroundColor: config.footerColor, color: config.footerTextColor }} className="mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* About */}
            <div>
              <h3 className="font-bold text-lg mb-4">عن المتجر</h3>
              <p className="opacity-75">متجر إلكتروني احترافي يقدم أفضل الخدمات والمنتجات</p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-lg mb-4">روابط سريعة</h3>
              <div className="space-y-2 opacity-75">
                <div>الرئيسية</div>
                <div>المنتجات</div>
                <div>الخدمات</div>
                <div>التواصل</div>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-bold text-lg mb-4">تواصل معنا</h3>
              <div className="space-y-2 opacity-75">
                {config.showFooterPhone && <div className="flex items-center gap-2">📞 +20 123 456 7890</div>}
                {config.showFooterWhatsapp && <div className="flex items-center gap-2">💬 واتساب</div>}
                {config.showFooterEmail && <div className="flex items-center gap-2">✉️ info@store.com</div>}
                {config.showFooterAddress && <div className="flex items-center gap-2">📍 القاهرة، مصر</div>}
              </div>
            </div>
          </div>

          {/* Social Links */}
          {config.showFooterSocial && (
            <div className="flex justify-center gap-4 mb-6 pb-6 border-t border-gray-600">
              <button className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-75 transition" style={{ backgroundColor: config.primaryColor }}>
                f
              </button>
              <button className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-75 transition" style={{ backgroundColor: config.secondaryColor }}>
                📷
              </button>
              <button className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-75 transition" style={{ backgroundColor: config.accentColor }}>
                𝕏
              </button>
            </div>
          )}

          {/* Copyright */}
          <div className="text-center opacity-50 text-sm">
            © 2025 جميع الحقوق محفوظة
          </div>
        </div>
      </footer>
    </div>
  );
}
