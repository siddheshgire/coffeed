import React from 'react';
import { ArrowRight, Star, Calendar } from 'lucide-react';

// Floating Coffee Bean SVG Component for reuse
export function CoffeeBean({ className, style }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`absolute select-none pointer-events-none ${className}`}
      style={style}
    >
      {/* Coffee bean body */}
      <path
        d="M25,50 C20,25 80,20 75,50 C70,80 30,75 25,50 Z"
        fill="#3D2D24"
        opacity="0.12"
      />
      {/* Center wavy line */}
      <path
        d="M48,22 C40,40 60,60 52,78"
        stroke="#2C1B12"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        opacity="0.15"
      />
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-cream-50">
      
      {/* Floating Coffee Beans in Background */}
      <CoffeeBean className="w-16 h-16 top-20 left-[10%] animate-float-slow" />
      <CoffeeBean className="w-12 h-12 top-40 right-[15%] animate-float-medium" style={{ transform: 'rotate(45deg)' }} />
      <CoffeeBean className="w-14 h-14 bottom-32 left-[18%] animate-float-medium" style={{ transform: 'rotate(-30deg)' }} />
      <CoffeeBean className="w-20 h-20 bottom-20 right-[8%] animate-float-slow" style={{ transform: 'rotate(80deg)' }} />
      <CoffeeBean className="w-10 h-10 top-[60%] left-[5%] animate-float-fast" style={{ transform: 'rotate(15deg)' }} />

      {/* Decorative background grid pattern or soft blur */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-matcha-100/30 rounded-full filter blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-[45%] h-[45%] bg-cream-200/40 rounded-full filter blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-8 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 bg-matcha-100/60 px-4 py-1.5 rounded-full text-matcha-700 font-sans text-xs font-semibold tracking-wider uppercase border border-matcha-200">
              <span className="w-2 h-2 rounded-full bg-matcha-500 animate-pulse" />
              Now Open: 7 AM - 9 PM
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif font-black tracking-tight text-espresso-900 leading-[1.1]">
              Your Daily <span className="text-matcha-500 font-serif italic font-normal">Ritual</span>, <br />
              Elevated.
            </h1>
            
            <p className="text-lg md:text-xl font-sans text-espresso-800 max-w-xl leading-relaxed">
              Experience artisanal coffee and fresh bakes in the heart of the city. Handcrafted with passion, served in a warm aesthetic sanctuary.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="#menu"
                className="bg-espresso-900 text-cream-50 hover:bg-matcha-500 hover:text-white px-8 py-4 rounded-full font-sans font-bold text-base text-center transition-all duration-300 shadow-soft hover:shadow-premium hover:-translate-y-0.5 flex items-center justify-center gap-3 group"
              >
                View Digital Menu
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#book-table"
                className="bg-white text-espresso-900 border-2 border-cream-200 hover:border-espresso-900 px-8 py-4 rounded-full font-sans font-bold text-base text-center transition-all duration-300 shadow-soft hover:shadow-premium hover:-translate-y-0.5 flex items-center justify-center gap-3"
              >
                <Calendar className="w-5 h-5 text-espresso-800" />
                Book a Table
              </a>
            </div>

            {/* Micro stats info */}
            <div className="pt-8 border-t border-cream-200 grid grid-cols-3 gap-6 max-w-md">
              <div>
                <p className="text-3xl font-serif font-bold text-espresso-900">4.9</p>
                <p className="text-xs text-espresso-800 uppercase tracking-wider font-semibold font-sans mt-1">Google Rating</p>
              </div>
              <div>
                <p className="text-3xl font-serif font-bold text-espresso-900">100%</p>
                <p className="text-xs text-espresso-800 uppercase tracking-wider font-semibold font-sans mt-1">Single Origin</p>
              </div>
              <div>
                <p className="text-3xl font-serif font-bold text-espresso-900">15+</p>
                <p className="text-xs text-espresso-800 uppercase tracking-wider font-semibold font-sans mt-1">Daily Bakes</p>
              </div>
            </div>
          </div>

          {/* Graphical Coffee Badge (Right side) */}
          <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
            <div className="relative w-64 h-64 xs:w-72 xs:h-72 sm:w-80 sm:h-80 lg:w-[400px] lg:h-[400px] flex items-center justify-center">
              
              {/* Outer circular rotating outline */}
              <div className="absolute inset-0 border-2 border-dashed border-espresso-300/40 rounded-full animate-spin-slow" />
              
              {/* Secondary background circle wrapper */}
              <div className="absolute w-[90%] h-[90%] bg-espresso-900 rounded-full overflow-hidden shadow-premium">
                
                {/* Visual decorative circles/mesh inside */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FAF7F2_1px,transparent_1px)] [background-size:16px_16px]" />
                
                {/* Main image of coffee pour */}
                <img
                  src="https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=600"
                  alt="Artisanal Cappuccino Pour"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Floating pill badge 1: Name */}
              <div className="absolute top-[6%] right-[5%] sm:top-[8%] sm:right-[10%] bg-white/95 backdrop-blur-sm border border-cream-100 shadow-premium py-1.5 px-4 sm:py-2 sm:px-5 rounded-full flex items-center gap-1.5 sm:gap-2 transform rotate-3 animate-float-medium">
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-goldAccent" />
                <span className="font-serif font-bold text-espresso-900 text-xs sm:text-base">Cappuccino</span>
              </div>

              {/* Floating pill badge 2: Rating */}
              <div className="absolute top-[35%] right-0 sm:-right-[5%] bg-white/95 backdrop-blur-sm border border-cream-100 shadow-premium py-1 px-3 sm:py-1.5 sm:px-4 rounded-full flex items-center gap-1 sm:gap-1.5 transform -rotate-2 animate-float-slow">
                <Star className="w-3.5 h-3.5 fill-goldAccent stroke-goldAccent" />
                <span className="font-sans font-bold text-espresso-900 text-xs sm:text-sm">4.8</span>
                <span className="text-[10px] sm:text-xs text-espresso-800 font-semibold">(2k+)</span>
              </div>

              {/* Floating pill badge 3: Price */}
              <div className="absolute bottom-[6%] left-[2%] sm:bottom-[10%] sm:left-[5%] bg-white/95 backdrop-blur-sm border border-cream-100 shadow-premium py-1.5 px-4 sm:py-2 sm:px-5 rounded-full flex items-center gap-1 sm:gap-1.5 transform -rotate-3 animate-float-fast">
                <span className="font-sans text-[10px] sm:text-xs text-espresso-800 font-semibold uppercase tracking-wider">Price</span>
                <span className="font-serif font-extrabold text-matcha-600 text-xs sm:text-base">₹180</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
