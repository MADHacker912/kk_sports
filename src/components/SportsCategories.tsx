import React from 'react';
import { CATEGORIES } from '../data/sportsData';
import { ProductCategory } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface SportsCategoriesProps {
  onSelectCategory: (category: ProductCategory) => void;
}

export const SportsCategories: React.FC<SportsCategoriesProps> = ({ onSelectCategory }) => {
  return (
    <section
      id="sports-categories"
      className="w-full bg-[#F8F7F3] py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#E7E5DE]"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E7E5DE] pb-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#66785F] mb-2 block font-semibold">
              COLLECTION DIRECTORY
            </span>
            <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#242720]">
              Sports Categories
            </h2>
          </div>
          <p className="font-body text-sm sm:text-base text-[#77776F] max-w-md leading-relaxed">
            Thoughtfully organized athletic gear for school academies, tournament clubs, and dedicated enthusiasts.
          </p>
        </div>

        {/* Large Photographic Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="group relative bg-[#F0EFE9] rounded-lg border border-[#E7E5DE] hover:border-[#66785F] overflow-hidden p-6 sm:p-8 flex flex-col justify-between min-h-[340px] sm:min-h-[380px] cursor-pointer transition-all duration-300"
            >
              {/* Natural Photographic Background */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-55 group-hover:scale-103 transition-all duration-700 filter grayscale-[25%]"
                style={{ backgroundImage: `url(${cat.image})` }}
              />

              {/* Soft Scrim Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#F8F7F3]/95 via-[#F8F7F3]/40 to-transparent pointer-events-none" />

              {/* Top Tag & Indicator */}
              <div className="relative z-10 flex items-start justify-between">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#77776F] bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded border border-[#E7E5DE]">
                  {cat.itemCount}
                </span>
                <div className="w-8 h-8 rounded-full bg-white text-[#242720] group-hover:bg-[#66785F] group-hover:text-white flex items-center justify-center transition-colors shadow-sm">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Bottom Content */}
              <div className="relative z-10 flex flex-col gap-1.5 mt-auto">
                <h3 className="font-headline text-2xl font-bold tracking-tight text-[#242720] group-hover:text-[#66785F] transition-colors">
                  {cat.title}
                </h3>
                <p className="font-body text-xs sm:text-sm text-[#77776F] line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
