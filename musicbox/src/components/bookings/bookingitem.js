import React from 'react';

const BookingItem = ({ booking, onCancel }) => {
  const handleCancel = () => {
    // Call cancel function passed from parent component
    onCancel(booking.id);
  };

  return (
    <div className="booking-item">
      <p>Booking ID: {booking.id}</p>
      <p>Date: {booking.date}</p>
      <p>Venue: {booking.venue}</p>
      {onCancel && (
        <button onClick={handleCancel}>Cancel Booking</button>
      )}
    </div>
  );
};

export default BookingItem;
