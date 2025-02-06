// numeroController.js

const api = require('../config/api');

// Método para buscar todos os numeros
exports.getAllNumeros = async (req, res) => {
  try {
    // Faz uma solicitação GET para a API que fornece os numeros
    const response = await api.get(`/numeros`);

    // Obtenha os dados JSON da resposta
    const numeros = response.data;

    // Renderiza a página numero/index.handlebars e passa os numeros como contexto
    res.render('numero/', { numeros });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar numeros' });
  }
};
