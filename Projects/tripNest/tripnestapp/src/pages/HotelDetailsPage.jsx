import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { hotels } from '../data/hotels';
import { useApp } from '../context/AppContext';
import BookingModal from '../components/BookingModal';
import {
  Star,
  MapPin,
  Check,
  Heart,
  ArrowLeft,
  ShieldCheck,
  Calendar,
  Users,
  BedDouble
} from 'lucide-react';
import { formatCurrency } from '../utils/calculations';

export default function HotelDetailsPage() {
  const { hotelId } = useParams();
  const { addBooking, isFavourite, toggleFavourite, settings } = useApp();
  const [showBookingModal, setShowBookingModal] = useState(false);

  const hotel = hotels.find(h => h.id === hotelId) || hotels[0];
  const isFav = isFavourite(hotel.id);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back link */}
      <Link
        to="/hotels"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-sky-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Hotels & Stays</span>
      </Link>

      {/* Hotel Showcase Banner */}
      <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm">
        <div className="relative h-72 sm:h-96 w-full overflow-hidden">
          <img
            src={hotel.image}
            alt={hotel.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

          {/* Action buttons */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={() => toggleFavourite({
                id: hotel.id,
                name: hotel.name,
                type: 'hotel',
                category: hotel.category,
                pricePerNight: hotel.pricePerNight,
                rating: hotel.userRating,
                image: hotel.image,
                destination: hotel.destinationId
              })}
              className="p-3 rounded-full bg-white/90 backdrop-blur-md text-slate-700 hover:text-rose-500 transition-colors shadow-md"
            >
              <Heart className={`w-5 h-5 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
          </div>

          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-3 py-1 rounded-full bg-purple-600 font-bold text-white">
                {hotel.starRating} Star {hotel.category}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md font-medium text-white">
                {hotel.type}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold font-display leading-tight drop-shadow-md">
              {hotel.name}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-200 pt-1">
              <span className="flex items-center gap-1 font-bold text-amber-300">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                {hotel.userRating} ({hotel.reviewsCount} reviews)
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-sky-400" />
                {hotel.address}
              </span>
            </div>
          </div>
        </div>

        {/* Content body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="space-y-3">
            <h3 className="text-base font-bold font-display text-slate-900">About the Property</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {hotel.description}
            </p>
          </div>

          {/* Amenities Grid */}
          <div className="pt-4 border-t border-slate-100">
            <h3 className="text-sm font-bold font-display text-slate-900 mb-3">
              Included Amenities & Services
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {hotel.amenities?.map((amenity, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 text-xs text-slate-700 font-medium"
                >
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Available Room Types */}
          {hotel.roomTypes && hotel.roomTypes.length > 0 && (
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <h3 className="text-sm font-bold font-display text-slate-900">
                Available Room Categories
              </h3>
              <div className="space-y-3">
                {hotel.roomTypes.map(room => (
                  <div
                    key={room.id}
                    className="p-4 rounded-2xl border border-slate-200 hover:border-sky-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{room.name}</h4>
                      <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                        <span className="flex items-center gap-1">
                          <BedDouble className="w-3.5 h-3.5 text-slate-400" /> {room.bed}
                        </span>
                        <span>• Capacity: {room.capacity}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                      <div>
                        <span className="text-base font-extrabold text-slate-900 font-display">
                          {formatCurrency(room.price, settings.currency)}
                        </span>
                        <span className="text-[11px] text-slate-400"> / night</span>
                      </div>
                      <button
                        onClick={() => setShowBookingModal(true)}
                        className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-xs transition-colors"
                      >
                        Select Room
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom booking bar */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Starting Price</div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-extrabold text-slate-900 font-display">
                  {formatCurrency(hotel.pricePerNight, settings.currency)}
                </span>
                <span className="text-xs text-slate-500">/ night</span>
              </div>
            </div>

            <button
              onClick={() => setShowBookingModal(true)}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all"
            >
              Reserve Room Now
            </button>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <BookingModal
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
          type="hotel"
          item={hotel}
          onConfirm={(data) => addBooking(data)}
        />
      )}
    </div>
  );
}
