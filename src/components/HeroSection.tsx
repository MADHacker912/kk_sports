import React, { useEffect, useRef } from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CarModelViewer } from './3d/CarModelViewer';

gsap.registerPlugin(ScrollTrigger);

export const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const descRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const stageContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Text Reveal Animation for Headline words
      const words = headlineRef.current?.querySelectorAll('.reveal-word');
      if (words && words.length > 0) {
        gsap.fromTo(
          words,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
            delay: 0.15,
          }
        );
      }

      // 2. Supporting text and CTA entrance
      if (descRef.current && ctaRef.current) {
        gsap.fromTo(
          [descRef.current, ctaRef.current],
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            delay: 0.45,
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#F8F7F3] pt-28 sm:pt-36 lg:pt-40 pb-16 lg:pb-24 border-b border-[#E2DFD6] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center min-h-[520px]">
          {/* Left Column: Thoughtful Editorial Copy (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#66785F] mb-4 font-semibold">
              K.K. SPORTS • KANPUR FLAGSHIP
            </span>

            {/* Headline with word-by-word line reveal wrapper */}
            <h1
              ref={headlineRef}
              className="font-headline text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#272923] leading-[1.05] mb-6 overflow-hidden"
            >
              <span className="inline-block overflow-hidden py-1">
                <span className="reveal-word inline-block mr-3">Find</span>
                <span className="reveal-word inline-block mr-3">Your</span>
                <span className="reveal-word inline-block">Game.</span>
              </span>
            </h1>

            {/* Supporting Description */}
            <p
              ref={descRef}
              className="font-body text-base sm:text-lg text-[#77776F] max-w-lg mb-8 leading-relaxed"
            >
              Explore sports equipment, fitness essentials, games and more at K.K. Sports. North India’s trusted destination for verified athletic gear.
            </p>

            {/* Focused CTAs */}
            <div ref={ctaRef} className="flex flex-wrap items-center gap-4">
              <a
                href="#featured-collection"
                className="px-7 py-3.5 rounded-xl bg-[#272923] hover:bg-[#66785F] text-white font-headline text-xs sm:text-sm font-semibold tracking-wider transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow"
              >
                <span>EXPLORE COLLECTION</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#store-location"
                className="px-6 py-3.5 rounded-xl bg-[#F1EFE8] hover:bg-[#EAE6DC] text-[#272923] border border-[#DDD8CC] font-headline text-xs sm:text-sm font-semibold tracking-wider transition-colors flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-[#77776F]" />
                <span>VISIT FLAGSHIP STORE</span>
              </a>
            </div>

            {/* Quiet Credential Footnote */}
            <div className="mt-12 pt-6 border-t border-[#E2DFD6] flex items-center gap-6 text-xs text-[#77776F]">
              <span>44/319, Meston Road, Parade</span>
              <span className="w-1 h-1 rounded-full bg-[#DDD8CC]" />
              <span>100% Genuine Direct Import</span>
            </div>
          </div>

          {/* Right Column: Pure 3D Model with Auto-Rotation (6 cols) */}
          <div className="lg:col-span-6">
            <div
              ref={stageContainerRef}
              className="relative aspect-[4/3] sm:aspect-[16/11] min-h-[420px] w-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#FAF9F5] via-[#F1EFE8] to-[#EAE6DC] border border-[#DDD8CC] shadow-[0_8px_30px_rgba(39,41,35,0.06)] flex items-center justify-center p-2"
            >
              {/* Direct 3D Sports Car on Auto-Rotation */}
              <div className="w-full h-full p-2">
                <CarModelViewer
                  autoRotate={true}
                  className="w-full h-full"
                />
              </div>

              {/* Subtle caption pill */}
              <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-lg bg-white/95 backdrop-blur-sm border border-[#DDD8CC] text-xs text-[#272923] font-body shadow-sm z-20 pointer-events-none">
                Grand Touring 3D Specimen // 360° Auto-Rotation
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
