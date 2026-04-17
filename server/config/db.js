const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

// Use SQLite instead of MySQL to avoid connection/password issues
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // This will create a local file
  logging: false
});

module.exports = { sequelize };
