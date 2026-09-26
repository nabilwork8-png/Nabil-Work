import { Laptop, BookOpen, Layers, Smartphone, Gift, Check } from 'lucide-react';

export function BenefitSection() {
  const benefits = [
    {
      title: 'للبيسي',
      icon: Laptop,
      highlight: 'شكارة مخصصة تتسع لحاسوبك المحمول',
    },
    {
      title: 'للكتب',
      icon: BookOpen,
      highlight: 'مساحة مناسبة لدفاترك وكتبك اليومية',
    },
    {
      title: 'للمستلزمات',
      icon: Layers,
      highlight: 'تنظيم المستلزمات اليومية ديالك',
    },
    {
      title: 'للتليفون والحوايج الصغيرة',
      icon: Smartphone,
      highlight: 'صويك صغير عملي للتيليفون والأغراض السريعة',
    },
    {
      title: 'بزطام كادو 🎁',
      icon: Gift,
      highlight: 'هدية مجانية إضافية مرفقة مع الباك',
    },
  ];

  return (
    <section className="py-8 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug">
          جمعهم كاملين وبقى منظم بهاد الباك 3 فـ1
        </h2>
        <p className="text-sm font-bold text-slate-600 mt-1">
          كل حاجة فـ بلاصتها بكل سهولة
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {benefits.map((b, index) => {
          const Icon = b.icon;
          const isGift = b.title.includes('كادو');
          return (
            <div
              key={index}
              className={`p-4 rounded-2xl border transition-all ${
                isGift
                  ? 'bg-amber-50/80 border-amber-200 sm:col-span-2 lg:col-span-1'
                  : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    isGift ? 'bg-amber-500 text-white' : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <Check className={`w-4 h-4 ${isGift ? 'text-amber-600' : 'text-blue-600'}`} />
                    <h3 className="font-extrabold text-base sm:text-lg text-slate-900 leading-tight">
                      {b.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium">
                    {b.highlight}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
