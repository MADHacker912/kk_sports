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
      className="w-full bg-[#F0EFE9] py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#E7E5DE] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Natural Editorial Photography (5 cols) */}
        <div className="lg:col-span-5 order-2 lg:order-1">
          <div className="relative aspect-[4/5] w-full rounded-lg overflow-hidden bg-[#E7E5DE] border border-[#E7E5DE] shadow-sm">
            <img
              ref={imageRef}
              src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80"
              alt="Authentic cricket equipment and sports craftsmanship"
              className="w-full h-full object-cover object-center filter contrast-[1.02] will-change-transform"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-6 left-6 right-6 p-4 rounded bg-white/95 backdrop-blur-sm border border-[#E7E5DE] shadow-sm">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#66785F] block mb-1 font-semibold">
                HERITAGE // PARADE, KANPUR
              </span>
              <p className="font-headline text-sm font-semibold text-[#242720]">
                Supplying grassroots champions and tournament athletes.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Text (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-center order-1 lg:order-2">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#66785F] mb-4 font-semibold">
            ABOUT K.K. SPORTS
          </span>

          <h2
            ref={headingRef}
            className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#242720] leading-[1.1] mb-6"
          >
            Grounded in Craft. <br />
            Built for the Field.
          </h2>

          <div ref={contentRef} className="flex flex-col">
            <p className="font-body text-base sm:text-lg text-[#242720] leading-relaxed mb-4">
              Located in the historic sports quarter of Meston Road, Parade, K.K. Sports has supported players, schools, and local academies across Uttar Pradesh with genuine athletic equipment and expert guidance.
            </p>

            <p className="font-body text-sm sm:text-base text-[#77776F] leading-relaxed mb-8">
              Whether selecting a Grade-1 English willow blade, outfitting a football club with FIFA standard match balls, or restringing a badminton racket for an upcoming district tournament, we remain committed to verified authenticity without shortcuts.
            </p>

            {/* Clean 2-column Service & Sourcing notes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-[#E7E5DE]">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-[#242720]">
                  <ShieldCheck className="w-4 h-4 text-[#66785F]" />
                  <span className="font-headline text-sm font-bold">
                    Authorized Direct Sourcing
                  </span>
                </div>
                <p className="font-body text-xs text-[#77776F] leading-normal">
                  Direct official inventory from SS, SG, Yonex, Cosco, Nivia, and Mikasa with manufacturer warranty.
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-[#242720]">
                  <Wrench className="w-4 h-4 text-[#66785F]" />
                  <span className="font-headline text-sm font-bold">
                    Atelier Preparation Lab
                  </span>
                </div>
                <p className="font-body text-xs text-[#77776F] leading-normal">
                  On-site machine bat knocking, raw oiling, edge resin armor, and precision electronic racket restringing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
