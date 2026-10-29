import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { guides } from '../data/guides';
import { useApp } from '../context/AppContext';
import BookingModal from '../components/BookingModal';
import {
  Star,
  MapPin,
  Languages,
  CheckCircle,
  Clock,
  Award,
  ArrowLeft,
  Heart
} from 'lucide-react';
import { formatCurrency } from '../utils/calculations';

export default function GuideDetailsPage() {
  const { guideId } = useParams();
  const { addBooking, isFavourite, toggleFavourite, settings } = useApp();
  const [showBookingModal, setShowBookingModal] = useState(false);

  const guide = guides.find(g => g.id === guideId) || guides[0];
  const isFav = isFavourite(guide.id);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back button */}
      <Link
        to="/guides"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-sky-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Local Guides</span>
      </Link>

      {/* Main Guide Profile Banner */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <div className="relative shrink-0">
            <img
              src={guide.photo}
              alt={guide.name}
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl object-cover ring-4 ring-sky-50 shadow-md"
            />
            {guide.verified && (
              <div className="absolute -bottom-2 -right-2 bg-sky-500 text-white rounded-full p-1" title="Govt Verified">
                <CheckCircle className="w-5 h-5 fill-sky-500 text-white" />
              </div>
            )}
          </div>

          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                  {guide.category}
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 mt-1">
                  {guide.name}
                </h1>
              </div>

              <button
                onClick={() => toggleFavourite({
                  id: guide.id,
                  name: guide.name,
                  type: 'guide',
                  rating: guide.rating,
                  photo: guide.photo
                })}
                className="p-2.5 rounded-full border border-slate-200 text-slate-400 hover:text-rose-500 hover:bg-slate-50 transition-colors"
              >
                <Heart className={`w-5 h-5 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-sky-500" />
                {guide.location}
              </span>
              <span className="flex items-center gap-1 font-bold text-slate-800">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                {guide.rating} ({guide.reviewCount} reviews)
              </span>
              <span className="flex items-center gap-1">
                <Award className="w-4 h-4 text-emerald-500" />
                {guide.experienceYears} Years Experience
              </span>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 pt-1">
              {guide.badges?.map((badge, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium"
                >
                  ✓ {badge}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="mt-8 pt-6 border-t border-slate-100 space-y-2">
          <h3 className="text-sm font-bold font-display text-slate-900">About {guide.name}</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {guide.intro}
          </p>
          <div className="flex items-center gap-2 pt-2 text-xs text-slate-500">
            <Languages className="w-4 h-4 text-slate-400" />
            <span>Fluent in: <strong>{guide.languages?.join(', ')}</strong></span>
          </div>
        </div>
      </div>

      {/* Available Tours Section */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold font-display text-slate-900">
            Curated Tour Packages
          </h3>
          <span className="text-xs text-slate-400">Fixed rate or hourly available</span>
        </div>

        <div className="space-y-3">
          {guide.tours?.map((tour) => (
            <div
              key={tour.id}
              className="p-4 rounded-2xl border border-slate-200/80 hover:border-sky-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
            >
              <div>
                <h4 className="text-sm font-bold text-slate-900">{tour.name}</h4>
                <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" /> {tour.duration}
                  </span>
                  <span>• Customizable route</span>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                <span className="text-base font-extrabold text-slate-900 font-display">
                  {formatCurrency(tour.price, settings.currency)}
                </span>
                <button
                  onClick={() => setShowBookingModal(true)}
                  className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold shadow-xs transition-colors"
                >
                  Book This Tour
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <BookingModal
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
          type="guide"
          item={guide}
          onConfirm={(data) => addBooking(data)}
        />
      )}
    </div>
  );
}
