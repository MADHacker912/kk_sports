import React from 'react';
import { Link } from '../utils/router';
import { ShieldCheck, CheckCircle2, AlertTriangle, QrCode, FileCheck } from 'lucide-react';

export const AuthenticityPage: React.FC = () => {
  return (
    <div className="w-full bg-[#F8F7F3] pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Top Hero Container */}
      <div className="max-w-5xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EAE6DC] border border-[#DDD8CC] text-xs font-headline font-semibold text-[#52634B] tracking-wide mb-6">
          <ShieldCheck className="w-3.5 h-3.5 text-[#52634B]" />
          <span>ZERO COUNTERFEIT PLEDGE · K.K. SPORTS KANPUR</span>
        </div>

        <h1 className="font-headline text-3xl sm:text-5xl font-bold tracking-tight text-[#272923] leading-tight mb-6">
          Authenticity Without Compromise. <br />
          How to Verify Genuine Sporting Gear.
        </h1>

        <p className="font-body text-base sm:text-lg text-[#77776F] max-w-3xl leading-relaxed">
          The Indian sports retail market is heavily diluted by counterfeit cricket willows, replica match balls, and unauthorized graphite rackets. At K.K. Sports, every piece comes directly from official factory channels with verifiable security credentials.
        </p>
      </div>

      {/* Brand Specific Verification Protocols */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        {/* Brand 1: SS (Sareen Sports) */}
        <div className="bg-white rounded-2xl border border-[#DDD8CC] p-7 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <span className="font-headline text-lg font-bold text-[#272923]">
              SS (Sareen Sports) Verification
            </span>
            <span className="px-2.5 py-1 rounded-md bg-[#F1EFE8] text-[#52634B] font-body text-[11px] font-semibold">
              Authorized Stockist
            </span>
          </div>

          <p className="font-body text-xs text-[#77776F] leading-relaxed mb-6">
            All authentic SS English and Kashmir willow bats carry the official dual-verification system on the handle cone and back face.
          </p>

          <div className="space-y-3 font-body text-xs text-[#272923]">
            <div className="flex items-start gap-2.5">
              <QrCode className="w-4 h-4 text-[#52634B] shrink-0 mt-0.5" />
              <span><strong>3D QR Hologram:</strong> Scratch to reveal unique 8-digit PIN and scan using the official 'SS Cricket' verification app.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#52634B] shrink-0 mt-0.5" />
              <span><strong>Laser Etched Serial Number:</strong> Unique factory batch code permanently engraved on the edge near the handle.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#52634B] shrink-0 mt-0.5" />
              <span><strong>Embossed Rubber Grip:</strong> Genuine SS signature chevron texture with high-density tactile grip.</span>
            </div>
          </div>
        </div>

        {/* Brand 2: SG (Sanspareils Greenlands) */}
        <div className="bg-white rounded-2xl border border-[#DDD8CC] p-7 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <span className="font-headline text-lg font-bold text-[#272923]">
              SG (Sanspareils Greenlands)
            </span>
            <span className="px-2.5 py-1 rounded-md bg-[#F1EFE8] text-[#52634B] font-body text-[11px] font-semibold">
              Authorized Stockist
            </span>
          </div>

          <p className="font-body text-xs text-[#77776F] leading-relaxed mb-6">
            India's most iconic cricket manufacturer employs high-security holographic tamper-evident strips across all professional ranges.
          </p>

          <div className="space-y-3 font-body text-xs text-[#272923]">
            <div className="flex items-start gap-2.5">
              <FileCheck className="w-4 h-4 text-[#52634B] shrink-0 mt-0.5" />
              <span><strong>Tamper-Evident Security Seal:</strong> When peeled, leaves permanent honeycomb void residue on the packaging.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#52634B] shrink-0 mt-0.5" />
              <span><strong>Official SMS / Web Verification:</strong> Scratch-off code verified directly on SG's central database at sgcricket.com.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#52634B] shrink-0 mt-0.5" />
              <span><strong>Genuine Sarawak Cane Handle:</strong> 3-piece multi-laminated cane visible at the handle top with internal rubber spring dampener.</span>
            </div>
          </div>
        </div>

        {/* Brand 3: Yonex Badminton */}
        <div className="bg-white rounded-2xl border border-[#DDD8CC] p-7 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <span className="font-headline text-lg font-bold text-[#272923]">
              Yonex Sunrise India
            </span>
            <span className="px-2.5 py-1 rounded-md bg-[#F1EFE8] text-[#52634B] font-body text-[11px] font-semibold">
              Authentic Retailer
            </span>
          </div>

          <p className="font-body text-xs text-[#77776F] leading-relaxed mb-6">
            Yonex rackets are among the most counterfeited sports products globally. We ensure all inventory comes with genuine Sunrise Sports distribution.
          </p>

          <div className="space-y-3 font-body text-xs text-[#272923]">
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#52634B] shrink-0 mt-0.5" />
              <span><strong>Sunrise Hologram:</strong> Distinct color-shifting optical hologram on the racket shaft above the cone.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#52634B] shrink-0 mt-0.5" />
              <span><strong>Cone Laser Code:</strong> 8-digit laser-engraved production date code on the cone with sharp, non-printed typography.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#52634B] shrink-0 mt-0.5" />
              <span><strong>Butt Cap Logo:</strong> Crisp embossed Yonex yy logo in deep forest green; counterfeits often have dull or faded lime green.</span>
            </div>
          </div>
        </div>

        {/* Brand 4: Cosco & Nivia Match Balls */}
        <div className="bg-white rounded-2xl border border-[#DDD8CC] p-7 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <span className="font-headline text-lg font-bold text-[#272923]">
              Cosco &amp; Nivia Official Gear
            </span>
            <span className="px-2.5 py-1 rounded-md bg-[#F1EFE8] text-[#52634B] font-body text-[11px] font-semibold">
              Authorized Stockist
            </span>
          </div>

          <p className="font-body text-xs text-[#77776F] leading-relaxed mb-6">
            From FIFA-certified footballs to championship basketballs, we carry only pressurized factory-fresh inventory.
          </p>

          <div className="space-y-3 font-body text-xs text-[#272923]">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#52634B] shrink-0 mt-0.5" />
              <span><strong>Factory Embossing &amp; Valve Seals:</strong> High-precision air valve with pressure rating and batch stamp.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#52634B] shrink-0 mt-0.5" />
              <span><strong>Multi-layer Polyurethane:</strong> Authentic hand-stitched or thermally bonded panels with zero air leakage.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#52634B] shrink-0 mt-0.5" />
              <span><strong>Printed Maximum Retail Price (MRP):</strong> Original manufacturer packaging with unaltered statutory declarations.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Warning & Consumer Assurance */}
      <div className="max-w-5xl mx-auto rounded-2xl bg-[#EAE6DC] border border-[#DDD8CC] p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#52634B] shrink-0 mt-1">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-headline text-base font-bold text-[#272923]">
              Have Suspicious Equipment From Another Seller?
            </h3>
            <p className="font-body text-xs text-[#77776F] mt-1 max-w-xl">
              Bring your bat or racket to our Meston Road store. Our technicians will inspect the hologram, cane handle construction, and wood density free of charge.
            </p>
          </div>
        </div>

        <Link
          href="/contact"
          className="px-5 py-2.5 rounded-xl bg-[#272923] text-white hover:bg-[#3D4037] font-headline text-xs font-semibold shrink-0 transition-all"
        >
          Visit Inspection Counter
        </Link>
      </div>
    </div>
  );
};
