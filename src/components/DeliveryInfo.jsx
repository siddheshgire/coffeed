import React from 'react';
import { Touchpad, Truck, Coffee, MousePointerClick } from 'lucide-react';

export default function DeliveryInfo() {
  const steps = [
    {
      id: 1,
      title: 'choose your coffee',
      description: 'there are 20+ coffee options crafted with artisanal precision for you to browse.',
      icon: (
        <div className="relative">
          <Coffee className="w-16 h-16 stroke-[1.25] text-espresso-950" />
          <div className="absolute -bottom-1 -right-1 bg-matcha-500 text-white p-1.5 rounded-full shadow-md animate-float-fast">
            <MousePointerClick className="w-4 h-4" />
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: 'we delivery it to you',
      description: 'select our quick delivery option and let our team bring the warmth to your doorstep.',
      icon: (
        <div className="relative">
          <Truck className="w-16 h-16 stroke-[1.25] text-espresso-950" />
          <div className="absolute top-0 right-0 w-3 h-3 rounded-full bg-goldAccent animate-pulse" />
        </div>
      )
    },
    {
      id: 3,
      title: 'Enjoy your coffee',
      description: 'relax and sip your premium beverage. It is much more delicious hot and fresh.',
      icon: (
        <div className="relative">
          <Coffee className="w-16 h-16 stroke-[1.25] text-espresso-950" />
          {/* Animated steam lines */}
          <div className="absolute -top-3 left-[30%] w-1.5 h-4 bg-espresso-300 rounded-full animate-float-slow opacity-60" />
          <div className="absolute -top-4 left-[50%] w-1.5 h-5 bg-espresso-400 rounded-full animate-float-medium opacity-80" />
          <div className="absolute -top-2 left-[70%] w-1.5 h-3 bg-espresso-300 rounded-full animate-float-fast opacity-50" />
        </div>
      )
    }
  ];

  return (
    <section className="py-20 bg-cream-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-espresso-900 tracking-tight">
            How to use delivery <span className="underline decoration-matcha-400 decoration-3 underline-offset-4 font-normal italic">service</span>
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {steps.map((step) => (
            <div
              key={step.id}
              className="flex flex-col items-center text-center group"
            >
              {/* Icon Container */}
              <div className="mb-6 p-6 bg-cream-100 rounded-[28px] border border-cream-200/60 shadow-soft group-hover:shadow-premium group-hover:-translate-y-1 transition-all duration-300">
                {step.icon}
              </div>

              {/* Step Title */}
              <h3 className="font-serif font-black text-xl text-espresso-900 mb-2 capitalize">
                {step.title}
              </h3>

              {/* Step Description */}
              <p className="text-sm font-sans text-espresso-800 max-w-xs leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
