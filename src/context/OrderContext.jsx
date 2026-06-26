import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Persisted orders
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('coffeed_orders');
    return saved ? JSON.parse(saved) : [];
  });

  // Persisted reservations
  const [reservations, setReservations] = useState(() => {
    const saved = localStorage.getItem('coffeed_reservations');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('coffeed_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('coffeed_reservations', JSON.stringify(reservations));
  }, [reservations]);

  // Synchronize state across multiple open tabs in real-time
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'coffeed_orders') {
        setOrders(JSON.parse(e.newValue || '[]'));
      }
      if (e.key === 'coffeed_reservations') {
        setReservations(JSON.parse(e.newValue || '[]'));
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Cart Operations
  const addToCart = (item, option = 'Hot') => {
    setCart((prevCart) => {
      const existing = prevCart.find((i) => i.id === item.id && i.option === option);
      if (existing) {
        return prevCart.map((i) =>
          i.id === item.id && i.option === option ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevCart, { ...item, quantity: 1, option }];
    });
  };

  const removeFromCart = (itemId, option) => {
    setCart((prevCart) => prevCart.filter((i) => !(i.id === itemId && i.option === option)));
  };

  const updateQuantity = (itemId, option, change) => {
    setCart((prevCart) => {
      return prevCart
        .map((i) => {
          if (i.id === itemId && i.option === option) {
            const nextQty = i.quantity + change;
            return { ...i, quantity: nextQty };
          }
          return i;
        })
        .filter((i) => i.quantity > 0);
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  // Calculations (clean number format)
  const parsePrice = (priceStr) => {
    const num = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
    return isNaN(num) ? 0 : num;
  };

  const subtotal = cart.reduce((sum, item) => sum + parsePrice(item.price) * item.quantity, 0);
  const gst = parseFloat((subtotal * 0.05).toFixed(2)); // 5% GST
  const packagingFee = subtotal > 0 ? 30 : 0; // ₹30 flat container fee
  const grandTotal = Math.round(subtotal + gst + packagingFee);

  // Place Order
  const placeOrder = (customerName, customerPhone) => {
    if (cart.length === 0) return null;

    const uniqueId = 'ORD-' + Math.floor(1000 + Math.random() * 9000);
    const pickupCode = 'CF-' + Math.floor(100 + Math.random() * 900);

    const newOrder = {
      order_id: uniqueId,
      pickup_code: pickupCode,
      customer_name: customerName,
      customer_phone: customerPhone,
      items: cart.map(i => ({
        id: i.id,
        name: i.name,
        quantity: i.quantity,
        option: i.option,
        price: i.price
      })),
      status: 'Pending',
      created_at: new Date().toISOString(),
      subtotal: `₹${subtotal}`,
      gst: `₹${gst}`,
      packaging_fee: `₹${packagingFee}`,
      grand_total: `₹${grandTotal}`,
      restaurant: 'coffeed_cafe'
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  // Update order status on KDS board
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) => {
      const updated = prev.map((order) => 
        order.order_id === orderId ? { ...order, status: newStatus } : order
      );
      localStorage.setItem('coffeed_orders', JSON.stringify(updated));
      return updated;
    });
  };

  // Place Reservation
  const placeReservation = (reservationData) => {
    const newReservation = {
      id: 'RES-' + Math.floor(1000 + Math.random() * 9000),
      customer_name: reservationData.name,
      customer_phone: reservationData.phone,
      date: reservationData.date,
      time: reservationData.time,
      guests: reservationData.guests,
      status: 'Confirmed',
      created_at: new Date().toISOString()
    };

    setReservations((prev) => {
      const updated = [newReservation, ...prev];
      localStorage.setItem('coffeed_reservations', JSON.stringify(updated));
      return updated;
    });
    return newReservation;
  };

  // Update Reservation Status (Confirmed -> Seated -> Completed)
  const updateReservationStatus = (resId, newStatus) => {
    setReservations((prev) => {
      const updated = prev.map((res) => (res.id === resId ? { ...res, status: newStatus } : res));
      localStorage.setItem('coffeed_reservations', JSON.stringify(updated));
      return updated;
    });
  };

  // Wipe daily database logs (End of Day reset)
  const clearAllData = () => {
    setOrders([]);
    setReservations([]);
    localStorage.removeItem('coffeed_orders');
    localStorage.removeItem('coffeed_reservations');
  };

  return (
    <OrderContext.Provider
      value={{
        cart,
        isCartOpen,
        orders,
        reservations,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal: `₹${subtotal}`,
        gst: `₹${gst}`,
        packagingFee: `₹${packagingFee}`,
        grandTotal: `₹${grandTotal}`,
        placeOrder,
        updateOrderStatus,
        placeReservation,
        updateReservationStatus,
        clearAllData,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
