import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Components
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import PlannerPage from './pages/PlannerPage';
import ItineraryPage from './pages/ItineraryPage';
import GuidesPage from './pages/GuidesPage';
import GuideDetailsPage from './pages/GuideDetailsPage';
import CabBookingPage from './pages/CabBookingPage';
import RestaurantsPage from './pages/RestaurantsPage';
import RestaurantDetailsPage from './pages/RestaurantDetailsPage';
import HotelsPage from './pages/HotelsPage';
import HotelDetailsPage from './pages/HotelDetailsPage';
import ExplorePage from './pages/ExplorePage';
import MapPage from './pages/MapPage';
import TripsPage from './pages/TripsPage';
import BookingsPage from './pages/BookingsPage';
import FavouritesPage from './pages/FavouritesPage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Routes>
            {/* Auth Layout Pages */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>

            {/* Main Application Layout Pages */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<LandingPage />} />
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route path="/planner" element={<PlannerPage />} />
              <Route path="/planner/:tripId" element={<ItineraryPage />} />
              <Route path="/guides" element={<GuidesPage />} />
              <Route path="/guides/:guideId" element={<GuideDetailsPage />} />
              <Route path="/cabs" element={<CabBookingPage />} />
              <Route path="/restaurants" element={<RestaurantsPage />} />
              <Route path="/restaurants/:restaurantId" element={<RestaurantDetailsPage />} />
              <Route path="/hotels" element={<HotelsPage />} />
              <Route path="/hotels/:hotelId" element={<HotelDetailsPage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/map" element={<MapPage />} />
              <Route
                path="/trips"
                element={
                  <ProtectedRoute>
                    <TripsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/bookings"
                element={
                  <ProtectedRoute>
                    <BookingsPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/favourites" element={<FavouritesPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
