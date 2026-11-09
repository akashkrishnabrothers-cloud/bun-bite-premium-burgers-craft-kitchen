import React from 'react';
import { ArrowRight, Flame, Heart, Leaf, ShieldCheck, Sparkles, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { HERO_IMAGE } from '../data/products';
import { RESTAURANT_INFO } from '../data/restaurantInfo';

export const HeroSection: React.FC = () => {
  const { setIsCartOpen } = useCart();

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[#090909] text-white pt-8 pb-16 lg:py-20 border-b border-neutral-900"
    >
      {/* Subtle Atmospheric Ambient Glow */}
      <div
        className="absolute top-1/4 left-1/3 -translate-x-1/2 w-96 h-96 bg-[#FFBE24]/10 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-10 w-96 h-96 bg-[#F5A623]/10 rounded-full blur-[160px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center min-h-[580px] lg:min-h-[640px]">
          {/* Left Column: 45% (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-center z-10 space-y-6 text-left">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FFBE24]" />
              <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#FFBE24] uppercase font-mono">
                {RESTAURANT_INFO.heroEyebrow}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-black uppercase tracking-tight leading-[0.98] text-white">
              BURGERS <br />
              THAT BRING <br />
              <span className="text-[#FFBE24] drop-shadow-sm">PEOPLE TOGETHER</span>
            </h1>

            {/* Supporting Description */}
            <p className="text-neutral-300 text-base sm:text-lg leading-relaxed max-w-xl font-normal">
              {RESTAURANT_INFO.heroDescription}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setIsCartOpen(true)}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#FFBE24] hover:bg-[#E5A81B] active:scale-98 text-[#090909] font-heading font-black text-base uppercase tracking-wider rounded-xl shadow-xl shadow-[#FFBE24]/20 transition-all cursor-pointer group"
              >
                <span>Order Online</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={scrollToMenu}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-neutral-900/90 hover:bg-neutral-800 text-white hover:text-[#FFBE24] border border-neutral-700/80 font-heading font-bold text-base uppercase tracking-wider rounded-xl transition-all cursor-pointer"
              >
                <span>Explore Menu</span>
              </button>
            </div>

            {/* Trust Indicators (4 items) */}
            <div className="pt-6 border-t border-neutral-800/80">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                {/* 1. Fresh Ingredients */}
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
                    <Leaf className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-medium text-neutral-300">Fresh Ingredients</span>
                </div>

                {/* 2. 100% Quality */}
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#FFBE24]/15 text-[#FFBE24] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-medium text-neutral-300">100% Quality</span>
                </div>

                {/* 3. Loved by 10,000+ Foodies */}
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-rose-500/15 text-rose-400 flex items-center justify-center shrink-0">
                    <Heart className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-medium text-neutral-300">10,000+ Foodies</span>
                </div>

                {/* 4. 4.8/5 Customer Rating */}
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/15 text-[#FFBE24] flex items-center justify-center shrink-0">
                    <Star className="w-3.5 h-3.5 fill-[#FFBE24]" />
                  </div>
                  <span className="font-medium text-neutral-300">4.8 / 5 Rating</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 55% (lg:col-span-7) Visual Composition */}
          <div className="lg:col-span-7 relative flex items-center justify-center">
            {/* Background Radial Light Vignette */}
            <div className="relative w-full max-w-2xl mx-auto group">
              {/* Decorative Handwritten Phrase Callout */}
              <div className="absolute -top-5 sm:-top-8 right-4 sm:right-12 z-20 transform rotate-[-4deg] select-none pointer-events-none">
                <span className="font-handwriting text-2xl sm:text-3xl lg:text-4xl text-[#FFBE24] drop-shadow-[0_2px_10px_rgba(255,190,36,0.5)] font-bold">
                  “{RESTAURANT_INFO.heroHandwritten}”
                </span>
              </div>

              {/* Burger Container with Soft Glow */}
              <div className="relative rounded-3xl overflow-hidden border border-neutral-800/80 bg-neutral-950/60 shadow-2xl shadow-black/80">
                <img
                  src={HERO_IMAGE}
                  alt="Gigantic BUN & BITE signature cheeseburger with melted cheddar, golden fries and chilled iced cola"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center max-h-[520px] transition-transform duration-700 group-hover:scale-[1.02]"
                />

                {/* Smooth Dark Vignette Edges */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent opacity-60 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#090909]/40 via-transparent to-transparent pointer-events-none" />

                {/* Floating Fresh Badge */}
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-[#090909]/90 backdrop-blur-md border border-neutral-700/80 px-4 py-2.5 rounded-2xl flex items-center gap-3 shadow-lg">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                  <div>
                    <span className="block text-[10px] uppercase tracking-widest text-[#FFBE24] font-mono">
                      Chef Special
                    </span>
                    <span className="text-xs font-bold text-white">
                      100% Smashed Brioche
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
