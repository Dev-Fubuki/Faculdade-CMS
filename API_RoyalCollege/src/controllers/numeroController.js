// controllers/numeroController.js

const Numero = require('../models/Numero');
const { Op } = require('sequelize');


// Método para criar um novo número
exports.createNumero = async (req, res) => {
  try {
    const { titulo, numero, icone } = req.body;

    const numeroCriado = await Numero.create({ titulo, numero, icone });
    res.status(201).json(numeroCriado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar o número' });
  }
};

// Método para listar todos os números
exports.getAllNumeros = async (req, res) => {
  try {
    const numeros = await Numero.findAll();
    res.status(200).json(numeros);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar os números' });
  }
};

// Método para buscar um número por ID
exports.getNumeroById = async (req, res) => {
  const { id } = req.params;
  try {
    const numero = await Numero.findByPk(id);
    if (!numero) {
      res.status(404).json({ error: 'Número não encontrado' });
      return;
    }
    res.status(200).json(numero);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar o número' });
  }
};

// Método para buscar numeros por título
exports.searchNumerosByTitle = async (req, res) => {
  try {
    const { titulo } = req.query; // Recupera o título da consulta da query

    // Realiza a busca no banco de dados com base no título
    const numeros = await Numero.findAll({
      where: {
        titulo: {
          [Op.like]: `%${titulo}%`, // Pesquisa por títulos que contenham o termo
        },
      },
    });

    res.status(200).json(numeros);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar numeros por título' });
  }
};

// Método para atualizar um número por ID
exports.updateNumero = async (req, res) => {
  const { id } = req.params;
  try {
    const { titulo, numero, icone } = req.body;

    const [updated] = await Numero.update({ titulo, numero, icone }, {
      where: { id },
    });
    if (updated) {
      const updatedNumero = await Numero.findByPk(id);
      res.status(200).json(updatedNumero);
    } else {
      res.status(404).json({ error: 'Número não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar o número' });
  }
};

// Método para excluir um número por ID
exports.deleteNumero = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Numero.destroy({
      where: { id },
    });
    if (deleted) {
      res.status(200).json({ message: 'Número excluído com sucesso' });
    } else {
      res.status(404).json({ error: 'Número não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir o número' });
  }
};
