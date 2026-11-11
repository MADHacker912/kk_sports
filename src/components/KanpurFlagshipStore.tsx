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
          y: 28,
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
      className="w-full bg-[#EAE6DC] py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#D8D4C8]"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Section Header */}
        <div
          id="flagship-header"
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#272923]/10 pb-8"
        >
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#52634B] mb-2 block font-semibold">
              FLAGSHIP LOCATION · MESTON ROAD
            </span>
            <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#272923]">
              Visit Kanpur Flagship
            </h2>
          </div>
          <p className="font-body text-sm sm:text-base text-[#77776F] max-w-md leading-relaxed">
            Visit our multi-level equipment showroom in the historic sporting quarter of Parade, Meston Road.
          </p>
        </div>

        {/* Store Location & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Details in Warm Ivory card (5 cols) */}
          <div
            ref={detailsRef}
            className="lg:col-span-5 bg-[#FAF9F5] p-6 sm:p-8 rounded-2xl border border-[#DCD7CA] flex flex-col justify-between gap-6 shadow-[0_8px_30px_rgba(39,41,35,0.06)]"
          >
            <div className="flex flex-col gap-6">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#EAE6DC] flex items-center justify-center text-[#52634B] shrink-0 border border-[#DCD7CA]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#77776F] block mb-1">
                    Store Address
                  </span>
                  <p className="font-headline text-base sm:text-lg font-bold text-[#272923] leading-snug">
                    {BUSINESS_INFO.fullName}
                  </p>
                  <p className="font-body text-sm text-[#77776F] mt-1 leading-relaxed">
                    {BUSINESS_INFO.address}
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4 pt-4 border-t border-[#EAE6DC]">
                <div className="w-10 h-10 rounded-xl bg-[#EAE6DC] flex items-center justify-center text-[#52634B] shrink-0 border border-[#DCD7CA]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#77776F] block mb-1">
                    Store Hours
                  </span>
                  <div className="font-body text-sm text-[#77776F] flex flex-col gap-1">
                    <div className="flex justify-between gap-6">
                      <span>Mon – Sat:</span>
                      <span className="text-[#272923] font-semibold">{BUSINESS_INFO.hours.weekdays}</span>
                    </div>
                    <div className="flex justify-between gap-6">
                      <span>Sunday:</span>
                      <span className="text-[#272923] font-semibold">{BUSINESS_INFO.hours.sunday}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Telephone */}
              <div className="flex items-start gap-4 pt-4 border-t border-[#EAE6DC]">
                <div className="w-10 h-10 rounded-xl bg-[#EAE6DC] flex items-center justify-center text-[#52634B] shrink-0 border border-[#DCD7CA]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#77776F] block mb-1">
                    Direct Store Desk
                  </span>
                  <a
                    href={`tel:${DISPLAY_PHONE.replace(/\s+/g, '')}`}
                    className="font-headline text-base font-bold text-[#272923] hover:text-[#52634B] transition-colors"
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
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-[#EAE6DC]">
              <a
                href={BUSINESS_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-[#272923] hover:bg-[#52634B] text-white font-headline text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <a
                href={getStoreVisitInquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-[#EAE6DC] hover:bg-[#DCD7CA] border border-[#DCD7CA] text-[#272923] font-headline text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-[#52634B]" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column: Embedded Google Map in Warm Frame (7 cols) */}
          <div
            ref={mapRef}
            className="lg:col-span-7 rounded-2xl bg-[#FAF9F5] border border-[#DCD7CA] p-2 min-h-[360px] flex flex-col justify-between overflow-hidden shadow-[0_8px_30px_rgba(39,41,35,0.06)]"
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
                className="w-full h-full min-h-[340px] filter contrast-[1.02]"
              />

              <div className="absolute top-4 left-4 p-3 rounded-lg bg-[#FAF9F5]/95 backdrop-blur-sm border border-[#DCD7CA] shadow-sm pointer-events-none">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#52634B] block font-semibold">
                  PARADE, KANPUR
                </span>
                <span className="font-headline text-xs font-bold text-[#272923] block">
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
