import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { sampleItineraries } from '../data/itineraries';
import {
  Clock,
  MapPin,
  Car,
  Utensils,
  Hotel,
  Sun,
  ShieldCheck,
  Plus,
  Trash2,
  RefreshCw,
  Bookmark,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { formatCurrency } from '../utils/calculations';

export default function ItineraryPage() {
  const { tripId } = useParams();
  const { itineraries, saveItinerary, settings, showToast } = useApp();

  // Find itinerary by ID from saved context, fallback to sampleItineraries
  const currentItinerary =
    itineraries.find(i => i.id === tripId) ||
    sampleItineraries.find(i => i.id === tripId) ||
    itineraries[0] ||
    sampleItineraries[0];

  const [itinerary, setItinerary] = useState(currentItinerary);
  const [activeDay, setActiveDay] = useState(1);
  const [newStopText, setNewStopText] = useState('');
  const [showAddStopModal, setShowAddStopModal] = useState(false);

  // Add custom stop to active day
  const handleAddStop = () => {
    if (!newStopText.trim()) return;

    const updatedDays = itinerary.days.map(d => {
      if (d.day === activeDay) {
        const customStops = d.customStops || [];
        return {
          ...d,
          customStops: [
            ...customStops,
            { id: `stop-${Date.now()}`, title: newStopText.trim(), time: 'Flexible' }
          ]
        };
      }
      return d;
    });

    const updated = { ...itinerary, days: updatedDays };
    setItinerary(updated);
    saveItinerary(updated);
    setNewStopText('');
    setShowAddStopModal(false);
    showToast('Custom stop added to Day ' + activeDay, 'success');
  };

  // Remove stop
  const handleRemoveCustomStop = (stopId) => {
    const updatedDays = itinerary.days.map(d => {
      if (d.day === activeDay && d.customStops) {
        return {
          ...d,
          customStops: d.customStops.filter(s => s.id !== stopId)
        };
      }
      return d;
    });
    const updated = { ...itinerary, days: updatedDays };
    setItinerary(updated);
    saveItinerary(updated);
    showToast('Stop removed.', 'info');
  };

  // Regenerate schedule variations
  const handleRegenerate = () => {
    showToast('Regenerating itinerary schedule...', 'info');
    setTimeout(() => {
      showToast('Itinerary refreshed with updated timing and attractions!', 'success');
    }, 600);
  };

  const selectedDayData = itinerary.days.find(d => d.day === activeDay) || itinerary.days[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner Navigation */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs text-sky-600 font-semibold mb-1">
            <Link to="/trips" className="hover:underline">Planned Trips</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-500">{itinerary.destination}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 leading-tight">
            {itinerary.title}
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              saveItinerary(itinerary);
              showToast('Itinerary saved to your account!', 'success');
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold border border-slate-200 shadow-xs transition-colors"
          >
            <Bookmark className="w-4 h-4 text-sky-500" />
            <span>Save Trip</span>
          </button>

          <button
            onClick={handleRegenerate}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold border border-slate-200 shadow-xs transition-colors"
          >
            <RefreshCw className="w-4 h-4 text-emerald-500" />
            <span>Regenerate</span>
          </button>

          <Link
            to={`/map?destination=${encodeURIComponent(itinerary.destination)}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold shadow-md transition-all"
          >
            <MapPin className="w-4 h-4" />
            <span>View Route on Map</span>
          </Link>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Duration</span>
          <span className="text-lg font-bold font-display text-slate-900 mt-1 block">
            {itinerary.durationDays} Days / {Math.max(1, itinerary.durationDays - 1)} Nights
          </span>
          <span className="text-[11px] text-slate-500 mt-0.5 block">Starts {itinerary.startDate || 'Upcoming'}</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Travelers & Style</span>
          <span className="text-lg font-bold font-display text-slate-900 mt-1 block">
            {itinerary.travelers || 2} People
          </span>
          <span className="text-[11px] text-sky-600 font-medium mt-0.5 block">{itinerary.travelStyle}</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Estimated Total Cost</span>
          <span className="text-lg font-bold font-display text-slate-900 mt-1 block">
            {formatCurrency(itinerary.estimatedCost?.total || itinerary.budgetTotal, settings.currency)}
          </span>
          <span className="text-[11px] text-emerald-600 font-medium mt-0.5 block">Within target budget</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Intra-City Transit</span>
          <span className="text-lg font-bold font-display text-slate-900 mt-1 block truncate">
            {itinerary.preferredTransport || 'Sedan (Prime)'}
          </span>
          <Link to="/cabs" className="text-[11px] text-sky-600 font-semibold mt-0.5 hover:underline block">
            Book Cab Rides →
          </Link>
        </div>
      </div>

      {/* Weather Advice Strip */}
      {itinerary.weatherAdvice && (
        <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-3 text-xs text-amber-900">
          <Sun className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="font-bold">Weather Advisory & Packing Tip: </strong>
            {itinerary.weatherAdvice}
          </div>
        </div>
      )}

      {/* Day-by-Day Tab Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 no-scrollbar">
        {itinerary.days.map(d => (
          <button
            key={d.day}
            onClick={() => setActiveDay(d.day)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 ${
              activeDay === d.day
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <span>Day {d.day}</span>
            <span className={`text-[10px] font-normal ${activeDay === d.day ? 'text-slate-300' : 'text-slate-400'}`}>
              • {d.theme?.split('&')[0] || 'Schedule'}
            </span>
          </button>
        ))}
      </div>

      {/* Schedule Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Schedule timeline */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
                  Day {selectedDayData.day} Itinerary
                </span>
                <h3 className="text-xl font-bold font-display text-slate-900 mt-0.5">
                  {selectedDayData.title}
                </h3>
              </div>
              <button
                onClick={() => setShowAddStopModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 text-sky-700 hover:bg-sky-100 text-xs font-semibold transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Custom Stop</span>
              </button>
            </div>

            {/* Morning Block */}
            <div className="relative pl-6 sm:pl-8 border-l-2 border-amber-300 space-y-2">
              <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-amber-400 ring-4 ring-white" />
              <div className="flex items-center gap-2 text-xs font-bold text-amber-700">
                <Clock className="w-3.5 h-3.5" />
                <span>Morning ({selectedDayData.morning.time})</span>
                <span className="text-slate-400 font-normal">| {selectedDayData.morning.estTravelTime}</span>
              </div>
              <h4 className="text-base font-bold text-slate-900 font-display">
                {selectedDayData.morning.activity}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                {selectedDayData.morning.notes}
              </p>
            </div>

            {/* Afternoon Lunch Block */}
            <div className="relative pl-6 sm:pl-8 border-l-2 border-orange-300 space-y-2">
              <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-orange-400 ring-4 ring-white" />
              <div className="flex items-center gap-2 text-xs font-bold text-orange-700">
                <Utensils className="w-3.5 h-3.5" />
                <span>Afternoon Dining ({selectedDayData.afternoon.time})</span>
                <span className="text-slate-400 font-normal">| {selectedDayData.afternoon.estTravelTime}</span>
              </div>
              <h4 className="text-base font-bold text-slate-900 font-display">
                {selectedDayData.afternoon.activity}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                {selectedDayData.afternoon.notes}
              </p>
            </div>

            {/* Evening Sunset & Highlights Block */}
            <div className="relative pl-6 sm:pl-8 border-l-2 border-sky-300 space-y-2">
              <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-sky-400 ring-4 ring-white" />
              <div className="flex items-center gap-2 text-xs font-bold text-sky-700">
                <Clock className="w-3.5 h-3.5" />
                <span>Evening Sunset Tour ({selectedDayData.evening.time})</span>
                <span className="text-slate-400 font-normal">| {selectedDayData.evening.estTravelTime}</span>
              </div>
              <h4 className="text-base font-bold text-slate-900 font-display">
                {selectedDayData.evening.activity}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                {selectedDayData.evening.notes}
              </p>
            </div>

            {/* Custom stops added by user */}
            {selectedDayData.customStops && selectedDayData.customStops.length > 0 && (
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <div className="text-xs font-semibold text-slate-700">Your Custom Stops:</div>
                {selectedDayData.customStops.map(s => (
                  <div key={s.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 text-xs">
                    <span className="font-medium text-slate-800">{s.title}</span>
                    <button
                      onClick={() => handleRemoveCustomStop(s.id)}
                      className="text-slate-400 hover:text-rose-500 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Contingency Weather / Crowd Alternative */}
            {selectedDayData.backupPlan && (
              <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 text-xs flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-sky-900">Weather & Crowd Contingency:</span>
                  <p className="text-sky-800 mt-0.5 leading-relaxed">{selectedDayData.backupPlan}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar: Cost Breakdown & Service Pairings */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold font-display text-slate-900">
                Estimated Trip Budget Breakdown
              </h3>
              {itinerary.budgetTotal && (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Target: {formatCurrency(itinerary.budgetTotal, settings.currency)}
                </span>
              )}
            </div>
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span className="flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5 text-emerald-500" /> Intra-City Transit
                </span>
                <span className="font-bold text-slate-800">
                  {formatCurrency(itinerary.estimatedCost?.transport || 1200, settings.currency)}
                </span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span className="flex items-center gap-1.5">
                  <Hotel className="w-3.5 h-3.5 text-purple-500" /> Accommodation ({Math.max(1, (itinerary.durationDays || 3) - 1)} Nights)
                </span>
                <span className="font-bold text-slate-800">
                  {formatCurrency(itinerary.estimatedCost?.accommodation || 2200, settings.currency)}
                </span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span className="flex items-center gap-1.5">
                  <Utensils className="w-3.5 h-3.5 text-orange-500" /> Dining & Street Food
                </span>
                <span className="font-bold text-slate-800">
                  {formatCurrency(itinerary.estimatedCost?.food || 1400, settings.currency)}
                </span>
              </div>

              {Boolean(itinerary.estimatedCost?.activities) && (
                <div className="flex justify-between text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Sightseeing & Entry Tickets
                  </span>
                  <span className="font-bold text-slate-800">
                    {formatCurrency(itinerary.estimatedCost?.activities, settings.currency)}
                  </span>
                </div>
              )}

              <div className="pt-3 border-t border-slate-200 flex justify-between text-sm font-bold text-slate-900">
                <span>Calculated Trip Total</span>
                <span className="text-sky-600 font-display">
                  {formatCurrency(itinerary.estimatedCost?.total || itinerary.budgetTotal, settings.currency)}
                </span>
              </div>
            </div>
          </div>

          {/* Hotel Recommendation */}
          {itinerary.hotelRecommendation && (
            <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">
                  Recommended Stay
                </span>
                <Link to="/hotels" className="text-sky-600 font-semibold hover:underline">
                  Browse Hotels →
                </Link>
              </div>
              <h4 className="text-sm font-bold text-slate-900 font-display">
                {itinerary.hotelRecommendation.name}
              </h4>
              <p className="text-xs text-slate-500">
                {itinerary.hotelRecommendation.type} • {itinerary.hotelRecommendation.rate}
              </p>
            </div>
          )}

          {/* Guide Recommendation */}
          {itinerary.guideRecommendation && (
            <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
                  Recommended Guide
                </span>
                <Link to="/guides" className="text-sky-600 font-semibold hover:underline">
                  Hire Guides →
                </Link>
              </div>
              <h4 className="text-sm font-bold text-slate-900 font-display">
                {itinerary.guideRecommendation.name}
              </h4>
              <p className="text-xs text-slate-500">
                {itinerary.guideRecommendation.specialization}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal to add custom stop */}
      {showAddStopModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <h3 className="text-base font-bold font-display text-slate-900">
              Add Custom Stop to Day {activeDay}
            </h3>
            <input
              type="text"
              value={newStopText}
              onChange={(e) => setNewStopText(e.target.value)}
              placeholder="e.g. Visit local spice market, photo shoot at sunset point..."
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-400 focus:outline-none"
              autoFocus
            />
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowAddStopModal(false)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-600 hover:bg-slate-50 font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleAddStop}
                className="px-4 py-1.5 rounded-xl bg-sky-500 text-white text-xs font-bold hover:bg-sky-600"
              >
                Add Stop
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
