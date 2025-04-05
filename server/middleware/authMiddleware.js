import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import winston from 'winston';


const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'auth.log' }),
  ],
});

export const protect = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) throw new Error('No token provided');

    const secret = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, secret);
    console.log('[DEBUG] Decoded token:', decoded);

    // Fetch user from DB using email or _id
    const user = await User.findOne({ email: decoded.email }).select('-password');
    if (!user) throw new Error('User not found');

    req.user = user; // Now includes _id as an ObjectId
    next();
  } catch (err) {
    console.error('[ERROR] Token verification failed:', err.message);
    res.status(401).json({ message: 'Unauthorized' });
  }
};