import React from 'react';
import { BUSINESS_INFO } from '../data/sportsData';
import { getStoreVisitInquiryUrl, DISPLAY_PHONE } from '../utils/whatsapp';
import { MapPin, Navigation, Clock, Phone, MessageSquare, ExternalLink } from 'lucide-react';

export const KanpurFlagshipStore: React.FC = () => {
  return (
    <section
      id="kanpur-flagship"
      className="w-full bg-surface py-space-xl lg:py-28 px-space-md lg:px-space-xl border-b border-cold-border"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-space-xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md border-b border-cold-border pb-space-lg">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-accent-lime animate-pulse" />
              <span className="font-headline text-[10px] uppercase tracking-[0.25em] text-accent-lime">
                [ PHYSICAL FLAGSHIP // 07 ]
              </span>
            </div>
            <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl uppercase text-white font-bold tracking-tight">
              KANPUR FLAGSHIP DISPENSARY
            </h2>
          </div>
          <p className="font-body text-sm sm:text-base text-on-surface-variant max-w-md leading-relaxed">
            Visit our landmark multi-level equipment showroom in the historic sporting hub of Parade, Meston Road. Experience bat weight testing, shoe trials, and gear fittings.
          </p>
        </div>

        {/* Content Split: Details on Left, Interactive Map Frame on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-stretch">
          {/* Left Column: Store Details (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-space-md bg-surface-container-low p-space-lg rounded border border-cold-border">
            <div className="flex flex-col gap-space-md">
              {/* Address Block */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded bg-surface-container border border-cold-border flex items-center justify-center text-accent-lime shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-headline text-[11px] uppercase tracking-wider text-accent-lime font-bold block mb-1">
                    PRIMARY FLAGSHIP LOCATION
                  </span>
                  <p className="font-headline text-lg sm:text-xl text-white font-bold leading-snug">
                    {BUSINESS_INFO.fullName}
                  </p>
                  <p className="font-body text-sm text-on-surface-variant mt-1 leading-relaxed">
                    {BUSINESS_INFO.address}
                  </p>
                  <span className="font-mono text-xs text-accent-lime mt-1 block">
                    Coordinates: {BUSINESS_INFO.lat} / {BUSINESS_INFO.lon}
                  </span>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="flex items-start gap-3 pt-space-sm border-t border-cold-border">
                <div className="w-10 h-10 rounded bg-surface-container border border-cold-border flex items-center justify-center text-accent-lime shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-headline text-[11px] uppercase tracking-wider text-white font-bold block mb-1">
                    STORE HOURS // WEEKLY CADENCE
                  </span>
                  <div className="flex flex-col gap-1 text-xs text-on-surface-variant font-mono">
                    <div className="flex justify-between gap-4">
                      <span>Mon – Sat:</span>
                      <span className="text-white font-semibold">{BUSINESS_INFO.hours.weekdays}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span>Sunday:</span>
                      <span className="text-white font-semibold">{BUSINESS_INFO.hours.sunday}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Store Lines */}
              <div className="flex items-start gap-3 pt-space-sm border-t border-cold-border">
                <div className="w-10 h-10 rounded bg-surface-container border border-cold-border flex items-center justify-center text-accent-lime shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-headline text-[11px] uppercase tracking-wider text-white font-bold block mb-1">
                    DIRECT ATELIER DESK
                  </span>
                  <a
                    href={`tel:${DISPLAY_PHONE.replace(/\s+/g, '')}`}
                    className="font-headline text-base text-accent-lime font-bold hover:underline"
                  >
                    {DISPLAY_PHONE}
                  </a>
                  <span className="font-body text-xs text-on-surface-variant block mt-0.5">
                    Available for stock queries, knocking schedules &amp; directions.
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-space-md border-t border-cold-border">
              <a
                href={BUSINESS_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded bg-accent-lime text-black font-headline text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 hover:brightness-110 shadow-[0_0_20px_rgba(198,255,53,0.25)] transition-all"
              >
                <Navigation className="w-4 h-4" />
                <span>OPEN IN GOOGLE MAPS</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={getStoreVisitInquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded bg-surface-container hover:bg-surface-bright border border-cold-border text-white font-headline text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-accent-lime" />
                <span>CHAT WITH STORE</span>
              </a>
            </div>
          </div>

          {/* Right Column: Visual Map / Directions Deck (7 cols) */}
          <div className="lg:col-span-7 rounded bg-surface-container-low border border-cold-border p-2 overflow-hidden flex flex-col justify-between shadow-xl min-h-[420px]">
            {/* Map Frame Container */}
            <div className="relative w-full h-full min-h-[380px] rounded overflow-hidden bg-surface-container">
              {/* Responsive Google Maps Iframe using exact location search query */}
              <iframe
                title="K.K. Sports Flagship Store Map"
                src="https://maps.google.com/maps?q=44/319,%20Meston%20Road,%20Parade,%20Kanpur,%20Uttar%20Pradesh%20208001&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(120%)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full min-h-[380px] opacity-80 hover:opacity-100 transition-opacity"
              />

              {/* Map Floating HUD Overlay */}
              <div className="absolute top-4 left-4 p-3 rounded bg-surface-container-lowest/95 backdrop-blur border border-cold-border shadow-xl pointer-events-none max-w-xs">
                <span className="font-headline text-[10px] uppercase tracking-widest text-accent-lime block mb-0.5">
                  FLAGSHIP PINPOINT
                </span>
                <p className="font-headline text-xs text-white uppercase font-bold leading-snug">
                  44/319, MESTON ROAD, PARADE
                </p>
                <span className="font-mono text-[10px] text-on-surface-variant block mt-0.5">
                  Near Parade Chauraha • Kanpur 208001
                </span>
              </div>

              {/* Direct Open in Maps overlay trigger */}
              <a
                href={BUSINESS_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 px-3 py-1.5 rounded bg-surface-container-lowest/95 backdrop-blur border border-accent-lime/40 text-accent-lime hover:bg-accent-lime hover:text-black font-headline text-[11px] uppercase tracking-wider font-bold transition-all flex items-center gap-1.5 shadow-lg"
              >
                <span>Full Directions</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
