import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import EmptyState from '../components/EmptyState';
import { Sparkles, MapPin, ArrowRight, Trash2, Plus } from 'lucide-react';
import { formatCurrency } from '../utils/calculations';

export default function TripsPage() {
  const { itineraries, deleteItinerary, settings } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-800 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>AI Itinerary Vault</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900">
            My Planned Trips & Itineraries
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Access your custom day-by-day travel schedules, cost breakdowns, and weather alternatives.
          </p>
        </div>

        <Link
          to="/planner"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Plan New Trip</span>
        </Link>
      </div>

      {/* Trips Grid */}
      {itineraries.length === 0 ? (
        <EmptyState
          title="No itineraries saved yet"
          description="Use our AI Trip Planner to create your first customized day-by-day vacation schedule."
          actionText="Plan My First Trip"
          actionLink="/planner"
          icon={Sparkles}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {itineraries.map((itn) => (
            <div
              key={itn.id}
              className="bg-white rounded-3xl border border-slate-100 shadow-sm card-hover p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-bold">
                    {itn.durationDays} Days • {itn.travelers || 2} Travelers
                  </span>
                  <button
                    onClick={() => deleteItinerary(itn.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors"
                    title="Delete itinerary"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <h3 className="text-lg font-bold font-display text-slate-900 line-clamp-1">
                  {itn.title}
                </h3>

                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-sky-500" />
                  <span>{itn.destination} • {itn.travelStyle}</span>
                </p>

                <div className="mt-4 p-3 rounded-2xl bg-slate-50 text-xs space-y-1 border border-slate-100">
                  <div className="flex justify-between text-slate-500">
                    <span>Estimated Total:</span>
                    <span className="font-extrabold text-slate-900">
                      {formatCurrency(itn.estimatedCost?.total || itn.budgetTotal, settings.currency)}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Start Date:</span>
                    <span className="font-medium text-slate-700">{itn.startDate || 'Upcoming'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  {itn.days?.length || itn.durationDays} days scheduled
                </span>
                <Link
                  to={`/planner/${itn.id}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all"
                >
                  <span>Open Schedule</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
