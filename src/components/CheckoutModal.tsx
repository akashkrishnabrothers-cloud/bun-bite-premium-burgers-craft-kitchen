import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  CreditCard,
  Flame,
  MapPin,
  Phone,
  ShieldCheck,
  ShoppingBag,
  Truck,
  User,
  Utensils,
  X,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/restaurantInfo';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cartItems,
    clearCart,
    subtotal,
    discountAmount,
    deliveryFee,
    packagingFee,
    finalTotal,
    appliedPromo,
    lastPlacedOrder,
    setLastPlacedOrder,
  } = useCart();

  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    landmark: '',
    instructions: '',
    paymentMethod: 'cod', // 'cod' | 'upi' | 'card'
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
    }
  };

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.name.trim()) errs.name = 'Please provide your full name.';
    if (!formData.phone.trim() || formData.phone.length < 10) {
      errs.phone = 'Please enter a valid 10-digit mobile number.';
    }
    if (orderType === 'delivery' && !formData.address.trim()) {
      errs.address = 'Please specify your complete delivery address.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate order placement
    setTimeout(() => {
      const orderNumber = `BNB-${Math.floor(100000 + Math.random() * 900000)}`;
      const orderRecord = {
        orderId: orderNumber,
        items: [...cartItems],
        total: finalTotal,
        subtotal,
        discount: discountAmount,
        orderType,
        customer: { ...formData },
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        estDelivery: '25–35 mins',
      };

      setLastPlacedOrder(orderRecord);
      clearCart();
      setIsSubmitting(false);
    }, 900);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setLastPlacedOrder(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div onClick={handleClose} className="fixed inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white text-neutral-900 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-neutral-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FFBE24] text-neutral-950 flex items-center justify-center font-bold">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-black text-xl uppercase tracking-wide text-white">
                {lastPlacedOrder ? 'Order Confirmed!' : 'Checkout & Delivery'}
              </h3>
              <span className="text-xs text-neutral-400 font-mono">
                {lastPlacedOrder
                  ? `Order #${lastPlacedOrder.orderId}`
                  : `${cartItems.length} items ready for prep`}
              </span>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2 text-neutral-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 sm:p-8">
          {lastPlacedOrder ? (
            /* SUCCESS CONFIRMATION STATE */
            <div className="text-center space-y-6 py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full uppercase tracking-wider mb-2">
                  Order Received by Kitchen
                </span>
                <h4 className="font-heading font-black text-3xl uppercase text-neutral-950">
                  We're Sizzling Your Burgers!
                </h4>
                <p className="text-sm text-neutral-600 max-w-md mx-auto mt-1">
                  Thank you, <span className="font-bold text-neutral-900">{lastPlacedOrder.customer.name}</span>. Your meal is being freshly crafted at our nearest kitchen.
                </p>
              </div>

              {/* Live Tracker Simulation */}
              <div className="bg-[#F7F4EF] p-5 rounded-2xl border border-neutral-200 text-left space-y-4">
                <div className="flex items-center justify-between text-xs text-neutral-600 font-medium pb-3 border-b border-neutral-200">
                  <span className="flex items-center gap-1.5 font-bold text-neutral-900">
                    <Clock className="w-4 h-4 text-[#F5A623]" />
                    Estimated Delivery: {lastPlacedOrder.estDelivery}
                  </span>
                  <span className="font-mono text-neutral-500">
                    Placed at {lastPlacedOrder.timestamp}
                  </span>
                </div>

                {/* Progress Steps */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2.5 rounded-xl bg-emerald-600 text-white font-bold flex flex-col items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Order Placed</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#FFBE24] text-neutral-950 font-bold flex flex-col items-center gap-1 animate-pulse">
                    <Flame className="w-4 h-4" />
                    <span>Kitchen Prepping</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-neutral-200 text-neutral-500 font-medium flex flex-col items-center gap-1">
                    <Truck className="w-4 h-4" />
                    <span>Out for Delivery</span>
                  </div>
                </div>

                <div className="pt-2 text-xs text-neutral-600">
                  <p>
                    <span className="font-semibold text-neutral-900">
                      Delivery Address:
                    </span>{' '}
                    {lastPlacedOrder.customer.address || 'Pickup at Connaught Place Flagship'}
                  </p>
                  <p>
                    <span className="font-semibold text-neutral-900">Phone:</span>{' '}
                    {lastPlacedOrder.customer.phone}
                  </p>
                  <p>
                    <span className="font-semibold text-neutral-900">
                      Payment Mode:
                    </span>{' '}
                    {lastPlacedOrder.customer.paymentMethod.toUpperCase()} (₹{lastPlacedOrder.total})
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleClose}
                  className="px-8 py-3.5 bg-neutral-950 hover:bg-neutral-800 text-white font-heading font-black text-sm uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer"
                >
                  Done & Back to Menu
                </button>
              </div>
            </div>
          ) : (
            /* CHECKOUT FORM */
            <form onSubmit={handlePlaceOrder} className="space-y-6">
              {/* Order Mode Switch: Delivery vs Pickup */}
              <div>
                <label className="block font-heading font-bold uppercase text-xs text-neutral-600 mb-2">
                  Order Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    className={`flex items-center justify-center gap-2 p-3 rounded-2xl border text-xs font-bold font-heading uppercase tracking-wider transition-all cursor-pointer ${
                      orderType === 'delivery'
                        ? 'border-neutral-950 bg-neutral-950 text-white shadow-md'
                        : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    <Truck className="w-4 h-4 text-[#FFBE24]" />
                    <span>Doorstep Delivery</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOrderType('pickup')}
                    className={`flex items-center justify-center gap-2 p-3 rounded-2xl border text-xs font-bold font-heading uppercase tracking-wider transition-all cursor-pointer ${
                      orderType === 'pickup'
                        ? 'border-neutral-950 bg-neutral-950 text-white shadow-md'
                        : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    <Utensils className="w-4 h-4 text-[#FFBE24]" />
                    <span>Dine-In / Takeaway</span>
                  </button>
                </div>
              </div>

              {/* Customer Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      name="name"
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full text-xs pl-9 pr-3 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#FFBE24]"
                    />
                  </div>
                  {errors.name && <p className="text-[11px] text-rose-500 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Mobile Phone *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full text-xs pl-9 pr-3 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#FFBE24]"
                    />
                  </div>
                  {errors.phone && <p className="text-[11px] text-rose-500 mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Delivery Address fields */}
              {orderType === 'delivery' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Delivery Address *
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                      <textarea
                        name="address"
                        rows={2}
                        placeholder="House / Flat No., Street, Building Name"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full text-xs pl-9 pr-3 py-2.5 border border-neutral-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#FFBE24]"
                      />
                    </div>
                    {errors.address && (
                      <p className="text-[11px] text-rose-500 mt-1">{errors.address}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Nearby Landmark / Gate Note (Optional)
                    </label>
                    <input
                      type="text"
                      name="landmark"
                      placeholder="e.g. Near City Center Gate 3, Ring doorbell"
                      value={formData.landmark}
                      onChange={handleInputChange}
                      className="w-full text-xs px-3 py-2.5 border border-neutral-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#FFBE24]"
                    />
                  </div>
                </div>
              )}

              {/* Payment Methods */}
              <div>
                <label className="block font-heading font-bold uppercase text-xs text-neutral-600 mb-2">
                  Select Payment Option
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <label
                    className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-colors ${
                      formData.paymentMethod === 'cod'
                        ? 'border-[#FFBE24] bg-[#FFBE24]/10 text-neutral-950 shadow-sm'
                        : 'border-neutral-200 text-neutral-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={() => setFormData((p) => ({ ...p, paymentMethod: 'cod' }))}
                      className="text-[#FFBE24]"
                    />
                    <span>Cash on Delivery</span>
                  </label>

                  <label
                    className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-colors ${
                      formData.paymentMethod === 'upi'
                        ? 'border-[#FFBE24] bg-[#FFBE24]/10 text-neutral-950 shadow-sm'
                        : 'border-neutral-200 text-neutral-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={formData.paymentMethod === 'upi'}
                      onChange={() => setFormData((p) => ({ ...p, paymentMethod: 'upi' }))}
                      className="text-[#FFBE24]"
                    />
                    <span>UPI / QR Code</span>
                  </label>

                  <label
                    className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-colors ${
                      formData.paymentMethod === 'card'
                        ? 'border-[#FFBE24] bg-[#FFBE24]/10 text-neutral-950 shadow-sm'
                        : 'border-neutral-200 text-neutral-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={() => setFormData((p) => ({ ...p, paymentMethod: 'card' }))}
                      className="text-[#FFBE24]"
                    />
                    <span>Credit / Debit Card</span>
                  </label>
                </div>
              </div>

              {/* Order Bill Summary */}
              <div className="p-4 rounded-2xl bg-[#F7F4EF] border border-neutral-200 text-xs space-y-1.5">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span className="font-bold text-neutral-950 tabular-nums">₹{subtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount Coupon ({appliedPromo?.code})</span>
                    <span className="tabular-nums">-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-neutral-600">
                  <span>Packaging & Eco-Box</span>
                  <span className="font-bold text-neutral-950 tabular-nums">₹{packagingFee}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Delivery Charge</span>
                  <span className="font-bold text-neutral-950 tabular-nums">
                    {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-neutral-300 font-bold text-neutral-950">
                  <span className="font-heading uppercase text-sm">To Pay</span>
                  <span className="font-heading text-xl font-black tabular-nums">
                    ₹{finalTotal}
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-between px-6 py-4 bg-[#FFBE24] hover:bg-[#E5A81B] active:scale-98 text-neutral-950 font-heading font-black text-sm uppercase tracking-wider rounded-xl shadow-lg transition-all cursor-pointer disabled:opacity-50"
              >
                <span>{isSubmitting ? 'Placing Your Order...' : 'Confirm & Place Order'}</span>
                <span className="tabular-nums font-black text-base">₹{finalTotal}</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Contactless Delivery Guaranteed</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
