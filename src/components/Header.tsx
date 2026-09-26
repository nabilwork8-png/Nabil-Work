import { ShoppingBag, Truck, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onOrderClick: () => void;
  onOpenPixelModal?: () => void;
}

export function Header({ onOrderClick, onOpenPixelModal }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
      {/* Top Banner */}
      <div className="bg-blue-600 text-white text-xs sm:text-sm font-semibold py-2 px-3 text-center flex items-center justify-center gap-2">
        <Truck className="w-4 h-4 shrink-0" />
        <span>التوصيل لجميع المدن المغربية · الدفع عند الاستلام</span>
      </div>

      {/* Main Navbar */}
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-xs">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-lg text-slate-900 leading-tight block">
              باك 3 فـ1
            </span>
            <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-blue-600 inline" />
              الدفع عند الاستلام
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onOpenPixelModal && (
            <button
              onClick={onOpenPixelModal}
              title="إعدادات التتبع Meta Pixel"
              className="text-xs text-slate-400 hover:text-slate-600 px-2 py-1 rounded-md border border-slate-200 transition-colors"
            >
              Meta Pixel
            </button>
          )}

          <button
            onClick={onOrderClick}
            className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-sm px-4 py-2 rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            طلبو دابا
          </button>
        </div>
      </div>
    </header>
  );
}
