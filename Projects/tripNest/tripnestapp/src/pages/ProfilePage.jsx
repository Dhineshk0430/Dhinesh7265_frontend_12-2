import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import ProfileCard from '../components/ProfileCard';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Wallet,
  Car,
  Utensils,
  Save,
  CheckCircle2,
  Camera,
  Sparkles
} from 'lucide-react';

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const { showToast } = useApp();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    avatar: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    homeCity: user?.homeCity || 'Mumbai, India',
    preferredLanguage: user?.preferredLanguage || 'English',
    preferredBudget: user?.preferredBudget || 'Moderate',
    preferredTransport: user?.preferredTransport || 'Sedan (Prime)',
    dietaryPreferences: user?.dietaryPreferences || 'Vegetarian Friendly',
    bio: user?.bio || '',
    travelInterests: user?.travelInterests || ['Heritage & Forts', 'Local Street Food']
  });

  const [isSaved, setIsSaved] = useState(false);

  const interestOptions = [
    'Heritage & Forts',
    'Local Street Food',
    'Photography & Scenic Views',
    'Nature & Mountain Treks',
    'Water Sports & Beaches',
    'Spiritual & Temple Tours',
    'Artisan Bazaars & Shopping',
    'Nightlife & Live Music'
  ];

  const handleInterestToggle = (interest) => {
    setFormData(prev => {
      const exists = prev.travelInterests.includes(interest);
      const updated = exists
        ? prev.travelInterests.filter(i => i !== interest)
        : [...prev.travelInterests, interest];
      return { ...prev, travelInterests: updated };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsSaved(true);
    showToast('Your profile and preferences have been updated successfully!', 'success');
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900">
          Traveler Profile & Preferences
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Customize your personal details to receive personalized AI recommendations and rapid booking defaults.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Profile Edit Form: 7 cols on desktop */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Header info */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="text-base font-bold font-display text-slate-800">
                Edit Personal Information
              </h2>
              {isSaved && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                  <CheckCircle2 className="w-4 h-4" /> Saved!
                </span>
              )}
            </div>

            {/* Avatar URL input */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Profile Photo URL
              </label>
              <div className="flex items-center gap-3">
                <img
                  src={formData.avatar}
                  alt="Avatar Preview"
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-sky-200 shrink-0"
                />
                <input
                  type="url"
                  name="avatar"
                  value={formData.avatar}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Full Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-400 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-400 focus:outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Phone & Home City */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mobile Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Home City
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    name="homeCity"
                    value={formData.homeCity}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Language & Preferred Budget */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Preferred Language
                </label>
                <select
                  name="preferredLanguage"
                  value={formData.preferredLanguage}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:ring-2 focus:ring-sky-400 focus:outline-none"
                >
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                  <option value="Japanese">Japanese</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Preferred Budget Tier
                </label>
                <select
                  name="preferredBudget"
                  value={formData.preferredBudget}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:ring-2 focus:ring-sky-400 focus:outline-none"
                >
                  <option value="Budget Backpacker">Budget Backpacker (Hostels & Street Eats)</option>
                  <option value="Moderate">Moderate (Boutique Havelis & Cafes)</option>
                  <option value="Luxury / Royal">Luxury / Royal (5-Star Palaces & Fine Dining)</option>
                </select>
              </div>
            </div>

            {/* Transport & Dietary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Preferred Transport Type
                </label>
                <select
                  name="preferredTransport"
                  value={formData.preferredTransport}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:ring-2 focus:ring-sky-400 focus:outline-none"
                >
                  <option value="Bike Taxi">Bike Taxi (Solo & Fast)</option>
                  <option value="Auto Rickshaw">Auto Rickshaw (Iconic & Breezy)</option>
                  <option value="Mini Cab">Mini Cab (AC Compact)</option>
                  <option value="Sedan (Prime)">Sedan (Prime Comfort)</option>
                  <option value="SUV / XL">SUV / XL (Family Space)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Dietary Preferences
                </label>
                <select
                  name="dietaryPreferences"
                  value={formData.dietaryPreferences}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:ring-2 focus:ring-sky-400 focus:outline-none"
                >
                  <option value="Vegetarian Friendly">Vegetarian Friendly</option>
                  <option value="100% Pure Vegetarian">100% Pure Vegetarian</option>
                  <option value="Vegan">Vegan Only</option>
                  <option value="Halal Certified">Halal Certified</option>
                  <option value="Jain Food">Jain Food (No root veggies)</option>
                  <option value="No Restrictions">No Restrictions</option>
                </select>
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Short Travel Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={2}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-400 focus:outline-none"
                placeholder="Tell other travelers and guides about your passions..."
              />
            </div>

            {/* Travel Interests (Chips) */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Travel Interests (Select all that apply)
              </label>
              <div className="flex flex-wrap gap-2">
                {interestOptions.map((opt) => {
                  const isChecked = formData.travelInterests.includes(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleInterestToggle(opt)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        isChecked
                          ? 'bg-sky-500 text-white shadow-xs font-semibold'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-slate-100">
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </form>
        </div>

        {/* Live Profile Card Preview: 5 cols on desktop, below on mobile */}
        <div className="lg:col-span-5 sticky top-24">
          <div className="mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
            Live Profile Card Preview
          </div>
          <ProfileCard user={formData} />
        </div>
      </div>
    </div>
  );
}
