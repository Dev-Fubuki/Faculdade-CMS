// routes/numeroRoutes.js

const express = require('express');
const router = express.Router();
const numeroController = require('../controllers/numeroController');

// importa o método para verificar a sessão do usuário
const checkSession = require("../helpers/sessao").checkSession;

// Rota para a página de numeros
router.get('/numeros/',checkSession, numeroController.getAllNumeros);

module.exports = router;
