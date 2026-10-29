import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import logoImg from '../assets/logo.png';
import {
  MapPin,
  Bell,
  Heart,
  User,
  LogOut,
  Settings,
  Briefcase,
  Compass,
  Sparkles,
  Car,
  Utensils,
  Hotel,
  Users,
  Map as MapIcon,
  Wifi,
  WifiOff,
  Menu,
  X,
  ChevronDown,
  CheckCircle2
} from 'lucide-react';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const {
    currentDestination,
    setCurrentDestination,
    allDestinations,
    notifications,
    unreadNotificationsCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    favourites,
    isOnline
  } = useApp();

  const [destMenuOpen, setDestMenuOpen] = useState(false);
  const [notifMenuOpen, setNotifMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const destRef = useRef(null);
  const notifRef = useRef(null);
  const userRef = useRef(null);
  const navigate = useNavigate();

  // Close popups on click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (destRef.current && !destRef.current.contains(e.target)) setDestMenuOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifMenuOpen(false);
      if (userRef.current && !userRef.current.contains(e.target)) setUserMenuOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate('/');
  };

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors px-3 py-1.5 rounded-lg flex items-center gap-1.5 ${
      isActive
        ? 'text-sky-600 bg-sky-50 font-semibold'
        : 'text-slate-600 hover:text-sky-600 hover:bg-slate-50'
    }`;

  return (
    <header className="sticky top-0 z-40 w-full glass-nav shadow-xs">
      {/* Offline Status Warning Strip */}
      {!isOnline && (
        <div className="bg-amber-500 text-white text-xs font-medium px-4 py-1 text-center flex items-center justify-center gap-2">
          <WifiOff className="w-3.5 h-3.5" />
          <span>Offline mode active: browsing cached destinations & local itineraries</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Destination Selector */}
          <div className="flex items-center gap-3 sm:gap-5 shrink-0">
            <Link to={isAuthenticated ? "/home" : "/"} className="flex items-center gap-2 group shrink-0">
              <img
                src={logoImg}
                alt="TripNest Logo"
                className="h-7 sm:h-8 w-auto object-contain transition-transform group-hover:scale-105 shrink-0"
              />
              <span className="text-lg sm:text-xl font-bold font-display tracking-tight text-slate-900 group-hover:text-sky-600 transition-colors shrink-0">
                Trip<span className="text-sky-500">Nest</span>
              </span>
            </Link>

            {/* Destination Selector Pill */}
            <div className="relative shrink-0" ref={destRef}>
              <button
                type="button"
                onClick={() => setDestMenuOpen(!destMenuOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-sky-50 hover:text-sky-700 rounded-full transition-all border border-slate-200/80 shrink-0"
                title="Change active destination"
              >
                <MapPin className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                <span className="max-w-[90px] sm:max-w-[120px] truncate">{currentDestination.name}</span>
                <ChevronDown className={`w-3 h-3 transition-transform shrink-0 ${destMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {destMenuOpen && (
                <div className="absolute left-0 mt-2 w-56 rounded-xl bg-white shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Select Destination
                  </div>
                  {allDestinations.map(d => (
                    <button
                      key={d.id}
                      onClick={() => {
                        setCurrentDestination(d);
                        setDestMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-sky-50 transition-colors ${
                        currentDestination.id === d.id ? 'font-bold text-sky-600 bg-sky-50/60' : 'text-slate-700'
                      }`}
                    >
                      <div>
                        <div>{d.name}</div>
                        <div className="text-[10px] text-slate-400">{d.state || d.country}</div>
                      </div>
                      {currentDestination.id === d.id && (
                        <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <NavLink to={isAuthenticated ? "/home" : "/"} className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/planner" className={navLinkClass}>
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              AI Planner
            </NavLink>
            <NavLink to="/explore" className={navLinkClass}>
              <Compass className="w-3.5 h-3.5 text-sky-500" />
              Explore
            </NavLink>
            <NavLink to="/cabs" className={navLinkClass}>
              <Car className="w-3.5 h-3.5 text-emerald-500" />
              Cabs
            </NavLink>
            <NavLink to="/guides" className={navLinkClass}>
              <Users className="w-3.5 h-3.5 text-indigo-500" />
              Guides
            </NavLink>
            <NavLink to="/restaurants" className={navLinkClass}>
              <Utensils className="w-3.5 h-3.5 text-orange-500" />
              Dining
            </NavLink>
            <NavLink to="/hotels" className={navLinkClass}>
              <Hotel className="w-3.5 h-3.5 text-purple-500" />
              Hotels
            </NavLink>
            <NavLink to="/map" className={navLinkClass}>
              <MapIcon className="w-3.5 h-3.5 text-rose-500" />
              Map
            </NavLink>
          </nav>

          {/* Right Action Icons: Online Status, Favourites, Notifications, Profile */}
          <div className="flex items-center gap-2">
            {/* Online Indicator Badge */}
            <div
              className={`hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${
                isOnline
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-amber-100 text-amber-800 border border-amber-300'
              }`}
              title={isOnline ? 'Online: Live tiles and navigation active' : 'Offline: Using cached location data'}
            >
              <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
              <span className="text-[11px] font-semibold">{isOnline ? 'Live' : 'Offline'}</span>
            </div>

            {/* Favourites Button */}
            <Link
              to="/favourites"
              className="relative p-2 text-slate-600 hover:text-rose-500 hover:bg-slate-100 rounded-full transition-colors"
              title="Saved places & favourites"
            >
              <Heart className="w-5 h-5" />
              {favourites.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {favourites.length}
                </span>
              )}
            </Link>

            {/* Notifications Dropdown */}
            <div className="relative" ref={notifRef}>
              <button
                type="button"
                onClick={() => setNotifMenuOpen(!notifMenuOpen)}
                className="relative p-2 text-slate-600 hover:text-sky-600 hover:bg-slate-100 rounded-full transition-colors"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-sky-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>

              {notifMenuOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white shadow-2xl border border-slate-100 p-3 z-50 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 px-2">
                    <div className="font-semibold text-sm text-slate-800">
                      Notifications ({notifications.length})
                    </div>
                    {unreadNotificationsCount > 0 && (
                      <button
                        onClick={markAllNotificationsAsRead}
                        className="text-xs text-sky-600 hover:text-sky-700 font-medium"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-50 mt-1">
                    {notifications.length === 0 ? (
                      <div className="text-center py-6 text-xs text-slate-400">
                        No notifications yet.
                      </div>
                    ) : (
                      notifications.map(n => (
                        <div
                          key={n.id}
                          onClick={() => markNotificationAsRead(n.id)}
                          className={`p-2.5 rounded-xl cursor-pointer transition-colors ${
                            n.read ? 'bg-white hover:bg-slate-50' : 'bg-sky-50/60 hover:bg-sky-50'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-xs font-semibold text-slate-800">{n.title}</span>
                            <span className="text-[10px] text-slate-400 shrink-0">{n.time}</span>
                          </div>
                          <p className="text-xs text-slate-600 mt-1 leading-snug">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Menu or Login Button */}
            {isAuthenticated ? (
              <div className="relative" ref={userRef}>
                <button
                  type="button"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-1 pl-2 rounded-full border border-slate-200 hover:border-sky-300 transition-all bg-white"
                >
                  <span className="hidden sm:inline-block text-xs font-semibold text-slate-700 max-w-[110px] truncate">
                    {user?.name || 'My Account'}
                  </span>
                  <img
                    src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                    alt="User"
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-sky-100"
                  />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-60 rounded-2xl bg-white shadow-2xl border border-slate-100 py-2 z-50">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <div className="font-semibold text-sm text-slate-800">{user?.name}</div>
                      <div className="text-xs text-slate-400 truncate">{user?.email}</div>
                    </div>
                    <Link
                      to="/home"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-sky-50 hover:text-sky-600"
                    >
                      <Compass className="w-4 h-4 text-sky-500" />
                      Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-sky-50 hover:text-sky-600"
                    >
                      <User className="w-4 h-4 text-indigo-500" />
                      My Profile
                    </Link>
                    <Link
                      to="/trips"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-sky-50 hover:text-sky-600"
                    >
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      Planned Trips
                    </Link>
                    <Link
                      to="/bookings"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-sky-50 hover:text-sky-600"
                    >
                      <Briefcase className="w-4 h-4 text-emerald-500" />
                      Bookings & Rides
                    </Link>
                    <Link
                      to="/settings"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-sky-50 hover:text-sky-600"
                    >
                      <Settings className="w-4 h-4 text-slate-500" />
                      Settings & Preferences
                    </Link>
                    <div className="my-1 border-t border-slate-100"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 font-medium"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-sky-600 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-sky-500 hover:bg-sky-600 rounded-lg shadow-xs transition-all hover:shadow-md"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu for secondary routes */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white/95 backdrop-blur-md px-4 pt-3 pb-6 space-y-2 shadow-xl">
          <div className="grid grid-cols-2 gap-2 text-xs font-medium">
            <Link
              to="/planner"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-sky-50 flex items-center gap-2 text-slate-700"
            >
              <Sparkles className="w-4 h-4 text-amber-500" /> AI Planner
            </Link>
            <Link
              to="/explore"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-sky-50 flex items-center gap-2 text-slate-700"
            >
              <Compass className="w-4 h-4 text-sky-500" /> Explore
            </Link>
            <Link
              to="/cabs"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-sky-50 flex items-center gap-2 text-slate-700"
            >
              <Car className="w-4 h-4 text-emerald-500" /> Rapido Cabs
            </Link>
            <Link
              to="/guides"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-sky-50 flex items-center gap-2 text-slate-700"
            >
              <Users className="w-4 h-4 text-indigo-500" /> Local Guides
            </Link>
            <Link
              to="/restaurants"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-sky-50 flex items-center gap-2 text-slate-700"
            >
              <Utensils className="w-4 h-4 text-orange-500" /> Restaurants
            </Link>
            <Link
              to="/hotels"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-sky-50 flex items-center gap-2 text-slate-700"
            >
              <Hotel className="w-4 h-4 text-purple-500" /> Hotels
            </Link>
            <Link
              to="/map"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-sky-50 flex items-center gap-2 text-slate-700"
            >
              <MapIcon className="w-4 h-4 text-rose-500" /> Map Navigator
            </Link>
            <Link
              to="/settings"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-sky-50 flex items-center gap-2 text-slate-700"
            >
              <Settings className="w-4 h-4 text-slate-500" /> Settings
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
