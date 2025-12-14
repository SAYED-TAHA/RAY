
"use client";

import React, { useState, useEffect } from 'react';
import GeminiAssistant from './common/GeminiAssistant';
import Header from './layout/Header';
import Footer from './layout/Footer';
import MobileBottomNav from './layout/MobileBottomNav';
import HomePage from './pages/HomePage';
import SystemsHubWorldwide from './systems/SystemsHubWorldwide';
import SystemActivitySelector from './systems/SystemActivitySelector';
import SystemLanding from './systems/SystemLanding';
import { MarketplaceProvider } from '../context/MarketplaceContext';
import { ThemeProvider } from '../context/ThemeContext'; 

// Listings
import RestaurantListing from './listings/RestaurantListing';
import RealEstateListing from './listings/RealEstateListing';
import CarListing from './listings/CarListing';
import ShoppingListing from './listings/ShoppingListing';
import ServiceListing from './listings/ServiceListing';
import HealthBeautyListing from './listings/HealthBeautyListing';
import EventListing from './listings/EventListing';

// Views
import MerchantPublicView from './views/MerchantPublicView';
import UserProfileView from './views/ProfileView';
import CartView from './views/CartView';
import CheckoutView from './views/consumer/CheckoutView';
import FavoritesView from './views/FavoritesView';
import NotificationsView from './views/consumer/NotificationsView';
import SearchResultsView from './views/SearchResultsView';
import OrderTrackingView from './views/OrderTrackingView';
import OffersView from './views/consumer/OffersView'; 
import AuthModal from './common/AuthModal';

// Pages (Now as Components)
import CategoriesPage from '../app/categories/page';
import BlogPage from '../app/blog/page';
import JobsPage from '../app/jobs/page';
import LoginPage from '../app/login/page';
import SignupPage from '../app/signup/page';

// Static Views
import AboutView from './views/AboutView';
import ContactView from './views/ContactView';
import HelpCenterView from './views/HelpCenterView';
import LegalView from './views/LegalView';

interface MarketplaceProps {
  onGoToSystems: () => void;
  onProductClick?: (id: string) => void;
}

const Marketplace: React.FC<MarketplaceProps> = ({ onGoToSystems, onProductClick }) => {
  // Navigation States
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedMerchant, setSelectedMerchant] = useState<any | null>(null);
  const [currentView, setCurrentView] = useState<string>('offers'); 
  const [viewParams, setViewParams] = useState<any>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [showWorldwideSystems, setShowWorldwideSystems] = useState(false);
  const [selectedSystem, setSelectedSystem] = useState<string | null>(null);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedMerchant(null);
    setCurrentView('category_listing'); // Helper state to show listing
    window.scrollTo(0, 0);
  };

  const handleMerchantSelect = (merchantData: any) => {
    setSelectedMerchant(merchantData);
    window.scrollTo(0, 0);
  };
  
  const handleProductSelect = (id: string) => {
    if (onProductClick) {
        onProductClick(id);
    } else {
        // Fallback
        window.location.assign(`/product/${id}`);
    }
  };

  const goHome = () => {
    setSelectedCategory(null);
    setSelectedMerchant(null);
    setCurrentView('offers'); // Reset to Offers page
    setViewParams(null);
    setShowWorldwideSystems(false);
    setSelectedSystem(null);
    window.scrollTo(0, 0);
  };

  const handleNavigate = (view: string, params?: any) => {
    console.log('Marketplace handleNavigate:', view, params); // Debug log
    
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
        window.location.href = '/favorites';
        return;
    }
    
    if (view === 'notifications') {
        window.location.href = '/notifications';
        return;
    }
    
    if (view === 'profile') {
        window.location.href = '/profile';
        return;
    }
    
    if (view === 'cart') {
        window.location.href = '/cart';
        return;
    }
    
    if (view === 'jobs') {
        window.location.href = '/jobs';
        return;
    }
    
    if (view === 'business-jobs') {
        window.location.href = '/business-jobs';
        return;
    }
    
    if (view === 'about') {
        window.location.href = '/about';
        return;
    }
    
    if (view === 'help') {
        window.location.href = '/help';
        return;
    }
    
    if (view === 'terms') {
        window.location.href = '/terms';
        return;
    }
    
    if (view === 'privacy') {
        window.location.href = '/privacy';
        return;
    }
    
    if (view === 'blog') {
        window.location.href = '/blog';
        return;
    }
    
    setCurrentView(view);
    if (params) setViewParams(params);
    
    if (!['search', 'order-tracking', 'checkout', 'merchant'].includes(view)) {
        setSelectedCategory(null);
        setSelectedMerchant(null);
    }
    window.scrollTo(0, 0);
  };

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
    <ThemeProvider>
      <MarketplaceProvider>
          <MainContent />
      </MarketplaceProvider>
    </ThemeProvider>
  );
};

export default Marketplace;
