import React from 'react';
import {
  ArrowRight,
  Flame,
  Heart,
  MapPin,
  Phone,
  Search,
  ShoppingBag,
  Sparkles,
  Tag,
  UtensilsCrossed,
  X,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/restaurantInfo';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({ isOpen, onClose }) => {
  const {
    totalItemsCount,
    favorites,
    setIsCartOpen,
    setIsSearchOpen,
    setIsLocationsOpen,
    setIsOffersOpen,
    setIsContactOpen,
    setIsStoryModalOpen,
  } = useCart();

  if (!isOpen) return null;

  const handleNav = (action: () => void) => {
    onClose();
    action();
  };

  const scrollToSection = (id: string) => {
    onClose();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-[#090909] text-white border-l border-neutral-800 shadow-2xl flex flex-col justify-between p-6 overflow-y-auto">
        {/* Top Header */}
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-neutral-800">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-[#FFBE24] flex items-center justify-center text-[#090909] font-black font-heading text-lg">
                B&B
              </span>
              <div>
                <span className="font-heading font-extrabold tracking-wider text-lg text-white">
                  BUN & BITE
                </span>
                <span className="block text-[10px] tracking-widest text-[#FFBE24] uppercase font-mono">
                  Craft Kitchen
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Action Badges */}
          <div className="grid grid-cols-2 gap-2 my-5">
            <button
              onClick={() =>
                handleNav(() => {
                  setIsSearchOpen(true);
                })
              }
              className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-medium text-neutral-300 hover:text-white hover:border-[#FFBE24]/50 transition-colors"
            >
              <Search className="w-4 h-4 text-[#FFBE24]" />
              <span>Search Menu</span>
            </button>

            <button
              onClick={() =>
                handleNav(() => {
                  setIsCartOpen(true);
                })
              }
              className="relative flex items-center justify-center gap-2 p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-medium text-neutral-300 hover:text-white hover:border-[#FFBE24]/50 transition-colors"
            >
              <ShoppingBag className="w-4 h-4 text-[#FFBE24]" />
              <span>Cart ({totalItemsCount})</span>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-1">
            <button
              onClick={() => scrollToSection('hero')}
              className="flex items-center gap-3 px-3 py-3 rounded-lg text-neutral-300 hover:text-[#FFBE24] hover:bg-neutral-900/60 font-heading text-base uppercase tracking-wider text-left transition-colors"
            >
              <span>Home</span>
            </button>
            <button
              onClick={() => scrollToSection('menu')}
              className="flex items-center justify-between px-3 py-3 rounded-lg text-neutral-300 hover:text-[#FFBE24] hover:bg-neutral-900/60 font-heading text-base uppercase tracking-wider text-left transition-colors"
            >
              <span className="flex items-center gap-2">
                <UtensilsCrossed className="w-4 h-4 text-[#FFBE24]" />
                Menu Catalog
              </span>
              <span className="text-[11px] font-sans text-neutral-400 font-normal">
                15+ Items
              </span>
            </button>
            <button
              onClick={() => scrollToSection('story')}
              className="flex items-center gap-3 px-3 py-3 rounded-lg text-neutral-300 hover:text-[#FFBE24] hover:bg-neutral-900/60 font-heading text-base uppercase tracking-wider text-left transition-colors"
            >
              <span>Our Story</span>
            </button>
            <button
              onClick={() =>
                handleNav(() => {
                  setIsLocationsOpen(true);
                })
              }
              className="flex items-center justify-between px-3 py-3 rounded-lg text-neutral-300 hover:text-[#FFBE24] hover:bg-neutral-900/60 font-heading text-base uppercase tracking-wider text-left transition-colors"
            >
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#FFBE24]" />
                Locations
              </span>
              <span className="text-[10px] bg-neutral-800 text-[#FFBE24] px-1.5 py-0.5 rounded">
                3 Outlets
              </span>
            </button>
            <button
              onClick={() =>
                handleNav(() => {
                  setIsOffersOpen(true);
                })
              }
              className="flex items-center justify-between px-3 py-3 rounded-lg text-neutral-300 hover:text-[#FFBE24] hover:bg-neutral-900/60 font-heading text-base uppercase tracking-wider text-left transition-colors"
            >
              <span className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#FFBE24]" />
                Offers & Deals
              </span>
              <span className="text-[10px] bg-[#FFBE24] text-black font-bold px-1.5 py-0.5 rounded">
                25% OFF
              </span>
            </button>
            <button
              onClick={() =>
                handleNav(() => {
                  setIsContactOpen(true);
                })
              }
              className="flex items-center gap-3 px-3 py-3 rounded-lg text-neutral-300 hover:text-[#FFBE24] hover:bg-neutral-900/60 font-heading text-base uppercase tracking-wider text-left transition-colors"
            >
              <span>Contact Us</span>
            </button>
          </nav>
        </div>

        {/* Bottom CTA & Support Info */}
        <div className="pt-6 border-t border-neutral-800 space-y-4">
          <button
            onClick={() =>
              handleNav(() => {
                setIsCartOpen(true);
              })
            }
            className="w-full flex items-center justify-center gap-2 py-3.5 px-5 bg-[#FFBE24] hover:bg-[#E5A81B] text-[#090909] font-heading font-bold text-sm tracking-wide rounded-xl shadow-lg transition-transform active:scale-98 cursor-pointer"
          >
            <span>ORDER ONLINE NOW</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="text-xs text-neutral-400 space-y-1.5 pt-2">
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#FFBE24]" />
              <a href={`tel:${RESTAURANT_INFO.phone}`} className="hover:text-white">
                {RESTAURANT_INFO.phone}
              </a>
            </div>
            <p className="text-neutral-400 text-[11px] leading-relaxed">
              Open Daily: {RESTAURANT_INFO.hours}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
