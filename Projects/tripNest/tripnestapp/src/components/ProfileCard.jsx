import React from 'react';
import { Mail, Phone, MapPin, Globe, Sparkles, Wallet, Car, Utensils, ShieldCheck } from 'lucide-react';

export default function ProfileCard({ user }) {
  if (!user) return null;

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 overflow-hidden relative">
      {/* Background ambient gradient */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-sky-400 via-sky-500 to-indigo-500 opacity-90" />

      <div className="relative pt-6 flex flex-col items-center text-center">
        <div className="relative">
          <img
            src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
            alt={user.name}
            className="w-24 h-24 rounded-full object-cover ring-4 ring-white shadow-md mx-auto"
          />
          <div className="absolute bottom-1 right-1 bg-emerald-500 text-white rounded-full p-1" title="Verified Member">
            <ShieldCheck className="w-4 h-4 fill-emerald-500 text-white" />
          </div>
        </div>

        <h3 className="text-xl font-bold font-display text-slate-900 mt-3">{user.name}</h3>
        <p className="text-xs text-slate-500 max-w-xs mt-1 italic">
          "{user.bio || 'Smart explorer on TripNest'}"
        </p>

        <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>TripNest Explorer Member</span>
        </div>
      </div>

      {/* Profile Details List */}
      <div className="mt-6 pt-6 border-t border-slate-100 space-y-3 text-xs">
        <div className="flex items-center justify-between text-slate-600">
          <span className="flex items-center gap-2 text-slate-400">
            <Mail className="w-4 h-4 text-sky-500 shrink-0" /> Email
          </span>
          <span className="font-medium text-slate-800 truncate max-w-[170px]">{user.email}</span>
        </div>

        <div className="flex items-center justify-between text-slate-600">
          <span className="flex items-center gap-2 text-slate-400">
            <Phone className="w-4 h-4 text-emerald-500 shrink-0" /> Mobile
          </span>
          <span className="font-medium text-slate-800">{user.phone || '+91 98765 43210'}</span>
        </div>

        <div className="flex items-center justify-between text-slate-600">
          <span className="flex items-center gap-2 text-slate-400">
            <MapPin className="w-4 h-4 text-rose-500 shrink-0" /> Home City
          </span>
          <span className="font-medium text-slate-800">{user.homeCity || 'Mumbai, India'}</span>
        </div>

        <div className="flex items-center justify-between text-slate-600">
          <span className="flex items-center gap-2 text-slate-400">
            <Globe className="w-4 h-4 text-indigo-500 shrink-0" /> Language
          </span>
          <span className="font-medium text-slate-800">{user.preferredLanguage || 'English'}</span>
        </div>

        <div className="flex items-center justify-between text-slate-600">
          <span className="flex items-center gap-2 text-slate-400">
            <Wallet className="w-4 h-4 text-amber-500 shrink-0" /> Budget
          </span>
          <span className="font-medium text-slate-800">{user.preferredBudget || 'Moderate'}</span>
        </div>

        <div className="flex items-center justify-between text-slate-600">
          <span className="flex items-center gap-2 text-slate-400">
            <Car className="w-4 h-4 text-emerald-500 shrink-0" /> Transport
          </span>
          <span className="font-medium text-slate-800">{user.preferredTransport || 'Sedan / Mini'}</span>
        </div>

        <div className="flex items-center justify-between text-slate-600">
          <span className="flex items-center gap-2 text-slate-400">
            <Utensils className="w-4 h-4 text-orange-500 shrink-0" /> Diet
          </span>
          <span className="font-medium text-slate-800">{user.dietaryPreferences || 'No restrictions'}</span>
        </div>
      </div>

      {/* Travel interests tags */}
      {user.travelInterests && user.travelInterests.length > 0 && (
        <div className="mt-5 pt-4 border-t border-slate-100">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Travel Interests
          </div>
          <div className="flex flex-wrap gap-1.5">
            {user.travelInterests.map((interest, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg bg-sky-50 text-sky-800 text-[11px] font-medium border border-sky-100"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
