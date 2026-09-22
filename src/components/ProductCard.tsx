import React, { useState } from 'react';
import { 
  Heart, 
  ShoppingBag, 
  Eye, 
  MessageCircle, 
  Star, 
  Sparkles, 
  Check, 
  Ban,
  ArrowRight
} from 'lucide-react';
import { ShoeProduct } from '../types';
import { STORE_PHONE } from '../data/products';

interface ProductCardProps {
  product: ShoeProduct;
  isWholesaleMode: boolean;
  isWishlisted: boolean;
  onToggleWishlist: (product: ShoeProduct) => void;
  onQuickView: (product: ShoeProduct) => void;
  onAddToCart: (product: ShoeProduct, size: number, color: string, qty: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWholesaleMode,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToCart
}) => {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<number>(
    product.sizes.find(s => s.inStock)?.ukSize || product.sizes[0].ukSize
  );
  const [addedAnimation, setAddedAnimation] = useState(false);

  const activeColor = product.colors[selectedColorIndex] || product.colors[0];
  const activeImage = activeColor.image || product.image;

  const discountPercent = Math.round(((product.mrp - product.retailPrice) / product.mrp) * 100);
  const wholesaleDiscountPercent = Math.round(((product.mrp - product.wholesalePrice) / product.mrp) * 100);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedSize, activeColor.name, isWholesaleMode ? product.minWholesaleQty : 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    const modeText = isWholesaleMode 
      ? `Wholesale Bulk Order (Min ${product.minWholesaleQty} pairs @ ₹${product.wholesalePrice}/pair)`
      : `Retail Single Pair Order (@ ₹${product.retailPrice})`;
      
    const text = encodeURIComponent(
      `Hello Lama Sports! 👟 I want to order this shoe:\n\n*${product.name}*\nSize: UK ${selectedSize}\nColor: ${activeColor.name}\nMode: ${modeText}\nStore: Lama Sports Narayanpur, CG\n\nPlease send payment UPI QR code and confirm dispatch.`
    );
    window.open(`https://wa.me/91${STORE_PHONE}?text=${text}`, '_blank');
  };

  return (
    <div 
      onClick={() => onQuickView(product)}
      className="group relative bg-white rounded-2xl border border-slate-200/90 hover:border-red-500/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
    >
      {/* Top badges */}
      <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
        <img
          src={activeImage}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Quality Badge */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 items-start">
          <span className="bg-red-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-md tracking-wider shadow">
            {discountPercent}% OFF
          </span>
          <span className="bg-slate-900/85 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md border border-white/20">
            {product.qualityBadge}
          </span>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-transform active:scale-90 ${
            isWishlisted 
              ? 'bg-red-600 text-white shadow-md' 
              : 'bg-white/80 text-slate-600 hover:text-red-600 hover:bg-white'
          }`}
          aria-label="Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Hover Quick View Trigger */}
        <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <span className="bg-white/95 text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 hover:bg-white">
            <Eye className="w-3.5 h-3.5 text-blue-600" /> Quick View
          </span>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="uppercase font-bold tracking-wider text-[11px] text-blue-700">
              {product.category}
            </span>
            <div className="flex items-center gap-1 bg-amber-50 px-1.5 py-0.5 rounded text-amber-700 font-bold text-[11px]">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-slate-400 font-normal">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="font-heading font-bold text-slate-900 text-base leading-tight group-hover:text-blue-700 transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
            {product.subtitle}
          </p>

          {/* Color Switcher */}
          <div className="mt-2.5 flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            <span className="text-[11px] text-slate-400 font-medium">Color:</span>
            <div className="flex items-center gap-1.5">
              {product.colors.map((c, idx) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColorIndex(idx)}
                  className={`w-4 h-4 rounded-full border-2 transition-transform ${
                    selectedColorIndex === idx 
                      ? 'border-blue-600 scale-125 ring-1 ring-blue-600' 
                      : 'border-slate-300 hover:scale-110'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
            <span className="text-[10px] text-slate-500 ml-1 truncate">
              {activeColor.name.split('/')[0]}
            </span>
          </div>

          {/* Size Selectors */}
          <div className="mt-2.5" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
              <span>Select UK Size:</span>
              <span className="text-[10px] text-emerald-600 font-semibold">India Sizing</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {product.sizes.map((s) => {
                const isSelected = selectedSize === s.ukSize;
                return (
                  <button
                    key={s.ukSize}
                    disabled={!s.inStock}
                    onClick={() => setSelectedSize(s.ukSize)}
                    className={`px-2 py-0.5 text-xs font-bold rounded border transition-colors ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : s.inStock
                        ? 'bg-slate-50 text-slate-700 border-slate-200 hover:border-blue-400'
                        : 'bg-slate-100 text-slate-300 border-slate-100 line-through cursor-not-allowed'
                    }`}
                  >
                    UK {s.ukSize}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Price & Action Area */}
        <div className="pt-2 border-t border-slate-100">
          
          {/* Price Container */}
          {isWholesaleMode ? (
            <div className="bg-amber-50/80 border border-amber-200 p-2 rounded-xl mb-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase text-amber-800 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-600" /> Wholesale Price
                </span>
                <span className="text-[10px] bg-amber-600 text-white font-black px-1.5 py-0.2 rounded">
                  Min {product.minWholesaleQty} Pairs
                </span>
              </div>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-xl font-black text-amber-950">
                  ₹{product.wholesalePrice}
                </span>
                <span className="text-xs text-slate-400 line-through">
                  ₹{product.mrp}
                </span>
                <span className="text-[11px] font-bold text-emerald-700">
                  Save {wholesaleDiscountPercent}%
                </span>
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                Retail Price: ₹{product.retailPrice} / pair
              </div>
            </div>
          ) : (
            <div className="mb-2.5">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-slate-900">
                  ₹{product.retailPrice}
                </span>
                <span className="text-xs text-slate-400 line-through">
                  ₹{product.mrp}
                </span>
                <span className="text-xs font-bold text-red-600">
                  {discountPercent}% OFF
                </span>
              </div>
              <div className="text-[11px] text-blue-700 font-semibold flex items-center gap-1 mt-0.5">
                <Sparkles className="w-3 h-3" />
                Wholesale bulk available at ₹{product.wholesalePrice}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={handleQuickAdd}
              className={`py-2 px-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer ${
                addedAnimation
                  ? 'bg-emerald-600 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-900/20'
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Added!
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>{isWholesaleMode ? `Add (${product.minWholesaleQty})` : 'Add to Cart'}</span>
                </>
              )}
            </button>

            <button
              onClick={handleWhatsAppOrder}
              className="py-2 px-2.5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-1 shadow-md shadow-emerald-950/20 transition-all active:scale-95 cursor-pointer"
              title="Order this shoe directly on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>DM Order</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
