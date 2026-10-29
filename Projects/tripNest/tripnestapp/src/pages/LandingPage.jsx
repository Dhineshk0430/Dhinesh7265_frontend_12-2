import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import DestinationCard from '../components/DestinationCard';
import {
  Sparkles,
  Compass,
  Car,
  Users,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Search,
  Wifi
} from 'lucide-react';

export default function LandingPage() {
  const { isAuthenticated } = useAuth();
  const { allDestinations, setCurrentDestination } = useApp();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const matched = allDestinations.find(
      d => d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           d.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    if (matched) {
      setCurrentDestination(matched);
      navigate(`/explore`);
    } else {
      navigate(`/explore?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 bg-gradient-to-b from-sky-50 via-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            {/* Pill Announcement */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-sky-100 text-xs font-bold text-sky-700 animate-in fade-in slide-in-from-top-4 duration-500">
              <span className="flex h-2 w-2 rounded-full bg-sky-500 animate-ping" />
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Next-Generation Travel Operating System</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-display text-slate-900 tracking-tight leading-[1.15]">
              Your Journey, <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-sky-500 via-sky-600 to-indigo-600 bg-clip-text text-transparent">
                Intelligently Planned.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              TripNest bridges smart AI itinerary planning with the on-demand convenience of ride-booking like Rapido, verified local guides, authentic restaurant discovery, and online/offline navigation.
            </p>

            {/* Hero Search Box */}
            <form
              onSubmit={handleSearchSubmit}
              className="mt-8 max-w-2xl mx-auto bg-white p-2 sm:p-2.5 rounded-2xl sm:rounded-3xl shadow-xl shadow-sky-900/5 border border-slate-200/80 flex flex-col sm:flex-row items-center gap-2"
            >
              <div className="flex-1 w-full flex items-center gap-3 px-3">
                <MapPin className="w-5 h-5 text-sky-500 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Where do you want to travel in Tamil Nadu? (e.g., Ooty, Madurai, Kodaikanal, Rameswaram, Chennai...)"
                  className="w-full text-sm text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl sm:rounded-2xl bg-sky-500 hover:bg-sky-600 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all"
                >
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </button>
              </div>
            </form>

            {/* Primary Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/planner"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold shadow-md hover:shadow-xl transition-all group"
              >
                <Sparkles className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                <span>Plan My Trip with AI</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/explore"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 text-sm font-bold border border-slate-200 shadow-sm transition-all"
              >
                <Compass className="w-4 h-4 text-sky-500" />
                <span>Start Exploring</span>
              </Link>

              <Link
                to="/cabs"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-sm font-bold border border-emerald-200 shadow-xs transition-all"
              >
                <Car className="w-4 h-4 text-emerald-600" />
                <span>Book Cabs & Bikes</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Feature Badges */}
        <div className="max-w-6xl mx-auto px-4 mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-100 shadow-xs flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-500">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">AI Itineraries</div>
              <div className="text-[11px] text-slate-400">Custom Day-by-Day</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-100 shadow-xs flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-500">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Rapido Cab Transit</div>
              <div className="text-[11px] text-slate-400">Bikes, Autos & Sedans</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-100 shadow-xs flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-500">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Verified Local Guides</div>
              <div className="text-[11px] text-slate-400">Govt. Certified Scholars</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-100 shadow-xs flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-sky-50 text-sky-500">
              <Wifi className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Online & Offline Maps</div>
              <div className="text-[11px] text-slate-400">Cached GPS & POIs</div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations Showcase */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
                Trending Getaways
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 mt-1">
                Featured Destinations
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Discover Tamil Nadu’s sacred temple towers, misty Nilgiri hills, Coromandel beaches, and legendary Chola architecture.
              </p>
            </div>
            <Link
              to="/explore"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:text-sky-700"
            >
              <span>Explore All Destinations</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allDestinations.slice(0, 6).map((dest) => (
              <DestinationCard key={dest.id} destination={dest} />
            ))}
          </div>
        </div>
      </section>

      {/* How TripNest Works */}
      <section className="py-16 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
              Smart Travel Operating System
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 mt-1">
              Everything You Need for a Perfect Trip
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              From the moment you start dreaming until you return home, TripNest handles every step.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center text-lg font-bold font-display mb-4">
                01
              </div>
              <h3 className="text-base font-bold text-slate-900 font-display mb-2">
                AI Custom Itineraries
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Enter your dates, travel style, and budget. Our smart planner creates morning, afternoon, and evening schedules with weather backups.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100">
                <Link to="/planner" className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1">
                  Try Planner <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg font-bold font-display mb-4">
                02
              </div>
              <h3 className="text-base font-bold text-slate-900 font-display mb-2">
                Instant Cab & Bike Rides
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Rapido-inspired transit booking. Choose Bike taxis for quick solo hops or Sedans and SUVs for family comfort with transparent demo fares.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100">
                <Link to="/cabs" className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
                  Book a Cab <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-lg font-bold font-display mb-4">
                03
              </div>
              <h3 className="text-base font-bold text-slate-900 font-display mb-2">
                Offline Maps & Certified Guides
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Never lose your way even when cell reception drops. Cache GPS positions, access emergency offline destination details, and hire top guides.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100">
                <Link to="/map" className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                  Open Navigator <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-sky-500 to-indigo-600 text-white">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            <span>Ready for Immediate Demonstration</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold font-display leading-tight">
            Ready to Experience the Future of Smart Travel?
          </h2>

          <p className="text-sky-100 text-sm sm:text-base max-w-xl mx-auto">
            Create your demo account in seconds or use our 1-click test login to explore all itineraries, guides, rides, and offline tools.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            {isAuthenticated ? (
              <Link
                to="/home"
                className="px-6 py-3.5 rounded-2xl bg-white text-slate-900 text-sm font-bold shadow-xl hover:bg-slate-50 transition-all"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="px-6 py-3.5 rounded-2xl bg-white text-slate-900 text-sm font-bold shadow-xl hover:bg-slate-50 transition-all"
                >
                  Create Free Account
                </Link>
                <Link
                  to="/login"
                  className="px-6 py-3.5 rounded-2xl bg-sky-900/40 hover:bg-sky-900/60 text-white text-sm font-bold border border-white/20 transition-all"
                >
                  Sign In with Demo
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
