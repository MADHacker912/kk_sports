import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { BrandIntroduction } from './components/BrandIntroduction';
import { SportsCategories } from './components/SportsCategories';
import { ProductCatalogue } from './components/ProductCatalogue';
import { AeroStrike360Viewer } from './components/AeroStrike360Viewer';
import { KanpurFlagshipStore } from './components/KanpurFlagshipStore';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ProductDetailModal } from './components/ProductDetailModal';
import { QuickSearchModal } from './components/QuickSearchModal';
import { Product, ProductCategory } from './types';

export const App: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all');
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const handleSelectCategory = (cat: ProductCategory) => {
    setActiveCategory(cat);
    const element = document.getElementById('featured-collection');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollTo360 = () => {
    const element = document.getElementById('aero-strike-360');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#08090B] text-[#E3E2E5] flex flex-col relative selection:bg-[#C6FF35] selection:text-black">
      {/* 1. Minimal Premium Navigation */}
      <Navigation onOpenSearch={() => setSearchModalOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-1 w-full flex flex-col">
        {/* 2. Strong Hero Section */}
        <HeroSection />

        {/* 3. Brand Introduction */}
        <BrandIntroduction />

        {/* 4. Sports Categories */}
        <SportsCategories onSelectCategory={handleSelectCategory} />

        {/* 5. Featured Products */}
        <ProductCatalogue
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          onSelectProduct={setSelectedProduct}
        />

        {/* 6. One Signature Visual Storytelling Section (3D & Motion) */}
        <AeroStrike360Viewer />

        {/* 7. Store Location and Contact */}
        <KanpurFlagshipStore />
      </main>

      {/* 8. Minimal Footer */}
      <Footer />

      {/* Discreet Floating WhatsApp Trigger */}
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
