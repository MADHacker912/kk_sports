import React, { useState } from 'react';
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
    <div className="min-h-screen bg-[#F8F7F3] text-[#272923] flex flex-col relative selection:bg-[#52634B] selection:text-white">
      {/* 1. Minimal Premium Navigation */}
      <Navigation onOpenSearch={() => setSearchModalOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-1 w-full flex flex-col">
        {/* 2. Editorial Hero Section */}
        <HeroSection />

        {/* 3. Brand Introduction with Image Expansion & Split Screen */}
        <BrandIntroduction />

        {/* 4. Sports Categories Stacked Cards */}
        <SportsCategories onSelectCategory={handleSelectCategory} />

        {/* 5. Scroll-Controlled Horizontal Equipment Gallery */}
        <HorizontalEquipmentGallery onSelectProduct={setSelectedProduct} />

        {/* 6. Featured Products with Hover Swap & Interactions */}
        <ProductCatalogue
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          onSelectProduct={setSelectedProduct}
        />

        {/* 7. Signature Sticky Storytelling & 360 Atelier */}
        <AeroStrike360Viewer />

        {/* 8. Store Location & Contact */}
        <KanpurFlagshipStore />
      </main>

      {/* 9. Grounded Minimal Footer */}
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
