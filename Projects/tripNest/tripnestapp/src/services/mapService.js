import L from 'leaflet';

/**
 * Helper to create stylish, lightweight SVG Leaflet DivIcons
 */
export function createCategoryIcon(category, isUserLocation = false) {
  if (isUserLocation) {
    return L.divIcon({
      className: 'custom-user-marker',
      html: `
        <div style="position: relative; width: 24px; height: 24px;">
          <div style="position: absolute; width: 24px; height: 24px; border-radius: 50%; background: #0284c7; opacity: 0.3; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
          <div style="position: relative; width: 14px; height: 14px; margin: 5px; border-radius: 50%; background: #0284c7; border: 3px solid #ffffff; box-shadow: 0 2px 6px rgba(0,0,0,0.3);"></div>
        </div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });
  }

  const colorMap = {
    attraction: '#0284c7', // Ocean Blue
    restaurant: '#f97316', // Orange
    hotel: '#8b5cf6',      // Purple
    guide: '#10b981',      // Green
    cab: '#eab308',        // Amber
    destination: '#ec4899' // Pink
  };

  const bg = colorMap[category] || '#0284c7';

  return L.divIcon({
    className: 'custom-poi-marker',
    html: `
      <div style="background-color: ${bg}; width: 34px; height: 34px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); display: flex; align-items: center; justify-content: center; border: 2px solid #ffffff; box-shadow: 0 4px 10px rgba(0,0,0,0.25);">
        <div style="transform: rotate(45deg); width: 8px; height: 8px; background-color: #ffffff; border-radius: 50%;"></div>
      </div>
    `,
    iconSize: [34, 34],
    iconAnchor: [17, 34],
    popupAnchor: [0, -32]
  });
}

export const MAP_DEFAULTS = {
  center: [13.0827, 80.2707], // Chennai, Tamil Nadu
  zoom: 12,
  tileLayer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
};
