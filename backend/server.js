const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const compression = require('compression');
const authRoutes = require('./routes/authRoutes');
const pinRoutes = require('./routes/pinRoutes');
const boardRoutes = require('./routes/boardRoutes');

// Load environment variables
dotenv.config({ path: './configuration/.env' });

const app = express();
const port = process.env.PORT || 5000;

// CORS Configuration (Improved Security)
const corsOptions = {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(compression()); // Compression for performance
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Helmet Security Config
app.use(helmet({
    hidePoweredBy: true,
    frameguard: { action: 'deny' },
    noSniff: true,
    ieNoOpen: true,
    hsts: { maxAge: 90 * 24 * 60 * 60, force: true },
    dnsPrefetchControl: { allow: false },
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", 'trusted-cdn.com'],
        },
    },
}));

// Async Error Handling Middleware
const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/create', pinRoutes);
app.use('/api/board', boardRoutes);

// Health Check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date() });
});

// Centralized Error Handler (Placed Last)
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

// Start Server
const startServer = async () => {
    try {
        app.listen(port, () => {
            console.log(`Server running on port ${port} in ${process.env.NODE_ENV || 'development'} mode`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();

// Handle Unhandled Promise Rejections
process.on('unhandledRejection', err => {
    console.error('Unhandled Promise Rejection:', err);
    process.exit(1);
});

module.exports = app;
