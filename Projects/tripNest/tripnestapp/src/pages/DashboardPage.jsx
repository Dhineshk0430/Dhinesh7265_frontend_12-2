import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { attractions } from '../data/attractions';
import { restaurants } from '../data/restaurants';
import { hotels } from '../data/hotels';
import { guides } from '../data/guides';
import BookingCard from '../components/BookingCard';
import {
  Sparkles,
  Car,
  Users,
  Utensils,
  Hotel,
  MapPin,
  ArrowRight,
  ChevronRight,
  Sun,
  Map as MapIcon,
  Star,
  CheckCircle,
  Heart
} from 'lucide-react';
import { formatCurrency } from '../utils/calculations';

export default function DashboardPage() {
  const { user } = useAuth();
  const {
    currentDestination,
    allDestinations,
    setCurrentDestination,
    bookings,
    cancelBooking,
    itineraries,
    favourites,
    settings
  } = useApp();

  const navigate = useNavigate();

  // Active items for current destination
  const destAttractions = attractions.filter(a => a.destinationId === currentDestination.id).slice(0, 3);
  const destRestaurants = restaurants.filter(r => r.destinationId === currentDestination.id).slice(0, 3);
  const destHotels = hotels.filter(h => h.destinationId === currentDestination.id).slice(0, 2);
  const destGuides = guides.filter(g => g.destinationId === currentDestination.id).slice(0, 2);

  const activeBookings = bookings.filter(b => b.status === 'Confirmed').slice(0, 2);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Top Welcome Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white p-6 sm:p-10 shadow-xl">
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-25 hidden md:block overflow-hidden">
          <img
            src={currentDestination.image}
            alt={currentDestination.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-sky-300">
            <Sun className="w-3.5 h-3.5 text-amber-400" />
            <span>Currently in {currentDestination.name} • {currentDestination.weatherCondition} ({currentDestination.avgTemp})</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold font-display leading-tight">
            Welcome back, <br className="sm:hidden" />
            <span className="text-sky-400">{user?.name || 'Explorer'}</span>!
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-lg leading-relaxed">
            Where would you like to explore today? Your active destination is set to{' '}
            <strong className="text-white">{currentDestination.name}</strong>. Create custom AI itineraries, hail nearby cabs, or discover royal heritage.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              to="/planner"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold shadow-md transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Create AI Itinerary</span>
            </Link>

            <Link
              to="/cabs"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all"
            >
              <Car className="w-4 h-4 text-emerald-400" />
              <span>Book Rapido Cab</span>
            </Link>

            <Link
              to="/map"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all"
            >
              <MapIcon className="w-4 h-4 text-rose-400" />
              <span>Open Navigator</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Action Category Hub */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        <Link
          to="/planner"
          className="p-4 rounded-2xl bg-white border border-slate-100 shadow-xs hover:border-sky-300 card-hover flex flex-col items-center text-center group"
        >
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <Sparkles className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold text-slate-800">AI Planner</span>
          <span className="text-[10px] text-slate-400">Custom schedules</span>
        </Link>

        <Link
          to="/cabs"
          className="p-4 rounded-2xl bg-white border border-slate-100 shadow-xs hover:border-emerald-300 card-hover flex flex-col items-center text-center group"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <Car className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold text-slate-800">Cabs & Bikes</span>
          <span className="text-[10px] text-slate-400">Instant transit</span>
        </Link>

        <Link
          to="/guides"
          className="p-4 rounded-2xl bg-white border border-slate-100 shadow-xs hover:border-indigo-300 card-hover flex flex-col items-center text-center group"
        >
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <Users className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold text-slate-800">Local Guides</span>
          <span className="text-[10px] text-slate-400">Govt. certified</span>
        </Link>

        <Link
          to="/restaurants"
          className="p-4 rounded-2xl bg-white border border-slate-100 shadow-xs hover:border-orange-300 card-hover flex flex-col items-center text-center group"
        >
          <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <Utensils className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold text-slate-800">Dining & Cafes</span>
          <span className="text-[10px] text-slate-400">Authentic flavors</span>
        </Link>

        <Link
          to="/hotels"
          className="p-4 rounded-2xl bg-white border border-slate-100 shadow-xs hover:border-purple-300 card-hover flex flex-col items-center text-center group"
        >
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <Hotel className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold text-slate-800">Hotels & Stays</span>
          <span className="text-[10px] text-slate-400">Havelis & resorts</span>
        </Link>

        <Link
          to="/map"
          className="p-4 rounded-2xl bg-white border border-slate-100 shadow-xs hover:border-rose-300 card-hover flex flex-col items-center text-center group"
        >
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <MapIcon className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold text-slate-800">Offline Maps</span>
          <span className="text-[10px] text-slate-400">Cached POIs</span>
        </Link>
      </div>

      {/* Active Bookings Summary */}
      {activeBookings.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h2 className="text-lg font-bold font-display text-slate-900">
                Active Bookings ({bookings.filter(b => b.status === 'Confirmed').length})
              </h2>
            </div>
            <Link to="/bookings" className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1">
              View all bookings <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeBookings.map(b => (
              <BookingCard key={b.id} booking={b} onCancel={cancelBooking} />
            ))}
          </div>
        </section>
      )}

      {/* Planned Trips Preview */}
      {itineraries.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold font-display text-slate-900">
                Your Planned Itineraries
              </h2>
              <p className="text-xs text-slate-500">
                Recently generated and saved multi-day itineraries
              </p>
            </div>
            <Link to="/trips" className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1">
              View all trips <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {itineraries.slice(0, 3).map((itn) => (
              <div
                key={itn.id}
                onClick={() => navigate(`/planner/${itn.id}`)}
                className="p-5 rounded-3xl bg-white border border-slate-100 shadow-xs hover:border-sky-300 card-hover cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 text-[10px] font-bold">
                      {itn.durationDays} Days • {itn.travelers || 2} Travelers
                    </span>
                    <span className="text-xs font-extrabold text-slate-900">
                      ₹{itn.estimatedCost?.total?.toLocaleString('en-IN') || '18,500'}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 font-display line-clamp-1">
                    {itn.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-sky-500" />
                    {itn.destination} • {itn.travelStyle}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-sky-600 font-semibold">
                  <span>Open Full Schedule</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Top Highlights in Active Destination */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold font-display text-slate-900">
              Top Attractions in {currentDestination.name}
            </h2>
            <p className="text-xs text-slate-500">
              Must-visit royal palaces, fortresses, and scenic horizons
            </p>
          </div>
          <Link
            to="/explore"
            className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1"
          >
            Explore all <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destAttractions.map(attr => (
            <div
              key={attr.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xs card-hover flex flex-col"
            >
              <div className="h-44 relative overflow-hidden">
                <img src={attr.image} alt={attr.name} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-bold text-slate-800">
                  {attr.category}
                </span>
                <span className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-xs text-white text-xs px-2 py-0.5 rounded-md font-bold">
                  ★ {attr.rating} ({attr.reviewsCount})
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 font-display text-sm">{attr.name}</h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{attr.description}</p>
                </div>
                <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">{attr.entryFee}</span>
                  <Link
                    to={`/map?lat=${attr.coordinates.lat}&lng=${attr.coordinates.lng}&name=${encodeURIComponent(attr.name)}`}
                    className="text-sky-600 font-semibold hover:underline flex items-center gap-1"
                  >
                    View Map <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Nearby Restaurants & Cafes Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold font-display text-slate-900">
              Nearby Dining in {currentDestination.name}
            </h2>
            <p className="text-xs text-slate-500">
              Signature cuisines, traditional thalis, and rooftop cafes
            </p>
          </div>
          <Link
            to="/restaurants"
            className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1"
          >
            All restaurants <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destRestaurants.map(rest => (
            <div
              key={rest.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xs card-hover flex flex-col"
            >
              <div className="h-40 relative overflow-hidden">
                <img src={rest.image} alt={rest.name} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-white/90 text-[10px] font-bold text-slate-800">
                  {rest.priceCategory} • {rest.cuisine.split('&')[0]}
                </span>
                <span className="absolute bottom-3 left-3 bg-black/50 text-white text-xs px-2 py-0.5 rounded-md font-bold">
                  ★ {rest.rating} ({rest.reviewsCount})
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 font-display text-sm">{rest.name}</h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">{rest.address}</p>
                </div>
                <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">{rest.distanceKm} km away</span>
                  <Link
                    to={`/restaurants/${rest.id}`}
                    className="text-sky-600 font-semibold hover:underline flex items-center gap-1"
                  >
                    View Menu <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recommended Hotels & Guides Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recommended Hotels */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold font-display text-slate-900">
              Recommended Stays
            </h2>
            <Link to="/hotels" className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1">
              All stays <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {destHotels.map(hotel => (
              <div
                key={hotel.id}
                className="bg-white p-4 rounded-3xl border border-slate-100 shadow-xs flex items-center gap-4 card-hover"
              >
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-20 h-20 rounded-2xl object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md">
                    {hotel.starRating} Star • {hotel.category}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 truncate mt-1">{hotel.name}</h3>
                  <div className="text-xs text-slate-500 truncate">{hotel.address}</div>
                  <div className="text-xs font-bold text-slate-900 mt-1">
                    {formatCurrency(hotel.pricePerNight, settings.currency)} <span className="text-slate-400 font-normal">/ night</span>
                  </div>
                </div>
                <Link
                  to={`/hotels/${hotel.id}`}
                  className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-600 text-purple-700 hover:text-white text-xs font-bold transition-all shrink-0"
                >
                  View
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Local Guides */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold font-display text-slate-900">
              Top Certified Guides
            </h2>
            <Link to="/guides" className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1">
              All guides <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {destGuides.map(guide => (
              <div
                key={guide.id}
                className="bg-white p-4 rounded-3xl border border-slate-100 shadow-xs flex items-center gap-4 card-hover"
              >
                <img
                  src={guide.photo}
                  alt={guide.name}
                  className="w-20 h-20 rounded-2xl object-cover shrink-0 ring-2 ring-sky-50"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                    {guide.category}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 truncate mt-1">{guide.name}</h3>
                  <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    <span>{guide.rating} ({guide.reviewCount} tours)</span>
                  </div>
                  <div className="text-xs font-bold text-slate-900 mt-1">
                    {formatCurrency(guide.pricePerHour, settings.currency)} <span className="text-slate-400 font-normal">/ hr</span>
                  </div>
                </div>
                <Link
                  to={`/guides/${guide.id}`}
                  className="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white text-xs font-bold transition-all shrink-0"
                >
                  Hire
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Switch Destination strip */}
      <section className="bg-sky-50 rounded-3xl p-6 border border-sky-100">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold font-display text-slate-900">
              Want to plan for a different city?
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Switch destinations with one click to update guides, cabs, hotels, and attractions.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {allDestinations.map(d => (
              <button
                key={d.id}
                onClick={() => setCurrentDestination(d)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  currentDestination.id === d.id
                    ? 'bg-sky-500 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {d.name}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
