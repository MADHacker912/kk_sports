import React from 'react';
import { PRODUCTS } from '../data/sportsData';
import { Product, ProductCategory } from '../types';
import { getProductInquiryUrl } from '../utils/whatsapp';
import { MessageSquare, ArrowUpRight } from 'lucide-react';

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
      className="w-full bg-[#08090B] py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#1F2228]"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#1F2228] pb-8">
          <div>
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#C6FF35] mb-2 block font-semibold">
              CATALOGUE ARCHIVE // 05
            </span>
            <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl uppercase text-white font-bold tracking-tight">
              FEATURED PRODUCTS
            </h2>
          </div>
          <p className="font-body text-sm sm:text-base text-[#A1A1AA] max-w-md leading-relaxed">
            Curated equipment from verified manufacturers. Available for retail purchase, custom atelier preparation, and bulk academy orders.
          </p>
        </div>

        {/* Minimal Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categoriesList.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onCategoryChange(cat.id)}
                className={`px-4 py-2 rounded text-xs font-headline uppercase tracking-wider whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-white text-black border-white font-bold'
                    : 'bg-[#121417] hover:bg-[#1A1D23] text-[#A1A1AA] hover:text-white border-[#232730]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Refined Product Grid with Large Photography */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const inquiryUrl = getProductInquiryUrl(product.name);

            return (
              <div
                key={product.id}
                className="group bg-[#101215] rounded border border-[#232730] hover:border-[#A1A1AA] transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
                onClick={() => onSelectProduct(product)}
              >
                {/* Large Clean Product Image Canvas */}
                <div className="relative aspect-square w-full bg-[#15181D] p-8 flex items-center justify-center overflow-hidden border-b border-[#232730]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain filter contrast-105 group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Clean Spec Badge if Flagship */}
                  {product.badge && (
                    <div className="absolute top-3 left-3">
                      <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#08090B]/90 text-[#C6FF35] border border-[#2C3038]">
                        {product.badge}
                      </span>
                    </div>
                  )}

                  {/* Hover detail prompt */}
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shadow-lg">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Card Information */}
                <div className="p-5 flex flex-col justify-between flex-1 gap-4">
                  <div>
                    <span className="font-mono text-[10px] text-[#A1A1AA] uppercase tracking-wider block mb-1">
                      {product.categoryLabel}
                    </span>
                    <h3 className="font-headline text-base uppercase text-white font-bold tracking-tight group-hover:text-[#C6FF35] transition-colors leading-snug">
                      {product.name}
                    </h3>
                    <p className="font-body text-xs text-[#A1A1AA] line-clamp-2 mt-1.5 leading-relaxed">
                      {product.shortDesc}
                    </p>
                  </div>

                  {/* Price & Action Row */}
                  <div className="pt-3 border-t border-[#1F2228] flex items-center justify-between">
                    <span className="font-mono text-xs text-white font-medium">
                      {product.priceDisplay || 'Inquire Price'}
                    </span>

                    <a
                      href={inquiryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="px-3 py-1.5 rounded bg-[#17191D] hover:bg-[#C6FF35] hover:text-black border border-[#2C3038] text-xs font-headline uppercase tracking-wider text-[#A1A1AA] transition-colors flex items-center gap-1.5"
                      title="Direct WhatsApp Inquiry"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-[#C6FF35] group-hover:text-black" />
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
