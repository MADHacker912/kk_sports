import React from 'react';
import { Shield } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="w-full bg-[#F8F7F3] pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EAE6DC] border border-[#DDD8CC] text-xs font-headline font-semibold text-[#52634B] tracking-wide mb-6">
          <Shield className="w-3.5 h-3.5 text-[#52634B]" />
          <span>LEGAL COMPLIANCE // PRIVACY CHARTER</span>
        </div>

        <h1 className="font-headline text-3xl sm:text-4xl font-bold tracking-tight text-[#272923] mb-4">
          Privacy Policy
        </h1>
        <p className="font-body text-xs text-[#77776F] mb-10">
          Last updated: November 2026 • K.K. Sports, Games &amp; Toys (Kanpur, India)
        </p>

        <div className="bg-white rounded-2xl border border-[#DDD8CC] p-8 sm:p-10 space-y-8 font-body text-xs sm:text-sm text-[#4A4C44] leading-relaxed shadow-xs">
          <section>
            <h2 className="font-headline text-base font-bold text-[#272923] mb-2">1. Scope of Policy</h2>
            <p>
              This Privacy Policy applies to personal information gathered through our web portal (kksports.in), direct WhatsApp customer support desk, institutional quotation workflows, and in-store customer records at our flagship location at 44/319, Meston Road, Parade, Kanpur, Uttar Pradesh – 208001.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-base font-bold text-[#272923] mb-2">2. Information We Collect</h2>
            <p className="mb-2">We collect only necessary information to fulfill sporting equipment orders, workshop bookings, and institutional inquiries:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#272923]">
              <li>Contact details: Name, phone number, institutional affiliation (school/club/academy), delivery address.</li>
              <li>Equipment service specifications: Bat weight preferences, racket string tension parameters, knocking requests.</li>
              <li>GST billing details for institutional and registered business accounts.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-headline text-base font-bold text-[#272923] mb-2">3. Use of Information</h2>
            <p>
              Your contact details are exclusively utilized to coordinate equipment dispatch, provide atelier updates (e.g., when your bat knocking or racket restringing is completed), and share formal price quotations. We never sell, rent, or trade customer information with third-party advertisers.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-base font-bold text-[#272923] mb-2">4. Direct WhatsApp Communications</h2>
            <p>
              Inquiries initiated through our WhatsApp buttons operate under WhatsApp’s end-to-end encrypted messaging framework. We retain chat histories strictly for warranty records, service tracking, and order confirmations.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-base font-bold text-[#272923] mb-2">5. Data Retention &amp; Rights</h2>
            <p>
              You may request modification or deletion of your customer contact record at any time by contacting our store directly at +91 9569886010 or visiting our counter at Meston Road, Kanpur.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
