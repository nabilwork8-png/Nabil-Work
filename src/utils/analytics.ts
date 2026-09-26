import { PixelEventLog } from '../types';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
    __initMetaPixel?: (pixelId: string) => void;
  }
}

// In-memory or localStorage event log for debugging & verification
const EVENT_STORAGE_KEY = 'moroccan_cod_pixel_events';

export function getLoggedEvents(): PixelEventLog[] {
  try {
    const raw = localStorage.getItem(EVENT_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function logEvent(eventName: 'PageView' | 'Lead' | 'Purchase', data?: Record<string, unknown>) {
  const newEvent: PixelEventLog = {
    id: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    eventName,
    data,
    timestamp: new Date().toLocaleTimeString('ar-MA', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
  };

  try {
    const current = getLoggedEvents();
    const updated = [newEvent, ...current].slice(0, 50);
    localStorage.setItem(EVENT_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('pixel_event_logged', { detail: newEvent }));
  } catch (err) {
    console.warn('Could not store pixel event:', err);
  }
}

/**
 * Initializes Meta Pixel with the given Pixel ID or reads from env / URL param.
 */
export function initializePixel(pixelId?: string) {
  const targetId =
    pixelId ||
    new URLSearchParams(window.location.search).get('pixel') ||
    import.meta.env.VITE_META_PIXEL_ID ||
    localStorage.getItem('meta_pixel_id');

  if (targetId && typeof window !== 'undefined') {
    localStorage.setItem('meta_pixel_id', targetId);
    if (window.__initMetaPixel) {
      window.__initMetaPixel(targetId);
    } else if (window.fbq) {
      window.fbq('init', targetId);
      window.fbq('track', 'PageView');
    }
  }
}

/**
 * Tracks PageView event (landing page load)
 */
export function trackPageView() {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'PageView');
  }
  logEvent('PageView', { path: window.location.pathname });
}

/**
 * Tracks Lead event (order form submitted)
 */
export function trackLead(orderData: {
  fullName: string;
  phone: string;
  city: string;
  color: string;
  quantity: number;
  value: number;
  currency: string;
}) {
  const payload = {
    content_name: '3-in-1 Backpack Set',
    content_category: 'Bags & Luggage',
    value: orderData.value,
    currency: orderData.currency || 'MAD',
    predicted_ltv: orderData.value,
    city: orderData.city,
    quantity: orderData.quantity,
  };

  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead', payload);
  }
  logEvent('Lead', payload);

  // Meta Conversions API (CAPI) payload format ready for backend relay
  sendConversionsApiEvent('Lead', payload, {
    phone: orderData.phone,
    name: orderData.fullName,
  });
}

/**
 * Tracks Purchase event (order successfully confirmed on confirmation page)
 */
export function trackPurchase(order: {
  id: string;
  value: number;
  currency: string;
  quantity: number;
  color: string;
}) {
  const payload = {
    content_name: '3-in-1 Backpack Set',
    content_type: 'product',
    content_ids: ['backpack-3in1'],
    value: order.value,
    currency: order.currency || 'MAD',
    num_items: order.quantity,
    order_id: order.id,
  };

  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Purchase', payload);
  }
  logEvent('Purchase', payload);

  // Conversions API structure
  sendConversionsApiEvent('Purchase', payload, {
    order_id: order.id,
  });
}

/**
 * Conversions API placeholder helper
 * When a backend endpoint is added, this can forward server-side events.
 */
function sendConversionsApiEvent(
  eventName: string,
  eventData: Record<string, unknown>,
  userData: Record<string, unknown>
) {
  // If a server endpoint exists or when Meta CAPI token is set up:
  if (import.meta.env.VITE_ENABLE_CAPI === 'true') {
    fetch('/api/meta-conversions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        user_data: userData,
        custom_data: eventData,
        action_source: 'website',
      }),
    }).catch((err) => {
      console.warn('Conversions API relay failed:', err);
    });
  }
}
