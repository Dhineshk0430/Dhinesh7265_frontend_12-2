import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { Home, Sparkles, Compass, Briefcase, User } from 'lucide-react';

export default function MobileBottomNav() {
  const { isAuthenticated } = useAuth();
  const { bookings } = useApp();

  const activeBookingsCount = bookings.filter(b => b.status === 'Confirmed').length;

  const navItemClass = ({ isActive }) =>
    `flex flex-col items-center justify-center py-2 px-1 relative transition-colors ${
      isActive ? 'text-sky-600 font-semibold' : 'text-slate-500 hover:text-sky-500'
    }`;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/80 shadow-lg pb-safe">
      <div className="grid grid-cols-5 h-16">
        <NavLink to={isAuthenticated ? "/home" : "/"} className={navItemClass}>
          <Home className="w-5 h-5" />
          <span className="text-[10px] mt-1">Home</span>
        </NavLink>

        <NavLink to="/planner" className={navItemClass}>
          <Sparkles className="w-5 h-5 text-amber-500" />
          <span className="text-[10px] mt-1">AI Planner</span>
        </NavLink>

        <NavLink to="/explore" className={navItemClass}>
          <Compass className="w-5 h-5" />
          <span className="text-[10px] mt-1">Explore</span>
        </NavLink>

        <NavLink to="/bookings" className={navItemClass}>
          <div className="relative">
            <Briefcase className="w-5 h-5" />
            {activeBookingsCount > 0 && (
              <span className="absolute -top-1 -right-2 w-4 h-4 bg-sky-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {activeBookingsCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-1">Bookings</span>
        </NavLink>

        <NavLink to={isAuthenticated ? "/profile" : "/login"} className={navItemClass}>
          <User className="w-5 h-5" />
          <span className="text-[10px] mt-1">{isAuthenticated ? 'Profile' : 'Sign In'}</span>
        </NavLink>
      </div>
    </div>
  );
}
