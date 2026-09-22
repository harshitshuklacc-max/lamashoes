import React from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  MessageCircle, 
  Sparkles, 
  Truck, 
  Ban, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { CartItem } from '../types';
import { STORE_PHONE } from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (itemId: string, newQty: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
  onProceedToCheckout: () => void;
  onOpenNoCodNotice: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
  onOpenNoCodNotice
}) => {
  if (!isOpen) return null;

  // Calculate totals
  const totalPairs = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const isWholesaleQualified = totalPairs >= 6;

  let retailSubtotal = 0;
  let activeSubtotal = 0;

  cartItems.forEach(item => {
    retailSubtotal += item.product.retailPrice * item.quantity;
    const pricePerPair = isWholesaleQualified ? item.product.wholesalePrice : item.product.retailPrice;
    activeSubtotal += pricePerPair * item.quantity;
  });

  const wholesaleSavings = retailSubtotal - activeSubtotal;
  const isFreeDelivery = activeSubtotal >= 1999 || totalPairs >= 6;
  const deliveryFee = cartItems.length === 0 ? 0 : (isFreeDelivery ? 0 : 99);
  const grandTotal = activeSubtotal + deliveryFee;

  const handleWhatsAppCartOrder = () => {
    let itemsText = cartItems.map((item, idx) => {
      const price = isWholesaleQualified ? item.product.wholesalePrice : item.product.retailPrice;
      return `${idx + 1}. *${item.product.name}*\n   Size: UK ${item.selectedSize} | Color: ${item.selectedColor}\n   Qty: ${item.quantity} pair(s) @ ₹${price} = ₹${price * item.quantity}`;
    }).join('\n\n');

    const msg = 
`Hello Lama Sports Narayanpur! 👟 
I want to order from my cart:

${itemsText}

------------------------
📊 Total Pairs: ${totalPairs}
💰 Subtotal: ₹${activeSubtotal}
${wholesaleSavings > 0 ? `🔥 Wholesale Savings: -₹${wholesaleSavings}\n` : ''}🚚 Delivery: ${deliveryFee === 0 ? 'FREE' : '₹99'} (All India)
💵 *Grand Total Payable: ₹${grandTotal}*

⚠️ Note: I agree with the NO COD ⛔ (Prepaid dispatch via Speed Post / DTDC) policy.

Please send your UPI ID or QR code to proceed.`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/91${STORE_PHONE}?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white h-full flex flex-col justify-between shadow-2xl border-l border-slate-200 text-slate-900 animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-blue-900/60">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center font-bold">
              <ShoppingBag className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="font-heading font-black text-lg leading-tight">Your Shoes Cart</h2>
              <p className="text-[11px] text-blue-200">
                {totalPairs} {totalPairs === 1 ? 'Pair' : 'Pairs'} • Lama Sports Narayanpur
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cartItems.length > 0 && (
              <button
                onClick={onClearCart}
                className="text-[11px] text-slate-400 hover:text-red-400 cursor-pointer"
              >
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
              aria-label="Close Cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Wholesale Meter Banner */}
        <div className="p-3 bg-blue-900 text-white border-b border-blue-800">
          {isWholesaleQualified ? (
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>WHOLESALE BULK TIER UNLOCKED! (6+ Pairs)</span>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between text-xs font-bold mb-1">
                <span className="flex items-center gap-1 text-blue-200">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Unlock Wholesale Bulk Price:
                </span>
                <span className="text-amber-300 font-extrabold">{totalPairs}/6 Pairs</span>
              </div>
              <div className="w-full bg-blue-950 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-amber-400 to-red-500 h-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (totalPairs / 6) * 100)}%` }}
                />
              </div>
              <div className="text-[11px] text-blue-300 mt-1">
                Add {6 - totalPairs} more {6 - totalPairs === 1 ? 'pair' : 'pairs'} to get wholesale bulk rates on all items!
              </div>
            </div>
          )}
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-heading font-bold text-slate-800 text-lg">Your Cart is Empty</h3>
              <p className="text-xs text-slate-500 max-w-xs mt-1">
                Explore our 100% quality sports and casual shoes for cricket, football, running, and casual wear.
              </p>
              <button
                onClick={onClose}
                className="mt-4 bg-red-600 hover:bg-red-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md cursor-pointer"
              >
                Browse Shoe Collection
              </button>
            </div>
          ) : (
            cartItems.map((item) => {
              const activePrice = isWholesaleQualified ? item.product.wholesalePrice : item.product.retailPrice;
              return (
                <div 
                  key={item.id}
                  className="flex gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200/90 relative"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-18 h-18 rounded-xl object-cover bg-white border border-slate-200 shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="font-heading font-bold text-slate-900 text-xs sm:text-sm line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-slate-400 hover:text-red-600 p-1 cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                        <span className="bg-white px-1.5 py-0.5 rounded border border-slate-200 font-semibold text-slate-700">
                          UK {item.selectedSize}
                        </span>
                        <span className="truncate max-w-[120px]">{item.selectedColor.split('/')[0]}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-200">
                      <div>
                        <span className="font-black text-slate-900 text-sm">
                          ₹{activePrice * item.quantity}
                        </span>
                        <span className="text-[10px] text-slate-500 ml-1">
                          (₹{activePrice}/ea)
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 bg-white border border-slate-300 rounded-lg p-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 rounded flex items-center justify-center text-slate-700 hover:bg-slate-100 cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded flex items-center justify-center text-slate-700 hover:bg-slate-100 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Checkout & Payment Panel */}
        {cartItems.length > 0 && (
          <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-3">
            
            {/* NO COD Notice banner */}
            <div 
              onClick={onOpenNoCodNotice}
              className="p-2 bg-red-100/80 border border-red-300 rounded-xl flex items-center justify-between text-xs text-red-900 cursor-pointer hover:bg-red-200/80 transition-colors"
            >
              <div className="flex items-center gap-1.5 font-bold">
                <Ban className="w-4 h-4 text-red-600 shrink-0" />
                <span>STRICTLY NO COD • 100% PREPAID</span>
              </div>
              <span className="text-[11px] underline font-semibold">Why?</span>
            </div>

            {/* Bill Summary */}
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal ({totalPairs} Pairs):</span>
                <span className="font-bold text-slate-900">₹{activeSubtotal}</span>
              </div>

              {wholesaleSavings > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Wholesale Discount Unlocked:</span>
                  <span>-₹{wholesaleSavings}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>All India Courier:</span>
                <span>{deliveryFee === 0 ? <strong className="text-emerald-700">FREE</strong> : '₹99'}</span>
              </div>

              <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline text-sm">
                <span className="font-black text-slate-900">Total Payable:</span>
                <span className="font-black text-xl text-blue-900">₹{grandTotal}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              {/* WhatsApp direct order */}
              <button
                onClick={handleWhatsAppCartOrder}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/20 transition-all active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>DM ORDER VIA WHATSAPP ({STORE_PHONE})</span>
              </button>

              {/* Prepaid Online Checkout */}
              <button
                onClick={() => {
                  onProceedToCheckout();
                  onClose();
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-950/20 transition-all active:scale-95 cursor-pointer"
              >
                <span>PROCEED TO PREPAID CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="text-center text-[10px] text-slate-400">
              Safe & Protected • Direct Dispatch from Narayanpur, Chhattisgarh Hub
            </div>
          </div>
        )}
      </div>

      <div className="flex-1" onClick={onClose} />
    </div>
  );
};
