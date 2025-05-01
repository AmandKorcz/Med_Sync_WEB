import express from 'express';
import { login } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({
                success: false,
                message: 'Email e senha são obrigatórios'
            });
        }

        const resultado = await login(email, senha);

        if (!resultado.success) {
            return res.status(401).json(resultado);
        }

        res.json(resultado);

    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({
            success: false,
            message: 'Erro interno no servidor'
        });
    }
});

export default router;