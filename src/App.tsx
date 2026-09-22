import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShoeProduct, 
  CartItem, 
  ShoeCategory, 
  CustomerOrder 
} from './types';
import { 
  SAMPLE_PRODUCTS, 
  CUSTOMER_REVIEWS, 
  STORE_PHONE, 
  STORE_PHONE_DISPLAY, 
  PINCODE_DATABASE 
} from './data/products';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { WholesaleModal } from './components/WholesaleModal';
import { TrackOrderModal } from './components/TrackOrderModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { ShoeFinderModal } from './components/ShoeFinderModal';
import { NoCodNoticeModal } from './components/NoCodNoticeModal';
import { Footer } from './components/Footer';
import { 
  Sparkles, 
  SlidersHorizontal, 
  Truck, 
  Ban, 
  Phone, 
  MessageCircle, 
  Star, 
  ShieldCheck, 
  ArrowUpDown,
  Search,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';

export default function App() {
  // App state
  const [products] = useState<ShoeProduct[]>(SAMPLE_PRODUCTS);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('lama_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [wishlist, setWishlist] = useState<ShoeProduct[]>(() => {
    try {
      const saved = localStorage.getItem('lama_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [recentOrders, setRecentOrders] = useState<CustomerOrder[]>(() => {
    try {
      const saved = localStorage.getItem('lama_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Filter & Mode state
  const [isWholesaleMode, setIsWholesaleMode] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<ShoeCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSizeFilter, setSelectedSizeFilter] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'discount'>('featured');
  const [priceMax, setPriceMax] = useState<number>(5000);

  // Modal visibility states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isShoeFinderOpen, setIsShoeFinderOpen] = useState(false);
  const [isTrackOrderOpen, setIsTrackOrderOpen] = useState(false);
  const [isWholesaleModalOpen, setIsWholesaleModalOpen] = useState(false);
  const [isNoCodNoticeOpen, setIsNoCodNoticeOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ShoeProduct | null>(null);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('lama_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('lama_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('lama_orders', JSON.stringify(recentOrders));
  }, [recentOrders]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2800);
  };

  // Add to Cart handler
  const handleAddToCart = (product: ShoeProduct, size: number, color: string, qty: number = 1) => {
    const itemId = `${product.id}-${size}-${color}`;
    setCartItems(prev => {
      const existing = prev.find(i => i.id === itemId);
      if (existing) {
        return prev.map(i => i.id === itemId ? { ...i, quantity: i.quantity + qty } : i);
      }
      return [...prev, {
        id: itemId,
        product,
        selectedSize: size,
        selectedColor: color,
        quantity: qty
      }];
    });

    showToast(`Added ${product.name} (UK ${size}) to cart!`);
  };

  // Buy Now direct handler
  const handleBuyNow = (product: ShoeProduct, size: number, color: string, qty: number = 1) => {
    handleAddToCart(product, size, color, qty);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  // Update Cart Quantity
  const handleUpdateQuantity = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveFromCart(itemId);
      return;
    }
    setCartItems(prev => prev.map(i => i.id === itemId ? { ...i, quantity: newQty } : i));
  };

  // Remove from Cart
  const handleRemoveFromCart = (itemId: string) => {
    setCartItems(prev => prev.filter(i => i.id !== itemId));
    showToast("Item removed from cart");
  };

  // Wishlist toggle
  const handleToggleWishlist = (product: ShoeProduct) => {
    const isSaved = wishlist.some(w => w.id === product.id);
    if (isSaved) {
      setWishlist(prev => prev.filter(w => w.id !== product.id));
      showToast(`Removed from favorites`);
    } else {
      setWishlist(prev => [...prev, product]);
      showToast(`Saved ${product.name} to favorites!`);
    }
  };

  // Order Success handler
  const handleOrderSuccess = (order: CustomerOrder) => {
    setRecentOrders(prev => [order, ...prev]);
    setCartItems([]);
    showToast(`Order #${order.orderId} booked successfully!`);
  };

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category check
      if (activeCategory !== 'all' && product.category !== activeCategory) {
        return false;
      }
      // Search query check
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesSub = product.subtitle.toLowerCase().includes(q);
        const matchesCat = product.category.toLowerCase().includes(q);
        const matchesTags = product.tags.some(t => t.toLowerCase().includes(q));
        if (!matchesName && !matchesSub && !matchesCat && !matchesTags) {
          return false;
        }
      }
      // Size filter check
      if (selectedSizeFilter !== null) {
        const hasSize = product.sizes.some(s => s.ukSize === selectedSizeFilter && s.inStock);
        if (!hasSize) return false;
      }
      // Price filter check
      const currentPrice = isWholesaleMode ? product.wholesalePrice : product.retailPrice;
      if (currentPrice > priceMax) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      const priceA = isWholesaleMode ? a.wholesalePrice : a.retailPrice;
      const priceB = isWholesaleMode ? b.wholesalePrice : b.retailPrice;
      if (sortBy === 'price-asc') return priceA - priceB;
      if (sortBy === 'price-desc') return priceB - priceA;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'discount') {
        const discA = (a.mrp - a.retailPrice) / a.mrp;
        const discB = (b.mrp - b.retailPrice) / b.mrp;
        return discB - discA;
      }
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, activeCategory, searchQuery, selectedSizeFilter, sortBy, priceMax, isWholesaleMode]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-red-600 selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-red-500/60 flex items-center gap-2.5 animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Main Responsive Navigation */}
      <Navbar
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        wishlistCount={wishlist.length}
        isWholesaleMode={isWholesaleMode}
        setIsWholesaleMode={setIsWholesaleMode}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenShoeFinder={() => setIsShoeFinderOpen(true)}
        onOpenTrackOrder={() => setIsTrackOrderOpen(true)}
        onOpenWholesaleModal={() => setIsWholesaleModalOpen(true)}
        onOpenNoCodNotice={() => setIsNoCodNoticeOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      {/* Hero Section */}
      <Hero
        isWholesaleMode={isWholesaleMode}
        setIsWholesaleMode={setIsWholesaleMode}
        onExploreClick={() => {
          document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenWholesaleModal={() => setIsWholesaleModalOpen(true)}
        onOpenNoCodNotice={() => setIsNoCodNoticeOpen(true)}
        onOpenShoeFinder={() => setIsShoeFinderOpen(true)}
      />

      {/* Main Content Area */}
      <main id="catalog-section" className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        
        {/* Active Mode Banner */}
        <div className={`p-4 rounded-2xl mb-6 border transition-all flex flex-col sm:flex-row items-center justify-between gap-3 ${
          isWholesaleMode 
            ? 'bg-gradient-to-r from-red-950 via-slate-900 to-red-900 text-white border-red-500' 
            : 'bg-gradient-to-r from-blue-900 via-slate-900 to-blue-950 text-white border-blue-700'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow ${
              isWholesaleMode ? 'bg-red-600' : 'bg-blue-600'
            }`}>
              {isWholesaleMode ? <Sparkles className="w-5 h-5 text-amber-300" /> : '👟'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-black text-base sm:text-lg">
                  {isWholesaleMode ? 'Wholesale Bulk Mode (6+ Pairs Discount Active)' : 'Retail Shopping Mode (Single Pair Purchase)'}
                </span>
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                  isWholesaleMode ? 'bg-amber-400 text-slate-950' : 'bg-blue-500 text-white'
                }`}>
                  {isWholesaleMode ? 'Dukandar Rates' : 'Standard'}
                </span>
              </div>
              <p className="text-xs opacity-80 mt-0.5">
                {isWholesaleMode 
                  ? 'Showing special factory bulk prices for shoe shopkeepers, coaches & bulk buyers. Strictly No COD ⛔.' 
                  : 'Individual pair prices shown. Buy 6+ pairs anytime to automatically unlock wholesale rates!'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsWholesaleMode(!isWholesaleMode)}
            className="px-4 py-2 rounded-xl bg-white text-slate-950 font-bold text-xs hover:bg-slate-100 transition-transform active:scale-95 shrink-0 cursor-pointer shadow"
          >
            Switch to {isWholesaleMode ? 'Retail Mode' : 'Wholesale Mode (6+ Pairs)'}
          </button>
        </div>

        {/* Filter & Sorting Control Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs mb-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            
            {/* Left: Size Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
              <span className="text-xs font-bold text-slate-500 whitespace-nowrap flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5" /> Filter by UK Size:
              </span>
              <button
                onClick={() => setSelectedSizeFilter(null)}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  selectedSizeFilter === null
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All
              </button>
              {[6, 7, 8, 9, 10, 11].map(sz => (
                <button
                  key={sz}
                  onClick={() => setSelectedSizeFilter(selectedSizeFilter === sz ? null : sz)}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                    selectedSizeFilter === sz
                      ? 'bg-red-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-700'
                  }`}
                >
                  UK {sz}
                </button>
              ))}
            </div>

            {/* Right: Sorting Selector */}
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-xs text-slate-500 font-semibold whitespace-nowrap flex items-center gap-1">
                <ArrowUpDown className="w-3.5 h-3.5" /> Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="featured">Featured / Best Sellers</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Customer Rating</option>
                <option value="discount">Biggest Discount %</option>
              </select>
            </div>
          </div>

          {/* Active Filter Tags */}
          <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 gap-2">
            <div className="flex items-center gap-2">
              <span>Showing <strong>{filteredProducts.length}</strong> Shoes</span>
              {activeCategory !== 'all' && (
                <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-bold text-[11px] flex items-center gap-1">
                  Category: {activeCategory}
                  <button onClick={() => setActiveCategory('all')} className="hover:text-red-600">✕</button>
                </span>
              )}
              {selectedSizeFilter !== null && (
                <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded-full font-bold text-[11px] flex items-center gap-1">
                  Size: UK {selectedSizeFilter}
                  <button onClick={() => setSelectedSizeFilter(null)} className="hover:text-red-600">✕</button>
                </span>
              )}
              {searchQuery && (
                <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded-full font-bold text-[11px] flex items-center gap-1">
                  "{searchQuery}"
                  <button onClick={() => setSearchQuery('')} className="hover:text-red-600">✕</button>
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSizeGuideOpen(true)}
                className="text-blue-600 hover:text-blue-800 font-bold underline cursor-pointer text-xs"
              >
                Size Guide Chart
              </button>
              <button
                onClick={() => setIsNoCodNoticeOpen(true)}
                className="text-red-600 hover:text-red-800 font-bold underline cursor-pointer text-xs"
              >
                No COD Details ⛔
              </button>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-2xl">
              👟
            </div>
            <h3 className="font-heading font-black text-xl text-slate-900">
              No Shoes Match Your Filter
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try clearing size filters or search terms. We have plenty of styles in running, cricket, football, and sneakers!
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
                setSelectedSizeFilter(null);
              }}
              className="mt-2 bg-red-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-red-700 shadow-md cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredProducts.map((shoe) => (
              <ProductCard
                key={shoe.id}
                product={shoe}
                isWholesaleMode={isWholesaleMode}
                isWishlisted={wishlist.some(w => w.id === shoe.id)}
                onToggleWishlist={handleToggleWishlist}
                onQuickView={(p) => setSelectedProduct(p)}
                onAddToCart={(p, size, color, qty) => handleAddToCart(p, size, color, qty)}
              />
            ))}
          </div>
        )}

        {/* Why Choose Lama Sports Trust Grid in Blue & Red Archetype */}
        <section className="mt-16 pt-12 border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="text-xs font-bold text-red-600 uppercase tracking-widest mb-1">
              STORE HIGHLIGHTS • CHHATTISGARH NARAYANPUR
            </div>
            <h2 className="font-sport text-4xl sm:text-5xl font-black text-slate-950 uppercase tracking-wide leading-none">
              WHY ATHLETES & DUKANDARS TRUST LAMA SPORTS
            </h2>
            <p className="text-xs text-slate-500 mt-2">
              Serving players, coaches, physical training students, and footwear retail shops across India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Card 1 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-500 transition-colors shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-black text-xl mb-3">
                💯
              </div>
              <h3 className="font-heading font-bold text-slate-900 text-base">
                100% Quality In Best Price
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Every sole, stitch, and eyelet is physically inspected in Narayanpur before dispatch. Tournament grade rubber and nitrogen foam cushioning.
              </p>
            </div>

            {/* Card 2 */}
            <div 
              onClick={() => setIsNoCodNoticeOpen(true)}
              className="bg-red-50/60 p-5 rounded-2xl border border-red-200 hover:border-red-400 transition-colors shadow-xs cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold text-xl mb-3 group-hover:scale-105 transition-transform">
                <Ban className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-bold text-red-950 text-base">
                  Strictly NO COD ⛔
                </h3>
                <span className="text-[10px] text-red-600 underline font-bold">Why?</span>
              </div>
              <p className="text-xs text-red-900/80 mt-1 leading-relaxed">
                Operating 100% prepaid eliminates huge courier return charges, allowing us to pass 30% direct cash savings to our customers.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-emerald-500 transition-colors shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xl mb-3">
                <Truck className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-heading font-bold text-slate-900 text-base">
                Delivery All Over India 🇮🇳
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Direct partnerships with India Speed Post and DTDC Express. Rapid dispatch to Bastar, Raipur, Delhi, Mumbai, Bihar, MP, and all pincodes.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-amber-500 transition-colors shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-xl mb-3">
                <Phone className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="font-heading font-bold text-slate-900 text-base">
                Direct Help: {STORE_PHONE}
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Real human store support on Call and WhatsApp. Talk directly to the store team for size guidance, parcel tracking, or wholesale cartons.
              </p>
            </div>
          </div>
        </section>

        {/* Customer Reviews & Real Feedback */}
        <section className="mt-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
            <div>
              <div className="text-xs font-bold text-blue-700 uppercase tracking-widest mb-1">
                VERIFIED CUSTOMER LOVE 😍
              </div>
              <h2 className="font-sport text-4xl sm:text-5xl font-black text-slate-950 uppercase tracking-wide leading-none">
                WHAT ATHLETES & SHOPKEEPERS SAY
              </h2>
            </div>
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl text-xs font-bold text-amber-900">
              <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
              <span>4.9 / 5.0 Rating Across 1,200+ Verified Dispatches</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CUSTOMER_REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-semibold">
                      {rev.date}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-slate-900">{rev.userName}</h4>
                    <span className="text-[11px] text-slate-500">{rev.city}, {rev.state}</span>
                  </div>
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                    rev.orderType === 'Wholesale Bulk' 
                      ? 'bg-amber-100 text-amber-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {rev.orderType}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Wholesale Dukandar CTA Banner */}
        <section className="mt-16 bg-gradient-to-r from-red-700 via-red-600 to-blue-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left">
            <span className="bg-amber-400 text-slate-950 text-xs font-black uppercase px-2.5 py-0.5 rounded tracking-wider inline-block">
              DUKANDAR & COACH BULK SCHEME
            </span>
            <h2 className="font-sport text-4xl sm:text-5xl font-black uppercase tracking-wider leading-none">
              WANT TO SELL LAMA SPORTS SHOES IN YOUR CITY?
            </h2>
            <p className="text-xs sm:text-sm text-red-100 max-w-xl">
              Get master cartons with assorted sizes (UK 6 to 10) at factory wholesale rates. High margins, zero quality complaints, pan-India parcel dispatch.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => setIsWholesaleModalOpen(true)}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-extrabold text-xs sm:text-sm shadow-lg transition-transform active:scale-95 cursor-pointer"
            >
              Calculate Wholesale Quote
            </button>
            <a
              href={`https://wa.me/91${STORE_PHONE}?text=${encodeURIComponent("Hello Lama Sports! I want wholesale prices for 24+ pairs of shoes.")}`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp: {STORE_PHONE}</span>
            </a>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer
        onOpenNoCodNotice={() => setIsNoCodNoticeOpen(true)}
        onOpenWholesaleModal={() => setIsWholesaleModalOpen(true)}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        onOpenTrackOrder={() => setIsTrackOrderOpen(true)}
        onSelectCategory={setActiveCategory}
      />

      {/* Modals & Slide-over Drawers */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        onOpenNoCodNotice={() => setIsNoCodNoticeOpen(true)}
        isWholesaleMode={isWholesaleMode}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={() => setCartItems([])}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        onOpenNoCodNotice={() => setIsNoCodNoticeOpen(true)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onOrderSuccess={handleOrderSuccess}
        onOpenNoCodNotice={() => setIsNoCodNoticeOpen(true)}
      />

      <WholesaleModal
        isOpen={isWholesaleModalOpen}
        onClose={() => setIsWholesaleModalOpen(false)}
      />

      <TrackOrderModal
        isOpen={isTrackOrderOpen}
        onClose={() => setIsTrackOrderOpen(false)}
        recentOrders={recentOrders}
      />

      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />

      <ShoeFinderModal
        isOpen={isShoeFinderOpen}
        onClose={() => setIsShoeFinderOpen(false)}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      <NoCodNoticeModal
        isOpen={isNoCodNoticeOpen}
        onClose={() => setIsNoCodNoticeOpen(false)}
      />

    </div>
  );
}
