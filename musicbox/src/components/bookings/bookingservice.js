// Simulated data for bookings and payment history
const bookingsData = {
    upcomingBookings: [
      { id: 1, date: '2023-12-01', venue: 'Concert Hall A' },
      { id: 2, date: '2023-12-15', venue: 'Music Venue B' },
      // Other upcoming bookings...
    ],
    pastBookings: [
      { id: 3, date: '2023-11-20', venue: 'Theater C' },
      { id: 4, date: '2023-10-05', venue: 'Festival D' },
      // Other past bookings...
    ],
    paymentHistory: [
      { description: 'Ticket Purchase', amount: '$50' },
      { description: 'Merchandise Purchase', amount: '$30' },
      // Other payment history items...
    ],
  };
  
  // Simulated delay for API request (to mimic async behavior)
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  
  export const getUpcomingBookings = () => {
    return delay(1000).then(() => bookingsData.upcomingBookings);
  };
  
  export const getPastBookings = () => {
    return delay(1000).then(() => bookingsData.pastBookings);
  };
  
  export const getPaymentHistory = () => {
    return delay(1000).then(() => bookingsData.paymentHistory);
  };
  