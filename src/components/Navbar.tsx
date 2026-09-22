import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Phone, 
  MapPin, 
  MessageCircle, 
  Sparkles, 
  Truck, 
  Ban, 
  Menu, 
  X,
  Compass,
  SlidersHorizontal,
  PackageCheck
} from 'lucide-react';
import { STORE_PHONE, STORE_PHONE_DISPLAY } from '../data/products';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  isWholesaleMode: boolean;
  setIsWholesaleMode: (val: boolean) => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenShoeFinder: () => void;
  onOpenTrackOrder: () => void;
  onOpenWholesaleModal: () => void;
  onOpenNoCodNotice: () => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  activeCategory: string;
  onSelectCategory: (cat: any) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  isWholesaleMode,
  setIsWholesaleMode,
  onOpenCart,
  onOpenWishlist,
  onOpenShoeFinder,
  onOpenTrackOrder,
  onOpenWholesaleModal,
  onOpenNoCodNotice,
  searchQuery,
  setSearchQuery,
  activeCategory,
  onSelectCategory
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpenMobile, setSearchOpenMobile] = useState(false);

  const categories = [
    { id: 'all', label: 'All Shoes' },
    { id: 'running', label: 'Running & Marathon' },
    { id: 'cricket', label: 'Cricket Spikes & Turf' },
    { id: 'football', label: 'Football Studs' },
    { id: 'sneakers', label: 'Street Sneakers' },
    { id: 'badminton', label: 'Badminton / Court' },
    { id: 'training', label: 'Gym & Training' },
    { id: 'trekking', label: 'Trekking & Outdoor' },
    { id: 'slides', label: 'Slides & Sliders' }
  ];

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      "Hello Lama Sports! 👋 I am visiting your online store from Chhattisgarh / India. I want details on your shoe collection & pricing."
    );
    window.open(`https://wa.me/91${STORE_PHONE}?text=${text}`, '_blank');
  };

  return (
    <header className="sticky top-0 z-40 w-full shadow-md">
      {/* Top Flash Announcement Bar in High-Energy Red */}
      <div className="bg-gradient-to-r from-red-700 via-red-600 to-red-800 text-white text-xs font-semibold py-1.5 px-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap text-[11px] sm:text-xs">
            <span className="inline-flex items-center gap-1 bg-red-950/40 text-red-100 px-2 py-0.5 rounded-full border border-red-400/30">
              <Ban className="w-3 h-3 text-red-300" />
              NO COD ⛔ PREPAID ONLY
            </span>
            <span className="hidden sm:inline opacity-75">|</span>
            <span className="inline-flex items-center gap-1">
              <Truck className="w-3 h-3 text-amber-300" />
              DELIVERY ALL OVER INDIA 🇮🇳
            </span>
            <span className="hidden md:inline opacity-75">|</span>
            <span className="hidden md:inline text-amber-200">
              💯 100% QUALITY SHOES AT BEST WHOLESALE & RETAIL PRICE
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs ml-auto">
            <button 
              id="top-nav-no-cod-btn"
              onClick={onOpenNoCodNotice}
              className="text-red-100 underline hover:text-white transition-colors cursor-pointer hidden sm:inline"
            >
              Why No COD?
            </button>
            <a 
              id="top-nav-phone-call"
              href={`tel:${STORE_PHONE}`} 
              className="flex items-center gap-1 font-bold text-white hover:text-amber-200 transition-colors"
            >
              <Phone className="w-3 h-3" />
              <span>{STORE_PHONE_DISPLAY}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Athletic Blue Header */}
      <div className="bg-slate-900 border-b border-blue-900/60 text-white">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <button 
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-white rounded-lg focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <a href="#" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-blue-700 flex items-center justify-center shadow-lg shadow-red-900/30 border border-white/20 group-hover:scale-105 transition-transform">
                <span className="font-sport text-3xl font-bold tracking-tight text-white">LS</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-sport text-3xl sm:text-4xl font-bold tracking-wider text-white leading-none">
                    LAMA<span className="text-red-500">SPORTS</span>
                  </span>
                  <span className="bg-red-600/90 text-white text-[10px] uppercase font-extrabold px-1.5 py-0.5 rounded tracking-wider hidden sm:inline-block">
                    Narayanpur
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-blue-200 font-medium">
                  <MapPin className="w-3 h-3 text-red-400 shrink-0" />
                  <span>Chhattisgarh • Wholesale & Retail Hub</span>
                </div>
              </div>
            </a>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-4 relative">
            <div className="relative w-full">
              <input
                id="search-shoes-input-desktop"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cricket spikes, running shoes, sneakers, football..."
                className="w-full bg-slate-800/90 border border-blue-800/60 rounded-full pl-10 pr-9 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs bg-slate-700 rounded-full w-4 h-4 flex items-center justify-center"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Wholesale vs Retail Toggle Switch + Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Wholesale Switcher Pill */}
            <div className="hidden sm:flex items-center bg-slate-800/90 p-1 rounded-full border border-blue-800/50">
              <button
                id="toggle-retail-mode-btn"
                onClick={() => setIsWholesaleMode(false)}
                className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${
                  !isWholesaleMode
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Retail (1-5)
              </button>
              <button
                id="toggle-wholesale-mode-btn"
                onClick={() => setIsWholesaleMode(true)}
                className={`px-3 py-1 text-xs font-bold rounded-full transition-all flex items-center gap-1 ${
                  isWholesaleMode
                    ? 'bg-red-600 text-white shadow'
                    : 'text-amber-400 hover:text-amber-300'
                }`}
              >
                <Sparkles className="w-3 h-3 text-amber-300" />
                Wholesale (6+)
              </button>
            </div>

            {/* Mobile Search Toggle */}
            <button
              id="mobile-search-btn"
              onClick={() => setSearchOpenMobile(!searchOpenMobile)}
              className="md:hidden p-2 text-slate-300 hover:text-white rounded-lg"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Shoe Finder Quiz */}
            <button
              id="open-shoe-finder-btn"
              onClick={onOpenShoeFinder}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-950 border border-blue-700/60 text-blue-200 hover:text-white hover:border-blue-500 text-xs font-semibold transition-colors"
              title="Shoe Recommendation Finder"
            >
              <Compass className="w-3.5 h-3.5 text-blue-400" />
              <span>Shoe Finder</span>
            </button>

            {/* Track Order */}
            <button
              id="open-track-order-btn"
              onClick={onOpenTrackOrder}
              className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
              title="Track Existing Order"
            >
              <PackageCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Track Order</span>
            </button>

            {/* Direct WhatsApp DM CTA */}
            <button
              id="navbar-whatsapp-dm-btn"
              onClick={handleWhatsAppDirect}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-950/40 transition-all hover:scale-102"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>DM Us</span>
            </button>

            {/* Wishlist */}
            <button
              id="open-wishlist-btn"
              onClick={onOpenWishlist}
              className="relative p-2 text-slate-300 hover:text-red-400 rounded-lg transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-red-600 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Trigger */}
            <button
              id="open-cart-drawer-btn"
              onClick={onOpenCart}
              className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-3.5 py-2 rounded-xl font-bold text-xs shadow-lg shadow-red-950/40 transition-all hover:scale-102 cursor-pointer"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-400 text-slate-950 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">Cart</span>
            </button>
          </div>
        </div>

        {/* Mobile Search Input Drawer */}
        {searchOpenMobile && (
          <div className="p-3 bg-slate-800 border-t border-slate-700 md:hidden">
            <div className="relative">
              <input
                id="search-shoes-input-mobile"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cricket, football, running, sneakers..."
                className="w-full bg-slate-900 border border-blue-800 rounded-lg pl-10 pr-9 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                autoFocus
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs bg-slate-700 rounded-full w-4 h-4 flex items-center justify-center"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        )}

        {/* Horizontal Category Nav */}
        <div className="bg-slate-950/90 border-t border-blue-950 px-4 py-2 overflow-x-auto no-scrollbar">
          <div className="max-w-7xl mx-auto flex items-center gap-2 min-w-max">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`cat-nav-${cat.id}`}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-900/40'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}

            {/* Quick bulk inquiry link in category nav */}
            <button
              id="cat-nav-bulk-inquiry"
              onClick={onOpenWholesaleModal}
              className="ml-auto text-xs font-bold text-amber-400 hover:text-amber-300 bg-amber-950/40 border border-amber-600/40 px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3 h-3" />
              Bulk Dukandar Rates
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm lg:hidden flex">
          <div className="w-4/5 max-w-sm bg-slate-900 h-full p-5 overflow-y-auto text-white flex flex-col justify-between border-r border-slate-800">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="font-sport text-3xl font-bold tracking-wider">
                  LAMA<span className="text-red-500">SPORTS</span>
                </span>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Wholesale Toggle in Mobile */}
              <div className="mt-4 p-3 bg-slate-800 rounded-xl border border-slate-700">
                <div className="text-xs font-bold text-slate-300 mb-2">Shopping Mode:</div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setIsWholesaleMode(false);
                      setMobileMenuOpen(false);
                    }}
                    className={`py-2 text-xs font-bold rounded-lg ${
                      !isWholesaleMode ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300'
                    }`}
                  >
                    Retail (1-5 Pairs)
                  </button>
                  <button
                    onClick={() => {
                      setIsWholesaleMode(true);
                      setMobileMenuOpen(false);
                    }}
                    className={`py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1 ${
                      isWholesaleMode ? 'bg-red-600 text-white' : 'bg-slate-700 text-amber-300'
                    }`}
                  >
                    Wholesale (6+ Pairs)
                  </button>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="mt-5 space-y-2">
                <button
                  onClick={() => {
                    onOpenShoeFinder();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-lg bg-blue-950/60 border border-blue-800/40 text-blue-200 text-sm font-semibold flex items-center gap-2"
                >
                  <Compass className="w-4 h-4 text-blue-400" />
                  Shoe Finder Quiz
                </button>

                <button
                  onClick={() => {
                    onOpenWholesaleModal();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-lg bg-amber-950/40 border border-amber-600/40 text-amber-300 text-sm font-semibold flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Dukandar Bulk Booking (Wholesale)
                </button>

                <button
                  onClick={() => {
                    onOpenTrackOrder();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-lg bg-slate-800 text-slate-200 text-sm font-semibold flex items-center gap-2"
                >
                  <PackageCheck className="w-4 h-4 text-emerald-400" />
                  Track Existing Order
                </button>

                <button
                  onClick={() => {
                    onOpenNoCodNotice();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-lg bg-red-950/40 border border-red-800/30 text-red-300 text-sm font-semibold flex items-center gap-2"
                >
                  <Ban className="w-4 h-4 text-red-400" />
                  No COD Policy Explained
                </button>
              </div>

              {/* Categories list */}
              <div className="mt-6">
                <div className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">
                  Browse by Category
                </div>
                <div className="space-y-1">
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        onSelectCategory(c.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                        activeCategory === c.id ? 'bg-blue-600 font-bold text-white' : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom info */}
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <a
                href={`tel:${STORE_PHONE}`}
                className="w-full py-2.5 rounded-xl bg-blue-700 hover:bg-blue-600 text-white font-bold text-sm flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Call: {STORE_PHONE_DISPLAY}
              </a>
              <button
                onClick={handleWhatsAppDirect}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us
              </button>
              <p className="text-[11px] text-slate-400 text-center">
                Lama Sports • Narayanpur, Chhattisgarh 494661
              </p>
            </div>
          </div>

          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}
    </header>
  );
};
