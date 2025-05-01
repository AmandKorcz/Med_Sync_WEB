import express from 'express';
import { autenticar } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(autenticar); // Todas as rotas abaixo requerem autenticação

// Exemplo de rota
router.get('/', (req, res) => {
    res.json({ message: 'Lista de médicos' });
});

export default router;