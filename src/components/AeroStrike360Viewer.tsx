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
    label: '0° FRONT',
    title: 'UNBLEACHED GRAIN FACE',
    description: '10 to 12 razor-straight, unbroken grains across the strike zone. Sussex Grade-1 English Willow naturally seasoned in controlled humidity.',
    metric: 'GRAINS: 10–12 STRAIGHT // 0% DEFECT',
  },
  {
    angle: 90,
    label: '90° PROFILE',
    title: '40MM POWER EDGES',
    description: 'Generous 39-41mm contoured edges providing maximum mass and power on off-center toe cuts and power drives through cover.',
    metric: 'EDGE: 40MM CONTOUR // CLEAN DUCKBILL',
  },
  {
    angle: 180,
    label: '180° SPINE',
    title: 'SWEET SPOT SPINE',
    description: 'Spine calibrated for sub-continent bounce and low-maintenance turf tracks. Maximum mass concentrated behind the driving area.',
    metric: 'SPINE: 64MM PEAK // BALANCED PICKUP',
  },
  {
    angle: 270,
    label: '270° HANDLE',
    title: '9-PIECE SINGAPORE CANE',
    description: 'Triple rubber-cushioned spring laminate handle wrapped in chevron traction grip for superior vibration suppression.',
    metric: 'TORQUE: ZERO STING // ERGONOMIC OVAL',
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
      id="aero-strike-360"
      className="relative w-full bg-[#08090B] py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#1F2228] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#1F2228] pb-8">
          <div>
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#C6FF35] mb-2 block font-semibold">
              SIGNATURE 360° ATELIER // 06
            </span>
            <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl uppercase text-white font-bold tracking-tight">
              AERO-STRIKE PRO 360°
            </h2>
          </div>
          <p className="font-body text-sm sm:text-base text-[#A1A1AA] max-w-md leading-relaxed">
            Every grain, contour, and balance point inspected in studio lighting. Hand-selected Sussex Grade-1 English Willow.
          </p>
        </div>

        {/* 360 Split Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Interactive Bat Stage (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="relative w-full aspect-[4/5] sm:aspect-square bg-[#101215] rounded border border-[#232730] p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-2xl">
              {/* Studio Stage Header */}
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#A1A1AA] flex items-center gap-1.5">
                  <RotateCw className="w-3.5 h-3.5 text-[#C6FF35]" />
                  STUDIO ANGLE: <span className="text-white font-bold">{activeProfile.label}</span>
                </span>
                <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-[#17191D] border border-[#2C3038] text-[#C6FF35]">
                  SUSSEX GRADE-1
                </span>
              </div>

              {/* Bat Presentation */}
              <div className="relative flex-1 flex items-center justify-center py-4">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIpwHpkeSILKoWrlSa4ZzdnwoQC4EegQ25LhWnVuQO2NZnC1ArZrnX86w8RXD4PB8yLGaE_bFcFGrhm4n-5OhvS2-E-5HHuUjx0i0vKPwMOv6o1nVIaALPaabKTICVPmJUEG3GmckAKwr2GDQOUm0Y37U9ZBYU0TTV87s4FBkAR8fhxshdQ-wAy5XZyEm3DpUxrKMxtu4PUPS-OOm_yWJm4Q4DdbjyCm73Ca8kuzdP"
                  alt="Aero-Strike Pro Cricket Bat 360 View"
                  className="max-h-[85%] w-auto object-contain transition-transform duration-500 drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] filter contrast-105"
                  style={{
                    transform: `rotateY(${rotationDeg}deg) rotateZ(${rotationDeg === 90 ? -2 : 0}deg)`,
                  }}
                />

                {/* Metric pill */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded bg-[#08090B]/90 border border-[#2C3038] font-mono text-[10px] text-[#A1A1AA] whitespace-nowrap">
                  {activeProfile.metric}
                </div>
              </div>

              {/* Angle Selector Tabs */}
              <div className="grid grid-cols-4 gap-2 pt-4 border-t border-[#1F2228]">
                {ANGLE_PROFILES.map((p, idx) => (
                  <button
                    key={p.angle}
                    onClick={() => setCurrentAngleIndex(idx)}
                    className={`py-2 text-center rounded font-headline text-[10px] sm:text-xs uppercase tracking-wider transition-all border ${
                      currentAngleIndex === idx
                        ? 'bg-white text-black border-white font-bold'
                        : 'bg-[#17191D] hover:bg-[#1F2228] text-[#A1A1AA] hover:text-white border-[#2C3038]'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Spec Sheet & Atelier Configurator (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Active Angle Description */}
            <div className="p-6 sm:p-8 rounded bg-[#101215] border border-[#232730] flex flex-col gap-3">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#C6FF35]">
                INSPECTION FOCUS
              </span>
              <h3 className="font-headline text-2xl uppercase text-white font-bold tracking-tight">
                {activeProfile.title}
              </h3>
              <p className="font-body text-sm text-[#A1A1AA] leading-relaxed">
                {activeProfile.description}
              </p>
            </div>

            {/* Atelier Options */}
            <div className="p-6 sm:p-8 rounded bg-[#101215] border border-[#232730] flex flex-col gap-5">
              <span className="font-headline text-xs uppercase tracking-wider text-white font-bold">
                MATCH PREPARATION SPEC
              </span>

              {/* Weight Selector */}
              <div>
                <label className="font-mono text-[10px] uppercase text-[#A1A1AA] block mb-2">
                  Match Weight
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['1,070g (Light)', '1,080g (Balanced)', '1,120g (Heavy)'].map((weight) => (
                    <button
                      key={weight}
                      onClick={() => setSelectedWeight(weight.split(' ')[0])}
                      className={`py-2 px-2 rounded text-center font-headline text-xs uppercase tracking-wider border transition-all ${
                        selectedWeight === weight.split(' ')[0]
                          ? 'bg-white text-black border-white font-bold'
                          : 'bg-[#17191D] text-[#A1A1AA] border-[#2C3038] hover:border-white'
                      }`}
                    >
                      {weight}
                    </button>
                  ))}
                </div>
              </div>

              {/* Knocking Mode */}
              <div>
                <label className="font-mono text-[10px] uppercase text-[#A1A1AA] block mb-2">
                  Knocking Preparation
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setKnockingOption('laser')}
                    className={`p-3 rounded text-left border flex flex-col gap-0.5 transition-all ${
                      knockingOption === 'laser'
                        ? 'border-[#C6FF35] bg-[#C6FF35]/10'
                        : 'border-[#2C3038] bg-[#17191D] hover:border-white'
                    }`}
                  >
                    <span className="font-headline text-xs font-bold uppercase text-white">
                      Laser Knocking
                    </span>
                    <span className="text-[10px] text-[#A1A1AA]">15,000 automated strikes + oil</span>
                  </button>

                  <button
                    onClick={() => setKnockingOption('standard')}
                    className={`p-3 rounded text-left border flex flex-col gap-0.5 transition-all ${
                      knockingOption === 'standard'
                        ? 'border-[#C6FF35] bg-[#C6FF35]/10'
                        : 'border-[#2C3038] bg-[#17191D] hover:border-white'
                    }`}
                  >
                    <span className="font-headline text-xs font-bold uppercase text-white">
                      Raw Unknocked
                    </span>
                    <span className="text-[10px] text-[#A1A1AA]">Unpressed, self-preparation</span>
                  </button>
                </div>
              </div>

              {/* Trust Tag */}
              <div className="flex items-center gap-2 pt-2 text-xs text-[#A1A1AA]">
                <ShieldCheck className="w-4 h-4 text-[#C6FF35] shrink-0" />
                <span>100% Guaranteed Genuine Sussex Willow • Meston Road Workshop</span>
              </div>

              {/* WhatsApp CTA */}
              <a
                href={inquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded bg-[#C6FF35] text-black font-headline text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 hover:brightness-110 transition-all text-center"
              >
                <MessageSquare className="w-4 h-4" />
                <span>INQUIRE ON WHATSAPP</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
