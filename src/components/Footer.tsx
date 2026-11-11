import React from 'react';
import { BUSINESS_INFO } from '../data/sportsData';
import { getGeneralInquiryUrl, DISPLAY_PHONE } from '../utils/whatsapp';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#21231D] border-t border-[#34382E] pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-[#A6A49B]">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Top Minimal Brand & Contact Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-10 border-b border-[#34382E]">
          <div className="flex flex-col">
            <span className="font-headline text-2xl font-bold tracking-tight text-[#F8F7F3]">
              K.K. Sports
            </span>
            <span className="font-body text-xs text-[#A6A49B] mt-1">
              Games &amp; Toys • Meston Road, Parade, Kanpur
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href={getGeneralInquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-xs font-semibold text-[#F8F7F3] hover:text-[#9BB094] transition-colors"
            >
              WhatsApp Support
            </a>

            <a
              href={`tel:${DISPLAY_PHONE.replace(/\s+/g, '')}`}
              className="font-body text-xs font-semibold text-[#F8F7F3] hover:text-[#9BB094] transition-colors"
            >
              {DISPLAY_PHONE}
            </a>

            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="p-2 rounded-lg bg-[#2E3128] hover:bg-[#3D4235] border border-[#3E4334] text-[#F8F7F3] transition-colors shadow-sm"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3-Column Minimal Directory */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-xs leading-relaxed">
          {/* Column 1: Store Location */}
          <div className="flex flex-col gap-2">
            <span className="font-headline font-bold text-[#F8F7F3] text-sm">
              Kanpur Flagship
            </span>
            <p className="text-[#A6A49B]">{BUSINESS_INFO.address}</p>
            <p className="font-body text-xs text-[#A6A49B] mt-1">
              Mon – Sat: {BUSINESS_INFO.hours.weekdays}<br />
              Sunday: {BUSINESS_INFO.hours.sunday}
            </p>
          </div>

          {/* Column 2: Workshop Atelier */}
          <div className="flex flex-col gap-2">
            <span className="font-headline font-bold text-[#F8F7F3] text-sm">
              Atelier &amp; Preparation
            </span>
            <p>15,000-cycle automated bat knocking lab</p>
            <p>Electronic badminton racket restringing</p>
            <p>Institutional kit supply for schools &amp; academies</p>
          </div>

          {/* Column 3: Authorized Brands */}
          <div className="flex flex-col gap-2">
            <span className="font-headline font-bold text-[#F8F7F3] text-sm">
              Authorized Distribution
            </span>
            <p>Official sourcing: SS (Sareen Sports), SG (Sanspareils Greenlands), Yonex, Cosco, Nivia, and Mikasa with manufacturer verification.</p>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 border-t border-[#34382E] flex flex-col sm:flex-row items-center justify-between gap-4 font-body text-xs text-[#7A7870]">
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
