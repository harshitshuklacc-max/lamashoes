import React, { useState } from 'react';
import { X, Compass, Sparkles, ArrowRight, RotateCcw, Check } from 'lucide-react';
import { ShoeProduct } from '../types';
import { SAMPLE_PRODUCTS } from '../data/products';

interface ShoeFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: ShoeProduct) => void;
}

export const ShoeFinderModal: React.FC<ShoeFinderModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [sport, setSport] = useState<string>('running');
  const [cushion, setCushion] = useState<string>('bounce');
  const [budget, setBudget] = useState<string>('mid');
  const [recommendation, setRecommendation] = useState<ShoeProduct | null>(null);

  const handleFinishQuiz = () => {
    // Determine best match
    let match = SAMPLE_PRODUCTS.find(p => p.category === sport) || SAMPLE_PRODUCTS[0];
    if (sport === 'running' && cushion === 'speed') {
      match = SAMPLE_PRODUCTS.find(p => p.id === 'bladerunner-carbon-speed') || match;
    } else if (sport === 'cricket' && cushion === 'spikes') {
      match = SAMPLE_PRODUCTS.find(p => p.id === 'hyperstrike-cricket-spikes') || match;
    } else if (sport === 'cricket') {
      match = SAMPLE_PRODUCTS.find(p => p.id === 'velocity-aero-cricket-turf') || match;
    } else if (sport === 'sneakers' && cushion === 'air') {
      match = SAMPLE_PRODUCTS.find(p => p.id === 'air-max-pulse-casual') || match;
    }

    setRecommendation(match);
    setStep(4);
  };

  const handleReset = () => {
    setStep(1);
    setRecommendation(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div 
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 text-slate-900 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-red-950 text-white p-5 flex items-center justify-between border-b border-blue-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-heading font-black text-xl leading-tight">
                Lama Shoe Finder Quiz
              </h2>
              <p className="text-xs text-blue-200">
                Find the perfect pair for your feet & budget
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6">
          {step === 1 && (
            <div className="space-y-4">
              <div className="text-xs font-bold text-red-600 uppercase tracking-wider">
                Step 1 of 3: Primary Activity
              </div>
              <h3 className="font-heading font-black text-lg text-slate-900">
                What will you primarily use these shoes for?
              </h3>

              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { id: 'running', label: 'Running & Army Trials', icon: '🏃' },
                  { id: 'cricket', label: 'Cricket (Spikes / Turf)', icon: '🏏' },
                  { id: 'football', label: 'Football Pitch Studs', icon: '⚽' },
                  { id: 'badminton', label: 'Badminton Gum Sole', icon: '🏸' },
                  { id: 'sneakers', label: 'Casual & College Style', icon: '👟' },
                  { id: 'training', label: 'Gym & Weightlifting', icon: '🏋️' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSport(item.id);
                      setStep(2);
                    }}
                    className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                      sport === item.id 
                        ? 'border-blue-600 bg-blue-50 text-blue-900 ring-2 ring-blue-600/20' 
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                    }`}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-xs font-bold text-slate-800">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="text-xs font-bold text-red-600 uppercase tracking-wider">
                Step 2 of 3: Sole & Cushion
              </div>
              <h3 className="font-heading font-black text-lg text-slate-900">
                What type of grip or cushioning do you prefer?
              </h3>

              <div className="space-y-2">
                {[
                  { id: 'bounce', label: 'Soft Nitrogen Max Bounce (Knee friendly)', sub: 'Best for daily running and road jogging' },
                  { id: 'speed', label: 'Carbon Propulsion Plate (Ultra Responsive)', sub: 'Best for fast 1600m timings and sprints' },
                  { id: 'spikes', label: 'Metal Studs / Spikes Grip', sub: 'Best for grass wickets & natural ground' },
                  { id: 'air', label: 'Visible Heel Air Suspension Cushion', sub: 'Best for lifestyle comfort and high fashion' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCushion(item.id);
                      setStep(3);
                    }}
                    className={`w-full p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      cushion === item.id
                        ? 'border-blue-600 bg-blue-50 text-blue-900 ring-2 ring-blue-600/20'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-900">{item.label}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{item.sub}</div>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setStep(1)}
                className="text-xs text-slate-500 hover:text-slate-800 font-bold"
              >
                &larr; Back to Step 1
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="text-xs font-bold text-red-600 uppercase tracking-wider">
                Step 3 of 3: Budget Range
              </div>
              <h3 className="font-heading font-black text-lg text-slate-900">
                What is your target budget for this pair?
              </h3>

              <div className="space-y-2">
                {[
                  { id: 'budget', label: 'Under ₹1,000 (Best Value & Slides)', sub: 'Daily wear, walkers, sliders' },
                  { id: 'mid', label: '₹1,000 - ₹1,500 (Most Popular)', sub: 'Tournament sports, turf cricket, running' },
                  { id: 'pro', label: '₹1,500 - ₹2,000 (Pro Athlete Grade)', sub: 'Carbon racing, metal spikes, high sneakers' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setBudget(item.id);
                      handleFinishQuiz();
                    }}
                    className={`w-full p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      budget === item.id
                        ? 'border-red-600 bg-red-50 text-red-900 ring-2 ring-red-600/20'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-900">{item.label}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{item.sub}</div>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setStep(2)}
                className="text-xs text-slate-500 hover:text-slate-800 font-bold"
              >
                &larr; Back to Step 2
              </button>
            </div>
          )}

          {step === 4 && recommendation && (
            <div className="space-y-4 text-center">
              <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full text-xs font-black uppercase">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                100% Match Found For You!
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left flex gap-3 items-center">
                <img
                  src={recommendation.image}
                  alt={recommendation.name}
                  className="w-20 h-20 rounded-xl object-cover bg-white border border-slate-200 shrink-0"
                />
                <div>
                  <span className="text-[10px] font-black uppercase text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                    {recommendation.category}
                  </span>
                  <h4 className="font-heading font-black text-slate-900 text-base leading-tight mt-1">
                    {recommendation.name}
                  </h4>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-lg font-black text-slate-900">₹{recommendation.retailPrice}</span>
                    <span className="text-xs text-slate-400 line-through">₹{recommendation.mrp}</span>
                    <span className="text-xs font-bold text-amber-700">Wholesale: ₹{recommendation.wholesalePrice}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-600 text-left bg-blue-50/70 p-3 rounded-xl border border-blue-100">
                {recommendation.description}
              </p>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleReset}
                  className="py-3 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake</span>
                </button>

                <button
                  onClick={() => {
                    onSelectProduct(recommendation);
                    onClose();
                  }}
                  className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-950/20 cursor-pointer"
                >
                  <span>View Details & Order</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
