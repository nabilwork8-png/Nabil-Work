import { useEffect } from 'react';
import { CheckCircle, Truck, PhoneCall, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import { PRODUCT_CONFIG } from '../constants';
import { OrderData } from '../types';
import { trackPurchase } from '../utils/analytics';

interface ConfirmationPageProps {
  order: OrderData;
  onBackToHome: () => void;
}

export function ConfirmationPage({ order, onBackToHome }: ConfirmationPageProps) {
  useEffect(() => {
    // Fire Meta Purchase event on successful confirmation page load
    trackPurchase({
      id: order.id,
      value: order.totalPrice,
      currency: 'MAD',
      quantity: order.quantity,
      color: order.color,
    });
  }, [order]);

  const selectedImage = PRODUCT_CONFIG.images[order.color];
  const colorName = order.color === 'blue' ? 'أزرق' : 'رمادي';

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-xl mx-auto">
        {/* Main Success Card */}
        <div className="bg-white rounded-3xl border-2 border-emerald-500 shadow-xl p-6 sm:p-8 text-center mb-6">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <CheckCircle className="w-12 h-12" />
          </div>

          {/* Required Copy 1 */}
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-2">
            شكراً على طلبك!
          </h1>

          {/* Required Copy 2 */}
          <p className="text-xl font-extrabold text-emerald-700 mb-2">
            توصلنا بالطلب ديالك بنجاح.
          </p>

          {/* Required Copy 3 */}
          <p className="text-base sm:text-lg font-bold text-slate-700 mb-6 bg-emerald-50 py-3 px-4 rounded-xl border border-emerald-200">
            غادي نتاصلو بيك باش نأكدو معاك التفاصيل.
          </p>

          {/* Order Reference Number */}
          <div className="inline-block bg-slate-100 rounded-xl px-4 py-2 text-xs font-bold text-slate-600 mb-6 border border-slate-200">
            رقم الطلب: <span className="font-mono text-slate-900 font-extrabold">{order.id}</span>
          </div>

          {/* Order Details Recap */}
          <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 text-right border border-slate-200 space-y-3 mb-6">
            <h2 className="font-black text-slate-900 text-base pb-2 border-b border-slate-200">
              تفاصيل طلبك:
            </h2>

            <div className="flex items-center gap-3 py-2">
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-white border border-slate-200 shrink-0">
                <img
                  src={selectedImage}
                  alt={`باك 3 فـ1 ${colorName}`}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="grow">
                <p className="font-black text-slate-900 text-sm">
                  باك 3 فـ1 (شكارة + صويك + بزطام كادو)
                </p>
                <p className="text-xs text-slate-600 font-bold">
                  اللون: <span className="text-blue-700">{colorName}</span> · الكمية: {order.quantity}
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 text-sm space-y-2">
              <div className="flex justify-between font-bold text-slate-700">
                <span>الاسم:</span>
                <span className="text-slate-900">{order.fullName}</span>
              </div>
              <div className="flex justify-between font-bold text-slate-700">
                <span>الهاتف:</span>
                <span className="text-slate-900 font-mono" dir="ltr">
                  {order.phone}
                </span>
              </div>
              <div className="flex justify-between font-bold text-slate-700">
                <span>المدينة:</span>
                <span className="text-slate-900">{order.city}</span>
              </div>
              <div className="flex justify-between font-bold text-slate-700">
                <span>طريقة الأداء:</span>
                <span className="text-emerald-700 font-extrabold">الدفع عند الاستلام (COD)</span>
              </div>
              <div className="flex justify-between font-black text-base pt-2 border-t border-slate-200 text-slate-900">
                <span>المبلغ الواجب أداؤه عند التسليم:</span>
                <span className="text-red-600 text-xl">
                  {order.totalPrice} {PRODUCT_CONFIG.currency}
                </span>
              </div>
            </div>
          </div>

          {/* Next Steps Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-right">
            <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-100 flex items-start gap-2.5">
              <PhoneCall className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <span className="block font-black text-xs text-slate-900">الاتصال الهاتفي</span>
                <span className="text-[11px] text-slate-600 font-medium">
                  خدمة الزبناء غتتاصل بيك هاتفياً لتأكيد العنوان وموعد التسليم.
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 flex items-start gap-2.5">
              <Truck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="block font-black text-xs text-slate-900">التوصيل السريع</span>
                <span className="text-[11px] text-slate-600 font-medium">
                  التوصيل لجميع المدن المغربية، وكتخلص حتى كتوصل بالباك.
                </span>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <button
            onClick={onBackToHome}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold py-3.5 px-6 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <ArrowRight className="w-4 h-4" />
            <span>الرجوع للصفحة الرئيسية</span>
          </button>
        </div>

        {/* Reassurance Footer */}
        <div className="text-center text-xs text-slate-500 font-bold flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>الدفع عند الاستلام · التوصيل لجميع المدن المغربية</span>
        </div>
      </div>
    </div>
  );
}
