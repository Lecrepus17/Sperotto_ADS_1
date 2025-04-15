const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Animal = sequelize.define('Animal', {
  nome: DataTypes.STRING,
  especie: DataTypes.STRING,
  raca: DataTypes.STRING,
  idade: DataTypes.INTEGER,
  status: {
    type: DataTypes.ENUM('disponível', 'adotado'),
    defaultValue: 'disponível'
  }
});

// Relacionamento
Animal.belongsTo(User, { as: 'adotante', foreignKey: 'userId' });

module.exports = Animal;
