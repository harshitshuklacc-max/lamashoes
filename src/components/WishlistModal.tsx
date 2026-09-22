import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { ShoeProduct } from '../types';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: ShoeProduct[];
  onRemoveFromWishlist: (productId: string) => void;
  onSelectProduct: (product: ShoeProduct) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onSelectProduct
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div 
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 text-slate-900 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-blue-900">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center">
              <Heart className="w-5 h-5 text-white fill-current" />
            </div>
            <div>
              <h2 className="font-heading font-black text-xl leading-tight">
                Saved Favorites ({wishlist.length})
              </h2>
              <p className="text-xs text-blue-200">
                Your shortlisted sports & casual shoes
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 max-h-[60vh] overflow-y-auto space-y-3">
          {wishlist.length === 0 ? (
            <div className="text-center py-8 text-slate-400 space-y-2">
              <Heart className="w-12 h-12 mx-auto text-slate-300" />
              <p className="text-sm font-bold text-slate-700">No shoes saved yet</p>
              <p className="text-xs text-slate-400">Click the heart icon on any shoe to save it for later.</p>
            </div>
          ) : (
            wishlist.map((prod) => (
              <div 
                key={prod.id}
                className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between gap-3"
              >
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-16 h-16 rounded-xl object-cover bg-white border border-slate-200 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-heading font-bold text-slate-900 text-sm truncate">
                    {prod.name}
                  </h4>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-base font-black text-slate-900">₹{prod.retailPrice}</span>
                    <span className="text-xs text-slate-400 line-through">₹{prod.mrp}</span>
                  </div>
                  <span className="text-[10px] text-amber-700 font-bold block">
                    Wholesale: ₹{prod.wholesalePrice} / pair
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => {
                      onSelectProduct(prod);
                      onClose();
                    }}
                    className="p-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold"
                    title="View Product"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onRemoveFromWishlist(prod.id)}
                    className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
