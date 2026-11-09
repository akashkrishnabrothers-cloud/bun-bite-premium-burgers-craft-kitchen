import React from 'react';
import { Award, CheckCircle, Clock, Heart, Sparkles, Utensils, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INTERIOR_IMAGE } from '../data/products';

export const StoryModal: React.FC = () => {
  const { isStoryModalOpen, setIsStoryModalOpen } = useCart();

  if (!isStoryModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setIsStoryModalOpen(false)}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-white text-neutral-900 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 flex flex-col max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={() => setIsStoryModalOpen(false)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
          aria-label="Close story"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto">
          {/* Header Image */}
          <div className="relative h-60 sm:h-72 w-full bg-neutral-900">
            <img
              src={RESTAURANT_INTERIOR_IMAGE}
              alt="BUN & BITE Restaurant Interior"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-6 sm:p-8">
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#FFBE24] font-bold">
                  The BUN & BITE Journey
                </span>
                <h3 className="font-heading text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
                  Born from Passion for the Perfect Bite
                </h3>
              </div>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-6 sm:p-8 space-y-6 text-sm sm:text-base text-neutral-700 leading-relaxed">
            <p className="font-medium text-neutral-900 text-lg">
              We started BUN & BITE because we believed fast food shouldn't mean cut corners or
              artificial shortcuts.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#F7F4EF] border border-neutral-200">
                <Sparkles className="w-6 h-6 text-[#F5A623] mb-2" />
                <h4 className="font-heading font-bold text-neutral-950 uppercase text-sm mb-1">
                  1. Artisan Brioche
                </h4>
                <p className="text-xs text-neutral-600">
                  Proofed for 18 hours and baked fresh each sunrise with pure churned butter for
                  the perfect pillowy crust.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F7F4EF] border border-neutral-200">
                <Utensils className="w-6 h-6 text-[#FFBE24] mb-2" />
                <h4 className="font-heading font-bold text-neutral-950 uppercase text-sm mb-1">
                  2. Smashed To Order
                </h4>
                <p className="text-xs text-neutral-600">
                  Never frozen. Fresh patties smashed hard on cast-iron plates to lock in the
                  crispy caramelized edges.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F7F4EF] border border-neutral-200">
                <Heart className="w-6 h-6 text-rose-500 mb-2" />
                <h4 className="font-heading font-bold text-neutral-950 uppercase text-sm mb-1">
                  3. Community First
                </h4>
                <p className="text-xs text-neutral-600">
                  A modern, vibrant atmosphere where friends, families, and solo foodies gather
                  for honest delicious comfort food.
                </p>
              </div>
            </div>

            <p>
              Whether you drop by our flagship store in Connaught Place or order right to your couch,
              every burger is packed hot in ventilated eco-boxes so it reaches you at peak flavor.
            </p>

            <div className="pt-4 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>100% Quality Checked Daily</span>
              </div>

              <button
                onClick={() => setIsStoryModalOpen(false)}
                className="px-6 py-2.5 bg-neutral-950 hover:bg-neutral-800 text-white font-heading font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
              >
                Close & Return to Menu
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
