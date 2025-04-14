import express from 'express';
import database from '../database.js';
import bcrypt from "bcrypt";

const router = express.Router(); 

router.post('/', async (req, res) => {
    const { email, senha } = req.body;

    console.log("Dados recebidos para login:", email, senha); // Logando os dados de entrada para verificar

    try {
        // Consulta ao banco de dados para encontrar o usuário com o email
        const [rows] = await database.execute(
            'SELECT * FROM secretaria WHERE email = ?',
            [email]
        );
        
        // Verifica se não encontrou o usuário
        if (rows.length === 0) {
            console.log("Usuário não encontrado:", email); // Logando quando o usuário não é encontrado
            return res.status(401).json({ mensagem: 'Email ou senha inválidos' });
        }

        const usuario = rows[0];
        console.log("Usuário encontrado:", usuario); // Logando os dados do usuário encontrado no banco

        // Verifica se a senha fornecida é válida
        const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);
        
        if (!senhaValida) {
            console.log("Senha inválida para o usuário:", email); // Logando quando a senha não corresponde
            return res.status(401).json({ mensagem: 'Email ou senha inválidos' });
        }

        // Caso o login seja bem-sucedido
        res.json({
            mensagem: 'Login bem-sucedido',
            secretaria: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            }
        });
    } catch (err) {
        console.error("Erro no servidor:", err); // Logando qualquer erro no servidor
        res.status(500).json({ mensagem: 'Erro no servidor' });
    }
});

export default router;
