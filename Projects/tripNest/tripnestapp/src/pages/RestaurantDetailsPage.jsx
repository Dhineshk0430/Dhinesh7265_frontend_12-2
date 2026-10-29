import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { restaurants } from '../data/restaurants';
import { useApp } from '../context/AppContext';
import {
  Star,
  MapPin,
  Clock,
  Phone,
  Heart,
  Navigation,
  ArrowLeft,
  Utensils,
  Check
} from 'lucide-react';

export default function RestaurantDetailsPage() {
  const { restaurantId } = useParams();
  const { isFavourite, toggleFavourite } = useApp();
  const navigate = useNavigate();

  const restaurant = restaurants.find(r => r.id === restaurantId) || restaurants[0];
  const isFav = isFavourite(restaurant.id);

  const handleToggleFav = () => {
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

  const handleDirections = () => {
    navigate(`/map?lat=${restaurant.coordinates.lat}&lng=${restaurant.coordinates.lng}&name=${encodeURIComponent(restaurant.name)}`);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back button */}
      <Link
        to="/restaurants"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-sky-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Restaurants</span>
      </Link>

      {/* Main Banner */}
      <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm">
        <div className="relative h-72 sm:h-96 w-full overflow-hidden">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

          {/* Action pills on image */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={handleToggleFav}
              className="p-3 rounded-full bg-white/90 backdrop-blur-md text-slate-700 hover:text-rose-500 transition-colors shadow-md"
            >
              <Heart className={`w-5 h-5 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
          </div>

          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-3 py-1 rounded-full bg-sky-500 font-bold text-white">
                {restaurant.cuisine}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md font-medium text-white">
                {restaurant.priceCategory} • {restaurant.pricePerPerson}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold font-display leading-tight drop-shadow-md">
              {restaurant.name}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-200 pt-1">
              <span className="flex items-center gap-1 font-bold text-amber-300">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                {restaurant.rating} ({restaurant.reviewsCount} reviews)
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-sky-400" />
                {restaurant.distanceKm} km from center
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-slate-300" />
                {restaurant.openingHours}
              </span>
            </div>
          </div>
        </div>

        {/* Content body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="space-y-3">
            <h3 className="text-base font-bold font-display text-slate-900">About the Dining Experience</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {restaurant.description}
            </p>
          </div>

          {/* Popular dishes highlighted */}
          <div className="pt-4 border-t border-slate-100">
            <h3 className="text-sm font-bold font-display text-slate-900 mb-3 flex items-center gap-2">
              <Utensils className="w-4 h-4 text-orange-500" />
              Must-Try Signature Dishes
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {restaurant.popularDishes.map((dish, i) => (
                <div
                  key={i}
                  className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-2.5 text-xs text-slate-800"
                >
                  <div className="w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                  <span className="font-semibold">{dish}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Dietary Options */}
          {restaurant.dietary && (
            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Dietary Accommodations
              </h3>
              <div className="flex flex-wrap gap-2">
                {restaurant.dietary.map((d, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    {d}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Contact & Map Action */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500 space-y-1">
              <div className="flex items-center gap-1.5 font-medium text-slate-700">
                <MapPin className="w-3.5 h-3.5 text-sky-500" /> {restaurant.address}
              </div>
              {restaurant.phone && (
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" /> {restaurant.phone}
                </div>
              )}
            </div>

            <button
              onClick={handleDirections}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold shadow-md transition-all"
            >
              <Navigation className="w-4 h-4" />
              <span>Get Directions on Map</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
