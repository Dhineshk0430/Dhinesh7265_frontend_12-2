import React from 'react';
import { Search, MapPin, X } from 'lucide-react';

export default function SearchBar({
  value,
  onChange,
  onClear,
  placeholder = 'Search attractions, restaurants, guides, hotels...',
  categories = [],
  selectedCategory,
  onSelectCategory,
  destinationName
}) {
  return (
    <div className="w-full space-y-3">
      <div className="relative flex items-center bg-white rounded-2xl shadow-sm border border-slate-200/90 focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-100 transition-all p-1.5">
        <div className="pl-3 pr-2 text-slate-400">
          <Search className="w-5 h-5" />
        </div>

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent py-2 px-1 text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
        />

        {value && (
          <button
            onClick={onClear}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors mr-1"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {destinationName && (
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 text-sky-700 text-xs font-semibold shrink-0 border border-sky-100">
            <MapPin className="w-3.5 h-3.5 text-sky-500" />
            <span>{destinationName}</span>
          </div>
        )}
      </div>

      {categories.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id || selectedCategory === cat;
            const catId = cat.id || cat;
            const catLabel = cat.label || cat;

            return (
              <button
                key={catId}
                type="button"
                onClick={() => onSelectCategory(catId)}
                className={`px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-sky-500 text-white shadow-xs font-semibold'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                {catLabel}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
