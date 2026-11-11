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
        className="fixed inset-0 bg-black/85 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Search Container */}
      <div className="relative w-full max-w-xl bg-[#101215] border border-[#232730] rounded shadow-2xl overflow-hidden z-10">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 bg-[#15181D] border-b border-[#232730] gap-3">
          <Search className="w-4 h-4 text-[#A1A1AA] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search cricket bats, footballs, rackets, gym gear, carrom..."
            className="w-full bg-transparent text-white font-body text-sm placeholder:text-[#A1A1AA]/60 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#A1A1AA] hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-0.5 rounded bg-[#17191D] hover:bg-[#1F2228] text-[10px] font-mono uppercase tracking-wider text-[#A1A1AA] hover:text-white transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="p-3 max-h-[55vh] overflow-y-auto flex flex-col gap-1.5">
          <div className="flex items-center justify-between px-2 py-1">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#A1A1AA]">
              {trimmed ? `${filteredProducts.length} Results` : 'Recommended Products'}
            </span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="py-8 text-center text-[#A1A1AA] text-xs">
              <p>No products matching “{query}”.</p>
            </div>
          ) : (
            filteredProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => {
                  onSelectProduct(p);
                  onClose();
                }}
                className="group flex items-center justify-between p-2.5 rounded bg-[#15181D] hover:bg-[#1C2027] border border-[#232730] hover:border-[#A1A1AA] cursor-pointer transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-[#08090B] p-1 flex items-center justify-center shrink-0">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-[#A1A1AA] uppercase tracking-wider block">
                      {p.categoryLabel}
                    </span>
                    <h4 className="font-headline text-xs uppercase text-white font-bold group-hover:text-[#C6FF35] transition-colors">
                      {p.name}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-2 pl-3">
                  <span className="font-mono text-xs text-white hidden sm:inline">
                    {p.priceDisplay || 'Inquire'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#A1A1AA] group-hover:text-white transition-colors" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
