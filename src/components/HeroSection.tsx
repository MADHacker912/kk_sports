import React from 'react';
import { HeroInteractive3D } from './HeroInteractive3D';
import { ArrowRight, MapPin } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full bg-[#08090B] pt-28 sm:pt-36 lg:pt-40 pb-16 lg:pb-24 border-b border-[#1F2228] overflow-hidden">
      {/* Subtle architectural spotlight from top center */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[400px] bg-[radial-gradient(ellipse_at_top,rgba(198,255,53,0.06),transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[520px]">
          {/* Left Column: Bold, Minimal Editorial (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#C6FF35] mb-4 font-semibold">
              AUTHENTIC ATHLETICS // KANPUR FLAGSHIP
            </span>

            {/* Dominant Headline */}
            <h1 className="font-headline text-4xl sm:text-6xl lg:text-7xl uppercase text-white font-bold leading-[0.95] tracking-tight mb-6">
              BUILT FOR <br className="hidden sm:inline" />
              THE PURSUIT.
            </h1>

            {/* Short Supporting Sentence */}
            <p className="font-body text-base sm:text-lg text-[#A1A1AA] max-w-xl mb-8 leading-relaxed">
              North India’s premier destination for genuine tournament-grade cricket willow, match footballs, and professional athletics gear.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#featured-collection"
                className="px-8 py-3.5 rounded bg-white hover:bg-[#C6FF35] text-black font-headline text-xs sm:text-sm uppercase tracking-wider font-bold transition-all duration-200 flex items-center gap-2"
              >
                <span>EXPLORE COLLECTION</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#store-location"
                className="px-6 py-3.5 rounded bg-[#17191D] hover:bg-[#1F2228] text-white border border-[#2C3038] hover:border-white font-headline text-xs sm:text-sm uppercase tracking-wider font-semibold transition-all flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-[#A1A1AA]" />
                <span>VISIT FLAGSHIP STORE</span>
              </a>
            </div>

            {/* Minimal Brand Credential */}
            <div className="mt-12 pt-6 border-t border-[#1F2228] flex items-center gap-6 text-xs text-[#A1A1AA] font-mono">
              <span>EST. MESTON ROAD, PARADE</span>
              <span className="w-1 h-1 rounded-full bg-[#2C3038]" />
              <span>100% DIRECT BRAND IMPORT</span>
            </div>
          </div>

          {/* Right Column: Hero's Central Product Focal Point (5 Cols) */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <HeroInteractive3D />
          </div>
        </div>
      </div>
    </section>
  );
};
