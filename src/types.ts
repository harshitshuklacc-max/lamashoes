export type ShoeCategory = 
  | 'all'
  | 'running'
  | 'cricket'
  | 'football'
  | 'sneakers'
  | 'badminton'
  | 'training'
  | 'trekking'
  | 'slides';

export interface ShoeProduct {
  id: string;
  name: string;
  subtitle: string;
  category: ShoeCategory;
  retailPrice: number;
  mrp: number;
  wholesalePrice: number; // for 6+ pairs bulk purchase
  minWholesaleQty: number;
  rating: number;
  reviewCount: number;
  image: string;
  gallery: string[];
  colors: {
    name: string;
    hex: string;
    image: string;
  }[];
  sizes: {
    ukSize: number;
    inStock: boolean;
    stockCount: number;
  }[];
  tags: string[];
  description: string;
  specs: {
    sole: string;
    upperMaterial: string;
    weight: string;
    cushioning: string;
    closure: string;
    bestFor: string;
  };
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  qualityBadge: string;
}

export interface CartItem {
  id: string; // unique item instance id: `${productId}-${size}-${color}`
  product: ShoeProduct;
  selectedSize: number;
  selectedColor: string;
  quantity: number;
}

export interface FilterState {
  category: ShoeCategory;
  searchQuery: string;
  priceRange: [number, number];
  selectedSizes: number[];
  selectedColors: string[];
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'discount';
  onlyWholesale: boolean;
  onlyInStock: boolean;
}

export interface CustomerOrder {
  orderId: string;
  date: string;
  items: CartItem[];
  customerName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  paymentMethod: 'upi_qr' | 'whatsapp_direct';
  transactionId?: string;
  status: 'Order Placed' | 'Payment Verified' | 'Dispatched from Narayanpur' | 'In Transit' | 'Delivered';
  courierName?: string;
  trackingNumber?: string;
  estimatedDeliveryDate?: string;
}

export interface Review {
  id: string;
  userName: string;
  city: string;
  state: string;
  rating: number;
  date: string;
  shoeName: string;
  comment: string;
  verifiedPurchase: boolean;
  orderType: 'Retail' | 'Wholesale Bulk';
}
