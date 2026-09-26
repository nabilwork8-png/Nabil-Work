import { CheckCircle2, Flame, MapPin } from 'lucide-react';
import { PRODUCT_CONFIG } from '../constants';
import { ProductColor } from '../types';

interface HeroSectionProps {
  selectedColor: ProductColor;
  onColorChange: (color: ProductColor) => void;
  onOrderClick: () => void;
}

export function HeroSection({ selectedColor, onColorChange, onOrderClick }: HeroSectionProps) {
  const currentImage = PRODUCT_CONFIG.images[selectedColor];

  return (
    <section className="pt-4 pb-8 px-4 max-w-4xl mx-auto">
      {/* Urgency Ribbon */}
      <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 text-red-700 text-sm font-bold border border-red-200">
        <Flame className="w-4 h-4 text-red-600 animate-pulse" />
        <span>ودابا، وقبل ما يسالي شتنبر 🍂</span>
      </div>

      {/* Main Copy Heading */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-snug tracking-tight mb-2">
        كتعاني كل نهار مع الكتب والحوايج ديالك؟ 🎒
      </h1>

      <p className="text-lg sm:text-xl font-bold text-blue-700 mb-6 leading-relaxed">
        جمعهم كاملين وبقى منظم بهاد الباك 3 فـ1!
      </p>

      {/* Hero Visual Card */}
      <div className="bg-slate-50 rounded-2xl p-3 sm:p-4 border border-slate-200/80 mb-6 shadow-sm">
        {/* Main Product Image Container */}
        <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-white shadow-inner flex items-center justify-center">
          <img
            src={currentImage}
            alt={`باك 3 فـ1 - اللون ${selectedColor === 'blue' ? 'أزرق' : 'رمادي'}`}
            className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
            loading="eager"
          />

          {/* Color Indicator Badge */}
          <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-bold px-2.5 py-1 rounded-lg border border-slate-200 shadow-xs flex items-center gap-1.5">
            <span
              className={`w-3 h-3 rounded-full ${
                selectedColor === 'blue' ? 'bg-blue-800' : 'bg-gray-600'
              }`}
            />
            <span>اللون: {selectedColor === 'blue' ? 'أزرق' : 'رمادي'}</span>
          </div>
        </div>

        {/* Color Selector Buttons */}
        <div className="mt-3 flex items-center justify-center gap-3">
          <span className="text-xs font-bold text-slate-600">اختر اللون:</span>
          {PRODUCT_CONFIG.colors.map((color) => {
            const isSelected = selectedColor === color.id;
            return (
              <button
                key={color.id}
                type="button"
                onClick={() => onColorChange(color.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50 text-blue-900 shadow-xs'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full border border-black/10 shrink-0 ${
                    color.id === 'blue' ? 'bg-blue-900' : 'bg-gray-600'
                  }`}
                />
                <span className="text-sm font-extrabold">{color.name}</span>
                {isSelected && <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Pricing & Free Shipping Box */}
      <div className="bg-white border-2 border-blue-600/30 rounded-2xl p-5 text-center shadow-xs mb-6">
        <div className="flex items-center justify-center gap-3 mb-2">
          <span className="text-slate-400 line-through text-lg sm:text-xl font-bold">
            {PRODUCT_CONFIG.oldPrice} {PRODUCT_CONFIG.currency}
          </span>
          <span className="text-4xl sm:text-5xl font-black text-red-600 tracking-tight">
            {PRODUCT_CONFIG.price} {PRODUCT_CONFIG.currency}
          </span>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-blue-700 font-bold text-sm sm:text-base mb-4">
          <MapPin className="w-4 h-4 shrink-0 text-blue-600" />
          <span>التوصيل لجميع المدن المغربية</span>
        </div>

        {/* Main Hero CTA Button */}
        <button
          onClick={onOrderClick}
          className="w-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xl sm:text-2xl font-black py-4 px-6 rounded-2xl shadow-lg shadow-red-600/30 transition-all transform active:scale-98 animate-subtle-pulse cursor-pointer flex items-center justify-center gap-2.5"
        >
          <span>طلبو دابا - الدفع عند الاستلام</span>
        </button>

        <p className="text-xs text-slate-500 font-semibold mt-2.5">
          الدفع عند الاستلام بعد معاينة طلبك
        </p>
      </div>
    </section>
  );
}
