import React, { useEffect, useRef } from 'react';
import { BUSINESS_INFO } from '../data/sportsData';
import { getStoreVisitInquiryUrl, DISPLAY_PHONE } from '../utils/whatsapp';
import { MapPin, Navigation, Clock, Phone, MessageSquare, ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const KanpurFlagshipStore: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Header entrance
      gsap.from('#flagship-header', {
        scrollTrigger: {
          trigger: '#flagship-header',
          start: 'top 85%',
        },
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: 'power3.out',
      });

      // Split panels entrance
      if (detailsRef.current && mapRef.current) {
        gsap.from([detailsRef.current, mapRef.current], {
          scrollTrigger: {
            trigger: detailsRef.current,
            start: 'top 80%',
          },
          opacity: 0,
          y: 30,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="store-location"
      ref={containerRef}
      className="w-full bg-[#F8F7F3] py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#E7E5DE]"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Section Header */}
        <div
          id="flagship-header"
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E7E5DE] pb-8"
        >
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#66785F] mb-2 block font-semibold">
              FLAGSHIP LOCATION // MESTON ROAD
            </span>
            <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#242720]">
              Visit Kanpur Flagship
            </h2>
          </div>
          <p className="font-body text-sm sm:text-base text-[#77776F] max-w-md leading-relaxed">
            Visit our multi-level equipment showroom in the historic sporting quarter of Parade, Meston Road.
          </p>
        </div>

        {/* Store Location & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Details (5 cols) */}
          <div
            ref={detailsRef}
            className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-[#E7E5DE] flex flex-col justify-between gap-6 shadow-sm"
          >
            <div className="flex flex-col gap-6">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-md bg-[#F0EFE9] flex items-center justify-center text-[#66785F] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#77776F] block mb-1">
                    Store Address
                  </span>
                  <p className="font-headline text-base sm:text-lg font-bold text-[#242720] leading-snug">
                    {BUSINESS_INFO.fullName}
                  </p>
                  <p className="font-body text-sm text-[#77776F] mt-1 leading-relaxed">
                    {BUSINESS_INFO.address}
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4 pt-4 border-t border-[#E7E5DE]">
                <div className="w-10 h-10 rounded-md bg-[#F0EFE9] flex items-center justify-center text-[#66785F] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#77776F] block mb-1">
                    Store Hours
                  </span>
                  <div className="font-body text-sm text-[#77776F] flex flex-col gap-1">
                    <div className="flex justify-between gap-6">
                      <span>Mon – Sat:</span>
                      <span className="text-[#242720] font-semibold">{BUSINESS_INFO.hours.weekdays}</span>
                    </div>
                    <div className="flex justify-between gap-6">
                      <span>Sunday:</span>
                      <span className="text-[#242720] font-semibold">{BUSINESS_INFO.hours.sunday}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Telephone */}
              <div className="flex items-start gap-4 pt-4 border-t border-[#E7E5DE]">
                <div className="w-10 h-10 rounded-md bg-[#F0EFE9] flex items-center justify-center text-[#66785F] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#77776F] block mb-1">
                    Direct Store Desk
                  </span>
                  <a
                    href={`tel:${DISPLAY_PHONE.replace(/\s+/g, '')}`}
                    className="font-headline text-base font-bold text-[#242720] hover:text-[#66785F] transition-colors"
                  >
                    {DISPLAY_PHONE}
                  </a>
                  <p className="font-body text-xs text-[#77776F] mt-0.5">
                    For stock queries, knocking schedules &amp; store assistance.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-[#E7E5DE]">
              <a
                href={BUSINESS_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-md bg-[#242720] hover:bg-[#66785F] text-white font-headline text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <a
                href={getStoreVisitInquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-md bg-[#F0EFE9] hover:bg-[#E7E5DE] border border-[#E7E5DE] text-[#242720] font-headline text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-[#66785F]" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column: Clean Embedded Google Map (7 cols) */}
          <div
            ref={mapRef}
            className="lg:col-span-7 rounded-2xl bg-white border border-[#E7E5DE] p-2 min-h-[360px] flex flex-col justify-between overflow-hidden shadow-sm"
          >
            <div className="relative w-full h-full min-h-[340px] rounded-xl overflow-hidden">
              <iframe
                title="K.K. Sports Store Map"
                src="https://maps.google.com/maps?q=44/319,%20Meston%20Road,%20Parade,%20Kanpur,%20Uttar%20Pradesh%20208001&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full min-h-[340px]"
              />

              <div className="absolute top-4 left-4 p-3 rounded-md bg-white/95 backdrop-blur-sm border border-[#E7E5DE] shadow-sm pointer-events-none">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#66785F] block font-semibold">
                  PARADE, KANPUR
                </span>
                <span className="font-headline text-xs font-bold text-[#242720] block">
                  44/319, MESTON ROAD
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
