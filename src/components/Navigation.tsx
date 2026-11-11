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
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'COLLECTION', href: '#featured-collection' },
    { name: 'CRICKET 360°', href: '#aero-strike-360' },
    { name: 'CATEGORIES', href: '#categories-grid' },
    { name: 'HERITAGE & WHY', href: '#why-choose-us' },
    { name: 'KANPUR STORE', href: '#kanpur-flagship' },
    { name: 'WHOLESALE & B2B', href: '#wholesale-institutional' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-surface-container-lowest/95 backdrop-blur-xl border-b border-cold-border shadow-[0_4px_24px_rgba(0,0,0,0.6)]'
            : 'bg-surface-container-lowest/80 backdrop-blur-md border-b border-cold-border/60'
        }`}
      >
        <div className="h-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Brand Logo & Title */}
          <a
            href="#"
            className="flex items-center gap-3 shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-lime rounded"
          >
            <div className="w-10 h-10 rounded bg-surface-container-high border border-cold-border flex items-center justify-center font-headline font-bold text-accent-lime text-xl tracking-tighter">
              KK
            </div>
            <div className="flex flex-col">
              <span className="font-headline text-lg sm:text-xl font-bold uppercase tracking-tight text-white leading-none">
                K.K. Sports
              </span>
              <span className="font-headline text-[10px] sm:text-[11px] uppercase tracking-widest text-on-surface-variant leading-none mt-1">
                Games &amp; Toys • Kanpur
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-headline text-xs uppercase tracking-wider text-on-surface-variant hover:text-white transition-colors py-2 relative group focus-visible:outline-none focus-visible:text-accent-lime"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-lime transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Live Store Status Indicator */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded bg-surface-container border border-cold-border">
              <span className="w-2 h-2 rounded-full bg-accent-lime animate-pulse shadow-[0_0_8px_#C6FF35]" />
              <span className="font-headline text-[10px] uppercase tracking-wider text-white">
                MESTON RD • OPEN
              </span>
            </div>

            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              aria-label="Search Products"
              className="p-2 text-on-surface-variant hover:text-white transition-colors flex items-center justify-center rounded hover:bg-surface-container"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Quick Phone Call Button */}
            <a
              href={`tel:${DISPLAY_PHONE.replace(/\s+/g, '')}`}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded bg-surface-container hover:bg-surface-bright text-white font-headline text-xs tracking-wider border border-cold-border hover:border-accent-lime transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-accent-lime" />
              <span>{DISPLAY_PHONE}</span>
            </a>

            {/* WhatsApp Quick CTA */}
            <a
              href={getGeneralInquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded bg-accent-lime text-black font-headline text-xs font-bold uppercase tracking-wider hover:brightness-110 shadow-[0_0_15px_rgba(198,255,53,0.2)] transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Chat</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Mobile Menu"
              aria-expanded={mobileMenuOpen}
              className="xl:hidden p-2 text-white hover:text-accent-lime transition-colors rounded hover:bg-surface-container"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 xl:hidden">
          {/* Overlay backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="fixed top-20 right-0 bottom-0 w-full max-w-sm bg-surface-container-low border-l border-cold-border p-6 flex flex-col justify-between overflow-y-auto shadow-2xl">
            <div className="flex flex-col gap-6">
              {/* Store status in mobile drawer */}
              <div className="flex items-center justify-between p-3 rounded bg-surface-container border border-cold-border">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-accent-lime animate-pulse" />
                  <span className="font-headline text-xs uppercase font-bold text-white">
                    KANPUR STORE OPEN TODAY
                  </span>
                </div>
                <span className="font-mono text-[10px] text-on-surface-variant">10 AM – 9 PM</span>
              </div>

              {/* Navigation links */}
              <nav className="flex flex-col gap-2">
                <span className="font-headline text-[10px] uppercase tracking-widest text-accent-lime mb-1">
                  SECTIONS &amp; DEPARTMENTS
                </span>
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={handleLinkClick}
                    className="flex items-center justify-between p-3 rounded bg-surface-container/60 hover:bg-surface-container border border-cold-border/50 text-white font-headline text-sm uppercase tracking-wider transition-colors"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-4 h-4 text-accent-lime" />
                  </a>
                ))}
              </nav>
            </div>

            {/* Bottom Actions inside drawer */}
            <div className="flex flex-col gap-3 pt-6 border-t border-cold-border">
              <a
                href={getGeneralInquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded bg-accent-lime text-black font-headline text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(198,255,53,0.25)]"
              >
                <MessageSquare className="w-4 h-4" />
                <span>INQUIRE VIA WHATSAPP</span>
              </a>

              <a
                href={`tel:${DISPLAY_PHONE.replace(/\s+/g, '')}`}
                className="w-full py-3 px-4 rounded bg-surface-container hover:bg-surface-bright border border-cold-border text-white font-headline text-xs uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-accent-lime" />
                <span>CALL: {DISPLAY_PHONE}</span>
              </a>

              <p className="text-center font-mono text-[10px] text-on-surface-variant mt-2">
                44/319, Meston Road, Parade, Kanpur – 208001
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
