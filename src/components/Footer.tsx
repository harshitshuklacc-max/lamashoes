import React from 'react';
import { 
  Phone, 
  MapPin, 
  MessageCircle, 
  Truck, 
  Ban, 
  ShieldCheck, 
  Heart, 
  Mail, 
  Clock, 
  Sparkles,
  Ruler,
  PackageCheck
} from 'lucide-react';
import { STORE_PHONE, STORE_PHONE_DISPLAY, STORE_LOCATION } from '../data/products';

interface FooterProps {
  onOpenNoCodNotice: () => void;
  onOpenWholesaleModal: () => void;
  onOpenSizeGuide: () => void;
  onOpenTrackOrder: () => void;
  onSelectCategory: (cat: any) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenNoCodNotice,
  onOpenWholesaleModal,
  onOpenSizeGuide,
  onOpenTrackOrder,
  onSelectCategory
}) => {
  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      "Hello Lama Sports Narayanpur! 👋 I have a question regarding orders and shoe availability."
    );
    window.open(`https://wa.me/91${STORE_PHONE}?text=${text}`, '_blank');
  };

  return (
    <footer className="bg-slate-950 text-white border-t-4 border-red-600">
      
      {/* Top Value Banner in Blue and Red */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-red-950 border-b border-blue-900/60 py-8 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-red-600/90 text-white flex items-center justify-center font-black text-xl shrink-0 shadow-lg shadow-red-950/40">
              💯
            </div>
            <div>
              <h4 className="font-sport text-xl font-bold tracking-wide uppercase text-white">
                QUALITY IN BEST PRICE
              </h4>
              <p className="text-xs text-slate-400">
                100% Tested soles & premium comfort
              </p>
            </div>
          </div>

          <div 
            onClick={onOpenNoCodNotice}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-red-800 text-white flex items-center justify-center shrink-0 shadow-lg group-hover:scale-105 transition-transform">
              <Ban className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-sport text-xl font-bold tracking-wide uppercase text-red-300 group-hover:text-red-200">
                NO COD ⛔ PREPAID ONLY
              </h4>
              <p className="text-xs text-slate-400">
                Zero return waste = Lowest price for you
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-700 text-white flex items-center justify-center shrink-0 shadow-lg shadow-blue-950/40">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-sport text-xl font-bold tracking-wide uppercase text-blue-200">
                DELIVERY ALL OVER INDIA 🇮🇳
              </h4>
              <p className="text-xs text-slate-400">
                Speed Post & DTDC express tracking
              </p>
            </div>
          </div>

          <div 
            onClick={handleWhatsApp}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-lg group-hover:scale-105 transition-transform">
              <MessageCircle className="w-6 h-6 text-white fill-current" />
            </div>
            <div>
              <h4 className="font-sport text-xl font-bold tracking-wide uppercase text-emerald-300">
                DM US FOR ORDERS
              </h4>
              <p className="text-xs text-slate-400">
                1-Click WhatsApp assistance 24/7
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Location */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-blue-700 flex items-center justify-center font-bold text-white shadow-md">
                <span className="font-sport text-2xl">LS</span>
              </div>
              <div>
                <span className="font-sport text-3xl font-bold tracking-wider text-white">
                  LAMA<span className="text-red-500">SPORTS</span>
                </span>
                <span className="block text-[11px] text-blue-300 uppercase tracking-widest font-semibold">
                  Shoes Store 😍😍 • Wholesale & Retail
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Narayanpur's trusted hub for pro cricket spikes, football studs, nitrogen running shoes, casual hype sneakers, and badminton court shoes. Direct supply to retail buyers and wholesale shopkeepers all over India.
            </p>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>{STORE_LOCATION}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Direct Contact / Call: </span>
                <a href={`tel:${STORE_PHONE}`} className="text-amber-400 font-extrabold hover:underline">
                  {STORE_PHONE_DISPLAY}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Store Timings: 10:00 AM – 9:00 PM (Monday – Sunday)</span>
              </div>
            </div>
          </div>

          {/* Column 2: Categories */}
          <div className="space-y-3">
            <h5 className="font-sport text-lg font-bold text-white tracking-wider uppercase border-b border-blue-900/60 pb-1">
              Top Categories
            </h5>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <button onClick={() => onSelectCategory('running')} className="hover:text-red-400 transition-colors">
                  Running & Marathon
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('cricket')} className="hover:text-red-400 transition-colors">
                  Cricket Spikes & Turf
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('football')} className="hover:text-red-400 transition-colors">
                  Football Cleats & Studs
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('sneakers')} className="hover:text-red-400 transition-colors">
                  Retro High Sneakers
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('badminton')} className="hover:text-red-400 transition-colors">
                  Badminton Gum Sole
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('slides')} className="hover:text-red-400 transition-colors">
                  Dual-Foam Sliders
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Tools & Services */}
          <div className="space-y-3">
            <h5 className="font-sport text-lg font-bold text-white tracking-wider uppercase border-b border-blue-900/60 pb-1">
              Store Services
            </h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button 
                  onClick={onOpenWholesaleModal}
                  className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-bold"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Dukandar Bulk Booking</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenTrackOrder}
                  className="flex items-center gap-1.5 hover:text-white"
                >
                  <PackageCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Track Existing Parcel</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenSizeGuide}
                  className="flex items-center gap-1.5 hover:text-white"
                >
                  <Ruler className="w-3.5 h-3.5 text-blue-400" />
                  <span>India Size Chart Guide</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenNoCodNotice}
                  className="flex items-center gap-1.5 text-red-300 hover:text-red-200"
                >
                  <Ban className="w-3.5 h-3.5 text-red-400" />
                  <span>No COD Transparency</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: WhatsApp Quick Order */}
          <div className="space-y-3">
            <h5 className="font-sport text-lg font-bold text-white tracking-wider uppercase border-b border-blue-900/60 pb-1">
              Direct Contact
            </h5>
            <p className="text-xs text-slate-400">
              Need shoe photos, size confirmation, or wholesale rate list? DM us on WhatsApp anytime.
            </p>

            <button
              onClick={handleWhatsApp}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp: {STORE_PHONE}</span>
            </button>

            <a
              href={`tel:${STORE_PHONE}`}
              className="w-full py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4 text-red-400" />
              <span>Call Helpline</span>
            </a>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-slate-900 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 LAMA SPORTS (Narayanpur, Chhattisgarh). All Rights Reserved.</p>
          <div className="flex items-center gap-2 text-slate-400">
            <span>💯 Quality Graded 👟</span>
            <span>•</span>
            <span>NO COD ⛔</span>
            <span>•</span>
            <span>All India Delivery 🇮🇳</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
