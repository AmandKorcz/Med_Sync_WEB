import { verificarToken } from '../controllers/authController.js';

export const autenticar = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: 'Token não fornecido'
            });
        }

        const [bearer, token] = authHeader.split(' ');

        if (bearer !== 'Bearer' || !token) {
            return res.status(401).json({
                success: false,
                message: 'Formato de token inválido'
            });
        }

        const decoded = verificarToken(token);
        req.usuario = decoded; // Já contém id e email do sign

        next();
    } catch (error) {
        console.error('Erro na autenticação:', error);

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token expirado'
            });
        }

        return res.status(401).json({
            success: false,
            message: 'Token inválido'
        });
    }
};