import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, MapPin, Clock, Heart, Navigation, ChevronRight, Utensils } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function RestaurantCard({ restaurant }) {
  const { isFavourite, toggleFavourite } = useApp();
  const navigate = useNavigate();
  const isFav = isFavourite(restaurant.id);

  const handleToggleFav = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavourite({
      id: restaurant.id,
      name: restaurant.name,
      type: 'restaurant',
      cuisine: restaurant.cuisine,
      rating: restaurant.rating,
      image: restaurant.image,
      destination: restaurant.destinationId
    });
  };

  const handleDirections = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/map?lat=${restaurant.coordinates.lat}&lng=${restaurant.coordinates.lng}&name=${encodeURIComponent(restaurant.name)}`);
  };

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm card-hover flex flex-col h-full relative">
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-black/20" />

        {/* Favorite Heart Button */}
        <button
          onClick={handleToggleFav}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-md text-slate-600 hover:text-rose-500 transition-colors shadow-xs z-10"
          aria-label={isFav ? "Remove favourite" : "Add to favourites"}
        >
          <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Price Category Pill */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-slate-800 shadow-xs">
          {restaurant.priceCategory} • {restaurant.pricePerPerson}
        </div>

        {/* Cuisine & Rating at bottom of image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
          <span className="text-xs font-semibold bg-black/40 backdrop-blur-xs px-2.5 py-0.5 rounded-lg">
            {restaurant.cuisine}
          </span>
          <div className="flex items-center gap-1 bg-amber-500/90 backdrop-blur-xs px-2 py-0.5 rounded-lg text-xs font-bold">
            <Star className="w-3.5 h-3.5 fill-white text-white" />
            <span>{restaurant.rating}</span>
            <span className="text-amber-100 font-normal">({restaurant.reviewsCount})</span>
          </div>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 font-display group-hover:text-sky-600 transition-colors line-clamp-1">
            {restaurant.name}
          </h3>

          <div className="flex items-center gap-3 text-xs text-slate-500 mt-2">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-sky-500 shrink-0" />
              {restaurant.distanceKm} km away
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              {restaurant.openingHours.split(',')[0]}
            </span>
          </div>

          {/* Popular Dishes */}
          <div className="mt-3">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Utensils className="w-3 h-3" /> Popular Dishes:
            </div>
            <div className="flex flex-wrap gap-1">
              {restaurant.popularDishes.slice(0, 2).map((dish, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-md bg-sky-50 text-sky-700 text-[10px] font-medium"
                >
                  {dish}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-4 mt-3 border-t border-slate-100 flex items-center gap-2">
          <button
            onClick={handleDirections}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <Navigation className="w-3.5 h-3.5 text-sky-500" />
            <span>Directions</span>
          </button>
          <Link
            to={`/restaurants/${restaurant.id}`}
            className="flex-1 inline-flex items-center justify-center gap-1 py-2 px-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-xs font-semibold text-white shadow-xs transition-colors"
          >
            <span>Details</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
