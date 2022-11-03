import api from './api';

export const getBookings = () => {
  return api.get('bookings');
};

export const createBooking = (listingId, dateRange, totalPrice) => {
  return api.post('bookings/new/' + listingId, {
    dateRange,
    totalPrice,
  });
};

export const acceptBooking = (bookingId) => {
  return api.put('bookings/accept/' + bookingId);
};

export const declineBooking = (bookingId) => {
  return api.put('bookings/decline/' + bookingId);
};

export const deleteBooking = (bookingId) => {
  return api.delete('bookings/' + bookingId);
};
