import React from 'react';
import { BUSINESS_INFO } from '../data/sportsData';
import { getGeneralInquiryUrl, DISPLAY_PHONE } from '../utils/whatsapp';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#F0EFE9] border-t border-[#E7E5DE] pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-[#77776F]">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Top Minimal Brand & Contact Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-10 border-b border-[#E7E5DE]">
          <div className="flex flex-col">
            <span className="font-headline text-2xl font-bold tracking-tight text-[#242720]">
              K.K. Sports
            </span>
            <span className="font-body text-xs text-[#77776F] mt-1">
              Games &amp; Toys • Meston Road, Parade, Kanpur
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href={getGeneralInquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-xs font-semibold text-[#242720] hover:text-[#66785F] transition-colors"
            >
              WhatsApp Support
            </a>

            <a
              href={`tel:${DISPLAY_PHONE.replace(/\s+/g, '')}`}
              className="font-body text-xs font-semibold text-[#242720] hover:text-[#66785F] transition-colors"
            >
              {DISPLAY_PHONE}
            </a>

            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="p-2 rounded-md bg-white hover:bg-[#E7E5DE] border border-[#E7E5DE] text-[#242720] transition-colors shadow-sm"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3-Column Minimal Directory */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-xs leading-relaxed">
          {/* Column 1: Store Location */}
          <div className="flex flex-col gap-2">
            <span className="font-headline font-bold text-[#242720] text-sm">
              Kanpur Flagship
            </span>
            <p>{BUSINESS_INFO.address}</p>
            <p className="font-body text-xs text-[#77776F] mt-1">
              Mon – Sat: {BUSINESS_INFO.hours.weekdays}<br />
              Sunday: {BUSINESS_INFO.hours.sunday}
            </p>
          </div>

          {/* Column 2: Workshop Atelier */}
          <div className="flex flex-col gap-2">
            <span className="font-headline font-bold text-[#242720] text-sm">
              Atelier &amp; Preparation
            </span>
            <p>15,000-cycle automated bat knocking lab</p>
            <p>Electronic badminton racket restringing</p>
            <p>Institutional kit supply for schools &amp; academies</p>
          </div>

          {/* Column 3: Authorized Brands */}
          <div className="flex flex-col gap-2">
            <span className="font-headline font-bold text-[#242720] text-sm">
              Authorized Distribution
            </span>
            <p>Official sourcing: SS (Sareen Sports), SG (Sanspareils Greenlands), Yonex, Cosco, Nivia, and Mikasa with manufacturer verification.</p>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 border-t border-[#E7E5DE] flex flex-col sm:flex-row items-center justify-between gap-4 font-body text-xs text-[#77776F]">
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
