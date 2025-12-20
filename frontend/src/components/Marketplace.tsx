
"use client";

import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Header from './layout/Header';
import Footer from './layout/Footer';
import MobileBottomNav from './layout/MobileBottomNav';
import HomePage from './pages/HomePage';
import { MarketplaceProvider } from '../context/MarketplaceContext';

// Listings
const RestaurantListing = dynamic(() => import('./listings/RestaurantListing'), { ssr: false });
const RealEstateListing = dynamic(() => import('./listings/RealEstateListing'), { ssr: false });
const CarListing = dynamic(() => import('./listings/CarListing'), { ssr: false });
const ShoppingListing = dynamic(() => import('./listings/ShoppingListing'), { ssr: false });
const ServiceListing = dynamic(() => import('./listings/ServiceListing'), { ssr: false });
const HealthBeautyListing = dynamic(() => import('./listings/HealthBeautyListing'), { ssr: false });
const EventListing = dynamic(() => import('./listings/EventListing'), { ssr: false });

const UserProfileView = dynamic(() => import('./views/ProfileView'), { ssr: false });
const CartView = dynamic(() => import('./views/CartView'), { ssr: false });
const CheckoutView = dynamic(() => import('./views/consumer/CheckoutView'), { ssr: false });
const FavoritesView = dynamic(() => import('./views/FavoritesView'), { ssr: false });
const NotificationsView = dynamic(() => import('./views/consumer/NotificationsView'), { ssr: false });
const SearchResultsView = dynamic(() => import('./views/SearchResultsView'), { ssr: false });
const OrderTrackingView = dynamic(() => import('./views/OrderTrackingView'), { ssr: false });
const OffersView = dynamic(() => import('./views/consumer/OffersView'), { ssr: false }); 
 
const GeminiAssistant = dynamic(() => import('./common/GeminiAssistant'), { ssr: false });
const AuthModal = dynamic(() => import('./common/AuthModal'), { ssr: false });
const SystemsHubWorldwide = dynamic(() => import('./systems/SystemsHubWorldwide'), { ssr: false });
const SystemActivitySelector = dynamic(() => import('./systems/SystemActivitySelector'), { ssr: false });
const MerchantPublicView = dynamic(() => import('./views/MerchantPublicView'), { ssr: false });

const CategoriesPage = dynamic(() => import('../app/categories/page'), { ssr: false });
const BlogPage = dynamic(() => import('../app/blog/page'), { ssr: false });
const JobsPage = dynamic(() => import('../app/jobs/page'), { ssr: false });
const LoginPage = dynamic(() => import('../app/login/page'), { ssr: false });
const SignupPage = dynamic(() => import('../app/signup/page'), { ssr: false });

const AboutView = dynamic(() => import('./views/AboutView'), { ssr: false });
const ContactView = dynamic(() => import('./views/ContactView'), { ssr: false });
const HelpCenterView = dynamic(() => import('./views/HelpCenterView'), { ssr: false });
const LegalView = dynamic(() => import('./views/LegalView'), { ssr: false });

interface MarketplaceProps {
  onGoToSystems: () => void;
  onProductClick?: (id: string) => void;
}

const Marketplace: React.FC<MarketplaceProps> = ({ onGoToSystems, onProductClick }) => {
  const router = useRouter();
  // Navigation States
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedMerchant, setSelectedMerchant] = useState<any | null>(null);
  const [currentView, setCurrentView] = useState<string>('offers'); 
  const [viewParams, setViewParams] = useState<any>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [showWorldwideSystems, setShowWorldwideSystems] = useState(false);
  const [selectedSystem, setSelectedSystem] = useState<string | null>(null);

  useEffect(() => {
    const prefetch = () => {
      try {
        router.prefetch('/favorites');
        router.prefetch('/notifications');
        router.prefetch('/profile');
        router.prefetch('/cart');
        router.prefetch('/jobs');
        router.prefetch('/blog');
        router.prefetch('/help');
        router.prefetch('/about');
      } catch {
      }
    };

    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      (window as any).requestIdleCallback(prefetch);
      return;
    }

    const t = setTimeout(prefetch, 800);
    return () => clearTimeout(t);
  }, [router]);

  const handleCategorySelect = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedMerchant(null);
    setCurrentView('category_listing');
    window.scrollTo(0, 0);
  }, []);

  const handleMerchantSelect = useCallback((merchantData: any) => {
    setSelectedMerchant(merchantData);
    window.scrollTo(0, 0);
  }, []);
  
  const handleProductSelect = useCallback((id: string) => {
    if (onProductClick) {
        onProductClick(id);
    } else {
        // Fallback
        router.push(`/product/${id}`);
    }
  }, [onProductClick, router]);

  const goHome = useCallback(() => {
    setSelectedCategory(null);
    setSelectedMerchant(null);
    setCurrentView('offers'); // Reset to Offers page
    setViewParams(null);
    setShowWorldwideSystems(false);
    setSelectedSystem(null);
    window.scrollTo(0, 0);
  }, []);

  const handleNavigate = useCallback((view: string, params?: any) => {
    if (view === 'systems') {
        setShowWorldwideSystems(true);
        return;
    }
    
    if (view === 'systems-local') {
        onGoToSystems();
        return;
    }
    
    // Handle navigation to actual pages
    if (view === 'favorites') {
        router.push('/favorites');
        return;
    }
    
    if (view === 'notifications') {
        router.push('/notifications');
        return;
    }
    
    if (view === 'profile') {
        router.push('/profile');
        return;
    }
    
    if (view === 'cart') {
        router.push('/cart');
        return;
    }
    
    if (view === 'jobs') {
        router.push('/jobs');
        return;
    }
    
    if (view === 'business-jobs') {
        router.push('/business-jobs');
        return;
    }
    
    if (view === 'about') {
        router.push('/about');
        return;
    }
    
    if (view === 'help') {
        router.push('/help');
        return;
    }
    
    if (view === 'terms') {
        router.push('/terms');
        return;
    }
    
    if (view === 'privacy') {
        router.push('/privacy');
        return;
    }
    
    if (view === 'blog') {
        router.push('/blog');
        return;
    }
    
    setCurrentView(view);
    if (params) setViewParams(params);
    
    if (!['search', 'order-tracking', 'checkout', 'merchant'].includes(view)) {
        setSelectedCategory(null);
        setSelectedMerchant(null);
    }
    window.scrollTo(0, 0);
  }, [onGoToSystems, router]);

  const renderListing = () => {
    switch (selectedCategory) {
      case 'food': return <RestaurantListing onMerchantSelect={handleMerchantSelect} />;
      case 'realestate': return <RealEstateListing onMerchantSelect={handleMerchantSelect} />;
      case 'cars': return <CarListing onMerchantSelect={handleMerchantSelect} />;
      case 'shopping': return <ShoppingListing onMerchantSelect={handleMerchantSelect} onProductClick={handleProductSelect} />;
      case 'services': return <ServiceListing onMerchantSelect={handleMerchantSelect} />;
      case 'beauty': return <HealthBeautyListing category="beauty" onMerchantSelect={handleMerchantSelect} />;
      case 'health': return <HealthBeautyListing category="health" onMerchantSelect={handleMerchantSelect} />;
      case 'education': return <EventListing category="education" onMerchantSelect={handleMerchantSelect} />;
      case 'entertainment': return <EventListing category="entertainment" onMerchantSelect={handleMerchantSelect} />;
      default: return <RestaurantListing onMerchantSelect={handleMerchantSelect} title="المحلات والخدمات" />;
    }
  };

  const renderCurrentView = () => {
    switch(currentView) {
      case 'home': 
      case 'offers': return <OffersView onNavigate={handleNavigate} onProductClick={handleProductSelect} />;
      
      case 'profile': return <UserProfileView onNavigate={handleNavigate} />;
      case 'cart': return <CartView onNavigate={handleNavigate} />;
      case 'checkout': return <CheckoutView onBack={() => handleNavigate('cart')} onComplete={(id) => handleNavigate('order-tracking', {id})} />;
      case 'favorites': return <FavoritesView />;
      case 'notifications': return <NotificationsView />;
      case 'search': return <SearchResultsView query={viewParams?.q} />;
      case 'order-tracking': return <OrderTrackingView onBack={() => handleNavigate('profile')} />;
      
      // New Pages
      case 'categories': return <CategoriesPage />;
      case 'blog': return <BlogPage />;
      case 'jobs': return <JobsPage />;
      case 'login': return <LoginPage />;
      case 'signup': return <SignupPage />;

      // Static Pages
      case 'about': return <AboutView />;
      case 'contact': return <ContactView />;
      case 'help': return <HelpCenterView onNavigate={handleNavigate} />;
      case 'terms': return <LegalView type="terms" onBack={() => handleNavigate('home')} />;
      case 'privacy': return <LegalView type="privacy" onBack={() => handleNavigate('home')} />;
      
      case 'category_listing': return renderListing();

      default: return <OffersView onNavigate={handleNavigate} onProductClick={handleProductSelect} />;
    }
  };

  const handleSystemSelect = (systemId: string) => {
    setSelectedSystem(systemId);
  };

  const handleBackToMarketplace = () => {
    setShowWorldwideSystems(false);
    setSelectedSystem(null);
  };

  const MainContent = () => (
    <>
        {showWorldwideSystems ? (
            <div className="min-h-screen font-sans dir-rtl">
                {selectedSystem ? (
                    <SystemActivitySelector 
                        systemId={selectedSystem} 
                        onBack={() => setSelectedSystem(null)} 
                    />
                ) : (
                    <SystemsHubWorldwide 
                        onSystemSelect={handleSystemSelect} 
                        onBackToMarketplace={handleBackToMarketplace} 
                    />
                )}
                <GeminiAssistant context="merchant" />
            </div>
        ) : selectedMerchant ? (
        <div className="min-h-screen bg-white dark:bg-gray-900 font-sans text-ray-black dark:text-white dir-rtl">
            <MerchantPublicView 
            merchant={selectedMerchant} 
            onBack={() => setSelectedMerchant(null)} 
            />
            <GeminiAssistant context="customer" />
        </div>
        ) : (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans text-ray-black dark:text-white dir-rtl transition-colors pb-20 md:pb-0">
            <Header 
                goHome={goHome} 
                activeSystem={null}
                onCategorySelect={handleCategorySelect}
                onNavigate={handleNavigate}
                onAuth={() => setIsAuthOpen(true)}
            />

            {currentView === 'offers' && !selectedCategory && (
                <HomePage onProductClick={handleProductSelect} onNavigate={handleNavigate} />
            )}

            {renderCurrentView()}

            <Footer 
                onGoToSystems={() => setShowWorldwideSystems(true)} 
                onNavigate={handleNavigate}
            />
            
            <MobileBottomNav 
                currentView={currentView} 
                onNavigate={handleNavigate}
            />

            <GeminiAssistant context="customer" />
            <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
        </div>
        )}
    </>
  );

  return (
    <MarketplaceProvider>
      <MainContent />
    </MarketplaceProvider>
  );
};

export default Marketplace;
