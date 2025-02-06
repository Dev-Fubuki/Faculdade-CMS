// routes/numeroRoutes.js

const express = require('express');
const router = express.Router();
const numeroController = require('../controllers/numeroController');
const checkToken = require('../helpers/check-token')

// Rota para criar um novo número
router.post('/numeros',checkToken, numeroController.createNumero);

// Rota para listar todos os números
router.get('/numeros', numeroController.getAllNumeros);

// Rota para buscar um número por título
router.get('/numeros/search', numeroController.searchNumerosByTitle);

// Rota para buscar um número por ID
router.get('/numeros/:id', numeroController.getNumeroById);

// Rota para atualizar um número
router.put('/numeros/:id',checkToken, numeroController.updateNumero);

// Rota para excluir um número por ID
router.delete('/numeros/:id',checkToken, numeroController.deleteNumero);

module.exports = router;
