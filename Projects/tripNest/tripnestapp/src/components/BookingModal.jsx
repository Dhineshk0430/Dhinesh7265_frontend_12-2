import React, { useState } from 'react';
import { X, Calendar, Clock, Users, MapPin, CheckCircle2, ShieldCheck, Car, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../utils/calculations';

export default function BookingModal({
  isOpen,
  onClose,
  type = 'guide', // 'guide' | 'cab' | 'hotel'
  item, // guide or vehicle or hotel object
  initialData = {},
  onConfirm
}) {
  const { settings } = useApp();

  const [date, setDate] = useState(initialData.date || new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState(initialData.time || '10:00');
  const [guests, setGuests] = useState(initialData.guests || 2);
  const [durationHours, setDurationHours] = useState(initialData.durationHours || 3);
  const [selectedTour, setSelectedTour] = useState(item?.tours?.[0] || null);
  const [selectedRoom, setSelectedRoom] = useState(item?.roomTypes?.[0] || null);
  const [checkOutDate, setCheckOutDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !item) return null;

  // Calculate pricing based on type
  let estimatedTotal = 0;
  if (type === 'guide') {
    if (selectedTour) {
      estimatedTotal = selectedTour.price * (guests > 2 ? 1 + (guests - 2) * 0.2 : 1);
    } else {
      estimatedTotal = (item.pricePerHour || 400) * durationHours;
    }
  } else if (type === 'hotel') {
    const start = new Date(date);
    const end = new Date(checkOutDate);
    const diffTime = Math.max(1, Math.round((end - start) / (1000 * 60 * 60 * 24)));
    const roomRate = selectedRoom ? selectedRoom.price : (item.pricePerNight || 3000);
    estimatedTotal = roomRate * diffTime;
  } else if (type === 'cab') {
    estimatedTotal = initialData.fare || 350;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validations
    if (!date) {
      setError('Please select a valid date.');
      return;
    }

    if (type === 'hotel') {
      if (new Date(checkOutDate) <= new Date(date)) {
        setError('Check-out date must be after check-in date.');
        return;
      }
    }

    setIsSubmitting(true);

    setTimeout(() => {
      let bookingPayload = {};

      if (type === 'guide') {
        bookingPayload = {
          type: 'guide',
          title: selectedTour ? selectedTour.name : `${item.name} (${item.specialization})`,
          provider: item.name,
          date,
          time,
          duration: selectedTour ? selectedTour.duration : `${durationHours} hours`,
          groupSize: guests,
          fare: Math.round(estimatedTotal)
        };
      } else if (type === 'hotel') {
        const start = new Date(date);
        const end = new Date(checkOutDate);
        const nights = Math.max(1, Math.round((end - start) / (1000 * 60 * 60 * 24)));
        bookingPayload = {
          type: 'hotel',
          title: item.name,
          provider: selectedRoom ? selectedRoom.name : item.type,
          date: `${date} to ${checkOutDate}`,
          checkIn: date,
          checkOut: checkOutDate,
          rooms: 1,
          guests,
          nights,
          fare: Math.round(estimatedTotal)
        };
      } else if (type === 'cab') {
        bookingPayload = {
          type: 'cab',
          title: `${initialData.pickup} to ${initialData.destination}`,
          provider: item.name,
          date,
          time,
          pickup: initialData.pickup,
          destination: initialData.destination,
          passengers: initialData.passengers || guests,
          distanceKm: initialData.distanceKm || 5,
          fare: Math.round(estimatedTotal)
        };
      }

      onConfirm(bookingPayload);
      setIsSubmitting(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <span className="text-[10px] font-bold tracking-wider uppercase text-sky-600 bg-sky-50 px-2 py-0.5 rounded-md">
              Demo Booking
            </span>
            <h3 className="text-lg font-bold font-display text-slate-900 mt-1">
              Confirm {type === 'guide' ? 'Local Guide' : type === 'hotel' ? 'Hotel Reservation' : 'Ride Booking'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4 flex-1">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 text-rose-700 text-xs flex items-center gap-2 border border-rose-200">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Item Summary Banner */}
          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-sky-50/60 border border-sky-100">
            <img
              src={item.photo || item.image}
              alt={item.name}
              className="w-14 h-14 rounded-xl object-cover shrink-0"
            />
            <div className="min-w-0">
              <h4 className="text-sm font-bold text-slate-900 truncate">{item.name}</h4>
              <p className="text-xs text-slate-500 truncate">
                {item.specialization || item.category || item.tagline || item.address}
              </p>
            </div>
          </div>

          {/* Tour or Room selector if applicable */}
          {type === 'guide' && item.tours && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Select Tour Experience
              </label>
              <div className="space-y-2">
                {item.tours.map(t => (
                  <label
                    key={t.id}
                    className={`flex items-center justify-between p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                      selectedTour?.id === t.id
                        ? 'border-sky-500 bg-sky-50/50 font-semibold text-sky-950'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="tour"
                        checked={selectedTour?.id === t.id}
                        onChange={() => setSelectedTour(t)}
                        className="text-sky-500 focus:ring-sky-400"
                      />
                      <span>{t.name} ({t.duration})</span>
                    </div>
                    <span className="font-bold text-slate-900">₹{t.price}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {type === 'hotel' && item.roomTypes && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Select Room Category
              </label>
              <div className="space-y-2">
                {item.roomTypes.map(r => (
                  <label
                    key={r.id}
                    className={`flex items-center justify-between p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                      selectedRoom?.id === r.id
                        ? 'border-sky-500 bg-sky-50/50 font-semibold text-sky-950'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="room"
                        checked={selectedRoom?.id === r.id}
                        onChange={() => setSelectedRoom(r)}
                        className="text-sky-500 focus:ring-sky-400"
                      />
                      <div>
                        <div>{r.name}</div>
                        <div className="text-[10px] text-slate-400">{r.bed} • {r.capacity}</div>
                      </div>
                    </div>
                    <span className="font-bold text-slate-900">₹{r.price}/nt</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Dates & Time Inputs */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {type === 'hotel' ? 'Check-In Date' : 'Booking Date'}
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-400 focus:outline-none"
                  required
                />
              </div>
            </div>

            {type === 'hotel' ? (
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Check-Out Date</label>
                <input
                  type="date"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  min={date}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-400 focus:outline-none"
                  required
                />
              </div>
            ) : (
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Starting Time</label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-400 focus:outline-none"
                  required
                />
              </div>
            )}
          </div>

          {/* Guests / Group size */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {type === 'hotel' ? 'Number of Guests' : type === 'cab' ? 'Passengers' : 'Group Size'}
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-400 focus:outline-none bg-white"
            >
              {[1, 2, 3, 4, 5, 6].map(n => (
                <option key={n} value={n}>
                  {n} {n === 1 ? 'Person' : 'People'}
                </option>
              ))}
            </select>
          </div>

          {/* Price Breakdown Banner */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-1.5">
            <div className="flex justify-between text-slate-500">
              <span>Estimated Base Cost</span>
              <span>{formatCurrency(Math.round(estimatedTotal * 0.95), settings.currency)}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Taxes & Service Fees (Demo)</span>
              <span>{formatCurrency(Math.round(estimatedTotal * 0.05), settings.currency)}</span>
            </div>
            <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-slate-900 text-sm">
              <span>Total Estimated Fare</span>
              <span className="text-sky-600 font-display">
                {formatCurrency(Math.round(estimatedTotal), settings.currency)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Instant confirmation. Cancel anytime before departure with full refund.</span>
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-xs font-bold text-white shadow-md hover:shadow-lg transition-all disabled:opacity-50"
            >
              {isSubmitting ? 'Confirming...' : 'Confirm Demo Booking'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
