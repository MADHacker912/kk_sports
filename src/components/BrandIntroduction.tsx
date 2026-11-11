import React, { useEffect, useRef } from 'react';
import { ShieldCheck, Wrench } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const BrandIntroduction: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const leftColRef = useRef<HTMLDivElement | null>(null);
  const rightColRef = useRef<HTMLDivElement | null>(null);
  const imageFrameRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const headingWordsRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Text Mask Reveal for Headline Words
      if (headingWordsRef.current.length > 0) {
        gsap.fromTo(
          headingWordsRef.current,
          { yPercent: 120, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            stagger: 0.05,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 2. Split Screen Reveal (Left image and right content slide in together)
      if (leftColRef.current && rightColRef.current) {
        gsap.fromTo(
          leftColRef.current,
          { x: -35, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );

        gsap.fromTo(
          rightColRef.current,
          { x: 35, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 3. Image Expansion on Scroll (Image expands as user scrolls down into section)
      if (imageFrameRef.current) {
        gsap.fromTo(
          imageFrameRef.current,
          { scale: 0.92, borderRadius: '32px' },
          {
            scale: 1,
            borderRadius: '16px',
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'center center',
              scrub: 0.6,
            },
          }
        );
      }

      // Subtle parallax within the expanded image
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headlineWords = ['A', 'Kanpur', 'Sporting', 'Legacy', 'Built', 'on', 'Authentic', 'Craft.'];

  return (
    <section
      ref={sectionRef}
      id="brand-introduction"
      className="w-full bg-[#F1EFE8] py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#E2DFD6] overflow-hidden transition-colors duration-700"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Image Expansion & Split Screen Entrance (5 cols) */}
        <div ref={leftColRef} className="lg:col-span-5 order-2 lg:order-1">
          <div
            ref={imageFrameRef}
            className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-[#EAE6DC] border border-[#DDD8CC] shadow-[0_12px_36px_rgba(39,41,35,0.08)] will-change-transform"
          >
            <img
              ref={imageRef}
              src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80"
              alt="Authentic cricket equipment and sports craftsmanship"
              className="w-full h-full object-cover object-center filter contrast-[1.02] will-change-transform scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#272923]/35 via-transparent to-transparent pointer-events-none" />

            {/* Authentic caption badge */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white/95 text-xs font-mono">
              <span className="bg-[#272923]/80 backdrop-blur-sm px-3 py-1 rounded-md border border-white/10">
                Parade Atelier • Est. Kanpur
              </span>
              <span className="bg-[#272923]/80 backdrop-blur-sm px-3 py-1 rounded-md border border-white/10">
                100% Genuine
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Brand Story with Text Mask Reveal (7 cols) */}
        <div ref={rightColRef} className="lg:col-span-7 order-1 lg:order-2 flex flex-col justify-center gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#52634B] mb-3 block font-semibold">
              ABOUT K.K. SPORTS · KANPUR
            </span>

            {/* Headline with Mask Reveal on each word */}
            <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#272923] leading-tight flex flex-wrap gap-x-3 gap-y-1">
              {headlineWords.map((word, wIdx) => (
                <span key={wIdx} className="inline-block overflow-hidden py-0.5">
                  <span
                    ref={(el) => { if (el) headingWordsRef.current[wIdx] = el; }}
                    className="inline-block"
                  >
                    {word}
                  </span>
                </span>
              ))}
            </h2>
          </div>

          <div className="flex flex-col gap-6 text-[#77776F] font-body text-base leading-relaxed">
            <p>
              Located in the sporting hub of Meston Road, Parade, K.K. Sports serves cricket academies, tournament clubs, and recreational athletes with verified genuine equipment and in-house preparation ateliers.
            </p>
            <p>
              From custom digital willow knocking to high-tension electronic racket restringing, every piece of gear is handled with deep technical precision and personal integrity.
            </p>

            {/* Feature pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#DDD8CC]">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#FAF9F5] border border-[#DDD8CC] shadow-sm hover:border-[#52634B] transition-colors">
                <div className="w-8 h-8 rounded-full bg-[#E7EBE2] text-[#52634B] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-headline text-sm font-bold text-[#272923]">
                    100% Genuine Equipment
                  </h3>
                  <p className="font-body text-xs text-[#77776F] mt-0.5">
                    Authorized dealer sourcing with zero counterfeit guarantee.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#FAF9F5] border border-[#DDD8CC] shadow-sm hover:border-[#52634B] transition-colors">
                <div className="w-8 h-8 rounded-full bg-[#E7EBE2] text-[#52634B] flex items-center justify-center shrink-0">
                  <Wrench className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-headline text-sm font-bold text-[#272923]">
                    Pro Workshop Atelier
                  </h3>
                  <p className="font-body text-xs text-[#77776F] mt-0.5">
                    Automated knocking lab and certified racket restringing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
