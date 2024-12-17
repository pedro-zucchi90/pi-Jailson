const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const Email = require('./backend/models/emailModel');


const app = express();
const PORT = 8081;

// Conectar ao MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/emailsDB')
    .then(() => {
        console.log('Conectado ao MongoDB');
    })
    .catch(err => {
        console.error('Erro ao conectar ao MongoDB:', err);
    });

// Middleware para JSON
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Middleware para arquivos estáticos (corrigido)
app.use(express.static(path.join(__dirname, 'public/frontend')));

// Rotas para páginas HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/frontend/html/pagInicial.html'));
});

app.get('/plasma', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/frontend/html/plasma.html'));
});

app.get('/propulsao', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/frontend/html/propulsao.html'));
});

app.get('/aplicacoes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/frontend/html/aplicacoes.html'));
});

//Adicionar o email no BD
app.post('/save-email', async (req, res) => {
    console.log('Requisição recebida:', req.body);
    const { email } = req.body;

    if (!email) {
        return res.status(400).send('Email não fornecido.');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).send('Email inválido.');
    }

    try {
        const newEmail = new Email({ email });
        await newEmail.save();
        res.status(201).send('Email salvo com sucesso!');
    } catch (error) {
        console.error('Erro ao salvar no MongoDB:', error);
        res.status(500).send('Erro ao salvar email.');
    }
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
