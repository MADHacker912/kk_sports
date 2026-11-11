import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { BrandIntroduction } from './components/BrandIntroduction';
import { CategoriesBento } from './components/CategoriesBento';
import { ProductCatalogue } from './components/ProductCatalogue';
import { AeroStrike360Viewer } from './components/AeroStrike360Viewer';
import { WhyChooseKK } from './components/WhyChooseKK';
import { KanpurFlagshipStore } from './components/KanpurFlagshipStore';
import { WholesaleBanner } from './components/WholesaleBanner';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ProductDetailModal } from './components/ProductDetailModal';
import { QuickSearchModal } from './components/QuickSearchModal';
import { Product, ProductCategory } from './types';

export const App: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all');
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const handleSelectCategoryFromBento = (cat: ProductCategory) => {
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
    <div className="min-h-screen bg-surface-container-lowest text-on-surface flex flex-col relative selection:bg-accent-lime selection:text-black">
      {/* Top Navbar */}
      <Navigation onOpenSearch={() => setSearchModalOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-1 w-full flex flex-col">
        {/* Section 01: Hero */}
        <HeroSection />

        {/* Section 02: Brand Introduction */}
        <BrandIntroduction />

        {/* Section 03: Shop by Category Bento */}
        <CategoriesBento onSelectCategory={handleSelectCategoryFromBento} />

        {/* Section 04: Featured Products Catalogue */}
        <ProductCatalogue
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          onSelectProduct={setSelectedProduct}
          onOpen360={handleScrollTo360}
        />

        {/* Section 05: 3D Scroll Storytelling / Aero-Strike 360 Viewer */}
        <AeroStrike360Viewer />

        {/* Section 06: Why Choose K.K. Sports */}
        <WhyChooseKK />

        {/* Section 07: Kanpur Flagship Store */}
        <KanpurFlagshipStore />

        {/* Section 08: Wholesale & Institutional Division */}
        <WholesaleBanner />
      </main>

      {/* Section 09: Architectural Footer */}
      <Footer />

      {/* Persistent Floating WhatsApp CTA */}
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
