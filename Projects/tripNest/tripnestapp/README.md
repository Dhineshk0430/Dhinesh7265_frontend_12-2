# TripNest 🌍 | AI-Powered Smart Travel Companion

TripNest is an elegant, responsive, multi-page travel web application designed to help travelers plan trips, discover nearby attractions, hire certified local guides, book cabs and bike taxis inspired by Rapido, find highly rated restaurants, discover boutique accommodations, and navigate using interactive online and offline map technology.

---

## 🚀 Key Features

### 1. 🤖 AI Trip Planner & Day-by-Day Itineraries
- Interactive planning form: Starting location, destination, duration (1-7 days), traveler count, budget, travel style, transit preference, and special requirements.
- **Intelligent Schedule Generation**: Formulates morning, afternoon, and evening activities with realistic intra-city transit estimates and venue tips.
- **Weather Contingency Plans**: Automatic indoor / low-crowd alternative recommendations for adverse weather or packed monuments.
- **Interactive Customization**: Add custom stops, remove destinations, regenerate sequences, or view the complete route on the map.
- **Budget Breakdown**: Itemized estimates for transit, accommodation, dining, and monument fees.

### 2. 🚕 Rapido-Inspired Cab & Transit Booking
- On-demand ride booking with interactive map location picker and instant distance calculation.
- **Fleet Categories**:
  - **Bike Taxi** (Fastest for solo travelers & tight alleys)
  - **Auto Rickshaw** (Affordable, breezy city sightseeing)
  - **Mini Cab** (Compact AC hatchback)
  - **Sedan (Prime)** (Top-rated drivers, spacious AC comfort)
  - **SUV / XL** (Spacious 6-7 seater for families & groups)
  - **Outstation Cab** (Inter-city road trips with vetted drivers)
- Transparent fare calculation based on base rates, per-km rates, and GST.
- Generates unique reference numbers (e.g. `TN-CAB-8921`) and persists bookings with cancellation support.

### 3. 👥 Verified Local Guide Booking
- Explore certified local scholars, historians, culinary specialists, and mountaineers.
- Tour categories: Historical tours, Local culture, Food trails, Nature & trekking, Temple & spiritual walks, Photography expeditions.
- Filter by languages spoken, rating, and tour budget.
- Complete booking flow with group size selection, date/time scheduling, and confirmation receipts.

### 4. 🍽️ Restaurant & Culinary Discovery
- Detailed culinary recommendations filtered by destination, cuisine, price range (`$`, `$$`, `$$$`), and dietary preferences (Pure Veg, Vegan, Halal, Jain).
- Signature dishes, opening hours, contact details, and one-click map navigation.

### 5. 🏨 Hotels & Heritage Accommodations
- Search boutique havelis, luxury 5-star palace resorts, hostels, and homestays.
- View available room categories, bed layouts, guest capacity, and amenities (pool, spa, free breakfast).
- Direct reservation flow with live price calculation and booking confirmation.

### 6. 🗺️ Online & Offline Interactive Map
- Built using **Leaflet** and **OpenStreetMap**.
- Color-coded interactive markers for attractions, restaurants, hotels, guides, and transit pickups.
- **Offline Mode**:
  - Caches the user's last detected GPS location with timestamps.
  - Caches destination coordinates and points of interest in `localStorage`.
  - Service worker application shell caching (`public/sw.js`).
  - Transparent banner notifying users when network connectivity is lost while keeping saved destinations accessible.

### 7. 🔐 User Authentication & Profile Persistence
- Local demo authentication simulation with input validation (email format, minimum password length, duplicate email prevention).
- 1-click **Quick Fill Demo Account** (`alex@tripnest.com` / `tripnest123`).
- Traveler profile customization (dietary preferences, home city, languages, preferred transport, budget tier) rendered as an interactive profile card.

---

## 🎨 Design System & Color Palette

- **Primary**: Sky Blue (`#38BDF8`)
- **Secondary**: Light Blue (`#E0F2FE`)
- **Accent**: Ocean Blue (`#0284C7`)
- **Background**: Soft Tint White (`#F8FAFC` & `#FFFFFF`)
- **Soft Background**: (`#F0F9FF`)
- **Main Text**: Dark Navy (`#0F172A`)
- **Secondary Text**: Slate Gray (`#64748B`)
- **Success / Booking Confirmations**: Emerald Green (`#10B981`)

---

## 🛠️ Technology Stack

- **Frontend**: React 19 + Vite 8
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`) + Custom Glassmorphism CSS
- **Routing**: React Router v7 (`react-router-dom`)
- **Maps**: Leaflet + React-Leaflet + OpenStreetMap Tiles
- **Icons**: Lucide React
- **Persistence**: Browser `localStorage` + Service Worker caching
- **State Management**: React Context API (`AuthContext`, `AppContext`)

---

## 📦 Installation & Setup

1. **Clone or open the workspace**:
   ```bash
   cd tripnestapp
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

4. **Production Build**:
   ```bash
   npm run build
   ```

5. **Preview Production Build**:
   ```bash
   npm run preview
   ```

---

## 🔑 Demo Account & Credentials

For rapid testing and evaluation, TripNest includes pre-configured demo credentials:

- **Email**: `alex@tripnest.com`
- **Password**: `tripnest123`
- **Or click the "Quick Fill" button** on the `/login` page to auto-fill these credentials.

> ℹ️ **Demo Persistence Notice**: All user registration, profile updates, cab rides, guide hires, hotel reservations, and saved itineraries are saved in your browser's `localStorage`. You can reset all demo records anytime via **Settings -> Reset All Demo Data**.

---

## 🌐 External APIs vs. Dummy Data Transparency

| Feature | Current Implementation | Production API Integration Point |
| :--- | :--- | :--- |
| **Authentication** | Browser `localStorage` session simulation | Firebase Auth / Supabase / OAuth 2.0 |
| **AI Trip Planner** | Deterministic destination-aware rule engine | Google Gemini 1.5/2.0 API (`VITE_GEMINI_API_KEY`) |
| **Cabs & Rides** | Rapido-inspired formula with distance calculations | Uber / Rapido / Ola Rider APIs |
| **Maps & Tiles** | Leaflet + OpenStreetMap free tiles | Mapbox / Google Maps JavaScript API |
| **Guides & Stays** | Realistic curated destination datasets | Viator / Booking.com / TripAdvisor APIs |
| **Offline Cache** | Service Worker + `localStorage` GPS timestamping | Workbox PWA + Vector Tile Cache |

---

## 🗺️ Application Routes

- `/` — Welcome Landing Page
- `/login` — Demo Login
- `/register` — Demo Registration
- `/home` — Personalized Traveler Dashboard
- `/profile` — Profile Editor & Preferences
- `/planner` — AI Trip Planner Form
- `/planner/:tripId` — Day-by-Day Itinerary View & Customizer
- `/guides` — Certified Local Guides Discovery
- `/guides/:guideId` — Guide Profile & Tour Packages
- `/cabs` — Rapido-style Cab & Bike Taxi Booking
- `/restaurants` — Nearby Restaurants & Dining Search
- `/restaurants/:restaurantId` — Restaurant Menu & Details
- `/hotels` — Hotel Discovery & Search
- `/hotels/:hotelId` — Hotel Rooms & Amenities
- `/explore` — Comprehensive Destination Explorer (List & Map Views)
- `/map` — Online & Offline Map Navigator
- `/trips` — Saved Itineraries Vault
- `/bookings` — All Bookings & Rides Management
- `/favourites` — Saved Places Collection
- `/settings` — Preferences, Currency & Storage Reset
- `*` — 404 Not Found Page
