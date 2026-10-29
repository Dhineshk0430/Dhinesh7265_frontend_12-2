export const hotels = [
  // CHENNAI
  {
    id: 'htl-chennai-1',
    destinationId: 'chennai',
    name: 'Taj Connemara, Chennai',
    category: 'Premium hotels',
    type: 'Historic Heritage Luxury Hotel',
    starRating: 5,
    userRating: 4.9,
    reviewsCount: 2150,
    pricePerNight: 9500,
    originalPrice: 12500,
    distanceToCenterKm: 1.8,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Outdoor Pool', 'Jiva Ayurvedic Spa', 'Free High-Speed WiFi', 'Raintree Chettinad Dining', 'Airport Transfers', 'Fitness Center'],
    roomTypes: [
      { id: 'r1', name: 'Heritage Superior Room', price: 9500, capacity: '2 Adults', bed: '1 King Bed' },
      { id: 'r2', name: 'Colonial Deluxe Suite', price: 16000, capacity: '2 Adults', bed: '1 Four-Poster King Bed' }
    ],
    address: 'Binny Road, Anna Salai, Chennai, Tamil Nadu 600002',
    coordinates: { lat: 13.0601, lng: 80.2587 },
    roomAvailability: 5,
    description: 'Chennai’s only authentic heritage hotel dating back to 1891, combining classical colonial charm, high ceilings, carved wooden furnishings, and traditional Tamil hospitality.'
  },
  {
    id: 'htl-chennai-2',
    destinationId: 'chennai',
    name: 'The Leela Palace Chennai',
    category: 'Resorts',
    type: 'Sea-Facing Modern Palace Hotel',
    starRating: 5,
    userRating: 4.95,
    reviewsCount: 3200,
    pricePerNight: 14500,
    originalPrice: 18000,
    distanceToCenterKm: 4.2,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Infinity Sea-Facing Pool', 'ESPA World-Class Spa', 'Ocean Views', 'Jamavar Fine Dining', 'Valet Parking', 'Cocktail Lounge'],
    roomTypes: [
      { id: 'r1', name: 'Grand Deluxe Ocean View', price: 14500, capacity: '2 Adults', bed: '1 King Bed' },
      { id: 'r2', name: 'Royal Club Sea Suite', price: 24000, capacity: '3 Adults', bed: '1 Super King Bed' }
    ],
    address: 'Adyar Seaface, MRC Nagar, Raja Annamalai Puram, Chennai, Tamil Nadu 600028',
    coordinates: { lat: 13.0163, lng: 80.2785 },
    roomAvailability: 3,
    description: 'The city’s only modern seafront palace hotel, inspired by Chettinad architecture with sweeping vistas of the Bay of Bengal and lush landscaped courtyards.'
  },
  {
    id: 'htl-chennai-3',
    destinationId: 'chennai',
    name: 'Zostel Chennai (T. Nagar)',
    category: 'Hostels',
    type: 'Boutique Traveler Hostel & Co-Working',
    starRating: 3,
    userRating: 4.6,
    reviewsCount: 1420,
    pricePerNight: 950,
    originalPrice: 1400,
    distanceToCenterKm: 2.0,
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Air-Conditioned Dorms', 'High-Speed WiFi', 'Rooftop Cafe', 'Community Kitchen', 'Luggage Lockers', 'Filter Coffee Machine'],
    roomTypes: [
      { id: 'r1', name: '6-Bed Mixed AC Dorm Bed', price: 950, capacity: '1 Guest', bed: '1 Bunk Bed' },
      { id: 'r2', name: 'Standard Private AC Room', price: 2600, capacity: '2 Adults', bed: '1 Queen Bed' }
    ],
    address: 'North Boag Road, T. Nagar, Chennai, Tamil Nadu 600017',
    coordinates: { lat: 13.0418, lng: 80.2395 },
    roomAvailability: 8,
    description: 'Vibrant backpacker hub located in the shopping heart of T. Nagar, near Pondy Bazaar, Saravana Bhavan, and silk saree emporiums.'
  },

  // OOTY
  {
    id: 'htl-ooty-1',
    destinationId: 'ooty',
    name: 'Savoy - IHCL SeleQtions, Ooty',
    category: 'Resorts',
    type: 'Historic British Colonial Mountain Resort',
    starRating: 5,
    userRating: 4.9,
    reviewsCount: 1980,
    pricePerNight: 12500,
    originalPrice: 16000,
    distanceToCenterKm: 1.2,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Fireplaces in Rooms', 'English High Tea Lawn', 'Free WiFi', 'Ayurvedic Wellness Spa', 'Billiards Room', 'Heated Blankets'],
    roomTypes: [
      { id: 'r1', name: 'Heritage Cottage Room with Fireplace', price: 12500, capacity: '2 Adults', bed: '1 King Bed' },
      { id: 'r2', name: 'Savoy Colonial Suite', price: 21000, capacity: '3 Adults', bed: '1 King Bed + Fireplace' }
    ],
    address: '77 Sylks Road, Ooty, The Nilgiris, Tamil Nadu 643001',
    coordinates: { lat: 11.4124, lng: 76.6978 },
    roomAvailability: 4,
    description: 'Operating continuously since 1841 across 6 rolling hillside acres. Offers wood-burning fireplaces, afternoon English high tea on the lawn, and pine scents.'
  },
  {
    id: 'htl-ooty-2',
    destinationId: 'ooty',
    name: 'Sterling Ooty Fern Hill',
    category: 'Premium hotels',
    type: 'Tea Valley Mountain Resort',
    starRating: 4,
    userRating: 4.7,
    reviewsCount: 2340,
    pricePerNight: 5800,
    originalPrice: 7500,
    distanceToCenterKm: 3.5,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Valley View Balconies', 'Kids Play Zone', 'Buffet Breakfast', 'Bonfire & Stargazing', 'Travel Desk'],
    roomTypes: [
      { id: 'r1', name: 'Classic Valley View Room', price: 5800, capacity: '2 Adults', bed: '1 Queen Bed' },
      { id: 'r2', name: 'Premiere Family Suite', price: 9200, capacity: '4 Guests', bed: '2 Queen Beds' }
    ],
    address: 'Fern Hill, Ooty, The Nilgiris, Tamil Nadu 643004',
    coordinates: { lat: 11.3970, lng: 76.6852 },
    roomAvailability: 6,
    description: 'Set on the edge of the Fern Hill valley with sweeping views of terraced tea estates, morning mist, and outdoor bonfires.'
  },
  {
    id: 'htl-ooty-3',
    destinationId: 'ooty',
    name: 'Zostel Ooty & Nilgiri Backpacker Homestay',
    category: 'Hostels',
    type: 'Nilgiri Valley Backpacker Hostel',
    starRating: 3,
    userRating: 4.7,
    reviewsCount: 1540,
    pricePerNight: 900,
    originalPrice: 1350,
    distanceToCenterKm: 2.1,
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Dorm Bunks with Lockers', 'Tea Estate Walk', 'Bonfire Pit', 'Common Kitchen', 'Free High-Speed WiFi'],
    roomTypes: [
      { id: 'r1', name: '6-Bed Mixed Dorm Bunk', price: 900, capacity: '1 Guest', bed: '1 Bunk Bed' },
      { id: 'r2', name: 'Standard Private Mountain Room', price: 1800, capacity: '2 Adults', bed: '1 Queen Bed' }
    ],
    address: 'Summer House Colony, Upper Bazaar, Ooty, Tamil Nadu 643001',
    coordinates: { lat: 11.4150, lng: 76.7050 },
    roomAvailability: 8,
    description: 'Scenic backpacker hostel overlooking emerald tea plantations with cozy community bonfires, board games, and budget rates.'
  },

  // MADURAI
  {
    id: 'htl-madurai-1',
    destinationId: 'madurai',
    name: 'Heritage Madurai',
    category: 'Resorts',
    type: 'Luxury Bawa Heritage Villa Resort',
    starRating: 5,
    userRating: 4.9,
    reviewsCount: 2600,
    pricePerNight: 7800,
    originalPrice: 10500,
    distanceToCenterKm: 3.8,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Olympic Temple-Style Pool', 'Banyan Tree Dining', 'Ayurvedic Spa', 'Private Plunge Pool Villas', 'Lush Gardens'],
    roomTypes: [
      { id: 'r1', name: 'Deluxe Heritage Club Room', price: 7800, capacity: '2 Adults', bed: '1 King Bed' },
      { id: 'r2', name: 'Luxury Villa with Private Plunge Pool', price: 14500, capacity: '2 Adults', bed: '1 King Bed' }
    ],
    address: '11 Melakkal Main Road, Kochadai, Madurai, Tamil Nadu 625016',
    coordinates: { lat: 9.9392, lng: 78.0814 },
    roomAvailability: 4,
    description: 'Designed by master architect Geoffrey Bawa across 17 lush acres with 100-year-old banyan trees, traditional granite pillared walkways, and a temple-tank style pool.'
  },
  {
    id: 'htl-madurai-2',
    destinationId: 'madurai',
    name: 'Courtyard by Marriott Madurai',
    category: 'Premium hotels',
    type: 'Contemporary Upscale City Hotel',
    starRating: 4,
    userRating: 4.75,
    reviewsCount: 1890,
    pricePerNight: 5200,
    originalPrice: 6800,
    distanceToCenterKm: 2.5,
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Outdoor Pool', '24/7 Fitness Center', 'Madurai Kitchen Restaurant', 'Free High-Speed WiFi', 'Airport Shuttle'],
    roomTypes: [
      { id: 'r1', name: 'Deluxe City View Room', price: 5200, capacity: '2 Adults', bed: '1 King Bed' },
      { id: 'r2', name: 'Executive Suite', price: 8900, capacity: '3 Adults', bed: '1 King Bed' }
    ],
    address: '168 Alagar Kovil Road, Madurai, Tamil Nadu 625002',
    coordinates: { lat: 9.9320, lng: 78.1340 },
    roomAvailability: 7,
    description: 'Centrally located luxury business hotel offering easy access to Meenakshi Amman Temple and the famous street food hubs of Madurai.'
  },
  {
    id: 'htl-madurai-3',
    destinationId: 'madurai',
    name: 'Hotel Supreme / Meenakshi Pilgrim Lodge',
    category: 'Guest houses',
    type: 'Traditional Pilgrim Lodge & Rooftop View',
    starRating: 3,
    userRating: 4.6,
    reviewsCount: 2100,
    pricePerNight: 1150,
    originalPrice: 1650,
    distanceToCenterKm: 0.6,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Rooftop Temple View', 'Pure Veg Restaurant', '24/7 Hot Water', 'Temple Darshan Desk', 'Free WiFi'],
    roomTypes: [
      { id: 'r1', name: 'Standard Non-AC Double Room', price: 1150, capacity: '2 Adults', bed: '1 Double Bed' },
      { id: 'r2', name: 'Deluxe AC Family Room', price: 1850, capacity: '3 Adults', bed: '1 King Bed + 1 Single' }
    ],
    address: '110 West Perumal Maistry Street, Madurai, Tamil Nadu 625001',
    coordinates: { lat: 9.9170, lng: 78.1150 },
    roomAvailability: 12,
    description: 'Iconic budget pilgrim lodge within walking distance of Meenakshi Temple West Tower, offering clean rooms and a rooftop restaurant overlooking temple gopurams.'
  },

  // KODAIKANAL
  {
    id: 'htl-kodai-1',
    destinationId: 'kodaikanal',
    name: 'The Tamara Kodai',
    category: 'Resorts',
    type: 'Luxury Heritage French Monastery Resort',
    starRating: 5,
    userRating: 4.95,
    reviewsCount: 2200,
    pricePerNight: 13500,
    originalPrice: 17500,
    distanceToCenterKm: 2.2,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Heated Outdoor Pool', 'Altitude Spa', 'Fireplace Lounges', 'Gourmet Organic Dining', 'Forest Trails'],
    roomTypes: [
      { id: 'r1', name: 'Luxury Heritage Suite', price: 13500, capacity: '2 Adults', bed: '1 King Bed' },
      { id: 'r2', name: 'Superior Valley Suite', price: 19000, capacity: '2 Adults', bed: '1 King Bed' }
    ],
    address: '#22 St Mary’s Road, Kodaikanal, Tamil Nadu 624101',
    coordinates: { lat: 10.2290, lng: 77.4912 },
    roomAvailability: 3,
    description: 'Set within an 1840s French Jesuit retreat house (La Providence). Features heated wooden floors, colonial stone fireplaces, and misty mountain views.'
  },
  {
    id: 'htl-kodai-2',
    destinationId: 'kodaikanal',
    name: 'Villa Retreat Boutique Homestay & Cafe',
    category: 'Homestays',
    type: 'Valley View Heritage Homestay',
    starRating: 4,
    userRating: 4.8,
    reviewsCount: 1650,
    pricePerNight: 2800,
    originalPrice: 3800,
    distanceToCenterKm: 0.8,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Coaker’s Walk Valley View', 'Fireplace', 'Homecooked Breakfast', 'Free WiFi', 'Gardens'],
    roomTypes: [
      { id: 'r1', name: 'Standard Valley Room', price: 2800, capacity: '2 Adults', bed: '1 Queen Bed' },
      { id: 'r2', name: 'Heritage Fireplace Suite', price: 4200, capacity: '2 Adults', bed: '1 King Bed' }
    ],
    address: 'Coaker’s Walk Road, Kodaikanal, Tamil Nadu 624101',
    coordinates: { lat: 10.2310, lng: 77.4880 },
    roomAvailability: 5,
    description: 'Charming stone cottage homestay perched adjacent to Coaker’s Walk with panoramic mountain views and cozy woodfires.'
  },
  {
    id: 'htl-kodai-3',
    destinationId: 'kodaikanal',
    name: 'Kodai Cloud Mist Backpackers Homestay & Dorms',
    category: 'Hostels',
    type: 'Hilltop Backpacker Homestay & Cozy Dorms',
    starRating: 3,
    userRating: 4.65,
    reviewsCount: 1280,
    pricePerNight: 950,
    originalPrice: 1400,
    distanceToCenterKm: 1.5,
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Cozy Bunks with Warm Blankets', 'Campfire Evenings', 'Shared Kitchen', 'Hot Water 24/7', 'Trek Guidance', 'Free WiFi'],
    roomTypes: [
      { id: 'r1', name: 'Dormitory Bunk Bed', price: 950, capacity: '1 Guest', bed: '1 Bunk Bed' },
      { id: 'r2', name: 'Budget Double Room', price: 1600, capacity: '2 Adults', bed: '1 Double Bed' }
    ],
    address: 'Fernhill Road, Near Bryant Park, Kodaikanal, Tamil Nadu 624101',
    coordinates: { lat: 10.2280, lng: 77.4930 },
    roomAvailability: 9,
    description: 'Budget-friendly travelers sanctuary with panoramic pine valley views, warm blankets, nightly bonfires, and affordable stays.'
  },

  // RAMESWARAM
  {
    id: 'htl-ramesh-1',
    destinationId: 'rameswaram',
    name: 'Daiwik Hotels Rameswaram',
    category: 'Premium hotels',
    type: 'Pilgrim Hospitality & Wellness Hotel',
    starRating: 4,
    userRating: 4.8,
    reviewsCount: 2950,
    pricePerNight: 4200,
    originalPrice: 5500,
    distanceToCenterKm: 1.5,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Pure Veg Aaharam Restaurant', 'Spiritual Guidance Desk', 'Ayurvedic Therapy', 'Temple Shuttle', 'Free WiFi'],
    roomTypes: [
      { id: 'r1', name: 'Superior Room', price: 4200, capacity: '2 Adults', bed: '1 Queen Bed' },
      { id: 'r2', name: 'Family Suite (4 Guests)', price: 7500, capacity: '4 Guests', bed: '2 Queen Beds' }
    ],
    address: 'NH 49, Near Railway Station, Rameswaram, Tamil Nadu 623526',
    coordinates: { lat: 9.2842, lng: 79.3080 },
    roomAvailability: 6,
    description: 'Tailored for sacred temple pilgrims with morning pooja assistance, pure vegetarian dining, and quiet reflection spaces.'
  },
  {
    id: 'htl-ramesh-2',
    destinationId: 'rameswaram',
    name: 'Hotel Ashoka / Sri Saravana Pilgrim Lodge',
    category: 'Guest houses',
    type: 'Temple-Facing Pilgrim Stay',
    starRating: 3,
    userRating: 4.6,
    reviewsCount: 1820,
    pricePerNight: 1050,
    originalPrice: 1500,
    distanceToCenterKm: 0.4,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Walking Distance to Agni Theertham', '24/7 Hot Water for Ritual Bath', 'Pure Veg Canteen', 'Luggage Lockers', 'Free WiFi'],
    roomTypes: [
      { id: 'r1', name: 'Standard Double Room', price: 1050, capacity: '2 Adults', bed: '1 Double Bed' },
      { id: 'r2', name: 'AC Family Room (4 Guests)', price: 1950, capacity: '4 Guests', bed: '2 Double Beds' }
    ],
    address: 'South Car Street, Near Ramanathaswamy Temple, Rameswaram, Tamil Nadu 623526',
    coordinates: { lat: 9.2870, lng: 79.3140 },
    roomAvailability: 15,
    description: 'Popular clean pilgrim lodge just 2 minutes from Agni Theertham and East Gate, perfect for travelers seeking convenient, affordable darshan stays.'
  },

  // MAHABALIPURAM
  {
    id: 'htl-maha-1',
    destinationId: 'mahabalipuram',
    name: 'Radisson Blu Resort Temple Bay',
    category: 'Resorts',
    type: 'Beachfront Coastal Resort',
    starRating: 5,
    userRating: 4.9,
    reviewsCount: 3100,
    pricePerNight: 9800,
    originalPrice: 13000,
    distanceToCenterKm: 1.0,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['27,000 sq.ft Meandering Pool', 'Private Beach Access', 'Ayurvitas Spa', 'Watersports', 'Shore Temple View Dining'],
    roomTypes: [
      { id: 'r1', name: 'Chalet Sea View Room', price: 9800, capacity: '2 Adults', bed: '1 King Bed' },
      { id: 'r2', name: 'Pool Villa with Plunge Pool', price: 18500, capacity: '2 Adults', bed: '1 King Bed' }
    ],
    address: '57 Covelong Road, Mahabalipuram, Tamil Nadu 603104',
    coordinates: { lat: 12.6280, lng: 80.1945 },
    roomAvailability: 5,
    description: 'Set on 44 tropical seaside acres directly facing the Bay of Bengal, featuring South Asia’s longest meandering pool and close proximity to Shore Temple.'
  },

  // THANJAVUR
  {
    id: 'htl-thanjavur-1',
    destinationId: 'thanjavur',
    name: 'Svatma - Relais & Châteaux, Thanjavur',
    category: 'Resorts',
    type: 'Luxury Heritage & Classical Arts Retreat',
    starRating: 5,
    userRating: 4.95,
    reviewsCount: 1650,
    pricePerNight: 11000,
    originalPrice: 14500,
    distanceToCenterKm: 1.6,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Siddha Wellness Spa', 'Pure Chola Veg Dining', 'Carnatic Music Evenings', 'Bronze Casting Demos', 'Plunge Pool'],
    roomTypes: [
      { id: 'r1', name: 'Heritage Heritage Room', price: 11000, capacity: '2 Adults', bed: '1 King Bed' },
      { id: 'r2', name: 'Suvarna Luxury Suite', price: 18000, capacity: '2 Adults', bed: '1 Grand King Bed' }
    ],
    address: 'Blake School Road, Thanjavur, Tamil Nadu 613007',
    coordinates: { lat: 10.7850, lng: 79.1340 },
    roomAvailability: 4,
    description: 'Restored century-old family mansion celebrating the artistic, culinary, and architectural traditions of the Great Chola kingdom.'
  },

  // KANYAKUMARI
  {
    id: 'htl-kanya-1',
    destinationId: 'kanyakumari',
    name: 'Sparsa Resort Kanyakumari',
    category: 'Resorts',
    type: 'Eco-Luxury Coastal Oceanfront Resort',
    starRating: 4,
    userRating: 4.85,
    reviewsCount: 2200,
    pricePerNight: 5600,
    originalPrice: 7200,
    distanceToCenterKm: 1.1,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Ocean View Swimming Pool', 'Auroma Multi-Cuisine Dining', 'Direct Sunrise Views', 'Tennis Court', 'Travel Desk'],
    roomTypes: [
      { id: 'r1', name: 'Deluxe Sea View Room', price: 5600, capacity: '2 Adults', bed: '1 King Bed' },
      { id: 'r2', name: 'Executive Ocean Villa', price: 8800, capacity: '2 Adults', bed: '1 King Bed' }
    ],
    address: '6/112 Beach Road, Kanyakumari, Tamil Nadu 629702',
    coordinates: { lat: 8.0845, lng: 77.5490 },
    roomAvailability: 5,
    description: 'Set on serene beachfront grounds offering peaceful sea breezes, spectacular sunrise views, and proximity to Vivekananda Rock ferry.'
  },

  // COIMBATORE
  {
    id: 'htl-coimb-1',
    destinationId: 'coimbatore',
    name: 'Vivanta Coimbatore',
    category: 'Premium hotels',
    type: 'Contemporary Luxury Business & Leisure Hotel',
    starRating: 5,
    userRating: 4.8,
    reviewsCount: 1980,
    pricePerNight: 6500,
    originalPrice: 8500,
    distanceToCenterKm: 2.0,
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Rooftop Swimming Pool', 'Jiva Spa', 'Latitude Multi-Cuisine Restaurant', 'High-Speed WiFi', 'Fitness Center'],
    roomTypes: [
      { id: 'r1', name: 'Superior City Room', price: 6500, capacity: '2 Adults', bed: '1 King Bed' },
      { id: 'r2', name: 'Deluxe Allure Suite', price: 11500, capacity: '3 Adults', bed: '1 King Bed' }
    ],
    address: '105 Race Course Road, Coimbatore, Tamil Nadu 641018',
    coordinates: { lat: 11.0020, lng: 76.9740 },
    roomAvailability: 6,
    description: 'Elegant hotel in the prime green neighborhood of Race Course, ideal base for exploring Marudhamalai and Isha Adiyogi.'
  },

  // TRICHY
  {
    id: 'htl-trichy-1',
    destinationId: 'trichy',
    name: 'SRM Hotel Tiruchirappalli',
    category: 'Premium hotels',
    type: 'Lush Garden Heritage Hotel',
    starRating: 4,
    userRating: 4.75,
    reviewsCount: 1750,
    pricePerNight: 4500,
    originalPrice: 5800,
    distanceToCenterKm: 3.0,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Swimming Pool', 'Kaveri Pure Veg & Multi-Cuisine Restaurant', 'Expansive Lawns', 'Airport Shuttle', 'Free WiFi'],
    roomTypes: [
      { id: 'r1', name: 'Executive Room', price: 4500, capacity: '2 Adults', bed: '1 King Bed' },
      { id: 'r2', name: 'Deluxe Heritage Suite', price: 7200, capacity: '3 Adults', bed: '1 King Bed' }
    ],
    address: 'Race Course Road, Kajamalai, Tiruchirappalli, Tamil Nadu 620023',
    coordinates: { lat: 10.7850, lng: 78.6940 },
    roomAvailability: 7,
    description: 'Sprawling garden resort setting close to the airport and railway station, offering quick cab rides to Rockfort and Srirangam.'
  }
];
