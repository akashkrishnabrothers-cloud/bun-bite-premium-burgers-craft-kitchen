import React from 'react';
import { ArrowRight, Flame, Heart, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INTERIOR_IMAGE } from '../data/products';
import { RESTAURANT_INFO } from '../data/restaurantInfo';

export const StorySection: React.FC = () => {
  const { setIsStoryModalOpen } = useCart();

  return (
    <section id="story" className="bg-[#F7F4EF] py-16 lg:py-24 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: 50% (~6 cols) Restaurant Interior Photography */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-neutral-300/80 bg-neutral-900 group">
              <img
                src={RESTAURANT_INTERIOR_IMAGE}
                alt="Stylish modern interior of BUN & BITE restaurant with warm pendant lights and leather booths"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover max-h-[460px] transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-neutral-200/80">
                <span className="block font-heading font-black text-sm text-neutral-950 uppercase tracking-wider">
                  Flagship Craft Kitchen
                </span>
                <span className="text-xs text-neutral-600 font-mono">
                  Dine-In • Open Flame Grills
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: 50% (~6 cols) Brand Storytelling Content */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6 text-left">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#FFBE24]" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#F5A623] font-mono">
                  OUR STORY
                </span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-[46px] font-black uppercase tracking-tight text-neutral-950 leading-tight">
                More Than <br />
                <span className="text-[#F5A623]">Just Burgers</span>
              </h2>
            </div>

            <p className="text-neutral-700 text-base sm:text-lg leading-relaxed font-normal">
              We started BUN & BITE with a simple belief — great food brings people closer.
              From our kitchen to your table, we're here to make every bite count.
            </p>

            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              Every morning begins with artisan brioche batches delivered straight from our
              ovens, 100% fresh cuts hand-pressed on seasoned flat-tops, and secret sauces
              whisked from scratch. It’s comforting, unapologetically delicious food meant to be
              shared with good company.
            </p>

            {/* CTA */}
            <div>
              <button
                onClick={() => setIsStoryModalOpen(true)}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-neutral-950 hover:bg-neutral-800 active:scale-95 text-white font-heading font-black text-sm uppercase tracking-wider rounded-xl shadow-lg transition-all cursor-pointer group"
              >
                <span>Our Story</span>
                <ArrowRight className="w-4 h-4 text-[#FFBE24] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Handwritten Phrase & Original Burger Illustration Motif */}
            <div className="pt-4 flex flex-col sm:flex-row sm:items-center gap-4">
              <span className="font-handwriting text-3xl sm:text-4xl text-[#F5A623] font-bold select-none">
                “{RESTAURANT_INFO.storyHandwritten}”
              </span>

              {/* Minimal original burger illustration SVG */}
              <div className="flex items-center gap-2 text-neutral-400">
                <svg
                  className="w-10 h-10 text-[#FFBE24]"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Top Bun */}
                  <path
                    d="M6 22C6 13 14 6 24 6C34 6 42 13 42 22H6Z"
                    fill="currentColor"
                    fillOpacity="0.25"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Sesame Seeds */}
                  <circle cx="18" cy="14" r="1.2" fill="currentColor" />
                  <circle cx="24" cy="11" r="1.2" fill="currentColor" />
                  <circle cx="30" cy="15" r="1.2" fill="currentColor" />
                  {/* Lettuce Wavy */}
                  <path
                    d="M4 26C7 24 9 27 12 25C15 23 17 26 20 25C23 23 25 26 28 25C31 23 33 26 36 25C39 23 41 26 44 25"
                    stroke="#10B981"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  {/* Patty */}
                  <rect
                    x="5"
                    y="29"
                    width="38"
                    height="6"
                    rx="3"
                    fill="#F5A623"
                    stroke="#D97706"
                    strokeWidth="2"
                  />
                  {/* Bottom Bun */}
                  <path
                    d="M8 38C8 41.5 14 43 24 43C34 43 40 41.5 40 38H8Z"
                    fill="currentColor"
                    fillOpacity="0.25"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
                  Est. Craft Kitchen
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
