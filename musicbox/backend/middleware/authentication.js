const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Assuming token is sent in the 'Authorization' header

    if (!token) {
      return res.status(401).json({ error: 'Authentication failed. Token not provided.' });
    }

    const decoded = jwt.verify(token, 'secretKey'); // Verify the JWT token

    const user = await User.findById(decoded.userId); // Fetch user based on the decoded userId

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Attach the user object to the request for further usage in subsequent middleware/functions
    req.user = user;
    next(); // Move to the next middleware/function
  } catch (error) {
    return res.status(401).json({ error: 'Authentication failed. Invalid token.' });
  }
};

module.exports = authenticateUser;
const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authentication');

// Example of using the authentication middleware for a protected route
router.get('/protected-route', authenticateUser, (req, res) => {
  // Access user information using req.user
  res.json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;
