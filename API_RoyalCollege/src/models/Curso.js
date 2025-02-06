// models/Curso.js

const { DataTypes } = require('sequelize');
const sequelize = require('../conn/connection');

const Curso = sequelize.define('Curso', {
  titulo: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  resumo: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  conteudo: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  imagem_principal: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  imagens_internas: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  ordem: {
    type: DataTypes.INTEGER(2),
    allowNull: false,
  },
});

module.exports = Curso;
