import { useState, useEffect } from 'react';
import { getStoreWhatsappNumber, PRODUCT_CONFIG } from '../constants';

interface StickyWhatsAppButtonProps {
  hasStickyBar?: boolean;
}

export function StickyWhatsAppButton({ hasStickyBar = false }: StickyWhatsAppButtonProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show a welcoming tooltip prompt after 3 seconds to catch visitor attention
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleWhatsAppClick = () => {
    const whatsappNum = getStoreWhatsappNumber();
    const cleanPhone = whatsappNum.replace(/[^0-9]/g, '');
    const message = `السلام عليكم ورحمة الله، بغيت نستفسر / نطلب باك صاك 3 في 1 (عـرض ${PRODUCT_CONFIG.price} درهم). المرجو التواصل معي.`;
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className={`fixed left-4 z-40 transition-all duration-300 flex items-center gap-2.5 ${
        hasStickyBar ? 'bottom-20 sm:bottom-6' : 'bottom-6'
      }`}
    >
      {/* Tooltip / Prompt bubble */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-1.5 bg-white text-slate-800 text-xs font-black py-1.5 px-3 rounded-full shadow-lg border border-slate-200 animate-fade-in relative select-none">
          <span>محتاج مساعدة؟ تواصل معنا فالواتساب!</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-slate-400 hover:text-slate-600 text-xs ml-1 cursor-pointer"
            aria-label="إغلاق"
          >
            ×
          </button>
          <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-l border-b border-slate-200 transform rotate-45 pointer-events-none" />
        </div>
      )}

      {/* Floating Sticky Button */}
      <button
        onClick={handleWhatsAppClick}
        aria-label="تواصل عبر الواتساب"
        className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1da850] text-white shadow-xl shadow-emerald-500/40 transition-all duration-300 transform hover:scale-110 active:scale-95 cursor-pointer ring-4 ring-white/80"
      >
        {/* Subtle Pulse Waves */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping pointer-events-none" />

        {/* WhatsApp Icon */}
        <svg
          className="w-7 h-7 sm:w-8 sm:h-8 fill-current relative z-10 transition-transform group-hover:rotate-6"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.301-.15-1.782-.879-2.058-.979-.276-.1-.477-.15-.678.15s-.778.979-.954 1.18c-.176.2-.352.225-.653.075s-1.272-.469-2.424-1.496c-.896-.799-1.501-1.787-1.677-2.088s-.019-.464.132-.614c.135-.135.301-.351.452-.527.15-.176.2-.301.301-.502.1-.2.05-.376-.025-.527s-.678-1.631-.929-2.234c-.244-.587-.492-.507-.678-.517-.176-.009-.376-.01-.577-.01s-.527.075-.803.376c-.276.301-1.054 1.029-1.054 2.509s1.079 2.909 1.23 3.11c.15.2 2.123 3.243 5.143 4.548.718.311 1.278.497 1.714.636.721.229 1.377.197 1.896.119.578-.087 1.782-.728 2.033-1.431.251-.703.251-1.305.176-1.431-.076-.126-.276-.201-.577-.351zM12.042 21.905c-1.788 0-3.535-.48-5.064-1.391l-.363-.216-3.765.987 1.005-3.67-.237-.377a9.88 9.88 0 0 1-1.517-5.263c0-5.467 4.453-9.92 9.932-9.92 2.651 0 5.142 1.033 7.014 2.906a9.856 9.856 0 0 1 2.914 7.014c0 5.469-4.453 9.922-9.934 9.922zm8.441-18.358A11.83 11.83 0 0 0 12.042 0C5.402 0 .002 5.4 0 12.04c0 2.119.553 4.185 1.603 6.007L0 24l6.126-1.607a11.99 11.99 0 0 0 5.916 1.543h.005c6.638 0 12.038-5.4 12.043-12.042 0-3.217-1.253-6.241-3.527-8.517z" />
        </svg>

        {/* Online Indicator Badge */}
        <span className="absolute top-0 right-0 w-4 h-4 bg-emerald-300 border-2 border-white rounded-full z-20 shadow-xs animate-pulse" />
      </button>
    </div>
  );
}
