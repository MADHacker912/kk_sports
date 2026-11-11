import React from 'react';
import { BUSINESS_INFO } from '../data/sportsData';
import { getGeneralInquiryUrl, DISPLAY_PHONE } from '../utils/whatsapp';
import { MapPin, Phone, MessageSquare, ArrowUp, Navigation } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-surface-container-lowest border-t border-cold-border pt-space-xl pb-space-lg px-space-md lg:px-space-xl text-on-surface">
      <div className="max-w-7xl mx-auto flex flex-col gap-space-xl">
        {/* Top Brand Statement Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-space-lg border-b border-cold-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded bg-surface-container-high border border-cold-border flex items-center justify-center font-headline font-bold text-accent-lime text-2xl tracking-tighter">
              KK
            </div>
            <div>
              <span className="font-headline text-xl sm:text-2xl font-bold uppercase tracking-tight text-white block">
                {BUSINESS_INFO.fullName}
              </span>
              <span className="font-mono text-xs text-on-surface-variant uppercase tracking-widest">
                MESTON ROAD FLAGSHIP • KANPUR, UP
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <a
              href={getGeneralInquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded bg-accent-lime text-black font-headline text-xs uppercase tracking-wider font-bold flex items-center gap-1.5 hover:brightness-110 shadow-[0_0_15px_rgba(198,255,53,0.2)] transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WHATSAPP SUPPORT</span>
            </a>

            <a
              href={`tel:${DISPLAY_PHONE.replace(/\s+/g, '')}`}
              className="px-4 py-2 rounded bg-surface-container hover:bg-surface-bright border border-cold-border text-white font-headline text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-accent-lime" />
              <span>{DISPLAY_PHONE}</span>
            </a>

            <button
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="p-2 rounded bg-surface-container hover:bg-surface-bright border border-cold-border text-on-surface-variant hover:text-white transition-colors"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4-Column Directory */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Store Location & Timings */}
          <div className="flex flex-col gap-3">
            <span className="font-headline text-xs uppercase tracking-widest text-white font-bold">
              KANPUR FLAGSHIP STORE
            </span>
            <div className="flex items-start gap-2 text-xs text-on-surface-variant leading-relaxed">
              <MapPin className="w-4 h-4 text-accent-lime shrink-0 mt-0.5" />
              <span>{BUSINESS_INFO.address}</span>
            </div>
            <div className="text-xs text-on-surface-variant font-mono mt-1">
              <span className="text-white block font-semibold">Store Operating Hours:</span>
              <span>Mon – Sat: {BUSINESS_INFO.hours.weekdays}</span><br />
              <span>Sun: {BUSINESS_INFO.hours.sunday}</span>
            </div>
            <a
              href={BUSINESS_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-headline text-xs text-accent-lime hover:underline mt-2"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Get Directions on Google Maps</span>
            </a>
          </div>

          {/* Column 2: Sports Categories */}
          <div className="flex flex-col gap-2.5">
            <span className="font-headline text-xs uppercase tracking-widest text-white font-bold">
              EQUIPMENT CATEGORIES
            </span>
            <a href="#featured-collection" className="font-body text-xs text-on-surface-variant hover:text-accent-lime transition-colors">
              Cricket English &amp; Kashmir Willow
            </a>
            <a href="#featured-collection" className="font-body text-xs text-on-surface-variant hover:text-accent-lime transition-colors">
              FIFA Match Quality Footballs
            </a>
            <a href="#featured-collection" className="font-body text-xs text-on-surface-variant hover:text-accent-lime transition-colors">
              Badminton &amp; Tennis Rackets
            </a>
            <a href="#featured-collection" className="font-body text-xs text-on-surface-variant hover:text-accent-lime transition-colors">
              Commercial Gym Dumbbells &amp; Plates
            </a>
            <a href="#featured-collection" className="font-body text-xs text-on-surface-variant hover:text-accent-lime transition-colors">
              Tournament Birch Carrom Boards
            </a>
            <a href="#featured-collection" className="font-body text-xs text-on-surface-variant hover:text-accent-lime transition-colors">
              Roller Skates, Helmets &amp; Toys
            </a>
          </div>

          {/* Column 3: Pro Atelier Workshop Services */}
          <div className="flex flex-col gap-2.5">
            <span className="font-headline text-xs uppercase tracking-widest text-white font-bold">
              PRO ATELIER WORKSHOP
            </span>
            <a href="#aero-strike-360" className="font-body text-xs text-on-surface-variant hover:text-accent-lime transition-colors">
              Automated 15,000-Cycle Machine Knocking
            </a>
            <a href="#aero-strike-360" className="font-body text-xs text-on-surface-variant hover:text-accent-lime transition-colors">
              Linseed Oil Impregnation &amp; Conditioning
            </a>
            <a href="#aero-strike-360" className="font-body text-xs text-on-surface-variant hover:text-accent-lime transition-colors">
              Resin Toe-Guard &amp; Edge Scuff Sheet
            </a>
            <a href="#featured-collection" className="font-body text-xs text-on-surface-variant hover:text-accent-lime transition-colors">
              Electronic Badminton Restringing (up to 32 lbs)
            </a>
            <a href="#featured-collection" className="font-body text-xs text-on-surface-variant hover:text-accent-lime transition-colors">
              Grip Replacement &amp; Counter-balancing
            </a>
          </div>

          {/* Column 4: Institutional Desk */}
          <div className="flex flex-col gap-2.5">
            <span className="font-headline text-xs uppercase tracking-widest text-white font-bold">
              INSTITUTIONAL &amp; WHOLESALE
            </span>
            <a href="#wholesale-institutional" className="font-body text-xs text-on-surface-variant hover:text-accent-lime transition-colors">
              School Sports Annual Consignments
            </a>
            <a href="#wholesale-institutional" className="font-body text-xs text-on-surface-variant hover:text-accent-lime transition-colors">
              Cricket Academy Bulk Ball Barrels
            </a>
            <a href="#wholesale-institutional" className="font-body text-xs text-on-surface-variant hover:text-accent-lime transition-colors">
              College &amp; University Tournaments
            </a>
            <a href="#wholesale-institutional" className="font-body text-xs text-on-surface-variant hover:text-accent-lime transition-colors">
              Corporate Gym Rig Architecture
            </a>
            <a href="#wholesale-institutional" className="font-body text-xs text-on-surface-variant hover:text-accent-lime transition-colors">
              Official Tax GST Invoicing
            </a>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-space-md border-t border-cold-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-on-surface-variant">
          <p className="font-mono text-[11px]">
            © {new Date().getFullYear()} {BUSINESS_INFO.fullName}. All rights reserved. Precision Athletics Division.
          </p>
          <div className="flex items-center gap-6 font-headline text-[11px] uppercase tracking-wider">
            <span className="text-white">Authentic Sports Gear Kanpur</span>
            <span className="text-surface-bright">•</span>
            <a href={BUSINESS_INFO.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-accent-lime">
              Meston Road Parade
            </a>
            <span className="text-surface-bright">•</span>
            <a href={`tel:${DISPLAY_PHONE.replace(/\s+/g, '')}`} className="hover:text-accent-lime">
              {DISPLAY_PHONE}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
