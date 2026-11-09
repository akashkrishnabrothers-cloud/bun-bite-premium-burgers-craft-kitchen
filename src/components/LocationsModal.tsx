import React, { useState } from 'react';
import { Calendar, CheckCircle2, Clock, MapPin, Phone, Utensils, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_LOCATIONS } from '../data/restaurantInfo';

export const LocationsModal: React.FC = () => {
  const { isLocationsOpen, setIsLocationsOpen, showToast } = useCart();
  const [selectedOutlet, setSelectedOutlet] = useState(RESTAURANT_LOCATIONS[0].id);
  const [tableBooking, setTableBooking] = useState({
    name: '',
    phone: '',
    date: '',
    time: '19:30',
    guests: '2',
  });
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  if (!isLocationsOpen) return null;

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tableBooking.name.trim() || !tableBooking.phone.trim()) {
      showToast('Please provide your name and phone number for booking.');
      return;
    }
    setBookingConfirmed(true);
    showToast('Table reservation request sent! We will confirm by SMS.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setIsLocationsOpen(false)}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-white text-neutral-900 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 bg-neutral-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFBE24] text-neutral-950 flex items-center justify-center font-bold">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-black text-xl uppercase tracking-wider text-white">
                BUN & BITE Outlets
              </h3>
              <span className="text-xs text-neutral-400 font-mono">
                3 Handcrafted Kitchens Across Delhi NCR & Bengaluru
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsLocationsOpen(false)}
            className="p-2 text-neutral-400 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Outlets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {RESTAURANT_LOCATIONS.map((loc) => {
              const isSelected = selectedOutlet === loc.id;
              return (
                <div
                  key={loc.id}
                  onClick={() => {
                    setSelectedOutlet(loc.id);
                    setBookingConfirmed(false);
                  }}
                  className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'border-[#FFBE24] bg-[#FFBE24]/10 shadow-md ring-2 ring-[#FFBE24]/40'
                      : 'border-neutral-200 hover:border-neutral-300 bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#F5A623]">
                      {loc.area}
                    </span>
                    {loc.isFlagship && (
                      <span className="text-[9px] bg-neutral-900 text-white font-bold px-1.5 py-0.5 rounded">
                        Flagship
                      </span>
                    )}
                  </div>

                  <h4 className="font-heading font-bold text-base text-neutral-950 uppercase leading-snug">
                    {loc.name}
                  </h4>

                  <p className="text-xs text-neutral-600 mt-1 line-clamp-2">
                    {loc.address}
                  </p>

                  <div className="mt-3 pt-2 border-t border-neutral-200/80 text-[11px] text-neutral-500 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-[#F5A623]" />
                      <span>{loc.hours}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3 h-3 text-[#F5A623]" />
                      <span>{loc.phone}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dine-In Table Booking Form */}
          <div className="p-6 rounded-2xl bg-[#F7F4EF] border border-neutral-200">
            <div className="flex items-center gap-2 mb-3">
              <Utensils className="w-4 h-4 text-[#F5A623]" />
              <h4 className="font-heading font-bold text-base uppercase text-neutral-950">
                Reserve a Table for Dine-In
              </h4>
            </div>

            {bookingConfirmed ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-1">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto" />
                <h5 className="font-bold text-emerald-900 text-sm">
                  Table Request Received!
                </h5>
                <p className="text-xs text-emerald-700">
                  We'll send a confirmation SMS to {tableBooking.phone} shortly. See you soon!
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-neutral-600 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={tableBooking.name}
                    onChange={(e) =>
                      setTableBooking((p) => ({ ...p, name: e.target.value }))
                    }
                    className="w-full text-xs p-2.5 rounded-xl border border-neutral-300 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-neutral-600 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 Mobile"
                    value={tableBooking.phone}
                    onChange={(e) =>
                      setTableBooking((p) => ({ ...p, phone: e.target.value }))
                    }
                    className="w-full text-xs p-2.5 rounded-xl border border-neutral-300 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-neutral-600 mb-1">
                    Guests
                  </label>
                  <select
                    value={tableBooking.guests}
                    onChange={(e) =>
                      setTableBooking((p) => ({ ...p, guests: e.target.value }))
                    }
                    className="w-full text-xs p-2.5 rounded-xl border border-neutral-300 bg-white"
                  >
                    <option value="1">1 Person</option>
                    <option value="2">2 People</option>
                    <option value="4">4 People</option>
                    <option value="6">6+ Party</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-neutral-950 hover:bg-neutral-800 text-white font-heading font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                  >
                    Book Table
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
