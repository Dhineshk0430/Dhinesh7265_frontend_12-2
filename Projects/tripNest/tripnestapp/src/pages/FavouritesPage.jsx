import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import EmptyState from '../components/EmptyState';
import { Heart, Trash2, ArrowRight, Star } from 'lucide-react';

export default function FavouritesPage() {
  const { favourites, toggleFavourite } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-xs font-bold text-rose-800 mb-2">
            <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
            <span>Saved Travel Collection</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900">
            My Saved Favourites ({favourites.length})
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Quickly access your saved attractions, dining spots, hotels, and guides.
          </p>
        </div>
      </div>

      {/* Favourites Grid */}
      {favourites.length === 0 ? (
        <EmptyState
          title="No favourites saved yet"
          description="Explore destinations, restaurants, or hotels and click the heart icon to save them for later."
          actionText="Start Exploring"
          actionLink="/explore"
          icon={Heart}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favourites.map(item => (
            <div
              key={item.id}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm card-hover flex flex-col justify-between"
            >
              <div className="relative h-44 w-full overflow-hidden">
                <img
                  src={item.image || item.photo || 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80'}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <button
                  onClick={() => toggleFavourite(item)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-rose-500 hover:bg-white shadow-xs"
                  title="Remove from favourites"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 text-[10px] font-bold text-slate-800 capitalize">
                  {item.type || 'Place'}
                </span>

                <div className="absolute bottom-3 left-3 right-3 text-white flex items-center justify-between text-xs">
                  <span className="font-bold flex items-center gap-1 text-amber-300">
                    <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                    {item.rating || '4.8'}
                  </span>
                  <span className="text-[11px] text-slate-200">
                    {item.destination || 'India'}
                  </span>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold font-display text-base text-slate-900 line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                    {item.cuisine || item.specialization || item.category || 'Curated recommendation'}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <Link
                    to={
                      item.type === 'restaurant' ? `/restaurants/${item.id}` :
                      item.type === 'hotel' ? `/hotels/${item.id}` :
                      item.type === 'guide' ? `/guides/${item.id}` :
                      '/explore'
                    }
                    className="text-sky-600 font-semibold hover:underline flex items-center gap-1"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    onClick={() => toggleFavourite(item)}
                    className="text-slate-400 hover:text-rose-500 font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
