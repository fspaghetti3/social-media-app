// config/connection.js
const Sequelize = require('sequelize');

const sequelize = new Sequelize('social_db', 'root', 'password123', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

module.exports = sequelize;
