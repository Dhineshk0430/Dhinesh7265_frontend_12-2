import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { vehicleCategories } from '../data/vehicles';
import { calculateVehicleFare, formatCurrency, calculateDistance } from '../utils/calculations';
import VehicleCard from '../components/VehicleCard';
import MapView from '../components/MapView';
import {
  Car,
  MapPin,
  Clock,
  Calendar,
  Users,
  Navigation,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Zap
} from 'lucide-react';

export default function CabBookingPage() {
  const { currentDestination, addBooking, showToast, settings } = useApp();
  const navigate = useNavigate();

  // Location presets for current destination
  const defaultPickups = {
    chennai: {
      pickup: 'Chennai International Airport (MAA), Meenambakkam',
      pickupCoords: { lat: 12.9941, lng: 80.1709 },
      destination: 'Kapaleeshwarar Temple, Mylapore, Chennai',
      destCoords: { lat: 13.0334, lng: 80.2699 }
    },
    madurai: {
      pickup: 'Madurai International Airport (IXM)',
      pickupCoords: { lat: 9.8345, lng: 78.0934 },
      destination: 'Arulmigu Meenakshi Amman Temple, Madurai',
      destCoords: { lat: 9.9195, lng: 78.1193 }
    },
    ooty: {
      pickup: 'Ooty Railway Station (UAM), Charing Cross',
      pickupCoords: { lat: 11.4064, lng: 76.6970 },
      destination: 'Doddabetta Peak Summit, Nilgiris',
      destCoords: { lat: 11.4011, lng: 76.7358 }
    },
    kodaikanal: {
      pickup: 'Kodaikanal Bus Stand, Seven Roads Junction',
      pickupCoords: { lat: 10.2330, lng: 77.4890 },
      destination: 'Pillar Rocks Viewpoint, Kodaikanal',
      destCoords: { lat: 10.2078, lng: 77.4691 }
    },
    rameswaram: {
      pickup: 'Rameswaram Railway Station (RMM)',
      pickupCoords: { lat: 9.2842, lng: 79.3080 },
      destination: 'Dhanushkodi Ruins & Arichal Munai',
      destCoords: { lat: 9.1764, lng: 79.4144 }
    },
    mahabalipuram: {
      pickup: 'East Coast Road (ECR) Gateway',
      pickupCoords: { lat: 12.6350, lng: 80.1900 },
      destination: 'UNESCO Shore Temple, Mahabalipuram',
      destCoords: { lat: 12.6163, lng: 80.1989 }
    },
    thanjavur: {
      pickup: 'Thanjavur Junction Railway Station (TJ)',
      pickupCoords: { lat: 10.7745, lng: 79.1350 },
      destination: 'Brihadeeswarar Temple (Big Temple), Thanjavur',
      destCoords: { lat: 10.7828, lng: 79.1318 }
    },
    coimbatore: {
      pickup: 'Coimbatore International Airport (CJB), Peelamedu',
      pickupCoords: { lat: 11.0298, lng: 77.0434 },
      destination: '112-ft Adiyogi Shiva Statue, Isha Yoga Center',
      destCoords: { lat: 10.9760, lng: 76.7360 }
    }
  };

  const preset = defaultPickups[currentDestination.id] || {
    pickup: `${currentDestination.name} Central Railway Station`,
    pickupCoords: { lat: currentDestination.coordinates.lat - 0.04, lng: currentDestination.coordinates.lng - 0.03 },
    destination: `${currentDestination.name} Heritage Center`,
    destCoords: { lat: currentDestination.coordinates.lat + 0.03, lng: currentDestination.coordinates.lng + 0.02 }
  };

  const [pickup, setPickup] = useState(preset.pickup);
  const [pickupCoords, setPickupCoords] = useState(preset.pickupCoords);
  const [destination, setDestination] = useState(preset.destination);
  const [destCoords, setDestCoords] = useState(preset.destCoords);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('11:00');
  const [passengers, setPassengers] = useState(1);
  const [selectedVehicle, setSelectedVehicle] = useState(vehicleCategories[0]); // Bike taxi by default
  const [activeStep, setActiveStep] = useState('select'); // 'select' | 'summary' | 'confirmed'
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // Compute realistic distance in km
  const estimatedDist = calculateDistance(
    pickupCoords.lat,
    pickupCoords.lng,
    destCoords.lat,
    destCoords.lng
  ) || 8.5;

  const fareObj = calculateVehicleFare(selectedVehicle, estimatedDist);

  // Handle map click to pick destination or pickup
  const handleMapLocationPick = (coords) => {
    setDestCoords(coords);
    setDestination(`Custom Destination (${coords.lat.toFixed(3)}, ${coords.lng.toFixed(3)})`);
    showToast('Destination marker pinned on map!', 'info');
  };

  const handleProceedToSummary = (e) => {
    e.preventDefault();
    if (!pickup.trim() || !destination.trim()) {
      showToast('Please specify both pickup location and destination.', 'error');
      return;
    }
    setActiveStep('summary');
  };

  const handleConfirmRide = () => {
    const bookingData = {
      type: 'cab',
      title: `${selectedVehicle.name}: ${pickup.split(',')[0]} to ${destination.split(',')[0]}`,
      provider: selectedVehicle.name,
      date,
      time,
      pickup,
      destination,
      passengers,
      distanceKm: estimatedDist,
      fare: fareObj.totalFare
    };

    const newBooking = addBooking(bookingData);
    setConfirmedBooking(newBooking);
    setActiveStep('confirmed');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 mb-2">
          <Zap className="w-3.5 h-3.5 text-emerald-600" />
          <span>Rapido-Inspired Smart Transit</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900">
          Book Local Cabs, Autos & Bike Taxis
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Instant intra-city point-to-point transit in {currentDestination.name}. Transparent demo fare breakdown.
        </p>
      </div>

      {activeStep === 'confirmed' && confirmedBooking ? (
        /* Booking Confirmation Screen */
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-xl max-w-xl mx-auto text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Demo Booking Confirmed
            </span>
            <h2 className="text-2xl font-bold font-display text-slate-900 mt-1">
              Ride Scheduled Successfully!
            </h2>
            <div className="inline-block mt-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-mono font-bold text-emerald-800">
              Reference: {confirmedBooking.referenceNumber}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 text-xs text-left space-y-2 border border-slate-100">
            <div className="flex justify-between">
              <span className="text-slate-500">Vehicle:</span>
              <span className="font-bold text-slate-800">{confirmedBooking.provider}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Pickup:</span>
              <span className="font-medium text-slate-800 truncate max-w-[240px]">{confirmedBooking.pickup}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Destination:</span>
              <span className="font-medium text-slate-800 truncate max-w-[240px]">{confirmedBooking.destination}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Estimated Distance:</span>
              <span className="font-medium text-slate-800">{confirmedBooking.distanceKm} km</span>
            </div>
            <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-sm">
              <span>Demo Fare:</span>
              <span className="text-sky-600">{formatCurrency(confirmedBooking.fare, settings.currency)}</span>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 bg-sky-50/60 p-3 rounded-xl border border-sky-100 leading-relaxed">
            Note: This is a demonstration booking simulation. All states are stored locally in your browser. No real driver is dispatched.
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                setActiveStep('select');
                setConfirmedBooking(null);
              }}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Book Another Ride
            </button>
            <button
              onClick={() => navigate('/bookings')}
              className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold shadow-md"
            >
              View in My Bookings
            </button>
          </div>
        </div>
      ) : (
        /* Booking Interface: Left Form & Vehicle Selector, Right Map */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form & Fleet Selector (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-100 shadow-sm space-y-5">
              <h3 className="text-base font-bold font-display text-slate-900">
                Ride Details & Locations
              </h3>

              <div className="space-y-3.5">
                {/* Pickup input */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Pickup Location
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-500">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      placeholder="Enter pickup point"
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Destination input */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Destination / Drop-off
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-rose-500">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      placeholder="Enter drop location (or click on map)"
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Pickup Date</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Pickup Time</label>
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Distance & Duration preview banner */}
              <div className="p-3 rounded-2xl bg-sky-50/70 border border-sky-100 flex items-center justify-between text-xs text-sky-900">
                <span className="font-semibold">Estimated Distance: {estimatedDist} km</span>
                <span className="font-semibold">Est. Duration: ~{fareObj.estMinutes} mins</span>
              </div>
            </div>

            {/* Vehicle Category Selector */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold font-display text-slate-900">
                  Select Ride Category
                </h3>
                <span className="text-xs text-slate-400">Tap to select vehicle</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {vehicleCategories.map(veh => (
                  <VehicleCard
                    key={veh.id}
                    vehicle={veh}
                    distanceKm={estimatedDist}
                    isSelected={selectedVehicle.id === veh.id}
                    onSelect={(v) => setSelectedVehicle(v)}
                  />
                ))}
              </div>
            </div>

            {/* Fare Breakdown & Proceed to Summary */}
            {activeStep === 'select' ? (
              <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] text-slate-400 uppercase font-semibold">Total Estimated Fare</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-slate-900 font-display">
                      {formatCurrency(fareObj.totalFare, settings.currency)}
                    </span>
                    <span className="text-xs text-slate-500">({selectedVehicle.name})</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleProceedToSummary}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all"
                >
                  <span>Review Booking</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              /* Review & Confirm Summary card */
              <div className="bg-white p-6 rounded-3xl border border-emerald-200 shadow-md space-y-4 animate-in fade-in">
                <h4 className="text-base font-bold font-display text-slate-900">
                  Booking Summary & Fare Breakdown
                </h4>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Base Fare (incl. {selectedVehicle.baseKm} km)</span>
                    <span>₹{fareObj.baseFare}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Distance Fare ({estimatedDist} km)</span>
                    <span>₹{fareObj.distanceCost}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>GST (5%)</span>
                    <span>₹{fareObj.gst}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex justify-between text-base font-bold text-slate-900">
                    <span>Total Estimated Fare</span>
                    <span className="text-emerald-600 font-display">
                      {formatCurrency(fareObj.totalFare, settings.currency)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={() => setActiveStep('select')}
                    className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Back / Modify
                  </button>
                  <button
                    onClick={handleConfirmRide}
                    className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-md"
                  >
                    Confirm Ride
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Interactive Leaflet Map for Pickup / Destination (6 cols) */}
          <div className="lg:col-span-6 space-y-3 sticky top-24">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                <Navigation className="w-4 h-4 text-sky-500" /> Click on the map to pin a destination
              </span>
              <span className="text-slate-400 text-[11px]">Route preview</span>
            </div>

            <MapView
              initialCenter={[currentDestination.coordinates.lat, currentDestination.coordinates.lng]}
              initialZoom={12}
              pickupPoint={{ ...pickupCoords, name: pickup }}
              destinationPoint={{ ...destCoords, name: destination }}
              routeCoordinates={[
                [pickupCoords.lat, pickupCoords.lng],
                [destCoords.lat, destCoords.lng]
              ]}
              onPickLocation={handleMapLocationPick}
              height="580px"
            />
          </div>
        </div>
      )}
    </div>
  );
}
