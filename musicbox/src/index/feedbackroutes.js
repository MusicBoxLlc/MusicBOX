const express = require('express');
const router = express.Router();
const UserService = require('../services/UserService');

router.post('/', async (req, res, next) => {
  const { userId, feedback } = req.body;

  try {
    const feedbackResult = await UserService.submitFeedback(userId, feedback);
    res.status(200).json({ message: feedbackResult });
  } catch (error) {
    next(error); // Pass error to the error handling middleware
  }
});

module.exports = router;
