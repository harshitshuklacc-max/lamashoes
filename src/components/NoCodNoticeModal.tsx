import React from 'react';
import { 
  X, 
  Ban, 
  ShieldCheck, 
  TrendingDown, 
  Truck, 
  MessageCircle, 
  Phone, 
  CheckCircle2 
} from 'lucide-react';
import { STORE_PHONE, STORE_PHONE_DISPLAY } from '../data/products';

interface NoCodNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NoCodNoticeModal: React.FC<NoCodNoticeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div 
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 text-slate-900 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-red-700 to-red-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center border border-white/20">
              <Ban className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-heading font-black text-xl leading-tight">
                Why Lama Sports Has NO COD ⛔
              </h2>
              <p className="text-xs text-red-200">
                100% Genuine Wholesale & Retail Store Policy
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1 rounded-lg text-white/80 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-4 text-xs sm:text-sm text-slate-700">
          <div className="bg-red-50 border border-red-200 p-3.5 rounded-2xl text-red-900 font-semibold leading-relaxed">
            Dear Customers & Retailers, we operate directly on <strong>pure wholesale and lowest margin pricing</strong> from Narayanpur, Chhattisgarh. Here is why we strictly do NOT provide Cash On Delivery (COD):
          </div>

          <div className="space-y-3">
            <div className="flex gap-3 items-start">
              <div className="w-7 h-7 rounded-lg bg-red-100 text-red-700 flex items-center justify-center shrink-0 font-bold mt-0.5">
                1
              </div>
              <div>
                <strong className="text-slate-900 block font-bold">Passing 25-30% Savings Directly to You</strong>
                <p className="text-xs text-slate-500 mt-0.5">
                  Courier companies charge ₹150 - ₹250 extra per COD parcel plus 30% RTO (Return to Origin) failure losses. By operating 100% prepaid, we give you the genuine shoe at ₹1,399 instead of ₹2,499!
                </p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 font-bold mt-0.5">
                2
              </div>
              <div>
                <strong className="text-slate-900 block font-bold">Genuine Shoes Inspected Before Dispatch</strong>
                <p className="text-xs text-slate-500 mt-0.5">
                  Every shoe pair is personally checked for stitching, sole grip, and size accuracy in our Narayanpur store before boxing. Video / photo confirmation can be requested on WhatsApp!
                </p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold mt-0.5">
                3
              </div>
              <div>
                <strong className="text-slate-900 block font-bold">Express Delivery All Over India 🇮🇳</strong>
                <p className="text-xs text-slate-500 mt-0.5">
                  Prepaid parcels receive priority boarding with India Speed Post, DTDC Air, and Delhivery Express with instant AWB live tracking.
                </p>
              </div>
            </div>
          </div>

          {/* Physical Verification */}
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs space-y-1.5">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Verified Physical Storefront:
            </div>
            <p className="text-slate-600 text-[11px]">
              Lama Sports, Main Market, Narayanpur, District Narayanpur, Chhattisgarh 494661. Open all 7 days. Call or WhatsApp owner directly at <strong>{STORE_PHONE_DISPLAY}</strong>.
            </p>
          </div>

          {/* Button */}
          <div className="pt-2 flex gap-2">
            <a
              href={`tel:${STORE_PHONE}`}
              className="py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-red-400" />
              <span>Call Us</span>
            </a>
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>I Understand & Agree (Continue Shopping)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
