const STORAGE_KEYS = {
  CURRENT_USER: 'tripnest_current_user',
  USERS_LIST: 'tripnest_users_list',
  BOOKINGS: 'tripnest_bookings',
  ITINERARIES: 'tripnest_itineraries',
  FAVOURITES: 'tripnest_favourites',
  NOTIFICATIONS: 'tripnest_notifications',
  SETTINGS: 'tripnest_settings',
  CACHED_LOCATION: 'tripnest_cached_location'
};

export const storageService = {
  get(key, defaultValue = null) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (err) {
      console.warn(`Error reading from localStorage [${key}]:`, err);
      return defaultValue;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (err) {
      console.warn(`Error writing to localStorage [${key}]:`, err);
      return false;
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (err) {
      console.warn(`Error removing from localStorage [${key}]:`, err);
      return false;
    }
  },

  clearAllDemoData() {
    Object.values(STORAGE_KEYS).forEach(k => {
      try {
        localStorage.removeItem(k);
      } catch {
        // ignore
      }
    });
  },

  KEYS: STORAGE_KEYS
};
