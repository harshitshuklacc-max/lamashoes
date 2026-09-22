import React from 'react';
import { X, Ruler, CheckCircle2 } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const sizeChart = [
    { uk: 6, us: 7, eu: 40, cm: 24.5, recommendation: 'Snug Fit' },
    { uk: 7, us: 8, eu: 41, cm: 25.4, recommendation: 'Standard' },
    { uk: 8, us: 9, eu: 42, cm: 26.2, recommendation: 'Most Popular' },
    { uk: 9, us: 10, eu: 43, cm: 27.1, recommendation: 'Standard' },
    { uk: 10, us: 11, eu: 44, cm: 28.0, recommendation: 'Spacious' },
    { uk: 11, us: 12, eu: 45, cm: 28.8, recommendation: 'Wide Foot' }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div 
        className="w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 text-slate-900 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-blue-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
              <Ruler className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-heading font-black text-xl leading-tight">
                India Shoe Size Chart
              </h2>
              <p className="text-xs text-blue-200">
                UK / India Standard Footwear Sizing Reference
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-4">
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900">
            <strong>Important Tip for Indian Buyers:</strong> Indian shoe sizing follows <strong>UK standards</strong>. If your regular Bata, Sparx, or Nike sports shoe is UK 8, select UK 8 here.
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px]">
                <tr>
                  <th className="py-2.5 px-3">UK / India</th>
                  <th className="py-2.5 px-3">Euro</th>
                  <th className="py-2.5 px-3">US</th>
                  <th className="py-2.5 px-3">Foot Length (CM)</th>
                  <th className="py-2.5 px-3">Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sizeChart.map((row) => (
                  <tr key={row.uk} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-3 font-extrabold text-blue-700">
                      UK {row.uk}
                    </td>
                    <td className="py-2.5 px-3 text-slate-700">EU {row.eu}</td>
                    <td className="py-2.5 px-3 text-slate-700">US {row.us}</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-900">{row.cm} cm</td>
                    <td className="py-2.5 px-3">
                      <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] font-semibold">
                        {row.recommendation}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* How to measure */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-2">
            <h4 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider">
              How to measure your foot at home:
            </h4>
            <ol className="list-decimal list-inside space-y-1 text-slate-600 text-[11px]">
              <li>Place a sheet of blank paper on a flat floor against a wall.</li>
              <li>Stand on the paper with your heel firmly touching the wall.</li>
              <li>Mark the tip of your longest toe with a pencil.</li>
              <li>Measure the distance from wall to the mark with a ruler in CM.</li>
              <li>Match with the CM column above to find your exact UK size!</li>
            </ol>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm cursor-pointer"
          >
            Got It! Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
