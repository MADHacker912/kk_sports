import React from 'react';
import { ShieldCheck, Cpu, Banknote, Building2, CheckCircle2 } from 'lucide-react';

export const WhyChooseKK: React.FC = () => {
  const pillars = [
    {
      icon: ShieldCheck,
      number: '01',
      title: '100% VERIFIED AUTHENTICITY',
      subtitle: 'ZERO GREY-MARKET INVENTORY',
      description:
        'Direct procurement tie-ups with global and Indian sports manufacturers—SS, SG, Yonex, Cosco, Nivia, Mikasa. Every item is verified with official brand holograms and batch verification.',
    },
    {
      icon: Cpu,
      number: '02',
      title: 'MASTER ATELIER SERVICES',
      subtitle: 'IN-HOUSE GEAR LAB',
      description:
        'Equipped with automated multi-tier bat knocking machines, bone-mallet edge compression, raw linseed oiling, handle re-gripping, and computer-controlled electronic racket stringing up to 32 lbs.',
    },
    {
      icon: Banknote,
      number: '03',
      title: 'KANPUR WHOLESALE ADVANTAGE',
      subtitle: 'DIRECT DISTRIBUTOR ECONOMICS',
      description:
        'Operating from Kanpur’s historic trade quarter at Meston Road, Parade, we offer transparent wholesale prices and bulk volume discounts directly to individual athletes and retail customers.',
    },
    {
      icon: Building2,
      number: '04',
      title: 'INSTITUTIONAL & ACADEMY PARTNER',
      subtitle: 'DEDICATED PROCUREMENT DESK',
      description:
        'End-to-end sports infrastructure partner for schools, colleges, district cricket associations, police training grounds, and corporate fitness facilities with customized quotation support.',
    },
  ];

  return (
    <section
      id="why-choose-us"
      className="w-full bg-surface-container-lowest py-space-xl lg:py-28 px-space-md lg:px-space-xl border-b border-cold-border"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-space-xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md border-b border-cold-border pb-space-lg">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-accent-lime" />
              <span className="font-headline text-[10px] uppercase tracking-[0.25em] text-accent-lime">
                [ PILLARS OF EXCELLENCE // 06 ]
              </span>
            </div>
            <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl uppercase text-white font-bold tracking-tight">
              ENGINEERED FOR VICTORY
            </h2>
          </div>
          <p className="font-body text-sm sm:text-base text-on-surface-variant max-w-md leading-relaxed">
            The foundation of athletic excellence rests on uncompromising authenticity, custom atelier precision, and steadfast player support.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
          {pillars.map((pillar) => {
            const IconComponent = pillar.icon;
            return (
              <div
                key={pillar.number}
                className="group p-space-lg rounded bg-surface-container-low border border-cold-border hover:border-accent-lime transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-space-md">
                    <div className="w-10 h-10 rounded bg-surface-container border border-cold-border flex items-center justify-center text-accent-lime group-hover:scale-110 transition-transform">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs text-on-surface-variant uppercase tracking-widest font-bold">
                      // {pillar.number}
                    </span>
                  </div>

                  <span className="font-mono text-[10px] uppercase tracking-wider text-accent-lime block mb-1">
                    {pillar.subtitle}
                  </span>
                  <h3 className="font-headline text-lg uppercase text-white font-bold tracking-tight mb-2 group-hover:text-accent-lime transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-cold-border/60 flex items-center gap-2 text-xs text-on-surface-variant">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent-lime" />
                  <span className="font-headline uppercase text-[10px] tracking-wider text-white">
                    Verified Standard
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Metrics Banner */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-space-md p-space-lg rounded bg-surface-container border border-cold-border">
          <div className="flex flex-col">
            <span className="font-headline text-2xl sm:text-3xl text-accent-lime font-bold">15,000+</span>
            <span className="font-headline text-xs uppercase text-white tracking-wider font-semibold mt-1">
              Active Stock Units
            </span>
            <span className="font-body text-[11px] text-on-surface-variant">Available for immediate delivery</span>
          </div>

          <div className="flex flex-col">
            <span className="font-headline text-2xl sm:text-3xl text-white font-bold">40+</span>
            <span className="font-headline text-xs uppercase text-white tracking-wider font-semibold mt-1">
              Authorized Brands
            </span>
            <span className="font-body text-[11px] text-on-surface-variant">Direct sourcing partnerships</span>
          </div>

          <div className="flex flex-col">
            <span className="font-headline text-2xl sm:text-3xl text-accent-lime font-bold">100%</span>
            <span className="font-headline text-xs uppercase text-white tracking-wider font-semibold mt-1">
              Original Products
            </span>
            <span className="font-body text-[11px] text-on-surface-variant">Manufacturer authenticity seal</span>
          </div>

          <div className="flex flex-col">
            <span className="font-headline text-2xl sm:text-3xl text-white font-bold">SAME DAY</span>
            <span className="font-headline text-xs uppercase text-white tracking-wider font-semibold mt-1">
              Kanpur Dispatch
            </span>
            <span className="font-body text-[11px] text-on-surface-variant">Express regional logistics</span>
          </div>
        </div>
      </div>
    </section>
  );
};
