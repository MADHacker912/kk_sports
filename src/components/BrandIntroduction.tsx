import React from 'react';
import { Award, Wrench, MapPin } from 'lucide-react';

export const BrandIntroduction: React.FC = () => {
  return (
    <section className="w-full bg-surface py-space-xl lg:py-28 px-space-md lg:px-space-xl border-b border-cold-border">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
        {/* Left Column: Manifesto & Heritage */}
        <div className="lg:col-span-6 flex flex-col">
          <div className="flex items-center gap-2 mb-space-sm">
            <span className="w-2.5 h-2.5 bg-accent-lime" />
            <span className="font-headline text-[10px] sm:text-xs uppercase text-accent-lime tracking-[0.2em]">
              HERITAGE ATELIER // KANPUR
            </span>
          </div>

          <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl uppercase text-white tracking-tight leading-[1.05] mb-space-md">
            MORE THAN JUST EQUIPMENT.<br />
            <span className="text-on-surface-variant">IT’S THE PURSUIT OF</span> MASTERY.
          </h2>

          <p className="font-body text-base sm:text-lg text-on-surface leading-relaxed mb-space-sm">
            Established in the historic sporting epicenter of Meston Road, Parade, K.K. Sports has grown into North India’s defining powerhouse for genuine sports gear, professional athletic systems, and recreational play.
          </p>

          <p className="font-body text-sm sm:text-base text-on-surface-variant leading-relaxed mb-space-lg">
            From supplying hand-selected grade-1 English willow to junior academies across Uttar Pradesh, to equipping university tournaments, municipal stadium turf initiatives, and school physical education programs, our commitment is absolute: authenticity without shortcut, precision without compromise.
          </p>

          {/* Technical Specs Checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md pt-space-md border-t border-cold-border">
            <div className="flex items-start gap-3">
              <Award className="w-5 h-5 text-accent-lime shrink-0 mt-0.5" />
              <div>
                <span className="font-headline text-xs sm:text-sm text-white uppercase font-bold block mb-0.5">
                  AUTHENTIC DIRECT SOURCING
                </span>
                <span className="font-body text-xs text-on-surface-variant leading-normal block">
                  Direct official inventory from SS, SG, Yonex, Cosco, Nivia, Mikasa &amp; leading sports brands.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-accent-lime shrink-0 mt-0.5" />
              <div>
                <span className="font-headline text-xs sm:text-sm text-white uppercase font-bold block mb-0.5">
                  PRO ATELIER SERVICE LAB
                </span>
                <span className="font-body text-xs text-on-surface-variant leading-normal block">
                  Machine bat knocking, raw oiling, binding &amp; electronic computer-controlled racket stringing.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Photo Block */}
        <div className="lg:col-span-6 relative">
          <div className="relative bg-surface-container-low rounded p-2 border border-cold-border overflow-hidden shadow-2xl">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded bg-surface-container-highest">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIsvAA9f0hIEqJ40qFpF_CbxbW_ECiHyqPubY7UXvKZ8Rt7duU405Ew2v0RGO2TmxNMU7Q9LxMvkC8SI2PR142SLGB7SCqsYAaDC0wArmNERns58H3rjpLiiS2FRZjcZrU5i_tdboQZ2HdOfC_f7ZwAL3dLa5td0GoIjxix3mxFdrDnF9eSX81ZJNOCof52gxCJ1wC9RuOU_US0kMSQ490oXHx5oppM4Q83-Rbsxpf"
                alt="K.K. Sports Kanpur Leadership in Athletic Apparel"
                className="w-full h-full object-cover object-top filter grayscale contrast-125 transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent opacity-90" />

              {/* Floating Spec Badge */}
              <div className="absolute top-4 right-4 bg-surface-container-lowest/90 backdrop-blur border border-accent-lime/40 px-3 py-1.5 rounded">
                <span className="font-headline text-[10px] text-accent-lime uppercase tracking-wider font-bold">
                  DIRECTOR’S ARCHIVE // 2025
                </span>
              </div>

              {/* Quote Overlay */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 p-space-md bg-surface-container/95 backdrop-blur-md rounded border border-cold-border">
                <span className="font-headline text-[10px] text-accent-lime uppercase tracking-widest block mb-1">
                  ESTABLISHED PERFORMANCE HERITAGE
                </span>
                <p className="font-headline text-base sm:text-lg text-white uppercase font-bold tracking-tight mb-2">
                  “We equip champions from grassroots cricket pitches to championship turf.”
                </p>
                <div className="flex items-center justify-between font-mono text-[11px] text-on-surface-variant">
                  <span>HEAD GEAR ATELIER // K.K. SPORTS</span>
                  <span className="text-accent-lime font-bold flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> KANPUR, UP
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
