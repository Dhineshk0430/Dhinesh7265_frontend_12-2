import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import logoImg from '../assets/logo.png';
import ToastContainer from '../components/ToastContainer';
import { Sparkles, Compass, ShieldCheck } from 'lucide-react';

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-100/50 flex flex-col justify-center py-10 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
        <Link to="/" className="inline-flex items-center gap-2 group">
          <img src={logoImg} alt="TripNest Logo" className="h-12 w-auto object-contain group-hover:scale-105 transition-transform" />
          <span className="text-3xl font-extrabold font-display text-slate-900 tracking-tight">
            Trip<span className="text-sky-500">Nest</span>
          </span>
        </Link>
        <p className="mt-2 text-sm text-slate-600">
          Tamil Nadu Travel Companion & Transit
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 shadow-xl shadow-sky-900/5 rounded-3xl border border-slate-100 sm:px-10">
          <Outlet />
        </div>

        <div className="mt-6 text-center text-xs text-slate-400 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-sky-500" />
          <span>Local simulated demo authentication. No real passwords stored.</span>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
