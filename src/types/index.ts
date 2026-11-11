export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  category: 'scrub' | 'serum' | 'toner' | 'sunscreen' | 'cream' | 'cleanser' | 'mask';
  mainIngredient: 'aloe_vera' | 'chamomile' | 'green_tea' | 'coconut_oil' | 'shea_butter' | 'matcha';
  skinTypes: ('all' | 'oily' | 'dry' | 'sensitive' | 'combination')[];
  skinConcerns: ('wrinkles' | 'acne' | 'sensitivity' | 'dryness' | 'dullness' | 'pores')[];
  description: string;
  detailedDescription: string;
  benefits: string[];
  ingredientsList: string; // Transparent INCI
  usageSteps: string[];
  volume: string;
  stock: number;
  batchNo: string;
  expiryDate: string;
  imageUrl: string;
  secondaryImageUrl?: string;
  videoUrl?: string; // Tutorial video embed/link
  certifications: string[];
  rating: number;
  reviewsCount: number;
  isBestSeller?: boolean;
  isNew?: boolean;
  nameVi?: string;
  nameEn?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // HTML or Markdown
  coverImage: string;
  author: string;
  publishDate: string;
  readTime: string;
  category: 'Lối sống thuần chay' | 'Chăm sóc da tự nhiên' | 'Chiến dịch xanh' | 'Nghiên cứu thành phần';
  tags: string[];
  isFeatured?: boolean;
  published: boolean;
}

export type CustomerSegment = 'gen_z' | 'office_worker' | 'eco_lifestyle' | 'sensitive_skin';

export interface Customer {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  skinType: 'Da dầu' | 'Da khô' | 'Da hỗn hợp' | 'Da nhạy cảm';
  primaryConcern: 'Nếp nhăn & Lão hóa' | 'Mụn & Lỗ chân lông' | 'Kích ứng & Mẩn đỏ' | 'Thiếu ẩm & Bong tróc';
  segment: CustomerSegment;
  totalSpent: number;
  ordersCount: number;
  loyaltyPoints: number;
  bottlesRecycled: number;
  loyaltyTier: 'Hạt Mầm' | 'Chồi Non' | 'Cây Xanh' | 'Rừng Lunara';
  isMember: boolean;
  joinedDate: string;
  lastPurchaseDate?: string;
  notes?: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  shippingAddress: string;
  items: OrderItem[];
  totalAmount: number;
  discountAmount: number;
  finalAmount: number;
  paymentMethod: 'cod' | 'bank_transfer' | 'momo' | 'vnpay';
  paymentStatus: 'paid' | 'pending' | 'failed';
  orderStatus: 'confirmed' | 'stock_validated' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingCarrier: 'Viettel Post' | 'J&T Express';
  trackingNumber: string;
  channel: 'Website D2C' | 'TikTok Shop' | 'Shopee' | 'Offline Guardian/Hasaki';
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface SkinQuizQuestion {
  id: string;
  title: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    value: string;
    icon?: string;
  }[];
}

export interface BrandDesignConfig {
  philosophyTitle: string;
  philosophySubtitle: string;
  philosophyDescription: string;
  philosophyBgImage: string;
  cardBadgeText: string;
  enableFloatingMotion: boolean;
  spotlightProductId: string;
  spotlightCustomTitle: string;
  spotlightCustomDescription: string;
  displayLayout: 'cocoon_both' | 'cocoon_card' | 'cocoon_spotlight';
  pillarsHeadline: string;
  showPetaBadge: boolean;
  showVeganSocietyBadge: boolean;
  customQuoteAuthor: string;
}

