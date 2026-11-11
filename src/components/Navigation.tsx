import React, { useState, useEffect } from 'react';
import { DISPLAY_PHONE, getGeneralInquiryUrl } from '../utils/whatsapp';
import { Phone, Search, Menu, X, ArrowUpRight, MessageSquare } from 'lucide-react';

interface NavigationProps {
  onOpenSearch: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onOpenSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'COLLECTION', href: '#featured-collection' },
    { name: 'CRICKET 360°', href: '#aero-strike-360' },
    { name: 'CATEGORIES', href: '#sports-categories' },
    { name: 'ABOUT', href: '#brand-introduction' },
    { name: 'KANPUR STORE', href: '#store-location' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#08090B]/95 backdrop-blur-md border-b border-[#1F2228] py-4'
            : 'bg-transparent border-b border-transparent py-5 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Minimal Wordmark */}
          <a
            href="#"
            className="flex items-center gap-3 group focus-visible:outline-none"
          >
            <div className="flex flex-col">
              <span className="font-headline text-lg sm:text-xl font-bold tracking-tight text-white uppercase group-hover:text-[#C6FF35] transition-colors leading-none">
                K.K. SPORTS
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#A1A1AA] mt-1">
                KANPUR • EST. PARADE
              </span>
            </div>
          </a>

          {/* Desktop Links (Clean Editorial Spacing) */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-headline text-xs uppercase tracking-wider text-[#A1A1AA] hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-3">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              aria-label="Search Catalog"
              className="p-2 text-[#A1A1AA] hover:text-white transition-colors rounded hover:bg-[#17191D]"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Direct Phone Call */}
            <a
              href={`tel:${DISPLAY_PHONE.replace(/\s+/g, '')}`}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded bg-[#17191D] hover:bg-[#1F2228] border border-[#2C3038] text-white font-headline text-xs tracking-wider transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#C6FF35]" />
              <span>{DISPLAY_PHONE}</span>
            </a>

            {/* WhatsApp Direct CTA */}
            <a
              href={getGeneralInquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-white hover:bg-[#C6FF35] text-black font-headline text-xs font-bold uppercase tracking-wider transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Inquire</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
              aria-expanded={mobileMenuOpen}
              className="lg:hidden p-2 text-white hover:text-[#C6FF35] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="fixed top-0 right-0 bottom-0 w-full max-w-xs bg-[#0D0E11] border-l border-[#2C3038] p-6 flex flex-col justify-between overflow-y-auto">
            <div className="flex flex-col gap-8">
              <div className="flex items-center justify-between pt-2">
                <span className="font-headline text-base uppercase font-bold text-white tracking-wider">
                  K.K. SPORTS
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-[#A1A1AA] hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between py-2 text-white font-headline text-sm uppercase tracking-wider hover:text-[#C6FF35] border-b border-[#1F2228] transition-colors"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-4 h-4 text-[#A1A1AA]" />
                  </a>
                ))}
              </nav>
            </div>

            <div className="flex flex-col gap-3 pt-6 border-t border-[#1F2228]">
              <a
                href={getGeneralInquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded bg-[#C6FF35] text-black font-headline text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 text-center"
              >
                <MessageSquare className="w-4 h-4" />
                <span>CHAT ON WHATSAPP</span>
              </a>

              <a
                href={`tel:${DISPLAY_PHONE.replace(/\s+/g, '')}`}
                className="w-full py-3 px-4 rounded bg-[#17191D] border border-[#2C3038] text-white font-headline text-xs uppercase tracking-wider flex items-center justify-center gap-2 text-center"
              >
                <Phone className="w-3.5 h-3.5 text-[#C6FF35]" />
                <span>{DISPLAY_PHONE}</span>
              </a>

              <p className="font-mono text-[10px] text-[#A1A1AA] text-center mt-2">
                44/319, Meston Road, Parade, Kanpur
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
