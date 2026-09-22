import React, { useState } from 'react';
import { 
  X, 
  Star, 
  Truck, 
  ShieldCheck, 
  Ban, 
  MessageCircle, 
  ShoppingBag, 
  Zap, 
  Check, 
  Ruler, 
  MapPin, 
  Share2, 
  Sparkles,
  Phone
} from 'lucide-react';
import { ShoeProduct } from '../types';
import { STORE_PHONE, PINCODE_DATABASE } from '../data/products';

interface ProductDetailModalProps {
  product: ShoeProduct | null;
  onClose: () => void;
  onAddToCart: (product: ShoeProduct, size: number, color: string, qty: number) => void;
  onBuyNow: (product: ShoeProduct, size: number, color: string, qty: number) => void;
  onOpenSizeGuide: () => void;
  onOpenNoCodNotice: () => void;
  isWholesaleMode: boolean;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  onOpenSizeGuide,
  onOpenNoCodNotice,
  isWholesaleMode
}) => {
  if (!product) return null;

  const [activeImage, setActiveImage] = useState(product.image);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Standard');
  const [selectedSize, setSelectedSize] = useState<number>(
    product.sizes.find(s => s.inStock)?.ukSize || product.sizes[0].ukSize
  );
  const [quantity, setQuantity] = useState(isWholesaleMode ? product.minWholesaleQty : 1);
  const [pincode, setPincode] = useState('');
  const [pincodeResult, setPincodeResult] = useState<{ city: string; state: string; days: string; courier: string } | null>(null);
  const [pincodeChecked, setPincodeChecked] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Price calculations based on quantity
  const isWholesaleTier = quantity >= product.minWholesaleQty || isWholesaleMode;
  const unitPrice = isWholesaleTier ? product.wholesalePrice : product.retailPrice;
  const totalPrice = unitPrice * quantity;
  const mrpTotal = product.mrp * quantity;
  const totalSavings = mrpTotal - totalPrice;

  const handleColorSelect = (colorObj: typeof product.colors[0]) => {
    setSelectedColor(colorObj.name);
    if (colorObj.image) {
      setActiveImage(colorObj.image);
    }
  };

  const handlePincodeCheck = () => {
    if (!pincode || pincode.length !== 6) return;
    const info = PINCODE_DATABASE[pincode] || {
      city: "Your Location",
      state: "India",
      days: "3-5 Working Days",
      courier: "DTDC Express / India Speed Post"
    };
    setPincodeResult(info);
    setPincodeChecked(true);
  };

  const handleWhatsAppOrder = () => {
    const orderDetails = 
`Hello Lama Sports Narayanpur! 👟 
I want to confirm an order for:

📦 Product: *${product.name}*
🏷️ Category: ${product.category}
👟 Size: UK ${selectedSize} (India)
🎨 Color: ${selectedColor}
🔢 Quantity: ${quantity} pair(s)
💰 Rate: ₹${unitPrice} per pair (${isWholesaleTier ? 'Wholesale Rate' : 'Retail Rate'})
💵 Total Amount: *₹${totalPrice}*

📍 Store: Lama Sports (Narayanpur, Chhattisgarh)
⚠️ Payment: Prepaid (No COD accepted)

Please share UPI QR Code to complete order. Thank you!`;

    const encoded = encodeURIComponent(orderDetails);
    window.open(`https://wa.me/91${STORE_PHONE}?text=${encoded}`, '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${product.name} - Lama Sports`,
        text: `Check out ${product.name} at Lama Sports Narayanpur at ₹${product.retailPrice}! Wholesale rate ₹${product.wholesalePrice}.`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const selectedSizeStock = product.sizes.find(s => s.ukSize === selectedSize)?.stockCount || 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 my-auto text-slate-900 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="bg-slate-900 text-white px-5 py-3 flex items-center justify-between border-b border-blue-900/60">
          <div className="flex items-center gap-2">
            <span className="font-sport text-2xl font-bold tracking-wider text-red-500">
              LAMA SPORTS
            </span>
            <span className="text-slate-400 text-xs hidden sm:inline">• Narayanpur, Chhattisgarh</span>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              title="Share Shoe"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-4 sm:p-6 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Left: Gallery & Images */}
            <div className="md:col-span-6 flex flex-col gap-3">
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 group">
                <img
                  src={activeImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Badges on image */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  <span className="bg-red-600 text-white text-[11px] font-black px-2.5 py-0.5 rounded uppercase tracking-wider shadow">
                    💯 {product.qualityBadge}
                  </span>
                  {isWholesaleTier && (
                    <span className="bg-amber-600 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider shadow">
                      Wholesale Bulk Tier Active
                    </span>
                  )}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {[product.image, ...product.gallery].filter((v, i, a) => a.indexOf(v) === i).map((imgUrl, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(imgUrl)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                      activeImage === imgUrl ? 'border-red-600 scale-105 shadow-md' : 'border-slate-200 hover:border-blue-400'
                    }`}
                  >
                    <img src={imgUrl} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Key Highlights Checklist */}
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs space-y-2">
                <div className="font-bold text-slate-800 uppercase text-[11px] tracking-wider">
                  Store Guarantees (Narayanpur Hub):
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Delivery all over India via Speed Post & DTDC</span>
                </div>
                <div 
                  onClick={onOpenNoCodNotice} 
                  className="flex items-center gap-2 text-red-700 cursor-pointer hover:underline"
                >
                  <Ban className="w-4 h-4 text-red-600 shrink-0" />
                  <span className="font-bold">Strictly NO COD ⛔ (Prepaid ensures lowest wholesale price)</span>
                </div>
                <div className="flex items-center gap-2 text-blue-700">
                  <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Direct phone assistance: <strong>{STORE_PHONE}</strong></span>
                </div>
              </div>
            </div>

            {/* Right: Product Details, Sizing, Quantity & Actions */}
            <div className="md:col-span-6 flex flex-col justify-between gap-4">
              <div>
                {/* Category & Ratings */}
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span className="uppercase font-extrabold text-blue-700 tracking-wider text-xs">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md text-amber-800 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                    <span>{product.rating}</span>
                    <span className="text-slate-500 font-normal">({product.reviewCount} reviews)</span>
                  </div>
                </div>

                {/* Name */}
                <h2 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 leading-tight">
                  {product.name}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  {product.subtitle}
                </p>

                {/* Pricing Box with Wholesale Tier Progress */}
                <div className="mt-3 p-3.5 bg-gradient-to-r from-blue-50 to-slate-50 rounded-2xl border border-blue-200">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <div className="text-[11px] font-bold text-slate-500 uppercase">
                        {isWholesaleTier ? 'Wholesale Price per Pair' : 'Retail Price (1-5 Pairs)'}
                      </div>
                      <div className="flex items-baseline gap-2.5">
                        <span className="text-3xl font-black text-slate-950">
                          ₹{unitPrice}
                        </span>
                        <span className="text-sm text-slate-400 line-through">
                          ₹{product.mrp}
                        </span>
                        <span className="text-xs font-black text-red-600 bg-red-100 px-1.5 py-0.5 rounded">
                          {Math.round(((product.mrp - unitPrice) / product.mrp) * 100)}% OFF
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-[11px] font-bold text-slate-500 uppercase">Order Total</div>
                      <div className="text-2xl font-black text-blue-700">
                        ₹{totalPrice}
                      </div>
                      <div className="text-[10px] text-emerald-700 font-bold">
                        Save ₹{totalSavings}
                      </div>
                    </div>
                  </div>

                  {/* Wholesale tier alert */}
                  {!isWholesaleTier ? (
                    <div className="mt-2.5 pt-2 border-t border-blue-200/80 flex items-center justify-between text-xs text-amber-800 bg-amber-50/80 p-2 rounded-xl">
                      <span className="flex items-center gap-1.5 font-bold">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                        Wholesale Rate: ₹{product.wholesalePrice}/pair
                      </span>
                      <button 
                        onClick={() => setQuantity(product.minWholesaleQty)}
                        className="text-[11px] bg-amber-600 text-white font-extrabold px-2 py-0.5 rounded hover:bg-amber-700 cursor-pointer"
                      >
                        Apply (Qty: {product.minWholesaleQty}+)
                      </button>
                    </div>
                  ) : (
                    <div className="mt-2.5 pt-2 border-t border-emerald-200 flex items-center gap-1.5 text-xs text-emerald-800 font-bold bg-emerald-50 p-2 rounded-xl">
                      <Check className="w-4 h-4 text-emerald-600" />
                      Wholesale bulk discount applied! You are saving ₹{product.retailPrice - product.wholesalePrice} per pair.
                    </div>
                  )}
                </div>

                {/* Color Selection */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5">
                    <span>Select Color: <span className="text-blue-700 font-extrabold">{selectedColor}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => handleColorSelect(c)}
                        className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                          selectedColor === c.name
                            ? 'border-blue-600 bg-blue-50 text-blue-800 ring-2 ring-blue-600/30'
                            : 'border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <span 
                          className="w-3 h-3 rounded-full border border-slate-300" 
                          style={{ backgroundColor: c.hex }} 
                        />
                        <span>{c.name.split('/')[0]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selection */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5">
                    <span>
                      Select UK Size (India Standard): <strong className="text-red-600 font-black">UK {selectedSize}</strong>
                    </span>
                    <button
                      onClick={onOpenSizeGuide}
                      className="text-blue-600 hover:text-blue-800 text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Ruler className="w-3.5 h-3.5" />
                      Size Chart Guide
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-6 gap-2">
                    {product.sizes.map((s) => {
                      const isSelected = selectedSize === s.ukSize;
                      return (
                        <button
                          key={s.ukSize}
                          disabled={!s.inStock}
                          onClick={() => setSelectedSize(s.ukSize)}
                          className={`py-2 px-1 text-center rounded-xl border font-bold text-xs transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-600/30'
                              : s.inStock
                              ? 'bg-white text-slate-800 border-slate-200 hover:border-blue-500 hover:bg-blue-50'
                              : 'bg-slate-100 text-slate-300 border-slate-200 line-through cursor-not-allowed'
                          }`}
                        >
                          UK {s.ukSize}
                        </button>
                      );
                    })}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    {selectedSizeStock > 0 ? (
                      <span className="text-emerald-700 font-medium">✓ In Stock at Narayanpur Hub ({selectedSizeStock} pairs remaining)</span>
                    ) : (
                      <span className="text-red-500 font-medium">Out of stock in UK {selectedSize}</span>
                    )}
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="mt-4 flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <div>
                    <div className="text-xs font-bold text-slate-800">Quantity (Pairs):</div>
                    <div className="text-[11px] text-slate-500">
                      {quantity >= 6 ? 'Bulk Wholesale Active' : 'Minimum 6 for wholesale rate'}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-300 font-bold text-slate-700 flex items-center justify-center hover:bg-slate-100"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-14 text-center font-bold text-sm bg-white border border-slate-300 rounded-lg py-1 text-slate-900"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-300 font-bold text-slate-700 flex items-center justify-center hover:bg-slate-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Pincode Delivery Estimator */}
                <div className="mt-4 p-3 bg-blue-50/60 rounded-2xl border border-blue-200/80">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900 mb-2">
                    <MapPin className="w-3.5 h-3.5 text-red-600" />
                    Check Estimated Delivery (Pan-India):
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      maxLength={6}
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                      placeholder="Enter 6-digit Pincode (e.g. 494661)"
                      className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={handlePincodeCheck}
                      className="bg-blue-600 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl hover:bg-blue-700 cursor-pointer"
                    >
                      Check
                    </button>
                  </div>

                  {pincodeChecked && pincodeResult && (
                    <div className="mt-2 text-xs text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200">
                      <div className="font-bold text-emerald-700 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Serviceable to {pincodeResult.city}, {pincodeResult.state}
                      </div>
                      <div className="text-[11px] text-slate-600 mt-0.5">
                        Estimated: <strong>{pincodeResult.days}</strong> via {pincodeResult.courier}
                      </div>
                    </div>
                  )}
                </div>

                {/* Specifications Accordion / Grid */}
                <div className="mt-4 pt-3 border-t border-slate-200">
                  <div className="text-xs font-bold text-slate-800 uppercase mb-2">
                    Technical Specifications:
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-slate-50 p-2 rounded-lg">
                      <span className="text-slate-400 block text-[10px]">Sole Material</span>
                      <span className="font-semibold text-slate-800">{product.specs.sole}</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-lg">
                      <span className="text-slate-400 block text-[10px]">Upper Material</span>
                      <span className="font-semibold text-slate-800">{product.specs.upperMaterial}</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-lg">
                      <span className="text-slate-400 block text-[10px]">Cushioning</span>
                      <span className="font-semibold text-slate-800">{product.specs.cushioning}</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-lg">
                      <span className="text-slate-400 block text-[10px]">Best Suited For</span>
                      <span className="font-semibold text-slate-800">{product.specs.bestFor}</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Sticky Action Footer inside Modal */}
              <div className="pt-4 border-t border-slate-200 flex flex-col gap-2">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      onAddToCart(product, selectedSize, selectedColor, quantity);
                      onClose();
                    }}
                    className="py-3 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    onClick={() => {
                      onBuyNow(product, selectedSize, selectedColor, quantity);
                    }}
                    className="py-3 px-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-900/30 transition-all active:scale-95 cursor-pointer"
                  >
                    <Zap className="w-4 h-4" />
                    <span>Prepaid Buy Now</span>
                  </button>
                </div>

                {/* Primary WhatsApp DM Order CTA */}
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/20 transition-all active:scale-95 cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>DM US FOR ORDERS ON WHATSAPP ({STORE_PHONE})</span>
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
