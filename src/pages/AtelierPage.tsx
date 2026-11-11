import React, { useState } from 'react';
import { Link } from '../utils/router';
import { getWhatsAppUrl } from '../utils/whatsapp';
import { Wrench, CheckCircle, Clock, MessageSquare } from 'lucide-react';

interface ServiceItem {
  id: string;
  name: string;
  category: 'cricket' | 'badminton' | 'restoration';
  price: string;
  turnaround: string;
  description: string;
  specs: string[];
}

const ATELIER_SERVICES: ServiceItem[] = [
  {
    id: 'mechanical-knocking',
    name: '15,000-Cycle Mechanical Bat Knocking',
    category: 'cricket',
    price: '₹550',
    turnaround: '24 – 36 Hours',
    description: 'Automated mallet compression system that mimics months of match play, softening raw willow fibers without causing brittle stress fractures.',
    specs: ['Progressive stroke force ramping', 'Edge & toe dedicated angled cycles', 'Sweet-spot grain compression', 'Pre-match readiness guaranteed'],
  },
  {
    id: 'full-preparation-pack',
    name: 'Master Willow Armor & Knocking Suite',
    category: 'cricket',
    price: '₹950',
    turnaround: '48 Hours',
    description: 'Complete end-to-end preparation for high-grade English willow bats before first competitive leather match.',
    specs: ['Cold-pressed raw linseed oiling', '15,000-cycle machine knocking', 'Hand edge bone-rounding', 'Fitted rubber toe-guard & anti-scuff sheet'],
  },
  {
    id: 'toe-guard-scuff',
    name: 'Toe Guard Bonding & Scuff Sheet Fitting',
    category: 'cricket',
    price: '₹350',
    turnaround: 'Same Day / 4 Hours',
    description: 'Protects the vulnerable bat bottom against moisture absorption, crease tapping damage, and yorker impact cracks.',
    specs: ['Industrial-grade epoxy adhesive', 'Contoured silicone-rubber toe guard', 'Full-face clear fiber extratec sheet', 'Side edge reinforced tape'],
  },
  {
    id: 'digital-stringing',
    name: 'Electronic Precision Racket Stringing',
    category: 'badminton',
    price: '₹250 (Excl. String)',
    turnaround: 'Same Day / 3 Hours',
    description: 'Constant-pull 6-point electronic stringing ensuring zero frame distortion and exact tension calibration down to 0.5 lbs.',
    specs: ['Digital constant-pull machine', '2-knot & 4-knot tournament patterns', 'Tension range: 20 lbs to 32 lbs', 'Yonex BG65 / BG65Ti / Nanogy available'],
  },
  {
    id: 'handle-regrip',
    name: 'Cane Handle Re-Binding & Custom Gripping',
    category: 'cricket',
    price: '₹200 – ₹450',
    turnaround: '2 Hours',
    description: 'Repair loose handle stringing, replace aged rubber grips with moisture-wicking Chevron or Octopus textures.',
    specs: ['Nylon twine tight re-binding', 'PVA wood glue dampening injection', 'Dual-grip or thick shock-absorbing wrap', 'Enhanced wrist flick feedback'],
  },
  {
    id: 'balance-weight-sculpt',
    name: 'Willow Balance & Pick-up Optimization',
    category: 'restoration',
    price: '₹600',
    turnaround: '48 Hours',
    description: 'Shifting the dead-weight distribution of heavy bats through subtle spine tapering and handle counterbalance weighting.',
    specs: ['Weight reduction up to 40 grams', 'Lighter subjective pick-up index', 'Maintains maximum middle wood depth', 'Sand-smoothed wax finish'],
  },
];

export const AtelierPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'cricket' | 'badminton'>('all');

  const filteredServices = ATELIER_SERVICES.filter(
    (s) => activeFilter === 'all' || s.category === activeFilter
  );

  return (
    <div className="w-full bg-[#F8F7F3] pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Top Hero Section */}
      <div className="max-w-5xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EAE6DC] border border-[#DDD8CC] text-xs font-headline font-semibold text-[#52634B] tracking-wide mb-6">
          <Wrench className="w-3.5 h-3.5 text-[#52634B]" />
          <span>IN-HOUSE TECHNICAL WORKSHOP · PARADE KANPUR</span>
        </div>

        <h1 className="font-headline text-3xl sm:text-5xl font-bold tracking-tight text-[#272923] leading-tight mb-6">
          The Athletic Atelier. <br />
          Where Raw Gear Becomes Match-Ready.
        </h1>

        <p className="font-body text-base sm:text-lg text-[#77776F] max-w-3xl leading-relaxed">
          Top-tier equipment straight out of the box is fragile without deliberate preparation. At our Meston Road workshop, our technicians prepare your English willow, string your tournament rackets, and balance your tools with surgical care.
        </p>

        {/* Filter Badges */}
        <div className="flex flex-wrap items-center gap-2 mt-8">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-xl font-headline text-xs font-semibold transition-all ${
              activeFilter === 'all'
                ? 'bg-[#272923] text-white shadow-xs'
                : 'bg-white text-[#77776F] hover:bg-[#F1EFE8] border border-[#DDD8CC]'
            }`}
          >
            All Atelier Services ({ATELIER_SERVICES.length})
          </button>
          <button
            onClick={() => setActiveFilter('cricket')}
            className={`px-4 py-2 rounded-xl font-headline text-xs font-semibold transition-all ${
              activeFilter === 'cricket'
                ? 'bg-[#272923] text-white shadow-xs'
                : 'bg-white text-[#77776F] hover:bg-[#F1EFE8] border border-[#DDD8CC]'
            }`}
          >
            Cricket Bat Preparation
          </button>
          <button
            onClick={() => setActiveFilter('badminton')}
            className={`px-4 py-2 rounded-xl font-headline text-xs font-semibold transition-all ${
              activeFilter === 'badminton'
                ? 'bg-[#272923] text-white shadow-xs'
                : 'bg-white text-[#77776F] hover:bg-[#F1EFE8] border border-[#DDD8CC]'
            }`}
          >
            Electronic Racket Stringing
          </button>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="rounded-2xl bg-white border border-[#DDD8CC] p-6 flex flex-col justify-between hover:border-[#52634B] hover:shadow-[0_8px_24px_rgba(39,41,35,0.05)] transition-all group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="font-headline text-lg font-bold text-[#272923]">
                  {service.price}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F1EFE8] text-[#52634B] font-body text-[11px] font-medium">
                  <Clock className="w-3 h-3" />
                  <span>{service.turnaround}</span>
                </span>
              </div>

              <h3 className="font-headline text-base font-bold text-[#272923] leading-snug mb-2 group-hover:text-[#52634B] transition-colors">
                {service.name}
              </h3>

              <p className="font-body text-xs text-[#77776F] leading-relaxed mb-6">
                {service.description}
              </p>

              <div className="pt-4 border-t border-[#F1EFE8] mb-6">
                <p className="font-headline text-[11px] uppercase tracking-wider text-[#77776F] font-semibold mb-2.5">
                  Process Standard
                </p>
                <ul className="space-y-1.5">
                  {service.specs.map((spec, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-[#272923]">
                      <CheckCircle className="w-3.5 h-3.5 text-[#52634B] mt-0.5 shrink-0" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <a
              href={getWhatsAppUrl(
                `Hello K.K. Sports, I want to book Atelier Service: ${service.name} (${service.price}). Please share schedule.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-[#F1EFE8] hover:bg-[#52634B] text-[#272923] hover:text-white font-headline text-xs font-semibold text-center transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Book Service via WhatsApp</span>
            </a>
          </div>
        ))}
      </div>

      {/* Workshop Walk-in Notice */}
      <div className="max-w-5xl mx-auto rounded-2xl border border-[#DDD8CC] bg-[#EAE6DC] p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="font-headline text-xs uppercase tracking-widest text-[#52634B] font-bold">
            Walk-in Workshop Desk
          </span>
          <h3 className="font-headline text-xl sm:text-2xl font-bold text-[#272923] mt-1 mb-2">
            Bring Your Bat or Racket to Meston Road
          </h3>
          <p className="font-body text-xs sm:text-sm text-[#77776F] max-w-xl">
            You can drop off your equipment directly at our store Monday through Saturday (10:30 AM to 8:30 PM). Our master stringer and bat technician inspect each piece in your presence.
          </p>
        </div>

        <Link
          href="/contact"
          className="px-5 py-2.5 rounded-xl bg-[#272923] text-white hover:bg-[#3D4037] font-headline text-xs font-semibold shrink-0 transition-all"
        >
          Store Directions &amp; Hours
        </Link>
      </div>
    </div>
  );
};
