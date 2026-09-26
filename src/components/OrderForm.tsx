import React, { useState } from 'react';
import {
  User,
  Phone,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Truck,
  ShieldCheck,
  Package,
  Plus,
  Minus,
  MessageCircle,
} from 'lucide-react';
import { PRODUCT_CONFIG, getStoreWhatsappNumber } from '../constants';
import { OrderData, ProductColor } from '../types';

interface OrderFormProps {
  selectedColor: ProductColor;
  onColorChange: (color: ProductColor) => void;
  onSubmitOrder: (order: OrderData) => void;
}

export function OrderForm({ selectedColor, onColorChange, onSubmitOrder }: OrderFormProps) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState(PRODUCT_CONFIG.moroccanCities[0]);
  const [customCity, setCustomCity] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const effectiveCity = city === 'مدينة أخرى' ? customCity : city;
  const unitPrice = PRODUCT_CONFIG.price;
  const totalPrice = unitPrice * quantity;
  const colorName = selectedColor === 'blue' ? 'أزرق' : 'رمادي';

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!fullName.trim()) {
      errs.fullName = 'عافاك دخل الاسم الكامل ديالك';
    }

    const cleanPhone = phone.replace(/[\s-]/g, '');
    if (!cleanPhone) {
      errs.phone = 'عافاك دخل رقم الهاتف ديالك';
    } else if (!/^(0[567]|\+212[567]|212[567])\d{8}$/.test(cleanPhone)) {
      errs.phone = 'رقم الهاتف غير صحيح (مثال: 0612345678)';
    }

    if (city === 'مدينة أخرى' && !customCity.trim()) {
      errs.city = 'عافاك كتب اسم المدينة ديالك';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    const orderPayload: OrderData = {
      id: `MOR-${Date.now().toString(36).toUpperCase()}`,
      fullName: fullName.trim(),
      phone: phone.trim(),
      city: effectiveCity.trim(),
      color: selectedColor,
      quantity,
      totalPrice,
      createdAt: new Date().toISOString(),
      paymentMethod: 'COD',
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitOrder(orderPayload);
    }, 400);
  };

  const handleWhatsAppOrder = () => {
    const whatsappNum = getStoreWhatsappNumber();
    const cleanPhone = whatsappNum.replace(/[^0-9]/g, '');
    const clientName = fullName.trim() ? fullName.trim() : 'زبون مهتم';
    const clientCity = effectiveCity.trim() ? effectiveCity.trim() : 'المغرب';
    const clientPhone = phone.trim() ? phone.trim() : 'نفس رقم الواتساب';

    const message = `السلام عليكم ورحمة الله، بغيت نطلب باك صاك 3 في 1:
- الاسم: ${clientName}
- الهاتف: ${clientPhone}
- المدينة: ${clientCity}
- اللون: ${colorName}
- الكمية: ${quantity}
- المجموع الإجمالي: ${totalPrice} درهم
التوصيل لجميع المدن والدفع عند الاستلام. المرجو تأكيد الطلب، شكراً!`;

    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="order-form" className="py-10 px-4 bg-slate-50 border-t border-slate-200 scroll-mt-12">
      <div className="max-w-xl mx-auto">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-blue-600/70 relative overflow-hidden">
          {/* Top highlight badge */}
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-blue-100 text-blue-900 text-xs sm:text-sm font-black shadow-xs">
              <Package className="w-4 h-4 text-blue-600" />
              <span>استمارة تأكيد الطلب - الدفع عند الاستلام</span>
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-center text-slate-900 mb-2">
            عمر معلوماتك للتوصل بالطلب 📦
          </h2>
          <p className="text-center text-slate-600 font-bold text-sm sm:text-base mb-6">
            دخل معلوماتك، غادي نتصلو بيك هاتفياً لتأكيد الإرسال ويوصلك الباك حتى لباب دارك!
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* 1. Color Selector */}
            <div>
              <label className="block text-sm font-black text-slate-900 mb-2">
                1. ختار اللون اللي عجبك:
              </label>
              <div className="grid grid-cols-2 gap-3">
                {PRODUCT_CONFIG.colors.map((c) => {
                  const isSelected = selectedColor === c.id;
                  return (
                    <button
                      type="button"
                      key={c.id}
                      onClick={() => onColorChange(c.id)}
                      className={`p-3 rounded-2xl border-2 transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/50 shadow-md ring-2 ring-blue-500/20'
                          : 'border-slate-200 bg-slate-50/50 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-5 h-5 rounded-full border border-white shadow-xs shrink-0"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span className="font-black text-sm text-slate-900">{c.name}</span>
                      </div>
                      {isSelected && (
                        <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Quantity Selector */}
            <div>
              <label className="block text-sm font-black text-slate-900 mb-2">
                2. الكمية:
              </label>
              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-sm font-bold text-slate-700">عدد الحقائب المطلوبة:</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-9 h-9 rounded-xl bg-white border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-slate-100 active:scale-95 transition-transform cursor-pointer font-black"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-xl font-black text-slate-900 min-w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 active:scale-95 transition-transform cursor-pointer font-black shadow-xs"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* 3. Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-black text-slate-900 mb-1.5">
                الاسم الكامل <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.fullName) setErrors({ ...errors, fullName: '' });
                  }}
                  placeholder="مثال: محمد العلوي"
                  className={`w-full py-3.5 pr-11 pl-4 rounded-xl border-2 text-slate-900 font-bold placeholder:text-slate-400 placeholder:font-normal outline-none transition-colors ${
                    errors.fullName
                      ? 'border-red-500 bg-red-50/30'
                      : 'border-slate-200 focus:border-blue-600 focus:bg-white'
                  }`}
                />
                <User className="w-5 h-5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              {errors.fullName && (
                <p className="mt-1 text-xs text-red-600 font-bold flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.fullName}</span>
                </p>
              )}
            </div>

            {/* 4. Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-sm font-black text-slate-900 mb-1.5">
                رقم الهاتف (الواتساب للتأكيد) <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <input
                  id="phone"
                  type="tel"
                  dir="ltr"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) setErrors({ ...errors, phone: '' });
                  }}
                  placeholder="0612345678"
                  className={`w-full py-3.5 pr-4 pl-11 rounded-xl border-2 text-slate-900 font-bold placeholder:text-slate-400 placeholder:font-normal outline-none transition-colors text-right ${
                    errors.phone
                      ? 'border-red-500 bg-red-50/30'
                      : 'border-slate-200 focus:border-blue-600 focus:bg-white'
                  }`}
                />
                <Phone className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              {errors.phone ? (
                <p className="mt-1 text-xs text-red-600 font-bold flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.phone}</span>
                </p>
              ) : (
                <p className="mt-1 text-[11px] text-slate-500 font-semibold">
                  سيتصل بك موظف التوصيل لتأكيد موعد التسليم
                </p>
              )}
            </div>

            {/* 5. City */}
            <div>
              <label htmlFor="city" className="block text-sm font-black text-slate-900 mb-1.5">
                المدينة <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <select
                  id="city"
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    if (errors.city) setErrors({ ...errors, city: '' });
                  }}
                  className="w-full py-3.5 pr-11 pl-4 rounded-xl border-2 border-slate-200 focus:border-blue-600 focus:bg-white text-slate-900 font-bold outline-none transition-colors bg-white appearance-none cursor-pointer"
                >
                  {PRODUCT_CONFIG.moroccanCities.map((cityName) => (
                    <option key={cityName} value={cityName}>
                      {cityName}
                    </option>
                  ))}
                </select>
                <MapPin className="w-5 h-5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Custom City input if 'مدينة أخرى' selected */}
              {city === 'مدينة أخرى' && (
                <div className="mt-2.5">
                  <input
                    type="text"
                    value={customCity}
                    onChange={(e) => {
                      setCustomCity(e.target.value);
                      if (errors.city) setErrors({ ...errors, city: '' });
                    }}
                    placeholder="اكتب اسم مدينتك هنا..."
                    className={`w-full py-3 px-4 rounded-xl border-2 text-slate-900 font-bold outline-none transition-colors ${
                      errors.city
                        ? 'border-red-500 bg-red-50/30'
                        : 'border-slate-200 focus:border-blue-600'
                    }`}
                  />
                  {errors.city && (
                    <p className="mt-1 text-xs text-red-600 font-bold flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.city}</span>
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Order Summary Recap */}
            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-2 text-sm">
              <div className="flex justify-between font-bold text-slate-700">
                <span>المنتج:</span>
                <span className="text-slate-900">باك 3 فـ1 ({colorName})</span>
              </div>
              <div className="flex justify-between font-bold text-slate-700">
                <span>ثمن الحبة:</span>
                <span>
                  <span className="line-through text-slate-400 text-xs ml-1">
                    {PRODUCT_CONFIG.oldPrice} DH
                  </span>
                  <span className="text-blue-700 font-black">
                    {unitPrice} {PRODUCT_CONFIG.currency}
                  </span>
                </span>
              </div>
              <div className="flex justify-between font-bold text-slate-700">
                <span>الكمية:</span>
                <span className="text-slate-900">{quantity}</span>
              </div>
              <div className="flex justify-between font-bold text-slate-700">
                <span>مصاريف التوصيل:</span>
                <span className="text-emerald-700 font-black">مجاناً (0 DH) لجميع المدن</span>
              </div>
              <div className="pt-2 border-t border-blue-200/60 flex justify-between items-center text-base sm:text-lg font-black text-slate-900">
                <span>المجموع الكلي:</span>
                <span className="text-red-600 text-2xl font-black">
                  {totalPrice} {PRODUCT_CONFIG.currency}
                </span>
              </div>
            </div>

            {/* Primary Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-600 hover:bg-red-700 active:bg-red-800 disabled:opacity-75 text-white text-xl sm:text-2xl font-black py-4 px-6 rounded-2xl shadow-lg shadow-red-600/30 transition-all transform active:scale-98 cursor-pointer flex items-center justify-center gap-2 animate-subtle-pulse"
            >
              {isSubmitting ? (
                <span>جاري تسجيل طلبك...</span>
              ) : (
                <span>أكد طلبك الآن - الدفع عند الاستلام</span>
              )}
            </button>

            {/* Quick WhatsApp order option */}
            <div className="pt-1">
              <button
                type="button"
                onClick={handleWhatsAppOrder}
                className="w-full bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1ca34e] text-white text-base sm:text-lg font-black py-3 px-4 rounded-xl shadow-md shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-current shrink-0" />
                <span>أو اطلب مباشرة عبر الواتساب 💬</span>
              </button>
            </div>
          </form>

          {/* Guarantees & Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-6 pt-5 border-t border-slate-200 text-xs font-bold text-slate-700">
            <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
              <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>توصيل مجاني وسريع</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
              <Package className="w-4 h-4 text-blue-600 shrink-0" />
              <span>عاين السلعة قبل الدفع</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>الدفع عند الاستلام</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
