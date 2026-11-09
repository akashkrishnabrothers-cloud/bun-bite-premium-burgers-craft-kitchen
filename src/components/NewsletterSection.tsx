import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Gift, Mail, Sparkles } from 'lucide-react';
import { BESTSELLER_CLASSIC, BESTSELLER_PERI_PERI } from '../data/products';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    // Success State demo
    setIsSubscribed(true);
  };

  return (
    <section className="relative overflow-hidden bg-[#090909] text-white py-16 lg:py-20 border-b border-neutral-900">
      {/* Ambient background glows */}
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-[#FFBE24]/10 rounded-full blur-[130px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-[#F5A623]/10 rounded-full blur-[130px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Visual: Golden Fries */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="relative rounded-3xl overflow-hidden border border-neutral-800 shadow-xl transform -rotate-3 hover:rotate-0 transition-transform duration-500 max-w-[260px] mx-auto">
              <img
                src={BESTSELLER_PERI_PERI}
                alt="Crispy golden seasoned fries"
                referrerPolicy="no-referrer"
                className="w-full h-56 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3">
                <span className="text-[11px] font-heading uppercase tracking-wider text-[#FFBE24] font-bold">
                  Crispy & Golden
                </span>
              </div>
            </div>
          </div>

          {/* Center Content: Newsletter Form */}
          <div className="lg:col-span-6 text-center space-y-5 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-semibold text-[#FFBE24]">
              <Gift className="w-3.5 h-3.5" />
              <span>Get ₹100 Off Your First Order</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[42px] font-black uppercase tracking-tight text-white leading-tight">
              Get Exclusive <br />
              <span className="text-[#FFBE24]">Offers & Updates</span>
            </h2>

            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
              Join our community and never miss a delicious deal, secret menu drops, or weekend
              combos.
            </p>

            {isSubscribed ? (
              <div className="p-6 rounded-2xl bg-neutral-900/90 border border-emerald-500/40 text-center space-y-2 animate-in fade-in zoom-in-95 duration-300">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-heading font-black text-xl text-white uppercase">
                  You're on the VIP list!
                </h4>
                <p className="text-xs text-neutral-300">
                  Use coupon code <span className="font-bold text-[#FFBE24]">WELCOME15</span> at
                  checkout for 15% OFF your next order.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 pt-2">
                <div className="flex flex-col sm:flex-row items-stretch gap-2.5 max-w-md mx-auto">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-neutral-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full bg-neutral-900 text-white placeholder-neutral-500 text-sm pl-11 pr-4 py-3.5 rounded-xl border border-neutral-800 focus:outline-none focus:border-[#FFBE24] focus:ring-1 focus:ring-[#FFBE24] transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#FFBE24] hover:bg-[#E5A81B] active:scale-95 text-[#090909] font-heading font-black text-sm uppercase tracking-wider rounded-xl shadow-lg transition-all cursor-pointer whitespace-nowrap shrink-0 group"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {error && <p className="text-xs text-rose-400 font-medium">{error}</p>}

                <p className="text-[11px] text-neutral-500">
                  No spam, ever. Unsubscribe with 1-click anytime.
                </p>
              </form>
            )}
          </div>

          {/* Right Visual: Smashed Burger */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="relative rounded-3xl overflow-hidden border border-neutral-800 shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-500 max-w-[260px] mx-auto">
              <img
                src={BESTSELLER_CLASSIC}
                alt="Classic gourmet beef burger"
                referrerPolicy="no-referrer"
                className="w-full h-56 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3">
                <span className="text-[11px] font-heading uppercase tracking-wider text-[#FFBE24] font-bold">
                  Smashed Fresh
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
