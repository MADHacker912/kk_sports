import React from 'react';
import { BUSINESS_INFO } from '../data/sportsData';
import { getStoreVisitInquiryUrl, DISPLAY_PHONE } from '../utils/whatsapp';
import { MapPin, Navigation, Clock, Phone, MessageSquare, ArrowUpRight } from 'lucide-react';

export const KanpurFlagshipStore: React.FC = () => {
  return (
    <section
      id="store-location"
      className="w-full bg-[#08090B] py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#1F2228]"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#1F2228] pb-8">
          <div>
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#C6FF35] mb-2 block font-semibold">
              FLAGSHIP LOCATION // 07
            </span>
            <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl uppercase text-white font-bold tracking-tight">
              KANPUR FLAGSHIP STORE
            </h2>
          </div>
          <p className="font-body text-sm sm:text-base text-[#A1A1AA] max-w-md leading-relaxed">
            Visit our landmark multi-level equipment showroom in the historic sporting hub of Parade, Meston Road.
          </p>
        </div>

        {/* Store Location & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Details (5 cols) */}
          <div className="lg:col-span-5 bg-[#101215] p-6 sm:p-8 rounded border border-[#232730] flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-6">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded bg-[#17191D] border border-[#2C3038] flex items-center justify-center text-[#C6FF35] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#A1A1AA] block mb-1">
                    Store Address
                  </span>
                  <p className="font-headline text-base sm:text-lg text-white font-bold leading-snug">
                    {BUSINESS_INFO.fullName}
                  </p>
                  <p className="font-body text-xs sm:text-sm text-[#A1A1AA] mt-1 leading-relaxed">
                    {BUSINESS_INFO.address}
                  </p>
                </div>
              </div>

              {/* Store Hours */}
              <div className="flex items-start gap-4 pt-4 border-t border-[#1F2228]">
                <div className="w-10 h-10 rounded bg-[#17191D] border border-[#2C3038] flex items-center justify-center text-[#C6FF35] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#A1A1AA] block mb-1">
                    Store Hours
                  </span>
                  <div className="font-mono text-xs text-[#A1A1AA] flex flex-col gap-1">
                    <div className="flex justify-between gap-6">
                      <span>Mon – Sat:</span>
                      <span className="text-white font-semibold">{BUSINESS_INFO.hours.weekdays}</span>
                    </div>
                    <div className="flex justify-between gap-6">
                      <span>Sunday:</span>
                      <span className="text-white font-semibold">{BUSINESS_INFO.hours.sunday}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Telephone */}
              <div className="flex items-start gap-4 pt-4 border-t border-[#1F2228]">
                <div className="w-10 h-10 rounded bg-[#17191D] border border-[#2C3038] flex items-center justify-center text-[#C6FF35] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#A1A1AA] block mb-1">
                    Direct Contact Desk
                  </span>
                  <a
                    href={`tel:${DISPLAY_PHONE.replace(/\s+/g, '')}`}
                    className="font-headline text-base text-white font-bold hover:text-[#C6FF35] transition-colors"
                  >
                    {DISPLAY_PHONE}
                  </a>
                  <p className="font-body text-xs text-[#A1A1AA] mt-0.5">
                    For stock queries, knocking schedules &amp; store assistance.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-[#1F2228]">
              <a
                href={BUSINESS_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded bg-white hover:bg-[#C6FF35] text-black font-headline text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 transition-all"
              >
                <Navigation className="w-4 h-4" />
                <span>DIRECTIONS</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <a
                href={getStoreVisitInquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded bg-[#17191D] hover:bg-[#1F2228] border border-[#2C3038] text-white font-headline text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-[#C6FF35]" />
                <span>WHATSAPP</span>
              </a>
            </div>
          </div>

          {/* Right Column: Clean Embedded Google Map (7 cols) */}
          <div className="lg:col-span-7 rounded bg-[#101215] border border-[#232730] p-2 min-h-[360px] flex flex-col justify-between overflow-hidden shadow-xl">
            <div className="relative w-full h-full min-h-[340px] rounded overflow-hidden">
              <iframe
                title="K.K. Sports Store Map"
                src="https://maps.google.com/maps?q=44/319,%20Meston%20Road,%20Parade,%20Kanpur,%20Uttar%20Pradesh%20208001&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(120%)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full min-h-[340px] opacity-80 hover:opacity-100 transition-opacity"
              />

              <div className="absolute top-4 left-4 p-3 rounded bg-[#08090B]/90 backdrop-blur border border-[#2C3038] pointer-events-none">
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#C6FF35] block">
                  PARADE, KANPUR
                </span>
                <span className="font-headline text-xs font-bold text-white uppercase block">
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
