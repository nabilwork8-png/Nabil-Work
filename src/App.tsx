import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProductSection } from './components/ProductSection';
import { BenefitSection } from './components/BenefitSection';
import { OfferSection } from './components/OfferSection';
import { OrderForm } from './components/OrderForm';
import { ConfirmationPage } from './components/ConfirmationPage';
import { StickyBottomBar } from './components/StickyBottomBar';
import { StickyWhatsAppButton } from './components/StickyWhatsAppButton';
import { PixelTrackerModal } from './components/PixelTrackerModal';
import { Footer } from './components/Footer';
import { OrderData, ProductColor } from './types';
import { initializePixel, trackPageView, trackLead } from './utils/analytics';

export default function App() {
  const [selectedColor, setSelectedColor] = useState<ProductColor>('blue');
  const [confirmedOrder, setConfirmedOrder] = useState<OrderData | null>(() => {
    try {
      const saved = sessionStorage.getItem('last_moroccan_order');
      if (saved && window.location.hash === '#confirmation') {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return null;
  });

  const [showStickyBar, setShowStickyBar] = useState(false);
  const [isPixelModalOpen, setIsPixelModalOpen] = useState(false);

  useEffect(() => {
    // 1. Initialize Meta Pixel
    initializePixel();

    // 2. Track PageView when landing page is viewed
    if (!confirmedOrder) {
      trackPageView();
    }

    // 3. Scroll listener for sticky CTA bar
    const handleScroll = () => {
      if (window.scrollY > 320) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // 4. Handle hash navigation (e.g. back button from confirmation)
    const handleHashChange = () => {
      if (window.location.hash !== '#confirmation' && confirmedOrder) {
        setConfirmedOrder(null);
      }
    };
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [confirmedOrder]);

  const scrollToOrder = () => {
    const el = document.getElementById('order-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOrderSubmit = (order: OrderData) => {
    // Track Lead event upon successful form completion
    trackLead({
      fullName: order.fullName,
      phone: order.phone,
      city: order.city,
      color: order.color,
      quantity: order.quantity,
      value: order.totalPrice,
      currency: 'MAD',
    });

    try {
      sessionStorage.setItem('last_moroccan_order', JSON.stringify(order));
    } catch {
      // ignore
    }

    setConfirmedOrder(order);
    window.location.hash = 'confirmation';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setConfirmedOrder(null);
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If order is placed, show dedicated confirmation screen
  if (confirmedOrder) {
    return (
      <div dir="rtl" className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900 selection:bg-blue-600 selection:text-white">
        <ConfirmationPage order={confirmedOrder} onBackToHome={handleBackToHome} />
        <StickyWhatsAppButton hasStickyBar={false} />
        <PixelTrackerModal
          isOpen={isPixelModalOpen}
          onClose={() => setIsPixelModalOpen(false)}
        />
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen bg-white font-sans antialiased text-slate-900 selection:bg-blue-600 selection:text-white pb-20 sm:pb-12">
      {/* Navigation Header */}
      <Header
        onOrderClick={scrollToOrder}
        onOpenPixelModal={() => setIsPixelModalOpen(true)}
      />

      <main>
        {/* 1. Hero Section */}
        <HeroSection
          selectedColor={selectedColor}
          onColorChange={setSelectedColor}
          onOrderClick={scrollToOrder}
        />

        {/* 2. Product / Offer 3-in-1 Breakdown */}
        <ProductSection
          selectedColor={selectedColor}
          onColorChange={setSelectedColor}
        />

        {/* 3. Benefit Section */}
        <BenefitSection />

        {/* 4. Price & Promotion Offer Section */}
        <OfferSection onOrderClick={scrollToOrder} />

        {/* 5. Simple Moroccan COD Order Form */}
        <OrderForm
          selectedColor={selectedColor}
          onColorChange={setSelectedColor}
          onSubmitOrder={handleOrderSubmit}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Sticky WhatsApp Button */}
      <StickyWhatsAppButton hasStickyBar={showStickyBar} />

      {/* Mobile Sticky CTA Conversion Bar */}
      <StickyBottomBar
        selectedColor={selectedColor}
        onOrderClick={scrollToOrder}
        visible={showStickyBar}
      />

      {/* Meta Pixel Setup & Event Log Modal */}
      <PixelTrackerModal
        isOpen={isPixelModalOpen}
        onClose={() => setIsPixelModalOpen(false)}
      />
    </div>
  );
}
