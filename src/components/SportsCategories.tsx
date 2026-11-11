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
      className="w-full bg-[#08090B] py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#1F2228]"
    >
      <div className="max-w-7xl mx-auto flex flex-col">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-[#1F2228] pb-8">
          <div>
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#C6FF35] mb-2 block font-semibold">
              SECTOR DIRECTORY // 04
            </span>
            <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl uppercase text-white font-bold tracking-tight">
              SPORTS CATEGORIES
            </h2>
          </div>
          <p className="font-body text-sm sm:text-base text-[#A1A1AA] max-w-md leading-relaxed">
            Authentic equipment engineered for competitive athletes, club coaches, school departments, and recreation.
          </p>
        </div>

        {/* Clean Editorial Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="group relative bg-[#121417] rounded border border-[#232730] hover:border-[#C6FF35] overflow-hidden p-6 sm:p-8 flex flex-col justify-between min-h-[340px] sm:min-h-[380px] cursor-pointer transition-all duration-300"
            >
              {/* Background Image with subtle cinematic grading */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-35 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700 filter grayscale"
                style={{ backgroundImage: `url(${cat.image})` }}
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#08090B] via-[#08090B]/60 to-transparent pointer-events-none" />

              {/* Top Tag */}
              <div className="relative z-10 flex items-start justify-between">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#A1A1AA] bg-[#08090B]/80 px-2 py-0.5 rounded">
                  {cat.itemCount}
                </span>
                <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-[#C6FF35] text-white group-hover:text-black flex items-center justify-center transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Bottom Content */}
              <div className="relative z-10 flex flex-col gap-1.5 mt-auto">
                <h3 className="font-headline text-2xl uppercase text-white font-bold tracking-tight group-hover:text-[#C6FF35] transition-colors">
                  {cat.title}
                </h3>
                <p className="font-body text-xs text-[#A1A1AA] line-clamp-2 leading-relaxed">
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
