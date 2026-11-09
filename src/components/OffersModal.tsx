import React from 'react';
import { Check, Copy, Flame, Gift, Percent, Sparkles, Tag, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PROMO_CODES } from '../data/restaurantInfo';

export const OffersModal: React.FC = () => {
  const { isOffersOpen, setIsOffersOpen, applyPromo, setIsCartOpen, showToast } = useCart();
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  if (!isOffersOpen) return null;

  const handleApply = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    const res = applyPromo(code);
    showToast(`Code ${code} copied & applied!`);
    setTimeout(() => {
      setIsOffersOpen(false);
      setIsCartOpen(true);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setIsOffersOpen(false)}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-white text-neutral-900 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 flex flex-col">
        {/* Header */}
        <div className="p-6 bg-[#FFBE24] text-neutral-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-950 text-[#FFBE24] flex items-center justify-center font-bold">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-black text-xl uppercase tracking-wider text-neutral-950">
                Exclusive Deals & Coupons
              </h3>
              <span className="text-xs text-neutral-800 font-mono">
                Click any code to apply automatically
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsOffersOpen(false)}
            className="p-2 text-neutral-900 hover:text-black rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Coupons List */}
        <div className="p-6 sm:p-8 space-y-4 max-h-[70vh] overflow-y-auto">
          {PROMO_CODES.map((promo) => (
            <div
              key={promo.code}
              className="p-5 rounded-2xl border-2 border-dashed border-neutral-300 hover:border-[#FFBE24] bg-neutral-50/80 hover:bg-[#FFBE24]/5 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#090909] text-[#FFBE24] font-mono text-xs font-bold tracking-wider mb-2">
                  <span>{promo.code}</span>
                </div>
                <h4 className="font-heading font-bold text-base uppercase text-neutral-950">
                  {promo.discountPercent}% Instant Discount
                </h4>
                <p className="text-xs text-neutral-600 mt-0.5">
                  {promo.description}
                </p>
              </div>

              <button
                onClick={() => handleApply(promo.code)}
                className="px-4 py-2.5 bg-[#FFBE24] hover:bg-[#E5A81B] active:scale-95 text-neutral-950 font-heading font-bold text-xs uppercase tracking-wider rounded-xl shadow transition-all cursor-pointer whitespace-nowrap self-start sm:self-center flex items-center gap-1.5"
              >
                {copiedCode === promo.code ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Applied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Apply Code</span>
                  </>
                )}
              </button>
            </div>
          ))}

          <div className="p-4 rounded-2xl bg-neutral-100 text-xs text-neutral-600 text-center">
            🔥 Free delivery automatically unlocks on every order above ₹{399}!
          </div>
        </div>
      </div>
    </div>
  );
};
