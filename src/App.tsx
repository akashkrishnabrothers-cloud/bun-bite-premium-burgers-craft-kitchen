/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AnnouncementBar } from './components/AnnouncementBar';
import { BenefitsSection } from './components/BenefitsSection';
import { BestsellersSection } from './components/BestsellersSection';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ContactModal } from './components/ContactModal';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { LocationsModal } from './components/LocationsModal';
import { MenuCategories } from './components/MenuCategories';
import { NewsletterSection } from './components/NewsletterSection';
import { OffersModal } from './components/OffersModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { PromotionalBanners } from './components/PromotionalBanners';
import { SearchModal } from './components/SearchModal';
import { StoryModal } from './components/StoryModal';
import { StorySection } from './components/StorySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { Toast } from './components/Toast';
import { CartProvider } from './context/CartContext';

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-[#090909] text-neutral-100 font-sans selection:bg-[#FFBE24] selection:text-[#090909]">
        {/* Sticky top announcement bar */}
        <AnnouncementBar />

        {/* Main sticky navigation header */}
        <Header />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* 1. Hero Section */}
          <HeroSection />

          {/* 2. Food Category Circular Section */}
          <MenuCategories />

          {/* 3. Bestsellers & Menu Catalog Grid */}
          <BestsellersSection />

          {/* 4. Dual Promotional Banners (Combo + Dessert) */}
          <PromotionalBanners />

          {/* 5. Brand Benefits 4-Column Strip */}
          <BenefitsSection />

          {/* 6. Our Story Section */}
          <StorySection />

          {/* 7. Customer Testimonials Section */}
          <TestimonialsSection />

          {/* 8. Newsletter Subscription Banner */}
          <NewsletterSection />
        </main>

        {/* 9. Premium Footer */}
        <Footer />

        {/* Global Drawers & Modals */}
        <CartDrawer />
        <CheckoutModal />
        <ProductDetailModal />
        <SearchModal />
        <LocationsModal />
        <OffersModal />
        <ContactModal />
        <StoryModal />
        <Toast />
      </div>
    </CartProvider>
  );
}
