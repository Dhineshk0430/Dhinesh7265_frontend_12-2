import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, Sparkles } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center">
      <div className="w-20 h-20 rounded-3xl bg-sky-50 text-sky-500 flex items-center justify-center mb-6 shadow-sm">
        <Compass className="w-10 h-10 animate-spin" style={{ animationDuration: '8s' }} />
      </div>

      <span className="text-xs font-bold text-sky-600 uppercase tracking-wider bg-sky-50 px-3 py-1 rounded-full mb-3">
        404 • Destination Not Found
      </span>

      <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-slate-900 tracking-tight mb-3">
        Off the Beaten Path
      </h1>

      <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-8 leading-relaxed">
        The route or destination you are looking for has either moved or doesn't exist. Let's get you back on track!
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold shadow-md transition-all"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>

        <Link
          to="/planner"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold shadow-xs transition-colors"
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>AI Trip Planner</span>
        </Link>
      </div>
    </div>
  );
}
