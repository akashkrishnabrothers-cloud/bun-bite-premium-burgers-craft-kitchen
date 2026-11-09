import React, { useMemo, useState } from 'react';
import { Plus, Search, Star, UtensilsCrossed, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, addToCart, setQuickViewProduct } = useCart();
  const [query, setQuery] = useState('');

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }, [query]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-20 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setIsSearchOpen(false)}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl bg-white text-neutral-900 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col">
        {/* Search Bar Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center gap-3 bg-neutral-50">
          <Search className="w-5 h-5 text-neutral-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search burgers, peri peri fries, wraps, shakes..."
            className="w-full bg-transparent text-sm sm:text-base font-medium text-neutral-900 placeholder-neutral-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-neutral-400 hover:text-black text-xs font-bold px-1.5 py-0.5 rounded"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1.5 text-neutral-400 hover:text-black rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-4 sm:p-5 space-y-2.5">
          {query.trim() === '' ? (
            <div className="py-8 text-center text-neutral-400 space-y-2">
              <UtensilsCrossed className="w-8 h-8 mx-auto text-neutral-300" />
              <p className="text-xs">Type what you crave (e.g. "bacon", "spicy", "fries")</p>
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                {['Beef Burger', 'Peri Peri Fries', 'Spicy Chicken', 'Choco Shake'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="text-xs px-2.5 py-1 rounded-full bg-neutral-100 hover:bg-[#FFBE24]/20 hover:text-neutral-900 text-neutral-600 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-8 text-center text-neutral-500">
              <p className="text-sm font-semibold">No items matched "{query}"</p>
              <p className="text-xs text-neutral-400 mt-1">Try searching for burger, fries, or drink</p>
            </div>
          ) : (
            filteredProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => {
                  setIsSearchOpen(false);
                  setQuickViewProduct(p);
                }}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-neutral-50 border border-transparent hover:border-neutral-200 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={p.image}
                    alt={p.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-lg object-cover bg-neutral-100 shrink-0"
                  />
                  <div>
                    <h4 className="font-heading font-bold text-sm text-neutral-950 uppercase group-hover:text-[#F5A623] transition-colors">
                      {p.name}
                    </h4>
                    <div className="flex items-center gap-2 text-[11px] text-neutral-500">
                      <span className="font-bold text-neutral-900 tabular-nums">₹{p.price}</span>
                      <span>•</span>
                      <span className="flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-[#FFBE24] text-[#FFBE24]" />
                        {p.rating}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(p, 1);
                    setIsSearchOpen(false);
                  }}
                  className="px-3 py-1.5 bg-[#FFBE24] hover:bg-[#E5A81B] text-neutral-950 font-heading font-bold text-xs uppercase tracking-wide rounded-lg flex items-center gap-1 shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
