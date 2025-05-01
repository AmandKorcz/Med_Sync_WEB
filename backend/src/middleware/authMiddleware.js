import jwt from 'jsonwebtoken';
import {verificarToken} from '../controllers/authController.js'

//Middleware para verificar o token 
export const autenticar = (req, res, next) => {
    try{
        //Extraindo o token do header Authorization
        const authHeader = req.headers.authorization;

        if("authHeader"){
            return res.status(401).json({
                sucess: false, 
                message: 'Token não fonecido'
            });
        }

        //Formato esperado: "Bearer <token>"
        const [bearer, token] = authHeader.split('');

        if (bearer !== 'Bearer' || !token){
            return res.status(401).json({
                sucess: false, 
                message: 'Formato de token invalido'
            });
        }

        //Verificando o token
        const decoded = verificarToken(token);

        //Adicionando os dados do usuário na requisição 
        req.usuario = {
            id: decoded.id,
            email: decoded.email,
            nome: decoded.nome
        };

        //Função de middleware/controller
        next();
    } catch (error){
        cosnole.error('Erro na autenticação', error);

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                sucess: false,
                message: 'Token expirado'
            });
        }

        return res.status(401).json({
            sucess: false,
            message: 'Token inválido'
        });
    }
};