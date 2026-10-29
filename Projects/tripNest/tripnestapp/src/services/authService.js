import { storageService } from './storageService';

const DEFAULT_DEMO_USER = {
  id: 'usr-demo-01',
  name: 'Alex Morgan',
  email: 'alex@tripnest.com',
  phone: '+91 98765 43210',
  password: 'tripnest123',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  homeCity: 'Mumbai, India',
  preferredLanguage: 'English',
  travelInterests: ['Heritage & Forts', 'Local Street Food', 'Photography', 'Nature Treks'],
  preferredBudget: 'Moderate',
  preferredTransport: 'Sedan / Mini Cab',
  dietaryPreferences: 'Vegetarian Friendly',
  joinedDate: 'January 2025',
  bio: 'Passionate travel enthusiast, architectural photographer, and food explorer traveling across incredible India and Asia.'
};

export const authService = {
  getUsers() {
    const users = storageService.get(storageService.KEYS.USERS_LIST, []);
    if (!users || users.length === 0) {
      storageService.set(storageService.KEYS.USERS_LIST, [DEFAULT_DEMO_USER]);
      return [DEFAULT_DEMO_USER];
    }
    return users;
  },

  getCurrentUser() {
    return storageService.get(storageService.KEYS.CURRENT_USER, null);
  },

  login(email, password, remember = true) {
    const users = this.getUsers();
    const user = users.find(
      u => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
    );

    if (!user) {
      throw new Error('Invalid email or password. You can use the Quick Demo Account button below.');
    }

    const { password: _, ...safeUser } = user;
    if (remember) {
      storageService.set(storageService.KEYS.CURRENT_USER, safeUser);
    }
    return safeUser;
  },

  register(formData) {
    const users = this.getUsers();
    const existing = users.find(u => u.email.toLowerCase() === formData.email.trim().toLowerCase());
    if (existing) {
      throw new Error('An account with this email address already exists.');
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      password: formData.password,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
      homeCity: formData.homeCity || 'New Delhi, India',
      preferredLanguage: formData.preferredLanguage || 'English',
      travelInterests: formData.travelStyle ? [formData.travelStyle] : ['Sightseeing', 'Food'],
      preferredBudget: 'Moderate',
      preferredTransport: 'Sedan',
      dietaryPreferences: 'No Specific Restrictions',
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      bio: `Hello! I am ${formData.name.trim()} exploring the world with TripNest.`
    };

    const updatedUsers = [...users, newUser];
    storageService.set(storageService.KEYS.USERS_LIST, updatedUsers);

    const { password: _, ...safeUser } = newUser;
    storageService.set(storageService.KEYS.CURRENT_USER, safeUser);
    return safeUser;
  },

  updateProfile(userId, profileData) {
    const users = this.getUsers();
    const index = users.findIndex(u => u.id === userId);
    if (index === -1) {
      throw new Error('User not found.');
    }

    const updatedUser = {
      ...users[index],
      ...profileData
    };

    users[index] = updatedUser;
    storageService.set(storageService.KEYS.USERS_LIST, users);

    const { password: _, ...safeUser } = updatedUser;
    storageService.set(storageService.KEYS.CURRENT_USER, safeUser);
    return safeUser;
  },

  logout() {
    storageService.remove(storageService.KEYS.CURRENT_USER);
  },

  getDefaultDemoCredentials() {
    return {
      email: DEFAULT_DEMO_USER.email,
      password: DEFAULT_DEMO_USER.password
    };
  }
};
