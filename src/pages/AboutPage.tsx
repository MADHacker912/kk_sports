import React from 'react';
import { Link } from '../utils/router';
import { getGeneralInquiryUrl } from '../utils/whatsapp';
import { ShieldCheck, Wrench, HeartHandshake, MapPin, CheckCircle2 } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="w-full bg-[#F8F7F3] pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Top Hero Container */}
      <div className="max-w-5xl mx-auto mb-16 sm:mb-24">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EAE6DC] border border-[#DDD8CC] text-xs font-headline font-semibold text-[#52634B] tracking-wide mb-6">
          <span className="w-2 h-2 rounded-full bg-[#52634B]" />
          <span>HERITAGE &amp; VALUES · EST. PARADE, KANPUR</span>
        </div>

        <h1 className="font-headline text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#272923] leading-tight mb-6">
          Rooted in the heart of Kanpur. <br />
          Dedicated to pure athletic craft.
        </h1>

        <p className="font-body text-base sm:text-lg text-[#77776F] max-w-3xl leading-relaxed">
          At K.K. Sports, Games &amp; Toys, we believe that true sporting achievement starts with genuine equipment. Located at the historic trading crossroads of Meston Road, Parade, our flagship store has served district players, school academies, competitive clubs, and recreation enthusiasts across Uttar Pradesh with uncompromised integrity.
        </p>
      </div>

      {/* Main Narrative Split Section */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
        {/* Left Column: Visual Vignette / Key Numbers */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="rounded-2xl overflow-hidden border border-[#DDD8CC] bg-[#F1EFE8] p-8 shadow-xs">
            <span className="font-headline text-xs uppercase tracking-widest text-[#77776F] font-semibold">
              The Kanpur Address
            </span>
            <p className="font-headline text-2xl font-bold text-[#272923] mt-2 mb-3">
              44/319, Meston Road
            </p>
            <p className="font-body text-sm text-[#77776F] leading-relaxed mb-6">
              Situated in Parade, the historic retail nucleus of Kanpur. Every week, players bring their English and Kashmir willows to our workshop for professional preparation.
            </p>

            <div className="pt-6 border-t border-[#DDD8CC] flex flex-col gap-3 font-body text-xs text-[#272923]">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#52634B] shrink-0" />
                <span>Authorized direct sourcing from primary manufacturers</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#52634B] shrink-0" />
                <span>Zero factory rejects or counterfeit seconds</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#52634B] shrink-0" />
                <span>Transparent pricing with GST compliant invoices</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#DDD8CC] bg-white p-6 flex items-center justify-between">
            <div>
              <span className="font-headline text-3xl font-bold text-[#272923]">100%</span>
              <p className="font-body text-xs text-[#77776F] mt-0.5">Authenticity verification on every piece</p>
            </div>
            <div className="h-10 w-[1px] bg-[#E2DFD6]" />
            <div>
              <span className="font-headline text-3xl font-bold text-[#52634B]">15k+</span>
              <p className="font-body text-xs text-[#77776F] mt-0.5">Knocking strokes per prepared bat</p>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Story */}
        <div className="lg:col-span-7 flex flex-col gap-8 font-body text-sm sm:text-base text-[#4A4C44] leading-relaxed">
          <div>
            <h2 className="font-headline text-xl sm:text-2xl font-bold text-[#272923] mb-3">
              Why We Refuse the Aggregator Model
            </h2>
            <p className="mb-4">
              Modern online marketplaces are flooded with unverified sellers, duplicate holograms, and machine-cut willow with dead rebound spots. An athlete cannot judge willow balance, grain density, or sweet-spot resonance through a flat thumbnail.
            </p>
            <p>
              At K.K. Sports, every bat is physically weighed, tapped with leather mallets, and balance-tested before it is recommended. We know whether a player needs a mid-to-high swell for bouncy turf wickets or an extended low profile for subcontinental tracks.
            </p>
          </div>

          <div className="pt-6 border-t border-[#E2DFD6]">
            <h2 className="font-headline text-xl sm:text-2xl font-bold text-[#272923] mb-3">
              The Meston Road Workshop
            </h2>
            <p className="mb-4">
              Equipment is not finished when it leaves the factory—it is merely shaped. Raw English willow fibers must be carefully compressed without bruising the cell walls. Our workshop provides:
            </p>
            <ul className="space-y-2.5 pl-2 text-xs sm:text-sm text-[#272923]">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#52634B] mt-2 shrink-0" />
                <span><strong>Mechanical bat knocking:</strong> Progressive compression from toe to shoulder to eliminate surface seam cracks.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#52634B] mt-2 shrink-0" />
                <span><strong>Linseed oil equilibrium:</strong> Controlled moisture conditioning for longevity in dry or humid Indian seasons.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#52634B] mt-2 shrink-0" />
                <span><strong>Electronic racket stringing:</strong> Digital poundage tension calibration for badminton and tennis frames.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 4 Guiding Pillars */}
      <div className="max-w-5xl mx-auto pt-16 border-t border-[#E2DFD6] mb-20">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="font-headline text-xs uppercase tracking-widest text-[#77776F] font-semibold">
            Our Commitments
          </span>
          <h2 className="font-headline text-2xl sm:text-3xl font-bold text-[#272923] mt-2">
            The Standards We Stand Behind
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-[#DDD8CC]">
            <div className="w-10 h-10 rounded-xl bg-[#F1EFE8] flex items-center justify-center text-[#52634B] mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-headline text-base font-bold text-[#272923] mb-2">Authentic Only</h3>
            <p className="font-body text-xs text-[#77776F] leading-relaxed">
              Every item has authentic manufacturer barcodes, scannable QR tags, and authorized distribution paperwork.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#DDD8CC]">
            <div className="w-10 h-10 rounded-xl bg-[#F1EFE8] flex items-center justify-center text-[#52634B] mb-4">
              <Wrench className="w-5 h-5" />
            </div>
            <h3 className="font-headline text-base font-bold text-[#272923] mb-2">Master Workshop</h3>
            <p className="font-body text-xs text-[#77776F] leading-relaxed">
              We do not just hand over a box. We prepare, balance, knock, oil, and string to player specifications.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#DDD8CC]">
            <div className="w-10 h-10 rounded-xl bg-[#F1EFE8] flex items-center justify-center text-[#52634B] mb-4">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="font-headline text-base font-bold text-[#272923] mb-2">Community First</h3>
            <p className="font-body text-xs text-[#77776F] leading-relaxed">
              Special tiered support for Kanpur schools, district clubs, junior academies, and emerging talents.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#DDD8CC]">
            <div className="w-10 h-10 rounded-xl bg-[#F1EFE8] flex items-center justify-center text-[#52634B] mb-4">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-headline text-base font-bold text-[#272923] mb-2">Meston Rd Presence</h3>
            <p className="font-body text-xs text-[#77776F] leading-relaxed">
              A real brick-and-mortar sanctuary where you can test the grip, feel the weight, and speak to sportsmen.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action Box */}
      <div className="max-w-5xl mx-auto rounded-2xl bg-[#21231D] text-[#F8F7F3] p-8 sm:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <span className="font-headline text-xs uppercase tracking-widest text-[#9BB094] font-semibold">
            Experience K.K. Sports
          </span>
          <h3 className="font-headline text-2xl sm:text-3xl font-bold mt-2 mb-2">
            Visit Us on Meston Road or Connect on WhatsApp
          </h3>
          <p className="font-body text-xs sm:text-sm text-[#A6A49B] max-w-xl">
            Need bat knocking, custom string tension, or institutional club supplies? Reach out to our specialist counter directly.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 shrink-0">
          <Link
            href="/contact"
            className="px-5 py-2.5 rounded-xl bg-white text-[#272923] hover:bg-[#F1EFE8] font-headline text-xs font-semibold transition-all shadow-xs"
          >
            Visit Flagship Store
          </Link>
          <a
            href={getGeneralInquiryUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-[#52634B] text-white hover:bg-[#43523D] font-headline text-xs font-semibold transition-all shadow-sm"
          >
            Chat with Atelier
          </a>
        </div>
      </div>
    </div>
  );
};
