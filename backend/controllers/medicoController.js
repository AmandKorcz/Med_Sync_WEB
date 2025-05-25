const connection = require("../database.js");
const bcrypt = require("bcrypt");
const { validationResult } = require('express-validator');

// GET - Listar todos os médicos
exports.listarMedico = (req, res) => {
    connection.query("SELECT * FROM medico", (err, results) => {
        if (err) return res.status(500).json({ erro: err });
        res.status(200).json(results);
    });
};

// POST - Criar novo médico
exports.criarMedico = async (req, res) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()){
        return res.status(400).json({erros : erros.array()});
    }

    const { nome, crm, especializacao } = req.body;
    if (!nome || !crm || !especializacao) {
        return res.status(400).json({ message: "Nome, CRM e especialização são obrigatórios" });
    }
    console.log('Dados recebidos: ', {nome, email, senha});
    
    connection.query(
        "INSERT INTO medico (nome, crm, especializacao) VALUES (?, ?, ?)",
        [nome, crm, especializacao],
        (err, results) => {
            if (err) {
                console.log("Erro ao criar novo médico, ", err);
                return res.status(500).json({erro: err.message});
            }
            console.log("Médico criado com sucesso!, ID: ", results.insertId);
            res.status(201).json({
                message: "Médico criado com sucesso",
                id: results.insertId,
            });
        }
    );
}

// PUT - Atualizar médico
exports.atualizarMedico = (req, res) => {
    const { id_medico } = req.params;
    const { nome, crm, especializacao } = req.body;

    console.log("Dados recebidos: ", {id_medico, nome, email});

    connection.query( "UPDATE medico SET nome = ?, crm = ?, especializacao = ? WHERE id_medico = ?", [nome, crm, especializacao, id_medico], (err, results) => {
        if (err) return res.status(500).json({ erro: err });
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Médico não encontrado' });
        res.status(200).json({ message: 'Médico atualizado com sucesso!' });
    });
};

// DELETE - Deletar médico
exports.deletarMedico = (req, res) => {
    const { id_medico } = req.params;

    connection.query("DELETE FROM medico WHERE id_medico = ?", [id_medico], (err, results) => {
        if (err) return res.status(500).json({ erro: err });
        if (results.affectedRows === 0) return res.status(404).json({ message: "Médico não encontrado" });
        res.status(200).json({ message: "Cadastro do médico excluído com sucesso" });
    });
};