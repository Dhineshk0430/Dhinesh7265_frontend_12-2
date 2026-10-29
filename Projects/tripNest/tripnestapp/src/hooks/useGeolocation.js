import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'tripnest_cached_location';

export function useGeolocation() {
  const [location, setLocation] = useState(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        return JSON.parse(cached);
      }
    } catch {
      // fallback
    }
    // Default fallback: Chennai, Tamil Nadu coordinates
    return {
      lat: 13.0827,
      lng: 80.2707,
      name: 'Chennai, Tamil Nadu (Default)',
      timestamp: new Date().toISOString(),
      isCached: true
    };
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: Math.round(position.coords.accuracy),
          name: 'Your Current GPS Location',
          timestamp: new Date().toISOString(),
          isCached: false
        };
        setLocation(newLocation);
        setLoading(false);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(newLocation));
        } catch (e) {
          console.warn('Could not cache location to localStorage', e);
        }
      },
      (err) => {
        let msg = 'Failed to retrieve location.';
        if (err.code === 1) msg = 'Location permission denied by user. Using cached location.';
        else if (err.code === 2) msg = 'Location position unavailable. Using cached location.';
        else if (err.code === 3) msg = 'Location request timed out. Using cached location.';

        setError(msg);
        setLoading(false);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  }, []);

  return { location, loading, error, requestLocation, setLocation };
}
