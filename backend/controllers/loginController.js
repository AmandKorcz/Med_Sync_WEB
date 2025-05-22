const connection = require('../database');
const bcrypt = require('bcrypt');
const jwt = require('jwtwebtoken');
const { validationResult } = require('express-validator');


//Login da secretária
exports.loginSecretaria = (req, res) => {
    const {email, senha} = req.body;
    if (!email || !senha) return res.status(400).json({message: "Email e senha obrigatórios"});
    console.log("Tentativa de login com o email: ", email);

    connection.query("SELECT * FROM secretaria WHERE email = ?", [email], async(err, results) => {
        console.log("Erro no SQL: ", err);
        if (err) return res.status(500).json({erro: err});
        console.log("Resultado da query: ", results);
        if (results.length === 0) {
            console.log("Email não encontrado");
            return res.status(401).json({message: "Usuário não encontrado"});
        }

        const usuario = results[0];
        console.log("Usuário encontrado. Comparando senha...");
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
        console.log("Resultado da comparação: ", senhaCorreta);
        if (!senhaCorreta) {
            console.log("Senha incorreta para o usuário: ", usuario.email);
            return res.status(401).json({message: "Senha ou usuário incorretos."});
        }

        const token = jwt.sign ({id: usuario.id, email: usuario.email, senha: usuario.senha}, 'secreto', {expiresIn: '1h'});
        res.status(200).json({message: "Login realizado com sucesso!", token});
    });
};