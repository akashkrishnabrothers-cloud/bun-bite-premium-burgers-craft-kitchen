import React from 'react';
import { ArrowRight, Flame, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PROMO_COMBO_IMAGE, PROMO_DESSERT_IMAGE } from '../data/products';

export const PromotionalBanners: React.FC = () => {
  const { setActiveCategory } = useCart();

  const handleGoToCombos = () => {
    setActiveCategory('combos');
    const el = document.getElementById('bestsellers');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGoToDesserts = () => {
    setActiveCategory('desserts');
    const el = document.getElementById('bestsellers');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-white py-14 lg:py-20 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT PANEL — COMBO PROMOTION (Dark Black) */}
          <div className="relative rounded-3xl overflow-hidden bg-[#090909] text-white p-8 sm:p-10 flex flex-col justify-between min-h-[340px] shadow-xl group border border-neutral-800">
            {/* Background Image with Gradient Overlay */}
            <div className="absolute inset-0 z-0">
              <img
                src={PROMO_COMBO_IMAGE}
                alt="Burger, fries and drink combo meal"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-right sm:object-center transition-transform duration-700 group-hover:scale-105 opacity-40 sm:opacity-55"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#090909] via-[#090909]/80 to-transparent" />
            </div>

            {/* Handwritten Decorative Accent */}
            <div className="relative z-10 select-none">
              <span className="font-handwriting text-2xl sm:text-3xl text-[#FFBE24] font-bold">
                “Save up to 25% Today”
              </span>
            </div>

            {/* Content Body */}
            <div className="relative z-10 max-w-sm my-6 space-y-3">
              <h3 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-none text-white">
                COMBO IT <br />
                <span className="text-[#FFBE24]">BETTER</span>
              </h3>
              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                Burgers + Fries + Drink = A Happier You!
              </p>
            </div>

            {/* CTA Button */}
            <div className="relative z-10">
              <button
                onClick={handleGoToCombos}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFBE24] hover:bg-[#E5A81B] active:scale-95 text-[#090909] font-heading font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-lg transition-all cursor-pointer group/btn"
              >
                <span>Explore Combos</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* RIGHT PANEL — DESSERT PROMOTION (Warm Cream) */}
          <div className="relative rounded-3xl overflow-hidden bg-[#F7F4EF] text-neutral-900 p-8 sm:p-10 flex flex-col justify-between min-h-[340px] shadow-lg group border border-neutral-200">
            {/* Background Image with Gradient Overlay */}
            <div className="absolute inset-0 z-0">
              <img
                src={PROMO_DESSERT_IMAGE}
                alt="Decadent chocolate milkshake with whipped cream"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-right sm:object-center transition-transform duration-700 group-hover:scale-105 opacity-35 sm:opacity-55"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#F7F4EF] via-[#F7F4EF]/85 to-transparent" />
            </div>

            {/* Handwritten Decorative Accent */}
            <div className="relative z-10 select-none">
              <span className="font-handwriting text-2xl sm:text-3xl text-[#F5A623] font-bold">
                “Pure Sweet Bliss”
              </span>
            </div>

            {/* Content Body */}
            <div className="relative z-10 max-w-sm my-6 space-y-3">
              <h3 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-none text-neutral-950">
                SWEET <br />
                <span className="text-[#F5A623]">ENDINGS</span>
              </h3>
              <p className="text-neutral-700 text-sm sm:text-base leading-relaxed">
                Because every great meal deserves a sweeter finish.
              </p>
            </div>

            {/* CTA Button */}
            <div className="relative z-10">
              <button
                onClick={handleGoToDesserts}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#090909] hover:bg-neutral-800 active:scale-95 text-white font-heading font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-lg transition-all cursor-pointer group/btn"
              >
                <span>View Desserts</span>
                <ArrowRight className="w-4 h-4 text-[#FFBE24] group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
