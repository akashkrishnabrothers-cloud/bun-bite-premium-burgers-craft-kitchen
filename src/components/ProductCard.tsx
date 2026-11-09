import React from 'react';
import { Eye, Flame, Heart, Minus, Plus, Sparkles, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    addToCart,
    getProductQuantityInCart,
    updateQuantity,
    cartItems,
    toggleFavorite,
    isFavorite,
    setQuickViewProduct,
  } = useCart();

  const qtyInCart = getProductQuantityInCart(product.id);
  const isFav = isFavorite(product.id);

  // Find existing cart item id if present to allow increment/decrement directly
  const cartItemInstance = cartItems.find((i) => i.product.id === product.id);

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.customizations && product.customizations.length > 0) {
      // If product has customizations, open modal for options
      setQuickViewProduct(product);
    } else {
      addToCart(product, 1);
    }
  };

  const handleMinusClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (cartItemInstance) {
      updateQuantity(cartItemInstance.id, -1);
    }
  };

  const handlePlusClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (cartItemInstance) {
      updateQuantity(cartItemInstance.id, 1);
    } else {
      addToCart(product, 1);
    }
  };

  return (
    <div
      onClick={() => setQuickViewProduct(product)}
      className="group bg-white rounded-2xl border border-neutral-200/90 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between overflow-hidden cursor-pointer"
    >
      {/* Top Image Container */}
      <div className="relative w-full h-48 sm:h-52 bg-[#F7F4EF] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-108"
        />

        {/* Veg / Non-Veg Indicator */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
          <div
            className={`w-4 h-4 rounded border flex items-center justify-center bg-white shadow-sm ${
              product.isVeg ? 'border-emerald-600' : 'border-rose-700'
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full ${
                product.isVeg ? 'bg-emerald-600' : 'bg-rose-700'
              }`}
            />
          </div>

          {/* Badge if available (e.g. MOST POPULAR) */}
          {product.badge && (
            <span
              className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm ${
                product.badge === 'MOST POPULAR'
                  ? 'bg-rose-600 text-white'
                  : 'bg-[#FFBE24] text-neutral-950 font-mono'
              }`}
            >
              {product.badge}
            </span>
          )}
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(product.id);
          }}
          aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow hover:bg-white transition-all transform active:scale-90"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFav ? 'fill-rose-500 text-rose-500' : 'text-neutral-500 hover:text-neutral-900'
            }`}
          />
        </button>

        {/* Hover Quick View Overlay Hint */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="inline-flex items-center gap-1.5 bg-neutral-950/80 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm">
            <Eye className="w-3.5 h-3.5" />
            Quick View
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating & Prep Time */}
          <div className="flex items-center justify-between text-xs text-neutral-500 mb-1.5 font-medium">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-[#FFBE24] text-[#FFBE24]" />
              <span className="font-bold text-neutral-900">{product.rating}</span>
              <span className="text-neutral-600">({product.ratingCount})</span>
            </div>
            {product.prepTime && (
              <span className="text-neutral-600 font-mono">{product.prepTime}</span>
            )}
          </div>

          {/* Product Name */}
          <h3 className="font-heading text-lg sm:text-xl font-bold uppercase text-neutral-950 group-hover:text-[#F5A623] transition-colors leading-tight line-clamp-1">
            {product.name}
          </h3>

          {/* Description */}
          <p className="mt-1.5 text-xs sm:text-sm text-neutral-600 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Add to Cart Footer */}
        <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between gap-3">
          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="font-heading font-black text-xl sm:text-2xl text-neutral-950 tabular-nums">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-neutral-600 line-through tabular-nums">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          {/* Cart Action Button / Stepper */}
          {qtyInCart > 0 ? (
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center bg-[#FFBE24] text-neutral-950 rounded-xl px-1 py-0.5 shadow-sm"
            >
              <button
                onClick={handleMinusClick}
                className="p-1.5 hover:bg-black/10 rounded-lg transition-colors cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5 font-bold" />
              </button>
              <span className="font-bold text-xs px-2 tabular-nums">
                {qtyInCart}
              </span>
              <button
                onClick={handlePlusClick}
                className="p-1.5 hover:bg-black/10 rounded-lg transition-colors cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5 font-bold" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddClick}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#FFBE24] hover:bg-[#E5A81B] active:scale-95 text-neutral-950 font-heading font-bold text-xs uppercase tracking-wide rounded-xl shadow transition-all cursor-pointer"
            >
              <span>Add</span>
              <Plus className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
