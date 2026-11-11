import React, { useState, useEffect, useRef } from 'react';
import { PRODUCTS } from '../data/sportsData';
import { Product } from '../types';
import { Search, X, ArrowRight } from 'lucide-react';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (p: Product) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  const filteredProducts = trimmed === ''
    ? PRODUCTS.slice(0, 4)
    : PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(trimmed) ||
          p.categoryLabel.toLowerCase().includes(trimmed) ||
          p.shortDesc.toLowerCase().includes(trimmed) ||
          p.specs.some((s) => s.value.toLowerCase().includes(trimmed))
      );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Search Container */}
      <div className="relative w-full max-w-2xl bg-surface-container-low border border-cold-border rounded shadow-2xl overflow-hidden z-10">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 bg-surface-container border-b border-cold-border gap-3">
          <Search className="w-5 h-5 text-accent-lime shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search cricket bats, footballs, rackets, gym gear, carrom..."
            className="w-full bg-transparent text-white font-body text-sm placeholder:text-on-surface-variant focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-on-surface-variant hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 rounded bg-surface-container-high hover:bg-surface-bright text-xs font-headline uppercase tracking-wider text-on-surface-variant hover:text-white transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Search Results Area */}
        <div className="p-4 max-h-[60vh] overflow-y-auto flex flex-col gap-2">
          <div className="flex items-center justify-between pb-2 border-b border-cold-border/60">
            <span className="font-headline text-[10px] uppercase tracking-widest text-accent-lime font-bold">
              {trimmed ? `FOUND ${filteredProducts.length} ITEMS` : 'POPULAR INVENTORY HIGHLIGHTS'}
            </span>
            <span className="font-mono text-[10px] text-on-surface-variant">KANPUR FLAGSHIP</span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="py-8 text-center text-on-surface-variant text-sm">
              <p>No gear matching “{query}”.</p>
              <p className="text-xs text-on-surface-variant/70 mt-1">
                Try searching “Cricket”, “Football”, “Willow”, “Racket”, or “Dumbbell”.
              </p>
            </div>
          ) : (
            filteredProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => {
                  onSelectProduct(p);
                  onClose();
                }}
                className="group flex items-center justify-between p-3 rounded bg-surface-container hover:bg-surface-bright border border-cold-border hover:border-accent-lime cursor-pointer transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded bg-surface-container-lowest p-1 flex items-center justify-center shrink-0 border border-cold-border">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-accent-lime uppercase tracking-wider block">
                      {p.categoryLabel}
                    </span>
                    <h4 className="font-headline text-sm uppercase text-white font-bold group-hover:text-accent-lime transition-colors">
                      {p.name}
                    </h4>
                    <span className="font-body text-xs text-on-surface-variant line-clamp-1">
                      {p.shortDesc}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pl-3">
                  <span className="font-mono text-xs text-accent-lime hidden sm:inline">
                    {p.priceDisplay || 'Inquire'}
                  </span>
                  <ArrowRight className="w-4 h-4 text-on-surface-variant group-hover:text-accent-lime group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
