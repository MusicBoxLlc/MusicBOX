import React, { useState, useEffect } from 'react';
import BookingItem from './BookingItem';
import { getUpcomingBookings, getPastBookings, getPaymentHistory } from '../services/BookingService';

const Bookings = () => {
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch upcoming bookings
    getUpcomingBookings()
      .then(data => {
        setUpcomingBookings(data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching upcoming bookings. Please try again later.');
        setLoading(false);
      });

    // Fetch past bookings
    getPastBookings()
      .then(data => setPastBookings(data))
      .catch(error => console.error('Error fetching past bookings:', error));

    // Fetch payment history
    getPaymentHistory()
      .then(data => setPaymentHistory(data))
      .catch(error => console.error('Error fetching payment history:', error));
  }, []);

  const cancelBooking = (bookingId) => {
    // Implement cancellation logic here (e.g., calling an API to cancel the booking)
    // Update state after successful cancellation
    const updatedBookings = upcomingBookings.filter(booking => booking.id !== bookingId);
    setUpcomingBookings(updatedBookings);
  };

  return (
    <div className="bookings-container">
      <h2>My Bookings</h2>
      {loading ? (
        <p>Loading bookings...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <div className="upcoming-bookings">
            <h3>Upcoming Bookings</h3>
            {upcomingBookings.length > 0 ? (
              upcomingBookings.map(booking => (
                <BookingItem key={booking.id} booking={booking} onCancel={cancelBooking} />
              ))
            ) : (
              <p>No upcoming bookings found.</p>
            )}
          </div>

          <div className="past-bookings">
            <h3>Past Bookings</h3>
            {pastBookings.length > 0 ? (
              pastBookings.map(booking => (
                <BookingItem key={booking.id} booking={booking} />
              ))
            ) : (
              <p>No past bookings found.</p>
            )}
          </div>

          <div className="payment-history">
            <h3>Payment History</h3>
            {paymentHistory.length > 0 ? (
              <ul>
                {paymentHistory.map((payment, index) => (
                  <li key={index}>{payment.description} - Amount: {payment.amount}</li>
                ))}
              </ul>
            ) : (
              <p>No payment history available.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Bookings;
