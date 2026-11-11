import React, { useEffect, useRef } from 'react';
import { CATEGORIES } from '../data/sportsData';
import { ProductCategory } from '../types';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SportsCategoriesProps {
  onSelectCategory: (category: ProductCategory) => void;
}

const CATEGORY_HIGHLIGHTS: Record<string, string[]> = {
  cricket: ['Sussex Grade-1 English Willow', 'Digital Knocking Atelier', 'Test-Grade Protection Gear'],
  football: ['FIFA-Standard Match Balls', 'Anatomical Goalkeeper Armor', 'Agility & Field Accessories'],
  badminton: ['High-Modulus Carbon Frames', 'Electronic Restringing Atelier', 'Tournament Feather Shuttles'],
  fitness: ['Urethane Hex Weight Systems', 'Olympic Standard Power Racks', 'Vibration Recovery Massagers'],
  indoor: ['Competition Carrom Boards', 'Tournament TT Tables & Rubbers', 'Solid Wood Chess Editions'],
  toys: ['Precision RC Drone Systems', 'Non-Toxic Kinetic Sets', 'Junior Sports Foundation Kits'],
};

// Distinct warm atmospheric themes for each incoming stacked card
const CARD_THEMES = [
  {
    bg: 'bg-[#F1EFE8]', // Soft Cream
    border: 'border-[#DDD8CC]',
    hoverBorder: 'hover:border-[#66785F]',
    imgBg: 'bg-[#EAE6DC]',
    tagBg: 'bg-[#66785F]/15 text-[#52634B]',
    pillBg: 'bg-[#FAF9F5] text-[#272923] border-[#DDD8CC]',
    numBadge: 'bg-[#FAF9F5]',
  },
  {
    bg: 'bg-[#EAE6DC]', // Warm Sand
    border: 'border-[#D6D0C2]',
    hoverBorder: 'hover:border-[#52634B]',
    imgBg: 'bg-[#E2DDCF]',
    tagBg: 'bg-[#52634B]/15 text-[#3C4D35]',
    pillBg: 'bg-[#F6F4EE] text-[#272923] border-[#D6D0C2]',
    numBadge: 'bg-[#F6F4EE]',
  },
  {
    bg: 'bg-[#E7EBE2]', // Muted Sage
    border: 'border-[#D0D9CE]',
    hoverBorder: 'hover:border-[#4B5E45]',
    imgBg: 'bg-[#DCE4D8]',
    tagBg: 'bg-[#4B5E45]/15 text-[#3E5238]',
    pillBg: 'bg-[#FAF9F6] text-[#272923] border-[#D0D9CE]',
    numBadge: 'bg-[#FAF9F6]',
  },
  {
    bg: 'bg-[#E5E2DA]', // Soft Stone
    border: 'border-[#D4D0C6]',
    hoverBorder: 'hover:border-[#545E50]',
    imgBg: 'bg-[#DDD8CE]',
    tagBg: 'bg-[#545E50]/15 text-[#3F483B]',
    pillBg: 'bg-[#F5F2EB] text-[#272923] border-[#D4D0C6]',
    numBadge: 'bg-[#F5F2EB]',
  },
  {
    bg: 'bg-[#F3EFE7]', // Warm Cream Birch
    border: 'border-[#DED9CD]',
    hoverBorder: 'hover:border-[#66785F]',
    imgBg: 'bg-[#EBE6DC]',
    tagBg: 'bg-[#66785F]/15 text-[#4E5E47]',
    pillBg: 'bg-[#FAF9F5] text-[#272923] border-[#DED9CD]',
    numBadge: 'bg-[#FAF9F5]',
  },
  {
    bg: 'bg-[#F8F7F3]', // Warm Ivory
    border: 'border-[#E2DFD6]',
    hoverBorder: 'hover:border-[#66785F]',
    imgBg: 'bg-[#EFECE5]',
    tagBg: 'bg-[#66785F]/15 text-[#52634B]',
    pillBg: 'bg-[#FFFFFF] text-[#272923] border-[#E2DFD6]',
    numBadge: 'bg-[#FFFFFF]',
  },
];

export const SportsCategories: React.FC<SportsCategoriesProps> = ({ onSelectCategory }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Header entrance animation
      gsap.from('#categories-header', {
        scrollTrigger: {
          trigger: '#categories-header',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: 'power3.out',
      });

      // Stacked overlapping card animations with smooth scaling & depth
      cardsRef.current.forEach((card, index) => {
        if (!card || index === cardsRef.current.length - 1) return;

        const nextCard = cardsRef.current[index + 1];
        if (!nextCard) return;

        gsap.to(card, {
          scrollTrigger: {
            trigger: nextCard,
            start: 'top 75%',
            end: 'top 20%',
            scrub: true,
          },
          scale: 0.94,
          opacity: 0.82,
          y: -14,
          ease: 'none',
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="sports-categories"
      ref={containerRef}
      className="w-full bg-[#F8F7F3] py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#E2DFD6]"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-14">
        {/* Section Header */}
        <div
          id="categories-header"
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E2DFD6] pb-8"
        >
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#66785F] mb-2 block font-semibold">
              COLLECTION DIRECTORY · STACKED ARCHIVE
            </span>
            <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#272923]">
              Sports Categories
            </h2>
          </div>
          <p className="font-body text-sm sm:text-base text-[#77776F] max-w-md leading-relaxed">
            Thoughtfully curated athletic gear organized by discipline. Explore dedicated ateliers, specs, and certified equipment below.
          </p>
        </div>

        {/* Stacked Overlapping Cards Container */}
        <div className="relative flex flex-col gap-8 pb-12">
          {CATEGORIES.map((cat, idx) => {
            const highlights = CATEGORY_HIGHLIGHTS[cat.id] || [];
            const theme = CARD_THEMES[idx % CARD_THEMES.length];
            // Sticky top position with progressive offset for visible card tabs
            const stickyTop = `calc(5.5rem + ${idx * 12}px)`;

            return (
              <div
                key={cat.id}
                ref={(el) => { cardsRef.current[idx] = el; }}
                style={{
                  top: stickyTop,
                  zIndex: 10 + idx,
                }}
                onClick={() => onSelectCategory(cat.id)}
                className={`group sticky ${theme.bg} rounded-2xl border ${theme.border} ${theme.hoverBorder} overflow-hidden p-6 sm:p-10 transition-all duration-300 cursor-pointer shadow-[0_-14px_36px_rgba(39,41,35,0.08),0_6px_20px_rgba(39,41,35,0.04)] will-change-transform`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Left Column: Editorial Details (7 cols) */}
                  <div className="lg:col-span-7 flex flex-col justify-between gap-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className={`font-mono text-xs font-semibold px-3 py-1 rounded-full ${theme.numBadge} text-[#272923] border ${theme.border} shadow-sm`}>
                          {String(idx + 1).padStart(2, '0')} · 06
                        </span>
                        <span className="font-mono text-xs uppercase tracking-wider text-[#77776F]">
                          {cat.itemCount}
                        </span>
                      </div>
                      <span className={`font-mono text-[11px] uppercase tracking-wider ${theme.tagBg} px-2.5 py-1 rounded font-semibold`}>
                        Verified Pro Stock
                      </span>
                    </div>

                    <div>
                      <h3 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#272923] group-hover:text-[#66785F] transition-colors">
                        {cat.title}
                      </h3>
                      <p className="font-body text-sm sm:text-base text-[#77776F] mt-3 leading-relaxed max-w-xl">
                        {cat.description}
                      </p>
                    </div>

                    {/* Highlights bullet points */}
                    <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 border-t border-[#272923]/10">
                      {highlights.map((item, hIdx) => (
                        <div key={hIdx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#66785F] shrink-0" />
                          <span className="font-body text-xs text-[#272923] font-medium">{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Call to action */}
                    <div className="pt-2 flex items-center gap-3">
                      <span className="inline-flex items-center gap-2 font-headline text-xs sm:text-sm font-semibold text-[#272923] group-hover:text-[#66785F] transition-colors">
                        Explore {cat.title} Collection
                        <div className="w-7 h-7 rounded-full bg-white text-[#272923] group-hover:bg-[#66785F] group-hover:text-white flex items-center justify-center transition-all shadow-sm">
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </div>
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Hero Visual with soft zoom & distinct ambient stage (5 cols) */}
                  <div className={`lg:col-span-5 relative w-full h-56 sm:h-72 lg:h-80 rounded-xl overflow-hidden border ${theme.border} ${theme.imgBg} shadow-inner`}>
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter contrast-[1.03]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#272923]/40 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-3 right-3 font-mono text-[10px] uppercase tracking-wider text-white bg-[#272923]/80 backdrop-blur-sm px-2.5 py-1 rounded">
                      {cat.tag}
                    </div>
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
