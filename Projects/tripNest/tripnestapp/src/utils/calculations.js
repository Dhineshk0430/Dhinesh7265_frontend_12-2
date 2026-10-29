/**
 * Calculate distance between two lat/lng coordinates in kilometers using Haversine formula
 */
export function calculateDistance(lat1, lon1, lat2, lon2) {
  if (!lat1 || !lon1 || !lat2 || !lon2) return 5.0; // sensible default
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return Math.round(d * 10) / 10;
}

/**
 * Calculate vehicle fare based on distance and vehicle pricing structure
 */
export function calculateVehicleFare(vehicle, distanceKm) {
  const dist = Math.max(0.5, Number(distanceKm) || 4.5);
  const extraKm = Math.max(0, dist - (vehicle.baseKm || 1.5));
  const rawFare = (vehicle.baseFare || 30) + extraKm * (vehicle.perKmRate || 12);
  const surgeMultiplier = 1.0; // normal peak pricing multiplier
  const gst = rawFare * 0.05; // 5% GST
  const total = Math.round((rawFare * surgeMultiplier + gst) / 5) * 5; // round to nearest 5

  return {
    baseFare: vehicle.baseFare,
    distanceKm: dist,
    distanceCost: Math.round(extraKm * vehicle.perKmRate),
    gst: Math.round(gst),
    totalFare: total,
    estMinutes: Math.round(dist * 2.8 + (vehicle.etaMinutes || 4))
  };
}

/**
 * Format currency with symbol
 */
export function formatCurrency(amount, currency = 'INR') {
  const num = Number(amount) || 0;
  if (currency === 'USD') {
    return `$${Math.round(num / 85).toLocaleString()}`;
  }
  if (currency === 'EUR') {
    return `€${Math.round(num / 92).toLocaleString()}`;
  }
  return `₹${num.toLocaleString('en-IN')}`;
}

/**
 * Convert km to miles if user preference is Imperial
 */
export function formatDistance(distanceKm, unit = 'km') {
  const km = Number(distanceKm) || 0;
  if (unit === 'mi') {
    return `${(km * 0.621371).toFixed(1)} mi`;
  }
  return `${km.toFixed(1)} km`;
}

/**
 * Generate unique demo reference numbers
 */
export function generateReferenceNumber(prefix = 'TN') {
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  const alpha = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + String.fromCharCode(65 + Math.floor(Math.random() * 26));
  return `${prefix}-${alpha}${randomDigits}`;
}
