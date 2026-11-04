
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

// Database file location
// Render can use a persistent disk through DATABASE_PATH.
const databasePath = process.env.DATABASE_PATH ||
    path.resolve(__dirname, '..', 'database.sqlite');

// SQLite database connection
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: databasePath,
    logging: false,
    dialectOptions: {
        timeout: 30000
    }
});

module.exports = { sequelize };
