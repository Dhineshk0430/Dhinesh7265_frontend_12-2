import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/logo.png';
import { Heart, ShieldCheck, MapPin, Sparkles, Car, Compass, Users } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-14 pb-20 lg:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <img src={logoImg} alt="TripNest" className="h-10 w-auto object-contain transition-transform hover:scale-105" />
              <span className="text-2xl font-bold font-display text-white tracking-tight">
                Trip<span className="text-sky-400">Nest</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Explore Tamil Nadu’s sacred heritage temples, misty Nilgiri hill stations, Coromandel beaches, hire certified Tamil guides, book instant rides, discover legendary tiffin spots, and navigate with online & offline maps.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-xs text-sky-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Realistic Demo Mode with localStorage persistence</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 tracking-wider uppercase font-display">
              Smart Planning
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/planner" className="hover:text-sky-400 transition-colors flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" /> AI Trip Planner
                </Link>
              </li>
              <li>
                <Link to="/explore" className="hover:text-sky-400 transition-colors flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-sky-400" /> Explore Destinations
                </Link>
              </li>
              <li>
                <Link to="/map" className="hover:text-sky-400 transition-colors flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" /> Offline / Online Map
                </Link>
              </li>
              <li>
                <Link to="/trips" className="hover:text-sky-400 transition-colors">
                  My Saved Itineraries
                </Link>
              </li>
            </ul>
          </div>

          {/* Bookings & Rides */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 tracking-wider uppercase font-display">
              Rides & Discovery
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/cabs" className="hover:text-sky-400 transition-colors flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5 text-emerald-400" /> Cab & Bike Booking
                </Link>
              </li>
              <li>
                <Link to="/guides" className="hover:text-sky-400 transition-colors flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-indigo-400" /> Hire Local Guides
                </Link>
              </li>
              <li>
                <Link to="/restaurants" className="hover:text-sky-400 transition-colors">
                  Dining & Cafes
                </Link>
              </li>
              <li>
                <Link to="/hotels" className="hover:text-sky-400 transition-colors">
                  Hotels & Homestays
                </Link>
              </li>
              <li>
                <Link to="/bookings" className="hover:text-sky-400 transition-colors">
                  Manage Bookings
                </Link>
              </li>
            </ul>
          </div>

          {/* Account & Settings */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 tracking-wider uppercase font-display">
              User Portal
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/profile" className="hover:text-sky-400 transition-colors">
                  Traveler Profile
                </Link>
              </li>
              <li>
                <Link to="/favourites" className="hover:text-sky-400 transition-colors">
                  Saved Favourites
                </Link>
              </li>
              <li>
                <Link to="/settings" className="hover:text-sky-400 transition-colors">
                  Preferences & Currency
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-sky-400 transition-colors">
                  Demo Sign In
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-sky-400 transition-colors">
                  Create Demo Account
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 TripNest. Built for seamless travel planning & navigation.</p>
          <div className="flex items-center gap-6">
            <span>Demo Persistence: localStorage</span>
            <span>Leaflet & OpenStreetMap</span>
            <span>Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
