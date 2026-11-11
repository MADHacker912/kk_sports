import React, { useState, useEffect, useRef } from 'react';
import { getProductInquiryUrl } from '../utils/whatsapp';
import { RotateCw, MessageSquare, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AngleProfile {
  angle: number;
  label: string;
  title: string;
  description: string;
  metric: string;
}

const ANGLE_PROFILES: AngleProfile[] = [
  {
    angle: 0,
    label: '0° Front Face',
    title: 'Unbleached Straight Grain Face',
    description: '10 to 12 razor-straight, unbroken grains across the primary driving zone. Sussex Grade-1 English Willow naturally seasoned in controlled humidity.',
    metric: '10–12 Straight Grains // Unblemished Driving Zone',
  },
  {
    angle: 90,
    label: '90° Edge Profile',
    title: '40mm Contoured Power Edges',
    description: 'Generous 39-41mm edges providing maximum mass and forgiveness on off-center toe cuts and power drives through cover.',
    metric: '40mm Power Edge // Feathered Duckbill Profile',
  },
  {
    angle: 180,
    label: '180° Spine Contour',
    title: 'Mid-to-Low Power Bulge',
    description: 'Spine calibrated for sub-continent bounce and low-maintenance turf tracks. Maximum mass concentrated directly behind the sweet spot.',
    metric: '64mm Peak Spine // Counter-Balanced Pickup',
  },
  {
    angle: 270,
    label: '270° Cane Handle',
    title: '9-Piece Singapore Cane Handle',
    description: 'Triple rubber-cushioned spring laminate handle wrapped in soft chevron traction grip for superior vibration suppression.',
    metric: 'Triple Rubber Cushion // Zero Sting Resonance',
  },
];

export const AeroStrike360Viewer: React.FC = () => {
  const [currentAngleIndex, setCurrentAngleIndex] = useState(0);
  const [selectedWeight, setSelectedWeight] = useState('1,080g');
  const [knockingOption, setKnockingOption] = useState<'laser' | 'standard'>('laser');

  const containerRef = useRef<HTMLElement>(null);
  const pinContentRef = useRef<HTMLDivElement>(null);
  const batImgRef = useRef<HTMLImageElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const activeProfile = ANGLE_PROFILES[currentAngleIndex];
  const rotationDeg = activeProfile.angle;

  const inquiryUrl = getProductInquiryUrl(
    `Aero-Strike Pro Cricket Bat (${activeProfile.label}, Weight: ${selectedWeight}, Knocking: ${knockingOption === 'laser' ? 'Laser Pro' : 'Standard'})`
  );

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDesktop = window.innerWidth >= 1024;

    if (prefersReducedMotion || !isDesktop || !containerRef.current || !pinContentRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      // Pinned Scroll Storytelling Timeline
      ScrollTrigger.create({
        trigger: containerRef.current,
        pin: pinContentRef.current,
        start: 'top top',
        end: '+=2000',
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;

          // Update progress bar
          if (progressBarRef.current) {
            progressBarRef.current.style.width = `${Math.min(100, Math.max(0, progress * 100))}%`;
          }

          // Smooth continuous bat rotation from 0 to 360 deg
          const deg = progress * 360;
          if (batImgRef.current) {
            batImgRef.current.style.transform = `rotateY(${deg}deg) rotateZ(${Math.sin(progress * Math.PI * 2) * -2}deg)`;
          }

          // Select profile index based on progress quarters (0..3)
          const newIdx = Math.min(3, Math.floor(progress * 4));
          setCurrentAngleIndex(newIdx);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="signature-atelier"
      ref={containerRef}
      className="relative w-full bg-[#F0EFE9] border-b border-[#E7E5DE] overflow-hidden"
    >
      <div
        ref={pinContentRef}
        className="w-full min-h-screen py-16 lg:py-24 px-4 sm:px-6 lg:px-8 flex flex-col justify-center"
      >
        <div className="max-w-7xl mx-auto w-full flex flex-col gap-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E7E5DE] pb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#66785F] font-semibold">
                  SIGNATURE ATELIER // PINNED STORYTELLING
                </span>
                <span className="hidden lg:inline-flex font-mono text-[11px] text-[#77776F] bg-white px-2.5 py-0.5 rounded border border-[#E7E5DE]">
                  Scroll to Inspect (360°)
                </span>
              </div>
              <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#242720]">
                Aero-Strike Pro Studio
              </h2>
            </div>
            <p className="font-body text-sm sm:text-base text-[#77776F] max-w-md leading-relaxed">
              Every grain, contour, and balance point inspected in studio lighting. Hand-selected Sussex Grade-1 English Willow.
            </p>
          </div>

          {/* Interactive Scroll Progress Indicator (desktop) */}
          <div className="w-full bg-[#E7E5DE] h-1 rounded-full overflow-hidden">
            <div
              ref={progressBarRef}
              className="bg-[#66785F] h-full w-0 transition-all duration-150"
            />
          </div>

          {/* 360 Split Stage */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Interactive Bat Stage (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="relative w-full aspect-[4/5] sm:aspect-square bg-white rounded-2xl border border-[#E7E5DE] p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-sm">
                {/* Studio Header Bar */}
                <div className="flex items-center justify-between text-xs z-10">
                  <span className="font-body text-xs text-[#77776F] flex items-center gap-1.5">
                    <RotateCw className="w-3.5 h-3.5 text-[#66785F] animate-[spin_8s_linear_infinite]" />
                    Angle: <span className="text-[#242720] font-semibold">{activeProfile.label}</span>
                  </span>
                  <span className="font-mono text-[11px] uppercase px-2.5 py-1 rounded bg-[#F0EFE9] text-[#66785F] font-semibold">
                    Sussex Grade-1 Willow
                  </span>
                </div>

                {/* Bat Presentation with Smooth CSS / GSAP Rotation */}
                <div className="relative flex-1 flex items-center justify-center py-4 perspective-[1000px]">
                  <img
                    ref={batImgRef}
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIpwHpkeSILKoWrlSa4ZzdnwoQC4EegQ25LhWnVuQO2NZnC1ArZrnX86w8RXD4PB8yLGaE_bFcFGrhm4n-5OhvS2-E-5HHuUjx0i0vKPwMOv6o1nVIaALPaabKTICVPmJUEG3GmckAKwr2GDQOUm0Y37U9ZBYU0TTV87s4FBkAR8fhxshdQ-wAy5XZyEm3DpUxrKMxtu4PUPS-OOm_yWJm4Q4DdbjyCm73Ca8kuzdP"
                    alt="Aero-Strike Pro Cricket Bat 360 View"
                    className="max-h-[85%] w-auto object-contain transition-transform duration-300 filter contrast-[1.02] will-change-transform"
                    style={{
                      transform: `rotateY(${rotationDeg}deg)`,
                    }}
                  />

                  {/* Subtle metric pill */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-white/95 border border-[#E7E5DE] font-body text-xs text-[#77776F] shadow-sm whitespace-nowrap">
                    {activeProfile.metric}
                  </div>
                </div>

                {/* Angle Selector Tabs */}
                <div className="grid grid-cols-4 gap-2 pt-4 border-t border-[#E7E5DE] z-10">
                  {ANGLE_PROFILES.map((p, idx) => (
                    <button
                      key={p.angle}
                      onClick={() => setCurrentAngleIndex(idx)}
                      className={`py-2 text-center rounded-md font-headline text-xs transition-all border ${
                        currentAngleIndex === idx
                          ? 'bg-[#242720] text-white border-[#242720] font-semibold shadow-sm'
                          : 'bg-[#F0EFE9] hover:bg-[#E7E5DE] text-[#77776F] hover:text-[#242720] border-[#E7E5DE]'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Spec Sheet & Craft Options (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Active Angle Description */}
              <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E7E5DE] flex flex-col gap-3 shadow-sm transition-all duration-300">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#66785F] font-semibold">
                    CRAFT ANALYSIS // STAGE {currentAngleIndex + 1} OF 4
                  </span>
                  <span className="font-mono text-xs text-[#77776F]">
                    {activeProfile.angle}° Rotation
                  </span>
                </div>
                <h3 className="font-headline text-2xl font-bold tracking-tight text-[#242720]">
                  {activeProfile.title}
                </h3>
                <p className="font-body text-sm text-[#77776F] leading-relaxed">
                  {activeProfile.description}
                </p>
              </div>

              {/* Preparation Options */}
              <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E7E5DE] flex flex-col gap-5 shadow-sm">
                <span className="font-headline text-sm uppercase tracking-wider text-[#242720] font-bold">
                  Match Preparation Spec
                </span>

                {/* Weight Selector */}
                <div>
                  <label className="font-body text-xs text-[#77776F] block mb-2 font-medium">
                    Select Match Weight
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['1,070g (Light)', '1,080g (Balanced)', '1,120g (Heavy)'].map((weight) => (
                      <button
                        key={weight}
                        onClick={() => setSelectedWeight(weight.split(' ')[0])}
                        className={`py-2 px-2 rounded-md text-center font-body text-xs border transition-all ${
                          selectedWeight === weight.split(' ')[0]
                            ? 'bg-[#242720] text-white border-[#242720] font-semibold'
                            : 'bg-[#F0EFE9] text-[#77776F] border-[#E7E5DE] hover:border-[#242720]'
                        }`}
                      >
                        {weight}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Knocking Preparation */}
                <div>
                  <label className="font-body text-xs text-[#77776F] block mb-2 font-medium">
                    Knocking Preparation
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setKnockingOption('laser')}
                      className={`p-3 rounded-md text-left border flex flex-col gap-0.5 transition-all ${
                        knockingOption === 'laser'
                          ? 'bg-[#F8F7F3] border-[#66785F] text-[#242720]'
                          : 'bg-[#F0EFE9] border-[#E7E5DE] text-[#77776F] hover:border-[#66785F]'
                      }`}
                    >
                      <span className="font-headline text-xs font-semibold">Digital Knocking Lab</span>
                      <span className="font-body text-[11px] text-[#77776F]">15,000 auto calibrated strikes</span>
                    </button>

                    <button
                      onClick={() => setKnockingOption('standard')}
                      className={`p-3 rounded-md text-left border flex flex-col gap-0.5 transition-all ${
                        knockingOption === 'standard'
                          ? 'bg-[#F8F7F3] border-[#66785F] text-[#242720]'
                          : 'bg-[#F0EFE9] border-[#E7E5DE] text-[#77776F] hover:border-[#66785F]'
                      }`}
                    >
                      <span className="font-headline text-xs font-semibold">Natural Oil & Hand Edge</span>
                      <span className="font-body text-[11px] text-[#77776F]">Raw linseed oil curing</span>
                    </button>
                  </div>
                </div>

                {/* Inquiry CTA */}
                <div className="pt-2 flex flex-col gap-2">
                  <a
                    href={inquiryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-md bg-[#242720] text-white font-headline text-sm font-semibold hover:bg-[#66785F] transition-colors shadow-sm"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Inquire Specification on WhatsApp
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <p className="font-body text-[11px] text-center text-[#77776F]">
                    Direct consultation with Kanpur master bat technician.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
