import React, { useState } from 'react';
import { Coffee, MapPin, Clock, Phone, Mail, ArrowRight, Check } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <footer className="relative bg-cream-100 border-t border-cream-200 mt-20">
      
      {/* 50% Off Subscribe Banner - Overlapping at the top */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -translate-y-16">
        <div className="relative overflow-hidden rounded-[36px] bg-[#1C100A] text-cream-50 p-8 sm:p-12 lg:p-16 shadow-premium border border-espresso-900">
          {/* Blurred Background coffee pour photo */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center opacity-15 filter blur-[2px]" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl text-center lg:text-left">
              <span className="text-goldAccent font-sans text-xs font-bold uppercase tracking-widest">
                Exclusive Offer
              </span>
              <h2 className="text-white text-3xl sm:text-4xl font-serif font-black tracking-tight leading-tight">
                Subscribe to get 50% <br className="hidden sm:inline" /> discount price
              </h2>
              <p className="text-xs sm:text-sm text-cream-200 font-sans max-w-md">
                Join our newsletter list today and receive a 50% discount coupon on your first artisanal pour-over or breakfast mains.
              </p>
            </div>

            {/* Subscribe Form */}
            <div className="w-full max-w-md">
              {!subscribed ? (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="flex-1 px-6 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full font-sans text-sm text-white placeholder-cream-200/60 focus:outline-none focus:border-goldAccent focus:ring-1 focus:ring-goldAccent transition-colors"
                  />
                  <button
                    type="submit"
                    className="bg-cream-50 text-[#1C100A] hover:bg-goldAccent hover:text-white px-8 py-4 rounded-full font-sans font-bold text-sm tracking-wide transition-all duration-300 shadow-soft hover:-translate-y-0.5 whitespace-nowrap flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    Subscribe
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </form>
              ) : (
                <div className="bg-matcha-500/90 text-white rounded-full py-4 px-6 text-center text-sm font-sans font-bold flex items-center justify-center gap-2 border border-matcha-400 backdrop-blur-md animate-pulse">
                  <Check className="w-5 h-5" />
                  Subscription active! Check your inbox for the 50% coupon.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 -mt-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pt-4">
          
          {/* Logo & Brand Column */}
          <div className="md:col-span-4 space-y-6">
            <a href="#" className="flex items-center gap-2 group w-fit">
              <div className="bg-espresso-900 text-cream-50 p-2 rounded-full">
                <Coffee className="w-5 h-5" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-espresso-900">
                Coffeed
              </span>
            </a>
            <p className="text-sm font-sans text-espresso-700 leading-relaxed max-w-sm">
              Your daily artisanal sanctuary. Handcrafting fine roasts and fresh local bakes with community-centric passion since 2024.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4">
              <a href="#" aria-label="Facebook Link" className="bg-white hover:bg-espresso-900 text-espresso-850 hover:text-cream-50 p-3 rounded-full border border-cream-200 shadow-soft hover:shadow-premium transition-all duration-300 flex items-center justify-center">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
              <a href="#" aria-label="Instagram Link" className="bg-white hover:bg-espresso-900 text-espresso-850 hover:text-cream-50 p-3 rounded-full border border-cream-200 shadow-soft hover:shadow-premium transition-all duration-300 flex items-center justify-center">
                <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="#" aria-label="Twitter Link" className="bg-white hover:bg-espresso-900 text-espresso-850 hover:text-cream-50 p-3 rounded-full border border-cream-200 shadow-soft hover:shadow-premium transition-all duration-300 flex items-center justify-center">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Operating Hours Column */}
          <div className="md:col-span-4 space-y-6">
            <h3 className="font-serif font-bold text-lg text-espresso-950 flex items-center gap-2">
              <Clock className="w-5 h-5 text-matcha-500" />
              Opening Hours
            </h3>
            
            <div className="border border-cream-200 bg-white rounded-2xl overflow-hidden shadow-soft">
              <table className="w-full text-sm font-sans text-espresso-750">
                <tbody>
                  <tr className="border-b border-cream-100">
                    <td className="px-4 py-3 font-semibold bg-cream-50/50">Monday - Friday</td>
                    <td className="px-4 py-3 text-right">07:00 AM - 09:00 PM</td>
                  </tr>
                  <tr className="border-b border-cream-100">
                    <td className="px-4 py-3 font-semibold bg-cream-50/50">Saturday</td>
                    <td className="px-4 py-3 text-right">08:00 AM - 10:00 PM</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold bg-cream-50/50">Sunday</td>
                    <td className="px-4 py-3 text-right">08:00 AM - 08:00 PM</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Address & Embedded Map Column */}
          <div className="md:col-span-4 space-y-6">
            <h3 className="font-serif font-bold text-lg text-espresso-950 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-matcha-500" />
              Our Location
            </h3>

            <div className="text-sm font-sans text-espresso-750 space-y-2">
              <p className="font-semibold text-espresso-900">1204 Pine Street, Seattle, WA 98101</p>
              <div className="flex gap-4 text-xs font-semibold text-espresso-600">
                <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> +1 (206) 555-0149</span>
                <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> hello@coffeed.com</span>
              </div>
            </div>

            {/* Embedded Google Map iframe Placeholder */}
            <div className="w-full h-40 rounded-2xl overflow-hidden shadow-soft border border-cream-200 bg-white">
              <iframe
                title="Google Maps Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2689.7972412882195!2d-122.3364956!3d47.6062095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDM2JzIyLjMiTiAxMjLCsDIwJzExLjQiVw!5e0!3m2!1sen!2sus!4v1625000000000!5m2!1sen!2sus"
                className="w-full h-full border-0 grayscale opacity-90 hover:grayscale-0 transition-all duration-300"
                allowFullScreen=""
                loading="lazy"
              />
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-cream-200 text-center text-xs font-sans text-espresso-600">
          <p>© {new Date().getFullYear()} Coffeed Cafe. All rights reserved. Made for Modern Artisans.</p>
        </div>
      </div>
    </footer>
  );
}
