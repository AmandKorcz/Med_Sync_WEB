import bcrypt from 'bcrypt';
import database from '../database.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'seu_segredo';
const JWT_EXPIRES_IN = '8h';

export const login = async (email, senha) => {
    try{
        //Buscando usuários 
        const [rows] = await database.execute(
            'SELECT * FROM secretaria WHERE email = ?',
            [email]
        );

        //Verificando a existência
        if(rows.length === 0) {
            return {success: false, message: 'Email ou senha inválidos'};
        }

        const usuario = rows[0];

        //Validando a senha 
        const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);
        if (!senhaValida){
            return {sucess: false, message: 'Email ou senha inválidos'};
        }

        //Gernado token JWT
        const token = jtw.sign(
            {
                id: usuario.id,
                email: usuario.email,
                nome: usuario.nome
            },
            JWT_SECRET,
            {expiresIn: JWT_EXPIRES_IN}
        );

        //Retornando dados do usuário e token
        return {
            sucess: true,
            data: {
                token,
                usuario: {
                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email
                }
            }
        };

    } catch (error) {
        console.error('Erro no login', error);
        throw new Error('Erro identificado durante o processo de login');
    }
};

export const verificarToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
  };