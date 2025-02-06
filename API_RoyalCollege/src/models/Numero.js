// models/Numero.js

const { DataTypes } = require('sequelize');
const sequelize = require('../conn/connection');

const Numero = sequelize.define('Numero', {
  titulo: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  numero: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  icone: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
});

module.exports = Numero;
