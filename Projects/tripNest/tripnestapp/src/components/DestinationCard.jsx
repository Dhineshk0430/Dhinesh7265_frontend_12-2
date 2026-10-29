import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin, Sparkles, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function DestinationCard({ destination }) {
  const navigate = useNavigate();
  const { setCurrentDestination } = useApp();

  const handleSelect = () => {
    setCurrentDestination(destination);
    navigate(`/explore`);
  };

  const handlePlanTrip = (e) => {
    e.stopPropagation();
    setCurrentDestination(destination);
    navigate(`/planner?destination=${encodeURIComponent(destination.name)}`);
  };

  return (
    <div
      onClick={handleSelect}
      className="group relative bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm card-hover cursor-pointer flex flex-col h-full"
    >
      <div className="relative h-52 w-full overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20" />

        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1 text-xs font-bold text-slate-800 shadow-xs">
          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          <span>{destination.rating}</span>
          <span className="text-slate-400 font-normal">({destination.reviewsCount})</span>
        </div>

        <div className="absolute top-3 right-3 bg-sky-500/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-semibold text-white shadow-xs">
          {destination.avgTemp}
        </div>

        <div className="absolute bottom-3 left-3 right-3 text-white">
          <div className="flex items-center gap-1 text-sky-300 text-xs font-medium">
            <MapPin className="w-3.5 h-3.5" />
            <span>{destination.state ? `${destination.state}, ${destination.country}` : destination.country}</span>
          </div>
          <h3 className="text-xl font-bold font-display drop-shadow-sm leading-tight mt-0.5">
            {destination.name}
          </h3>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {destination.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mt-3">
            {destination.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-400 font-medium">
            Best: {destination.bestTimeToVisit.split('&')[0]}
          </span>
          <button
            onClick={handlePlanTrip}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-500 text-sky-700 hover:text-white text-xs font-semibold transition-all group/btn"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500 group-hover/btn:text-white" />
            <span>AI Plan</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
