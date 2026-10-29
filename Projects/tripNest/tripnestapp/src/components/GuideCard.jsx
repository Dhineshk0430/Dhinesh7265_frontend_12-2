import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Languages, CheckCircle, Heart, Calendar } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../utils/calculations';

export default function GuideCard({ guide, onBook }) {
  const { isFavourite, toggleFavourite, settings } = useApp();
  const isFav = isFavourite(guide.id);

  const handleToggleFav = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavourite({
      id: guide.id,
      name: guide.name,
      type: 'guide',
      specialization: guide.specialization,
      pricePerHour: guide.pricePerHour,
      rating: guide.rating,
      photo: guide.photo,
      destination: guide.destinationId
    });
  };

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm card-hover flex flex-col h-full relative">
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Guide Header: Photo, Verified Badge, Status */}
          <div className="flex items-start gap-4">
            <div className="relative shrink-0">
              <img
                src={guide.photo}
                alt={guide.name}
                className="w-16 h-16 rounded-2xl object-cover ring-4 ring-sky-50 shadow-xs"
              />
              {guide.verified && (
                <div className="absolute -bottom-1 -right-1 bg-sky-500 text-white rounded-full p-0.5" title="Verified Govt Guide">
                  <CheckCircle className="w-4 h-4 fill-sky-500 text-white" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-base font-bold text-slate-900 font-display truncate group-hover:text-sky-600 transition-colors">
                  {guide.name}
                </h3>
                <button
                  onClick={handleToggleFav}
                  className="p-1.5 rounded-full text-slate-400 hover:text-rose-500 hover:bg-slate-50 transition-colors"
                  aria-label={isFav ? "Remove favourite" : "Add to favourites"}
                >
                  <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                </button>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                <span>{guide.location}</span>
              </div>

              <div className="flex items-center gap-1 mt-1 text-xs font-semibold text-slate-800">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{guide.rating}</span>
                <span className="text-slate-400 font-normal">({guide.reviewCount} tours)</span>
              </div>
            </div>
          </div>

          {/* Badges / Specialization */}
          <div className="mt-3.5">
            <div className="text-xs font-semibold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-xl inline-block mb-1.5">
              {guide.category}
            </div>
            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
              {guide.intro}
            </p>
          </div>

          {/* Languages & Availability */}
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-1 truncate max-w-[65%]">
              <Languages className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{guide.languages.join(', ')}</span>
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {guide.availability}
            </span>
          </div>
        </div>

        {/* Action Bottom Bar */}
        <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="text-[10px] text-slate-400 font-semibold uppercase">Pricing</div>
            <div className="flex items-baseline gap-1">
              <span className="text-base font-extrabold text-slate-900 font-display">
                {formatCurrency(guide.pricePerHour, settings.currency)}
              </span>
              <span className="text-[11px] text-slate-400">/ hr</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/guides/${guide.id}`}
              className="py-2 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Profile
            </Link>
            <button
              onClick={() => onBook(guide)}
              className="py-2 px-3.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-xs font-semibold text-white shadow-xs transition-colors"
            >
              Book Guide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
