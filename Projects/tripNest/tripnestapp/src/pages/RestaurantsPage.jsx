import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { restaurants } from '../data/restaurants';
import RestaurantCard from '../components/RestaurantCard';
import SearchBar from '../components/SearchBar';
import EmptyState from '../components/EmptyState';
import { Utensils, Star, ArrowUpDown, MapPin } from 'lucide-react';

export default function RestaurantsPage() {
  const { currentDestination } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [selectedBudget, setSelectedBudget] = useState('All');
  const [sortBy, setSortBy] = useState('rating'); // 'rating' | 'distance' | 'price'

  const cuisines = [
    'All',
    'Traditional Tamil Vegetarian & Tiffin',
    'Authentic Chettinad & Tamil Non-Veg',
    'Pure South Indian Meals & Tiffin',
    'Madurai Non-Veg & Kari Dosa',
    'Traditional Tamil Desserts & Drinks',
    'Kongu Nadu Specialties & Biryani',
    'Coastal Seafood & Fresh Catch',
    'Hill Station Continental & Bakery'
  ];

  // Filter restaurants
  const filteredRestaurants = restaurants.filter(r => {
    const matchesDest = !currentDestination || r.destinationId === currentDestination.id;
    const matchesQuery =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.popularDishes.some(d => d.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCuisine = selectedCuisine === 'All' || r.cuisine.includes(selectedCuisine);
    const matchesBudget = selectedBudget === 'All' || r.priceCategory === selectedBudget;

    return matchesQuery && matchesCuisine && matchesBudget;
  });

  // Sort
  const sortedRestaurants = [...filteredRestaurants].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'distance') return a.distanceKm - b.distanceKm;
    if (sortBy === 'price') return a.priceCategory.length - b.priceCategory.length;
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-orange-800 mb-2">
          <Utensils className="w-3.5 h-3.5 text-orange-600" />
          <span>Curated Culinary & Dining Gems</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900">
          Nearby Restaurants & Cafes in {currentDestination.name}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Explore legendary Chettinad mess halls, authentic banana leaf tiffin spots, and coastal seafood.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4 bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onClear={() => setSearchQuery('')}
          placeholder="Search by restaurant name, cuisine, or famous dish (e.g., Ghee Podi Idli, Kari Dosa, Jigarthanda, Biryani)..."
          destinationName={currentDestination.name}
        />

        {/* Secondary Filters: Budget & Sorting */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-100 text-xs">
          <div className="flex flex-wrap items-center gap-4">
            {/* Budget filter chips */}
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-slate-600">Price:</span>
              {['All', '$', '$$', '$$$'].map(b => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setSelectedBudget(b)}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                    selectedBudget === b
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Sorting */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-slate-600">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs bg-white text-slate-700 focus:outline-none"
            >
              <option value="rating">Highest Rating</option>
              <option value="distance">Nearest Distance</option>
              <option value="price">Lowest Price ($)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Restaurant List */}
      {sortedRestaurants.length === 0 ? (
        <EmptyState
          title="No dining spots found"
          description="Try clearing your budget filter or searching for another dish."
          actionText="Reset Filters"
          onAction={() => {
            setSearchQuery('');
            setSelectedBudget('All');
            setSelectedCuisine('All');
          }}
          icon={Utensils}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedRestaurants.map(rest => (
            <RestaurantCard key={rest.id} restaurant={rest} />
          ))}
        </div>
      )}
    </div>
  );
}
