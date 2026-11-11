import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full bg-[#F8F7F3] pt-28 sm:pt-36 lg:pt-40 pb-16 lg:pb-24 border-b border-[#E7E5DE] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Thoughtful Editorial Copy (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#66785F] mb-4 font-semibold">
              K.K. SPORTS • KANPUR FLAGSHIP
            </span>

            {/* Headline */}
            <h1 className="font-headline text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#242720] leading-[1.05] mb-6">
              Find Your Game.
            </h1>

            {/* Supporting Description */}
            <p className="font-body text-base sm:text-lg text-[#77776F] max-w-lg mb-8 leading-relaxed">
              Explore sports equipment, fitness essentials, games and more at K.K. Sports. North India’s trusted destination for verified athletic gear.
            </p>

            {/* Focused CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#featured-collection"
                className="px-7 py-3.5 rounded-md bg-[#242720] hover:bg-[#66785F] text-white font-headline text-xs sm:text-sm font-semibold tracking-wider transition-colors duration-200 flex items-center gap-2"
              >
                <span>EXPLORE COLLECTION</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#store-location"
                className="px-6 py-3.5 rounded-md bg-[#F0EFE9] hover:bg-[#E7E5DE] text-[#242720] border border-[#E7E5DE] font-headline text-xs sm:text-sm font-semibold tracking-wider transition-colors flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-[#77776F]" />
                <span>VISIT FLAGSHIP STORE</span>
              </a>
            </div>

            {/* Quiet Credential Footnote */}
            <div className="mt-12 pt-6 border-t border-[#E7E5DE] flex items-center gap-6 text-xs text-[#77776F]">
              <span>44/319, Meston Road, Parade</span>
              <span className="w-1 h-1 rounded-full bg-[#E7E5DE]" />
              <span>100% Genuine Direct Import</span>
            </div>
          </div>

          {/* Right Column: Authentic Editorial Sports Photography (6 cols) */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full rounded-lg overflow-hidden bg-[#F0EFE9] border border-[#E7E5DE] shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1531415074868-036b1c57e329?auto=format&fit=crop&w=1400&q=80"
                alt="Athletic preparation and sports equipment in natural sunlight"
                className="w-full h-full object-cover object-center filter contrast-[1.02] hover:scale-102 transition-transform duration-700"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              
              {/* Subtle caption pill */}
              <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded bg-white/90 backdrop-blur-sm border border-[#E7E5DE] text-xs text-[#242720] font-body">
                Curated for competitive athletes &amp; sports enthusiasts
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
