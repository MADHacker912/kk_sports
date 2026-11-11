import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { BrandIntroduction } from './components/BrandIntroduction';
import { SportsCategories } from './components/SportsCategories';
import { HorizontalEquipmentGallery } from './components/HorizontalEquipmentGallery';
import { ProductCatalogue } from './components/ProductCatalogue';
import { AeroStrike360Viewer } from './components/AeroStrike360Viewer';
import { KanpurFlagshipStore } from './components/KanpurFlagshipStore';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ProductDetailModal } from './components/ProductDetailModal';
import { QuickSearchModal } from './components/QuickSearchModal';

// Custom Pages
import { NotFoundPage } from './pages/NotFoundPage';
import { AboutPage } from './pages/AboutPage';
import { AtelierPage } from './pages/AtelierPage';
import { InstitutionalPage } from './pages/InstitutionalPage';
import { ContactPage } from './pages/ContactPage';
import { AuthenticityPage } from './pages/AuthenticityPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';

import { useRouter, normalizePath } from './utils/router';
import { Product, ProductCategory } from './types';

export const App: React.FC = () => {
  const { currentPath, navigate } = useRouter();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all');
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // Handle hash scrolling if navigating to home section anchors
  useEffect(() => {
    if (window.location.hash) {
      const hashId = window.location.hash.substring(1);
      const element = document.getElementById(hashId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      }
    }
  }, [currentPath]);

  const handleSelectCategory = (cat: ProductCategory) => {
    setActiveCategory(cat);
    if (currentPath !== '/') {
      navigate('/#featured-collection');
      return;
    }
    const element = document.getElementById('featured-collection');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollTo360 = () => {
    if (currentPath !== '/') {
      navigate('/#signature-atelier');
      return;
    }
    const element = document.getElementById('signature-atelier');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Route Resolver
  const renderCurrentView = () => {
    switch (normalizePath(currentPath)) {
      case '/':
        return (
          <>
            {/* 1. Editorial Hero Section */}
            <HeroSection />

            {/* 2. Brand Introduction with Image Expansion & Split Screen */}
            <BrandIntroduction />

            {/* 3. Sports Categories Stacked Cards */}
            <SportsCategories onSelectCategory={handleSelectCategory} />

            {/* 4. Scroll-Controlled Horizontal Equipment Gallery */}
            <HorizontalEquipmentGallery onSelectProduct={setSelectedProduct} />

            {/* 5. Featured Products with Hover Swap & Interactions */}
            <ProductCatalogue
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              onSelectProduct={setSelectedProduct}
            />

            {/* 6. Signature Sticky Storytelling & 360 Atelier */}
            <AeroStrike360Viewer />

            {/* 7. Store Location & Contact */}
            <KanpurFlagshipStore />
          </>
        );

      case '/about':
        return <AboutPage />;

      case '/atelier':
        return <AtelierPage />;

      case '/institutional':
        return <InstitutionalPage />;

      case '/contact':
        return <ContactPage />;

      case '/authenticity':
        return <AuthenticityPage />;

      case '/privacy':
        return <PrivacyPage />;

      case '/terms':
        return <TermsPage />;

      case '/404':
      default:
        // Any unknown URL renders the custom 404 page
        return <NotFoundPage onOpenSearch={() => setSearchModalOpen(true)} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F7F3] text-[#272923] flex flex-col relative selection:bg-[#52634B] selection:text-white">
      {/* 1. Minimal Premium Navigation */}
      <Navigation onOpenSearch={() => setSearchModalOpen(true)} />

      {/* Main Dynamic Content Area */}
      <main className="flex-1 w-full flex flex-col">
        {renderCurrentView()}
      </main>

      {/* 2. Grounded Minimal Footer */}
      <Footer />

      {/* Subtle Floating WhatsApp Trigger */}
      <FloatingWhatsApp />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onOpen360={handleScrollTo360}
      />

      {/* Quick Search Modal */}
      <QuickSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectProduct={setSelectedProduct}
      />
    </div>
  );
};

export default App;
