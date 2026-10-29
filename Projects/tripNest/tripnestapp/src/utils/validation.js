/**
 * Validate email address format
 */
export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * Validate mobile number (minimum 10 digits)
 */
export function isValidPhone(phone) {
  if (!phone) return false;
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length >= 10;
}

/**
 * Validate registration input
 */
export function validateRegistration(formData, existingUsers = []) {
  const errors = {};

  if (!formData.name || formData.name.trim().length < 2) {
    errors.name = 'Full name is required (min 2 characters).';
  }

  if (!formData.email || !isValidEmail(formData.email)) {
    errors.email = 'Please provide a valid email address.';
  } else {
    const isDuplicate = existingUsers.some(
      u => u.email.toLowerCase() === formData.email.trim().toLowerCase()
    );
    if (isDuplicate) {
      errors.email = 'An account with this email already exists.';
    }
  }

  if (!formData.phone || !isValidPhone(formData.phone)) {
    errors.phone = 'Please provide a valid 10-digit mobile number.';
  }

  if (!formData.password || formData.password.length < 6) {
    errors.password = 'Password must be at least 6 characters long.';
  }

  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Validate login input
 */
export function validateLogin(formData) {
  const errors = {};

  if (!formData.email || !isValidEmail(formData.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!formData.password) {
    errors.password = 'Password is required.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Validate booking dates
 */
export function validateBookingDates(checkIn, checkOut) {
  if (!checkIn) return { valid: false, message: 'Check-in date is required.' };
  if (!checkOut) return { valid: false, message: 'Check-out date is required.' };

  const start = new Date(checkIn);
  const end = new Date(checkOut);

  if (end <= start) {
    return { valid: false, message: 'Check-out date must be after check-in date.' };
  }

  return { valid: true };
}
