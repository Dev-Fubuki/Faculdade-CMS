// cursoController.js

const api = require('../config/api');

// Método para buscar todos os cursos
exports.getAllCursos = async (req, res) => {
  try {
    // Faz uma solicitação GET para a API que fornece os cursos
    const response = await api.get(`/cursos`);

    // Obtenha os dados JSON da resposta
    const cursos = response.data;

    // Renderiza a página curso/index.handlebars e passa os cursos como contexto
    res.render('curso/', { cursos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar cursos' });
  }
};

// Método para buscar curso para edição
exports.editCurso = async (req, res) => {
  try {
    const { id } = req.params;
    // Faz uma solicitação GET para a API que fornece o curso
    const response = await api.get(`/cursos/${id}`);

    // Obtenha os dados JSON da resposta
    const curso = response.data;

    // Renderiza a página curso/edit.handlebars e passa o curso como contexto
    res.render('curso/edit', { curso });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar curso' });
  }
};

// Método para apresentar formulário de criação do curso
exports.createCurso = async (req, res) => {
  try {
    // Renderiza a página curso/create.handlebars
    res.render('curso/create');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao mostrar formulário de criação de cursos' });
  }
};


// Método para buscar todos os cursos
exports.searchCursosByTitle = async (req, res) => {
  try {
    // Obter o valor inserido no campo de pesquisa
    const valorPesquisa = req.body.valorPesquisa

    // Fazer uma solicitação GET para buscar banners com base no título
    const response = await api.get(`/cursos/search?titulo=${valorPesquisa}`)

    // Obtenha os dados JSON da resposta
    const cursos = response.data;

    // Renderiza a página curso/index.handlebars e passa os cursos como contexto
    res.render('curso/', { cursos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar cursos' });
  }
};

