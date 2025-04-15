const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  nome: DataTypes.STRING,
  email: DataTypes.STRING,
  senha: DataTypes.STRING,
});

module.exports = User;
