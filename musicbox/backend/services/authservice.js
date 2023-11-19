const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (user) => {
  return jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' } // Token expires in 1 hour, adjust as needed
  );
};

const AuthService = {
  async registerUser(userData) {
    try {
      const { username, email, password } = userData;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ username, email, password: hashedPassword });
      const token = generateToken(newUser);
      return { user: newUser, token };
    } catch (error) {
      throw new Error('Failed to register user');
    }
  },

  async loginUser(email, password) {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('User not found');
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error('Invalid password');
      }
      const token = generateToken(user);
      return { user, token };
    } catch (error) {
      throw new Error('Failed to login');
    }
  },
};

module.exports = AuthService;
