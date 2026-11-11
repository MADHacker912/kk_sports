import React, { useEffect, useRef } from 'react';
import { ShieldCheck, Wrench } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const BrandIntroduction: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Heading & Content subtle upward entrance on scroll
      if (headingRef.current && contentRef.current) {
        gsap.fromTo(
          [headingRef.current, contentRef.current],
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 2. Image Reveal (gentle scale down from 1.06 to 1 with parallax)
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { scale: 1.06 },
          {
            scale: 1,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );

        gsap.to(imageRef.current, {
          yPercent: 8,
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

  return (
    <section
      ref={sectionRef}
      id="brand-introduction"
      className="w-full bg-[#F1EFE8] py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#E2DFD6] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Natural Editorial Photography (5 cols) */}
        <div className="lg:col-span-5 order-2 lg:order-1">
          <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-[#EAE6DC] border border-[#DDD8CC] shadow-[0_8px_30px_rgba(39,41,35,0.06)]">
            <img
              ref={imageRef}
              src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80"
              alt="Authentic cricket equipment and sports craftsmanship"
              className="w-full h-full object-cover object-center filter contrast-[1.02] will-change-transform"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#272923]/35 via-transparent to-transparent pointer-events-none" />

            {/* Subtle authentic caption */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white/95 text-xs font-mono">
              <span className="bg-[#272923]/75 backdrop-blur-sm px-3 py-1 rounded-md border border-white/10">
                Parade Atelier • Est. Kanpur
              </span>
              <span className="bg-[#272923]/75 backdrop-blur-sm px-3 py-1 rounded-md border border-white/10">
                100% Genuine
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Brand Story (7 cols) */}
        <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col justify-center gap-6">
          <div ref={headingRef}>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#66785F] mb-3 block font-semibold">
              ABOUT K.K. SPORTS // KANPUR
            </span>
            <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#272923] leading-tight">
              A Kanpur Sporting Legacy Built on Authentic Craft.
            </h2>
          </div>

          <div ref={contentRef} className="flex flex-col gap-6 text-[#77776F] font-body text-base leading-relaxed">
            <p>
              Located in the sporting hub of Meston Road, Parade, K.K. Sports serves cricket academies, tournament clubs, and recreational athletes with verified genuine equipment and in-house preparation ateliers.
            </p>
            <p>
              From custom digital willow knocking to high-tension electronic racket restringing, every piece of gear is handled with deep technical precision and personal integrity.
            </p>

            {/* Subtle feature pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#DDD8CC]">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#F8F7F3] border border-[#DDD8CC] shadow-sm">
                <div className="w-8 h-8 rounded-full bg-[#E7EBE2] text-[#66785F] flex items-center justify-center shrink-0">
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

              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#F8F7F3] border border-[#DDD8CC] shadow-sm">
                <div className="w-8 h-8 rounded-full bg-[#E7EBE2] text-[#66785F] flex items-center justify-center shrink-0">
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
