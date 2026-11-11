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
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-product-title"
        className="relative w-full max-w-4xl bg-surface-container-low border border-cold-border rounded shadow-2xl overflow-hidden my-8 z-10 animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-surface-container border-b border-cold-border">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-lime" />
            <span className="font-headline text-[10px] sm:text-xs uppercase tracking-widest text-accent-lime">
              PRODUCT SPECIFICATION // {product.categoryLabel.toUpperCase()}
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close details"
            className="p-1.5 rounded hover:bg-surface-bright text-on-surface-variant hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8">
          {/* Left Column: Image & Media (5 cols) */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="relative aspect-square w-full rounded bg-surface-container p-4 border border-cold-border flex items-center justify-center overflow-hidden group">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-[85%] max-w-[85%] object-contain filter contrast-105 group-hover:scale-105 transition-transform duration-500"
              />
              {product.badge && (
                <div className="absolute top-3 left-3 bg-surface-container-lowest/90 border border-accent-lime/40 px-2.5 py-1 rounded">
                  <span className="font-headline text-[10px] text-accent-lime uppercase tracking-wider font-bold">
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
                className="w-full py-2.5 px-4 rounded bg-surface-container-high hover:bg-surface-bright border border-accent-lime/50 text-accent-lime font-headline text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                <span>INSPECT IN 360° ATELIER</span>
              </button>
            )}

            {/* Authenticity Guarantee Card */}
            <div className="p-3.5 rounded bg-surface-container border border-cold-border flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-accent-lime shrink-0 mt-0.5" />
              <div className="text-xs text-on-surface-variant">
                <span className="font-headline text-white uppercase font-bold block mb-0.5">
                  100% Genuine Guaranteed
                </span>
                Direct brand import. Sourced through authorized sports federations and official Indian distributors.
              </div>
            </div>
          </div>

          {/* Right Column: Information & Specs (7 cols) */}
          <div className="md:col-span-7 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-4">
              <div>
                <span className="font-mono text-xs text-on-surface-variant block mb-1">
                  SKU: {product.id.toUpperCase()}
                </span>
                <h3
                  id="modal-product-title"
                  className="font-headline text-2xl sm:text-3xl uppercase text-white font-bold tracking-tight leading-snug"
                >
                  {product.name}
                </h3>
                {product.priceDisplay && (
                  <span className="font-headline text-lg text-accent-lime font-bold mt-1 block">
                    {product.priceDisplay}
                  </span>
                )}
              </div>

              <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                {product.fullDesc}
              </p>

              {/* Technical Specifications Table */}
              <div className="flex flex-col gap-1.5 pt-2">
                <span className="font-headline text-[11px] uppercase tracking-wider text-white font-bold">
                  TECHNICAL SPECIFICATIONS
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {product.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="p-2 rounded bg-surface-container border border-cold-border flex flex-col"
                    >
                      <span className="font-mono text-[10px] text-on-surface-variant uppercase">
                        {spec.label}
                      </span>
                      <span className="font-headline font-semibold text-white mt-0.5">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              <div className="flex flex-col gap-1.5 pt-2">
                <span className="font-headline text-[11px] uppercase tracking-wider text-white font-bold">
                  HIGHLIGHTS &amp; SERVICES
                </span>
                <div className="flex flex-col gap-1.5 text-xs text-on-surface-variant">
                  {product.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-accent-lime shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions Cluster */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-cold-border">
              <a
                href={inquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 py-3 px-5 rounded bg-accent-lime text-black font-headline text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 hover:brightness-110 shadow-[0_0_20px_rgba(198,255,53,0.25)] transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>INQUIRE ON WHATSAPP</span>
              </a>

              <a
                href={`tel:${DISPLAY_PHONE.replace(/\s+/g, '')}`}
                className="w-full sm:w-auto py-3 px-5 rounded bg-surface-container hover:bg-surface-bright border border-cold-border text-white font-headline text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-accent-lime" />
                <span>CALL STORE</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
