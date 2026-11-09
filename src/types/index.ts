export type ProductCategory =
  | 'all'
  | 'burgers'
  | 'fries'
  | 'wraps'
  | 'sides'
  | 'beverages'
  | 'combos'
  | 'desserts';

export interface CustomizationOption {
  name: string;
  price: number;
}

export interface CustomizationGroup {
  id: string;
  name: string;
  options: CustomizationOption[];
}

export interface Product {
  id: string;
  name: string;
  category: 'burgers' | 'fries' | 'wraps' | 'sides' | 'beverages' | 'combos' | 'desserts';
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  badge?: string;
  isBestseller?: boolean;
  rating: number;
  ratingCount: number;
  isVeg: boolean;
  spiceLevel?: 0 | 1 | 2 | 3;
  calories?: number;
  prepTime?: string;
  customizations?: CustomizationGroup[];
}

export interface CartItem {
  id: string; // unique item instance id
  product: Product;
  quantity: number;
  selectedAddons: { name: string; price: number }[];
  instructions?: string;
  totalItemPrice: number;
}

export interface PromoCode {
  code: string;
  discountPercent: number;
  maxDiscount?: number;
  minOrder: number;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  comment: string;
  verified: boolean;
  favoriteDish: string;
  date: string;
}

export interface RestaurantLocation {
  id: string;
  name: string;
  tagline: string;
  address: string;
  area: string;
  hours: string;
  phone: string;
  email: string;
  isFlagship?: boolean;
  mapEmbedUrl?: string;
}
