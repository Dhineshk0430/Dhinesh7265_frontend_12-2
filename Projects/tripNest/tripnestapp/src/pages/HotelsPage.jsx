import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { hotels } from '../data/hotels';
import HotelCard from '../components/HotelCard';
import BookingModal from '../components/BookingModal';
import SearchBar from '../components/SearchBar';
import EmptyState from '../components/EmptyState';
import { Hotel, Star, Calendar, Users, Filter, Check } from 'lucide-react';

export default function HotelsPage() {
  const { currentDestination, addBooking } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStar, setSelectedStar] = useState('All');
  const [selectedHotelForBooking, setSelectedHotelForBooking] = useState(null);

  const categories = [
    'All',
    'Resorts',
    'Premium hotels',
    'Hostels',
    'Homestays',
    'Guest houses'
  ];

  const filteredHotels = hotels.filter(h => {
    const matchesDest = !currentDestination || h.destinationId === currentDestination.id;
    const matchesQuery =
      h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || h.category === selectedCategory;
    const matchesStar = selectedStar === 'All' || h.starRating === Number(selectedStar);

    return matchesQuery && matchesCat && matchesStar;
  });

  const handleConfirmReservation = (bookingData) => {
    addBooking(bookingData);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-xs font-bold text-purple-800 mb-2">
          <Hotel className="w-3.5 h-3.5 text-purple-600" />
          <span>Handpicked Stays & Heritage Resorts</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900">
          Accommodations & Stays in {currentDestination.name}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          From coastal luxury resorts and Nilgiri tea estates to heritage Chettinad stays and pilgrim hotels.
        </p>
      </div>

      {/* Filter and Search */}
      <div className="space-y-4 bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onClear={() => setSearchQuery('')}
          placeholder="Search by hotel name, stay type, or neighborhood..."
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          destinationName={currentDestination.name}
        />

        {/* Secondary Filter: Star rating & Counter */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-600">Star Rating:</span>
            {['All', '3', '4', '5'].map(star => (
              <button
                key={star}
                type="button"
                onClick={() => setSelectedStar(star)}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  selectedStar === star
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {star === 'All' ? 'All' : `${star} ★`}
              </button>
            ))}
          </div>

          <div className="text-slate-400 font-medium">
            Showing {filteredHotels.length} verified stays in demo dataset
          </div>
        </div>
      </div>

      {/* Hotels Grid */}
      {filteredHotels.length === 0 ? (
        <EmptyState
          title="No accommodations found"
          description="Try broadening your category or star rating filter."
          actionText="Reset Filters"
          onAction={() => {
            setSearchQuery('');
            setSelectedCategory('All');
            setSelectedStar('All');
          }}
          icon={Hotel}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map(hotel => (
            <HotelCard
              key={hotel.id}
              hotel={hotel}
              onReserve={(h) => setSelectedHotelForBooking(h)}
            />
          ))}
        </div>
      )}

      {/* Reservation Booking Modal */}
      {selectedHotelForBooking && (
        <BookingModal
          isOpen={!!selectedHotelForBooking}
          onClose={() => setSelectedHotelForBooking(null)}
          type="hotel"
          item={selectedHotelForBooking}
          onConfirm={handleConfirmReservation}
        />
      )}
    </div>
  );
}
