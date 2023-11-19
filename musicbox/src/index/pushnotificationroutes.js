const express = require('express');
const router = express.Router();
const NotificationService = require('../services/NotificationService');

router.post('/', async (req, res, next) => {
  const { userId, message } = req.body;

  try {
    const notificationResult = await NotificationService.sendPushNotification(userId, message);
    res.status(200).json({ message: notificationResult });
  } catch (error) {
    next(error); // Pass error to the error handling middleware
  }
});

module.exports = router;
