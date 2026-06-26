import React, { useState, useEffect } from 'react';
import { OrderProvider } from './context/OrderContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PopularSection from './components/PopularSection';
import DeliveryInfo from './components/DeliveryInfo';
import AboutUs from './components/AboutUs';
import SpecialMenu from './components/SpecialMenu';
import VibeGallery from './components/VibeGallery';
import BookingForm from './components/BookingForm';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import KdsDashboard from './components/KdsDashboard';

function AppContent() {
  // Read location on mount to support loading of KDS
  const [view, setView] = useState(() => {
    return window.location.pathname === '/kds' || window.location.hash === '#kds' ? 'staff' : 'customer';
  });

  useEffect(() => {
    const handleLocationChange = () => {
      if (window.location.pathname === '/kds' || window.location.hash === '#kds') {
        setView('staff');
      } else {
        setView('customer');
      }
    };
    
    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const handleKdsClose = () => {
    if (window.location.pathname === '/kds') {
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new Event('popstate'));
    } else {
      window.location.hash = ''; // Clear hash
    }
  };

  if (view === 'staff') {
    return <KdsDashboard onClose={handleKdsClose} />;
  }

  return (
    <div className="min-h-screen bg-cream-50 overflow-x-hidden selection:bg-matcha-200 selection:text-espresso-900">
      {/* Sticky Navigation (Removed lock button from user-facing navigation) */}
      <Navbar />

      {/* Main Public Cafe View */}
      <main>
        {/* Immersive Hero Section */}
        <Hero />

        {/* Popular Now Carousel */}
        <PopularSection />

        {/* Delivery Service instructions */}
        <DeliveryInfo />

        {/* Cafe Story narrative */}
        <AboutUs />

        {/* Special Menu tab selection */}
        <SpecialMenu />

        {/* Vibe Gallery */}
        <VibeGallery />

        {/* Reservations Form (places table bookings in KDS) */}
        <BookingForm />

        {/* Testimonials */}
        <Testimonials />
      </main>

      {/* Cart Drawer Slide-over holding Basket and Real-Time prep tracking receipt */}
      <CartDrawer />

      {/* Footer Info */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <OrderProvider>
      <AppContent />
    </OrderProvider>
  );
}
