import React, { useState, useEffect, useRef } from 'react';
import { getProductInquiryUrl } from '../utils/whatsapp';
import { RotateCw, MessageSquare, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CricketModelViewer } from './3d/CricketModelViewer';

gsap.registerPlugin(ScrollTrigger);

interface AngleProfile {
  angle: number;
  label: string;
  title: string;
  description: string;
  metric: string;
  bgTone: string;
  badgeTone: string;
}

const ANGLE_PROFILES: AngleProfile[] = [
  {
    angle: 0,
    label: '0° Front Face',
    title: 'Unbleached Straight Grain Face',
    description: '10 to 12 razor-straight, unbroken grains across the primary driving zone. Sussex Grade-1 English Willow naturally seasoned in controlled humidity.',
    metric: '10–12 Straight Grains // Unblemished Driving Zone',
    bgTone: '#E7EBE2', // Muted Sage
    badgeTone: 'bg-[#66785F]/15 text-[#3F4F39]',
  },
  {
    angle: 90,
    label: '90° Edge Profile',
    title: '40mm Contoured Power Edges',
    description: 'Generous 39-41mm edges providing maximum mass and forgiveness on off-center toe cuts and power drives through cover.',
    metric: '40mm Power Edge // Feathered Duckbill Profile',
    bgTone: '#E1E7DC', // Soft Leaf Sage
    badgeTone: 'bg-[#506347]/15 text-[#374530]',
  },
  {
    angle: 180,
    label: '180° Spine Contour',
    title: 'Mid-to-Low Power Bulge',
    description: 'Spine calibrated for sub-continent bounce and low-maintenance turf tracks. Maximum mass concentrated directly behind the sweet spot.',
    metric: '64mm Peak Spine // Counter-Balanced Pickup',
    bgTone: '#EAE5DC', // Warm Sand
    badgeTone: 'bg-[#736453]/15 text-[#4E4133]',
  },
  {
    angle: 270,
    label: '270° Cane Handle',
    title: '9-Piece Singapore Cane Handle',
    description: 'Triple rubber-cushioned spring laminate handle wrapped in soft chevron traction grip for superior vibration suppression.',
    metric: 'Triple Rubber Cushion // Zero Sting Resonance',
    bgTone: '#E5E2DA', // Soft Stone
    badgeTone: 'bg-[#596354]/15 text-[#3E453A]',
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
      // Pinned Scroll Storytelling Timeline with progressive background shift
      ScrollTrigger.create({
        trigger: containerRef.current,
        pin: pinContentRef.current,
        start: 'top top',
        end: '+=2200',
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;

          // Update progress bar
          if (progressBarRef.current) {
            progressBarRef.current.style.width = `${Math.min(100, Math.max(0, progress * 100))}%`;
          }

          // Smooth continuous bat rotation
          const deg = progress * 360;
          if (batImgRef.current) {
            batImgRef.current.style.transform = `rotateY(${deg}deg) rotateZ(${Math.sin(progress * Math.PI * 2) * -2}deg)`;
          }

          // Select profile index (0..3)
          const newIdx = Math.min(3, Math.floor(progress * 4));
          setCurrentAngleIndex(newIdx);

          // Gradual background color transition synchronized with scroll
          if (containerRef.current) {
            const tones = ['#E7EBE2', '#E1E7DC', '#EAE5DC', '#E5E2DA'];
            const toneProgress = progress * (tones.length - 1);
            const lowerIdx = Math.floor(toneProgress);
            const upperIdx = Math.min(tones.length - 1, Math.ceil(toneProgress));
            const factor = toneProgress - lowerIdx;

            containerRef.current.style.backgroundColor = factor < 0.5 ? tones[lowerIdx] : tones[upperIdx];
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="signature-atelier"
      ref={containerRef}
      style={{ backgroundColor: activeProfile.bgTone, transition: 'background-color 0.6s ease-out' }}
      className="relative w-full border-b border-[#D8D5CB] overflow-hidden"
    >
      <div
        ref={pinContentRef}
        className="w-full min-h-screen py-16 lg:py-24 px-4 sm:px-6 lg:px-8 flex flex-col justify-center"
      >
        <div className="max-w-7xl mx-auto w-full flex flex-col gap-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#272923]/10 pb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#52634B] font-semibold">
                  SIGNATURE ATELIER // PINNED STORYTELLING
                </span>
                <span className="hidden lg:inline-flex font-mono text-[11px] text-[#272923] bg-white/80 px-2.5 py-0.5 rounded border border-[#272923]/10">
                  Scroll to Inspect (360°)
                </span>
              </div>
              <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#272923]">
                Aero-Strike Pro Studio
              </h2>
            </div>
            <p className="font-body text-sm sm:text-base text-[#77776F] max-w-md leading-relaxed">
              Every grain, contour, and balance point inspected in studio lighting. Hand-selected Sussex Grade-1 English Willow.
            </p>
          </div>

          {/* Interactive Scroll Progress Indicator */}
          <div className="w-full bg-[#272923]/10 h-1 rounded-full overflow-hidden">
            <div
              ref={progressBarRef}
              className="bg-[#52634B] h-full w-0 transition-all duration-150"
            />
          </div>

          {/* 360 Split Stage */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Interactive Bat Stage (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="relative w-full aspect-[4/5] sm:aspect-square min-h-[460px] sm:min-h-[520px] bg-gradient-to-b from-[#FAF9F5] via-[#F4F1EA] to-[#EBE7DD] rounded-2xl border border-[#DDD8CC] p-4 sm:p-6 flex flex-col justify-between overflow-hidden shadow-[0_8px_32px_rgba(39,41,35,0.06)]">
                {/* Subtle radial spotlight overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.7)_0%,transparent_75%)] pointer-events-none" />

                {/* Studio Header Bar */}
                <div className="flex items-center justify-between text-xs z-10">
                  <span className="font-body text-xs text-[#77776F] flex items-center gap-1.5">
                    <RotateCw className="w-3.5 h-3.5 text-[#52634B] animate-[spin_10s_linear_infinite]" />
                    Angle: <span className="text-[#272923] font-semibold">{activeProfile.label}</span>
                  </span>
                  <span className={`font-mono text-[11px] uppercase px-2.5 py-1 rounded ${activeProfile.badgeTone} font-semibold border border-black/5`}>
                    Sussex Grade-1 Willow
                  </span>
                </div>

                {/* Real 3D Cricket Model Presentation with Fallback */}
                <div className="relative flex-1 w-full h-full flex flex-col items-center justify-center py-1">
                  <CricketModelViewer
                    rotationDeg={rotationDeg}
                    fallbackImage="https://lh3.googleusercontent.com/aida-public/AB6AXuAIpwHpkeSILKoWrlSa4ZzdnwoQC4EegQ25LhWnVuQO2NZnC1ArZrnX86w8RXD4PB8yLGaE_bFcFGrhm4n-5OhvS2-E-5HHuUjx0i0vKPwMOv6o1nVIaALPaabKTICVPmJUEG3GmckAKwr2GDQOUm0Y37U9ZBYU0TTV87s4FBkAR8fhxshdQ-wAy5XZyEm3DpUxrKMxtu4PUPS-OOm_yWJm4Q4DdbjyCm73Ca8kuzdP"
                    className="w-full h-full"
                  />

                  {/* Metric pill */}
                  <div className="mt-1 px-3 py-1 rounded-full bg-white/95 border border-[#DDD8CC] font-body text-xs text-[#77776F] shadow-sm whitespace-nowrap z-20">
                    {activeProfile.metric}
                  </div>
                </div>

                {/* Angle Selector Tabs */}
                <div className="grid grid-cols-4 gap-2 pt-4 border-t border-[#DDD8CC] z-10">
                  {ANGLE_PROFILES.map((p, idx) => (
                    <button
                      key={p.angle}
                      onClick={() => setCurrentAngleIndex(idx)}
                      className={`py-2 text-center rounded-lg font-headline text-xs transition-all border ${
                        currentAngleIndex === idx
                          ? 'bg-[#272923] text-white border-[#272923] font-semibold shadow-sm'
                          : 'bg-[#F8F6F0] hover:bg-[#EAE6DC] text-[#77776F] hover:text-[#272923] border-[#DDD8CC]'
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
              <div className="p-6 sm:p-8 rounded-2xl bg-[#FAF9F5] border border-[#DDD8CC] flex flex-col gap-3 shadow-[0_4px_16px_rgba(39,41,35,0.03)] transition-all duration-300">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#52634B] font-semibold">
                    CRAFT ANALYSIS // STAGE {currentAngleIndex + 1} OF 4
                  </span>
                  <span className="font-mono text-xs text-[#77776F]">
                    {activeProfile.angle}° Rotation
                  </span>
                </div>
                <h3 className="font-headline text-2xl font-bold tracking-tight text-[#272923]">
                  {activeProfile.title}
                </h3>
                <p className="font-body text-sm text-[#77776F] leading-relaxed">
                  {activeProfile.description}
                </p>
              </div>

              {/* Preparation Options */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#FAF9F5] border border-[#DDD8CC] flex flex-col gap-5 shadow-[0_4px_16px_rgba(39,41,35,0.03)]">
                <span className="font-headline text-sm uppercase tracking-wider text-[#272923] font-bold">
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
                        className={`py-2 px-2 rounded-lg text-center font-body text-xs border transition-all ${
                          selectedWeight === weight.split(' ')[0]
                            ? 'bg-[#272923] text-white border-[#272923] font-semibold shadow-xs'
                            : 'bg-[#F1EFE8] text-[#77776F] border-[#DDD8CC] hover:border-[#272923]'
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
                      className={`p-3 rounded-lg text-left border flex flex-col gap-0.5 transition-all ${
                        knockingOption === 'laser'
                          ? 'bg-[#F8F7F3] border-[#52634B] text-[#272923] shadow-xs'
                          : 'bg-[#F1EFE8] border-[#DDD8CC] text-[#77776F] hover:border-[#52634B]'
                      }`}
                    >
                      <span className="font-headline text-xs font-semibold">Digital Knocking Lab</span>
                      <span className="font-body text-[11px] text-[#77776F]">15,000 auto calibrated strikes</span>
                    </button>

                    <button
                      onClick={() => setKnockingOption('standard')}
                      className={`p-3 rounded-lg text-left border flex flex-col gap-0.5 transition-all ${
                        knockingOption === 'standard'
                          ? 'bg-[#F8F7F3] border-[#52634B] text-[#272923] shadow-xs'
                          : 'bg-[#F1EFE8] border-[#DDD8CC] text-[#77776F] hover:border-[#52634B]'
                      }`}
                    >
                      <span className="font-headline text-xs font-semibold">Natural Oil &amp; Edge</span>
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
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-lg bg-[#272923] text-white font-headline text-sm font-semibold hover:bg-[#52634B] transition-colors shadow-sm"
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
