import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CATEGORIES_DATA } from '../data/products';

export const MenuCategories: React.FC = () => {
  const { activeCategory, setActiveCategory } = useCart();

  const handleSelectCategory = (categoryId: string) => {
    setActiveCategory(categoryId);
    const el = document.getElementById('bestsellers');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-white text-neutral-900 py-12 lg:py-16 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Strip */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#FFBE24]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#F5A623] font-mono">
                EXPLORE OUR MENU
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[42px] font-extrabold uppercase tracking-tight text-neutral-950">
              Something for Every Craving
            </h2>
          </div>

          <button
            onClick={() => handleSelectCategory('all')}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-neutral-900 hover:text-[#F5A623] transition-colors cursor-pointer group shrink-0"
          >
            <span>View Full Menu</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Categories Strip: Horizontal Grid on Desktop, Smooth Touch Scroll on Mobile */}
        <div className="flex items-stretch gap-4 sm:gap-6 overflow-x-auto pb-4 pt-2 no-scrollbar scroll-smooth">
          {CATEGORIES_DATA.map((cat) => {
            const isSelected = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => handleSelectCategory(cat.id)}
                className="group flex flex-col items-center flex-1 min-w-[105px] sm:min-w-[125px] p-2 text-center transition-all cursor-pointer focus:outline-none"
              >
                {/* Circular Food Image Container */}
                <div
                  className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 transition-all duration-300 transform group-hover:-translate-y-1.5 ${
                    isSelected
                      ? 'ring-4 ring-[#FFBE24] shadow-lg shadow-[#FFBE24]/30 scale-105'
                      : 'ring-2 ring-neutral-200/80 group-hover:ring-[#FFBE24]/70 shadow-sm'
                  }`}
                >
                  <div className="w-full h-full rounded-full overflow-hidden bg-[#F7F4EF] flex items-center justify-center">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* Selected Indicator Dot */}
                  {isSelected && (
                    <span className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#FFBE24] text-neutral-950 font-bold text-xs flex items-center justify-center border-2 border-white shadow">
                      ✓
                    </span>
                  )}
                </div>

                {/* Category Title */}
                <span
                  className={`mt-3 text-sm sm:text-base font-heading uppercase tracking-wide transition-colors ${
                    isSelected
                      ? 'text-neutral-950 font-black'
                      : 'text-neutral-700 font-bold group-hover:text-neutral-950'
                  }`}
                >
                  {cat.name}
                </span>

                {/* Subtitle count */}
                <span className="text-[11px] text-neutral-600 font-medium">
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
