import React, { useEffect, useState } from 'react';
import { useOrder } from '../context/OrderContext';
import { Clock, CheckCircle2, ShoppingBag, Coffee, ArrowRight, ArrowLeft } from 'lucide-react';

export default function OrderTracker({ orderId, onBack }) {
  const { orders } = useOrder();
  const [currentOrder, setCurrentOrder] = useState(null);

  // Sync current order data from OrderContext (which syncs from LocalStorage in real-time)
  useEffect(() => {
    const matched = orders.find(o => o.order_id === orderId);
    if (matched) {
      setCurrentOrder(matched);
    }
  }, [orders, orderId]);

  if (!currentOrder) {
    return (
      <div className="p-8 text-center text-espresso-750">
        <p className="font-serif font-bold">Loading active order tracker...</p>
      </div>
    );
  }

  const steps = [
    { label: 'Order Placed', status: 'Pending', desc: 'Waiting for kitchen approval', icon: <ShoppingBag className="w-5 h-5" /> },
    { label: 'In the Kitchen', status: 'Preparing', desc: 'Baristas are crafting your blend', icon: <Coffee className="w-5 h-5" /> },
    { label: 'Ready for Pickup', status: 'Ready', desc: 'Freshly prepped & waiting at counter', icon: <CheckCircle2 className="w-5 h-5" /> },
    { label: 'Served', status: 'Served', desc: 'Enjoy your artisanal experience', icon: <CheckCircle2 className="w-5 h-5" /> }
  ];

  // Determine current active step index
  const getActiveStepIndex = () => {
    switch (currentOrder.status) {
      case 'Pending': return 0;
      case 'Preparing': return 1;
      case 'Ready': return 2;
      case 'Served': return 3;
      default: return 0;
    }
  };

  const activeIndex = getActiveStepIndex();

  return (
    <div className="w-full space-y-8 animate-fade-in font-sans">
      
      {/* Tracker Timeline Stepper */}
      <div className="bg-cream-100 rounded-3xl p-6 sm:p-8 border border-cream-200 shadow-soft">
        <h3 className="font-serif font-black text-lg text-espresso-950 mb-6 flex items-center gap-2">
          <Clock className="w-5 h-5 text-matcha-500" />
          Real-Time Prep Tracker
        </h3>

        {/* Desktop Stepper */}
        <div className="hidden sm:flex justify-between items-start relative pb-4">
          {/* Progress bar line */}
          <div className="absolute top-[22px] left-[12%] right-[12%] h-1 bg-cream-200 -z-0">
            <div 
              className="h-full bg-matcha-500 transition-all duration-500" 
              style={{ width: `${(activeIndex / (steps.length - 1)) * 100}%` }}
            />
          </div>

          {steps.map((step, idx) => {
            const isCompleted = idx < activeIndex;
            const isActive = idx === activeIndex;
            const isPending = idx > activeIndex;

            return (
              <div key={step.status} className="flex-1 flex flex-col items-center text-center z-10">
                {/* Stepper Node Icon */}
                <div className={`w-11 h-11 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-matcha-500 border-matcha-500 text-white shadow-soft' 
                    : isActive 
                      ? 'bg-white border-espresso-900 text-espresso-900 shadow-premium animate-pulse scale-110' 
                      : 'bg-white border-cream-200 text-espresso-300'
                }`}>
                  {step.icon}
                </div>

                {/* Step Labels */}
                <h4 className={`font-serif font-bold text-xs mt-3 ${isActive ? 'text-espresso-950 font-black' : 'text-espresso-800'}`}>
                  {step.label}
                </h4>
                <p className="text-[10px] text-espresso-600 mt-1 max-w-[100px] leading-tight">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Mobile Stepper (Vertical Timeline) */}
        <div className="sm:hidden space-y-6 relative pl-6 before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-0.5 before:bg-cream-200">
          {/* Mobile active progress bar overlay */}
          <div 
            className="absolute left-[17px] top-2 w-0.5 bg-matcha-500 transition-all duration-550"
            style={{ height: `${(activeIndex / (steps.length - 1)) * 88}%` }}
          />

          {steps.map((step, idx) => {
            const isCompleted = idx < activeIndex;
            const isActive = idx === activeIndex;

            return (
              <div key={step.status} className="flex gap-4 relative z-10 items-start">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 flex-shrink-0 transition-all ${
                  isCompleted 
                    ? 'bg-matcha-500 border-matcha-500 text-white' 
                    : isActive 
                      ? 'bg-white border-espresso-900 text-espresso-900 shadow-premium scale-105 animate-pulse' 
                      : 'bg-white border-cream-200 text-espresso-300'
                }`}>
                  {step.icon}
                </div>
                <div className="pt-0.5">
                  <h4 className={`font-serif font-bold text-xs ${isActive ? 'text-espresso-950' : 'text-espresso-800'}`}>
                    {step.label}
                  </h4>
                  <p className="text-[10px] text-espresso-600 mt-0.5">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Itemized Digital Bill / Receipt */}
      <div className="bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 border border-cream-200 shadow-premium relative overflow-hidden">
        
        {/* Receipt Top Jagged Decorative Edge */}
        <div className="absolute top-0 inset-x-0 h-1 bg-[radial-gradient(circle_at_bottom,_transparent_4px,_#FAF7F2_4px)] bg-[length:12px_8px]" />

        {/* Brand Stamp */}
        <div className="flex flex-col items-center justify-center text-center pb-6 border-b border-dashed border-cream-200 pt-2">
          <div className="font-serif text-2xl font-black text-espresso-950 uppercase tracking-widest">
            COFFEED CAFE
          </div>
          <p className="text-[10px] uppercase font-bold text-espresso-600 tracking-wider mt-1">
            Artisanal Pour-Overs & Bakes
          </p>
          <span className="block text-[9px] font-mono text-neutral-400 mt-1">
            Bill Receipt: #{currentOrder.order_id}
          </span>
        </div>

        {/* Receipt Core Metadata */}
        <div className="py-4 text-xs font-mono text-espresso-800 space-y-1.5 border-b border-dashed border-cream-200">
          <div className="flex justify-between">
            <span>Customer:</span>
            <span className="font-bold text-espresso-900">{currentOrder.customer_name}</span>
          </div>
          <div className="flex justify-between">
            <span>Phone:</span>
            <span>{currentOrder.customer_phone}</span>
          </div>
          <div className="flex justify-between">
            <span>Date Placed:</span>
            <span>{new Date(currentOrder.created_at).toLocaleString([], { hour12: true })}</span>
          </div>
          <div className="flex justify-between">
            <span>Pickup Code:</span>
            <span className="font-bold bg-matcha-100 text-matcha-700 px-2 py-0.5 rounded-md font-mono text-sm">
              {currentOrder.pickup_code}
            </span>
          </div>
        </div>

        {/* Receipt Items list */}
        <div className="py-5 border-b border-dashed border-cream-200">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="font-mono text-neutral-400 uppercase text-[9px] border-b border-cream-100 pb-2">
                <th className="font-bold py-1">Item Description</th>
                <th className="font-bold py-1 text-center">Qty</th>
                <th className="font-bold py-1 text-right">Price</th>
              </tr>
            </thead>
            <tbody>
              {currentOrder.items.map((item, idx) => (
                <tr key={idx} className="border-b border-cream-50 hover:bg-cream-50/20">
                  <td className="py-2.5">
                    <span className="font-serif font-bold text-espresso-950">{item.name}</span>
                    <span className="block text-[9px] font-mono text-matcha-600 uppercase mt-0.5">({item.option})</span>
                  </td>
                  <td className="py-2.5 text-center font-mono">{item.quantity}</td>
                  <td className="py-2.5 text-right font-mono font-bold text-espresso-900">{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pricing Totals */}
        <div className="py-4 space-y-2 border-b border-cream-200 text-xs font-mono text-espresso-800">
          {/* Subtotals & Taxes calculated from context totals */}
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-bold">
              {currentOrder.subtotal || (() => {
                const totalVal = currentOrder.grand_total ? parseFloat(currentOrder.grand_total.replace(/[^\d.]/g, '')) : 0;
                const isK = currentOrder.grand_total && currentOrder.grand_total.includes('K');
                const pkg = isK ? 3 : 30;
                const sub = (totalVal - pkg) / 1.05;
                const cleanSub = sub > 0 ? (isK ? sub.toFixed(1) : Math.round(sub)) : 0;
                return isK ? `${cleanSub} K` : `₹${cleanSub}`;
              })()}
            </span>
          </div>
          <div className="flex justify-between">
            <span>GST (5%)</span>
            <span className="font-bold">
              {currentOrder.gst || (() => {
                const totalVal = currentOrder.grand_total ? parseFloat(currentOrder.grand_total.replace(/[^\d.]/g, '')) : 0;
                const isK = currentOrder.grand_total && currentOrder.grand_total.includes('K');
                const pkg = isK ? 3 : 30;
                const sub = (totalVal - pkg) / 1.05;
                const gstVal = sub > 0 ? sub * 0.05 : 0;
                return isK ? `${gstVal.toFixed(1)} K` : `₹${gstVal.toFixed(2)}`;
              })()}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Eco-Packaging Charge</span>
            <span className="font-bold">
              {currentOrder.packaging_fee || (() => {
                const isK = currentOrder.grand_total && currentOrder.grand_total.includes('K');
                const totalVal = currentOrder.grand_total ? parseFloat(currentOrder.grand_total.replace(/[^\d.]/g, '')) : 0;
                if (totalVal <= 0) return isK ? '0.0 K' : '₹0';
                return isK ? '3.0 K' : '₹30';
              })()}
            </span>
          </div>
          <div className="flex justify-between text-sm font-serif font-black text-espresso-950 pt-2 border-t border-cream-100">
            <span>Grand Total Paid</span>
            <span className="text-matcha-600 text-base">
              {currentOrder.grand_total && !currentOrder.grand_total.startsWith('₹') && !currentOrder.grand_total.includes('K') 
                ? `₹${currentOrder.grand_total}` 
                : currentOrder.grand_total}
            </span>
          </div>
        </div>

        {/* Fake Scan Code placeholder representing premium aesthetics */}
        <div className="pt-6 pb-2 flex flex-col items-center justify-center">
          <div className="w-28 h-28 bg-white border border-cream-200 p-2 rounded-2xl flex items-center justify-center">
            {/* Custom stylized QR Code using SVG lines */}
            <svg viewBox="0 0 100 100" className="w-full h-full text-espresso-900" fill="currentColor">
              {/* Corner Blocks */}
              <rect x="0" y="0" width="25" height="25" />
              <rect x="2" y="2" width="21" height="21" fill="white" />
              <rect x="6" y="6" width="13" height="13" />

              <rect x="75" y="0" width="25" height="25" />
              <rect x="77" y="2" width="21" height="21" fill="white" />
              <rect x="81" y="6" width="13" height="13" />

              <rect x="0" y="75" width="25" height="25" />
              <rect x="2" y="77" width="21" height="21" fill="white" />
              <rect x="6" y="81" width="13" height="13" />

              {/* Styled barcode matrix details inside */}
              <rect x="35" y="5" width="10" height="10" />
              <rect x="50" y="10" width="15" height="5" />
              <rect x="35" y="25" width="5" height="20" />
              <rect x="50" y="25" width="20" height="5" />
              <rect x="45" y="45" width="10" height="10" />
              <rect x="65" y="45" width="5" height="15" />
              <rect x="20" y="55" width="15" height="5" />
              <rect x="75" y="65" width="20" height="5" />
              <rect x="35" y="70" width="5" height="15" />
              <rect x="45" y="80" width="25" height="10" />
              <rect x="80" y="80" width="10" height="10" />
            </svg>
          </div>
          <span className="text-[9px] font-mono text-neutral-400 mt-2 uppercase tracking-wider">
            Scan to claim pickup
          </span>
        </div>

      </div>

      {/* Back CTA Button */}
      {onBack && (
        <button
          onClick={onBack}
          className="w-full flex items-center justify-center gap-2 bg-espresso-900 text-cream-50 hover:bg-matcha-500 hover:text-white py-4 rounded-full font-sans font-bold text-sm tracking-wide transition-all duration-300 shadow-soft"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Cafe Menu
        </button>
      )}

    </div>
  );
}
