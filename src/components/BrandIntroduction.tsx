import React from 'react';
import { Award, Wrench } from 'lucide-react';

export const BrandIntroduction: React.FC = () => {
  return (
    <section id="brand-introduction" className="w-full bg-[#08090B] py-20 lg:py-32 px-4 sm:px-6 lg:px-8 border-b border-[#1F2228]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Editorial Statement (7 cols) */}
        <div className="lg:col-span-7 flex flex-col">
          <span className="font-mono text-[10px] sm:text-xs uppercase text-[#C6FF35] tracking-[0.25em] mb-4 font-semibold">
            HERITAGE &amp; ATELIER // KANPUR
          </span>

          <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl uppercase text-white font-bold tracking-tight leading-[1.05] mb-6">
            MORE THAN JUST EQUIPMENT. <br />
            <span className="text-[#A1A1AA]">THE PURSUIT OF MASTERY.</span>
          </h2>

          <p className="font-body text-base sm:text-lg text-white/90 leading-relaxed mb-4">
            Established in the historic sporting epicenter of Meston Road, Parade, K.K. Sports is North India’s defining destination for authentic athletic gear, professional tournament systems, and recreational excellence.
          </p>

          <p className="font-body text-sm sm:text-base text-[#A1A1AA] leading-relaxed mb-8">
            From hand-selected English willow for rising top-order batters across Uttar Pradesh, to equipping university teams, stadium turf programs, and district academies, our focus is absolute: verified manufacturer authenticity and precision preparation.
          </p>

          {/* Clean 2-column Atelier Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-[#1F2228]">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#C6FF35]" />
                <span className="font-headline text-xs uppercase tracking-wider text-white font-bold">
                  DIRECT SOURCING
                </span>
              </div>
              <p className="font-body text-xs text-[#A1A1AA] leading-normal">
                Direct authorized inventory from SS, SG, Yonex, Cosco, Nivia, and Mikasa with official manufacturer holograms.
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <Wrench className="w-4 h-4 text-[#C6FF35]" />
                <span className="font-headline text-xs uppercase tracking-wider text-white font-bold">
                  WORKSHOP ATELIER
                </span>
              </div>
              <p className="font-body text-xs text-[#A1A1AA] leading-normal">
                On-site automated machine bat knocking, raw oiling, toe armor resin, and electronic precision racket stringing.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Confident Editorial Media (5 cols) */}
        <div className="lg:col-span-5 relative">
          <div className="relative aspect-[4/5] w-full rounded bg-[#17191D] border border-[#2C3038] overflow-hidden shadow-2xl">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIsvAA9f0hIEqJ40qFpF_CbxbW_ECiHyqPubY7UXvKZ8Rt7duU405Ew2v0RGO2TmxNMU7Q9LxMvkC8SI2PR142SLGB7SCqsYAaDC0wArmNERns58H3rjpLiiS2FRZjcZrU5i_tdboQZ2HdOfC_f7ZwAL3dLa5td0GoIjxix3mxFdrDnF9eSX81ZJNOCof52gxCJ1wC9RuOU_US0kMSQ490oXHx5oppM4Q83-Rbsxpf"
              alt="K.K. Sports Kanpur Leadership"
              className="w-full h-full object-cover object-top filter grayscale contrast-125 transition-transform duration-700 hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08090B] via-transparent to-transparent opacity-80 pointer-events-none" />

            <div className="absolute bottom-6 left-6 right-6 p-4 rounded bg-[#0D0E11]/90 backdrop-blur border border-[#2C3038]">
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#C6FF35] block mb-1">
                KANPUR FLAGSHIP ATELIER
              </span>
              <p className="font-headline text-sm uppercase text-white font-bold tracking-tight">
                “Grassroots pitches to championship turf.”
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
