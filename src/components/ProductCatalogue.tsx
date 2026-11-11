import React, { useEffect, useRef } from 'react';
import { PRODUCTS } from '../data/sportsData';
import { Product, ProductCategory } from '../types';
import { getProductInquiryUrl } from '../utils/whatsapp';
import { MessageSquare, ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ProductCatalogueProps {
  activeCategory: ProductCategory;
  onCategoryChange: (cat: ProductCategory) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductCatalogue: React.FC<ProductCatalogueProps> = ({
  activeCategory,
  onCategoryChange,
  onSelectProduct,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const categoriesList: { id: ProductCategory; label: string }[] = [
    { id: 'all', label: 'All Equipment' },
    { id: 'cricket', label: 'Cricket' },
    { id: 'football', label: 'Football' },
    { id: 'badminton', label: 'Badminton' },
    { id: 'fitness', label: 'Fitness' },
    { id: 'indoor', label: 'Indoor Games' },
    { id: 'toys', label: 'Recreation & Toys' },
  ];

  const filteredProducts = activeCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCategory);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !gridRef.current) return;

    const cards = gridRef.current.querySelectorAll('.product-card-item');
    if (!cards.length) return;

    gsap.fromTo(
      cards,
      { opacity: 0, y: 18 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power2.out',
        overwrite: 'auto',
      }
    );
  }, [activeCategory]);

  return (
    <section
      id="featured-collection"
      ref={sectionRef}
      className="w-full bg-[#FAF9F5] py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#E2DFD6]"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E2DFD6] pb-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#66785F] mb-2 block font-semibold">
              CATALOGUE ARCHIVE // VERIFIED STOCK
            </span>
            <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#272923]">
              Featured Products
            </h2>
          </div>
          <p className="font-body text-sm sm:text-base text-[#77776F] max-w-md leading-relaxed">
            Curated athletic equipment with verified authenticity. Available for individual retail selection and institutional academy consignments.
          </p>
        </div>

        {/* Clean Category Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categoriesList.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onCategoryChange(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-headline font-semibold tracking-wider whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-[#272923] text-white border-[#272923] shadow-sm'
                    : 'bg-[#F1EFE8] hover:bg-[#EAE6DC] text-[#77776F] hover:text-[#272923] border-[#E2DFD6]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Product Cards Grid with Soft Warm Product Stages */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const inquiryUrl = getProductInquiryUrl(product.name);

            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="product-card-item group bg-[#FFFFFF] rounded-2xl border border-[#E2DFD6] hover:border-[#66785F] transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer shadow-[0_2px_12px_rgba(39,41,35,0.03)] hover:shadow-[0_8px_24px_rgba(39,41,35,0.08)] will-change-transform"
              >
                {/* Soft Neutral Warm Product Stage with Spotlight Gradient */}
                <div className="relative aspect-square w-full bg-gradient-to-b from-[#F7F5EE] to-[#EFECE4] p-8 flex items-center justify-center overflow-hidden border-b border-[#E5E2DA]">
                  {/* Subtle Radial Glow behind product */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0%,transparent_70%)] pointer-events-none" />

                  {/* Product Visual */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain filter contrast-[1.03] drop-shadow-[0_8px_14px_rgba(39,41,35,0.12)] group-hover:scale-106 transition-transform duration-500 relative z-10"
                    loading="lazy"
                  />

                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-3 left-3 z-20">
                      <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-white/95 text-[#66785F] border border-[#E2DFD6] font-semibold shadow-xs">
                        {product.badge}
                      </span>
                    </div>
                  )}

                  {/* Hover Open Cue */}
                  <div className="absolute bottom-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="w-8 h-8 rounded-full bg-[#272923] text-white flex items-center justify-center shadow-md">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Card Details */}
                <div className="p-5 flex flex-col justify-between flex-1 gap-4 bg-[#FFFFFF]">
                  <div>
                    <span className="font-body text-xs text-[#77776F] block mb-1">
                      {product.categoryLabel}
                    </span>
                    <h3 className="font-headline text-base font-bold text-[#272923] group-hover:text-[#66785F] transition-colors leading-snug">
                      {product.name}
                    </h3>
                    <p className="font-body text-xs text-[#77776F] line-clamp-2 mt-1.5 leading-relaxed">
                      {product.shortDesc}
                    </p>
                  </div>

                  {/* Price & Action Row */}
                  <div className="pt-3 border-t border-[#EAE6DC] flex items-center justify-between">
                    <span className="font-body text-xs text-[#272923] font-semibold">
                      {product.priceDisplay || 'Inquire on Spec'}
                    </span>

                    <a
                      href={inquiryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="px-3 py-1.5 rounded-lg bg-[#F1EFE8] hover:bg-[#66785F] hover:text-white border border-[#DDD8CC] text-xs font-body text-[#272923] transition-colors flex items-center gap-1.5"
                      title="Direct WhatsApp Inquiry"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-[#66785F] group-hover:text-white" />
                      <span>Inquire</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
