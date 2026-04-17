const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Hotel = sequelize.define('Hotel', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  location: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
  rating: { type: DataTypes.FLOAT, defaultValue: 0 },
  reviews: { type: DataTypes.INTEGER, defaultValue: 0 },
  image: { type: DataTypes.STRING, allowNull: false },
  amenities: { type: DataTypes.JSON, allowNull: false }, // Stores array of strings
  description: { type: DataTypes.TEXT, allowNull: false },
  rooms: { type: DataTypes.JSON, allowNull: false } // Stores array of room objects
}, {
  timestamps: true,
});

module.exports = Hotel;
