
const dotenv = require('dotenv');

// Load environment variables before other imports
dotenv.config();

const express = require('express');
const cors = require('cors');
const { sequelize } = require('./config/db');

const app = express();

// Middleware
app.use(cors({
    origin: [
        'https://roomify-hotel-booking.netlify.app',
        'http://localhost:5173'
    ],
    credentials: true
}));

app.use(express.json());

// Load Models
require('./models/User');
require('./models/Hotel');
require('./models/Booking');

// Load Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/hotels', require('./routes/hotels'));
app.use('/api/bookings', require('./routes/bookings'));

// Base route
app.get('/api', (req, res) => {
    res.json({
        message: 'ROOMIFY Hotel Booking API is running!'
    });
});

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK'
    });
});

// Server configuration
const PORT = process.env.PORT || 5000;

// Connect database and start server
sequelize.sync()
    .then(() => {
        console.log('Database synced successfully');

        app.listen(PORT, '0.0.0.0', () => {
            console.log(`ROOMIFY server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Database connection failed:', error);
        process.exit(1);
    });
