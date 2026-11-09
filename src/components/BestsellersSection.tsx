import React, { useMemo } from 'react';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';

export const BestsellersSection: React.FC = () => {
  const { activeCategory, setActiveCategory } = useCart();

  const filterTabs = [
    { id: 'all', label: 'All Items' },
    { id: 'bestsellers', label: '⭐ Bestsellers' },
    { id: 'burgers', label: 'Burgers' },
    { id: 'fries', label: 'Fries' },
    { id: 'wraps', label: 'Wraps' },
    { id: 'sides', label: 'Sides' },
    { id: 'beverages', label: 'Drinks' },
    { id: 'combos', label: 'Combos' },
    { id: 'desserts', label: 'Desserts' },
  ];

  const displayedProducts = useMemo(() => {
    if (activeCategory === 'bestsellers') {
      return PRODUCTS.filter((p) => p.isBestseller);
    }
    if (activeCategory === 'all') {
      return PRODUCTS;
    }
    return PRODUCTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="bestsellers" className="bg-[#F7F4EF] py-16 lg:py-20 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#FFBE24]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#F5A623] font-mono">
                CUSTOMER FAVOURITES
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[44px] font-black uppercase tracking-tight text-neutral-950">
              Our Bestsellers
            </h2>
            <p className="text-sm text-neutral-600 mt-1">
              Hand-crafted every single day using freshly baked brioche & prime ingredients.
            </p>
          </div>

          {/* Category Filter Pills / Carousel Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-2">
            {filterTabs.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-heading uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-neutral-950 text-white font-bold shadow-md'
                      : 'bg-white text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 border border-neutral-200/80'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4-column Product Grid on Desktop (responsive 1-2-4) */}
        {displayedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-neutral-200">
            <p className="text-neutral-600">No products found in this category.</p>
            <button
              onClick={() => setActiveCategory('all')}
              className="mt-4 px-4 py-2 bg-[#FFBE24] text-neutral-950 font-bold rounded-xl text-xs"
            >
              Show All Menu Items
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
