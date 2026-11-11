import React, { useState, useRef } from 'react';
import { getProductInquiryUrl } from '../utils/whatsapp';
import { RotateCw, CheckCircle2, ShieldCheck, Zap, MessageSquare, ArrowRight } from 'lucide-react';

interface AngleProfile {
  angle: number;
  label: string;
  title: string;
  description: string;
  specBadge: string;
  metric: string;
  highlightCoordinates: { x: number; y: number };
}

const ANGLE_PROFILES: AngleProfile[] = [
  {
    angle: 0,
    label: '0° FRONT FACE',
    title: 'UNBLEACHED GRAIN FACE',
    description: '10 razor-straight, unbroken grains across the strike zone. Unbleached Grade-1 Sussex English Willow naturally seasoned in controlled humidity.',
    specBadge: 'GRADE-1 SUSSEX',
    metric: 'GRAINS: 10-12 // 0% DEFECT',
    highlightCoordinates: { x: 50, y: 55 },
  },
  {
    angle: 90,
    label: '90° EDGE PROFILE',
    title: '40MM POWER EDGES',
    description: 'Generous 39-41mm contoured edges providing unmatched forgiveness on off-center toe cuts and power drives through cover.',
    specBadge: 'POWER THICKNESS',
    metric: 'EDGE: 40MM // FEATHER DUCKBILL',
    highlightCoordinates: { x: 42, y: 65 },
  },
  {
    angle: 180,
    label: '180° SPINE CONTOUR',
    title: 'MID-TO-LOW SWEET SPOT',
    description: 'Spine engineered specifically for sub-continent bounce and low-maintenance turf tracks. Maximum mass concentrated behind the driving area.',
    specBadge: 'ACCELERATION PROFILE',
    metric: 'SPINE: 64MM PEAK // BALANCED PICKUP',
    highlightCoordinates: { x: 52, y: 50 },
  },
  {
    angle: 270,
    label: '270° CANE HANDLE',
    title: '9-PIECE SINGAPORE CANE',
    description: 'Triple rubber-cushioned spring laminate handle wrapped in triple-chevron neon traction grip for superior vibration suppression.',
    specBadge: 'SHOCK ABSORPTION',
    metric: 'TORQUE: ZERO STING // ERGONOMIC OVAL',
    highlightCoordinates: { x: 50, y: 18 },
  },
];

export const AeroStrike360Viewer: React.FC = () => {
  const [currentAngleIndex, setCurrentAngleIndex] = useState(0);
  const [selectedWeight, setSelectedWeight] = useState('1,080g');
  const [isZoomed, setIsZoomed] = useState(false);
  const [knockingOption, setKnockingOption] = useState<'laser' | 'standard'>('laser');

  const containerRef = useRef<HTMLDivElement | null>(null);

  const activeProfile = ANGLE_PROFILES[currentAngleIndex];

  const handleNextAngle = () => {
    setCurrentAngleIndex((prev) => (prev + 1) % ANGLE_PROFILES.length);
  };

  const handlePrevAngle = () => {
    setCurrentAngleIndex((prev) => (prev - 1 + ANGLE_PROFILES.length) % ANGLE_PROFILES.length);
  };

  // Rotation effect in degrees
  const rotationDeg = activeProfile.angle;

  const inquiryUrl = getProductInquiryUrl(
    `Aero-Strike Pro Grade-1 Cricket Bat (${activeProfile.label}, Weight: ${selectedWeight}, Knocking: ${knockingOption === 'laser' ? 'Laser Pro' : 'Standard'})`
  );

  return (
    <section
      id="aero-strike-360"
      className="relative w-full bg-surface-container-lowest py-space-xl lg:py-28 px-space-md lg:px-space-xl border-b border-cold-border overflow-hidden"
    >
      {/* Background ambient grid and glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(198,255,53,0.06),transparent_65%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-space-lg">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md border-b border-cold-border pb-space-lg">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-surface-container border border-cold-border mb-3">
              <span className="w-2 h-2 rounded-full bg-accent-lime animate-pulse" />
              <span className="font-headline text-[10px] uppercase tracking-widest text-accent-lime">
                CINEMATIC 3D GEAR INSPECTION // 2025 SERIES
              </span>
            </div>
            <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl uppercase text-white font-bold tracking-tight">
              AERO-STRIKE PRO <span className="text-accent-lime">360° ATELIER</span>
            </h2>
          </div>
          <p className="font-body text-sm sm:text-base text-on-surface-variant max-w-lg leading-relaxed">
            Every grain, contour, and balance point inspected in real-time. Experience the precision engineering of our Sussex Grade-1 flagship blade.
          </p>
        </div>

        {/* Main 360 Split Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg lg:gap-space-xl items-start">
          {/* Left Column: 360 Visualizer Canvas & Controls (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-space-md">
            <div
              ref={containerRef}
              className="relative w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/4.2] bg-surface-container-low rounded border border-cold-border overflow-hidden flex flex-col justify-between p-space-md shadow-2xl group select-none"
            >
              {/* Studio HUD Header */}
              <div className="relative z-10 flex items-start justify-between">
                <div className="flex flex-col gap-1">
                  <span className="font-headline text-[10px] uppercase tracking-widest text-accent-lime flex items-center gap-1.5">
                    <RotateCw className="w-3.5 h-3.5 animate-[spin_10s_linear_infinite]" />
                    STUDIO INSPECTOR // <span className="text-white font-bold">{activeProfile.label}</span>
                  </span>
                  <span className="font-mono text-[10px] text-on-surface-variant tracking-wider">
                    OBSIDIAN CHAMBER • KANPUR TUNED
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsZoomed(!isZoomed)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded bg-surface-container hover:bg-surface-bright text-white font-headline text-[11px] uppercase border border-cold-border transition-colors"
                  >
                    <span>{isZoomed ? 'Reset Zoom' : 'Zoom 1.4x'}</span>
                  </button>
                  <div className="px-2.5 py-1 rounded bg-surface-container-high border border-cold-border text-accent-lime font-headline text-[10px] font-bold tracking-widest">
                    SUSSEX GRADE-1
                  </div>
                </div>
              </div>

              {/* Bat Visual Target Area */}
              <div className="relative flex-1 flex items-center justify-center p-4 overflow-hidden">
                <div
                  className="relative w-full h-full flex items-center justify-center transition-transform duration-500 ease-out"
                  style={{
                    transform: isZoomed ? 'scale(1.35)' : 'scale(1)',
                  }}
                >
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIpwHpkeSILKoWrlSa4ZzdnwoQC4EegQ25LhWnVuQO2NZnC1ArZrnX86w8RXD4PB8yLGaE_bFcFGrhm4n-5OhvS2-E-5HHuUjx0i0vKPwMOv6o1nVIaALPaabKTICVPmJUEG3GmckAKwr2GDQOUm0Y37U9ZBYU0TTV87s4FBkAR8fhxshdQ-wAy5XZyEm3DpUxrKMxtu4PUPS-OOm_yWJm4Q4DdbjyCm73Ca8kuzdP"
                    alt="Aero-Strike Pro Cricket Bat 360 Studio Inspector"
                    className="max-h-[85%] w-auto object-contain transition-all duration-500 drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)] filter contrast-105"
                    style={{
                      transform: `rotateY(${rotationDeg}deg) rotateZ(${rotationDeg === 90 ? -3 : 0}deg)`,
                      transformStyle: 'preserve-3d',
                    }}
                  />

                  {/* Dynamic Hotspot Target Pin */}
                  <div
                    className="absolute pointer-events-none transition-all duration-500 hidden sm:flex items-center gap-2"
                    style={{
                      left: `${activeProfile.highlightCoordinates.x}%`,
                      top: `${activeProfile.highlightCoordinates.y}%`,
                    }}
                  >
                    <div className="relative flex items-center justify-center">
                      <span className="w-3.5 h-3.5 rounded-full bg-accent-lime/40 animate-ping absolute" />
                      <span className="w-2.5 h-2.5 rounded-full bg-accent-lime border-2 border-surface-container-lowest" />
                    </div>
                    <div className="px-2 py-1 rounded bg-surface-container-lowest/90 backdrop-blur border border-accent-lime/40 font-mono text-[9px] text-accent-lime uppercase tracking-widest whitespace-nowrap shadow-lg">
                      {activeProfile.metric}
                    </div>
                  </div>
                </div>
              </div>

              {/* Angle Control Navigation Bar */}
              <div className="relative z-10 flex flex-col gap-2 pt-space-sm border-t border-cold-border">
                <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                  {ANGLE_PROFILES.map((p, idx) => (
                    <button
                      key={p.angle}
                      onClick={() => setCurrentAngleIndex(idx)}
                      className={`px-2 py-2 text-center rounded font-headline text-[10px] sm:text-xs uppercase tracking-wider transition-all border ${
                        currentAngleIndex === idx
                          ? 'bg-accent-lime text-black border-accent-lime font-bold shadow-[0_0_15px_rgba(198,255,53,0.25)]'
                          : 'bg-surface-container hover:bg-surface-bright text-on-surface-variant hover:text-white border-cold-border'
                      }`}
                    >
                      {p.label.split(' ')[0]} {p.label.split(' ')[1]}
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between font-mono text-[10px] text-on-surface-variant pt-1 px-1">
                  <span>FOV: 38° // STUDIO RENDERING</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrevAngle}
                      className="px-2 py-0.5 rounded bg-surface-container hover:bg-surface-bright text-white uppercase text-[9px]"
                    >
                      Prev
                    </button>
                    <span>{currentAngleIndex + 1} / {ANGLE_PROFILES.length}</span>
                    <button
                      onClick={handleNextAngle}
                      className="px-2 py-0.5 rounded bg-surface-container hover:bg-surface-bright text-white uppercase text-[9px]"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Spec Inspector & WhatsApp Inquiry Configurator (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-space-md">
            {/* Active Angle Inspector Card */}
            <div className="bg-surface-container-low p-space-lg rounded border border-cold-border flex flex-col gap-space-sm">
              <div className="flex items-center justify-between">
                <span className="font-headline text-[10px] uppercase tracking-widest text-accent-lime bg-surface-container px-2 py-0.5 rounded border border-cold-border">
                  {activeProfile.specBadge}
                </span>
                <span className="font-mono text-[10px] text-on-surface-variant uppercase">
                  INSPECTION SPOTLIGHT
                </span>
              </div>

              <h3 className="font-headline text-xl sm:text-2xl uppercase text-white font-bold tracking-tight">
                {activeProfile.title}
              </h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                {activeProfile.description}
              </p>

              <div className="pt-space-sm border-t border-cold-border grid grid-cols-2 gap-2 text-xs">
                <div className="flex flex-col">
                  <span className="text-[10px] text-on-surface-variant uppercase font-mono">Profile</span>
                  <span className="text-white font-headline font-semibold">Duckbill Full Spine</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-on-surface-variant uppercase font-mono">Toe Guard</span>
                  <span className="text-white font-headline font-semibold">Pre-Fitted Resin Armor</span>
                </div>
              </div>
            </div>

            {/* Customization & Atelier Options */}
            <div className="bg-surface-container-low p-space-lg rounded border border-cold-border flex flex-col gap-space-md">
              <span className="font-headline text-xs uppercase tracking-widest text-white font-semibold">
                ATELIER SPEC CONFIGURATOR
              </span>

              {/* Weight Selector */}
              <div>
                <label className="font-headline text-[10px] uppercase tracking-wider text-on-surface-variant block mb-1.5">
                  1. SELECT MATCH WEIGHT
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['1,070g (Light)', '1,080g (Balanced)', '1,120g (Heavy)'].map((weight) => (
                    <button
                      key={weight}
                      onClick={() => setSelectedWeight(weight.split(' ')[0])}
                      className={`px-2 py-2 rounded text-center font-headline text-[11px] uppercase tracking-wider border transition-all ${
                        selectedWeight === weight.split(' ')[0]
                          ? 'bg-white text-black border-white font-bold'
                          : 'bg-surface-container text-on-surface-variant border-cold-border hover:border-white'
                      }`}
                    >
                      {weight}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preparation / Knocking Mode */}
              <div>
                <label className="font-headline text-[10px] uppercase tracking-wider text-on-surface-variant block mb-1.5">
                  2. PRO PREPARATION // KANPUR WORKSHOP
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setKnockingOption('laser')}
                    className={`p-2.5 rounded text-left border flex flex-col gap-0.5 transition-all ${
                      knockingOption === 'laser'
                        ? 'border-accent-lime bg-accent-lime/10'
                        : 'border-cold-border bg-surface-container hover:border-white'
                    }`}
                  >
                    <span className="font-headline text-[11px] font-bold uppercase text-white flex items-center justify-between">
                      Laser Knocking Lab
                      <CheckCircle2 className={`w-3.5 h-3.5 ${knockingOption === 'laser' ? 'text-accent-lime' : 'text-transparent'}`} />
                    </span>
                    <span className="text-[10px] text-on-surface-variant">15,000 automated strikes + linseed oil</span>
                  </button>

                  <button
                    onClick={() => setKnockingOption('standard')}
                    className={`p-2.5 rounded text-left border flex flex-col gap-0.5 transition-all ${
                      knockingOption === 'standard'
                        ? 'border-accent-lime bg-accent-lime/10'
                        : 'border-cold-border bg-surface-container hover:border-white'
                    }`}
                  >
                    <span className="font-headline text-[11px] font-bold uppercase text-white flex items-center justify-between">
                      Natural Raw Blade
                      <CheckCircle2 className={`w-3.5 h-3.5 ${knockingOption === 'standard' ? 'text-accent-lime' : 'text-transparent'}`} />
                    </span>
                    <span className="text-[10px] text-on-surface-variant">Unpressed, self-knocking for seasoned pros</span>
                  </button>
                </div>
              </div>

              {/* Trust badges */}
              <div className="flex flex-col gap-1.5 pt-space-xs text-xs text-on-surface-variant">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-accent-lime shrink-0" />
                  <span>100% Guaranteed Genuine Sussex Willow with Hologram</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-accent-lime shrink-0" />
                  <span>Handpicked &amp; balanced at Meston Road Flagship Atelier</span>
                </div>
              </div>

              {/* Direct WhatsApp CTA Button */}
              <a
                href={inquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded bg-accent-lime text-black font-headline text-xs sm:text-sm uppercase tracking-wider font-bold flex items-center justify-center gap-2 hover:brightness-110 shadow-[0_0_24px_rgba(198,255,53,0.3)] transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>INQUIRE ON WHATSAPP: AERO-STRIKE PRO</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <p className="text-center font-mono text-[10px] text-on-surface-variant">
                Real-time stock confirmation &amp; custom knocking consultation via WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
