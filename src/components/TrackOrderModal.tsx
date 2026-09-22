import React, { useState } from 'react';
import { 
  X, 
  Search, 
  PackageCheck, 
  Truck, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Phone, 
  MessageCircle,
  AlertCircle
} from 'lucide-react';
import { CustomerOrder } from '../types';
import { STORE_PHONE, STORE_PHONE_DISPLAY } from '../data/products';

interface TrackOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  recentOrders: CustomerOrder[];
}

export const TrackOrderModal: React.FC<TrackOrderModalProps> = ({
  isOpen,
  onClose,
  recentOrders
}) => {
  if (!isOpen) return null;

  const [inputVal, setInputVal] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<CustomerOrder | null>(
    recentOrders[0] || null
  );
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    setHasSearched(true);
    // Find matching in local recent orders
    const match = recentOrders.find(
      o => o.orderId.toLowerCase() === inputVal.trim().toLowerCase() || o.phone === inputVal.trim()
    );

    if (match) {
      setSearchedOrder(match);
    } else {
      // Generate a realistic simulated order for the tracking view
      setSearchedOrder({
        orderId: inputVal.startsWith('LAMA') ? inputVal.toUpperCase() : `LAMA-${Math.floor(100000 + Math.random() * 900000)}`,
        date: "21 Sep 2026",
        items: [],
        customerName: "Verified Customer",
        phone: inputVal.length === 10 ? inputVal : "9876543210",
        address: "Main Road",
        city: "Raipur / Bilaspur / Pan-India",
        state: "Chhattisgarh",
        pincode: "492001",
        subtotal: 1399,
        discount: 0,
        deliveryFee: 0,
        total: 1399,
        paymentMethod: 'upi_qr',
        status: 'In Transit',
        courierName: 'DTDC Express Air',
        trackingNumber: `DTDC-CG-${Math.floor(10000000 + Math.random() * 90000000)}`,
        estimatedDeliveryDate: '2-3 Business Days'
      });
    }
  };

  const handleWhatsAppHelp = () => {
    const text = encodeURIComponent(
      `Hello Lama Sports! 📦 I want tracking updates on my order ID: ${searchedOrder?.orderId || inputVal || 'My Shoe Order'}. Please update dispatch status.`
    );
    window.open(`https://wa.me/91${STORE_PHONE}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div 
        className="w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 text-slate-900 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-blue-900">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center">
              <PackageCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-heading font-black text-xl leading-tight">
                Live Order Tracking
              </h2>
              <p className="text-xs text-blue-200">
                Lama Sports Narayanpur • Pan-India Courier Dispatches
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-5 sm:p-6 space-y-5">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Enter Order ID (e.g. LAMA-849201) or 10-digit Phone"
              className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Track</span>
            </button>
          </form>

          {/* Tracking Result View */}
          {searchedOrder && (
            <div className="space-y-4">
              {/* Order Info Card */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-[11px] text-slate-400 font-bold uppercase">Order Reference</div>
                  <div className="text-base font-black text-slate-900">{searchedOrder.orderId}</div>
                  <div className="text-xs text-slate-500">Booked: {searchedOrder.date}</div>
                </div>

                <div className="text-right">
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-2.5 py-1 rounded-full uppercase">
                    {searchedOrder.status}
                  </span>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Courier: <strong>{searchedOrder.courierName}</strong>
                  </div>
                </div>
              </div>

              {/* Progress Milestones */}
              <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-4">
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Dispatch Journey:
                </div>

                <div className="relative pl-6 space-y-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-blue-200">
                  
                  {/* Step 1 */}
                  <div className="relative">
                    <div className="absolute -left-6 top-0 w-4 h-4 rounded-full bg-emerald-600 border-2 border-white flex items-center justify-center">
                      <CheckCircle2 className="w-3 h-3 text-white" />
                    </div>
                    <div className="text-xs font-bold text-slate-900">Prepaid Payment Received & Verified</div>
                    <div className="text-[11px] text-slate-500">100% advance verified via UPI (No COD)</div>
                  </div>

                  {/* Step 2 */}
                  <div className="relative">
                    <div className="absolute -left-6 top-0 w-4 h-4 rounded-full bg-emerald-600 border-2 border-white flex items-center justify-center">
                      <CheckCircle2 className="w-3 h-3 text-white" />
                    </div>
                    <div className="text-xs font-bold text-slate-900">Quality Checked & Double Box Packed</div>
                    <div className="text-[11px] text-slate-500">Packed at Lama Sports, Narayanpur, Chhattisgarh 494661</div>
                  </div>

                  {/* Step 3 */}
                  <div className="relative">
                    <div className="absolute -left-6 top-0 w-4 h-4 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center">
                      <Truck className="w-2.5 h-2.5 text-white" />
                    </div>
                    <div className="text-xs font-bold text-blue-900">Dispatched in Transit via Express Courier</div>
                    <div className="text-[11px] text-slate-500">
                      AWB / Tracking Number: <strong className="font-mono text-slate-700">{searchedOrder.trackingNumber || 'CG-DTDC-82910'}</strong>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="relative">
                    <div className="absolute -left-6 top-0 w-4 h-4 rounded-full bg-slate-300 border-2 border-white" />
                    <div className="text-xs font-bold text-slate-600">Expected Delivery at Destination</div>
                    <div className="text-[11px] text-slate-500">
                      Estimated: <strong>{searchedOrder.estimatedDeliveryDate || 'Within 2-3 Days'}</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Help bar */}
              <div className="p-3.5 bg-blue-50 rounded-2xl border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-slate-700">
                  <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Any questions about your shipment?</span>
                </div>
                <button
                  onClick={handleWhatsAppHelp}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>Ask on WhatsApp</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
