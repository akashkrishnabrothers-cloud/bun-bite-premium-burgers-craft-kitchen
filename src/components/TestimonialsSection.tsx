import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, Quote, Star } from 'lucide-react';
import { TESTIMONIALS } from '../data/restaurantInfo';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="bg-white py-16 lg:py-24 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#FFBE24]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#F5A623] font-mono">
                REAL PEOPLE. REAL BURGERS.
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[44px] font-black uppercase tracking-tight text-neutral-950">
              What Our Customers Say
            </h2>
          </div>

          {/* Carousel Arrows for Mobile/Tablet */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={prevSlide}
              aria-label="Previous review"
              className="p-2 rounded-xl border border-neutral-200 hover:bg-neutral-100 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-neutral-700" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next review"
              className="p-2 rounded-xl bg-neutral-950 text-white hover:bg-neutral-800 transition-colors"
            >
              <ArrowRight className="w-4 h-4 text-[#FFBE24]" />
            </button>
          </div>
        </div>

        {/* Desktop 3-Card Grid, Mobile Responsive Carousel/Stack */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS.map((item, index) => (
            <div
              key={item.id}
              className={`bg-white rounded-3xl p-7 border border-neutral-200 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between ${
                index === currentIndex ? 'block' : 'hidden md:flex'
              }`}
            >
              <div>
                {/* 5 Golden Stars & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-[#FFBE24] text-[#FFBE24]"
                      />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#FFBE24]/40" />
                </div>

                {/* Review Text */}
                <p className="text-neutral-800 text-base leading-relaxed italic mb-6">
                  “{item.comment}”
                </p>
              </div>

              {/* Customer Author Profile */}
              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-[#FFBE24]/50"
                  />
                  <div>
                    <h3 className="font-heading font-bold text-neutral-950 text-base uppercase leading-tight">
                      {item.name}
                    </h3>
                    <span className="text-xs text-neutral-500 block">
                      {item.role}
                    </span>
                  </div>
                </div>

                {/* Verified Customer Badge */}
                {item.verified && (
                  <div
                    title="Verified Customer"
                    className="flex items-center gap-1 text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Verified</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
