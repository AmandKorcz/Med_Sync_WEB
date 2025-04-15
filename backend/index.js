import express from 'express';
import cors from 'cors';
import loginRouter from './routes/login.js';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}
));

app.use(express.json());
app.use('/login', loginRouter);

app.listen(3000, () => {
    console.log('Servidor ativo na porta 3000');
})