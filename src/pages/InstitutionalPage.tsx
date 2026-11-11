import React, { useState } from 'react';
import { DISPLAY_PHONE } from '../utils/whatsapp';
import { Building2, FileText, CheckCircle2, School, Trophy, Users, Send } from 'lucide-react';

export const InstitutionalPage: React.FC = () => {
  const [institutionName, setInstitutionName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [requirement, setRequirement] = useState('');
  const [selectedPackage, setSelectedPackage] = useState('School Annual Sports Day Kit');

  const handleGenerateQuote = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `*INSTITUTIONAL QUOTE REQUEST - K.K. SPORTS*\n\n` +
      `*Institution / Academy:* ${institutionName || 'Not specified'}\n` +
      `*Contact Person:* ${contactPerson || 'Not specified'}\n` +
      `*Contact Phone:* ${phone || 'Not specified'}\n` +
      `*Selected Tier:* ${selectedPackage}\n` +
      `*Requirements / Quantities:*\n${requirement || 'General institutional catalog request'}\n\n` +
      `_Request sent via K.K. Sports Web Portal_`;

    window.open(
      `https://wa.me/919569886010?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  return (
    <div className="w-full bg-[#F8F7F3] pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Top Hero Container */}
      <div className="max-w-5xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EAE6DC] border border-[#DDD8CC] text-xs font-headline font-semibold text-[#52634B] tracking-wide mb-6">
          <Building2 className="w-3.5 h-3.5 text-[#52634B]" />
          <span>INSTITUTIONAL &amp; ACADEMY BULK SUPPLY // KANPUR &amp; UP</span>
        </div>

        <h1 className="font-headline text-3xl sm:text-5xl font-bold tracking-tight text-[#272923] leading-tight mb-6">
          Supplying the Champions of Tomorrow. <br />
          School Kits, Academy Crates &amp; GST Invoicing.
        </h1>

        <p className="font-body text-base sm:text-lg text-[#77776F] max-w-3xl leading-relaxed">
          K.K. Sports is the premier verified supplier for prominent schools, colleges, sports academies, and corporate clubs throughout Kanpur and Central Uttar Pradesh. From annual sports day kits to bulk match ball orders, we provide wholesale pricing with complete tax compliance.
        </p>
      </div>

      {/* 3 Core Supply Sectors */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        <div className="p-6 rounded-2xl bg-white border border-[#DDD8CC]">
          <div className="w-10 h-10 rounded-xl bg-[#F1EFE8] flex items-center justify-center text-[#52634B] mb-4">
            <School className="w-5 h-5" />
          </div>
          <h3 className="font-headline text-lg font-bold text-[#272923] mb-2">Schools &amp; Colleges</h3>
          <p className="font-body text-xs text-[#77776F] leading-relaxed mb-4">
            Comprehensive annual sports day equipment: shot puts, discus, relay batons, track marking, medals, football nets, and basketball backboard accessories.
          </p>
          <span className="text-[11px] font-semibold text-[#52634B] uppercase tracking-wider">
            GST Invoicing • Bulk Discounts
          </span>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-[#DDD8CC]">
          <div className="w-10 h-10 rounded-xl bg-[#F1EFE8] flex items-center justify-center text-[#52634B] mb-4">
            <Trophy className="w-5 h-5" />
          </div>
          <h3 className="font-headline text-lg font-bold text-[#272923] mb-2">Sports Academies</h3>
          <p className="font-body text-xs text-[#77776F] leading-relaxed mb-4">
            Heavy-duty coaching consumables: Leather cricket balls by 12-pack boxes, Yonex shuttlecock tubes, agility ladders, cones, and match-grade safety pads.
          </p>
          <span className="text-[11px] font-semibold text-[#52634B] uppercase tracking-wider">
            Regular Cadence Delivery
          </span>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-[#DDD8CC]">
          <div className="w-10 h-10 rounded-xl bg-[#F1EFE8] flex items-center justify-center text-[#52634B] mb-4">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="font-headline text-lg font-bold text-[#272923] mb-2">Corporate &amp; Clubs</h3>
          <p className="font-body text-xs text-[#77776F] leading-relaxed mb-4">
            Recreational club setups: Tournament carrom boards (Surco/Synco), regulation table tennis tables, chess sets, and company tournament gear.
          </p>
          <span className="text-[11px] font-semibold text-[#52634B] uppercase tracking-wider">
            Custom Branding Support
          </span>
        </div>
      </div>

      {/* Quote Generator Form & Institutional Assurances Split */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Form */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#DDD8CC] p-8 shadow-xs">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-[#F1EFE8] flex items-center justify-center text-[#52634B]">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-headline text-xl font-bold text-[#272923]">
                Request Official Institutional Quotation
              </h2>
              <p className="font-body text-xs text-[#77776F]">
                Direct transmission to our Institutional Sales Desk on WhatsApp
              </p>
            </div>
          </div>

          <form onSubmit={handleGenerateQuote} className="space-y-4 font-body text-xs">
            <div>
              <label className="block font-headline text-xs font-semibold text-[#272923] mb-1.5">
                School / Academy / Organization Name *
              </label>
              <input
                type="text"
                required
                value={institutionName}
                onChange={(e) => setInstitutionName(e.target.value)}
                placeholder="e.g. Seth Anandram Jaipuria School / Kanpur Cricket Academy"
                className="w-full px-4 py-2.5 rounded-xl border border-[#DDD8CC] bg-[#F8F7F3] text-[#272923] focus:outline-none focus:border-[#52634B] focus:bg-white text-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-headline text-xs font-semibold text-[#272923] mb-1.5">
                  Sports Officer / Coordinator Name *
                </label>
                <input
                  type="text"
                  required
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  placeholder="e.g. Coach Verma"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#DDD8CC] bg-[#F8F7F3] text-[#272923] focus:outline-none focus:border-[#52634B] focus:bg-white text-xs"
                />
              </div>

              <div>
                <label className="block font-headline text-xs font-semibold text-[#272923] mb-1.5">
                  Mobile / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 98390 XXXXX"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#DDD8CC] bg-[#F8F7F3] text-[#272923] focus:outline-none focus:border-[#52634B] focus:bg-white text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block font-headline text-xs font-semibold text-[#272923] mb-1.5">
                Supply Category
              </label>
              <select
                value={selectedPackage}
                onChange={(e) => setSelectedPackage(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#DDD8CC] bg-[#F8F7F3] text-[#272923] focus:outline-none focus:border-[#52634B] focus:bg-white text-xs"
              >
                <option value="School Annual Sports Day Kit">School Annual Sports Day Kit</option>
                <option value="Cricket Academy Consumables (Balls & Nets)">Cricket Academy Consumables (Balls &amp; Nets)</option>
                <option value="Badminton Rackets & Shuttlecock Tubes (Yonex Mavis)">Badminton Rackets &amp; Shuttlecock Tubes (Yonex Mavis)</option>
                <option value="Indoor Games & Recreation (TT, Carrom, Chess)">Indoor Games &amp; Recreation (TT, Carrom, Chess)</option>
                <option value="Custom Mixed Requirement">Custom Mixed Requirement</option>
              </select>
            </div>

            <div>
              <label className="block font-headline text-xs font-semibold text-[#272923] mb-1.5">
                Estimated Quantities &amp; Specifications
              </label>
              <textarea
                rows={3}
                value={requirement}
                onChange={(e) => setRequirement(e.target.value)}
                placeholder="List required items (e.g. 50 leather cricket balls, 20 Cosco footballs size 5, 10 relay batons)..."
                className="w-full px-4 py-2.5 rounded-xl border border-[#DDD8CC] bg-[#F8F7F3] text-[#272923] focus:outline-none focus:border-[#52634B] focus:bg-white text-xs resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#272923] text-white hover:bg-[#3D4037] font-headline text-xs font-semibold tracking-wide transition-all shadow-xs flex items-center justify-center gap-2 active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Generate Official Quote Request via WhatsApp</span>
            </button>
          </form>
        </div>

        {/* Right: Institutional Credentials */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="p-6 rounded-2xl bg-[#EAE6DC] border border-[#DDD8CC]">
            <h3 className="font-headline text-base font-bold text-[#272923] mb-4">
              Institutional Supply Checklist
            </h3>
            <ul className="space-y-3 font-body text-xs text-[#272923]">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#52634B] shrink-0 mt-0.5" />
                <span><strong>Tax Compliance:</strong> Authorized GST invoicing with accurate HSN classifications for audit compliance.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#52634B] shrink-0 mt-0.5" />
                <span><strong>Authenticity Guarantee:</strong> Direct brand authorized stocks (SS, SG, Yonex, Cosco, Nivia).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#52634B] shrink-0 mt-0.5" />
                <span><strong>Logistics Across UP:</strong> Safe bundled dispatch across Kanpur, Lucknow, Unnao, and adjoining districts.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#52634B] shrink-0 mt-0.5" />
                <span><strong>Sample Evaluation:</strong> Physical inspection of gear at our Meston Road showroom prior to purchase order.</span>
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#DDD8CC] flex flex-col gap-2">
            <span className="font-headline text-xs uppercase tracking-widest text-[#77776F] font-semibold">
              Direct Institutional Desk
            </span>
            <p className="font-headline text-lg font-bold text-[#272923]">
              {DISPLAY_PHONE}
            </p>
            <p className="font-body text-xs text-[#77776F]">
              Call between 10:30 AM and 8:30 PM for instant quotation or inspection appointment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
