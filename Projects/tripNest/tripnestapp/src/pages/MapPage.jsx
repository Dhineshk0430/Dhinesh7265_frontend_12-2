import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useGeolocation } from '../hooks/useGeolocation';
import MapView from '../components/MapView';
import {
  MapPin,
  Crosshair,
  Wifi,
  WifiOff,
  Navigation,
  Compass,
  Layers,
  Search,
  Clock,
  ShieldCheck,
  Info
} from 'lucide-react';

export default function MapPage() {
  const { currentDestination, allDestinations, setCurrentDestination, isOnline, showToast } = useApp();
  const { location: userGeoLocation, loading: geoLoading, requestLocation, error: geoError } = useGeolocation();
  const [searchParams] = useSearchParams();

  // Query params if directed from another page (e.g. restaurant directions or itinerary view)
  const paramLat = searchParams.get('lat') ? parseFloat(searchParams.get('lat')) : null;
  const paramLng = searchParams.get('lng') ? parseFloat(searchParams.get('lng')) : null;
  const paramName = searchParams.get('name') || '';

  const [mapCenter, setMapCenter] = useState(() => {
    if (paramLat && paramLng) return [paramLat, paramLng];
    return [currentDestination.coordinates.lat, currentDestination.coordinates.lng];
  });

  const [destinationMarker, setDestinationMarker] = useState(() => {
    if (paramLat && paramLng) {
      return { lat: paramLat, lng: paramLng, name: paramName || 'Selected Destination' };
    }
    return null;
  });

  const [routeLine, setRouteLine] = useState(null);

  // If user has both user location and a destination marker, calculate direct route line
  useEffect(() => {
    if (destinationMarker && userGeoLocation) {
      setRouteLine([
        [userGeoLocation.lat, userGeoLocation.lng],
        [destinationMarker.lat, destinationMarker.lng]
      ]);
    }
  }, [destinationMarker, userGeoLocation]);

  const handlePickLocation = (coords) => {
    setDestinationMarker({
      lat: coords.lat,
      lng: coords.lng,
      name: `Custom Destination Point (${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)})`
    });
    showToast('Destination marker pinned. Route preview updated!', 'info');
  };

  const handleDetectLocation = () => {
    requestLocation();
    if (userGeoLocation) {
      setMapCenter([userGeoLocation.lat, userGeoLocation.lng]);
      showToast('Centered on your detected location.', 'success');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
              isOnline
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-amber-100 text-amber-900 border border-amber-300'
            }`}>
              {isOnline ? <Wifi className="w-3.5 h-3.5 text-emerald-600" /> : <WifiOff className="w-3.5 h-3.5 text-amber-600" />}
              <span>{isOnline ? 'Live Online Map Navigation' : 'Offline Cache Mode Active'}</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900">
            Interactive Navigator: {currentDestination.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Browse tourist spots, restaurants, hotels, and cabs. Click anywhere on the map to set destination coordinates.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleDetectLocation}
            disabled={geoLoading}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 shadow-xs transition-colors"
          >
            <Crosshair className={`w-4 h-4 text-sky-500 ${geoLoading ? 'animate-spin' : ''}`} />
            <span>{geoLoading ? 'Detecting GPS...' : 'Locate My Position'}</span>
          </button>
        </div>
      </div>

      {/* Geolocation status warning or info */}
      {geoError && (
        <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-center gap-2">
          <Info className="w-4 h-4 shrink-0 text-amber-600" />
          <span>{geoError}</span>
        </div>
      )}

      {/* Offline Transparency Banner */}
      {!isOnline && (
        <div className="p-4 rounded-2xl bg-amber-500 text-white text-xs space-y-1 shadow-md">
          <div className="font-bold flex items-center gap-2">
            <WifiOff className="w-4 h-4" />
            <span>Offline Map Mode Notice</span>
          </div>
          <p className="text-amber-100 leading-relaxed">
            Live OpenStreetMap tile fetching requires an active internet connection. Your last known GPS location (from {new Date(userGeoLocation.timestamp).toLocaleTimeString()}) and cached landmark coordinates in {currentDestination.name} remain accessible.
          </p>
        </div>
      )}

      {/* Full-width Map View */}
      <MapView
        initialCenter={mapCenter}
        initialZoom={13}
        destinationPoint={destinationMarker}
        routeCoordinates={routeLine}
        onPickLocation={handlePickLocation}
        height="640px"
      />

      {/* Map Legend / Guide */}
      <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
        <div className="flex flex-wrap items-center gap-5">
          <span className="font-bold text-slate-900">Marker Legend:</span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-sky-600 inline-block" /> Attractions
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-orange-500 inline-block" /> Restaurants
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-purple-600 inline-block" /> Hotels & Stays
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" /> Pickups / Cabs
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" /> Pinned Destination
          </span>
        </div>

        <div className="text-[11px] text-slate-400">
          Last Cached Coordinates: {userGeoLocation.lat.toFixed(4)}, {userGeoLocation.lng.toFixed(4)}
        </div>
      </div>
    </div>
  );
}
