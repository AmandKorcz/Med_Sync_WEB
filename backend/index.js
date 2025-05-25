const express = require('express');
const cors = require('cors');

const app = express();

/*
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
*/

app.use(express.json());

const loginRouter = require('./routes/login.js');
app.use('/login', loginRouter);

const medicoRouter = require('./routes/medico.js');
app.use('/medico', medicoRouter);

const consultaRouter = require('./routes/consulta.js');
app.use('/consultas', consultaRouter);

app.listen(3000, () => {
    console.log('Servidor ativo na porta 3000');
});