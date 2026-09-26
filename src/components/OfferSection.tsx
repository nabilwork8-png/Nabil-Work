import { Truck, ShieldCheck, Clock, ArrowDown } from 'lucide-react';
import { PRODUCT_CONFIG } from '../constants';

interface OfferSectionProps {
  onOrderClick: () => void;
}

export function OfferSection({ onOrderClick }: OfferSectionProps) {
  return (
    <section className="py-8 px-4 bg-gradient-to-b from-blue-50/50 to-white">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-blue-600 shadow-xl text-center relative overflow-hidden">
          {/* Top highlight ribbon */}
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-red-100 text-red-700 text-sm font-black mb-4">
            <Clock className="w-4 h-4 text-red-600" />
            <span>ودابا، وقبل ما يسالي شتنبر 🍂</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">
            عرض خاص ومحدود
          </h2>
          <p className="text-slate-600 font-bold text-sm sm:text-base mb-6">
            باك 3 فـ1 متكامل بـ ثمن استثنائي
          </p>

          {/* Big Price Box */}
          <div className="bg-slate-50 rounded-2xl p-4 sm:p-6 mb-6 border border-slate-200">
            <div className="text-slate-400 line-through text-xl sm:text-2xl font-black mb-1">
              {PRODUCT_CONFIG.oldPrice} {PRODUCT_CONFIG.currency}
            </div>
            <div className="text-4xl sm:text-6xl font-black text-red-600 tracking-tight leading-none mb-2">
              {PRODUCT_CONFIG.price} {PRODUCT_CONFIG.currency}
            </div>
            <p className="text-sm font-black text-blue-700">
              الثمن غير 200 DH + التوصيل لجميع المدن المغربية.
            </p>
          </div>

          {/* Delivery & COD Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-blue-50 text-blue-900 border border-blue-100 font-bold text-sm">
              <Truck className="w-5 h-5 text-blue-600 shrink-0" />
              <span>التوصيل لجميع المدن المغربية</span>
            </div>

            <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-100 font-bold text-sm">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>الدفع عند الاستلام</span>
            </div>
          </div>

          {/* CTA Prompt */}
          <p className="text-lg font-black text-slate-800 mb-3">
            شنو كتسنى؟ طلبو دابا!
          </p>

          <button
            onClick={onOrderClick}
            className="w-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xl sm:text-2xl font-black py-4 px-6 rounded-2xl shadow-lg shadow-red-600/30 transition-all transform active:scale-98 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>طلبو دابا - الدفع عند الاستلام</span>
            <ArrowDown className="w-6 h-6 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
}
