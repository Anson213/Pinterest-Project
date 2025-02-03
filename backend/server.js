// index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');

// Load environment variables before any other code
dotenv.config({ path: './configuration/.env' });

const app = express();
const port = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());  // Modern replacement for bodyParser.json()
app.use(express.urlencoded({ extended: true }));  // For parsing application/x-www-form-urlencoded

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something broke!',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error'
    });
});

// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date() });
});

// Login or Signin route
app.use('/api/auth', authRoutes);

//Image upload routes
app.use('/api/create', require('./routes/createRoutes'));

// Start server with error handling
const startServer = async () => {
    try {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
            console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Promise Rejection:', err);
    // Optionally: process.exit(1);
});

module.exports = app;  // For testing purposes
