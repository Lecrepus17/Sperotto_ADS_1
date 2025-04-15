const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  'adocao_db',
  'root',
  '',
  {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
  }
);

module.exports = sequelize;
