import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import winston from 'winston';

const secret = process.env.JWT_SECRET || "035130d762d2acecfb452233cd646f1f51e54f255c1f49b2c3a9b2d327126dfcc5e4b4b7bc35b39652b3244091232b1a090706394a244eadb1ff719918be075fc61a401258eeddd0daf0f07c65178b51dc6f7c7e7101499be94c24514b1340e88eb0345e09ad09eec66fdc78b6970fe16c1b0bff43782c15d088f35dec4bcccc8e5bde12878cc7edcb04950e6fe578ccc346f53602a4c67f1c078df3e2ab3dae0c40c60c9281f836a3af3d4b170688ec29750841660cdee4daf0ee1bdc893cffe64efc1d43dfa6f95820fe21b92a29f30b1ece7df51758dc4626315c52a14d5666c1c2ed4a5cc39d42f42b86768e194814c5185b2630b42d767aaaf30d836a47";

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