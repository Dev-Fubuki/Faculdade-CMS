// routes/cursoRoutes.js

const express = require('express');
const router = express.Router();
const cursoController = require('../controllers/cursoController');

// importa o método para verificar a sessão do usuário
const checkSession = require("../helpers/sessao").checkSession;

// Rota para a página de cursos
router.get('/cursos/',checkSession, cursoController.getAllCursos);
router.get('/cursosCreate/',checkSession, cursoController.createCurso);
router.post('/cursosSearch/',checkSession, cursoController.searchCursosByTitle);
router.get('/cursos/:id',checkSession, cursoController.editCurso);

module.exports = router;
