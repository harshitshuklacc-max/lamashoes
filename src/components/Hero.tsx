import React from 'react';
import { 
  Phone, 
  MessageCircle, 
  ShieldCheck, 
  Truck, 
  Ban, 
  Sparkles, 
  Flame, 
  ChevronRight,
  Award,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { STORE_PHONE, STORE_PHONE_DISPLAY } from '../data/products';

interface HeroProps {
  isWholesaleMode: boolean;
  setIsWholesaleMode: (val: boolean) => void;
  onExploreClick: () => void;
  onOpenWholesaleModal: () => void;
  onOpenNoCodNotice: () => void;
  onOpenShoeFinder: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  isWholesaleMode,
  setIsWholesaleMode,
  onExploreClick,
  onOpenWholesaleModal,
  onOpenNoCodNotice,
  onOpenShoeFinder
}) => {
  const handleWhatsAppOrder = () => {
    const msg = encodeURIComponent(
      "Hello Lama Sports Narayanpur! 👋 I saw your shoe store online. Please send me your latest shoe catalog with wholesale & retail rate list."
    );
    window.open(`https://wa.me/91${STORE_PHONE}?text=${msg}`, '_blank');
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white border-b-4 border-red-600">
      {/* Background Graphic Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      
      {/* Diagonal energetic athletic cut */}
      <div className="absolute -right-24 -bottom-24 w-96 h-96 bg-red-600/10 rotate-12 transform pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 pt-8 pb-12 sm:pt-12 sm:pb-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-5 text-left">
            
            {/* Top Store Badge */}
            <div className="inline-flex flex-wrap items-center gap-2 bg-gradient-to-r from-red-600/30 to-blue-600/30 border border-red-500/40 px-3.5 py-1.5 rounded-full shadow-inner">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-xs font-bold text-red-200 tracking-wide uppercase">
                Narayanpur, Chhattisgarh Direct Store
              </span>
              <span className="text-xs text-amber-300 font-extrabold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> WHOLESALE & RETAIL
              </span>
            </div>

            {/* Main Title with Teko display & Blue/Red high contrast */}
            <div>
              <h1 className="font-sport text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-wide uppercase leading-none drop-shadow-md">
                LAMA <span className="text-red-500">SPORTS</span>
              </h1>
              <p className="font-sport text-3xl sm:text-4xl text-blue-300 font-bold uppercase tracking-wider mt-1">
                SHOES STORE 😍😍
              </p>
            </div>

            {/* Core User Prompts as Bold Punchy Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <div className="flex items-center gap-2.5 bg-blue-900/40 border border-blue-700/50 p-2.5 rounded-xl backdrop-blur-sm">
                <div className="w-8 h-8 rounded-lg bg-red-600/90 text-white flex items-center justify-center shrink-0 font-black shadow">
                  💯
                </div>
                <div>
                  <div className="text-xs font-extrabold text-white uppercase tracking-wider">
                    QUALITY 👟 👟 IN BEST PRICE
                  </div>
                  <div className="text-[11px] text-blue-200">
                    Premium graded soles & long-lasting grip
                  </div>
                </div>
              </div>

              <div 
                onClick={onOpenNoCodNotice}
                className="flex items-center gap-2.5 bg-red-950/40 border border-red-700/50 p-2.5 rounded-xl backdrop-blur-sm cursor-pointer hover:bg-red-900/50 transition-colors"
                title="Click to learn why we have No COD"
              >
                <div className="w-8 h-8 rounded-lg bg-red-700 text-white flex items-center justify-center shrink-0 font-bold shadow">
                  <Ban className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-red-200 uppercase tracking-wider flex items-center gap-1">
                    NO COD ⛔ PREPAID ONLY
                  </div>
                  <div className="text-[11px] text-red-300 underline">
                    Zero return loss = lowest prices for you
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-slate-800/60 border border-slate-700 p-2.5 rounded-xl backdrop-blur-sm">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 font-bold shadow">
                  <Truck className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-white uppercase tracking-wider">
                    DELIVERY ALL OVER INDIA 🇮🇳
                  </div>
                  <div className="text-[11px] text-slate-300">
                    Speed Post & DTDC Express with live tracking
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-amber-950/40 border border-amber-600/40 p-2.5 rounded-xl backdrop-blur-sm">
                <div className="w-8 h-8 rounded-lg bg-amber-600 text-slate-950 flex items-center justify-center shrink-0 font-black shadow">
                  📦
                </div>
                <div>
                  <div className="text-xs font-extrabold text-amber-200 uppercase tracking-wider">
                    DUKANDAR & ACADEMY BULK
                  </div>
                  <div className="text-[11px] text-amber-300">
                    Huge margins on 6+, 12+ or carton orders
                  </div>
                </div>
              </div>
            </div>

            {/* Shopping Mode Selector Cards */}
            <div className="pt-2">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-red-400" /> Select How You Want To Shop:
              </div>
              <div className="grid grid-cols-2 gap-3 max-w-md">
                <button
                  id="hero-select-retail-tab"
                  onClick={() => setIsWholesaleMode(false)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    !isWholesaleMode
                      ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-900/50 scale-[1.02]'
                      : 'bg-slate-900/80 border-slate-700 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <div className="text-xs font-extrabold uppercase">Retail Buyer</div>
                  <div className="text-[11px] opacity-90">Single pair purchase (1-5 pairs)</div>
                </button>

                <button
                  id="hero-select-wholesale-tab"
                  onClick={() => setIsWholesaleMode(true)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    isWholesaleMode
                      ? 'bg-red-600 border-red-400 text-white shadow-lg shadow-red-900/50 scale-[1.02]'
                      : 'bg-slate-900/80 border-slate-700 text-amber-300 hover:border-slate-600'
                  }`}
                >
                  <div className="text-xs font-extrabold uppercase flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-300" /> Wholesale / Bulk
                  </div>
                  <div className="text-[11px] opacity-90">Shopkeepers & 6+ pairs bulk rate</div>
                </button>
              </div>
            </div>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                id="hero-whatsapp-order-btn"
                onClick={handleWhatsAppOrder}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm px-6 py-3 rounded-xl shadow-xl shadow-emerald-950/50 flex items-center gap-2 transform active:scale-95 transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>DM US FOR ORDERS</span>
              </button>

              <button
                id="hero-explore-shoes-btn"
                onClick={onExploreClick}
                className="bg-red-600 hover:bg-red-500 text-white font-extrabold text-sm px-6 py-3 rounded-xl shadow-lg shadow-red-950/40 flex items-center gap-2 transform active:scale-95 transition-all cursor-pointer"
              >
                <span>EXPLORE SHOES</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <a
                id="hero-call-store-btn"
                href={`tel:${STORE_PHONE}`}
                className="bg-slate-800/90 hover:bg-slate-700 text-blue-200 border border-blue-700/50 font-bold text-sm px-4 py-3 rounded-xl flex items-center gap-2 transition-all"
              >
                <Phone className="w-4 h-4 text-red-400" />
                <span>Call {STORE_PHONE}</span>
              </a>
            </div>

            {/* Helpline details */}
            <div className="text-xs text-slate-300 flex items-center gap-2 pt-1 font-medium">
              <span className="text-amber-400 font-bold">MORE DETAILS:</span>
              <a href={`tel:${STORE_PHONE}`} className="underline hover:text-white font-bold text-white">
                {STORE_PHONE}
              </a>
              <span className="text-slate-500">•</span>
              <span>Mon-Sun (10:00 AM - 9:00 PM)</span>
            </div>
          </div>

          {/* Right Column: Visual Product Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md bg-gradient-to-b from-blue-900/60 to-slate-900/90 rounded-2xl p-5 border-2 border-red-500/50 shadow-2xl backdrop-blur-md">
              
              {/* Corner Badge */}
              <div className="absolute -top-3.5 -right-3.5 bg-red-600 text-white font-sport text-xl tracking-wider px-3.5 py-0.5 rounded-full uppercase shadow-lg border-2 border-white/20">
                HOT DROP ⚡
              </div>

              {/* Showcase Image */}
              <div className="relative rounded-xl overflow-hidden bg-slate-950/60 aspect-4/3 flex items-center justify-center group">
                <img
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80"
                  alt="Lama Sports Red & Blue Running Shoe"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Floating Tags */}
                <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-[11px] text-white font-bold">
                  🔥 Lama Air Phantom Zoom
                </div>
                <div className="absolute top-3 left-3 bg-red-600/90 text-white px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider">
                  60% OFF
                </div>
              </div>

              {/* Price comparison inside showcase */}
              <div className="mt-4 p-3.5 bg-slate-950/70 rounded-xl border border-blue-900/50 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-slate-400 uppercase font-semibold">Retail Single Pair</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-white">₹1,399</span>
                    <span className="text-xs text-slate-400 line-through">₹3,499</span>
                  </div>
                </div>

                <div className="text-right pl-3 border-l border-slate-800">
                  <div className="text-[11px] text-amber-400 font-extrabold uppercase flex items-center justify-end gap-1">
                    <Sparkles className="w-3 h-3" /> Wholesale (6+)
                  </div>
                  <div className="text-2xl font-black text-amber-400">
                    ₹799 <span className="text-[10px] text-slate-300 font-normal">/pair</span>
                  </div>
                </div>
              </div>

              {/* Trust checklist */}
              <div className="mt-3.5 grid grid-cols-2 gap-2 text-xs text-slate-300">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>100% Quality Graded</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Pan-India Courier</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-red-400 shrink-0" />
                  <span>Strictly No COD ⛔</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>Direct 7828672746</span>
                </div>
              </div>

              {/* Fast Quiz launcher banner */}
              <div 
                onClick={onOpenShoeFinder}
                className="mt-3 p-2 bg-gradient-to-r from-blue-950 to-indigo-950 rounded-xl border border-blue-700/40 flex items-center justify-between text-xs cursor-pointer hover:border-blue-400 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">🎯</span>
                  <span className="text-blue-200 font-semibold">Not sure which shoe fits your sport?</span>
                </div>
                <span className="text-amber-300 font-bold hover:underline">Take Quiz &rarr;</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Metric Counter Bar */}
        <div className="mt-10 pt-6 border-t border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-blue-950">
            <div className="font-sport text-3xl font-extrabold text-white">15,000+</div>
            <div className="text-xs text-slate-400 font-medium">Pairs Shipped across India</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-blue-950">
            <div className="font-sport text-3xl font-extrabold text-red-400">500+</div>
            <div className="text-xs text-slate-400 font-medium">Wholesale Dukandars & Academies</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-blue-950">
            <div className="font-sport text-3xl font-extrabold text-amber-400">100%</div>
            <div className="text-xs text-slate-400 font-medium">Quality Inspected before dispatch</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-blue-950">
            <div className="font-sport text-3xl font-extrabold text-blue-400">28 STATES</div>
            <div className="text-xs text-slate-400 font-medium">Speed Post & DTDC Coverage</div>
          </div>
        </div>

      </div>
    </div>
  );
};
