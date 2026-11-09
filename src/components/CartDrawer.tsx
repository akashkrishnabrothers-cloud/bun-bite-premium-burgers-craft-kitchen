import React, { useState } from 'react';
import {
  ArrowRight,
  Flame,
  Minus,
  Percent,
  Plus,
  ShoppingBag,
  Sparkles,
  Tag,
  Trash2,
  Truck,
  X,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/restaurantInfo';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    removeFromCart,
    updateQuantity,
    subtotal,
    appliedPromo,
    applyPromo,
    removePromo,
    discountAmount,
    deliveryFee,
    packagingFee,
    finalTotal,
    freeDeliveryThresholdRemaining,
    setIsCheckoutOpen,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(
    null
  );

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromo(promoInput);
    if (res.success) {
      setPromoMessage({ type: 'success', text: res.message });
      setPromoInput('');
    } else {
      setPromoMessage({ type: 'error', text: res.message });
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white text-neutral-900 shadow-2xl flex flex-col justify-between">
          {/* Top Cart Header */}
          <div className="p-5 sm:p-6 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#FFBE24] flex items-center justify-center text-neutral-950 font-bold">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-xl uppercase tracking-tight text-neutral-950">
                  Your Order
                </h3>
                <span className="text-xs text-neutral-500 font-mono">
                  {cartItems.reduce((acc, i) => acc + i.quantity, 0)} items selected
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-neutral-400 hover:text-black rounded-lg transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Delivery Goal Tracker */}
          {cartItems.length > 0 && (
            <div className="bg-[#090909] text-white px-5 py-3 text-xs border-b border-neutral-800">
              <div className="flex items-center justify-between mb-1.5">
                <span className="flex items-center gap-1.5 font-medium text-neutral-300">
                  <Truck className="w-4 h-4 text-[#FFBE24]" />
                  {freeDeliveryThresholdRemaining > 0 ? (
                    <>
                      Add{' '}
                      <span className="text-[#FFBE24] font-bold">
                        ₹{freeDeliveryThresholdRemaining}
                      </span>{' '}
                      more for FREE delivery!
                    </>
                  ) : (
                    <span className="text-emerald-400 font-bold">
                      🎉 Free Delivery Unlocked!
                    </span>
                  )}
                </span>
                <span className="text-neutral-500 font-mono">
                  Min ₹{RESTAURANT_INFO.minOrderForFreeDelivery}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#FFBE24] h-full transition-all duration-500 rounded-full"
                  style={{
                    width: `${Math.min(
                      100,
                      (subtotal / RESTAURANT_INFO.minOrderForFreeDelivery) * 100
                    )}%`,
                  }}
                />
              </div>
            </div>
          )}

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4 text-neutral-500">
                <div className="w-20 h-20 rounded-full bg-[#F7F4EF] flex items-center justify-center text-[#F5A623]">
                  <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
                </div>
                <h4 className="font-heading font-black text-2xl uppercase text-neutral-900">
                  Your cart is hungry!
                </h4>
                <p className="text-sm max-w-xs text-neutral-500">
                  Browse our mouthwatering burgers, loaded fries and sweet shakes to get started.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-3 bg-[#FFBE24] text-neutral-950 font-heading font-bold text-xs uppercase tracking-wider rounded-xl shadow cursor-pointer hover:bg-[#E5A81B]"
                >
                  Explore Menu Now
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3.5 p-3.5 rounded-2xl border border-neutral-200 bg-white shadow-sm hover:border-neutral-300 transition-colors"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-xl object-cover bg-neutral-100 shrink-0"
                  />

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-heading font-bold text-sm uppercase text-neutral-900 leading-tight">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-neutral-400 hover:text-rose-500 p-0.5 rounded transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Add-ons list if any */}
                      {item.selectedAddons && item.selectedAddons.length > 0 && (
                        <p className="text-[11px] text-neutral-500 mt-0.5 line-clamp-1">
                          + {item.selectedAddons.map((a) => a.name).join(', ')}
                        </p>
                      )}

                      {/* Instructions */}
                      {item.instructions && (
                        <p className="text-[10px] text-amber-700 italic mt-0.5">
                          Note: "{item.instructions}"
                        </p>
                      )}
                    </div>

                    {/* Quantity & Price */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center bg-neutral-100 rounded-lg p-0.5 text-xs font-semibold">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 hover:bg-neutral-200 rounded transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 tabular-nums">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 hover:bg-neutral-200 rounded transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-heading font-bold text-sm text-neutral-950 tabular-nums">
                        ₹{item.totalItemPrice}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Bottom Summary & Checkout Controls */}
          {cartItems.length > 0 && (
            <div className="p-5 sm:p-6 bg-neutral-50 border-t border-neutral-200 space-y-4">
              {/* Promo Code Input */}
              <div className="space-y-1.5">
                {appliedPromo ? (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                    <div className="flex items-center gap-2 text-emerald-800 font-bold">
                      <Tag className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{appliedPromo.code} Applied ({appliedPromo.discountPercent}% OFF)</span>
                    </div>
                    <button
                      onClick={removePromo}
                      className="text-rose-600 hover:text-rose-800 text-[11px] font-bold underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Try 'BUNBITE20' or 'WELCOME15'"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1 bg-white border border-neutral-200 uppercase text-xs px-3 py-2 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#FFBE24]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-neutral-900 text-white font-heading font-bold text-xs uppercase tracking-wide rounded-xl hover:bg-black transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoMessage && !appliedPromo && (
                  <p
                    className={`text-[11px] ${
                      promoMessage.type === 'error' ? 'text-rose-600' : 'text-emerald-600'
                    }`}
                  >
                    {promoMessage.text}
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-neutral-600 pt-2 border-t border-neutral-200">
                <div className="flex justify-between">
                  <span>Item Subtotal</span>
                  <span className="font-semibold text-neutral-900 tabular-nums">₹{subtotal}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Discount Coupon</span>
                    <span className="tabular-nums">-₹{discountAmount}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Packaging & Safety</span>
                  <span className="font-semibold text-neutral-900 tabular-nums">₹{packagingFee}</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="font-semibold text-neutral-900 tabular-nums">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-600 font-bold uppercase">FREE</span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between items-baseline pt-2 border-t border-neutral-200 font-bold text-neutral-950">
                  <span className="font-heading uppercase text-sm tracking-wide">
                    Total Amount
                  </span>
                  <span className="font-heading text-xl font-black text-neutral-950 tabular-nums">
                    ₹{finalTotal}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full flex items-center justify-between px-6 py-4 bg-[#FFBE24] hover:bg-[#E5A81B] active:scale-98 text-neutral-950 font-heading font-black text-sm uppercase tracking-wider rounded-xl shadow-lg transition-all cursor-pointer"
              >
                <span>Proceed To Checkout</span>
                <div className="flex items-center gap-1">
                  <span className="tabular-nums">₹{finalTotal}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
