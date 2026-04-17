const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { sequelize } = require('./config/db');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
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
  res.json({ message: 'Hotel Booking API is running.' });
});

// Sync DB and Start Server
const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  console.log('✅ Database synced successfully');
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}).catch(err => {
  console.error('❌ Unable to connect to the database:', err);
});
