import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Ban, 
  QrCode, 
  Copy, 
  Check, 
  MessageCircle, 
  Phone, 
  Truck, 
  AlertCircle,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { CartItem, CustomerOrder } from '../types';
import { STORE_PHONE, STORE_UPI_ID, PINCODE_DATABASE } from '../data/products';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onOrderSuccess: (order: CustomerOrder) => void;
  onOpenNoCodNotice: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onOrderSuccess,
  onOpenNoCodNotice
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<1 | 2>(1);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    pincode: '',
    city: 'Narayanpur',
    state: 'Chhattisgarh',
    transactionId: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  // Price calculations
  const totalPairs = cartItems.reduce((acc, i) => acc + i.quantity, 0);
  const isWholesale = totalPairs >= 6;
  const subtotal = cartItems.reduce((acc, item) => {
    const price = isWholesale ? item.product.wholesalePrice : item.product.retailPrice;
    return acc + (price * item.quantity);
  }, 0);
  const isFreeDelivery = subtotal >= 1999 || totalPairs >= 6;
  const deliveryFee = isFreeDelivery ? 0 : 99;
  const totalAmount = subtotal + deliveryFee;

  const handlePincodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 6);
    setFormData(prev => ({ ...prev, pincode: val }));
    
    if (val.length === 6) {
      const found = PINCODE_DATABASE[val];
      if (found) {
        setFormData(prev => ({
          ...prev,
          city: found.city,
          state: found.state
        }));
      }
    }
  };

  const validateStep1 = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Please enter your full name';
    if (!formData.phone.trim() || formData.phone.length < 10) errors.phone = 'Please enter valid 10-digit phone number';
    if (!formData.address.trim()) errors.address = 'Please enter complete delivery address';
    if (!formData.pincode.trim() || formData.pincode.length !== 6) errors.pincode = 'Please enter 6-digit Indian pincode';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(STORE_UPI_ID);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleCompleteOrder = () => {
    if (!formData.transactionId.trim()) {
      setFormErrors({ transactionId: 'Please enter UPI 12-digit Ref / UTR Number or Transaction ID' });
      return;
    }

    setSubmitting(true);
    const orderId = `LAMA-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: CustomerOrder = {
      orderId,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      items: cartItems,
      customerName: formData.name,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      subtotal,
      discount: isWholesale ? (totalPairs * 200) : 0,
      deliveryFee,
      total: totalAmount,
      paymentMethod: 'upi_qr',
      transactionId: formData.transactionId,
      status: 'Order Placed',
      courierName: 'DTDC Express / India Speed Post',
      estimatedDeliveryDate: '2-4 Working Days'
    };

    setTimeout(() => {
      setSubmitting(false);
      onOrderSuccess(newOrder);

      // Trigger formatted WhatsApp message to store owner
      const whatsappMsg = 
`✅ *NEW PAID ORDER #${orderId}*
------------------------------
👤 Customer: *${formData.name}*
📞 Phone: ${formData.phone}
📍 Address: ${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}

📦 *ITEMS ORDERED:*
${cartItems.map((item, i) => `• ${item.product.name} (UK ${item.selectedSize}, ${item.selectedColor}) x ${item.quantity}`).join('\n')}

💵 Total Paid: *₹${totalAmount}*
💳 Payment Method: UPI Prepaid (No COD)
🔢 *UPI UTR / Trans ID: ${formData.transactionId}*

Store: Lama Sports (Narayanpur, CG)
Please verify payment and dispatch parcel.`;

      const encoded = encodeURIComponent(whatsappMsg);
      window.open(`https://wa.me/91${STORE_PHONE}?text=${encoded}`, '_blank');
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div 
        className="w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 text-slate-900 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between border-b border-blue-900">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-sport text-2xl font-bold tracking-wider text-red-500">
                LAMA SPORTS
              </span>
              <span className="text-xs bg-red-600 px-2 py-0.5 rounded font-black uppercase">
                Prepaid Checkout
              </span>
            </div>
            <p className="text-xs text-blue-200 mt-0.5">
              Step {step} of 2: {step === 1 ? 'Shipping Address' : 'UPI Payment Verification'}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Prominent NO COD Reminder */}
        <div className="bg-red-50 border-b border-red-200 p-3 flex items-center justify-between text-xs text-red-900">
          <div className="flex items-center gap-2 font-bold">
            <Ban className="w-4 h-4 text-red-600 shrink-0" />
            <span>NO COD (Cash on Delivery) ⛔ • 100% PREPAID DISPATCH ONLY</span>
          </div>
          <button 
            onClick={onOpenNoCodNotice}
            className="underline text-red-700 hover:text-red-900 font-semibold cursor-pointer shrink-0 ml-2"
          >
            Why?
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6">
          {step === 1 ? (
            /* STEP 1: SHIPPING FORM */
            <form onSubmit={handleProceedToPayment} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  {formErrors.name && <p className="text-red-600 text-xs mt-1">{formErrors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    WhatsApp / Mobile Number *
                  </label>
                  <input
                    type="tel"
                    maxLength={10}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                    placeholder="10-digit number"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  {formErrors.phone && <p className="text-red-600 text-xs mt-1">{formErrors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Street Address & Landmark *
                </label>
                <textarea
                  rows={2}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="House / Flat No, Street, Ward, Landmark"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                {formErrors.address && <p className="text-red-600 text-xs mt-1">{formErrors.address}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={formData.pincode}
                    onChange={handlePincodeChange}
                    placeholder="6-digit PIN"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  {formErrors.pincode && <p className="text-red-600 text-xs mt-1">{formErrors.pincode}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    City / District *
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              {/* Order total preview */}
              <div className="p-3.5 bg-blue-50/80 rounded-2xl border border-blue-200 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-600">Total for {totalPairs} Pair(s):</span>
                  <div className="text-xl font-black text-slate-900">₹{totalAmount}</div>
                </div>
                <div className="text-right text-[11px] text-slate-500">
                  <span>Pan-India Courier: </span>
                  <strong className="text-emerald-700">{deliveryFee === 0 ? 'FREE' : '₹99'}</strong>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-950/20 transition-all cursor-pointer"
              >
                <span>Continue to UPI Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* STEP 2: UPI PAYMENT & UTR SUBMISSION */
            <div className="space-y-4">
              <div className="p-4 bg-slate-900 text-white rounded-2xl flex flex-col sm:flex-row items-center gap-4">
                
                {/* Simulated QR Code Canvas */}
                <div className="w-36 h-36 bg-white p-2 rounded-xl flex flex-col items-center justify-center shrink-0 border-2 border-red-500">
                  {/* Clean SVG QR code representation */}
                  <div className="w-full h-full bg-slate-950 flex flex-col items-center justify-center p-1 rounded">
                    <QrCode className="w-24 h-24 text-white" />
                    <span className="text-[8px] font-black text-amber-300 tracking-wider uppercase">
                      LAMA SPORTS UPI
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-center sm:text-left flex-1">
                  <div>
                    <div className="text-xs text-slate-400">Total Payable Amount:</div>
                    <div className="text-3xl font-sport font-black text-amber-300 tracking-wider">
                      ₹{totalAmount}
                    </div>
                  </div>

                  <div className="bg-slate-800 p-2 rounded-xl border border-slate-700 flex items-center justify-between text-xs">
                    <span className="font-mono text-slate-200 truncate">{STORE_UPI_ID}</span>
                    <button
                      type="button"
                      onClick={handleCopyUpi}
                      className="ml-2 text-amber-400 hover:text-amber-300 flex items-center gap-1 font-bold shrink-0 cursor-pointer"
                    >
                      {copiedUpi ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedUpi ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-300">
                    Pay via GPay, PhonePe, Paytm, or BHIM. Direct helpline: <strong>{STORE_PHONE}</strong>
                  </p>
                </div>
              </div>

              {/* Instructions */}
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 space-y-1">
                <div className="font-bold flex items-center gap-1 text-amber-950">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                  How to complete payment:
                </div>
                <ol className="list-decimal list-inside space-y-0.5 text-[11px] text-amber-800">
                  <li>Scan the QR code above or pay to UPI ID <strong>{STORE_UPI_ID}</strong></li>
                  <li>After paying, copy the 12-digit UTR / Ref / Transaction ID from your app</li>
                  <li>Paste below and click "Confirm & Send to WhatsApp"</li>
                </ol>
              </div>

              {/* Transaction ID input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  UPI 12-Digit Transaction / UTR Number *
                </label>
                <input
                  type="text"
                  value={formData.transactionId}
                  onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
                  placeholder="e.g. 428938192841"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                {formErrors.transactionId && (
                  <p className="text-red-600 text-xs mt-1">{formErrors.transactionId}</p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  disabled={submitting}
                  onClick={handleCompleteOrder}
                  className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/20 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>{submitting ? 'Confirming...' : 'CONFIRM & SEND ON WHATSAPP'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
