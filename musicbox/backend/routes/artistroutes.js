const express = require('express');
const router = express.Router();
const Artist = require('../models/Artist');

// Route to get all artists
router.get('/artists', async (req, res) => {
  try {
    const artists = await Artist.find();
    res.status(200).json(artists);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch artists' });
  }
});

// Route to get a specific artist by ID
router.get('/artists/:id', async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);
    if (!artist) {
      return res.status(404).json({ error: 'Artist not found' });
    }
    res.status(200).json(artist);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch the artist' });
  }
});

// Route to create a new artist
router.post('/artists', async (req, res) => {
  try {
    const newArtist = await Artist.create(req.body);
    res.status(201).json(newArtist);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create artist' });
  }
});

// Route to update an existing artist by ID
router.put('/artists/:id', async (req, res) => {
  try {
    const updatedArtist = await Artist.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedArtist) {
      return res.status(404).json({ error: 'Artist not found' });
    }
    res.status(200).json(updatedArtist);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update artist' });
  }
});

// Route to delete an artist by ID
router.delete('/artists/:id', async (req, res) => {
  try {
    const deletedArtist = await Artist.findByIdAndDelete(req.params.id);
    if (!deletedArtist) {
      return res.status(404).json({ error: 'Artist not found' });
    }
    res.status(200).json({ message: 'Artist deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete artist' });
  }
});

module.exports = router;
