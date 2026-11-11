import React from 'react';
import { PRODUCTS } from '../data/sportsData';
import { Product, ProductCategory } from '../types';
import { getProductInquiryUrl } from '../utils/whatsapp';
import { MessageSquare, Eye, Sparkles, ArrowRight } from 'lucide-react';

interface ProductCatalogueProps {
  activeCategory: ProductCategory;
  onCategoryChange: (cat: ProductCategory) => void;
  onSelectProduct: (product: Product) => void;
  onOpen360: () => void;
}

export const ProductCatalogue: React.FC<ProductCatalogueProps> = ({
  activeCategory,
  onCategoryChange,
  onSelectProduct,
  onOpen360,
}) => {
  const categoriesList: { id: ProductCategory; label: string }[] = [
    { id: 'all', label: 'ALL GEAR' },
    { id: 'cricket', label: 'CRICKET' },
    { id: 'football', label: 'FOOTBALL' },
    { id: 'badminton', label: 'BADMINTON' },
    { id: 'fitness', label: 'FITNESS' },
    { id: 'indoor', label: 'INDOOR GAMES' },
    { id: 'toys', label: 'TOYS & REC' },
  ];

  const filteredProducts = activeCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <section
      id="featured-collection"
      className="w-full bg-surface py-space-xl lg:py-28 px-space-md lg:px-space-xl border-b border-cold-border"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-space-lg">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md border-b border-cold-border pb-space-lg">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-accent-lime" />
              <span className="font-headline text-[10px] uppercase tracking-[0.25em] text-accent-lime">
                [ CATALOGUE ARCHIVE 04 ]
              </span>
            </div>
            <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl uppercase text-white font-bold tracking-tight">
              FEATURED PERFORMANCE GEAR
            </h2>
          </div>
          <p className="font-body text-sm sm:text-base text-on-surface-variant max-w-md leading-relaxed">
            Curated equipment from premier world championships. Available for individual retail purchase, custom club knocking, or bulk institutional delivery.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
          {categoriesList.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onCategoryChange(cat.id)}
                className={`px-4 py-2 rounded font-headline text-xs uppercase tracking-wider whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-accent-lime text-black border-accent-lime font-bold shadow-[0_0_15px_rgba(198,255,53,0.25)]'
                    : 'bg-surface-container hover:bg-surface-bright text-on-surface-variant hover:text-white border-cold-border'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
          {filteredProducts.map((product) => {
            const inquiryUrl = getProductInquiryUrl(product.name);

            return (
              <div
                key={product.id}
                className="group bg-surface-container-low rounded border border-cold-border hover:border-accent-lime transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg"
              >
                {/* Media Presentation */}
                <div className="relative aspect-square w-full bg-surface-container/60 p-6 flex items-center justify-center overflow-hidden border-b border-cold-border">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-[85%] max-w-[85%] object-contain filter contrast-105 group-hover:scale-108 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
                    {product.badge && (
                      <span className="bg-surface-container-lowest/90 border border-accent-lime/40 text-accent-lime font-headline text-[9px] uppercase tracking-wider px-2 py-0.5 rounded font-bold">
                        {product.badge}
                      </span>
                    )}
                    {product.isFlagship360 && (
                      <span className="bg-accent-lime text-black font-headline text-[9px] uppercase tracking-wider px-2 py-0.5 rounded font-bold flex items-center gap-1 shadow-[0_0_10px_rgba(198,255,53,0.3)]">
                        <Sparkles className="w-2.5 h-2.5" /> 360° VIEW
                      </span>
                    )}
                  </div>

                  {/* Quick hover action button overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                    <button
                      onClick={() => onSelectProduct(product)}
                      className="px-4 py-2 rounded bg-white text-black font-headline text-xs uppercase tracking-wider font-bold shadow-xl hover:bg-accent-lime transition-colors flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>VIEW SPECS</span>
                    </button>
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-space-md flex-1 flex flex-col justify-between gap-3">
                  <div>
                    <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider block mb-1">
                      {product.categoryLabel}
                    </span>
                    <h3 className="font-headline text-base uppercase text-white font-bold tracking-tight line-clamp-1 group-hover:text-accent-lime transition-colors">
                      {product.name}
                    </h3>
                    <p className="font-body text-xs text-on-surface-variant line-clamp-2 mt-1 leading-relaxed">
                      {product.shortDesc}
                    </p>
                  </div>

                  {/* Primary Spec Highlights */}
                  <div className="pt-2 border-t border-cold-border/60 flex items-center justify-between text-xs">
                    <span className="font-mono text-[11px] text-accent-lime font-semibold">
                      {product.priceDisplay || 'Inquire Price'}
                    </span>
                    <span className="font-mono text-[10px] text-on-surface-variant uppercase">
                      IN STOCK
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => onSelectProduct(product)}
                      className="py-2 px-2.5 rounded bg-surface-container hover:bg-surface-bright text-white font-headline text-[11px] uppercase tracking-wider border border-cold-border hover:border-white transition-colors text-center"
                    >
                      Specs
                    </button>

                    <a
                      href={inquiryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-2.5 rounded bg-accent-lime/15 hover:bg-accent-lime text-accent-lime hover:text-black font-headline text-[11px] uppercase tracking-wider border border-accent-lime/40 font-bold transition-all text-center flex items-center justify-center gap-1"
                      title="Direct WhatsApp Inquiry"
                    >
                      <MessageSquare className="w-3 h-3" />
                      <span>Ask</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Special 360 Spotlight Banner at bottom of catalog */}
        <div className="p-6 rounded bg-gradient-to-r from-surface-container to-surface-container-low border border-cold-border flex flex-col md:flex-row items-center justify-between gap-4 mt-space-md">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded bg-accent-lime/10 border border-accent-lime/40 flex items-center justify-center text-accent-lime shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <span className="font-headline text-xs uppercase tracking-widest text-accent-lime font-bold block">
                INTERACTIVE 3D EQUIPMENT INSPECTOR
              </span>
              <p className="font-headline text-lg uppercase text-white font-bold tracking-tight">
                Inspect The Aero-Strike Pro Cricket Bat in 360° Studio View
              </p>
              <span className="font-body text-xs text-on-surface-variant">
                Full 360 rotation, grain count inspection, edge thickness measurement &amp; laser knocking presets.
              </span>
            </div>
          </div>

          <button
            onClick={onOpen360}
            className="px-6 py-3 rounded bg-accent-lime text-black font-headline text-xs uppercase tracking-wider font-bold whitespace-nowrap hover:brightness-110 shadow-[0_0_20px_rgba(198,255,53,0.25)] flex items-center gap-2 transition-all"
          >
            <span>LAUNCH 360° STUDIO</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
