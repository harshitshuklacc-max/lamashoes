import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Package, 
  MessageCircle, 
  Phone, 
  TrendingUp, 
  CheckCircle2, 
  Truck,
  ShieldCheck
} from 'lucide-react';
import { STORE_PHONE, STORE_PHONE_DISPLAY } from '../data/products';

interface WholesaleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WholesaleModal: React.FC<WholesaleModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [quantity, setQuantity] = useState(24); // default 1 carton
  const [selectedCategory, setSelectedCategory] = useState('Mixed Sports & Running');
  const [shopName, setShopName] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');

  // Bulk rate estimation logic
  const estimatedRatePerPair = quantity >= 48 ? 680 : quantity >= 24 ? 750 : quantity >= 12 ? 820 : 890;
  const totalInvestment = estimatedRatePerPair * quantity;
  const estimatedSellingPrice = 1499;
  const estimatedRevenue = estimatedSellingPrice * quantity;
  const estimatedProfit = estimatedRevenue - totalInvestment;

  const handleSendInquiry = () => {
    const text = 
`Hello Lama Sports! 📦
I am interested in WHOLESALE BULK PURCHASE for my shop/academy:

🏪 Shop / Organization: ${shopName || 'Footwear Retailer'}
📍 City / State: ${city || 'India'}
📞 Mobile: ${phone || 'Contact Number'}
👟 Shoe Category: ${selectedCategory}
🔢 Desired Quantity: ${quantity} pairs (${quantity >= 24 ? 'Master Carton' : 'Box Lot'})
💰 Estimated Bulk Rate: ~₹${estimatedRatePerPair}/pair
💵 Estimated Total Order: ₹${totalInvestment}

Please send wholesale catalog PDF, assorted sizes box breakdown, and payment bank/UPI details.`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/91${STORE_PHONE}?text=${encoded}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div 
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 text-slate-900 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-red-700 via-red-600 to-blue-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
              <Package className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-sport text-2xl font-bold tracking-wider">
                  DUKANDAR & WHOLESALE BULK
                </span>
                <span className="bg-amber-400 text-slate-950 text-[10px] font-black uppercase px-2 py-0.5 rounded">
                  Best Rates
                </span>
              </div>
              <p className="text-xs text-red-100">
                Lama Sports Narayanpur • Supplying to 500+ Shoe Stores across Chhattisgarh & India
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1 rounded-lg text-white/80 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 space-y-5">
          {/* Interactive Calculator */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span className="uppercase text-[11px] tracking-wider text-blue-900">
                Select Bulk Lot Quantity:
              </span>
              <span className="text-sm font-black text-red-600">{quantity} Pairs</span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {[6, 12, 24, 48].map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => setQuantity(q)}
                  className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    quantity === q
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-600/20'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-blue-400'
                  }`}
                >
                  <div>{q} Pairs</div>
                  <div className="text-[10px] opacity-80">
                    {q === 6 ? 'Trial Pack' : q === 12 ? 'Half Carton' : q === 24 ? '1 Carton' : '2 Cartons'}
                  </div>
                </button>
              ))}
            </div>

            {/* Profit margin forecast */}
            <div className="pt-3 border-t border-slate-200 grid grid-cols-3 gap-2 text-center">
              <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Wholesale Buy Rate</div>
                <div className="text-lg font-black text-slate-900">₹{estimatedRatePerPair}</div>
                <div className="text-[10px] text-slate-500">per pair approx</div>
              </div>

              <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Total Investment</div>
                <div className="text-lg font-black text-blue-700">₹{totalInvestment.toLocaleString()}</div>
                <div className="text-[10px] text-slate-500">{quantity} pairs lot</div>
              </div>

              <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                <div className="text-[10px] text-emerald-800 font-bold uppercase flex items-center justify-center gap-1">
                  <TrendingUp className="w-3 h-3" /> Dukandar Profit
                </div>
                <div className="text-lg font-black text-emerald-700">₹{estimatedProfit.toLocaleString()}</div>
                <div className="text-[10px] text-emerald-600 font-bold">~50% Net Margin</div>
              </div>
            </div>
          </div>

          {/* Form details */}
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Shop / Academy Name
                </label>
                <input
                  type="text"
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  placeholder="e.g. Royal Footwear / District Academy"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  City & State
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Raipur, Bilaspur, Bastar, Delhi..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  WhatsApp Contact Number
                </label>
                <input
                  type="tel"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="10-digit number"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Preferred Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="Mixed Sports & Running">Mixed Assorted (Best Seller Mix)</option>
                  <option value="Cricket Spikes & Turf">Cricket Tournament Spikes & Turf</option>
                  <option value="Football Studs FG">Football Molded Studs</option>
                  <option value="Sneakers & Casuals">Retro High & Street Sneakers</option>
                  <option value="Badminton Court Shoes">Badminton Non-Marking Gum Sole</option>
                  <option value="Dual Foam Sliders">HyperSlide Foam Sliders</option>
                </select>
              </div>
            </div>
          </div>

          {/* Wholesale terms */}
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-900 space-y-1">
            <div className="font-bold flex items-center gap-1 text-red-950">
              <CheckCircle2 className="w-3.5 h-3.5 text-red-600" />
              Wholesale Dispatch Terms:
            </div>
            <ul className="text-[11px] text-red-800 list-disc list-inside space-y-0.5">
              <li>Assorted sizes (UK 6, 7, 8, 9, 10) packed inside master cartons</li>
              <li>Strictly NO COD ⛔ - 100% Advance payment required for wholesale pricing</li>
              <li>Transport dispatch via V-Trans, Speed Post, or Bus Parcel across Chhattisgarh & India</li>
            </ul>
          </div>

          {/* CTA Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-2">
            <a
              href={`tel:${STORE_PHONE}`}
              className="py-3 px-4 rounded-xl bg-slate-900 text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-slate-800"
            >
              <Phone className="w-4 h-4 text-red-400" />
              <span>Call Owner: {STORE_PHONE_DISPLAY}</span>
            </a>

            <button
              onClick={handleSendInquiry}
              className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/20 transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>SEND WHOLESALE INQUIRY VIA WHATSAPP</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
