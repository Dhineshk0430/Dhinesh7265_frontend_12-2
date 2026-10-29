import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { destinations } from '../data/destinations';
import { sampleItineraries } from '../data/itineraries';
import { storageService } from '../services/storageService';
import { bookingService } from '../services/bookingService';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

const AppContext = createContext(null);

const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    title: 'Welcome to TripNest Tamil Nadu!',
    message: 'Explore Tamil Nadu destinations, book local cabs, hire certified Tamil guides, and generate AI trips.',
    time: 'Just now',
    type: 'info',
    read: false
  },
  {
    id: 'notif-2',
    title: 'Booking Confirmed: Prime Sedan Ride',
    message: 'Your demo ride from Chennai Airport (MAA) is scheduled. Ref: TN-CAB-TN01.',
    time: '2 hours ago',
    type: 'success',
    read: false
  },
  {
    id: 'notif-3',
    title: 'Offline Mode Ready',
    message: 'Your recent places and Tamil Nadu destination coordinates are cached for offline travel.',
    time: '1 day ago',
    type: 'info',
    read: true
  }
];

export function AppProvider({ children }) {
  const isOnline = useOnlineStatus();

  // Selected Destination
  const [currentDestination, setCurrentDestination] = useState(() => {
    const saved = storageService.get('tripnest_selected_destination', null);
    if (saved) {
      const found = destinations.find(d => d.id === saved.id || d.id === saved);
      if (found) return found;
    }
    return destinations[0]; // Default Chennai, Tamil Nadu
  });

  // Favourites
  const [favourites, setFavourites] = useState(() => {
    return storageService.get(storageService.KEYS.FAVOURITES, [
      { id: 'attr-chennai-1', type: 'attraction', name: 'Kapaleeshwarar Temple, Mylapore', destination: 'Chennai', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400&q=80', rating: 4.9 },
      { id: 'rest-chennai-1', type: 'restaurant', name: 'Murugan Idli Shop (Mylapore)', destination: 'Chennai', image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=400&q=80', rating: 4.9 },
      { id: 'htl-chennai-1', type: 'hotel', name: 'Taj Connemara, Chennai', destination: 'Chennai', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80', rating: 4.9 }
    ]);
  });

  // Bookings
  const [bookings, setBookings] = useState(() => {
    return bookingService.getAllBookings();
  });

  // Itineraries
  const [itineraries, setItineraries] = useState(() => {
    const saved = storageService.get(storageService.KEYS.ITINERARIES, null);
    if (!saved) {
      storageService.set(storageService.KEYS.ITINERARIES, sampleItineraries);
      return sampleItineraries;
    }
    return saved;
  });

  // Notifications
  const [notifications, setNotifications] = useState(() => {
    return storageService.get(storageService.KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
  });

  // App Settings
  const [settings, setSettings] = useState(() => {
    return storageService.get(storageService.KEYS.SETTINGS, {
      currency: 'INR',
      distanceUnit: 'km',
      enableOfflineCache: true,
      emailNotifications: true
    });
  });

  // Floating Toasts
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'info', duration = 3500) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Sync state to storage
  useEffect(() => {
    storageService.set('tripnest_selected_destination', currentDestination);
  }, [currentDestination]);

  useEffect(() => {
    storageService.set(storageService.KEYS.FAVOURITES, favourites);
  }, [favourites]);

  useEffect(() => {
    storageService.set(storageService.KEYS.ITINERARIES, itineraries);
  }, [itineraries]);

  useEffect(() => {
    storageService.set(storageService.KEYS.NOTIFICATIONS, notifications);
  }, [notifications]);

  useEffect(() => {
    storageService.set(storageService.KEYS.SETTINGS, settings);
  }, [settings]);

  // Online / Offline Toast and Notification Tracker
  useEffect(() => {
    if (!isOnline) {
      showToast('You are currently offline. Cached destination & location info are available.', 'warning', 5000);
      addNotification({
        title: 'Offline Mode Activated',
        message: 'TripNest is working with cached destinations and last known GPS data.',
        type: 'warning'
      });
    } else {
      showToast('You are back online. Live map tiles and connectivity restored.', 'success', 3000);
    }
  }, [isOnline]);

  // Favorites handlers
  const isFavourite = useCallback((id) => {
    return favourites.some(item => item.id === id);
  }, [favourites]);

  const toggleFavourite = useCallback((item) => {
    setFavourites(prev => {
      const exists = prev.some(f => f.id === item.id);
      if (exists) {
        showToast(`Removed "${item.name}" from favourites.`, 'info');
        return prev.filter(f => f.id !== item.id);
      } else {
        showToast(`Saved "${item.name}" to your favourites!`, 'success');
        return [...prev, item];
      }
    });
  }, [showToast]);

  // Bookings handlers
  const addBooking = useCallback((bookingData) => {
    const newBooking = bookingService.createBooking(bookingData);
    setBookings(prev => [newBooking, ...prev]);
    showToast(`Booking confirmed! Ref: ${newBooking.referenceNumber}`, 'success');

    addNotification({
      title: `Booking Confirmed (${newBooking.type.toUpperCase()})`,
      message: `Your booking for "${newBooking.title}" is confirmed. Ref: ${newBooking.referenceNumber}.`,
      type: 'success'
    });

    return newBooking;
  }, [showToast]);

  const cancelBooking = useCallback((bookingId) => {
    try {
      const updated = bookingService.cancelBooking(bookingId);
      setBookings(prev => prev.map(b => (b.id === bookingId ? updated : b)));
      showToast(`Booking ${updated.referenceNumber} has been cancelled.`, 'info');

      addNotification({
        title: 'Booking Cancelled',
        message: `Booking ref ${updated.referenceNumber} was successfully cancelled.`,
        type: 'info'
      });
    } catch (err) {
      showToast(err.message, 'error');
    }
  }, [showToast]);

  // Itinerary handlers
  const saveItinerary = useCallback((itinerary) => {
    setItineraries(prev => {
      const existsIndex = prev.findIndex(i => i.id === itinerary.id);
      let updated;
      if (existsIndex >= 0) {
        updated = [...prev];
        updated[existsIndex] = itinerary;
      } else {
        updated = [itinerary, ...prev];
      }
      return updated;
    });
    showToast(`Itinerary "${itinerary.title}" saved to My Trips!`, 'success');

    addNotification({
      title: 'Itinerary Saved',
      message: `"${itinerary.title}" is now available under your planned trips.`,
      type: 'success'
    });
  }, [showToast]);

  const deleteItinerary = useCallback((id) => {
    setItineraries(prev => prev.filter(i => i.id !== id));
    showToast('Itinerary removed from saved trips.', 'info');
  }, [showToast]);

  // Notifications handlers
  const addNotification = useCallback((notif) => {
    const item = {
      id: `notif-${Date.now()}`,
      time: 'Just now',
      read: false,
      ...notif
    };
    setNotifications(prev => [item, ...prev]);
  }, []);

  const markNotificationAsRead = useCallback((id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }, []);

  const markAllNotificationsAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read.', 'info');
  }, [showToast]);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
    showToast('Notifications cleared.', 'info');
  }, [showToast]);

  // Reset Demo Data
  const resetDemoData = useCallback(() => {
    storageService.clearAllDemoData();
    setFavourites([]);
    setBookings(bookingService.getAllBookings());
    setItineraries(sampleItineraries);
    setNotifications(INITIAL_NOTIFICATIONS);
    setCurrentDestination(destinations[0]);
    showToast('TripNest demo data has been successfully reset.', 'success');
  }, [showToast]);

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  const value = {
    currentDestination,
    setCurrentDestination,
    allDestinations: destinations,
    favourites,
    isFavourite,
    toggleFavourite,
    bookings,
    addBooking,
    cancelBooking,
    itineraries,
    saveItinerary,
    deleteItinerary,
    notifications,
    unreadNotificationsCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    clearNotifications,
    toasts,
    showToast,
    removeToast,
    isOnline,
    settings,
    setSettings,
    resetDemoData
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
