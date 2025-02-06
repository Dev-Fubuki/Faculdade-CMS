// controllers/cursoController.js

const Curso = require('../models/Curso');
const { Op } = require('sequelize');


// Método para criar um novo curso
exports.createCurso = async (req, res) => {
  try {
    const { titulo, resumo, conteudo, ordem } = req.body;
    const imagem_principal = req.files['imagem_principal'][0].filename;
    let imagens_internas = '';

    if (req.files['imagens_internas']){
      imagens_internas = req.files['imagens_internas'].map((file) => file.filename);
    }

    const curso = await Curso.create({ titulo, resumo, conteudo, imagem_principal, imagens_internas: JSON.stringify(imagens_internas), ordem });
    res.status(201).json(curso);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar o curso' });
  }
};



// Método para listar todos os cursos
exports.getAllCursos = async (req, res) => {
  try {
    const cursos = await Curso.findAll({
      order: [['ordem', 'ASC']],
  });
    res.status(200).json(cursos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar os cursos' });
  }
};

// Método para buscar um curso por ID
exports.getCursosById = async (req, res) => {
  const { id } = req.params;
  try {
    const curso = await Curso.findByPk(id);
    if (!curso) {
      res.status(404).json({ error: 'Curso não encontrado' });
      return;
    }
    res.status(200).json(curso);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar o curso' });
  }
};

// Método para buscar cursos por título
exports.searchCursosByTitle = async (req, res) => {
  try {
    const { titulo } = req.query; // Recupera o título da consulta da query

    // Realiza a busca no banco de dados com base no título
    const cursos = await Curso.findAll({
      where: {
        titulo: {
          [Op.like]: `%${titulo}%`, // Pesquisa por títulos que contenham o termo
        },
      },
    });

    res.status(200).json(cursos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar cursos por título' });
  }
};


// Método para atualizar um curso por ID
exports.updateCurso = async (req, res) => {
    const { id } = req.params;
    try {
      const { titulo, resumo, conteudo, ordem } = req.body;
      const imagem_principal = req.files['imagem_principal'][0].filename;
      let imagens_internas = '';
    
      if (req.files['imagens_internas']){
        imagens_internas = req.files['imagens_internas'].map((file) => file.filename);
      }

      const [updated] = await Curso.update({ titulo, resumo, conteudo, imagem_principal, imagens_internas: JSON.stringify(imagens_internas), ordem }, {
        where: { id },
      });
      if (updated) {
        const updatedCurso = await Curso.findByPk(id);
        res.status(200).json(updatedCurso);
      } else {
        res.status(404).json({ error: 'Curso não encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar o curso' });
    }
  };

// Método para excluir um curso por ID
exports.deleteCursos = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Curso.destroy({
      where: { id },
    });
    if (deleted) {
      res.status(200).json({ message: 'Curso excluído com sucesso' });
    } else {
      res.status(404).json({ error: 'Curso não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir o curso' });
  }
};
