import React from 'react';
import { HeroShaderBackground } from './HeroShaderBackground';
import { HeroInteractive3D } from './HeroInteractive3D';
import { getGeneralInquiryUrl } from '../utils/whatsapp';
import { ArrowRight, MapPin, MessageSquare, CheckCircle2 } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-surface-container-lowest pt-20 border-b border-cold-border min-h-screen flex flex-col justify-between">
      {/* Background WebGL Shader */}
      <HeroShaderBackground />

      {/* Kinetic ambient radial flares */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-accent-lime/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[500px] h-[500px] rounded-full bg-accent-lime/5 blur-[160px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 lg:pt-16 pb-12 flex flex-col justify-between flex-1">
        {/* Top Technical Micro-Labels */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div className="flex items-center gap-2 px-3 py-1 bg-surface-container/80 backdrop-blur rounded border border-cold-border">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-lime animate-ping" />
            <span className="font-headline text-[10px] sm:text-xs uppercase tracking-widest text-accent-lime font-bold">
              EST. KANPUR • ATHLETIC PRO DIVISION
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3 font-mono text-[11px] text-on-surface-variant uppercase tracking-widest">
            <span>LAT: 26.4499° N</span>
            <span className="text-surface-bright">/</span>
            <span>LON: 80.3319° E</span>
            <span className="text-surface-bright">/</span>
            <span className="text-white font-semibold">MESTON ROAD FLAGSHIP</span>
          </div>
        </div>

        {/* Hero Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">
          {/* Left: Editorial Content (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="font-headline text-[10px] sm:text-xs text-accent-lime uppercase tracking-[0.25em] font-bold">
                [ PERFORMANCE PACK // 2025.1 ]
              </span>
            </div>

            <h1 className="font-headline text-4xl sm:text-6xl lg:text-7xl uppercase text-white leading-[0.92] tracking-tighter mb-5">
              BUILT FOR <br />
              THE{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-lime via-white to-primary-fixed-dim drop-shadow-[0_0_35px_rgba(198,255,53,0.35)]">
                GAME.
              </span>
            </h1>

            <p className="font-body text-base sm:text-lg text-on-surface-variant max-w-xl mb-8 leading-relaxed">
              Everything you need to play harder, train smarter, and experience more. North India’s premier destination for high-performance athletic gear, pro equipment, and recreational excellence.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#featured-collection"
                className="group px-7 py-3.5 bg-accent-lime text-black font-headline text-xs sm:text-sm uppercase tracking-wider rounded font-bold transition-all duration-300 hover:brightness-110 shadow-[0_0_24px_rgba(198,255,53,0.3)] flex items-center gap-2.5"
              >
                <span>EXPLORE COLLECTION</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              <a
                href="#kanpur-flagship"
                className="px-6 py-3.5 bg-surface-container/70 hover:bg-surface-container text-white font-headline text-xs sm:text-sm uppercase tracking-wider rounded border border-cold-border hover:border-accent-lime transition-all flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-accent-lime" />
                <span>VISIT OUR STORE</span>
              </a>

              <a
                href={getGeneralInquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 bg-surface-container-high hover:bg-surface-bright text-accent-lime font-headline text-xs sm:text-sm uppercase tracking-wider rounded border border-accent-lime/40 transition-all flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WHATSAPP CHAT</span>
              </a>
            </div>

            {/* Quick Badges Bar */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 mt-10 pt-6 border-t border-cold-border">
              <div className="flex flex-col">
                <span className="font-headline text-[10px] text-accent-lime uppercase tracking-wider font-bold">
                  STANDARD
                </span>
                <span className="font-headline text-sm sm:text-base text-white font-bold">
                  100% AUTHENTIC
                </span>
                <span className="font-body text-[11px] text-on-surface-variant">Pro Tour Certified</span>
              </div>

              <div className="flex flex-col">
                <span className="font-headline text-[10px] text-accent-lime uppercase tracking-wider font-bold">
                  SCALE
                </span>
                <span className="font-headline text-sm sm:text-base text-white font-bold">
                  B2B &amp; RETAIL
                </span>
                <span className="font-body text-[11px] text-on-surface-variant">Academies &amp; Clubs</span>
              </div>

              <div className="flex flex-col">
                <span className="font-headline text-[10px] text-accent-lime uppercase tracking-wider font-bold">
                  NETWORK
                </span>
                <span className="font-headline text-sm sm:text-base text-white font-bold">
                  KANPUR HUB
                </span>
                <span className="font-body text-[11px] text-on-surface-variant">Same-Day Dispatch</span>
              </div>
            </div>
          </div>

          {/* Right: Interactive 3D Composite Showcase (5 cols) */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <HeroInteractive3D />
          </div>
        </div>

        {/* Bottom Metric Ticker Bar */}
        <div className="w-full mt-10 pt-6 border-t border-cold-border flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-headline text-lg sm:text-xl font-bold text-white">15,000+</span>
            <span className="font-headline text-[10px] sm:text-xs uppercase text-on-surface-variant tracking-wider">
              EQUIPMENT UNITS IN STOCK
            </span>
          </div>

          <div className="hidden md:block w-px h-6 bg-cold-border" />

          <div className="flex items-center gap-3">
            <span className="font-headline text-lg sm:text-xl font-bold text-white">40+</span>
            <span className="font-headline text-[10px] sm:text-xs uppercase text-on-surface-variant tracking-wider">
              GLOBAL &amp; INDIAN SPORT BRANDS
            </span>
          </div>

          <div className="hidden md:block w-px h-6 bg-cold-border" />

          <div className="flex items-center gap-3">
            <span className="font-headline text-lg sm:text-xl font-bold text-accent-lime">MESTON ROAD</span>
            <span className="font-headline text-[10px] sm:text-xs uppercase text-on-surface-variant tracking-wider">
              KANPUR FLAGSHIP DISPENSARY
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 text-accent-lime font-headline text-xs font-bold">
            <CheckCircle2 className="w-4 h-4" />
            <span className="uppercase tracking-widest">OFFICIAL UP DISTRIBUTOR</span>
          </div>
        </div>
      </div>
    </section>
  );
};
