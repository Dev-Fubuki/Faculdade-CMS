// controllers/contatoController.js

const nodemailer = require('nodemailer');
const Contato = require('../models/Contato');

// Configuração do transporte de e-mail (SMTP do Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'seu-email@ifsc.edu.br', // Substitua pelo seu e-mail do Gmail
    pass: 'sua_senha', // Substitua pela sua senha do Gmail
  },
});

// Método para enviar e-mail de contato
exports.sendEmail = async (req, res) => {
  try {
    const { nome, email, mensagem } = req.body;

    console.log(req.body);

    // Configurações do e-mail
    const mailOptions = {
      from: 'seu-email@ifsc.edu.br',
      to: 'seu-email@ifsc.edu.br', // Substitua pelo e-mail de destino
      subject: 'Contato de ' + nome,
      text: mensagem + '\n Email: '+email,
      replyTo: email,
    };

    // Envio do e-mail
    await transporter.sendMail(mailOptions);

    // Salva os dados no banco de dados (opcional)
    await Contato.create({ nome, email, mensagem });

    res.status(200).json({ message: 'E-mail enviado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao enviar o e-mail' });
  }
};
