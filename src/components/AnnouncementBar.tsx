import React, { useState } from 'react';
import { ArrowRight, Sparkles, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const AnnouncementBar: React.FC = () => {
  const [isDismissed, setIsDismissed] = useState(false);
  const { setIsOffersOpen } = useCart();

  if (isDismissed) return null;

  return (
    <div
      role="banner"
      className="relative z-50 bg-[#FFBE24] text-[#090909] text-xs font-semibold px-4 py-2 transition-all duration-300 shadow-sm"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left Spacer for true centering on desktop */}
        <div className="hidden md:block w-6" aria-hidden="true" />

        {/* Center Promotional Message */}
        <div className="flex-1 flex items-center justify-center gap-2 text-center flex-wrap">
          <Sparkles className="w-3.5 h-3.5 text-[#090909] shrink-0" />
          <span className="tracking-wide">
            Fresh Burgers. Bigger Smiles. Better Deals.
          </span>
          <span className="hidden sm:inline opacity-40">|</span>
          <button
            onClick={() => setIsOffersOpen(true)}
            className="inline-flex items-center gap-1 underline underline-offset-2 hover:text-black font-bold ml-1 transition-colors cursor-pointer group"
          >
            <span>Explore Offers</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Dismiss Button */}
        <button
          onClick={() => setIsDismissed(true)}
          className="text-[#090909]/70 hover:text-[#090909] p-0.5 rounded transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
          aria-label="Dismiss announcement"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
