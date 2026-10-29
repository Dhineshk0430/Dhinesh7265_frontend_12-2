import React from 'react';
import { Users, Clock, Zap, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { calculateVehicleFare, formatCurrency } from '../utils/calculations';

export default function VehicleCard({ vehicle, distanceKm = 5, isSelected, onSelect }) {
  const { settings } = useApp();
  const fareObj = calculateVehicleFare(vehicle, distanceKm);

  return (
    <div
      onClick={() => onSelect(vehicle)}
      className={`group relative p-4 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between ${
        isSelected
          ? 'bg-sky-50/70 border-sky-500 ring-2 ring-sky-400 shadow-md'
          : 'bg-white border-slate-200/90 hover:border-sky-300 hover:shadow-xs'
      }`}
    >
      <div className="flex items-start gap-3.5">
        <div className="relative w-16 h-16 rounded-2xl bg-slate-100 p-1 shrink-0 overflow-hidden border border-slate-200/70">
          <img
            src={vehicle.image}
            alt={vehicle.name}
            className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform"
          />
          {isSelected && (
            <div className="absolute top-1 right-1 bg-sky-500 text-white rounded-full p-0.5">
              <Check className="w-3 h-3 stroke-[3]" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1">
            <h4 className="text-sm font-bold text-slate-900 font-display group-hover:text-sky-600 transition-colors">
              {vehicle.name}
            </h4>
            <div className="text-right">
              <span className="text-base font-extrabold text-slate-900 font-display">
                {formatCurrency(fareObj.totalFare, settings.currency)}
              </span>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
            {vehicle.tagline}
          </p>

          <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-2">
            <span className="flex items-center gap-1 font-medium text-emerald-600">
              <Zap className="w-3 h-3 text-emerald-500" />
              {vehicle.etaMinutes} mins away
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3 text-slate-400" />
              {vehicle.capacity} {vehicle.capacity === 1 ? 'seat' : 'seats'}
            </span>
            <span className="flex items-center gap-1 text-slate-400">
              <Clock className="w-3 h-3" />
              ~{fareObj.estMinutes} mins ride
            </span>
          </div>
        </div>
      </div>

      <div className="pt-3 mt-2 border-t border-slate-100/80 flex items-center justify-between text-[11px]">
        <span className="text-slate-400">Base fare: ₹{vehicle.baseFare} + ₹{vehicle.perKmRate}/km</span>
        <button
          type="button"
          className={`px-3 py-1 rounded-xl font-semibold transition-colors ${
            isSelected
              ? 'bg-sky-500 text-white shadow-xs'
              : 'bg-slate-100 text-slate-700 hover:bg-sky-500 hover:text-white'
          }`}
        >
          {isSelected ? 'Selected' : 'Choose'}
        </button>
      </div>
    </div>
  );
}
