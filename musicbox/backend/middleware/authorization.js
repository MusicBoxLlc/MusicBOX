const User = require('../models/User');

const authorizeUser = async (req, res, next) => {
  try {
    // Assuming user roles are stored in the User model or passed in the JWT payload
    const user = await User.findById(req.user._id); // Assuming req.user contains the authenticated user details

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the user role has permission to access a specific resource or perform an action
    if (user.role !== 'admin') {
      return res.status(403).json({ error: 'You are not authorized to access this resource' });
    }

    // Authorized user, proceed to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = authorizeUser;
const express = require('express');
const router = express.Router();
const authorizeUser = require('../middleware/authorization');

// Example of using the authorization middleware for a protected route
router.get('/admin-route', authorizeUser, (req, res) => {
  // Only authorized users (e.g., admin role) can access this route
  res.json({ message: 'You have access to the admin route' });
});

module.exports = router;
