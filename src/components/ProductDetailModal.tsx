import React from 'react';
import { Product } from '../types';
import { getProductInquiryUrl, DISPLAY_PHONE } from '../utils/whatsapp';
import { X, MessageSquare, Phone, ShieldCheck, Check, Sparkles } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onOpen360?: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onOpen360,
}) => {
  if (!product) return null;

  const inquiryUrl = getProductInquiryUrl(product.name);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-product-title"
        className="relative w-full max-w-3xl bg-[#101215] border border-[#232730] rounded shadow-2xl overflow-hidden my-8 z-10"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#15181D] border-b border-[#232730]">
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#A1A1AA]">
            SPECIFICATION // {product.categoryLabel.toUpperCase()}
          </span>

          <button
            onClick={onClose}
            aria-label="Close details"
            className="p-1 rounded text-[#A1A1AA] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8">
          {/* Left Column: Image & Media (5 cols) */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="relative aspect-square w-full rounded bg-[#17191D] p-6 border border-[#232730] flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-full max-w-full object-contain filter contrast-105"
              />
              {product.badge && (
                <div className="absolute top-3 left-3">
                  <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#08090B] text-[#C6FF35] border border-[#2C3038]">
                    {product.badge}
                  </span>
                </div>
              )}
            </div>

            {/* If 360 available */}
            {product.isFlagship360 && onOpen360 && (
              <button
                onClick={() => {
                  onClose();
                  onOpen360();
                }}
                className="w-full py-2.5 px-4 rounded bg-[#17191D] hover:bg-[#1F2228] border border-[#2C3038] text-[#C6FF35] font-headline text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>INSPECT IN 360° ATELIER</span>
              </button>
            )}

            {/* Guarantee Note */}
            <div className="p-3.5 rounded bg-[#15181D] border border-[#232730] flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-[#C6FF35] shrink-0 mt-0.5" />
              <div className="text-xs text-[#A1A1AA]">
                <span className="font-headline text-white uppercase font-bold block mb-0.5">
                  100% Genuine Direct Import
                </span>
                Sourced through official manufacturer agreements with verifiable batch holograms.
              </div>
            </div>
          </div>

          {/* Right Column: Information & Specs (7 cols) */}
          <div className="md:col-span-7 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-4">
              <div>
                <span className="font-mono text-[10px] text-[#A1A1AA] uppercase block mb-1">
                  SKU: {product.id.toUpperCase()}
                </span>
                <h3
                  id="modal-product-title"
                  className="font-headline text-2xl uppercase text-white font-bold tracking-tight leading-snug"
                >
                  {product.name}
                </h3>
                <span className="font-mono text-sm text-[#C6FF35] font-semibold mt-1 block">
                  {product.priceDisplay || 'Inquire on Spec'}
                </span>
              </div>

              <p className="font-body text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                {product.fullDesc}
              </p>

              {/* Technical Specifications Table */}
              <div className="flex flex-col gap-2 pt-2 border-t border-[#1F2228]">
                <span className="font-headline text-[11px] uppercase tracking-wider text-white font-bold">
                  SPECIFICATIONS
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {product.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="p-2 rounded bg-[#17191D] border border-[#232730] flex flex-col"
                    >
                      <span className="font-mono text-[9px] text-[#A1A1AA] uppercase">
                        {spec.label}
                      </span>
                      <span className="font-headline text-xs font-semibold text-white mt-0.5">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div className="flex flex-col gap-1.5 pt-2 border-t border-[#1F2228]">
                <span className="font-headline text-[11px] uppercase tracking-wider text-white font-bold">
                  HIGHLIGHTS
                </span>
                <div className="flex flex-col gap-1 text-xs text-[#A1A1AA]">
                  {product.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#C6FF35] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-[#1F2228]">
              <a
                href={inquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 py-3 px-5 rounded bg-white hover:bg-[#C6FF35] text-black font-headline text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>INQUIRE ON WHATSAPP</span>
              </a>

              <a
                href={`tel:${DISPLAY_PHONE.replace(/\s+/g, '')}`}
                className="w-full sm:w-auto py-3 px-5 rounded bg-[#17191D] hover:bg-[#1F2228] border border-[#2C3038] text-white font-headline text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-[#C6FF35]" />
                <span>CALL STORE</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
