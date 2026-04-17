const express = require('express');
const Booking = require('../models/Booking');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Middleware to protect routes
const protect = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Create a booking (Checkout)
router.post('/', protect, async (req, res) => {
  try {
    const { hotelId, roomId, checkInDate, checkOutDate, guests, totalPrice } = req.body;
    
    const booking = await Booking.create({
      userId: req.user.id,
      hotelId,
      roomId,
      checkInDate,
      checkOutDate,
      guests,
      totalPrice,
      status: 'confirmed' // simulate successful payment
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
});

// Get user's bookings
router.get('/', protect, async (req, res) => {
  try {
    const bookings = await Booking.findAll({ where: { userId: req.user.id } });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
});

module.exports = router;
