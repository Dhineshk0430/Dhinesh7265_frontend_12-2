import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { guides } from '../data/guides';
import GuideCard from '../components/GuideCard';
import BookingModal from '../components/BookingModal';
import SearchBar from '../components/SearchBar';
import EmptyState from '../components/EmptyState';
import { Users, Filter, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export default function GuidesPage() {
  const { currentDestination, addBooking } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [selectedGuideForBooking, setSelectedGuideForBooking] = useState(null);

  const categories = [
    'All',
    'Historical tours',
    'Local culture',
    'Food tours',
    'Nature and trekking',
    'Temple and spiritual tours',
    'Photography tours'
  ];

  const languages = ['All', 'Tamil', 'English', 'Hindi', 'French', 'Malayalam', 'Telugu', 'Sanskrit', 'Badaga'];

  // Filter guides based on destination, query, category, language
  const filteredGuides = guides.filter(g => {
    // Check destination match or global
    const matchesDest = !currentDestination || g.destinationId === currentDestination.id;
    const matchesQuery =
      g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || g.category === selectedCategory;
    const matchesLang = selectedLanguage === 'All' || g.languages.includes(selectedLanguage);

    return matchesQuery && matchesCat && matchesLang;
  });

  const handleConfirmBooking = (bookingData) => {
    addBooking(bookingData);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-bold text-indigo-800 mb-2">
            <Users className="w-3.5 h-3.5 text-indigo-600" />
            <span>Govt. Certified Local Experts</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900">
            Hire Local Guides in {currentDestination.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Discover hidden architectural secrets, authentic street food walks, and spiritual heritage with verified scholars.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shrink-0">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>100% ID & License Verified</span>
        </div>
      </div>

      {/* Filter Bar & Search */}
      <div className="space-y-4 bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onClear={() => setSearchQuery('')}
          placeholder="Search by guide name, tour specialization, or landmark..."
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          destinationName={currentDestination.name}
        />

        {/* Secondary Language & Sorting row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-600">Language:</span>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs bg-white text-slate-700 focus:outline-none"
            >
              {languages.map(l => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>

          <div className="text-slate-400 font-medium">
            Showing {filteredGuides.length} certified guides
          </div>
        </div>
      </div>

      {/* Guides Grid */}
      {filteredGuides.length === 0 ? (
        <EmptyState
          title="No guides matching your criteria"
          description="Try broadening your category filter or searching for a different destination."
          actionText="Reset Search"
          onAction={() => {
            setSearchQuery('');
            setSelectedCategory('All');
            setSelectedLanguage('All');
          }}
          icon={Users}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map(guide => (
            <GuideCard
              key={guide.id}
              guide={guide}
              onBook={(g) => setSelectedGuideForBooking(g)}
            />
          ))}
        </div>
      )}

      {/* Booking Modal */}
      {selectedGuideForBooking && (
        <BookingModal
          isOpen={!!selectedGuideForBooking}
          onClose={() => setSelectedGuideForBooking(null)}
          type="guide"
          item={selectedGuideForBooking}
          onConfirm={handleConfirmBooking}
        />
      )}
    </div>
  );
}
