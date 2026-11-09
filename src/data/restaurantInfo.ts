import { PromoCode, RestaurantLocation, Testimonial } from '../types';

export const RESTAURANT_INFO = {
  name: 'BUN & BITE',
  tagline: 'Fresh Burgers. Bigger Smiles. Better Deals.',
  heroEyebrow: 'GOOD FOOD. BETTER MOOD.',
  heroHeadlineMain: 'BURGERS THAT BRING',
  heroHeadlineHighlight: 'PEOPLE TOGETHER',
  heroDescription:
    'Juicy burgers, crispy fries and unforgettable flavours — freshly prepared with love and served hot.',
  heroHandwritten: 'Bigger Burgers, Brighter Days.',
  storyHandwritten: 'Same Burgers, Bigger Smiles!',
  phone: '+91 98765 43210',
  email: 'hello@bunandbite.com',
  address: '42 Gourmet Boulevard, Connaught Place, New Delhi - 110001',
  hours: 'Mon – Sun: 11:00 AM – 11:30 PM',
  deliveryTime: '25–35 mins',
  minOrderForFreeDelivery: 399,
  deliveryFee: 35,
  packagingFee: 15,
};

export const PROMO_CODES: PromoCode[] = [
  {
    code: 'BUNBITE20',
    discountPercent: 20,
    maxDiscount: 100,
    minOrder: 299,
    description: '20% OFF on all orders above ₹299 (Up to ₹100 discount)',
  },
  {
    code: 'WELCOME15',
    discountPercent: 15,
    maxDiscount: 75,
    minOrder: 199,
    description: '15% OFF your first order with BUN & BITE',
  },
  {
    code: 'FEAST50',
    discountPercent: 25,
    maxDiscount: 250,
    minOrder: 699,
    description: '25% OFF party boxes & combos above ₹699',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Aarav Mehta',
    role: 'Food Blogger & Burger Enthusiast',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'Best burgers in town! Fresh ingredients and amazing taste. Highly recommended!',
    verified: true,
    favoriteDish: 'Classic Beef Burger',
    date: '2 days ago',
  },
  {
    id: 'test-2',
    name: 'Sneha Kapoor',
    role: 'Digital Strategist',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'The peri peri fries are a game changer! Great food and even better vibes.',
    verified: true,
    favoriteDish: 'Peri Peri Fries & Dip',
    date: '5 days ago',
  },
  {
    id: 'test-3',
    name: 'Rohit Verma',
    role: 'Architect & Weekend Diner',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'Amazing burgers, friendly staff and such a cool place to hangout!',
    verified: true,
    favoriteDish: 'Spicy Chicken Burger',
    date: '1 week ago',
  },
];

export const RESTAURANT_LOCATIONS: RestaurantLocation[] = [
  {
    id: 'flagship-connaught',
    name: 'Connaught Place (Flagship)',
    tagline: 'Dine-In • Open Kitchen • Craft Shakes',
    address: '42 Gourmet Boulevard, Inner Circle, Connaught Place',
    area: 'Central Delhi',
    hours: '11:00 AM – 11:30 PM Everyday',
    phone: '+91 98765 43210',
    email: 'cp@bunandbite.com',
    isFlagship: true,
  },
  {
    id: 'cyber-hub-gurugram',
    name: 'Cyber Hub Kitchen',
    tagline: 'Terrace Dining & Fast Casual Pickup',
    address: 'Unit 12, Ground Floor, DLF Cyber Hub, DLF Phase 2',
    area: 'Gurugram',
    hours: '11:00 AM – 01:00 AM (Late Night)',
    phone: '+91 98765 43211',
    email: 'cyberhub@bunandbite.com',
  },
  {
    id: 'indiranagar-bengaluru',
    name: 'Indiranagar 100ft Rd',
    tagline: 'Casual Lounge & Craft Beer Tap Pairing',
    address: '884, 100 Feet Road, HAL 2nd Stage, Indiranagar',
    area: 'Bengaluru',
    hours: '12:00 PM – 11:30 PM Everyday',
    phone: '+91 98765 43212',
    email: 'indiranagar@bunandbite.com',
  },
];

export const FAQS = [
  {
    q: 'Are your burger buns baked fresh daily?',
    a: 'Yes! Our brioche buns are handcrafted and baked every morning in our partner artisan bakeries using real French butter and unbleached flour.',
  },
  {
    q: 'Do you offer 100% vegetarian options?',
    a: 'Absolutely. We have dedicated cooking grills and fryers for vegetarian items like our Herb Crust Paneer Burger, Mediterranean Falafel Wrap, and crispy sides.',
  },
  {
    q: 'How fast is online delivery?',
    a: 'Our average delivery time is 25 to 35 minutes. Burgers are packaged in thermal-vented eco boxes so buns stay fluffy and patties stay sizzling hot.',
  },
  {
    q: 'Can I customize my burger toppings and sauces?',
    a: 'Yes, you can easily add extra cheese, crispy bacon, pickled jalapeños, double smashed patties, or customize dips during order selection.',
  },
];
