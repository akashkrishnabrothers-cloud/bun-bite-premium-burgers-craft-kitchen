import React, { useEffect, useState } from 'react';
import { ArrowRight, Flame, Heart, Menu as MenuIcon, Search, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { MobileNavigation } from './MobileNavigation';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const {
    totalItemsCount,
    favorites,
    setIsCartOpen,
    setIsSearchOpen,
    setIsLocationsOpen,
    setIsOffersOpen,
    setIsContactOpen,
  } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#090909]/95 backdrop-blur-md shadow-xl border-b border-neutral-800/80 py-3'
            : 'bg-[#090909] border-b border-neutral-900 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">
          {/* Brand Wordmark & Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 group cursor-pointer shrink-0"
          >
            {/* Custom Burger Icon Badge */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFBE24] to-[#F5A623] flex items-center justify-center text-[#090909] shadow-md group-hover:scale-105 transition-transform">
              <Flame className="w-5 h-5 fill-current text-[#090909]" />
            </div>

            <div className="flex flex-col">
              <span className="font-heading font-black text-2xl tracking-wider text-white leading-none">
                BUN <span className="text-[#FFBE24]">&</span> BITE
              </span>
              <span className="text-[10px] tracking-widest uppercase text-neutral-400 font-mono">
                Premium Burgers
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links (Center) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-neutral-200 hover:text-[#FFBE24] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-[#FFBE24] after:transition-all cursor-pointer whitespace-nowrap"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('menu')}
              className="text-neutral-200 hover:text-[#FFBE24] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-[#FFBE24] after:transition-all cursor-pointer whitespace-nowrap"
            >
              Menu
            </button>
            <button
              onClick={() => scrollToSection('story')}
              className="text-neutral-200 hover:text-[#FFBE24] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-[#FFBE24] after:transition-all cursor-pointer whitespace-nowrap"
            >
              Our Story
            </button>
            <button
              onClick={() => setIsLocationsOpen(true)}
              className="text-neutral-200 hover:text-[#FFBE24] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-[#FFBE24] after:transition-all cursor-pointer whitespace-nowrap"
            >
              Locations
            </button>
            <button
              onClick={() => setIsOffersOpen(true)}
              className="text-neutral-200 hover:text-[#FFBE24] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-[#FFBE24] after:transition-all cursor-pointer whitespace-nowrap"
            >
              Offers
            </button>
            <button
              onClick={() => setIsContactOpen(true)}
              className="text-neutral-200 hover:text-[#FFBE24] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-[#FFBE24] after:transition-all cursor-pointer whitespace-nowrap"
            >
              Contact
            </button>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search menu"
              className="p-2 text-neutral-300 hover:text-white hover:bg-neutral-800/80 rounded-xl transition-colors cursor-pointer"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Favorites / Wishlist Trigger */}
            {favorites.length > 0 && (
              <button
                onClick={() => {
                  scrollToSection('menu');
                }}
                title="Saved Favorites"
                aria-label="Favorites"
                className="relative p-2 text-neutral-300 hover:text-red-400 hover:bg-neutral-800/80 rounded-xl transition-colors cursor-pointer hidden sm:flex items-center"
              >
                <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              </button>
            )}

            {/* Cart Icon with Live Item Counter */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label={`Shopping Cart with ${totalItemsCount} items`}
              className="relative p-2 text-neutral-300 hover:text-white hover:bg-neutral-800/80 rounded-xl transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5 text-white" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FFBE24] text-[#090909] text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                  {totalItemsCount}
                </span>
              )}
            </button>

            {/* Prominent "Order Online" Primary Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-[#FFBE24] hover:bg-[#E5A81B] active:scale-98 text-[#090909] font-heading font-bold text-sm tracking-wide rounded-xl shadow-md transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Order Online</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="lg:hidden p-2 text-neutral-300 hover:text-white hover:bg-neutral-800/80 rounded-xl transition-colors"
            >
              <MenuIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileNavigation
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};
