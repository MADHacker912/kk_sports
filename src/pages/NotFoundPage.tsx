import React from 'react';
import { Link } from '../utils/router';
import { getGeneralInquiryUrl } from '../utils/whatsapp';
import { Search, Compass, MessageSquare, ArrowRight, Home } from 'lucide-react';

interface NotFoundPageProps {
  onOpenSearch?: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onOpenSearch }) => {
  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center pt-32 pb-24 px-4 sm:px-6 lg:px-8 bg-[#F8F7F3]">
      <div className="max-w-4xl w-full mx-auto flex flex-col items-center text-center">
        {/* Editorial Sub-badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAE6DC] border border-[#DDD8CC] text-xs font-headline font-semibold text-[#52634B] tracking-wide mb-8">
          <span className="w-2 h-2 rounded-full bg-[#52634B] animate-pulse" />
          <span>MATCHPLAY NOTICE // CODE 404</span>
        </div>

        {/* Bespoke Boundary Marker Graphics */}
        <div className="relative w-full max-w-md h-36 mb-6 flex items-center justify-center">
          {/* Subtle Chalk Line Ground */}
          <div className="absolute inset-x-8 bottom-4 h-[2px] bg-[#DDD8CC] border-b border-dashed border-[#B8B4A8]" />
          
          {/* Large Editorial Watermark 404 */}
          <div className="font-headline text-[110px] sm:text-[140px] font-extrabold tracking-tighter text-[#E6E2D8] select-none leading-none">
            404
          </div>

          {/* Foreground Boundary Marker Flag & Ball Silhouette */}
          <div className="absolute flex items-center gap-4 bg-white/95 backdrop-blur-sm px-5 py-3 rounded-2xl border border-[#DDD8CC] shadow-[0_8px_24px_rgba(39,41,35,0.06)]">
            <div className="w-10 h-10 rounded-xl bg-[#F1EFE8] flex items-center justify-center text-[#52634B]">
              <Compass className="w-5 h-5 stroke-[1.8]" />
            </div>
            <div className="text-left">
              <p className="font-headline text-xs font-bold text-[#272923] tracking-tight uppercase">
                Ball Out of Bounds
              </p>
              <p className="font-body text-[11px] text-[#77776F]">
                Line marker Kanpur • 26.4499° N, 80.3319° E
              </p>
            </div>
          </div>
        </div>

        {/* Editorial Headline */}
        <h1 className="font-headline text-3xl sm:text-5xl font-bold tracking-tight text-[#272923] max-w-2xl mb-4 leading-tight">
          The play has moved. <br className="hidden sm:block" />
          This pitch line is unavailable.
        </h1>

        {/* Supporting Narrative */}
        <p className="font-body text-sm sm:text-base text-[#77776F] max-w-xl mb-10 leading-relaxed">
          The equipment specification, catalog section or URL you requested is no longer at this coordinate. Let us help you rejoin the field with authentic gear.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-14">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#272923] text-white hover:bg-[#3D4037] font-headline text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-sm active:scale-95"
          >
            <Home className="w-4 h-4" />
            <span>Return to Flagship</span>
          </Link>

          {onOpenSearch ? (
            <button
              onClick={onOpenSearch}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-[#272923] hover:bg-[#F1EFE8] border border-[#DDD8CC] font-headline text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-xs active:scale-95"
            >
              <Search className="w-4 h-4 text-[#52634B]" />
              <span>Search Gear & Equipment</span>
            </button>
          ) : (
            <Link
              href="/#featured-collection"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-[#272923] hover:bg-[#F1EFE8] border border-[#DDD8CC] font-headline text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-xs active:scale-95"
            >
              <Search className="w-4 h-4 text-[#52634B]" />
              <span>Browse Collection</span>
            </Link>
          )}

          <a
            href={getGeneralInquiryUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#52634B] text-white hover:bg-[#43523D] font-headline text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-sm active:scale-95"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp Concierge</span>
          </a>
        </div>

        {/* Curated Fallback Directory: 4 Disciplines */}
        <div className="w-full max-w-3xl pt-10 border-t border-[#E2DFD6]">
          <p className="font-headline text-xs uppercase tracking-widest text-[#77776F] font-semibold mb-6">
            Quick Navigators to Active Disciplines
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-left">
            <Link
              href="/atelier"
              className="p-4 rounded-xl bg-white border border-[#DDD8CC] hover:border-[#52634B] hover:shadow-sm transition-all group"
            >
              <span className="font-headline text-xs font-bold text-[#272923] flex items-center justify-between">
                <span>Cricket Atelier</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#52634B] transition-transform group-hover:translate-x-1" />
              </span>
              <p className="font-body text-[11px] text-[#77776F] mt-1.5">
                Knocking lab, balance profiling &amp; SS/SG willow
              </p>
            </Link>

            <Link
              href="/#featured-collection"
              className="p-4 rounded-xl bg-white border border-[#DDD8CC] hover:border-[#52634B] hover:shadow-sm transition-all group"
            >
              <span className="font-headline text-xs font-bold text-[#272923] flex items-center justify-between">
                <span>Racket Sports</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#52634B] transition-transform group-hover:translate-x-1" />
              </span>
              <p className="font-body text-[11px] text-[#77776F] mt-1.5">
                Yonex graphite series &amp; electronic stringing
              </p>
            </Link>

            <Link
              href="/institutional"
              className="p-4 rounded-xl bg-white border border-[#DDD8CC] hover:border-[#52634B] hover:shadow-sm transition-all group"
            >
              <span className="font-headline text-xs font-bold text-[#272923] flex items-center justify-between">
                <span>School Supply</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#52634B] transition-transform group-hover:translate-x-1" />
              </span>
              <p className="font-body text-[11px] text-[#77776F] mt-1.5">
                Bulk institutional kits, GST bills &amp; sports days
              </p>
            </Link>

            <Link
              href="/contact"
              className="p-4 rounded-xl bg-white border border-[#DDD8CC] hover:border-[#52634B] hover:shadow-sm transition-all group"
            >
              <span className="font-headline text-xs font-bold text-[#272923] flex items-center justify-between">
                <span>Kanpur Flagship</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#52634B] transition-transform group-hover:translate-x-1" />
              </span>
              <p className="font-body text-[11px] text-[#77776F] mt-1.5">
                Meston Road, Parade store visit guidelines
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
