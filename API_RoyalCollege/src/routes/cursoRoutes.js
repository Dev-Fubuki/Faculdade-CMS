// routes/cursoRoutes.js

const express = require('express');
const router = express.Router();
const cursoController = require('../controllers/cursoController');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const checkToken = require('../helpers/check-token')

// Configuração do multer para lidar com uploads de arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../public/img/cursos'));
  },
  filename: (req, file, cb) => {
    //cb(null, Date.now() + path.extname(file.originalname));
    cb(null, crypto.randomBytes(24).toString('hex') + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Rota para criar um novo curso com upload de arquivo e verificação de token
router.post('/cursos',checkToken, upload.fields([
  { name: 'imagem_principal', maxCount: 1 },
  { name: 'imagens_internas', maxCount: 10 },
]), cursoController.createCurso);

// Rota para atualizar um curso com upload de arquivo e verificação de token
router.put('/cursos/:id',checkToken, upload.fields([ 
    { name: 'imagem_principal', maxCount: 1 }, 
    { name: 'imagens_internas', maxCount: 10 },
  ] ), cursoController.updateCurso);

router.get('/cursos', cursoController.getAllCursos);
router.get('/cursos/search', cursoController.searchCursosByTitle);
router.get('/cursos/:id', cursoController.getCursosById);

// Rota para excluir um curso com verificação de token
router.delete('/cursos/:id',checkToken, cursoController.deleteCursos);

module.exports = router;
