const { Sequelize } = require('sequelize');

// Initialize Sequelize with your database credentials
const sequelize = new Sequelize('bannu', 'root', 'BANNU', {
  host: 'localhost',
  dialect: 'mysql'
});

// Export sequelize instance
module.exports = sequelize;
