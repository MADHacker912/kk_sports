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

  return (
    <section
      id="featured-collection"
      className="w-full bg-[#F8F7F3] py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#E7E5DE]"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E7E5DE] pb-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#66785F] mb-2 block font-semibold">
              CATALOGUE ARCHIVE
            </span>
            <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#242720]">
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
                    ? 'bg-[#242720] text-white border-[#242720]'
                    : 'bg-[#F0EFE9] hover:bg-[#E7E5DE] text-[#77776F] hover:text-[#242720] border-[#E7E5DE]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Clean White Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const inquiryUrl = getProductInquiryUrl(product.name);

            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="group bg-white rounded-lg border border-[#E7E5DE] hover:border-[#66785F] transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer shadow-sm hover:shadow-md"
              >
                {/* Clean Product Image Stage */}
                <div className="relative aspect-square w-full bg-[#FAFAFA] p-8 flex items-center justify-center overflow-hidden border-b border-[#E7E5DE]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain filter contrast-[1.03] group-hover:scale-104 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Subtle Badge */}
                  {product.badge && (
                    <div className="absolute top-3 left-3">
                      <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#F0EFE9] text-[#66785F] border border-[#E7E5DE] font-semibold">
                        {product.badge}
                      </span>
                    </div>
                  )}

                  {/* Hover Open Cue */}
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-8 h-8 rounded-full bg-[#242720] text-white flex items-center justify-center shadow">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Card Details */}
                <div className="p-5 flex flex-col justify-between flex-1 gap-4">
                  <div>
                    <span className="font-body text-xs text-[#77776F] block mb-1">
                      {product.categoryLabel}
                    </span>
                    <h3 className="font-headline text-base font-bold text-[#242720] group-hover:text-[#66785F] transition-colors leading-snug">
                      {product.name}
                    </h3>
                    <p className="font-body text-xs text-[#77776F] line-clamp-2 mt-1.5 leading-relaxed">
                      {product.shortDesc}
                    </p>
                  </div>

                  {/* Price & Action Row */}
                  <div className="pt-3 border-t border-[#E7E5DE] flex items-center justify-between">
                    <span className="font-body text-xs text-[#242720] font-semibold">
                      {product.priceDisplay || 'Inquire on Spec'}
                    </span>

                    <a
                      href={inquiryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="px-3 py-1.5 rounded bg-[#F0EFE9] hover:bg-[#66785F] hover:text-white border border-[#E7E5DE] text-xs font-body text-[#242720] transition-colors flex items-center gap-1.5"
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
