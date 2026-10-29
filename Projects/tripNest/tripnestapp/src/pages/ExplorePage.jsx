import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { attractions } from '../data/attractions';
import { restaurants } from '../data/restaurants';
import { hotels } from '../data/hotels';
import { guides } from '../data/guides';
import SearchBar from '../components/SearchBar';
import MapView from '../components/MapView';
import RestaurantCard from '../components/RestaurantCard';
import HotelCard from '../components/HotelCard';
import GuideCard from '../components/GuideCard';
import BookingModal from '../components/BookingModal';
import {
  Compass,
  Map as MapIcon,
  List,
  Star,
  MapPin,
  Heart,
  Plus,
  Navigation,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function ExplorePage() {
  const { currentDestination, toggleFavourite, isFavourite, addBooking, showToast } = useApp();

  const [viewMode, setViewMode] = useState('list'); // 'list' | 'map'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [bookingModalState, setBookingModalState] = useState(null);

  const categories = [
    'All',
    'Historical',
    'Cultural',
    'Nature & Viewpoints',
    'Adventure',
    'Restaurants',
    'Hotels',
    'Local Guides'
  ];

  // Destination-matched data
  const destAttractions = attractions.filter(a => a.destinationId === currentDestination.id);
  const destRestaurants = restaurants.filter(r => r.destinationId === currentDestination.id);
  const destHotels = hotels.filter(h => h.destinationId === currentDestination.id);
  const destGuides = guides.filter(g => g.destinationId === currentDestination.id);

  // Unified items list for explore
  const allExploreItems = [
    ...destAttractions.map(a => ({ ...a, itemType: 'attraction' })),
    ...destRestaurants.map(r => ({ ...r, itemType: 'restaurant' })),
    ...destHotels.map(h => ({ ...h, itemType: 'hotel' })),
    ...destGuides.map(g => ({ ...g, itemType: 'guide' }))
  ];

  const filteredItems = allExploreItems.filter(item => {
    const matchesQuery =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.cuisine && item.cuisine.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.specialization && item.specialization.toLowerCase().includes(searchQuery.toLowerCase()));

    if (selectedCategory === 'All') return matchesQuery;
    if (selectedCategory === 'Restaurants') return matchesQuery && item.itemType === 'restaurant';
    if (selectedCategory === 'Hotels') return matchesQuery && item.itemType === 'hotel';
    if (selectedCategory === 'Local Guides') return matchesQuery && item.itemType === 'guide';
    return matchesQuery && item.category && item.category.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header & View Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-xs font-bold text-sky-800 mb-2">
            <Compass className="w-3.5 h-3.5 text-sky-600" />
            <span>Curated Local Discovery</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900">
            Explore {currentDestination.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Discover royal architecture, local cuisine, boutique havelis, and scenic hilltops.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center bg-white p-1 rounded-2xl border border-slate-200 shadow-xs shrink-0">
          <button
            type="button"
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'list'
                ? 'bg-sky-500 text-white shadow-xs'
                : 'text-slate-600 hover:text-sky-600'
            }`}
          >
            <List className="w-4 h-4" />
            <span>List View</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('map')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'map'
                ? 'bg-sky-500 text-white shadow-xs'
                : 'text-slate-600 hover:text-sky-600'
            }`}
          >
            <MapIcon className="w-4 h-4" />
            <span>Map View</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-4">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onClear={() => setSearchQuery('')}
          placeholder="Search all attractions, food, hotels, or guides in this area..."
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          destinationName={currentDestination.name}
        />
      </div>

      {/* View Mode Content */}
      {viewMode === 'map' ? (
        <div className="space-y-4">
          <MapView
            initialCenter={[currentDestination.coordinates.lat, currentDestination.coordinates.lng]}
            initialZoom={12}
            height="650px"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => {
            if (item.itemType === 'restaurant') {
              return <RestaurantCard key={item.id} restaurant={item} />;
            }
            if (item.itemType === 'hotel') {
              return (
                <HotelCard
                  key={item.id}
                  hotel={item}
                  onReserve={(h) => setBookingModalState({ type: 'hotel', item: h })}
                />
              );
            }
            if (item.itemType === 'guide') {
              return (
                <GuideCard
                  key={item.id}
                  guide={item}
                  onBook={(g) => setBookingModalState({ type: 'guide', item: g })}
                />
              );
            }

            // Standard Attraction Card
            const isFav = isFavourite(item.id);
            return (
              <div
                key={item.id}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm card-hover flex flex-col justify-between"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  <button
                    onClick={() => toggleFavourite({
                      id: item.id,
                      name: item.name,
                      type: 'attraction',
                      rating: item.rating,
                      image: item.image,
                      destination: currentDestination.name
                    })}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-md text-slate-700 hover:text-rose-500 shadow-xs"
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>

                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 text-[10px] font-bold text-slate-800">
                    {item.category}
                  </span>

                  <div className="absolute bottom-3 left-3 right-3 text-white flex items-center justify-between text-xs">
                    <span className="font-bold flex items-center gap-1 text-amber-300">
                      <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                      {item.rating} ({item.reviewsCount})
                    </span>
                    <span className="text-[11px] bg-sky-500/80 px-2 py-0.5 rounded-md">
                      {item.duration}
                    </span>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold font-display text-base text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium truncate max-w-[150px]">{item.entryFee}</span>
                    <button
                      onClick={() => {
                        showToast(`"${item.name}" added to itinerary queue!`, 'success');
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-sky-50 text-sky-700 hover:bg-sky-500 hover:text-white font-semibold transition-all"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add to Plan</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Booking Modal */}
      {bookingModalState && (
        <BookingModal
          isOpen={!!bookingModalState}
          onClose={() => setBookingModalState(null)}
          type={bookingModalState.type}
          item={bookingModalState.item}
          onConfirm={(data) => addBooking(data)}
        />
      )}
    </div>
  );
}
