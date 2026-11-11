import React from 'react';
import { BUSINESS_INFO } from '../data/sportsData';
import { getGeneralInquiryUrl, DISPLAY_PHONE } from '../utils/whatsapp';
import { Link } from '../utils/router';
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
            <Link href="/" className="font-headline text-2xl font-bold tracking-tight text-[#F8F7F3] hover:text-[#9BB094] transition-colors">
              K.K. Sports
            </Link>
            <span className="font-body text-xs text-[#A6A49B] mt-1">
              Games &amp; Toys • 44/319, Meston Road, Parade, Kanpur
            </span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
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

        {/* 4-Column Directory */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-xs leading-relaxed">
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
            <Link
              href="/contact"
              className="text-[#9BB094] hover:text-[#F8F7F3] font-medium mt-2 transition-colors inline-flex items-center gap-1"
            >
              <span>Visit &amp; Directions</span>
              <span>→</span>
            </Link>
          </div>

          {/* Column 2: Workshop Atelier */}
          <div className="flex flex-col gap-2">
            <span className="font-headline font-bold text-[#F8F7F3] text-sm">
              Atelier &amp; Preparation
            </span>
            <Link href="/atelier" className="hover:text-[#F8F7F3] transition-colors">
              15,000-Cycle Machine Bat Knocking
            </Link>
            <Link href="/atelier" className="hover:text-[#F8F7F3] transition-colors">
              Electronic Racket Restringing
            </Link>
            <Link href="/atelier" className="hover:text-[#F8F7F3] transition-colors">
              Toe Guard &amp; Scuff Sheet Bonding
            </Link>
            <Link href="/atelier" className="hover:text-[#F8F7F3] transition-colors">
              Cane Handle Balance Optimization
            </Link>
          </div>

          {/* Column 3: Custom Pages & Institutional */}
          <div className="flex flex-col gap-2">
            <span className="font-headline font-bold text-[#F8F7F3] text-sm">
              Explore &amp; Custom Pages
            </span>
            <Link href="/about" className="hover:text-[#F8F7F3] transition-colors">
              Our Heritage &amp; Ethos
            </Link>
            <Link href="/institutional" className="hover:text-[#F8F7F3] transition-colors">
              Schools &amp; Academy Bulk Supply
            </Link>
            <Link href="/authenticity" className="hover:text-[#F8F7F3] transition-colors">
              Anti-Counterfeit &amp; Hologram Guide
            </Link>
            <Link href="/contact" className="hover:text-[#F8F7F3] transition-colors">
              Store Contact &amp; Inquiry Desk
            </Link>
            <Link href="/404" className="text-[#7A7870] hover:text-[#F8F7F3] transition-colors">
              404 Page Preview
            </Link>
          </div>

          {/* Column 4: Authorized Distribution & Trust */}
          <div className="flex flex-col gap-2">
            <span className="font-headline font-bold text-[#F8F7F3] text-sm">
              Authorized Brands
            </span>
            <p>Direct verified sourcing from SS (Sareen Sports), SG (Sanspareils Greenlands), Yonex Sunrise, Cosco, and Nivia.</p>
            <div className="mt-3 pt-3 border-t border-[#34382E] flex flex-col gap-1.5 text-[11px]">
              <Link href="/terms" className="hover:text-[#F8F7F3] transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy" className="hover:text-[#F8F7F3] transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 border-t border-[#34382E] flex flex-col sm:flex-row items-center justify-between gap-4 font-body text-xs text-[#7A7870]">
          <span>
            © {new Date().getFullYear()} {BUSINESS_INFO.fullName}. All rights reserved.
          </span>
          <div className="flex items-center gap-6">
            <Link href="/authenticity" className="hover:text-[#A6A49B] transition-colors">
              100% Genuine Certified
            </Link>
            <Link href="/terms" className="hover:text-[#A6A49B] transition-colors">
              Store Policies
            </Link>
            <span>
              Parade, Kanpur, UP – 208001
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
