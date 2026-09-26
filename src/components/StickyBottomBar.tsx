import { ArrowDown } from 'lucide-react';
import { PRODUCT_CONFIG } from '../constants';
import { ProductColor } from '../types';

interface StickyBottomBarProps {
  selectedColor: ProductColor;
  onOrderClick: () => void;
  visible: boolean;
}

export function StickyBottomBar({ selectedColor, onOrderClick, visible }: StickyBottomBarProps) {
  if (!visible) return null;

  const currentImage = PRODUCT_CONFIG.images[selectedColor];

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2.5 shadow-2xl transition-all duration-300">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
        {/* Left / Start: Product Thumbnail & Price */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-11 h-11 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
            <img
              src={currentImage}
              alt="باك 3 فـ1"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="flex items-baseline gap-1.5 leading-none">
              <span className="text-xl font-black text-red-600">
                {PRODUCT_CONFIG.price} {PRODUCT_CONFIG.currency}
              </span>
              <span className="text-xs text-slate-400 line-through font-bold">
                {PRODUCT_CONFIG.oldPrice} {PRODUCT_CONFIG.currency}
              </span>
            </div>
            <span className="text-[11px] text-blue-700 font-bold block truncate">
              توصيل لجميع المدن المغربية
            </span>
          </div>
        </div>

        {/* Right / End: Direct CTA */}
        <button
          onClick={onOrderClick}
          className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-black text-sm sm:text-base px-5 py-2.5 rounded-xl shadow-md shadow-red-600/30 transition-all transform active:scale-95 cursor-pointer shrink-0 flex items-center gap-1.5"
        >
          <span>طلبو دابا</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </button>
      </div>
    </div>
  );
}
