import React, { useState, useEffect } from 'react';
import { Coffee, Menu, X, ShoppingBag } from 'lucide-react';
import { useOrder } from '../context/OrderContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { cart, setIsCartOpen } = useOrder();
  
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Menu', href: '#menu' },
    { name: 'About', href: '#about' },
    { name: 'Vibe', href: '#vibe' },
    { name: 'Book Table', href: '#book-table' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-cream-100/90 backdrop-blur-md shadow-soft py-4 border-b border-cream-200/50' 
        : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="bg-espresso-900 text-cream-50 p-2 rounded-full transition-transform duration-300 group-hover:rotate-12">
              <Coffee className="w-5 h-5" />
            </div>
            <span className="font-serif text-2xl font-bold tracking-tight text-espresso-900">
              Coffeed
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-sans font-medium text-espresso-800 hover:text-matcha-500 transition-colors duration-200 text-sm tracking-wide relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-matcha-400 after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {/* Shopping cart toggle button */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="bg-espresso-900 text-cream-50 hover:bg-matcha-500 hover:text-white px-6 py-2.5 rounded-full font-sans font-semibold text-sm transition-all duration-300 shadow-soft hover:shadow-premium hover:-translate-y-0.5 flex items-center gap-2 relative cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Order Ahead</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-matcha-400 text-white font-sans text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-cream-100 animate-pulse">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            
            {/* Mobile Cart Trigger */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-espresso-850 hover:text-matcha-500 relative cursor-pointer"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-matcha-500 text-white text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-espresso-900 p-2 hover:text-matcha-500 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div className={`md:hidden fixed inset-x-0 top-[73px] bg-cream-100 border-b border-cream-200 shadow-soft transition-all duration-300 ease-in-out transform ${
        isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'
      }`}>
        <div className="px-4 pt-2 pb-6 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block font-sans font-medium text-espresso-800 hover:text-matcha-500 hover:bg-cream-200/50 px-4 py-2.5 rounded-lg transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2 px-4">
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsCartOpen(true);
              }}
              className="w-full bg-espresso-900 text-cream-50 hover:bg-matcha-500 px-6 py-3 rounded-full font-sans font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              Order Ahead
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
