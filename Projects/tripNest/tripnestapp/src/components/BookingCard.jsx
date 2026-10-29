import React, { useState } from 'react';
import { Car, Users, Hotel, Calendar, Clock, MapPin, XCircle, CheckCircle2, AlertTriangle, ChevronDown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../utils/calculations';

export default function BookingCard({ booking, onCancel }) {
  const { settings } = useApp();
  const [showDetails, setShowDetails] = useState(false);
  const [confirmCancel, setConfirmCancel] = useState(false);

  const isCancelled = booking.status === 'Cancelled';

  const typeConfig = {
    cab: { label: 'Cab Booking', icon: Car, color: 'text-amber-500 bg-amber-50' },
    guide: { label: 'Local Guide', icon: Users, color: 'text-indigo-500 bg-indigo-50' },
    hotel: { label: 'Hotel Stay', icon: Hotel, color: 'text-purple-500 bg-purple-50' }
  };

  const currentType = typeConfig[booking.type] || { label: 'Travel Booking', icon: Calendar, color: 'text-sky-500 bg-sky-50' };
  const Icon = currentType.icon;

  const handleCancelClick = () => {
    if (confirmCancel) {
      onCancel(booking.id);
      setConfirmCancel(false);
    } else {
      setConfirmCancel(true);
    }
  };

  return (
    <div className={`bg-white rounded-3xl border transition-all p-5 shadow-xs ${
      isCancelled ? 'border-slate-200/60 opacity-80' : 'border-slate-100 hover:shadow-md'
    }`}>
      {/* Top Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-2xl ${currentType.color}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {currentType.label}
              </span>
              <span className="text-xs font-mono font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-md">
                {booking.referenceNumber}
              </span>
            </div>
            <h4 className="text-base font-bold text-slate-900 font-display mt-0.5">
              {booking.title}
            </h4>
          </div>
        </div>

        {/* Status Badge */}
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
          isCancelled
            ? 'bg-rose-50 text-rose-700 border border-rose-200'
            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
        }`}>
          {isCancelled ? (
            <>
              <XCircle className="w-3.5 h-3.5" />
              Cancelled
            </>
          ) : (
            <>
              <CheckCircle2 className="w-3.5 h-3.5" />
              Confirmed
            </>
          )}
        </span>
      </div>

      {/* Info Rows */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-3 border-t border-slate-100 text-xs">
        <div>
          <span className="text-slate-400 block text-[11px]">Provider / Tier</span>
          <span className="font-semibold text-slate-700 truncate block mt-0.5">
            {booking.provider}
          </span>
        </div>

        <div>
          <span className="text-slate-400 block text-[11px]">Schedule Date</span>
          <span className="font-semibold text-slate-700 block mt-0.5">
            {booking.date}
          </span>
        </div>

        <div>
          <span className="text-slate-400 block text-[11px]">Timing / Duration</span>
          <span className="font-semibold text-slate-700 block mt-0.5">
            {booking.time || booking.duration || `${booking.nights || 1} Nights`}
          </span>
        </div>

        <div>
          <span className="text-slate-400 block text-[11px]">Demo Total</span>
          <span className="font-extrabold text-slate-900 block mt-0.5 text-sm font-display">
            {formatCurrency(booking.fare, settings.currency)}
          </span>
        </div>
      </div>

      {/* Expanded details */}
      {showDetails && (
        <div className="mt-4 pt-3 border-t border-slate-100 text-xs space-y-2 bg-slate-50/70 p-3 rounded-2xl animate-in fade-in duration-200">
          {booking.pickup && (
            <div className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-700">Pickup:</span> {booking.pickup}
              </div>
            </div>
          )}
          {booking.destination && (
            <div className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-700">Drop-off:</span> {booking.destination}
              </div>
            </div>
          )}
          {booking.distanceKm && (
            <div className="text-slate-500">
              Estimated Distance: {booking.distanceKm} km • Passengers: {booking.passengers}
            </div>
          )}
          {booking.checkIn && (
            <div className="text-slate-500">
              Check-In: {booking.checkIn} • Check-Out: {booking.checkOut} ({booking.rooms} Room, {booking.guests} Guests)
            </div>
          )}
          <div className="text-[10px] text-slate-400 pt-1">
            Booked at: {new Date(booking.createdAt).toLocaleString()} • Demo simulated persistence
          </div>
        </div>
      )}

      {/* Card Actions */}
      <div className="flex items-center justify-between gap-3 mt-4 pt-3 border-t border-slate-100">
        <button
          type="button"
          onClick={() => setShowDetails(!showDetails)}
          className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1"
        >
          <span>{showDetails ? 'Hide Details' : 'View Full Details'}</span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showDetails ? 'rotate-180' : ''}`} />
        </button>

        {!isCancelled && booking.cancellationAllowed && (
          <div className="flex items-center gap-2">
            {confirmCancel && (
              <span className="text-[11px] text-amber-600 font-medium">Cancel ride?</span>
            )}
            <button
              type="button"
              onClick={handleCancelClick}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                confirmCancel
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-rose-50 text-rose-600 hover:bg-rose-100'
              }`}
            >
              {confirmCancel ? 'Yes, Cancel' : 'Cancel Booking'}
            </button>
            {confirmCancel && (
              <button
                type="button"
                onClick={() => setConfirmCancel(false)}
                className="px-2 py-1 text-xs text-slate-400 hover:text-slate-600"
              >
                No
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
