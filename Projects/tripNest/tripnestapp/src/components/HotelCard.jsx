import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Check, Heart, ShieldAlert } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../utils/calculations';

export default function HotelCard({ hotel, onReserve }) {
  const { isFavourite, toggleFavourite, settings } = useApp();
  const isFav = isFavourite(hotel.id);

  const handleToggleFav = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavourite({
      id: hotel.id,
      name: hotel.name,
      type: 'hotel',
      category: hotel.category,
      pricePerNight: hotel.pricePerNight,
      rating: hotel.userRating,
      image: hotel.image,
      destination: hotel.destinationId
    });
  };

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm card-hover flex flex-col h-full relative">
      <div className="relative h-52 w-full overflow-hidden">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20" />

        {/* Favorite Heart Button */}
        <button
          onClick={handleToggleFav}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-md text-slate-600 hover:text-rose-500 transition-colors shadow-xs z-10"
          aria-label={isFav ? "Remove favourite" : "Add to favourites"}
        >
          <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Category Badge */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-slate-800 shadow-xs">
          {hotel.category}
        </div>

        {/* Star Rating & Distance */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
          <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-xl text-xs font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{hotel.userRating}</span>
            <span className="text-slate-300 font-normal">({hotel.reviewsCount} reviews)</span>
          </div>

          <span className="text-[11px] font-medium bg-sky-500/80 backdrop-blur-xs px-2 py-0.5 rounded-lg">
            {hotel.distanceToCenterKm} km to center
          </span>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 font-display group-hover:text-sky-600 transition-colors line-clamp-1">
            {hotel.name}
          </h3>

          <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
            <MapPin className="w-3.5 h-3.5 text-sky-500 shrink-0" />
            <span className="truncate">{hotel.address}</span>
          </div>

          {/* Amenities chips */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {hotel.amenities.slice(0, 3).map((amenity, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 text-[10px] font-medium border border-slate-100"
              >
                <Check className="w-2.5 h-2.5 text-emerald-500" />
                {amenity}
              </span>
            ))}
          </div>

          {/* Demo availability notice */}
          <div className="mt-2.5 text-[11px] text-emerald-600 font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            {hotel.roomAvailability} rooms left in demo inventory
          </div>
        </div>

        <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between gap-3">
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Starting from</div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-extrabold text-slate-900 font-display">
                {formatCurrency(hotel.pricePerNight, settings.currency)}
              </span>
              <span className="text-xs text-slate-500">/ night</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/hotels/${hotel.id}`}
              className="py-2 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Details
            </Link>
            <button
              onClick={() => onReserve(hotel)}
              className="py-2 px-3.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-xs font-semibold text-white shadow-xs transition-colors"
            >
              Reserve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
