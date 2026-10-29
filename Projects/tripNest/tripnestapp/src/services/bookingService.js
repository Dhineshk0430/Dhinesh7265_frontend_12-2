import { storageService } from './storageService';
import { generateReferenceNumber } from '../utils/calculations';

const INITIAL_BOOKINGS = [
  {
    id: 'bk-cab-101',
    referenceNumber: 'TN-CAB-8921',
    type: 'cab',
    title: 'Chennai Airport (MAA) to Taj Connemara Hotel',
    provider: 'Sedan (Prime)',
    date: '2026-11-05',
    time: '10:30 AM',
    pickup: 'Chennai International Airport (MAA), Terminal 2',
    destination: 'Taj Connemara, Binny Road, Chennai',
    passengers: 2,
    distanceKm: 15.4,
    fare: 420,
    status: 'Confirmed',
    createdAt: '2026-10-25T10:00:00.000Z',
    cancellationAllowed: true
  },
  {
    id: 'bk-gde-102',
    referenceNumber: 'TN-GDE-3049',
    type: 'guide',
    title: 'Arulmigu Meenakshi Temple & 1000 Pillars Deep Dive',
    provider: 'Murugan Sundaram',
    date: '2026-11-06',
    time: '08:30 AM',
    duration: '3.5 hours',
    groupSize: 2,
    fare: 1800,
    status: 'Confirmed',
    createdAt: '2026-10-26T14:30:00.000Z',
    cancellationAllowed: true
  },
  {
    id: 'bk-htl-103',
    referenceNumber: 'TN-HTL-7712',
    type: 'hotel',
    title: 'Taj Connemara, Chennai',
    provider: 'Heritage Superior Room',
    date: '2026-11-05 to 2026-11-08',
    checkIn: '2026-11-05',
    checkOut: '2026-11-08',
    rooms: 1,
    guests: 2,
    nights: 3,
    fare: 28500,
    status: 'Confirmed',
    createdAt: '2026-10-24T18:15:00.000Z',
    cancellationAllowed: true
  }
];

export const bookingService = {
  getAllBookings() {
    const list = storageService.get(storageService.KEYS.BOOKINGS, null);
    if (!list) {
      storageService.set(storageService.KEYS.BOOKINGS, INITIAL_BOOKINGS);
      return INITIAL_BOOKINGS;
    }
    return list;
  },

  createBooking(bookingData) {
    const bookings = this.getAllBookings();
    const typePrefix =
      bookingData.type === 'cab' ? 'TN-CAB' :
      bookingData.type === 'guide' ? 'TN-GDE' :
      bookingData.type === 'hotel' ? 'TN-HTL' : 'TN-BK';

    const newBooking = {
      ...bookingData,
      id: `bk-${Date.now()}`,
      referenceNumber: generateReferenceNumber(typePrefix),
      status: 'Confirmed',
      cancellationAllowed: true,
      createdAt: new Date().toISOString()
    };

    const updated = [newBooking, ...bookings];
    storageService.set(storageService.KEYS.BOOKINGS, updated);
    return newBooking;
  },

  cancelBooking(bookingId) {
    const bookings = this.getAllBookings();
    const index = bookings.findIndex(b => b.id === bookingId);
    if (index === -1) {
      throw new Error('Booking not found.');
    }

    if (bookings[index].status === 'Cancelled') {
      throw new Error('Booking has already been cancelled.');
    }

    bookings[index] = {
      ...bookings[index],
      status: 'Cancelled',
      cancelledAt: new Date().toISOString()
    };

    storageService.set(storageService.KEYS.BOOKINGS, bookings);
    return bookings[index];
  }
};
