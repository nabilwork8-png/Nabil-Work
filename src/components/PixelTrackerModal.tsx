import { useState, useEffect } from 'react';
import { X, Activity, Check, Copy, AlertCircle } from 'lucide-react';
import { getLoggedEvents, initializePixel } from '../utils/analytics';
import { PixelEventLog } from '../types';

interface PixelTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PixelTrackerModal({ isOpen, onClose }: PixelTrackerModalProps) {
  const [pixelId, setPixelId] = useState(
    () => localStorage.getItem('meta_pixel_id') || ''
  );
  const [isSaved, setIsSaved] = useState(false);
  const [events, setEvents] = useState<PixelEventLog[]>([]);

  useEffect(() => {
    if (isOpen) {
      setEvents(getLoggedEvents());
      const handleEvent = () => setEvents(getLoggedEvents());
      window.addEventListener('pixel_event_logged', handleEvent);
      return () => window.removeEventListener('pixel_event_logged', handleEvent);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    initializePixel(pixelId.trim());
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 text-right overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <span className="font-black text-slate-900 text-lg">إعدادات تتبع Meta Pixel</span>
            <Activity className="w-5 h-5 text-blue-600" />
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto space-y-4 py-4 grow">
          <form onSubmit={handleSave} className="space-y-3">
            <div>
              <label htmlFor="metaPixelInput" className="block text-xs font-bold text-slate-700 mb-1">
                معرف بيكسل فيسبوك (Meta Pixel ID):
              </label>
              <div className="flex gap-2">
                <input
                  id="metaPixelInput"
                  type="text"
                  value={pixelId}
                  onChange={(e) => setPixelId(e.target.value)}
                  placeholder="مثال: 123456789012345"
                  className="grow py-2 px-3 rounded-xl border border-slate-300 font-mono text-sm text-left outline-none focus:border-blue-600"
                  dir="ltr"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors cursor-pointer shrink-0"
                >
                  {isSaved ? 'تم الحفظ!' : 'تفعيل'}
                </button>
              </div>
            </div>
            {isSaved && (
              <p className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                <Check className="w-4 h-4" /> تم ربط Meta Pixel بنجاح وتم إرسال PageView!
              </p>
            )}
          </form>

          {/* Setup Guide */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1.5">
            <div className="font-bold text-slate-800 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 text-blue-600" />
              <span>الأحداث المبرمجة تلقائياً:</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-700 font-medium">
              <li>
                <span className="font-mono text-blue-700 font-bold">PageView</span>: يتم تشغيله فور زيارة الصفحة.
              </li>
              <li>
                <span className="font-mono text-amber-700 font-bold">Lead</span>: يتم تشغيله عند إرسال استمارة الطلب بنجاح.
              </li>
              <li>
                <span className="font-mono text-emerald-700 font-bold">Purchase</span>: يتم تشغيله فقط في صفحة التأكيد النهائية.
              </li>
            </ul>
          </div>

          {/* Real-time Fired Events Log */}
          <div>
            <span className="text-xs font-black text-slate-800 block mb-2">
              سجل الأحداث الأخيرة (Event Log):
            </span>
            {events.length === 0 ? (
              <div className="p-4 rounded-xl bg-slate-50 text-center text-xs text-slate-400 font-bold">
                لا توجد أحداث مسجلة بعد في هذه الجلسة.
              </div>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {events.map((evt) => (
                  <div
                    key={evt.id}
                    className="p-2.5 rounded-xl border border-slate-200 bg-white text-xs flex items-center justify-between font-mono"
                    dir="ltr"
                  >
                    <span className="text-slate-400 text-[10px]">{evt.timestamp}</span>
                    <span
                      className={`font-black px-2 py-0.5 rounded text-[11px] ${
                        evt.eventName === 'PageView'
                          ? 'bg-blue-100 text-blue-800'
                          : evt.eventName === 'Lead'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {evt.eventName}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-4 py-2 rounded-xl transition-colors cursor-pointer"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
}
