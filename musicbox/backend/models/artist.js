const mongoose = require('mongoose');

// Define the schema for the Artist model
const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  videos: [
    {
      title: String,
      url: String,
    },
  ],
  songs: [
    {
      title: String,
      duration: Number,
      audioUrl: String,
    },
  ],
  photos: [String],
  location: {
    type: String,
    default: '',
  },
  availability: {
    type: Boolean,
    default: true,
  },
  subscriptionStatus: {
    type: Boolean,
    default: false,
  },
});

// Create the Artist model using the schema
const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;
