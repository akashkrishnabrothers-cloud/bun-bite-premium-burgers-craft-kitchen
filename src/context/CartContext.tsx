import React, { createContext, useContext, useEffect, useState } from 'react';
import { PROMO_CODES, RESTAURANT_INFO } from '../data/restaurantInfo';
import { CartItem, Product, PromoCode } from '../types';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (
    product: Product,
    quantity?: number,
    selectedAddons?: { name: string; price: number }[],
    instructions?: string
  ) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  getProductQuantityInCart: (productId: string) => number;
  totalItemsCount: number;
  subtotal: number;
  appliedPromo: PromoCode | null;
  applyPromo: (code: string) => { success: boolean; message: string };
  removePromo: () => void;
  discountAmount: number;
  deliveryFee: number;
  packagingFee: number;
  finalTotal: number;
  freeDeliveryThresholdRemaining: number;
  // Modals & Panels State
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isLocationsOpen: boolean;
  setIsLocationsOpen: (open: boolean) => void;
  isOffersOpen: boolean;
  setIsOffersOpen: (open: boolean) => void;
  isContactOpen: boolean;
  setIsContactOpen: (open: boolean) => void;
  isStoryModalOpen: boolean;
  setIsStoryModalOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  // Wishlist / Favorites
  favorites: string[];
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  // Toast notifications
  toastMessage: string | null;
  showToast: (msg: string) => void;
  // Active category filter state
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  // Order completed record
  lastPlacedOrder: any | null;
  setLastPlacedOrder: (order: any) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'bun_and_bite_cart_v1';
const FAV_STORAGE_KEY = 'bun_and_bite_favs_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(FAV_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<any | null>(null);

  // Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLocationsOpen, setIsLocationsOpen] = useState(false);
  const [isOffersOpen, setIsOffersOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem(FAV_STORAGE_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 2800);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const addToCart = (
    product: Product,
    quantity = 1,
    selectedAddons: { name: string; price: number }[] = [],
    instructions = ''
  ) => {
    const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
    const unitPrice = product.price + addonsTotal;
    const itemKey = `${product.id}-${selectedAddons.map((a) => a.name).sort().join('_')}`;

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === itemKey);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          totalItemPrice: newQty * unitPrice,
        };
        return updated;
      } else {
        const newItem: CartItem = {
          id: itemKey,
          product,
          quantity,
          selectedAddons,
          instructions,
          totalItemPrice: quantity * unitPrice,
        };
        return [...prev, newItem];
      }
    });

    showToast(`Added "${product.name}" to cart! 🍔`);
  };

  const removeFromCart = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
    showToast('Item removed from cart');
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.id !== itemId) return item;
          const newQty = item.quantity + delta;
          if (newQty <= 0) return null;
          const addonsTotal = item.selectedAddons.reduce((sum, a) => sum + a.price, 0);
          const unitPrice = item.product.price + addonsTotal;
          return {
            ...item,
            quantity: newQty,
            totalItemPrice: newQty * unitPrice,
          };
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedPromo(null);
  };

  const getProductQuantityInCart = (productId: string) => {
    return cartItems
      .filter((item) => item.product.id === productId)
      .reduce((sum, item) => sum + item.quantity, 0);
  };

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from favorites');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to your favorites ❤️');
        return [...prev, productId];
      }
    });
  };

  const isFavorite = (productId: string) => favorites.includes(productId);

  // Calculations
  const totalItemsCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);
  const subtotal = cartItems.reduce((acc, curr) => acc + curr.totalItemPrice, 0);

  const applyPromo = (code: string) => {
    const clean = code.trim().toUpperCase();
    const found = PROMO_CODES.find((p) => p.code === clean);
    if (!found) {
      return { success: false, message: 'Invalid promo code. Try BUNBITE20!' };
    }
    if (subtotal < found.minOrder) {
      return {
        success: false,
        message: `Min order of ₹${found.minOrder} required for ${found.code}.`,
      };
    }
    setAppliedPromo(found);
    return {
      success: true,
      message: `Coupon ${found.code} applied! ${found.discountPercent}% OFF`,
    };
  };

  const removePromo = () => {
    setAppliedPromo(null);
    showToast('Promo code removed');
  };

  let discountAmount = 0;
  if (appliedPromo && subtotal >= appliedPromo.minOrder) {
    const rawDiscount = (subtotal * appliedPromo.discountPercent) / 100;
    discountAmount = appliedPromo.maxDiscount
      ? Math.min(rawDiscount, appliedPromo.maxDiscount)
      : rawDiscount;
  }

  const freeDeliveryThresholdRemaining = Math.max(
    0,
    RESTAURANT_INFO.minOrderForFreeDelivery - subtotal
  );

  const deliveryFee =
    subtotal === 0 || subtotal >= RESTAURANT_INFO.minOrderForFreeDelivery
      ? 0
      : RESTAURANT_INFO.deliveryFee;

  const packagingFee = subtotal > 0 ? RESTAURANT_INFO.packagingFee : 0;
  const finalTotal = Math.max(0, subtotal - discountAmount + deliveryFee + packagingFee);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getProductQuantityInCart,
        totalItemsCount,
        subtotal,
        appliedPromo,
        applyPromo,
        removePromo,
        discountAmount,
        deliveryFee,
        packagingFee,
        finalTotal,
        freeDeliveryThresholdRemaining,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isSearchOpen,
        setIsSearchOpen,
        isLocationsOpen,
        setIsLocationsOpen,
        isOffersOpen,
        setIsOffersOpen,
        isContactOpen,
        setIsContactOpen,
        isStoryModalOpen,
        setIsStoryModalOpen,
        quickViewProduct,
        setQuickViewProduct,
        favorites,
        toggleFavorite,
        isFavorite,
        toastMessage,
        showToast,
        activeCategory,
        setActiveCategory,
        lastPlacedOrder,
        setLastPlacedOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
};
