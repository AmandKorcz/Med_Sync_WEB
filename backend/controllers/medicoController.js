const connection = require("../database.js");

// GET - Listar todos os médicos
exports.listarMedico = (req, res) => {
    connection.query("SELECT * FROM medico", (err, results) => {
        if (err) return res.status(500).json({ erro: err });
        res.status(200).json(results);
    });
};

// POST - Criar novo médico
exports.criarMedico = (req, res) => {
    const { nome, crm, especializacao } = req.body;
    if (!nome || !crm || !especializacao) {
        return res.status(400).json({ message: "Nome, CRM e especialização são obrigatórios" });
    }

    connection.query(
        "INSERT INTO medico (nome, crm, especializacao) VALUES (?, ?, ?)",
        [nome, crm, especializacao],
        (err, results) => {
            if (err) return res.status(500).json({ erro: err });
            res.status(201).json({ message: "Novo médico adicionado com sucesso!", id: results.insertId });
        }
    );
};

// PUT - Atualizar médico
exports.atualizarMedico = (req, res) => {
    const { id } = req.params;
    const { nome, crm, especializacao } = req.body;

    connection.query(
        "UPDATE medico SET nome = ?, crm = ?, especializacao = ? WHERE id_medico = ?",
        [nome, crm, especializacao, id],
        (err, results) => {
            if (err) return res.status(500).json({ erro: err });
            if (results.affectedRows === 0) return res.status(404).json({ message: 'Médico não encontrado' });
            res.status(200).json({ message: 'Médico atualizado com sucesso!' });
        }
    );
};

// DELETE - Deletar médico
exports.deletarMedico = (req, res) => {
    const { id } = req.params;

    connection.query("DELETE FROM medico WHERE id_medico = ?", [id], (err, results) => {
        if (err) return res.status(500).json({ erro: err });
        if (results.affectedRows === 0) return res.status(404).json({ message: "Médico não encontrado" });
        res.status(200).json({ message: "Cadastro do médico excluído com sucesso" });
    });
};