const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env')});

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URL;
    if (!uri) {
      throw new Error('Environment variable MONGODB_URL is not defined.');
    }

    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
    });
    console.log('Database connected successfully');
  } catch (error) {
    console.log('Database connection failed:', error.message);
    process.exit(1); 
  }
};

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to the database');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from the database');
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('Database connection closed gracefully');
  process.exit(0);
});

module.exports = connectDB;