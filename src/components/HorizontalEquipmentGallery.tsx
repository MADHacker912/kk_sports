import React, { useEffect, useRef } from 'react';
import { PRODUCTS } from '../data/sportsData';
import { Product } from '../types';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HorizontalEquipmentGalleryProps {
  onSelectProduct: (product: Product) => void;
}

export const HorizontalEquipmentGallery: React.FC<HorizontalEquipmentGalleryProps> = ({
  onSelectProduct,
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const pinTrackRef = useRef<HTMLDivElement>(null);
  const horizontalTrackRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  // Take the premier products across disciplines
  const showcaseProducts = PRODUCTS.slice(0, 6);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDesktop = window.innerWidth >= 1024;

    if (prefersReducedMotion || !isDesktop || !containerRef.current || !horizontalTrackRef.current || !pinTrackRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      const track = horizontalTrackRef.current;
      if (!track) return;

      const totalScrollWidth = track.scrollWidth - window.innerWidth + 200;

      ScrollTrigger.create({
        trigger: containerRef.current,
        pin: pinTrackRef.current,
        start: 'top top',
        end: () => `+=${totalScrollWidth}`,
        scrub: 0.8,
        onUpdate: (self) => {
          const progress = self.progress;

          // Scrub horizontal track
          gsap.set(track, {
            x: -progress * (track.scrollWidth - window.innerWidth + 120),
          });

          // Scrub progress indicator line
          if (progressLineRef.current) {
            progressLineRef.current.style.width = `${Math.min(100, Math.max(0, progress * 100))}%`;
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="horizontal-gallery"
      ref={containerRef}
      className="relative w-full bg-[#EAE6DC] border-b border-[#DDD8CC] overflow-hidden"
    >
      <div
        ref={pinTrackRef}
        className="w-full min-h-screen py-16 lg:py-24 px-4 sm:px-6 lg:px-8 flex flex-col justify-between"
      >
        <div className="max-w-7xl mx-auto w-full flex flex-col gap-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#272923]/10 pb-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#52634B] mb-2 block font-semibold">
                CHAMPIONSHIP EDITIONS · HORIZONTAL GALLERY
              </span>
              <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#272923]">
                Flagship Equipment Reel
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <p className="font-body text-sm text-[#77776F] max-w-sm leading-relaxed">
                Scroll to inspect tournament-grade athletic editions curated by Kanpur master technicians.
              </p>
              <div className="hidden lg:flex items-center gap-1.5 font-mono text-xs text-[#52634B] bg-[#FAF9F5] px-3 py-1.5 rounded-full border border-[#DDD8CC] shrink-0">
                <span>Horizontal Scroll</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Progress Line */}
          <div className="w-full bg-[#272923]/10 h-1 rounded-full overflow-hidden">
            <div
              ref={progressLineRef}
              className="bg-[#52634B] h-full w-0 transition-all duration-100"
            />
          </div>
        </div>

        {/* Horizontal Track Container */}
        <div className="w-full overflow-x-auto lg:overflow-visible no-scrollbar py-6">
          <div
            ref={horizontalTrackRef}
            className="flex gap-6 sm:gap-8 w-max px-4 sm:px-8 will-change-transform"
          >
            {showcaseProducts.map((product, idx) => (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="group relative w-[280px] sm:w-[340px] lg:w-[400px] h-[440px] sm:h-[480px] bg-[#FAF9F5] rounded-2xl border border-[#DDD8CC] hover:border-[#52634B] overflow-hidden p-6 sm:p-8 flex flex-col justify-between cursor-pointer transition-all duration-300 shadow-[0_8px_30px_rgba(39,41,35,0.06)] hover:shadow-[0_16px_40px_rgba(39,41,35,0.12)] shrink-0"
              >
                {/* Top Badge & Number */}
                <div className="flex items-center justify-between z-10">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#77776F] bg-[#F1EFE8] px-2.5 py-1 rounded-md border border-[#DDD8CC]">
                    0{idx + 1} · {product.category.toUpperCase()}
                  </span>
                  {product.badge && (
                    <span className="font-mono text-[11px] uppercase tracking-wider text-[#52634B] font-semibold bg-[#52634B]/10 px-2.5 py-1 rounded-md">
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Centered Product Visual with soft radial glow and hover zoom */}
                <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden rounded-xl bg-gradient-to-b from-[#F6F4EE] to-[#EAE5DC] p-6 border border-[#E5E0D4] shadow-inner">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0%,transparent_70%)] pointer-events-none" />
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain filter contrast-[1.03] drop-shadow-[0_12px_20px_rgba(39,41,35,0.14)] group-hover:scale-108 transition-transform duration-500 will-change-transform z-10"
                    loading="lazy"
                  />
                </div>

                {/* Bottom Details */}
                <div className="flex flex-col gap-2 z-10">
                  <span className="font-body text-xs text-[#77776F]">
                    {product.categoryLabel}
                  </span>
                  <h3 className="font-headline text-lg sm:text-xl font-bold text-[#272923] group-hover:text-[#52634B] transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between pt-3 border-t border-[#EAE5DC] mt-1">
                    <span className="font-body text-xs text-[#272923] font-semibold">
                      {product.priceDisplay || 'Inquire on Spec'}
                    </span>
                    <span className="inline-flex items-center gap-1 font-headline text-xs text-[#52634B] font-semibold">
                      View Specs
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footnote */}
        <div className="max-w-7xl mx-auto w-full pt-4 border-t border-[#272923]/10 flex items-center justify-between text-xs text-[#77776F] font-mono">
          <span>01 — 06 CHAMPIONSHIP EDITIONS</span>
          <span>AUTHORIZED DISTRIBUTION • PARADE FLAGSHIP</span>
        </div>
      </div>
    </section>
  );
};
