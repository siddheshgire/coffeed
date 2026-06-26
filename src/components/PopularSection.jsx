import React, { useState } from 'react';
import { Star, ShoppingBag, Check } from 'lucide-react';
import { useOrder } from '../context/OrderContext';

export default function PopularSection() {
  const { addToCart } = useOrder();
  
  const [selectedOptions, setSelectedOptions] = useState({
    1: 'Hot', // Vanilla Latte default option
    2: 'Hot', // Espresso
    3: 'Hot', // Hazelnut Latte
  });
  
  const [addedItem, setAddedItem] = useState(null);

  const handleOptionChange = (itemId, option) => {
    setSelectedOptions(prev => ({ ...prev, [itemId]: option }));
  };

  const handleAddToCart = (item) => {
    const option = selectedOptions[item.id] || 'Hot';
    
    // Add item to OrderContext Cart
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      description: item.description
    }, option);

    setAddedItem(item.name);
    setTimeout(() => setAddedItem(null), 2000);
  };

  const popularItems = [
    {
      id: 1,
      name: 'Vanilla Latte',
      price: '₹210',
      rating: '4.8',
      image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=500',
      options: ['Hot', 'Cold'],
      description: 'Rich espresso with creamy steamed milk and sweet vanilla syrup.'
    },
    {
      id: 2,
      name: 'Espresso',
      price: '₹120',
      rating: '4.9',
      image: '/espresso.jpg',
      options: ['Hot'],
      description: 'Intense, aromatic double shot of our house espresso roast.'
    },
    {
      id: 3,
      name: 'Hazelnut Latte',
      price: '₹230',
      rating: '4.8',
      image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&q=80&w=500',
      options: ['Hot', 'Cold'],
      description: 'Velvety espresso paired with nutty hazelnut and signature milk.'
    }
  ];

  return (
    <section id="popular" className="py-20 bg-cream-50 relative overflow-hidden">
      
      {/* Decorative background blur */}
      <div className="absolute right-0 top-1/4 w-[300px] h-[300px] bg-matcha-100/20 rounded-full filter blur-3xl -z-10" />
      <div className="absolute left-0 bottom-1/4 w-[300px] h-[300px] bg-cream-200/50 rounded-full filter blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <span className="text-matcha-600 font-sans text-sm font-bold uppercase tracking-widest mb-2">
            Customer Favorites
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-espresso-900 tracking-tight">
            Popular <span className="underline decoration-matcha-400 decoration-3 underline-offset-4 font-normal italic">Now</span>
          </h2>
        </div>

        {/* Popular Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {popularItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-[32px] p-5 shadow-soft hover:shadow-premium hover:-translate-y-1.5 transition-all duration-300 border border-cream-100 flex flex-col justify-between group"
            >
              {/* Image Container with Absolute Overlays */}
              <div className="relative h-60 w-full rounded-[24px] overflow-hidden mb-5">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Rating Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-soft border border-cream-100">
                  <Star className="w-3.5 h-3.5 fill-goldAccent stroke-goldAccent" />
                  <span className="font-sans font-bold text-espresso-900 text-xs">{item.rating}</span>
                </div>
              </div>

              {/* Card Meta */}
              <div>
                <h3 className="font-serif font-bold text-xl text-espresso-900 mb-1">
                  {item.name}
                </h3>
                <p className="text-xs text-espresso-600 font-sans line-clamp-2 mb-4">
                  {item.description}
                </p>
              </div>

              {/* Bottom Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-cream-100/60 mt-2">
                {/* Option Toggles */}
                <div className="flex gap-2">
                  {item.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleOptionChange(item.id, opt)}
                      className={`px-3.5 py-1 rounded-full text-xs font-sans font-bold transition-all duration-200 ${
                        selectedOptions[item.id] === opt
                          ? 'bg-matcha-500 text-white shadow-sm'
                          : 'bg-cream-100 text-espresso-700 hover:bg-cream-200'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {/* Price and Add button */}
                <div className="flex items-center gap-3">
                  <span className="font-serif font-extrabold text-espresso-900 text-lg">
                    {item.price}
                  </span>
                  
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="w-10 h-10 rounded-full bg-espresso-900 text-cream-50 hover:bg-matcha-500 hover:text-white flex items-center justify-center transition-all duration-300 hover:rotate-12 hover:scale-105 shadow-soft cursor-pointer"
                    aria-label={`Add ${item.name} to order`}
                  >
                    {addedItem === item.name ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <ShoppingBag className="w-4 h-4" />
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
