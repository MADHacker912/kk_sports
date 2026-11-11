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
        className="fixed inset-0 bg-[#242720]/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-product-title"
        className="relative w-full max-w-3xl bg-white border border-[#E7E5DE] rounded-lg shadow-xl overflow-hidden my-8 z-10"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#F8F7F3] border-b border-[#E7E5DE]">
          <span className="font-mono text-xs uppercase tracking-wider text-[#77776F]">
            Product Details // {product.categoryLabel}
          </span>

          <button
            onClick={onClose}
            aria-label="Close details"
            className="p-1 rounded-md text-[#77776F] hover:text-[#242720] hover:bg-[#E7E5DE] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8">
          {/* Left Column: Image & Media (5 cols) */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="relative aspect-square w-full rounded-md bg-[#FAFAFA] p-6 border border-[#E7E5DE] flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-full max-w-full object-contain filter contrast-[1.02]"
              />
              {product.badge && (
                <div className="absolute top-3 left-3">
                  <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#F0EFE9] text-[#66785F] border border-[#E7E5DE] font-semibold">
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
                className="w-full py-2.5 px-4 rounded-md bg-[#F0EFE9] hover:bg-[#E7E5DE] border border-[#E7E5DE] text-[#242720] font-headline text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#66785F]" />
                <span>Inspect in 360° Studio</span>
              </button>
            )}

            {/* Guarantee Note */}
            <div className="p-3.5 rounded-md bg-[#F8F7F3] border border-[#E7E5DE] flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-[#66785F] shrink-0 mt-0.5" />
              <div className="text-xs text-[#77776F]">
                <span className="font-headline text-[#242720] font-bold block mb-0.5">
                  100% Genuine Direct Import
                </span>
                Direct manufacturer authorized inventory with official batch verification.
              </div>
            </div>
          </div>

          {/* Right Column: Information & Specs (7 cols) */}
          <div className="md:col-span-7 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-4">
              <div>
                <span className="font-body text-xs text-[#77776F] block mb-1">
                  SKU: {product.id.toUpperCase()}
                </span>
                <h3
                  id="modal-product-title"
                  className="font-headline text-2xl font-bold tracking-tight text-[#242720] leading-snug"
                >
                  {product.name}
                </h3>
                <span className="font-body text-sm text-[#242720] font-semibold mt-1 block">
                  {product.priceDisplay || 'Inquire on Spec'}
                </span>
              </div>

              <p className="font-body text-xs sm:text-sm text-[#77776F] leading-relaxed">
                {product.fullDesc}
              </p>

              {/* Technical Specifications */}
              <div className="flex flex-col gap-2 pt-2 border-t border-[#E7E5DE]">
                <span className="font-headline text-xs font-bold text-[#242720]">
                  Specifications
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {product.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="p-2 rounded bg-[#F8F7F3] border border-[#E7E5DE] flex flex-col"
                    >
                      <span className="font-mono text-[9px] text-[#77776F] uppercase">
                        {spec.label}
                      </span>
                      <span className="font-body text-xs font-semibold text-[#242720] mt-0.5">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div className="flex flex-col gap-1.5 pt-2 border-t border-[#E7E5DE]">
                <span className="font-headline text-xs font-bold text-[#242720]">
                  Highlights
                </span>
                <div className="flex flex-col gap-1 text-xs text-[#77776F]">
                  {product.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#66785F] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-[#E7E5DE]">
              <a
                href={inquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 py-3 px-5 rounded-md bg-[#242720] hover:bg-[#66785F] text-white font-headline text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors text-center"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Inquire on WhatsApp</span>
              </a>

              <a
                href={`tel:${DISPLAY_PHONE.replace(/\s+/g, '')}`}
                className="w-full sm:w-auto py-3 px-5 rounded-md bg-[#F0EFE9] hover:bg-[#E7E5DE] border border-[#E7E5DE] text-[#242720] font-headline text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-[#66785F]" />
                <span>Call Store</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
