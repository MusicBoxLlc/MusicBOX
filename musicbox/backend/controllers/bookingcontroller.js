const Booking = require('../models/Booking'); // Assuming Booking model schema
const User = require('../models/User'); // Assuming User model schema
const Artist = require('../models/Artist'); // Assuming Artist model schema

const bookingController = {
  createBooking: async (req, res) => {
    const { userId, artistId, date, venue } = req.body;

    try {
      // Check if the user and artist exist
      const user = await User.findById(userId);
      const artist = await Artist.findById(artistId);

      if (!user || !artist) {
        return res.status(404).json({ error: 'User or artist not found' });
      }

      // Check if the artist is available on the specified date
      const isArtistAvailable = await checkArtistAvailability(artistId, date);

      if (!isArtistAvailable) {
        return res.status(400).json({ error: 'Artist is not available on the specified date' });
      }

      // Create the booking
      const newBooking = await Booking.create({
        user: userId,
        artist: artistId,
        date,
        venue,
      });

      // Process payment (simulated)
      // Assuming the payment is successful
      // In a real scenario, you'd integrate with a payment gateway
      // and handle payment status before confirming the booking

      res.status(201).json(newBooking);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getBookingsForUser: async (req, res) => {
    const { userId } = req.params;

    try {
      const userBookings = await Booking.find({ user: userId }).populate('artist');

      res.status(200).json(userBookings);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  cancelBooking: async (req, res) => {
    const { bookingId } = req.params;

    try {
      const deletedBooking = await Booking.findByIdAndDelete(bookingId);

      if (!deletedBooking) {
        return res.status(404).json({ error: 'Booking not found' });
      }

      res.status(200).json({ message: 'Booking cancelled successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

// Simulated function to check artist availability (should be implemented based on your logic)
async function checkArtistAvailability(artistId, date) {
  // Logic to check artist availability goes here
  // Example: Query the database to check if the artist is available on the specified date
  return true; // Return true/false based on availability
}

module.exports = bookingController;
