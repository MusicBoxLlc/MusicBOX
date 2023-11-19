const mongoose = require('mongoose');
const { MONGODB_URI } = require('./config'); // File containing environment variables

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// You might organize schemas and models into separate files for better structure
// For example, in a 'models' directory:
// const UserModel = require('./models/user');
// const ArtistModel = require('./models/artist');

// Implement proper error handling and logging for database operations
mongoose.set('debug', (coll, method, query, doc) => {
  console.log(`${coll}.${method}`, JSON.stringify(query), doc);
});

// Use more advanced configurations based on application requirements
// For example, setting up indexes
// UserModel.createIndexes();
// ArtistModel.createIndexes();

module.exports = db;
