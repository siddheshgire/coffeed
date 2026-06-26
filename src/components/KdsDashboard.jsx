import React, { useState, useEffect, useRef } from 'react';
import { useOrder } from '../context/OrderContext';
import { Lock, LogOut, Clock, Send, Coffee, RefreshCw, CheckCircle2, Calendar, Phone, Users, BarChart3, TrendingUp, IndianRupee, Trash2 } from 'lucide-react';

export default function KdsDashboard({ onClose }) {
  const { orders, reservations, updateOrderStatus, updateReservationStatus, clearAllData } = useOrder();
  
  // Authentication Gate State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('coffeed_kds_auth') === 'true';
  });
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);

  // KDS view toggle: 'orders' | 'reservations' | 'sales'
  const [kdsView, setKdsView] = useState('orders');

  // KDS Column switcher for mobile responsiveness
  const [mobileTab, setMobileTab] = useState('Pending'); // 'Pending', 'Preparing', 'Ready'
  
  // Wipe double-confirmation state
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  // Audio chime state
  const prevOrdersCount = useRef(orders.length);

  // Dynamic interval tick for aging timers (updates labels every minute)
  const [timeTick, setTimeTick] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeTick(prev => prev + 1);
    }, 30000); // Trigger re-render every 30 seconds
    return () => clearInterval(timer);
  }, []);

  // Play bell chime on new incoming orders
  useEffect(() => {
    if (orders.length > prevOrdersCount.current) {
      const latestOrder = orders[0];
      if (latestOrder && latestOrder.status === 'Pending') {
        playZenChime();
      }
    }
    prevOrdersCount.current = orders.length;
  }, [orders]);

  // Synthesize bell chime using Web Audio API
  const playZenChime = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5 note
      osc.frequency.exponentialRampToValueAtTime(293.66, ctx.currentTime + 1.2); // D4 note

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.5);
    } catch (e) {
      console.log('Audio chime synthesis bypassed:', e);
    }
  };

  // PIN check (Passcode: 4321)
  const handlePinPress = (num) => {
    if (pin.length < 4) {
      const nextPin = pin + num;
      setPin(nextPin);
      if (nextPin === '4321') {
        sessionStorage.setItem('coffeed_kds_auth', 'true');
        setIsAuthenticated(true);
        setPin('');
      } else if (nextPin.length === 4) {
        setPinError(true);
        setTimeout(() => {
          setPin('');
          setPinError(false);
        }, 1000);
      }
    }
  };

  const handleClearPin = () => {
    setPin('');
  };

  // Keyboard event listener for passcode input
  useEffect(() => {
    if (isAuthenticated) return;

    const handleKeyDown = (e) => {
      // Ignore keypresses if input is focused
      if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
        return;
      }
      
      const key = e.key;
      if (key >= '0' && key <= '9') {
        handlePinPress(key);
      } else if (key === 'Backspace') {
        setPin(prev => prev.slice(0, -1));
      } else if (key === 'Delete') {
        handleClearPin();
      } else if (key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthenticated, pin, onClose]);

  const handleLogout = () => {
    sessionStorage.removeItem('coffeed_kds_auth');
    setIsAuthenticated(false);
    onClose(); // Exit dashboard back to public site
  };

  const handleResetData = () => {
    clearAllData();
    setShowConfirmReset(false);
  };

  const getMinutesElapsed = (createdAt) => {
    const elapsedMs = Date.now() - new Date(createdAt).getTime();
    return Math.floor(elapsedMs / 60000);
  };

  const pendingOrders = orders.filter(o => o.status === 'Pending');
  const preparingOrders = orders.filter(o => o.status === 'Preparing');
  const readyOrders = orders.filter(o => o.status === 'Ready');
  const servedOrders = orders.filter(o => o.status === 'Served');
  const activeCount = pendingOrders.length + preparingOrders.length;

  const getOrderStatusCardBorder = (createdAt, status) => {
    if (status === 'Ready' || status === 'Served') return 'border-cream-200';
    
    const minutes = getMinutesElapsed(createdAt);
    if (minutes >= 15) return 'border-red-400 border-2 animate-pulse bg-red-50/20'; // Critical
    if (minutes >= 8) return 'border-amber-400 border-2 bg-amber-50/10'; // Warning
    return 'border-cream-200';
  };

  const getOrderStatusCardTimerLabel = (createdAt, status) => {
    const minutes = getMinutesElapsed(createdAt);
    if (status === 'Ready') return 'Ready to pickup';
    
    if (minutes < 1) return 'Placed just now';
    if (minutes >= 15) return `🚨 Late (${minutes}m ago)`;
    if (minutes >= 8) return `⚠️ Delayed (${minutes}m ago)`;
    return `Placed ${minutes}m ago`;
  };

  // WhatsApp redirect notification
  const handleSendWhatsAppNotification = (order) => {
    const message = `Hello ${order.customer_name}! ☕ Your order ${order.pickup_code} at Coffeed is ready for pickup! Grab it from the counter while it's fresh and hot. Thank you!`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${order.customer_phone.replace(/\D/g, '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  // Parse price strings (e.g. "21 K" to 21)
  const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    const num = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
    return isNaN(num) ? 0 : num;
  };

  // Sales Analytics Calculations
  const totalSalesRevenue = servedOrders.reduce((sum, order) => sum + parsePrice(order.grand_total), 0);
  const averageOrderValue = servedOrders.length > 0 ? (totalSalesRevenue / servedOrders.length).toFixed(1) : '0';
  const completedReservationsCount = reservations.filter(r => r.status === 'Completed' || r.status === 'Seated').length;

  // Aggregate Top Selling Items
  const getItemSalesDistribution = () => {
    const counts = {};
    servedOrders.forEach(order => {
      order.items.forEach(item => {
        counts[item.name] = (counts[item.name] || 0) + item.quantity;
      });
    });
    return Object.entries(counts)
      .map(([name, qty]) => ({ name, qty }))
      .sort((a, b) => b.qty - a.qty)
      .slice(0, 5); // top 5
  };

  const topSellingItems = getItemSalesDistribution();

  // Security View
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center px-4 py-12">
        <div className="max-w-sm w-full bg-white rounded-3xl border border-cream-200 shadow-premium p-8 flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-matcha-100 text-matcha-700 flex items-center justify-center mb-4">
            <Lock size={20} />
          </div>
          <h2 className="font-serif text-xl font-black text-espresso-900 mb-1">KDS GATEWAY</h2>
          <p className="text-xs text-espresso-600 text-center mb-6 leading-relaxed">
            Enter the 4-digit passcode to access the kitchen panel. <br/>
            <span className="font-bold text-[10px] text-matcha-600">Passcode Hint: 4321</span>
          </p>

          {/* Dots Indicator */}
          <div className="flex gap-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <span
                key={i}
                className={`w-3.5 h-3.5 rounded-full border border-cream-300 transition-all duration-100 ${
                  pinError
                    ? 'bg-red-500 border-red-600 scale-110'
                    : i < pin.length
                      ? 'bg-espresso-900 scale-110'
                      : 'bg-neutral-100'
                }`}
              />
            ))}
          </div>

          {/* Number Keypad */}
          <div className="grid grid-cols-3 gap-3 w-full">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                onClick={() => handlePinPress(num.toString())}
                className="py-3 text-lg font-bold bg-cream-50 hover:bg-cream-100 text-espresso-900 rounded-xl border border-cream-200 active:scale-95 transition-all cursor-pointer flex items-center justify-center"
              >
                {num}
              </button>
            ))}
            <button
              onClick={handleClearPin}
              className="py-3 text-xs font-bold uppercase tracking-wider text-red-500 hover:bg-red-50 rounded-xl border border-red-100 active:scale-95 transition-all cursor-pointer flex items-center justify-center"
            >
              Clear
            </button>
            <button
              onClick={() => handlePinPress('0')}
              className="py-3 text-lg font-bold bg-cream-50 hover:bg-cream-100 text-espresso-900 rounded-xl border border-cream-200 active:scale-95 transition-all cursor-pointer flex items-center justify-center"
            >
              0
            </button>
            <button
              onClick={onClose}
              className="py-3 text-xs font-bold uppercase tracking-wider text-espresso-600 hover:bg-cream-100 rounded-xl border border-cream-200 active:scale-95 transition-all cursor-pointer flex items-center justify-center"
            >
              Exit
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50 flex flex-col font-sans">
      
      {/* Header bar */}
      <div className="bg-espresso-900 text-cream-50 py-4 px-4 sm:px-6 lg:px-8 border-b border-espresso-800 shadow-soft flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="flex items-center gap-3">
          <span className="w-9 h-9 rounded-full bg-matcha-400 text-espresso-950 flex items-center justify-center font-serif text-lg font-bold">
            C
          </span>
          <div>
            <h1 className="font-serif text-lg font-bold tracking-wider text-white m-0 leading-tight">COFFEED KITCHEN</h1>
            <p className="text-[9px] uppercase tracking-widest text-matcha-300 font-medium">Real-Time Kitchen Display System (KDS)</p>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex bg-espresso-800 p-1 rounded-xl border border-espresso-750">
          <button
            onClick={() => setKdsView('orders')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
              kdsView === 'orders'
                ? 'bg-cream-100 text-espresso-900 shadow-sm'
                : 'text-cream-200 hover:text-white'
            }`}
          >
            Active Orders ({pendingOrders.length + preparingOrders.length + readyOrders.length})
          </button>
          <button
            onClick={() => setKdsView('reservations')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
              kdsView === 'reservations'
                ? 'bg-cream-100 text-espresso-900 shadow-sm'
                : 'text-cream-200 hover:text-white'
            }`}
          >
            Table Bookings ({reservations.filter(r => r.status === 'Confirmed').length})
          </button>
          <button
            onClick={() => setKdsView('sales')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
              kdsView === 'sales'
                ? 'bg-cream-100 text-espresso-900 shadow-sm'
                : 'text-cream-200 hover:text-white'
            }`}
          >
            Sales & History
          </button>
        </div>

        {/* Action Header Button */}
        <div className="flex items-center gap-4 flex-wrap">
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs bg-red-600 hover:bg-red-700 text-white font-bold px-3.5 py-2 rounded-xl border border-red-700 shadow-sm cursor-pointer transition-colors"
          >
            <LogOut size={13} />
            <span>Lock KDS</span>
          </button>
        </div>
      </div>

      {/* Main Panel Content */}
      <div className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        
        {kdsView === 'orders' ? (
          /* ORDERS COLUMN DISPLAY */
          <>
            {/* Mobile Column Selector */}
            <div className="md:hidden flex bg-white border border-cream-200 rounded-2xl overflow-hidden mb-6 shadow-soft">
              {[
                { label: 'Pending', count: pendingOrders.length, color: 'bg-red-400' },
                { label: 'Preparing', count: preparingOrders.length, color: 'bg-amber-400' },
                { label: 'Ready', count: readyOrders.length, color: 'bg-green-500' }
              ].map((tab) => (
                <button
                  key={tab.label}
                  onClick={() => setMobileTab(tab.label)}
                  className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider text-center transition-all cursor-pointer ${
                    mobileTab === tab.label
                      ? 'bg-cream-100 text-espresso-900 border-b-2 border-matcha-500'
                      : 'text-espresso-600/60 hover:bg-cream-50'
                  }`}
                >
                  <span className="inline-flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${tab.color}`} />
                    {tab.label} ({tab.count})
                  </span>
                </button>
              ))}
            </div>

            {/* Columns Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full items-start">
              
              {/* PENDING COLUMN */}
              <div className={`space-y-4 ${mobileTab !== 'Pending' ? 'hidden md:block' : ''}`}>
                <div className="flex justify-between items-center border-b border-cream-200 pb-2.5">
                  <h3 className="font-serif text-sm font-bold text-espresso-900 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                    <span>Pending Orders</span>
                  </h3>
                  <span className="bg-white text-espresso-850 font-bold px-2 py-0.5 rounded-lg text-xs border border-cream-200">
                    {pendingOrders.length}
                  </span>
                </div>

                <div className="space-y-4">
                  {pendingOrders.map(order => (
                    <OrderKdsCard 
                      key={order.order_id}
                      order={order}
                      borderStyle={getOrderStatusCardBorder(order.created_at, 'Pending')}
                      timerLabel={getOrderStatusCardTimerLabel(order.created_at, 'Pending')}
                      onUpdate={updateOrderStatus}
                    />
                  ))}
                  {pendingOrders.length === 0 && <EmptyColumnState label="No pending orders" />}
                </div>
              </div>

              {/* PREPARING COLUMN */}
              <div className={`space-y-4 ${mobileTab !== 'Preparing' ? 'hidden md:block' : ''}`}>
                <div className="flex justify-between items-center border-b border-cream-200 pb-2.5">
                  <h3 className="font-serif text-sm font-bold text-espresso-900 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                    <span>Preparing</span>
                  </h3>
                  <span className="bg-white text-espresso-850 font-bold px-2 py-0.5 rounded-lg text-xs border border-cream-200">
                    {preparingOrders.length}
                  </span>
                </div>

                <div className="space-y-4">
                  {preparingOrders.map(order => (
                    <OrderKdsCard 
                      key={order.order_id}
                      order={order}
                      borderStyle={getOrderStatusCardBorder(order.created_at, 'Preparing')}
                      timerLabel={getOrderStatusCardTimerLabel(order.created_at, 'Preparing')}
                      onUpdate={updateOrderStatus}
                    />
                  ))}
                  {preparingOrders.length === 0 && <EmptyColumnState label="No prepping orders" />}
                </div>
              </div>

              {/* READY COLUMN */}
              <div className={`space-y-4 ${mobileTab !== 'Ready' ? 'hidden md:block' : ''}`}>
                <div className="flex justify-between items-center border-b border-cream-200 pb-2.5">
                  <h3 className="font-serif text-sm font-bold text-espresso-900 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                    <span>Ready for Pickup</span>
                  </h3>
                  <span className="bg-white text-espresso-850 font-bold px-2 py-0.5 rounded-lg text-xs border border-cream-200">
                    {readyOrders.length}
                  </span>
                </div>

                <div className="space-y-4">
                  {readyOrders.map(order => (
                    <OrderKdsCard 
                      key={order.order_id}
                      order={order}
                      borderStyle={getOrderStatusCardBorder(order.created_at, 'Ready')}
                      timerLabel={getOrderStatusCardTimerLabel(order.created_at, 'Ready')}
                      onUpdate={updateOrderStatus}
                      onWhatsApp={handleSendWhatsAppNotification}
                    />
                  ))}
                  {readyOrders.length === 0 && <EmptyColumnState label="No ready orders" />}
                </div>
              </div>

            </div>
          </>
        ) : kdsView === 'reservations' ? (
          /* RESERVATIONS TABLE VIEW */
          <div className="bg-white rounded-3xl border border-cream-200 shadow-soft overflow-hidden p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-cream-100 pb-4 mb-6 gap-4">
              <div>
                <h3 className="font-serif font-black text-xl text-espresso-900">Reservations Directory</h3>
                <p className="text-xs text-espresso-600">Track and manage spots booked using the "Reserve Your Spot" widget.</p>
              </div>
              <span className="bg-matcha-100 text-matcha-700 font-sans text-xs font-bold px-3 py-1 rounded-full border border-matcha-200">
                Active Bookings: {reservations.filter(r => r.status === 'Confirmed').length}
              </span>
            </div>

            {reservations.length === 0 ? (
              <div className="py-16 text-center text-espresso-500 flex flex-col items-center">
                <Calendar className="w-12 h-12 text-cream-300 mb-2" />
                <p className="text-sm font-sans">No reservations placed yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-cream-200 text-espresso-700 bg-cream-50/50">
                      <th className="p-4 font-bold">Booking ID</th>
                      <th className="p-4 font-bold">Customer Name</th>
                      <th className="p-4 font-bold">Phone Number</th>
                      <th className="p-4 font-bold">Date & Time</th>
                      <th className="p-4 font-bold text-center">Party Size</th>
                      <th className="p-4 font-bold">Status</th>
                      <th className="p-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.map((res) => (
                      <tr key={res.id} className="border-b border-cream-100 hover:bg-cream-50/30 transition-colors">
                        <td className="p-4 font-mono font-bold text-xs text-matcha-600">{res.id}</td>
                        <td className="p-4 font-serif font-bold text-espresso-900">{res.customer_name}</td>
                        <td className="p-4 font-mono text-xs">{res.customer_phone}</td>
                        <td className="p-4 text-xs font-semibold text-espresso-750">
                          <span className="block">{res.date}</span>
                          <span className="text-[10px] text-espresso-500">{res.time}</span>
                        </td>
                        <td className="p-4 text-center font-bold text-espresso-900">{res.guests} Guests</td>
                        <td className="p-4">
                          <span className={`text-[10px] font-sans font-black px-2.5 py-0.5 rounded-full border ${
                            res.status === 'Confirmed'
                              ? 'bg-matcha-100 text-matcha-700 border-matcha-200'
                              : res.status === 'Seated'
                                ? 'bg-amber-100 text-amber-700 border-amber-200'
                                : 'bg-neutral-100 text-neutral-600 border-neutral-200'
                          }`}>
                            {res.status}
                          </span>
                        </td>
                        <td className="p-4 text-right space-x-2 whitespace-nowrap">
                          {res.status === 'Confirmed' && (
                            <button
                              onClick={() => updateReservationStatus(res.id, 'Seated')}
                              className="bg-espresso-900 hover:bg-matcha-500 text-cream-50 text-[11px] font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer animate-fade-in"
                            >
                              Seat Guest
                            </button>
                          )}
                          {res.status === 'Seated' && (
                            <button
                              onClick={() => updateReservationStatus(res.id, 'Completed')}
                              className="bg-matcha-500 hover:bg-matcha-600 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer animate-fade-in"
                            >
                              Mark Completed
                            </button>
                          )}
                          {(res.status === 'Completed' || res.status === 'Cancelled') && (
                            <span className="text-xs text-neutral-400 italic">No actions</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : (
          /* DAILY SALES & TRANSACTION LEDGER VIEW */
          <div className="space-y-8 animate-fade-in">
            
            {/* Sales Dashboard Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
              
              {/* Gross Revenue Card */}
              <div className="bg-white border border-cream-200 shadow-soft p-6 rounded-3xl flex items-center gap-4">
                <div className="p-4 bg-matcha-100 text-matcha-700 rounded-2xl">
                  <IndianRupee className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-espresso-600 uppercase tracking-widest block">Daily Revenue</span>
                  <span className="font-serif text-2xl font-black text-espresso-900">₹{totalSalesRevenue.toFixed(2)}</span>
                  <span className="block text-[9px] text-neutral-450 mt-0.5">From completed sales</span>
                </div>
              </div>

              {/* Servings Card */}
              <div className="bg-white border border-cream-200 shadow-soft p-6 rounded-3xl flex items-center gap-4">
                <div className="p-4 bg-amber-100 text-amber-700 rounded-2xl">
                  <Coffee className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-espresso-600 uppercase tracking-widest block">Served Orders</span>
                  <span className="font-serif text-2xl font-black text-espresso-900">{servedOrders.length} Bills</span>
                  <span className="block text-[9px] text-neutral-450 mt-0.5">{activeCount} active in queue</span>
                </div>
              </div>

              {/* AOV Card */}
              <div className="bg-white border border-cream-200 shadow-soft p-6 rounded-3xl flex items-center gap-4">
                <div className="p-4 bg-cream-100 text-espresso-900 rounded-2xl">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-espresso-600 uppercase tracking-widest block">Avg Order Value</span>
                  <span className="font-serif text-2xl font-black text-espresso-900">₹{parseFloat(averageOrderValue).toFixed(2)}</span>
                  <span className="block text-[9px] text-neutral-450 mt-0.5">Average ticket size</span>
                </div>
              </div>

              {/* Reservation Stats Card */}
              <div className="bg-white border border-cream-200 shadow-soft p-6 rounded-3xl flex items-center gap-4">
                <div className="p-4 bg-matcha-50 text-matcha-600 rounded-2xl">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-espresso-600 uppercase tracking-widest block">Bookings Handled</span>
                  <span className="font-serif text-2xl font-black text-espresso-900">{completedReservationsCount} Tables</span>
                  <span className="block text-[9px] text-neutral-450 mt-0.5">Seated or completed</span>
                </div>
              </div>

            </div>

            {/* Popular Items Breakdown & Day operations Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Product Popularity chart list */}
              <div className="lg:col-span-7 bg-white border border-cream-200 shadow-soft rounded-3xl p-6 sm:p-8">
                <h3 className="font-serif font-black text-lg text-espresso-900 mb-6 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-matcha-500" />
                  Top Selling Products Today
                </h3>

                {topSellingItems.length === 0 ? (
                  <p className="text-xs text-neutral-400 italic py-6">No served items to compute popularity stats.</p>
                ) : (
                  <div className="space-y-4">
                    {topSellingItems.map((item, idx) => {
                      const maxQty = topSellingItems[0]?.qty || 1;
                      const percentage = (item.qty / maxQty) * 100;
                      return (
                        <div key={idx} className="space-y-1">
                          <div className="flex justify-between text-xs font-semibold">
                            <span className="text-espresso-900">{item.name}</span>
                            <span className="font-mono text-espresso-600">{item.qty} units</span>
                          </div>
                          <div className="w-full bg-cream-50 h-2.5 rounded-full overflow-hidden border border-cream-100">
                            <div 
                              className="bg-matcha-500 h-full rounded-full transition-all duration-500" 
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Maintenance Clear Card */}
              <div className="lg:col-span-5 bg-white border border-cream-200 shadow-soft rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-black text-lg text-espresso-900 mb-2">End of Day Reset</h3>
                  <p className="text-xs text-espresso-600 leading-relaxed">
                    At the end of your business hours, archive your ledger and reset KDS queue values to 0. This clears all active orders, reservation entries, and financial data logs.
                  </p>
                </div>

                <div className="pt-6">
                  {!showConfirmReset ? (
                    <button
                      onClick={() => setShowConfirmReset(true)}
                      className="w-full bg-red-50 hover:bg-red-100 text-red-650 hover:text-red-700 py-3.5 rounded-2xl font-sans font-bold text-xs tracking-wider uppercase border border-red-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                      Reset KDS Data Logs
                    </button>
                  ) : (
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-4 space-y-4 animate-pulse">
                      <p className="text-xs text-red-700 font-semibold leading-relaxed">
                        ⚠️ WARNING: This will permanently wipe all active orders, sales revenue, and table bookings. Are you absolutely sure?
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={handleResetData}
                          className="flex-1 bg-red-650 hover:bg-red-750 text-white font-bold text-xs py-2.5 rounded-xl transition-colors cursor-pointer"
                        >
                          Yes, Wipe Data
                        </button>
                        <button
                          onClick={() => setShowConfirmReset(false)}
                          className="flex-1 bg-white hover:bg-cream-100 border border-cream-200 text-espresso-900 font-bold text-xs py-2.5 rounded-xl transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Historical Transaction Ledger Table */}
            <div className="bg-white rounded-3xl border border-cream-200 shadow-soft overflow-hidden p-6 sm:p-8">
              <h3 className="font-serif font-black text-xl text-espresso-900 border-b border-cream-100 pb-4 mb-6">Daily Sales Ledger</h3>
              
              {orders.length === 0 ? (
                <div className="py-12 text-center text-espresso-500 flex flex-col items-center">
                  <Coffee className="w-12 h-12 text-cream-300 mb-2 animate-bounce" />
                  <p className="text-sm font-sans">No orders placed today.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-cream-200 text-espresso-700 bg-cream-50/50">
                        <th className="p-4 font-bold">Order ID</th>
                        <th className="p-4 font-bold">Customer Detail</th>
                        <th className="p-4 font-bold">Ordered Items</th>
                        <th className="p-4 font-bold">Timestamp</th>
                        <th className="p-4 font-bold">Status</th>
                        <th className="p-4 font-bold text-right">Total Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.order_id} className="border-b border-cream-100 hover:bg-cream-50/30 transition-colors">
                          <td className="p-4 font-mono font-bold text-xs">
                            <span className="block text-espresso-900">{order.pickup_code}</span>
                            <span className="text-[10px] text-neutral-400">{order.order_id}</span>
                          </td>
                          <td className="p-4 font-serif font-bold text-espresso-900 text-xs">
                            <span className="block">{order.customer_name}</span>
                            <span className="text-[10px] font-mono font-normal text-espresso-605">{order.customer_phone}</span>
                          </td>
                          <td className="p-4 text-xs font-semibold text-espresso-750">
                            {order.items.map((item, index) => (
                              <span key={index} className="inline-block bg-cream-100 text-espresso-850 px-2 py-0.5 rounded-md mr-1.5 mb-1">
                                {item.name} x{item.quantity}
                              </span>
                            ))}
                          </td>
                          <td className="p-4 text-xs text-neutral-450">
                            {new Date(order.created_at).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                          </td>
                          <td className="p-4">
                            <span className={`text-[10px] font-sans font-black px-2.5 py-0.5 rounded-full border ${
                              order.status === 'Served'
                                ? 'bg-neutral-100 text-neutral-600 border-neutral-200'
                                : order.status === 'Ready'
                                  ? 'bg-green-100 text-green-700 border-green-200'
                                  : order.status === 'Preparing'
                                    ? 'bg-amber-100 text-amber-700 border-amber-200'
                                    : 'bg-red-100 text-red-700 border-red-200'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="p-4 text-right font-serif font-black text-matcha-600 text-base">{order.grand_total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

// Order Kitchen Card
function OrderKdsCard({ order, borderStyle, timerLabel, onUpdate, onWhatsApp }) {
  const isLate = timerLabel.includes('Late') || timerLabel.includes('Delayed');

  return (
    <div className={`bg-white rounded-2xl shadow-soft border p-5 ${borderStyle} flex flex-col justify-between space-y-4 hover:shadow-premium transition-shadow duration-300`}>
      {/* Card Header */}
      <div className="flex justify-between items-start border-b border-cream-100 pb-3">
        <div>
          <span className="font-mono text-base font-extrabold text-espresso-950 tracking-wide">
            {order.pickup_code}
          </span>
          <span className="block text-[9px] text-neutral-400 font-mono mt-0.5">
            ID: {order.order_id}
          </span>
        </div>

        <div className={`flex items-center gap-1 text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${
          isLate 
            ? 'text-red-600 bg-red-50 border-red-100'
            : 'text-espresso-600 bg-cream-50 border-cream-100'
        }`}>
          <Clock size={10} />
          <span>{timerLabel}</span>
        </div>
      </div>

      {/* Customer Meta */}
      <div className="text-xs space-y-1 text-espresso-850">
        <div className="flex items-center gap-1.5"><Users size={12} className="text-espresso-400" /> Guest: <span className="font-bold text-espresso-900">{order.customer_name}</span></div>
        <div className="flex items-center gap-1.5"><Phone size={12} className="text-espresso-400" /> Phone: <span className="font-mono">{order.customer_phone}</span></div>
        <div className="text-[10px] text-neutral-400 italic mt-1">Placed: {new Date(order.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
      </div>

      {/* Items list */}
      <div className="p-3 bg-cream-50/70 rounded-xl border border-cream-200 text-xs space-y-2">
        <ul className="space-y-1.5">
          {order.items.map((item, idx) => (
            <li key={idx} className="flex justify-between items-center text-espresso-800">
              <span className="font-medium">
                {item.name} 
                <span className="ml-1.5 text-[9px] font-bold text-matcha-600 uppercase">({item.option})</span>
              </span>
              <span className="font-mono font-bold bg-matcha-100 text-matcha-700 px-1.5 py-0.5 rounded-md">
                x{item.quantity}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action triggers */}
      <div className="flex gap-2 pt-2">
        {order.status === 'Pending' && (
          <button
            onClick={() => onUpdate(order.order_id, 'Preparing')}
            className="w-full bg-espresso-900 hover:bg-matcha-500 text-cream-50 py-2.5 rounded-xl font-sans font-bold text-xs tracking-wider uppercase transition-colors cursor-pointer"
          >
            Start Preparing
          </button>
        )}

        {order.status === 'Preparing' && (
          <button
            onClick={() => onUpdate(order.order_id, 'Ready')}
            className="w-full bg-matcha-500 hover:bg-matcha-600 text-white py-2.5 rounded-xl font-sans font-bold text-xs tracking-wider uppercase transition-colors cursor-pointer"
          >
            Mark Ready
          </button>
        )}

        {order.status === 'Ready' && (
          <>
            <button
              onClick={() => onWhatsApp(order)}
              className="w-1/2 bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-xl font-sans font-bold text-[10px] uppercase flex items-center justify-center gap-1 cursor-pointer transition-colors"
            >
              <Send size={11} />
              <span>WhatsApp</span>
            </button>
            <button
              onClick={() => onUpdate(order.order_id, 'Served')}
              className="w-1/2 bg-espresso-900 hover:bg-matcha-500 text-cream-50 py-2.5 rounded-xl font-sans font-bold text-[10px] uppercase cursor-pointer transition-colors"
            >
              Serve Order
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// Empty State inside Column
function EmptyColumnState({ label }) {
  return (
    <div className="py-12 border border-dashed border-cream-300 rounded-2xl flex flex-col items-center justify-center text-espresso-400">
      <Coffee size={24} className="opacity-40 mb-2 animate-pulse" />
      <span className="text-[10px] font-bold font-sans uppercase tracking-wider">{label}</span>
    </div>
  );
}
