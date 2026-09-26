import { Backpack, Gift, Package, Smartphone } from 'lucide-react';
import { PRODUCT_CONFIG } from '../constants';
import { ProductColor } from '../types';

interface ProductSectionProps {
  selectedColor: ProductColor;
  onColorChange: (color: ProductColor) => void;
}

export function ProductSection({ selectedColor, onColorChange }: ProductSectionProps) {
  const currentImage = PRODUCT_CONFIG.images[selectedColor];

  const items = [
    {
      number: '1',
      title: 'شكارة كبيرة للبيسي والكتب والمستلزمات',
      description: 'حجم مناسب ومريح للكتب، البيسي المحمول، وكافة المستلزمات اليومية.',
      icon: Backpack,
      badge: 'القطعة 1',
      badgeColor: 'bg-blue-100 text-blue-800',
    },
    {
      number: '2',
      title: 'صويك صغير للتليفون والحوايج',
      description: 'صويك خفيف وعملي كيتلبس كروازي للتليفون والأشياء الصغيرة.',
      icon: Smartphone,
      badge: 'القطعة 2',
      badgeColor: 'bg-blue-100 text-blue-800',
    },
    {
      number: '3',
      title: 'بزطام كادو 🎁',
      description: 'بزطام متناسق بالمجان مرفق كهدية مع الباك.',
      icon: Gift,
      badge: 'هدية مجانية 🎁',
      badgeColor: 'bg-amber-100 text-amber-900 border border-amber-300',
    },
  ];

  return (
    <section className="py-8 px-4 bg-slate-50 border-y border-slate-200">
      <div className="max-w-4xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 text-xs font-black text-blue-700 uppercase tracking-wider mb-1">
            <Package className="w-4 h-4" />
            <span>محتويات العرض</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug">
            شنو كاين فـ هاد الباك 3 فـ1؟
          </h2>
          <p className="text-sm font-bold text-slate-600 mt-1">
            شكارة للبيسي والكتب والمستلزمات + صويك صغير للتليفون والحوايج + بزطام كادو 🎁
          </p>
        </div>

        {/* Product Visual Showcase with Color Tabs */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-sm mb-6">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-4 pb-3 border-b border-slate-100">
            <span className="font-extrabold text-slate-800 text-sm sm:text-base">
              صورة الباك كامل (3 قطع متناسقة):
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-bold">اللون:</span>
              <div className="inline-flex rounded-lg bg-slate-100 p-1">
                {PRODUCT_CONFIG.colors.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => onColorChange(c.id)}
                    className={`px-3 py-1 text-xs font-black rounded-md transition-all cursor-pointer ${
                      selectedColor === c.id
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="relative aspect-square max-w-md mx-auto rounded-xl overflow-hidden bg-slate-50 flex items-center justify-center">
            <img
              src={currentImage}
              alt={`طقم باك 3 فـ1 لون ${selectedColor === 'blue' ? 'أزرق' : 'رمادي'}`}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* 3 Items Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.number}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-black px-2.5 py-1 rounded-lg ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-black text-slate-900 text-base sm:text-lg mb-1 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-blue-700 text-xs font-extrabold">
                  <span>ضمن العرض الرسمي</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
