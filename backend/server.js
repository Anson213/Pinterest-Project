const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const compression = require('compression');
const authRoutes = require('./routes/authRoutes');
const pinRoutes = require('./routes/pinRoutes');
const boardRoutes = require('./routes/boardRoutes');
const testRoutes = require('./routes/testRoutes');
const connectDB = require('./configurations/data-bases.js')

// Load environment variables
dotenv.config({ path: '../configuration/.env' });

const app = express();
const port = process.env.PORT || 3000;

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
/*app.use(helmet({
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
}));*/

app.use(helmet());
app.use(helmet.hidePoweredBy()); 
app.use(helmet.frameguard({ action: 'deny' })); 
app.use(helmet.noSniff());
app.use(helmet.ieNoOpen()); 
app.use(helmet.hsts({ maxAge: 15552000, force: true })); // 6 months
app.use(helmet.dnsPrefetchControl({ allow: false })); 

app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", 'trusted-cdn.com'],
    },
}));

// Async Error Handling Middleware
const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

// Routes
app.use('/api/test', testRoutes)
app.use('/api/auth', authRoutes);
app.use('/api/create', pinRoutes);
app.use('/api/board', boardRoutes);

// Health Check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date() });
});

// Centralized Error Handler (Placed Last)
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Unexpected error occurred';

    if (process.env.NODE_ENV === 'development') {
        console.error('Error:', err);
    } else {
        console.error(`Error [${statusCode}]:`, message);
    }

    res.status(statusCode).json({
        success: false,
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? message : 'Something went wrong'
    });
});

// Start Server
const startServer = async () => {
    try {
        connectDB();
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
    console.error('Unhandled Promise Rejection');
    console.error(`Message: ${err.message}`);
    console.error(`Stack: ${err.stack}`);

    // Graceful shutdown before exiting
    server.close(() => {
        console.error('Server shutting down due to an unhandled rejection.');
        process.exit(1);
    });

    // Force exit if shutdown takes too long
    setTimeout(() => process.exit(1), 5000).unref();
});

module.exports = app;
