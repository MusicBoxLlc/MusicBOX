const jwt = require('jsonwebtoken');
const { CustomError } = require('../utils/errorHandler');

const JWT_SECRET = process.env.JWT_SECRET || 'your_default_secret_key';

function generateToken(userId, expiresIn = '1h') {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn });
}

function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded.userId;
  } catch (error) {
    throw new CustomError(401, 'Token expired or invalid');
  }
}

function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]; // Get token from Authorization header
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  try {
    const userId = verifyToken(token);
    req.userId = userId; // Attach userId to request for further use
    next();
  } catch (error) {
    return res.status(error.statusCode || 401).json({ error: error.message });
  }
}

module.exports = { generateToken, verifyToken, authenticateToken };
