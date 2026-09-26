import { ShieldCheck, Truck, Package } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 py-10 px-4 text-center border-t border-slate-800">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="flex items-center justify-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
            <Package className="w-4 h-4" />
          </div>
          <span className="font-black text-xl text-white">باك 3 فـ1</span>
        </div>

        <p className="text-sm font-bold text-slate-400 max-w-md mx-auto leading-relaxed">
          شكارة للبيسي والكتب والمستلزمات + صويك صغير للتليفون والحوايج + بزطام كادو 🎁
        </p>

        <div className="flex items-center justify-center gap-4 text-xs font-bold text-slate-400 flex-wrap">
          <span className="flex items-center gap-1">
            <Truck className="w-4 h-4 text-blue-400" />
            التوصيل لجميع المدن المغربية
          </span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            الدفع عند الاستلام
          </span>
        </div>

        <p className="text-xs text-slate-500 pt-4 border-t border-slate-800">
          جميع الحقوق محفوظة © {currentYear} · باك 3 فـ1
        </p>
      </div>
    </footer>
  );
}
