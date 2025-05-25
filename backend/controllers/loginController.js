const connection = require('../database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');


//Login da secretária
exports.loginUsuario = (req, res) => {
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
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha_hash);
        console.log("Resultado da comparação: ", senhaCorreta);
        if (!senhaCorreta) {
            console.log("Senha incorreta para o usuário: ", usuario.email);
            return res.status(401).json({message: "Senha ou usuário incorretos."});
        }

        const token = jwt.sign ({id: usuario.id, email: usuario.email, senha: usuario.senha}, 'secreto', {expiresIn: '1h'});
        res.status(200).json({message: "Login realizado com sucesso!", token});
    });
};

//Criar novo login
exports.criarUsuario = async (req, res) => {
    const erros = validationResult(req);
    if(!erros.isEmpty()) {
        return res.status(400).json({erros: erros.array()});
    }

    const {nome, email, senha} = req.body;
    console.log("Dados recebidos: ", {nome, email, senha});

    try{
        console.log("Iniciando criptografia de senha");
        const senhaCriptografada = await bcrypt.hash(senha, 10);
        console.log("Senha criptografada com sucesso");

        connection.query(
            "INSERT INTO secretaria (nome, email, senha) VALUES (?,?,?)",
            [nome, email, senhaCriptografada],
            (err, results) => {
                if (err) {
                    console.log("Erro ao inserir novo dado ao MySQL: ", err);
                    return res.status(500).json({erro: err.message});
                }
                console.log("Novo usuário adicionado com sucesso ao banco de dados, ID: ", results.insertId);
                res.status(201).json({message: "Usuário criado com sucesso", id: results.insertId});
            }
        );
    } catch (error) {
        console.log("Erro geral no try: ", error);
        res.status(500).json({erro: error.message});
    }
};