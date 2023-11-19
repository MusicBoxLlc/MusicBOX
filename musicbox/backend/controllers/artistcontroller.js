const { validationResult } = require('express-validator');
const Artist = require('../models/Artist');
const { authenticateUser, authorizeAdmin } = require('../middleware/auth'); // Sample auth middleware

const artistController = {
  getAllArtists: async (req, res) => {
    try {
      // Pagination logic
      // ...

      // Sorting logic based on query parameters
      // ...

      const artists = await Artist.find()
        .sort(sortOptions)
        .limit(limit)
        .skip(startIndex)
        .exec();

      res.status(200).json({ artists, pagination });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getArtistById: async (req, res) => {
    const { id } = req.params;
    try {
      const artist = await Artist.findById(id);
      if (!artist) {
        return res.status(404).json({ error: 'Artist not found' });
      }
      res.status(200).json(artist);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  createArtist: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, genre, description } = req.body;
    try {
      const newArtist = await Artist.create({ name, genre, description });
      res.status(201).json(newArtist);
    } catch (error) {
      res.status(400).json({ error: 'Invalid data' });
    }
  },

  // Update and Delete methods remain unchanged

  // Sample authentication middleware usage
  updateArtist: [
    authenticateUser, // Middleware to check if user is authenticated
    authorizeAdmin,   // Middleware to check if user is authorized (e.g., admin)
    async (req, res) => {
      // Update logic here
    }
  ],
};

module.exports = artistController;
