import React, { useState } from 'react';
import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Jenkins',
      role: 'Creative Director',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      quote: 'The pour-overs here are absolutely unmatched. Their single-origin Ethiopian roast has these incredibly bright berry notes that make my morning ritual feel like pure luxury.',
      rating: 5
    },
    {
      id: 2,
      name: 'David Kojo',
      role: 'Software Architect',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      quote: 'Excellent workspace and beautiful lighting. The matcha espresso fusion is spectacular, and the staff are always incredibly welcoming. Highly recommend visiting!',
      rating: 5
    },
    {
      id: 3,
      name: 'Michael Chen',
      role: 'Pastry Chef & Writer',
      image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=200',
      quote: 'Their almond croissants are twice-baked to absolute perfection—flaky, buttery, and not overly sweet. It pairs beautifully with their velvety flat white.',
      rating: 5
    }
  ];

  return (
    <section className="py-24 bg-cream-100 relative overflow-hidden">
      
      {/* Background coffee outline icons pattern */}
      <div className="absolute inset-0 opacity-[0.03] select-none pointer-events-none bg-[radial-gradient(#2c1b12_2px,transparent_2px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <span className="text-matcha-600 font-sans text-sm font-bold uppercase tracking-widest mb-2">
            Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-espresso-900 tracking-tight">
            What they say <span className="underline decoration-matcha-400 decoration-3 underline-offset-4 font-normal italic">about us</span>
          </h2>
        </div>

        {/* Testimonials Grid for larger screens */}
        <div className="hidden md:grid grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-[32px] p-8 shadow-soft hover:shadow-premium transition-all duration-300 border border-cream-200 flex flex-col justify-between group relative"
            >
              <Quote className="absolute top-6 right-8 w-10 h-10 text-cream-100 group-hover:text-matcha-100 transition-colors duration-300" />
              
              <div className="space-y-4">
                {/* Rating */}
                <div className="flex gap-0.5">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-goldAccent stroke-goldAccent" />
                  ))}
                </div>
                {/* Quote */}
                <p className="font-sans text-sm text-espresso-800 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              {/* Profile Card */}
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-cream-100">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border border-cream-200"
                />
                <div>
                  <h4 className="font-serif font-bold text-sm text-espresso-950">{t.name}</h4>
                  <p className="text-[11px] font-sans text-espresso-600 uppercase tracking-wider mt-0.5">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel layout for small/mobile devices */}
        <div className="md:hidden space-y-6">
          <div className="bg-white rounded-[32px] p-8 shadow-soft border border-cream-200 relative min-h-[250px] flex flex-col justify-between">
            <Quote className="absolute top-6 right-8 w-8 h-8 text-cream-100" />
            
            <div className="space-y-4">
              <div className="flex gap-0.5">
                {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-goldAccent stroke-goldAccent" />
                ))}
              </div>
              <p className="font-sans text-sm text-espresso-800 leading-relaxed italic">
                "{testimonials[activeIndex].quote}"
              </p>
            </div>

            <div className="flex items-center gap-4 mt-8 pt-4 border-t border-cream-100">
              <img
                src={testimonials[activeIndex].image}
                alt={testimonials[activeIndex].name}
                className="w-12 h-12 rounded-full object-cover border border-cream-200"
              />
              <div>
                <h4 className="font-serif font-bold text-sm text-espresso-950">{testimonials[activeIndex].name}</h4>
                <p className="text-[11px] font-sans text-espresso-600 uppercase tracking-wider">{testimonials[activeIndex].role}</p>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 pt-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  activeIndex === index ? 'bg-espresso-900 w-6' : 'bg-cream-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
