const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');
const Hotel = require('./Hotel');

const Booking = sequelize.define('Booking', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  checkInDate: { type: DataTypes.DATEONLY, allowNull: false },
  checkOutDate: { type: DataTypes.DATEONLY, allowNull: false },
  guests: { type: DataTypes.INTEGER, allowNull: false },
  totalPrice: { type: DataTypes.FLOAT, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: 'confirmed' },
  roomId: { type: DataTypes.INTEGER, allowNull: false },
}, {
  timestamps: true,
});

// Relationships
User.hasMany(Booking, { foreignKey: 'userId' });
Booking.belongsTo(User, { foreignKey: 'userId' });

Hotel.hasMany(Booking, { foreignKey: 'hotelId' });
Booking.belongsTo(Hotel, { foreignKey: 'hotelId' });

module.exports = Booking;
