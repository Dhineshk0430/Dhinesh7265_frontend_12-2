import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Settings,
  DollarSign,
  Compass,
  Database,
  Trash2,
  CheckCircle2,
  ShieldCheck,
  RefreshCw,
  HardDrive
} from 'lucide-react';

export default function SettingsPage() {
  const { settings, setSettings, resetDemoData, showToast } = useApp();
  const [confirmReset, setConfirmReset] = useState(false);

  const handleCurrencyChange = (curr) => {
    setSettings(prev => ({ ...prev, currency: curr }));
    showToast(`Currency updated to ${curr}`, 'success');
  };

  const handleUnitChange = (unit) => {
    setSettings(prev => ({ ...prev, distanceUnit: unit }));
    showToast(`Distance unit set to ${unit === 'km' ? 'Kilometers (km)' : 'Miles (mi)'}`, 'success');
  };

  const handleReset = () => {
    if (confirmReset) {
      resetDemoData();
      setConfirmReset(false);
    } else {
      setConfirmReset(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 mb-2">
          <Settings className="w-3.5 h-3.5 text-slate-600" />
          <span>Application Settings</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900">
          Preferences & Storage Controls
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Configure display currencies, distance units, and manage browser demo persistence.
        </p>
      </div>

      <div className="space-y-6">
        {/* Currency & Units */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
          <h2 className="text-base font-bold font-display text-slate-900 pb-3 border-b border-slate-100">
            Regional Display Preferences
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Currency */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Display Currency
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'INR', label: 'INR (₹)' },
                  { id: 'USD', label: 'USD ($)' },
                  { id: 'EUR', label: 'EUR (€)' }
                ].map(c => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => handleCurrencyChange(c.id)}
                    className={`p-3 rounded-2xl border text-xs font-bold transition-all ${
                      settings.currency === c.id
                        ? 'border-sky-500 bg-sky-50 text-sky-950 ring-2 ring-sky-300'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Distance Units */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Distance Measurement Unit
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'km', label: 'Kilometers (km)' },
                  { id: 'mi', label: 'Miles (mi)' }
                ].map(u => (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => handleUnitChange(u.id)}
                    className={`p-3 rounded-2xl border text-xs font-bold transition-all ${
                      settings.distanceUnit === u.id
                        ? 'border-sky-500 bg-sky-50 text-sky-950 ring-2 ring-sky-300'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {u.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Offline Cache & Storage Status */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <h2 className="text-base font-bold font-display text-slate-900 pb-3 border-b border-slate-100 flex items-center justify-between">
            <span>Offline Cache & Persistence Status</span>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
              Active
            </span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[11px]">Storage Engine</span>
              <span className="font-bold text-slate-800 block mt-0.5">Browser LocalStorage</span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[11px]">Cached Destinations</span>
              <span className="font-bold text-slate-800 block mt-0.5">6 Preloaded Cities</span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[11px]">Offline Fallbacks</span>
              <span className="font-bold text-emerald-600 block mt-0.5">Enabled & Verified</span>
            </div>
          </div>
        </div>

        {/* Reset Demo Data */}
        <div className="bg-rose-50/60 p-6 rounded-3xl border border-rose-200/80 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-base font-bold font-display text-rose-900">
                Reset Demo Data
              </h2>
              <p className="text-xs text-rose-700 mt-1 leading-relaxed max-w-xl">
                Clears all custom bookings, itineraries, modified user profiles, and favorites from browser localStorage, and re-seeds clean initial demonstration records.
              </p>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                confirmReset
                  ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-md'
                  : 'bg-white border border-rose-300 text-rose-700 hover:bg-rose-100'
              }`}
            >
              {confirmReset ? 'Confirm Reset Now' : 'Reset All Demo Data'}
            </button>
          </div>

          {confirmReset && (
            <div className="text-xs text-rose-600 flex items-center justify-between pt-2 border-t border-rose-200">
              <span>Are you sure? This will reset all demo bookings and saved itineraries.</span>
              <button
                type="button"
                onClick={() => setConfirmReset(false)}
                className="text-xs underline text-slate-500 hover:text-slate-700"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
