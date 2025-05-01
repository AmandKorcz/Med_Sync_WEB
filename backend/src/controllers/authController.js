import jwt from 'jsonwebtoken'; 

export const login = async (email, senha) => {
    try {
        const [rows] = await database.execute(
            'SELECT * FROM secretaria WHERE email = ?',
            [email]
        );

        if (rows.length === 0) {
            return { success: false, message: 'Credenciais inválidas' }; 
        }

        const usuario = rows[0];
        const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);
        
        if (!senhaValida) {
            return { success: false, message: 'Credenciais inválidas' }; 
        }

        const token = jwt.sign(
            {
                id: usuario.id,
                email: usuario.email
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '8h' }
        );

        return {
            success: true, 
            token,
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            }
        };

    } catch (error) {
        console.error('Erro no login:', error);
        throw new Error('Falha no processo de autenticação');
    }
};