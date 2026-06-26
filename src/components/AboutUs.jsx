import React from 'react';
import { CoffeeBean } from './Hero';
import { Sparkles } from 'lucide-react';

export default function AboutUs() {
  return (
    <section id="about" className="py-24 bg-cream-100 relative overflow-hidden">
      
      {/* Decorative floating bean icons */}
      <CoffeeBean className="w-12 h-12 top-10 left-[40%] opacity-40 animate-float-slow" style={{ transform: 'rotate(120deg)' }} />
      <CoffeeBean className="w-10 h-10 bottom-10 right-[35%] opacity-30 animate-float-medium" style={{ transform: 'rotate(-45deg)' }} />
      
      {/* Repeating Coffee Cup outline background pattern */}
      <div className="absolute inset-0 opacity-[0.03] select-none pointer-events-none bg-[radial-gradient(#2c1b12_2px,transparent_2px)] [background-size:24px_24px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Overlapping Image Column */}
          <div className="lg:col-span-6 relative flex justify-center order-2 lg:order-1">
            
            {/* Background offset decorative frame */}
            <div className="absolute -inset-2 border-2 border-espresso-900 rounded-[32px] transform translate-x-2 translate-y-2 sm:translate-x-4 sm:translate-y-4 -z-10 w-full max-w-[280px] h-[320px] xs:max-w-[320px] xs:h-[360px] sm:max-w-[420px] sm:h-[480px]" />
            
            {/* Main Image wrapper */}
            <div className="w-full max-w-[280px] h-[320px] xs:max-w-[320px] xs:h-[360px] sm:max-w-[420px] sm:h-[480px] bg-white rounded-[32px] overflow-hidden shadow-premium border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800"
                alt="Our Cozy Cafe Crafting Coffee"
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-750"
              />
            </div>
            
            {/* Visual small floating card */}
            <div className="absolute -bottom-6 right-2 xs:-right-2 sm:-right-4 lg:-right-8 bg-espresso-900 text-cream-50 p-5 sm:p-6 rounded-[24px] shadow-premium max-w-[160px] xs:max-w-[200px] border border-espresso-800 animate-float-medium">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-goldAccent mb-2" />
              <p className="font-serif font-bold text-xs sm:text-sm leading-snug">
                Roasted locally in small batches for premium freshness.
              </p>
            </div>
          </div>

          {/* Text Content Column */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6 order-1 lg:order-2">
            <span className="text-matcha-600 font-sans text-sm font-bold uppercase tracking-widest">
              Our Journey
            </span>
            
            <h2 className="text-4xl sm:text-5xl font-serif font-black text-espresso-900 tracking-tight leading-tight">
              About <span className="underline decoration-matcha-400 decoration-3 underline-offset-4 font-normal italic">us</span>
            </h2>
            
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-espresso-800">
              We provide quality coffee, and ready to deliver.
            </h3>
            
            <div className="space-y-4 text-espresso-700 font-sans text-base leading-relaxed">
              <p>
                Founded in the heart of the city by coffee enthusiasts, Coffeed began as a small roasting project in a garage. Today, we are a community-centric sanctuary where time slows down, and every bean is selected and roasted with ultimate precision.
              </p>
              <p>
                Our baristas train for hundreds of hours to craft the perfect pour. We partner directly with family-run farms in Colombia, Ethiopia, and Sumatra, paying fair prices to support local agricultural ecosystems.
              </p>
            </div>
            
            <div className="pt-4">
              <a
                href="#menu"
                className="inline-flex bg-espresso-900 text-cream-50 hover:bg-matcha-500 hover:text-white px-8 py-3.5 rounded-full font-sans font-bold text-sm tracking-wide transition-all duration-300 shadow-soft hover:shadow-premium"
              >
                Explore Our Story
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
