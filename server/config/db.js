import mongoose from 'mongoose';

const connectDB = async (uri = process.env.MONGO_URI) => {
  // Check if already connected
  if (mongoose.connection.readyState === 1) {
    console.log('MongoDB already connected');
    return;
  }

  try {
    if (!uri) {
      throw new Error('MongoDB URI is undefined');
    }
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error; // Throw error for caller to handle
  }
};

export default connectDB;