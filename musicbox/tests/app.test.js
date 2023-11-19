const request = require('supertest');
const app = require('../src/index'); // Assuming your Express app is exported from index.js

describe('Test API endpoints', () => {
  it('POST /api/feedback - Submit feedback', async () => {
    const feedbackData = {
      userId: 'user123',
      feedback: 'This app is awesome!',
    };

    const res = await request(app)
      .post('/api/feedback')
      .send(feedbackData);

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Feedback submitted successfully.');
  });

  it('POST /api/push - Send push notification', async () => {
    const notificationData = {
      userId: 'user456',
      message: 'New update available!',
    };

    const res = await request(app)
      .post('/api/push')
      .send(notificationData);

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Push notification sent successfully.');
  });
});

// Close the server after testing (if required)
afterAll(async () => {
  await app.close(); // Assuming the app object has a method to close the server
});
