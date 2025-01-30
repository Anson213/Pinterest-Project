const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './configuration/.env' });

const connectDB = async (uri = process.env.MONGODB_URL) => {
  try {
    if (!uri) {
      throw new Error('Environment variable MONGODB_URL is not defined.');
    }

    await mongoose.connect(uri);
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error.message);
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


/*
dotenv.config({ path: './configuration/.env' });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
*/