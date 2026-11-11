import React, { useState } from 'react';
import { getProductInquiryUrl } from '../utils/whatsapp';
import { RotateCw, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';

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
    description: '10 to 12 razor-straight, unbroken grains across the strike zone. Sussex Grade-1 English Willow naturally seasoned in controlled humidity.',
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

  const activeProfile = ANGLE_PROFILES[currentAngleIndex];
  const rotationDeg = activeProfile.angle;

  const inquiryUrl = getProductInquiryUrl(
    `Aero-Strike Pro Cricket Bat (${activeProfile.label}, Weight: ${selectedWeight}, Knocking: ${knockingOption === 'laser' ? 'Laser Pro' : 'Standard'})`
  );

  return (
    <section
      id="signature-atelier"
      className="relative w-full bg-[#F0EFE9] py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#E7E5DE] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E7E5DE] pb-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#66785F] mb-2 block font-semibold">
              SIGNATURE ATELIER // KANPUR WORKSHOP
            </span>
            <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#242720]">
              Aero-Strike Pro Studio
            </h2>
          </div>
          <p className="font-body text-sm sm:text-base text-[#77776F] max-w-md leading-relaxed">
            Every grain, contour, and balance point inspected in studio lighting. Hand-selected Sussex Grade-1 English Willow.
          </p>
        </div>

        {/* 360 Split Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Interactive Bat Stage (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="relative w-full aspect-[4/5] sm:aspect-square bg-white rounded-lg border border-[#E7E5DE] p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-sm">
              {/* Studio Header Bar */}
              <div className="flex items-center justify-between text-xs">
                <span className="font-body text-xs text-[#77776F] flex items-center gap-1.5">
                  <RotateCw className="w-3.5 h-3.5 text-[#66785F]" />
                  Inspection Angle: <span className="text-[#242720] font-semibold">{activeProfile.label}</span>
                </span>
                <span className="font-mono text-[11px] uppercase px-2.5 py-1 rounded bg-[#F0EFE9] text-[#66785F] font-semibold">
                  Sussex Grade-1
                </span>
              </div>

              {/* Bat Presentation with Smooth CSS Rotation */}
              <div className="relative flex-1 flex items-center justify-center py-4">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIpwHpkeSILKoWrlSa4ZzdnwoQC4EegQ25LhWnVuQO2NZnC1ArZrnX86w8RXD4PB8yLGaE_bFcFGrhm4n-5OhvS2-E-5HHuUjx0i0vKPwMOv6o1nVIaALPaabKTICVPmJUEG3GmckAKwr2GDQOUm0Y37U9ZBYU0TTV87s4FBkAR8fhxshdQ-wAy5XZyEm3DpUxrKMxtu4PUPS-OOm_yWJm4Q4DdbjyCm73Ca8kuzdP"
                  alt="Aero-Strike Pro Cricket Bat 360 View"
                  className="max-h-[85%] w-auto object-contain transition-transform duration-500 filter contrast-[1.02]"
                  style={{
                    transform: `rotateY(${rotationDeg}deg) rotateZ(${rotationDeg === 90 ? -2 : 0}deg)`,
                  }}
                />

                {/* Subtle metric pill */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white/95 border border-[#E7E5DE] font-body text-xs text-[#77776F] shadow-sm whitespace-nowrap">
                  {activeProfile.metric}
                </div>
              </div>

              {/* Angle Selector Tabs */}
              <div className="grid grid-cols-4 gap-2 pt-4 border-t border-[#E7E5DE]">
                {ANGLE_PROFILES.map((p, idx) => (
                  <button
                    key={p.angle}
                    onClick={() => setCurrentAngleIndex(idx)}
                    className={`py-2 text-center rounded-md font-headline text-xs transition-all border ${
                      currentAngleIndex === idx
                        ? 'bg-[#242720] text-white border-[#242720] font-semibold'
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
            <div className="p-6 sm:p-8 rounded-lg bg-white border border-[#E7E5DE] flex flex-col gap-3 shadow-sm">
              <span className="font-mono text-xs uppercase tracking-wider text-[#66785F] font-semibold">
                CRAFT ANALYSIS
              </span>
              <h3 className="font-headline text-2xl font-bold tracking-tight text-[#242720]">
                {activeProfile.title}
              </h3>
              <p className="font-body text-sm text-[#77776F] leading-relaxed">
                {activeProfile.description}
              </p>
            </div>

            {/* Preparation Options */}
            <div className="p-6 sm:p-8 rounded-lg bg-white border border-[#E7E5DE] flex flex-col gap-5 shadow-sm">
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
                        ? 'border-[#66785F] bg-[#66785F]/5'
                        : 'border-[#E7E5DE] bg-[#F0EFE9] hover:border-[#242720]'
                    }`}
                  >
                    <span className="font-headline text-xs font-bold text-[#242720]">
                      Machine Knocking
                    </span>
                    <span className="text-[11px] text-[#77776F]">15,000 strikes + linseed oil</span>
                  </button>

                  <button
                    onClick={() => setKnockingOption('standard')}
                    className={`p-3 rounded-md text-left border flex flex-col gap-0.5 transition-all ${
                      knockingOption === 'standard'
                        ? 'border-[#66785F] bg-[#66785F]/5'
                        : 'border-[#E7E5DE] bg-[#F0EFE9] hover:border-[#242720]'
                    }`}
                  >
                    <span className="font-headline text-xs font-bold text-[#242720]">
                      Raw Unpressed
                    </span>
                    <span className="text-[11px] text-[#77776F]">For self-preparation</span>
                  </button>
                </div>
              </div>

              {/* Trust Footnote */}
              <div className="flex items-center gap-2 pt-1 text-xs text-[#77776F]">
                <ShieldCheck className="w-4 h-4 text-[#66785F] shrink-0" />
                <span>100% Genuine Sussex Willow • Meston Road Workshop</span>
              </div>

              {/* WhatsApp CTA */}
              <a
                href={inquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-md bg-[#242720] hover:bg-[#66785F] text-white font-headline text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-colors text-center"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Inquire on WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
