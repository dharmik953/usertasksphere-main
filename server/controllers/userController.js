import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import Joi from 'joi';
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'user.log' }),
  ],
});

// Validation schemas
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const registerSchema = Joi.object({
  username: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const authUser = async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    logger.warn(`Validation error in authUser: ${error.details[0].message}`);
    return res.status(400).json({ message: error.details[0].message });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      logger.info(`User authenticated: ${user.email}`);
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken({ _id: user._id, email: user.email, username: user.username }),
      });
    } else {
      logger.warn(`Invalid login attempt for email: ${email}`);
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    logger.error(`Error in authUser: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

export const registerUser = async (req, res) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    logger.warn(`Validation error in registerUser: ${error.details[0].message}`);
    return res.status(400).json({ message: error.details[0].message });
  }

  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      logger.warn(`User already exists: ${email}`);
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ username, email, password });
    // const user = await User.create({ _id: user._id, username, email, password });
    logger.info(`User registered: ${user.email}`);
    const payload = { email, username };
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
     // token: generateToken(user._id),
     token: generateToken({ _id: user._id, email: user.email, username: user.username }),
    });
  } catch (error) {
    logger.error(`Error in registerUser: ${error.message} , ${error.stack}`);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      logger.info(`Profile retrieved for: ${user.email}`);
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
      });
    } else {
      logger.warn(`User not found: ${req.user._id}`);
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    logger.error(`Error in getUserProfile: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};