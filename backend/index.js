const https = require('https');
const fs = require('fs');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
  origin:  ['http://localhost:5173', 'https://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const loginRouter = require('./routes/login.js');
app.use('/', loginRouter);

const registerRouter = require('./routes/login.js');
app.use('/register', registerRouter);

const medicoRouter = require('./routes/medico.js');
app.use('/medico', medicoRouter);

const consultaRouter = require('./routes/consulta.js');
app.use('/consultas', consultaRouter);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000")
})