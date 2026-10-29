import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import BookingCard from '../components/BookingCard';
import EmptyState from '../components/EmptyState';
import {
  Briefcase,
  Car,
  Users,
  Hotel,
  Calendar,
  Sparkles,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export default function BookingsPage() {
  const { bookings, cancelBooking } = useApp();
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'cab' | 'guide' | 'hotel'

  const filteredBookings = bookings.filter(b => {
    if (activeTab === 'all') return true;
    return b.type === activeTab;
  });

  const tabCounts = {
    all: bookings.length,
    cab: bookings.filter(b => b.type === 'cab').length,
    guide: bookings.filter(b => b.type === 'guide').length,
    hotel: bookings.filter(b => b.type === 'hotel').length
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 mb-2">
            <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
            <span>Manage All Reservations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900">
            My Bookings & Rides
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track confirmed demo cab rides, certified local guides, and hotel reservations.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Demo bookings persist across sessions</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 no-scrollbar text-xs">
        {[
          { id: 'all', label: 'All Bookings', icon: Briefcase },
          { id: 'cab', label: 'Cab & Bike Rides', icon: Car },
          { id: 'guide', label: 'Local Guides', icon: Users },
          { id: 'hotel', label: 'Hotel Stays', icon: Hotel }
        ].map(tab => {
          const Icon = tab.icon;
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                {tabCounts[tab.id]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <EmptyState
          title={`No ${activeTab === 'all' ? '' : activeTab} bookings found`}
          description="Book a cab ride, certified local guide, or heritage hotel to manage your reservations here."
          actionText="Explore & Book"
          actionLink="/explore"
          icon={Briefcase}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredBookings.map(b => (
            <BookingCard key={b.id} booking={b} onCancel={cancelBooking} />
          ))}
        </div>
      )}
    </div>
  );
}
