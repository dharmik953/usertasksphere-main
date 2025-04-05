import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console(),
  ],
});

dotenv.config();

const createApp = async () => {
  try {
    await connectDB(); // Connect to DB (will use MONGO_URI or test override)
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use('/api/users', userRoutes);
    app.use('/api/tasks', taskRoutes);

    app.get('/', (req, res) => {
      logger.info('Root endpoint accessed');
      res.send('API is running');
    });

    app.use((err, req, res, next) => {
      const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
      logger.error(`Error: ${err.message}`, { stack: err.stack, path: req.path, method: req.method });
      res.status(statusCode).json({
        message: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
      });
    });

    return app;
  } catch (error) {
    logger.error(`Failed to initialize app: ${error.message}`);
    throw error;
  }
};

// Start server only if not in test environment
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 5032;
  createApp().then((app) => {
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  }).catch((error) => {
    logger.error(`Server startup failed: ${error.message}`);
    process.exit(1);
  });
}

export default createApp; // Export the app factory for tests