import React from 'react';
import { CATEGORIES } from '../data/sportsData';
import { getWhatsAppUrl } from '../utils/whatsapp';
import { ProductCategory } from '../types';
import { ArrowUpRight, MessageSquare } from 'lucide-react';

interface CategoriesBentoProps {
  onSelectCategory: (category: ProductCategory) => void;
}

export const CategoriesBento: React.FC<CategoriesBentoProps> = ({ onSelectCategory }) => {
  return (
    <section
      id="categories-grid"
      className="w-full bg-surface-container-lowest py-space-xl lg:py-28 px-space-md lg:px-space-xl border-b border-cold-border"
    >
      <div className="max-w-7xl mx-auto flex flex-col">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-accent-lime" />
              <span className="font-headline text-[10px] uppercase tracking-[0.25em] text-accent-lime">
                [ SECTOR INVENTORY 03 ]
              </span>
            </div>
            <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl uppercase text-white font-bold tracking-tight">
              ENGINEERED BY DISCIPLINE
            </h2>
          </div>
          <p className="font-body text-sm sm:text-base text-on-surface-variant max-w-md leading-relaxed">
            Explore authentic equipment engineered for competitive athletes, club coaches, school departments, and weekend champions.
          </p>
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
          {CATEGORIES.map((cat, index) => {
            // First item (Football) spans 2 columns on large screen to create the editorial bento feel
            const isLarge = index === 0;

            const categoryInquiryUrl = getWhatsAppUrl(
              `Hello K.K. Sports, I would like to inquire about products in the ${cat.title} department.`
            );

            return (
              <div
                key={cat.id}
                className={`group relative bg-surface-container-low rounded border border-cold-border overflow-hidden p-space-lg flex flex-col justify-between min-h-[360px] sm:min-h-[380px] hover:border-accent-lime transition-all duration-500 ${
                  isLarge ? 'lg:col-span-2' : ''
                }`}
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-45 group-hover:scale-105 transition-all duration-700 filter grayscale"
                  style={{ backgroundImage: `url(${cat.image})` }}
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/70 to-surface-container-lowest/30 pointer-events-none" />

                {/* Top Tags */}
                <div className="relative z-10 flex items-start justify-between">
                  <span className="font-headline text-[10px] uppercase tracking-widest text-accent-lime bg-surface-container-lowest/90 backdrop-blur px-2.5 py-1 rounded border border-accent-lime/30 font-bold">
                    {cat.tag}
                  </span>
                  <span className="font-mono text-[11px] uppercase text-on-surface-variant tracking-wider bg-surface-container-high/80 px-2 py-0.5 rounded">
                    {cat.itemCount}
                  </span>
                </div>

                {/* Bottom Content & Triggers */}
                <div className="relative z-10 flex flex-col gap-3 mt-auto pt-6">
                  <div>
                    <h3 className="font-headline text-2xl sm:text-3xl uppercase text-white font-bold tracking-tight group-hover:text-accent-lime transition-colors">
                      {cat.title}
                    </h3>
                    <p className="font-body text-xs sm:text-sm text-on-surface-variant max-w-xl line-clamp-2 mt-1 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    {/* View in Catalog Button */}
                    <button
                      onClick={() => onSelectCategory(cat.id)}
                      className="px-4 py-2 rounded bg-white text-black hover:bg-accent-lime font-headline text-xs uppercase tracking-wider font-bold transition-all flex items-center gap-1.5"
                    >
                      <span>VIEW ITEMS</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    {/* WhatsApp Quick Ask */}
                    <a
                      href={categoryInquiryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 rounded bg-surface-container hover:bg-surface-bright text-white border border-cold-border hover:border-accent-lime font-headline text-xs uppercase tracking-wider transition-all flex items-center gap-1.5"
                      title="Quick Inquiry on WhatsApp"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-accent-lime" />
                      <span className="hidden sm:inline">ASK ON WHATSAPP</span>
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
