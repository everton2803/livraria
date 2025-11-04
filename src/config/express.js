// src/config/express.js
const express = require("express");
const morgan = require("morgan");
const app = express();
const session = require("express-session");

// Middleware básicos do Express
app.use(express.json()); // Middleware para interpretar JSON
app.use(express.urlencoded({ extended: true })); // Suporte para dados de formulários
app.use(morgan("combined")); // Logging HTTP

// Configurações explícitas da sessão
app.use(session({
    name: process.env.SESSION_NAME || 'sid',
    secret: process.env.SESSION_SECRET || "livraria_secret_key",
    resave: false,
    saveUninitialized: false,
    rolling: true, // renova a sessão a cada requisição
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // true apenas em produção HTTPS
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 2 // 2 horas
    }
}));

module.exports = app;