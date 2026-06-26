import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useOrder } from '../context/OrderContext';
import OrderTracker from './OrderTracker';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    gst,
    packagingFee,
    grandTotal,
    placeOrder
  } = useOrder();

  const [checkoutData, setCheckoutData] = useState({ name: '', phone: '' });
  const [placedOrder, setPlacedOrder] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCheckoutData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (!checkoutData.name || !checkoutData.phone) return;
    
    const order = placeOrder(checkoutData.name, checkoutData.phone);
    if (order) {
      setPlacedOrder(order);
      setCheckoutData({ name: '', phone: '' });
    }
  };

  const closeDrawer = () => {
    setIsCartOpen(false);
    setPlacedOrder(null);
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-espresso-950/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={closeDrawer}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex">
        {/* Drawer Panel */}
        <div className="w-screen max-w-md bg-white shadow-premium border-l border-cream-200 flex flex-col">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-cream-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-espresso-900" />
              <h2 className="font-serif font-black text-xl text-espresso-900">
                {placedOrder ? 'Order Progress' : 'Your Basket'}
              </h2>
            </div>
            <button 
              onClick={closeDrawer} 
              className="text-espresso-800 hover:text-matcha-500 p-1 rounded-full hover:bg-cream-100 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-6 py-6 bg-cream-50/30">
            {placedOrder ? (
              /* REAL-TIME RECEIPT & PREPARATION TRACKER VIEW */
              <OrderTracker 
                orderId={placedOrder.order_id} 
                onBack={closeDrawer} 
              />
            ) : cart.length === 0 ? (
              /* EMPTY CART SCREEN */
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="bg-cream-100 text-espresso-300 p-6 rounded-full">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-espresso-900">Your basket is empty</h3>
                  <p className="text-xs font-sans text-espresso-650 mt-1 max-w-xs mx-auto">
                    Browse our digital menu and select your favorite artisanal beverages, teas, and pastries to get started.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-espresso-900 hover:bg-matcha-500 text-cream-50 px-6 py-2.5 rounded-full font-sans font-semibold text-xs tracking-wider uppercase transition-colors shadow-soft cursor-pointer"
                >
                  Explore Menu
                </button>
              </div>
            ) : (
              /* CART ITEMS LIST */
              <div className="space-y-4">
                {cart.map((item) => (
                  <div 
                    key={`${item.id}-${item.option}`}
                    className="flex gap-4 p-3 bg-white rounded-2xl border border-cream-100 items-center justify-between hover:shadow-soft transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-cream-100 flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-sm text-espresso-950">{item.name}</h4>
                        <div className="flex gap-2 items-center mt-1">
                          <span className="text-[10px] font-sans font-bold text-matcha-600 bg-matcha-100 px-2 py-0.5 rounded-full">
                            {item.option}
                          </span>
                          <span className="text-xs font-serif text-espresso-900 font-extrabold">{item.price}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center bg-white border border-cream-200 rounded-full py-0.5 px-1.5 shadow-sm">
                        <button 
                          onClick={() => updateQuantity(item.id, item.option, -1)}
                          className="p-1 text-espresso-500 hover:text-matcha-500 hover:bg-cream-100 rounded-full transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-sans font-bold text-xs text-espresso-900 px-2 min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.option, 1)}
                          className="p-1 text-espresso-500 hover:text-matcha-500 hover:bg-cream-100 rounded-full transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button 
                        onClick={() => removeFromCart(item.id, item.option)}
                        className="text-espresso-400 hover:text-red-500 p-2 hover:bg-red-50 rounded-full transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Checkout Summary (only when cart is populated and order not placed) */}
          {cart.length > 0 && !placedOrder && (
            <div className="border-t border-cream-200 bg-cream-100 p-6 space-y-6">
              
              {/* Receipt Summary */}
              <div className="space-y-2 text-xs font-sans text-espresso-850">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-espresso-950">{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (5%)</span>
                  <span className="font-semibold text-espresso-950">{gst}</span>
                </div>
                <div className="flex justify-between">
                  <span>Eco-Packaging Fee</span>
                  <span className="font-semibold text-espresso-950">{packagingFee}</span>
                </div>
                <div className="flex justify-between border-t border-cream-200 pt-2 text-sm font-serif font-black text-espresso-950">
                  <span>Estimated Total</span>
                  <span className="text-matcha-600">{grandTotal}</span>
                </div>
              </div>

              {/* Checkout Form */}
              <form onSubmit={handleCheckoutSubmit} className="space-y-3 pt-2">
                <div className="space-y-1">
                  <label htmlFor="checkout-name" className="block text-[10px] font-sans font-bold text-espresso-700 uppercase tracking-wider">
                    Name for Pickup
                  </label>
                  <input
                    type="text"
                    id="checkout-name"
                    required
                    value={checkoutData.name}
                    onChange={handleInputChange}
                    name="name"
                    placeholder="Siddharth Sharma"
                    className="w-full px-4 py-2 text-xs bg-cream-50 border border-cream-200 rounded-xl font-sans text-espresso-900 focus:outline-none focus:border-matcha-500 focus:ring-1 focus:ring-matcha-500"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="checkout-phone" className="block text-[10px] font-sans font-bold text-espresso-700 uppercase tracking-wider">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    id="checkout-phone"
                    required
                    value={checkoutData.phone}
                    onChange={handleInputChange}
                    name="phone"
                    placeholder="+91 99999 88888"
                    className="w-full px-4 py-2 text-xs bg-cream-50 border border-cream-200 rounded-xl font-sans text-espresso-900 focus:outline-none focus:border-matcha-500 focus:ring-1 focus:ring-matcha-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-espresso-900 hover:bg-matcha-500 hover:text-white text-cream-50 py-3.5 rounded-full font-sans font-bold text-sm tracking-wide transition-all duration-300 shadow-soft hover:shadow-premium flex items-center justify-center gap-2 group mt-2 cursor-pointer"
                >
                  Place Order Ahead
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
