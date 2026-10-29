import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { aiPlannerService } from '../services/aiPlannerService';
import {
  Sparkles,
  MapPin,
  Calendar,
  Users,
  Wallet,
  Compass,
  Car,
  Hotel,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Zap
} from 'lucide-react';

export default function PlannerPage() {
  const { currentDestination, allDestinations, saveItinerary, showToast } = useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const preselectedDest = searchParams.get('destination') || currentDestination.name;

  const [formData, setFormData] = useState({
    startLocation: 'Chennai',
    destination: preselectedDest,
    startDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    durationDays: 3,
    travelers: 2,
    budget: 5000,
    travelStyle: 'Culture & Heritage',
    preferredTransport: 'Auto Rickshaw (Breezy & Local)',
    accommodationPreference: 'Hostel & Social Dorms',
    specialInterests: 'Dravidian temple architecture, Chettinad feasts, and scenic hill views'
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);

  const stepsText = [
    'Analyzing destination geography & historic landmarks...',
    'Curating morning, afternoon & sunset cultural activities...',
    'Calculating realistic intra-city cab transit durations...',
    'Pairing top-rated local dining & heritage accommodations...',
    'Finalizing weather backup plans & cost breakdown...'
  ];

  const travelStyles = [
    'Culture & Heritage',
    'Adventure & Trekking',
    'Family Vacation',
    'Solo Backpacking',
    'Romantic Couple Escape',
    'Nature & Relaxation',
    'Spiritual & Temple Trails',
    'Food & Culinary Discovery'
  ];

  const transportOptions = [
    'Bike Taxi (Solo / Quick)',
    'Auto Rickshaw (Breezy & Local)',
    'Mini Cab (Compact AC)',
    'Sedan (Prime Comfort)',
    'SUV / XL (Family Space)'
  ];

  const accommodationOptions = [
    'Hostel & Social Dorms',
    'Heritage Resort / Chettinad Stay',
    'Guest House & Homestay',
    '5-Star Luxury Palace / Beach Resort'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    setGenerationStep(0);

    const stepInterval = setInterval(() => {
      setGenerationStep(prev => (prev < stepsText.length - 1 ? prev + 1 : prev));
    }, 350);

    try {
      const generated = await aiPlannerService.generateItinerary(formData);
      clearInterval(stepInterval);
      saveItinerary(generated);
      showToast(`Itinerary generated for ${generated.destination}!`, 'success');
      navigate(`/planner/${generated.id}`);
    } catch (err) {
      clearInterval(stepInterval);
      setIsGenerating(false);
      showToast('Failed to generate itinerary. Please try again.', 'error');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-800">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>AI Smart Itinerary Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
          Design Your Ideal Itinerary
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Our intelligent trip engine balances cultural sites, authentic cuisine, realistic travel times, verified guides, and contingency weather plans.
        </p>
      </div>

      {/* Main Generator Form */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-sky-900/5 p-6 sm:p-10 relative overflow-hidden">
        {isGenerating ? (
          <div className="py-16 text-center space-y-6 max-w-md mx-auto animate-in fade-in duration-300">
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-sky-100 border-t-sky-500 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center text-sky-500">
                <Sparkles className="w-8 h-8 text-amber-500 animate-pulse" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold font-display text-slate-900">
                Generating Your Custom Itinerary
              </h3>
              <p className="text-xs text-slate-500 mt-2 font-medium">
                {stepsText[generationStep]}
              </p>
            </div>

            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-sky-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((generationStep + 1) / stepsText.length) * 100}%` }}
              />
            </div>

            <p className="text-[11px] text-slate-400">
              Rule-based destination matching & AI trip formulation
            </p>
          </div>
        ) : (
          <form onSubmit={handleGenerate} className="space-y-6">
            {/* Top Row: Starting Location & Destination */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Starting City / Origin
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    name="startLocation"
                    value={formData.startLocation}
                    onChange={handleChange}
                    placeholder="e.g. New Delhi, Mumbai, Bengaluru"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-400 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Destination
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-sky-500 absolute left-3.5 top-3" />
                  <select
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:ring-2 focus:ring-sky-400 focus:outline-none"
                  >
                    {allDestinations.map(d => (
                      <option key={d.id} value={d.name}>
                        {d.name} ({d.state ? `${d.state}, ${d.country}` : d.country})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Second Row: Start Date, Duration, Travelers */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Travel Start Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-400 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Duration (Days)
                </label>
                <select
                  name="durationDays"
                  value={formData.durationDays}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:ring-2 focus:ring-sky-400 focus:outline-none"
                >
                  <option value={1}>1 Day (Quick Highlights)</option>
                  <option value={2}>2 Days (Weekend Getaway)</option>
                  <option value={3}>3 Days (Classic Comprehensive)</option>
                  <option value={4}>4 Days (Deep Discovery)</option>
                  <option value={5}>5 Days (Extended Vacation)</option>
                  <option value={7}>7 Days (Full Grand Tour)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Number of Travelers
                </label>
                <select
                  name="travelers"
                  value={formData.travelers}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:ring-2 focus:ring-sky-400 focus:outline-none"
                >
                  <option value={1}>1 Solo Explorer</option>
                  <option value={2}>2 Travelers (Couple/Duo)</option>
                  <option value={3}>3 Friends / Small Group</option>
                  <option value={4}>4 Family / Friends</option>
                  <option value={6}>6 Group / Big Family</option>
                </select>
              </div>
            </div>

            {/* Third Row: Travel Style & Total Budget */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Travel Style
                </label>
                <select
                  name="travelStyle"
                  value={formData.travelStyle}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:ring-2 focus:ring-sky-400 focus:outline-none"
                >
                  {travelStyles.map(style => (
                    <option key={style} value={style}>
                      {style}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Total Budget Target (₹ INR)
                </label>
                <div className="relative">
                  <Wallet className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    step={500}
                    min={1000}
                    placeholder="5000"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-400 focus:outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Fourth Row: Transport & Accommodation Preference */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Preferred Intra-City Transit
                </label>
                <select
                  name="preferredTransport"
                  value={formData.preferredTransport}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:ring-2 focus:ring-sky-400 focus:outline-none"
                >
                  {transportOptions.map(t => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Accommodation Preference
                </label>
                <select
                  name="accommodationPreference"
                  value={formData.accommodationPreference}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:ring-2 focus:ring-sky-400 focus:outline-none"
                >
                  {accommodationOptions.map(acc => (
                    <option key={acc} value={acc}>
                      {acc}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Interests & Special Requirements */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Interests & Special Requirements
              </label>
              <textarea
                name="specialInterests"
                value={formData.specialInterests}
                onChange={handleChange}
                rows={2}
                placeholder="e.g. Vegetarian food only, early morning photography, avoid strenuous climbs, love royal architecture..."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-400 focus:outline-none"
              />
            </div>

            {/* Submit CTA */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Deterministic rule-based demo engine. Fully editable after generation.</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold shadow-lg hover:shadow-xl transition-all"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Generate My Trip</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
