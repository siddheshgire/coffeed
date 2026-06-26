import React, { useState } from 'react';
import { Calendar, User, Phone, Clock, Users, CheckCircle2, Copy, Send } from 'lucide-react';
import { useOrder } from '../context/OrderContext';

export default function BookingForm() {
  const { placeReservation } = useOrder();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: '2'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [payloadPreview, setPayloadPreview] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Call context to persist the table booking in local state
    const reservation = placeReservation(formData);

    const payload = {
      event: 'table_reservation',
      timestamp: new Date().toISOString(),
      data: {
        reservation_id: reservation.id,
        customer_name: formData.name,
        customer_phone: formData.phone,
        reservation_date: formData.date,
        reservation_time: formData.time,
        party_size: parseInt(formData.guests, 10),
      },
      meta: {
        source: 'website_frontend',
        webhook_enabled: false
      }
    };

    // Log the JSON payload for the automation engineers
    console.log('--- Reservation Webhook JSON Payload ---', payload);
    setPayloadPreview(payload);

    // Simulate network delay to the webhook
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(payloadPreview, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      date: '',
      time: '',
      guests: '2'
    });
    setIsSubmitted(false);
    setPayloadPreview(null);
  };

  return (
    <section id="book-table" className="py-24 bg-cream-50 relative overflow-hidden">
      
      {/* Decorative Blur Backgrounds */}
      <div className="absolute right-0 bottom-0 w-[400px] h-[400px] bg-matcha-100/10 rounded-full filter blur-3xl -z-10" />
      <div className="absolute left-[10%] top-[10%] w-[300px] h-[300px] bg-cream-200/60 rounded-full filter blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[40px] shadow-premium border border-cream-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Info Panel Left */}
            <div className="lg:col-span-5 bg-espresso-900 text-cream-50 p-8 sm:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden">
              {/* Coffee bean outline bg */}
              <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#FAF7F2_1.5px,transparent_1.5px)] [background-size:20px_20px] pointer-events-none" />
              
              <div className="space-y-6 z-10">
                <span className="text-matcha-300 font-sans text-xs font-bold uppercase tracking-wider">
                  Reservations
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif font-black text-white tracking-tight leading-tight">
                  Reserve <br />Your Spot
                </h2>
                <p className="text-sm sm:text-base text-cream-200 font-sans leading-relaxed">
                  Avoid the wait list. Reserve your table ahead of time and experience our artisanal breakfast and signature pour-overs in a reserved seating space.
                </p>
              </div>

              <div className="mt-12 space-y-6 z-10 border-t border-espresso-800 pt-8">
                <div className="flex gap-4">
                  <div className="bg-espresso-800 text-goldAccent p-3 rounded-2xl h-fit">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-base text-white">Instant confirmation</h4>
                    <p className="text-xs text-cream-200 mt-0.5">Receive a confirmation SMS within 5 minutes.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-espresso-800 text-goldAccent p-3 rounded-2xl h-fit">
                    <Send className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-base text-white">Webhook & Automation Ready</h4>
                    <p className="text-xs text-cream-200 mt-0.5">Designed to trigger WhatsApp notifications automatically on submit.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-xs text-cream-300 z-10">
                For groups larger than 8, please email bookings@coffeed.com
              </div>
            </div>

            {/* Form Panel Right */}
            <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
              
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="font-serif font-black text-2xl text-espresso-900 mb-6">
                    Table Booking Details
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-xs font-sans font-bold text-espresso-800 uppercase tracking-wider">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-3.5 w-5 h-5 text-espresso-400" />
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Siddharth Sharma"
                          className="w-full pl-12 pr-4 py-3 bg-cream-50 border border-cream-200 rounded-2xl font-sans text-sm text-espresso-900 focus:outline-none focus:border-matcha-500 focus:ring-1 focus:ring-matcha-500 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <label htmlFor="phone" className="block text-xs font-sans font-bold text-espresso-800 uppercase tracking-wider">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-3.5 w-5 h-5 text-espresso-400" />
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+1 (555) 019-2834"
                          className="w-full pl-12 pr-4 py-3 bg-cream-50 border border-cream-200 rounded-2xl font-sans text-sm text-espresso-900 focus:outline-none focus:border-matcha-500 focus:ring-1 focus:ring-matcha-500 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {/* Date */}
                    <div className="space-y-2">
                      <label htmlFor="date" className="block text-xs font-sans font-bold text-espresso-800 uppercase tracking-wider">
                        Date
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-3.5 w-5 h-5 text-espresso-400 pointer-events-none" />
                        <input
                          type="date"
                          id="date"
                          name="date"
                          required
                          value={formData.date}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-3 bg-cream-50 border border-cream-200 rounded-2xl font-sans text-sm text-espresso-900 focus:outline-none focus:border-matcha-500 focus:ring-1 focus:ring-matcha-500 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Time */}
                    <div className="space-y-2">
                      <label htmlFor="time" className="block text-xs font-sans font-bold text-espresso-800 uppercase tracking-wider">
                        Time Slot
                      </label>
                      <div className="relative">
                        <Clock className="absolute left-4 top-3.5 w-5 h-5 text-espresso-400 pointer-events-none" />
                        <select
                          id="time"
                          name="time"
                          required
                          value={formData.time}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-3 bg-cream-50 border border-cream-200 rounded-2xl font-sans text-sm text-espresso-900 appearance-none focus:outline-none focus:border-matcha-500 focus:ring-1 focus:ring-matcha-500 transition-colors"
                        >
                          <option value="">Select Time</option>
                          <option value="08:00 AM">08:00 AM</option>
                          <option value="09:30 AM">09:30 AM</option>
                          <option value="11:00 AM">11:00 AM</option>
                          <option value="12:30 PM">12:30 PM</option>
                          <option value="02:00 PM">02:00 PM</option>
                          <option value="03:30 PM">03:30 PM</option>
                          <option value="05:00 PM">05:00 PM</option>
                          <option value="06:30 PM">06:30 PM</option>
                          <option value="08:00 PM">08:00 PM</option>
                        </select>
                      </div>
                    </div>

                    {/* Guests */}
                    <div className="space-y-2">
                      <label htmlFor="guests" className="block text-xs font-sans font-bold text-espresso-800 uppercase tracking-wider">
                        Guests
                      </label>
                      <div className="relative">
                        <Users className="absolute left-4 top-3.5 w-5 h-5 text-espresso-400 pointer-events-none" />
                        <select
                          id="guests"
                          name="guests"
                          required
                          value={formData.guests}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-3 bg-cream-50 border border-cream-200 rounded-2xl font-sans text-sm text-espresso-900 appearance-none focus:outline-none focus:border-matcha-500 focus:ring-1 focus:ring-matcha-500 transition-colors"
                        >
                          <option value="1">1 Guest</option>
                          <option value="2">2 Guests</option>
                          <option value="3">3 Guests</option>
                          <option value="4">4 Guests</option>
                          <option value="5">5 Guests</option>
                          <option value="6">6 Guests</option>
                          <option value="7">7 Guests</option>
                          <option value="8">8 Guests</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-espresso-900 text-cream-50 hover:bg-matcha-500 hover:text-white py-4 rounded-2xl font-sans font-bold text-base transition-all duration-300 shadow-soft hover:shadow-premium disabled:bg-espresso-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span className="w-5 h-5 border-2 border-cream-50 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      'Send Reservation Request'
                    )}
                  </button>
                </form>
              ) : (
                <div className="text-center py-8 space-y-6">
                  <div className="inline-flex bg-matcha-100 text-matcha-600 p-4 rounded-full shadow-inner-light animate-bounce">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div>
                    <h3 className="font-serif font-black text-3xl text-espresso-900">Reservation Received!</h3>
                    <p className="text-sm font-sans text-espresso-700 mt-2 max-w-md mx-auto">
                      Thank you, <strong className="text-espresso-900">{formData.name}</strong>. We've locked in your request for <strong className="text-espresso-900">{formData.date} at {formData.time}</strong>. An automation pipeline is simulated to process this payload.
                    </p>
                  </div>

                  {/* Webhook JSON Payload Preview block */}
                  <div className="bg-espresso-950 text-left rounded-3xl p-5 border border-espresso-800 max-w-lg mx-auto relative group">
                    <div className="flex items-center justify-between border-b border-espresso-800 pb-3 mb-3">
                      <span className="text-[10px] uppercase font-sans font-bold text-cream-300 tracking-wider">
                        Webhook JSON Payload Trigger
                      </span>
                      <button
                        onClick={copyToClipboard}
                        className="text-cream-300 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-espresso-900 flex items-center gap-1.5 text-xs font-sans cursor-pointer"
                        title="Copy payload to clipboard"
                      >
                        {copied ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-matcha-400" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="text-emerald-400 font-mono text-[11px] leading-tight overflow-x-auto max-h-[160px]">
                      {JSON.stringify(payloadPreview, null, 2)}
                    </pre>
                  </div>

                  <button
                    onClick={resetForm}
                    className="inline-flex text-xs font-sans font-bold text-matcha-600 hover:text-matcha-700 transition-colors uppercase tracking-widest border-b-2 border-matcha-300 hover:border-matcha-500 pb-0.5"
                  >
                    Make Another Booking
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
