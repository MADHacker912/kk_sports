import React from 'react';
import { getWholesaleInquiryUrl, DISPLAY_PHONE } from '../utils/whatsapp';
import { Building2, MessageSquare, Phone, FileCheck, Truck, Shield } from 'lucide-react';

export const WholesaleBanner: React.FC = () => {
  return (
    <section
      id="wholesale-institutional"
      className="w-full bg-surface-container py-space-xl lg:py-24 px-space-md lg:px-space-xl border-b border-cold-border"
    >
      <div className="max-w-7xl mx-auto rounded bg-gradient-to-r from-surface-container-low via-surface-container to-surface-container-low border border-cold-border p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
        {/* Ambient background glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-accent-lime/10 blur-[100px] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Content (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="inline-flex items-center gap-2">
              <Building2 className="w-4 h-4 text-accent-lime" />
              <span className="font-headline text-[10px] uppercase tracking-widest text-accent-lime font-bold">
                WHOLESALE &amp; INSTITUTIONAL DIVISION
              </span>
            </div>

            <h2 className="font-headline text-2xl sm:text-3xl lg:text-4xl uppercase text-white font-bold tracking-tight leading-tight">
              EQUIPPING ACADEMIES, SCHOOLS &amp; CLUBS ACROSS NORTH INDIA
            </h2>

            <p className="font-body text-sm sm:text-base text-on-surface-variant leading-relaxed max-w-xl">
              Are you managing a sports department, cricket academy, football club, or university team? Connect directly with our institutional desk for wholesale trade prices, customized GST quotations, and timely consignment delivery.
            </p>

            {/* Quick feature list */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="flex items-center gap-2 text-on-surface">
                <FileCheck className="w-4 h-4 text-accent-lime shrink-0" />
                <span>GST Tax Invoicing &amp; Quotations</span>
              </div>
              <div className="flex items-center gap-2 text-on-surface">
                <Truck className="w-4 h-4 text-accent-lime shrink-0" />
                <span>Bulk UP &amp; Inter-State Logistics</span>
              </div>
              <div className="flex items-center gap-2 text-on-surface">
                <Shield className="w-4 h-4 text-accent-lime shrink-0" />
                <span>Federation Approved Gear</span>
              </div>
            </div>
          </div>

          {/* Right: Actions Cluster (5 cols) */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
            <a
              href={getWholesaleInquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="py-4 px-6 rounded bg-accent-lime text-black font-headline text-xs sm:text-sm uppercase tracking-wider font-bold flex items-center justify-center gap-2 hover:brightness-110 shadow-[0_0_24px_rgba(198,255,53,0.3)] transition-all text-center"
            >
              <MessageSquare className="w-4 h-4" />
              <span>REQUEST WHOLESALE QUOTE</span>
            </a>

            <a
              href={`tel:${DISPLAY_PHONE.replace(/\s+/g, '')}`}
              className="py-4 px-6 rounded bg-surface-container-high hover:bg-surface-bright border border-cold-border text-white font-headline text-xs sm:text-sm uppercase tracking-wider font-bold flex items-center justify-center gap-2 transition-colors text-center"
            >
              <Phone className="w-4 h-4 text-accent-lime" />
              <span>TALK TO PROCUREMENT: {DISPLAY_PHONE}</span>
            </a>

            <p className="text-center font-mono text-[10px] text-on-surface-variant mt-1">
              Kanpur wholesale desk available Mon – Sat (10:00 AM – 8:00 PM).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
