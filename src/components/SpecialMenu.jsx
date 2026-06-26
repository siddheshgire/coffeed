import React, { useState } from 'react';
import { Star, ShoppingBag, Check } from 'lucide-react';
import { useOrder } from '../context/OrderContext';

export default function SpecialMenu() {
  const { addToCart } = useOrder();
  const [activeTab, setActiveTab] = useState('Coffee');
  const [addedItem, setAddedItem] = useState(null);

  const tabs = ['Coffee', 'Teas', 'Pastries', 'Mains'];

  const menuData = {
    Coffee: [
      {
        id: 101,
        name: 'Cappuccino',
        price: '₹180',
        rating: '4.8',
        image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=500',
        description: 'Rich espresso, steamed milk, deep layer of microfoam.',
        tags: ['Gluten-Free']
      },
      {
        id: 102,
        name: 'Moccaccino',
        price: '₹200',
        rating: '4.9',
        image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&q=80&w=500',
        description: 'Espresso blended with premium dark chocolate and steamed milk.',
        tags: []
      },
      {
        id: 103,
        name: 'Espresso Macchiato',
        price: '₹150',
        rating: '4.7',
        image: '/espresso_macchiato.jpg',
        description: 'A shot of intense espresso marked with a dollop of foam.',
        tags: ['Vegan', 'Gluten-Free']
      },
      {
        id: 104,
        name: 'Cold Brew Tonic',
        price: '₹180',
        rating: '4.8',
        image: 'https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&q=80&w=500',
        description: 'Steeped cold brew coffee charged with bubbly premium tonic.',
        tags: ['Vegan', 'Gluten-Free']
      }
    ],
    Teas: [
      {
        id: 201,
        name: 'Ceremonial Matcha Latte',
        price: '₹220',
        rating: '4.9',
        image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&q=80&w=500',
        description: 'Stone-ground organic Japanese matcha whisked with oat milk.',
        tags: ['Vegan', 'Gluten-Free']
      },
      {
        id: 202,
        name: 'Hibiscus Berry Iced Tea',
        price: '₹160',
        rating: '4.6',
        image: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=80&w=500',
        description: 'Refreshing tart hibiscus tea infused with fresh berries.',
        tags: ['Vegan', 'Gluten-Free']
      },
      {
        id: 203,
        name: 'Earl Grey Rose',
        price: '₹185',
        rating: '4.8',
        image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=500',
        description: 'Premium black tea scented with bergamot oil and organic rose petals.',
        tags: []
      }
    ],
    Pastries: [
      {
        id: 301,
        name: 'Almond Croissant',
        price: '₹150',
        rating: '4.9',
        image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=500',
        description: 'Flaky twice-baked butter pastry filled with sweet almond frangipane.',
        tags: []
      },
      {
        id: 302,
        name: 'Matcha White Cookie',
        price: '₹120',
        rating: '4.7',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=500',
        description: 'Soft-baked cookie infused with green tea and white chocolate chips.',
        tags: []
      },
      {
        id: 303,
        name: 'Blueberry Scone',
        price: '₹140',
        rating: '4.8',
        image: 'https://images.unsplash.com/photo-1562376502-6f769499c886?auto=format&fit=crop&q=80&w=500',
        description: 'Crumbly scone baked with wild blueberries.',
        tags: ['Gluten-Free']
      },
      {
        id: 304,
        name: 'Chocolate Avocado Tart',
        price: '₹180',
        rating: '4.9',
        image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=500',
        description: 'Rich, velvety dark chocolate filling in a hazelnut crust.',
        tags: ['Vegan', 'Gluten-Free']
      }
    ],
    Mains: [
      {
        id: 401,
        name: 'Avocado Sourdough Toast',
        price: '₹280',
        rating: '4.9',
        image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=500',
        description: 'Smashed avocado, heirloom cherry tomatoes, microgreens on local toast.',
        tags: ['Vegan']
      },
      {
        id: 402,
        name: 'Truffle Mushroom Panini',
        price: '₹320',
        rating: '4.8',
        image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=500',
        description: 'Sauteed wild mushrooms, white truffle oil, and melted provolone.',
        tags: []
      },
      {
        id: 403,
        name: 'Smoked Salmon Bagel',
        price: '₹350',
        rating: '4.7',
        image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=500',
        description: 'Smoked salmon, dill cream cheese, capers, pickled red onions.',
        tags: []
      }
    ]
  };

  const handleAddToCart = (item) => {
    const defaultOption = activeTab === 'Coffee' || activeTab === 'Teas' ? 'Hot' : 'Fresh';
    
    // Push item details to cart context
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      description: item.description
    }, defaultOption);

    setAddedItem(item.name);
    setTimeout(() => setAddedItem(null), 2000);
  };

  return (
    <section id="menu" className="py-24 bg-cream-50 relative overflow-hidden">
      
      {/* Decorative background blur */}
      <div className="absolute left-0 top-1/4 w-[300px] h-[300px] bg-matcha-100/10 rounded-full filter blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <span className="text-matcha-600 font-sans text-sm font-bold uppercase tracking-widest mb-2">
            Chef's Selections
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-espresso-900 tracking-tight">
            Special menu <span className="underline decoration-matcha-400 decoration-3 underline-offset-4 font-normal italic">for you</span>
          </h2>
        </div>

        {/* Tab Controls */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap items-center justify-center gap-2 bg-cream-100 p-1.5 rounded-full border border-cream-200 shadow-soft max-w-lg">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 sm:px-6 py-1.5 sm:py-2.5 rounded-full font-sans font-bold text-xs sm:text-sm tracking-wide transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-espresso-900 text-cream-50 shadow-md scale-105'
                    : 'text-espresso-700 hover:text-espresso-900 hover:bg-cream-200/50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content (Grid of Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {menuData[activeTab].map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-[28px] p-4 shadow-soft hover:shadow-premium hover:-translate-y-1 transition-all duration-300 border border-cream-100 flex flex-col justify-between group"
            >
              {/* Item Image with overlays */}
              <div className="relative h-48 w-full rounded-[20px] overflow-hidden mb-4 bg-cream-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Rating Badge */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-soft border border-cream-100">
                  <Star className="w-3 h-3 fill-goldAccent stroke-goldAccent" />
                  <span className="font-sans font-bold text-espresso-900 text-[10px]">{item.rating}</span>
                </div>

                {/* Dietary Tags */}
                {item.tags.length > 0 && (
                  <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-matcha-500/90 text-white text-[9px] font-sans font-extrabold px-2 py-0.5 rounded-full tracking-wider uppercase backdrop-blur-sm"
                      >
                        {tag === 'Gluten-Free' ? 'GF' : 'V'}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Item Details */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-bold text-lg text-espresso-900 mb-1 group-hover:text-matcha-600 transition-colors duration-200">
                    {item.name}
                  </h3>
                  <p className="text-xs text-espresso-600 font-sans line-clamp-2 leading-relaxed min-h-[32px] mb-4">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Row: Price and Cart button */}
                <div className="flex items-center justify-between pt-3 border-t border-cream-100">
                  <span className="font-serif font-extrabold text-espresso-900 text-base">
                    {item.price}
                  </span>
                  
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="w-9 h-9 rounded-full bg-espresso-900 text-cream-50 hover:bg-matcha-500 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-soft cursor-pointer"
                    aria-label={`Add ${item.name} to order`}
                  >
                    {addedItem === item.name ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <ShoppingBag className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
