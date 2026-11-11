import React, { useState, useEffect } from 'react';
import { DISPLAY_PHONE, getGeneralInquiryUrl } from '../utils/whatsapp';
import { Link, useRouter } from '../utils/router';
import { Phone, Search, Menu, X, ArrowUpRight, MessageSquare, ShieldCheck } from 'lucide-react';

interface NavigationProps {
  onOpenSearch: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onOpenSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { currentPath } = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Collection', href: '/#featured-collection' },
    { name: 'Categories', href: '/#sports-categories' },
    { name: 'Cricket Atelier', href: '/atelier' },
    { name: 'About', href: '/about' },
    { name: 'Institutions', href: '/institutional' },
    { name: 'Kanpur Store', href: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F8F7F3]/95 backdrop-blur-md border-b border-[#E2DFD6] py-3.5 sm:py-4 shadow-[0_2px_12px_rgba(39,41,35,0.04)]'
            : 'bg-[#F8F7F3]/80 backdrop-blur-sm border-b border-transparent py-4 sm:py-6'
        }`}
      >
        {/* Reading progress indicator at top */}
        <div
          className="absolute top-0 left-0 h-[2px] bg-[#52634B] transition-all duration-100 ease-out z-50"
          style={{ width: `${scrollProgress}%` }}
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Logo / Brand Name */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus-visible:outline-none"
          >
            <div className="flex flex-col">
              <span className="font-headline text-lg sm:text-xl font-bold tracking-tight text-[#272923] leading-none transition-transform duration-300 group-hover:-translate-y-0.5">
                K.K. Sports
              </span>
              <span className="font-body text-[11px] tracking-wider text-[#77776F] mt-1">
                Kanpur • Est. Parade
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isCurrent = currentPath === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-body text-xs sm:text-sm transition-colors relative py-1 group ${
                    isCurrent ? 'text-[#52634B] font-semibold' : 'text-[#77776F] hover:text-[#272923]'
                  }`}
                >
                  <span>{link.name}</span>
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] bg-[#52634B] transition-all duration-300 ${
                      isCurrent ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-3">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              aria-label="Search Catalog"
              className="p-2 text-[#77776F] hover:text-[#272923] hover:bg-[#F1EFE8] transition-all rounded-lg active:scale-95"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Direct Telephone */}
            <a
              href={`tel:${DISPLAY_PHONE.replace(/\s+/g, '')}`}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F1EFE8] hover:bg-[#EAE6DC] text-[#272923] border border-[#DDD8CC] font-body text-xs transition-all active:scale-95"
            >
              <Phone className="w-3.5 h-3.5 text-[#52634B]" />
              <span>{DISPLAY_PHONE}</span>
            </a>

            {/* WhatsApp Quick CTA */}
            <a
              href={getGeneralInquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#272923] hover:bg-[#52634B] text-white font-headline text-xs font-semibold tracking-wider transition-all duration-200 active:scale-95 shadow-xs"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Inquire</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
              aria-expanded={mobileMenuOpen}
              className="md:hidden p-2 text-[#272923] hover:bg-[#F1EFE8] transition-colors rounded-lg active:scale-95"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="fixed inset-0 bg-[#272923]/40 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="fixed top-0 right-0 bottom-0 w-full max-w-xs bg-[#F8F7F3] border-l border-[#DDD8CC] p-6 flex flex-col justify-between overflow-y-auto shadow-2xl transition-transform">
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#DDD8CC]">
                <div>
                  <span className="font-headline text-base font-bold text-[#272923]">
                    K.K. Sports
                  </span>
                  <span className="font-body text-[11px] text-[#77776F] block">
                    Games &amp; Toys • Parade Kanpur
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-[#77776F] hover:text-[#272923]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between py-2.5 px-3 rounded-lg text-[#272923] hover:bg-[#F1EFE8] font-headline text-xs font-semibold transition-colors"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-4 h-4 text-[#77776F]" />
                  </Link>
                ))}

                <div className="pt-2 border-t border-[#DDD8CC] mt-2 flex flex-col gap-2">
                  <Link
                    href="/authenticity"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between py-2.5 px-3 rounded-lg text-[#52634B] hover:bg-[#EAE6DC] font-headline text-xs font-semibold transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Authenticity Guide</span>
                    </span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/404"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between py-2 px-3 text-[#77776F] hover:text-[#272923] font-body text-xs transition-colors"
                  >
                    <span>404 Preview</span>
                  </Link>
                </div>
              </nav>
            </div>

            <div className="flex flex-col gap-3 pt-6 border-t border-[#DDD8CC]">
              <a
                href={getGeneralInquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-[#52634B] hover:bg-[#43523D] text-white font-headline text-xs font-semibold flex items-center justify-center gap-2 text-center transition-colors shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={`tel:${DISPLAY_PHONE.replace(/\s+/g, '')}`}
                className="w-full py-2.5 px-4 rounded-xl bg-[#F1EFE8] text-[#272923] font-body text-xs flex items-center justify-center gap-2 text-center border border-[#DDD8CC]"
              >
                <Phone className="w-3.5 h-3.5 text-[#52634B]" />
                <span>{DISPLAY_PHONE}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
