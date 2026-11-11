import React from 'react';
import { BUSINESS_INFO } from '../data/sportsData';
import { getGeneralInquiryUrl, DISPLAY_PHONE } from '../utils/whatsapp';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#08090B] border-t border-[#1F2228] pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-[#A1A1AA]">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Top Minimal Brand & Quick Jump */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-10 border-b border-[#1F2228]">
          <div className="flex flex-col">
            <span className="font-headline text-2xl font-bold uppercase tracking-tight text-white">
              K.K. SPORTS
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#A1A1AA] mt-1">
              GAMES &amp; TOYS • PARADE, KANPUR
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href={getGeneralInquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="font-headline text-xs uppercase tracking-wider text-white hover:text-[#C6FF35] transition-colors"
            >
              WhatsApp Support
            </a>

            <a
              href={`tel:${DISPLAY_PHONE.replace(/\s+/g, '')}`}
              className="font-headline text-xs uppercase tracking-wider text-white hover:text-[#C6FF35] transition-colors"
            >
              {DISPLAY_PHONE}
            </a>

            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="p-2 rounded bg-[#17191D] hover:bg-[#1F2228] border border-[#2C3038] text-white transition-colors"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3-Column Minimal Information Directory */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-xs leading-relaxed">
          {/* Col 1: Location & Hours */}
          <div className="flex flex-col gap-2">
            <span className="font-headline uppercase text-white font-bold tracking-wider">
              Flagship Address
            </span>
            <p>{BUSINESS_INFO.address}</p>
            <p className="font-mono text-[11px] text-[#A1A1AA] mt-1">
              Mon – Sat: {BUSINESS_INFO.hours.weekdays}<br />
              Sunday: {BUSINESS_INFO.hours.sunday}
            </p>
          </div>

          {/* Col 2: Atelier & Supply Services */}
          <div className="flex flex-col gap-2">
            <span className="font-headline uppercase text-white font-bold tracking-wider">
              Atelier &amp; Institutional
            </span>
            <p>15,000-cycle automated bat knocking lab</p>
            <p>Computerized electronic racket restringing</p>
            <p>Wholesale sports equipment for academies and schools</p>
          </div>

          {/* Col 3: Authorized Brands */}
          <div className="flex flex-col gap-2">
            <span className="font-headline uppercase text-white font-bold tracking-wider">
              Authorized Sourcing
            </span>
            <p>Direct brand import with manufacturer holograms: Sareen Sports (SS), Sanspareils Greenlands (SG), Yonex, Cosco, Nivia, and Mikasa.</p>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 border-t border-[#1F2228] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-[#A1A1AA]/80">
          <span>
            © {new Date().getFullYear()} {BUSINESS_INFO.fullName}. All rights reserved.
          </span>
          <span>
            44/319, Meston Road, Parade, Kanpur, UP – 208001
          </span>
        </div>
      </div>
    </footer>
  );
};
