import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const existingUser = authService.getCurrentUser();
      if (existingUser) {
        setUser(existingUser);
      }
    } catch (err) {
      console.warn('Failed to restore auth session', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (email, password, remember = true) => {
    const loggedUser = authService.login(email, password, remember);
    setUser(loggedUser);
    return loggedUser;
  };

  const register = (formData) => {
    const registeredUser = authService.register(formData);
    setUser(registeredUser);
    return registeredUser;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const updateProfile = (profileData) => {
    if (!user) return;
    const updated = authService.updateProfile(user.id, profileData);
    setUser(updated);
    return updated;
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    demoCredentials: authService.getDefaultDemoCredentials()
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
