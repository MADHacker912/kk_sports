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
  const headingWordsRef = useRef<HTMLSpanElement[]>([]);

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
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Headline Mask Reveal
      if (headingWordsRef.current.length > 0) {
        gsap.fromTo(
          headingWordsRef.current,
          { yPercent: 120, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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
        duration: 0.45,
        stagger: 0.05,
        ease: 'power2.out',
        overwrite: 'auto',
      }
    );
  }, [activeCategory]);

  const titleWords = ['Featured', 'Equipment', 'Catalogue'];

  return (
    <section
      id="featured-collection"
      ref={sectionRef}
      className="w-full bg-[#FAF9F5] py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#E2DFD6] transition-colors duration-700"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Section Header with Text Mask Reveal */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E2DFD6] pb-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#52634B] mb-2 block font-semibold">
              CATALOGUE ARCHIVE // VERIFIED STOCK
            </span>
            <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#272923] flex flex-wrap gap-x-3">
              {titleWords.map((word, idx) => (
                <span key={idx} className="inline-block overflow-hidden py-1">
                  <span
                    ref={(el) => { if (el) headingWordsRef.current[idx] = el; }}
                    className="inline-block"
                  >
                    {word}
                  </span>
                </span>
              ))}
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

        {/* Product Cards Grid with Alternate Image Swap and Gentle Hover Lift */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const inquiryUrl = getProductInquiryUrl(product.name);

            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="product-card-item group bg-[#FFFFFF] rounded-2xl border border-[#E2DFD6] hover:border-[#52634B] transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer shadow-[0_2px_12px_rgba(39,41,35,0.03)] hover:shadow-[0_16px_36px_rgba(39,41,35,0.09)] hover:-translate-y-1.5 will-change-transform"
              >
                {/* Product Stage with Alternate Angle Swap on Hover */}
                <div className="relative aspect-square w-full bg-gradient-to-b from-[#F7F5EE] to-[#EFECE4] p-8 flex items-center justify-center overflow-hidden border-b border-[#E5E2DA]">
                  {/* Subtle Radial Glow */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.85)_0%,transparent_70%)] pointer-events-none" />

                  {/* Primary Product Image */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className={`max-h-full max-w-full object-contain filter contrast-[1.03] drop-shadow-[0_8px_14px_rgba(39,41,35,0.12)] group-hover:scale-106 transition-all duration-500 relative z-10 ${
                      product.hoverImage ? 'group-hover:opacity-0' : ''
                    }`}
                    loading="lazy"
                  />

                  {/* Alternate Hover Image Swap (if available) */}
                  {product.hoverImage && (
                    <img
                      src={product.hoverImage}
                      alt={`${product.name} alternate view`}
                      className="absolute inset-0 w-full h-full object-cover filter contrast-[1.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-15"
                      loading="lazy"
                    />
                  )}

                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-3 left-3 z-20">
                      <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-white/95 text-[#52634B] border border-[#E2DFD6] font-semibold shadow-xs">
                        {product.badge}
                      </span>
                    </div>
                  )}

                  {/* Hover Open Cue */}
                  <div className="absolute bottom-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-y-0 translate-y-1">
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
                    <h3 className="font-headline text-base font-bold text-[#272923] group-hover:text-[#52634B] transition-colors leading-snug">
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
                      className="px-3 py-1.5 rounded-lg bg-[#F1EFE8] hover:bg-[#52634B] hover:text-white border border-[#DDD8CC] text-xs font-body text-[#272923] transition-colors flex items-center gap-1.5 active:scale-95"
                      title="Direct WhatsApp Inquiry"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-[#52634B] group-hover:text-white" />
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
