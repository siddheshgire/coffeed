import React from 'react';

export default function VibeGallery() {
  const galleryItems = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=600',
      title: 'Our Sanctuary',
      subtitle: 'Warm light & cozy corners'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&q=80&w=600',
      title: 'The Perfect Extraction',
      subtitle: 'Fresh house-roasted blends'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=600',
      title: 'Our Craft',
      subtitle: 'Baristas who care'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600',
      title: 'The Daily Prep',
      subtitle: 'Fresh pastries every morning'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=80&w=600',
      title: 'Slow Mornings',
      subtitle: 'Elevated quiet moments'
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=600',
      title: 'Baked to Golden',
      subtitle: 'Authentic French recipes'
    }
  ];

  return (
    <section id="vibe" className="py-24 bg-cream-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <span className="text-matcha-600 font-sans text-sm font-bold uppercase tracking-widest mb-2">
            Atmosphere
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-espresso-900 tracking-tight">
            The <span className="underline decoration-matcha-400 decoration-3 underline-offset-4 font-normal italic">Vibe</span> Gallery
          </h2>
        </div>

        {/* Masonry Columns */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="break-inside-avoid relative overflow-hidden rounded-[24px] shadow-soft hover:shadow-premium group cursor-pointer border border-cream-200 bg-white"
            >
              {/* Image with zoom effect */}
              <div className="overflow-hidden w-full h-full">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* Gradient overlay and details */}
              <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/70 via-espresso-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-white font-serif font-bold text-lg mb-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  {item.title}
                </h3>
                <p className="text-cream-200 font-sans text-xs transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                  {item.subtitle}
                </p>
              </div>

              {/* Decorative brand label tag showing briefly */}
              <div className="absolute top-4 right-4 bg-white/70 backdrop-blur-sm py-1 px-3 rounded-full text-[10px] font-sans font-bold text-espresso-900 uppercase opacity-100 group-hover:opacity-0 transition-opacity duration-300 border border-cream-100">
                Aesthetic
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
