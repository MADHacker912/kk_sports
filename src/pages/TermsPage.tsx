import React from 'react';
import { FileText } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="w-full bg-[#F8F7F3] pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EAE6DC] border border-[#DDD8CC] text-xs font-headline font-semibold text-[#52634B] tracking-wide mb-6">
          <FileText className="w-3.5 h-3.5 text-[#52634B]" />
          <span>LEGAL COMPLIANCE // STORE TERMS &amp; POLICIES</span>
        </div>

        <h1 className="font-headline text-3xl sm:text-4xl font-bold tracking-tight text-[#272923] mb-4">
          Terms of Service &amp; Store Policies
        </h1>
        <p className="font-body text-xs text-[#77776F] mb-10">
          Last updated: November 2026 • K.K. Sports, Games &amp; Toys (Kanpur, India)
        </p>

        <div className="bg-white rounded-2xl border border-[#DDD8CC] p-8 sm:p-10 space-y-8 font-body text-xs sm:text-sm text-[#4A4C44] leading-relaxed shadow-xs">
          <section>
            <h2 className="font-headline text-base font-bold text-[#272923] mb-2">1. Authenticity &amp; Invoicing</h2>
            <p>
              All products sold by K.K. Sports are 100% genuine items sourced from authorized brand channels (including SS, SG, Yonex, Cosco, and Nivia). Every physical and institutional sale is supported by a valid tax invoice with statutory GST breakdown.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-base font-bold text-[#272923] mb-2">2. Natural Willow Warranty &amp; Inherent Material Notice</h2>
            <p className="mb-2">
              Cricket bats crafted from English Willow and Kashmir Willow are organic wood products subjected to high-velocity impacts. Please note:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#272923]">
              <li>Surface seam marks and natural grain indentations are standard during match play and do not constitute manufacturing defects.</li>
              <li>Bats used against substandard, compound, or non-leather balls with raw unknocked edges void manufacturer replacement terms.</li>
              <li>Handle snapping due to core wood failure within 30 days of purchase is subject to authorized manufacturer inspection.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-headline text-base font-bold text-[#272923] mb-2">3. Atelier Workshop Services (Knocking &amp; Stringing)</h2>
            <p>
              While our automated 15,000-cycle machine knocking substantially conditions raw willow, players are strongly advised to play with gentle netting practice (old balls) before facing new hard leather match balls. Custom string tensions above manufacturer maximum rating (e.g. over 30 lbs on light graphite frames) are undertaken at player's risk.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-base font-bold text-[#272923] mb-2">4. Returns, Exchange &amp; In-Store Evaluation</h2>
            <p>
              Unused equipment in pristine original packaging with tags, barcodes, and holograms intact may be exchanged within 7 days at our Meston Road store with original receipt. Customized, oiled, knocked, or restrung items are non-exchangeable once personalized.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-base font-bold text-[#272923] mb-2">5. Institutional &amp; School Orders</h2>
            <p>
              Formal quotations are valid for 15 calendar days from issuance. Bulk deliveries across Kanpur and regional districts are coordinated through reliable transport with physical delivery challans.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
