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
    const element = document.getElementById('signature-atelier');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F7F3] text-[#242720] flex flex-col relative selection:bg-[#66785F] selection:text-white">
      {/* 1. Minimal Premium Navigation */}
      <Navigation onOpenSearch={() => setSearchModalOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-1 w-full flex flex-col">
        {/* 2. Editorial Hero Section */}
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

        {/* 6. Signature Storytelling & 360 Atelier */}
        <AeroStrike360Viewer />

        {/* 7. Store Location & Contact */}
        <KanpurFlagshipStore />
      </main>

      {/* 8. Minimal Footer */}
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
