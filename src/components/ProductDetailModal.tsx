import React, { useState } from 'react';
import { Check, Flame, Heart, Minus, Plus, ShieldCheck, Sparkles, Star, Utensils, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Product } from '../types';

export const ProductDetailModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleFavorite, isFavorite } = useCart();
  const [selectedAddons, setSelectedAddons] = useState<{ name: string; price: number }[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isFav = isFavorite(product.id);

  const toggleAddon = (addon: { name: string; price: number }) => {
    setSelectedAddons((prev) => {
      const exists = prev.some((a) => a.name === addon.name);
      if (exists) {
        return prev.filter((a) => a.name !== addon.name);
      } else {
        return [...prev, addon];
      }
    });
  };

  const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const itemTotal = (product.price + addonsTotal) * quantity;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedAddons, specialInstructions);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setQuickViewProduct(null)}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white text-neutral-900 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 flex flex-col max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Container */}
        <div className="overflow-y-auto">
          {/* Hero Image */}
          <div className="relative w-full h-64 sm:h-72 bg-[#F7F4EF]">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            {/* Favorite & Veg badge */}
            <div className="absolute bottom-4 left-6 flex items-center gap-3">
              <span
                className={`text-xs font-bold px-2.5 py-1 rounded-md text-white ${
                  product.isVeg ? 'bg-emerald-600' : 'bg-rose-600'
                }`}
              >
                {product.isVeg ? '100% PURE VEG' : 'GOURMET NON-VEG'}
              </span>
              {product.badge && (
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-[#FFBE24] text-neutral-950 font-mono">
                  {product.badge}
                </span>
              )}
            </div>

            <button
              onClick={() => toggleFavorite(product.id)}
              className="absolute bottom-4 right-6 p-2.5 rounded-full bg-white text-neutral-900 shadow-md hover:scale-105 transition-transform"
            >
              <Heart
                className={`w-5 h-5 ${isFav ? 'fill-rose-500 text-rose-500' : 'text-neutral-500'}`}
              />
            </button>
          </div>

          {/* Details */}
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs text-neutral-500 mb-2 font-medium">
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 fill-[#FFBE24] text-[#FFBE24]" />
                  <span className="font-bold text-neutral-900">{product.rating}</span>
                  <span>({product.ratingCount} reviews)</span>
                </div>
                {product.calories && (
                  <span className="font-mono bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded">
                    🔥 {product.calories} kcal
                  </span>
                )}
              </div>

              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold uppercase text-neutral-950 leading-tight">
                {product.name}
              </h2>

              <p className="mt-2 text-neutral-600 text-sm leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Customizations Section */}
            {product.customizations && product.customizations.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-neutral-100">
                {product.customizations.map((group) => (
                  <div key={group.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-heading font-bold uppercase text-sm text-neutral-900 tracking-wide">
                        {group.name}
                      </h4>
                      <span className="text-xs text-neutral-500">Optional</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {group.options.map((option) => {
                        const isChecked = selectedAddons.some((a) => a.name === option.name);
                        return (
                          <button
                            key={option.name}
                            type="button"
                            onClick={() => toggleAddon(option)}
                            className={`flex items-center justify-between p-3 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer ${
                              isChecked
                                ? 'border-[#FFBE24] bg-[#FFBE24]/10 text-neutral-950 shadow-sm'
                                : 'border-neutral-200 hover:border-neutral-300 text-neutral-700'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-4 h-4 rounded flex items-center justify-center border ${
                                  isChecked
                                    ? 'bg-[#FFBE24] border-[#FFBE24] text-neutral-950'
                                    : 'border-neutral-300'
                                }`}
                              >
                                {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                              <span>{option.name}</span>
                            </div>
                            <span className="font-bold tabular-nums">
                              +₹{option.price}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Special Instructions */}
            <div className="pt-2">
              <label
                htmlFor="instructions"
                className="block font-heading font-bold uppercase text-xs text-neutral-700 mb-1"
              >
                Cooking Note / Special Requests
              </label>
              <input
                id="instructions"
                type="text"
                placeholder="e.g. Extra napkins, no pickles, sauce on side"
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#FFBE24] focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Footer with Qty & Add to Cart button */}
        <div className="p-4 sm:p-6 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between gap-4">
          {/* Quantity Controls */}
          <div className="flex items-center bg-white border border-neutral-200 rounded-xl px-2 py-1 shadow-sm">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="p-1.5 text-neutral-600 hover:text-black rounded transition-colors"
              aria-label="Decrease"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-bold text-sm px-3 tabular-nums text-neutral-950">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="p-1.5 text-neutral-600 hover:text-black rounded transition-colors"
              aria-label="Increase"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add To Cart CTA */}
          <button
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-between px-6 py-3.5 bg-[#FFBE24] hover:bg-[#E5A81B] active:scale-98 text-neutral-950 font-heading font-bold text-sm tracking-wide rounded-xl shadow-md transition-all cursor-pointer"
          >
            <span>ADD TO ORDER</span>
            <span className="font-black text-base tabular-nums">₹{itemTotal}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
