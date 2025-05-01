import express from 'express';
import cors from 'cors';
import authRouter from './routes/authRoutes.js';
import medicosRouter from './routes/medicosRoutes.js'; // Você precisará criar

const app = express();

// Configurações
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

// Rotas
app.use('/api/auth', authRouter);
app.use('/api/medicos', medicosRouter);

// Rota health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'online' });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});