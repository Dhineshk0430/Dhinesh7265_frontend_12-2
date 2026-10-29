import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { useApp } from '../context/AppContext';
import { useGeolocation } from '../hooks/useGeolocation';
import { createCategoryIcon, MAP_DEFAULTS } from '../services/mapService';
import { attractions } from '../data/attractions';
import { restaurants } from '../data/restaurants';
import { hotels } from '../data/hotels';
import { guides } from '../data/guides';
import {
  Navigation,
  Compass,
  MapPin,
  Star,
  WifiOff,
  Layers,
  Crosshair,
  Search,
  ExternalLink,
  Info
} from 'lucide-react';

// Controller component to update map view dynamically
function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center && center[0] && center[1]) {
      map.flyTo(center, zoom || 13, { duration: 1.2 });
    }
  }, [center, zoom, map]);
  return null;
}

// Controller component to handle user clicks on the map (for setting pickup/drop)
function MapClickHandler({ onLocationSelect }) {
  useMapEvents({
    click(e) {
      if (onLocationSelect) {
        onLocationSelect({
          lat: e.latlng.lat,
          lng: e.latlng.lng
        });
      }
    }
  });
  return null;
}

export default function MapView({
  initialCenter,
  initialZoom = 13,
  onPickLocation,
  pickupPoint,
  destinationPoint,
  routeCoordinates,
  selectedCategory = 'all',
  height = '500px'
}) {
  const { currentDestination, isOnline, settings } = useApp();
  const { location: userGeoLocation, loading: geoLoading, requestLocation, error: geoError } = useGeolocation();

  const [activeFilter, setActiveFilter] = useState(selectedCategory);
  const [mapCenter, setMapCenter] = useState(() => {
    if (initialCenter && initialCenter.length === 2) return initialCenter;
    return [currentDestination.coordinates.lat, currentDestination.coordinates.lng];
  });
  const [zoomLevel, setZoomLevel] = useState(initialZoom);

  // Update center when current destination changes
  useEffect(() => {
    if (currentDestination?.coordinates) {
      setMapCenter([currentDestination.coordinates.lat, currentDestination.coordinates.lng]);
    }
  }, [currentDestination]);

  // Destination filtered POIs
  const destAttractions = attractions.filter(a => a.destinationId === currentDestination.id);
  const destRestaurants = restaurants.filter(r => r.destinationId === currentDestination.id);
  const destHotels = hotels.filter(h => h.destinationId === currentDestination.id);
  const destGuides = guides.filter(g => g.destinationId === currentDestination.id);

  const handleRecenterToUser = () => {
    requestLocation();
    if (userGeoLocation) {
      setMapCenter([userGeoLocation.lat, userGeoLocation.lng]);
      setZoomLevel(14);
    }
  };

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm bg-slate-100 flex flex-col" style={{ height }}>
      {/* Offline Notice Overlay */}
      {!isOnline && (
        <div className="absolute top-3 left-3 right-3 z-30 bg-amber-500/95 backdrop-blur-md text-white text-xs px-4 py-2.5 rounded-2xl shadow-lg flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-medium">
            <WifiOff className="w-4 h-4 shrink-0" />
            <span>
              Offline Mode: Live tiles may be unavailable. Showing cached markers & last known GPS location.
            </span>
          </div>
          <div className="text-[10px] bg-amber-600/80 px-2 py-1 rounded-lg shrink-0">
            Last GPS: {new Date(userGeoLocation.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      )}

      {/* Floating Map Controls & Category Layer Chips */}
      <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-1.5 max-w-[85%]">
        {['all', 'attractions', 'restaurants', 'hotels', 'guides'].map(cat => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveFilter(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold capitalize transition-all shadow-xs backdrop-blur-md ${
              activeFilter === cat
                ? 'bg-sky-500 text-white shadow-md'
                : 'bg-white/90 text-slate-700 hover:bg-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* GPS Current Location Button */}
      <div className="absolute bottom-6 right-4 z-20 flex flex-col gap-2">
        <button
          type="button"
          onClick={handleRecenterToUser}
          disabled={geoLoading}
          className="p-3 bg-white hover:bg-sky-50 text-slate-700 hover:text-sky-600 rounded-2xl shadow-lg border border-slate-100 transition-all flex items-center justify-center group"
          title="Detect Current GPS Location"
        >
          <Crosshair className={`w-5 h-5 ${geoLoading ? 'animate-spin text-sky-500' : 'group-hover:scale-110'}`} />
        </button>
      </div>

      {/* Leaflet Map Container */}
      <MapContainer
        center={mapCenter}
        zoom={zoomLevel}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <ChangeView center={mapCenter} zoom={zoomLevel} />
        {onPickLocation && <MapClickHandler onLocationSelect={onPickLocation} />}

        {/* TileLayer */}
        <TileLayer
          attribution={MAP_DEFAULTS.attribution}
          url={MAP_DEFAULTS.tileLayer}
        />

        {/* User Geolocation Marker */}
        {userGeoLocation && userGeoLocation.lat && (
          <Marker
            position={[userGeoLocation.lat, userGeoLocation.lng]}
            icon={createCategoryIcon('user', true)}
          >
            <Popup>
              <div className="p-2 text-xs">
                <div className="font-bold text-sky-600 flex items-center gap-1">
                  <Crosshair className="w-3.5 h-3.5" /> Your Current Location
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  {userGeoLocation.name || 'GPS Position'}
                </div>
                <div className="text-[10px] text-slate-400 mt-1">
                  Updated: {new Date(userGeoLocation.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Selected Pickup Marker */}
        {pickupPoint && pickupPoint.lat && (
          <Marker
            position={[pickupPoint.lat, pickupPoint.lng]}
            icon={createCategoryIcon('cab')}
          >
            <Popup>
              <div className="p-1 text-xs">
                <span className="font-bold text-amber-600">Pickup Location</span>
                <p className="text-slate-600 mt-0.5">{pickupPoint.name || 'Selected Pickup'}</p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Selected Destination Marker */}
        {destinationPoint && destinationPoint.lat && (
          <Marker
            position={[destinationPoint.lat, destinationPoint.lng]}
            icon={createCategoryIcon('destination')}
          >
            <Popup>
              <div className="p-1 text-xs">
                <span className="font-bold text-rose-600">Destination Point</span>
                <p className="text-slate-600 mt-0.5">{destinationPoint.name || 'Selected Destination'}</p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Connecting route polyline if coordinates provided */}
        {routeCoordinates && routeCoordinates.length >= 2 && (
          <Polyline
            positions={routeCoordinates}
            color="#0284c7"
            weight={4}
            opacity={0.8}
            dashArray="6, 8"
          />
        )}

        {/* Tourist Attractions Markers */}
        {(activeFilter === 'all' || activeFilter === 'attractions') &&
          destAttractions.map(attr => (
            <Marker
              key={attr.id}
              position={[attr.coordinates.lat, attr.coordinates.lng]}
              icon={createCategoryIcon('attraction')}
            >
              <Popup>
                <div className="p-1 max-w-[200px] text-xs">
                  <img
                    src={attr.image}
                    alt={attr.name}
                    className="w-full h-24 object-cover rounded-lg mb-1.5"
                  />
                  <div className="font-bold text-slate-900">{attr.name}</div>
                  <div className="text-[10px] text-sky-600 font-semibold">{attr.category}</div>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-amber-500 mt-1">
                    <Star className="w-3 h-3 fill-amber-500" />
                    <span>{attr.rating}</span>
                    <span className="text-slate-400 font-normal">({attr.reviewsCount})</span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1">{attr.entryFee}</div>
                </div>
              </Popup>
            </Marker>
          ))}

        {/* Restaurants Markers */}
        {(activeFilter === 'all' || activeFilter === 'restaurants') &&
          destRestaurants.map(rest => (
            <Marker
              key={rest.id}
              position={[rest.coordinates.lat, rest.coordinates.lng]}
              icon={createCategoryIcon('restaurant')}
            >
              <Popup>
                <div className="p-1 max-w-[200px] text-xs">
                  <img
                    src={rest.image}
                    alt={rest.name}
                    className="w-full h-24 object-cover rounded-lg mb-1.5"
                  />
                  <div className="font-bold text-slate-900">{rest.name}</div>
                  <div className="text-[10px] text-orange-600 font-semibold">{rest.cuisine}</div>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-amber-500 mt-1">
                    <Star className="w-3 h-3 fill-amber-500" />
                    <span>{rest.rating}</span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1">{rest.pricePerPerson}</div>
                </div>
              </Popup>
            </Marker>
          ))}

        {/* Hotels Markers */}
        {(activeFilter === 'all' || activeFilter === 'hotels') &&
          destHotels.map(htl => (
            <Marker
              key={htl.id}
              position={[htl.coordinates.lat, htl.coordinates.lng]}
              icon={createCategoryIcon('hotel')}
            >
              <Popup>
                <div className="p-1 max-w-[200px] text-xs">
                  <img
                    src={htl.image}
                    alt={htl.name}
                    className="w-full h-24 object-cover rounded-lg mb-1.5"
                  />
                  <div className="font-bold text-slate-900">{htl.name}</div>
                  <div className="text-[10px] text-purple-600 font-semibold">{htl.category}</div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-900 mt-1">
                    <span>₹{htl.pricePerNight?.toLocaleString('en-IN')}/nt</span>
                    <span className="text-amber-500">★ {htl.userRating}</span>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}
