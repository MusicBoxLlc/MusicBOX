const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// Route to get all bookings
router.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// Route to create a new booking
router.post('/bookings', async (req, res) => {
  try {
    const newBooking = await Booking.create(req.body);
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create booking' });
  }
});

// Route to cancel a booking by ID
router.delete('/bookings/:id', async (req, res) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
    if (!deletedBooking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.status(200).json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to cancel booking' });
  }
});

module.exports = router;
