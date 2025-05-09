const connection = require("../database.js");

//GET - Endpoint para listar os médicos cadastrados
exports.listarMedico = (req, res) => {
    connection.query("SELECT * FROM medico", (err, results) => {
        if(err) return res.status(500).json({erro: err});
    });
}

//POST - Endpoint para criar novo cadastro de médico 
exports.criarMedico = (req, res) => {
    const {nome, crm, especializacao} = req.body;
    if (!nome || !crm || !especializacao) return res.status(400).json({message: "Nome, CRM e especialização são chaves obrigatórias"});

    connection.query("INSERTO INTO medico (nome, crm, especializacao) VALUES (?, ?, ?)", [nome, crm, especializacao], (err, results) =>{
        if (err) return res.status(500).json({erro: err});
        res.status(201).json({message: "Novo médico adicionado com sucesso!", id: results.insertId});
    });
};

//PUT - Endpoint para atualizar cadastros dos médicos
exports.atualizarMedico = (req, res) => {
    const {id} = req.params;
    const {nome, crm, especializacao} = req.body;

    connection.query("UPDATE medico SET nome = ?, crm = ?, especializacao = ? WHERE id = ?", [nome, crm, especializacao, id], (err, results) =>{
        if (err) return res.status(500).json({erro: err});
        if (results.affectedRows === 0) return res.status(404).json({message: 'Médico não encontrado'});
        res.status(200).json({message: 'Médico autalizado com sucesso!'});
    });
};

//DELETE - Endpoint para deletar o cadastro do médico 
exports.deletarMedico = (req, res) => {
    const {id} = req.params;
    
    connection.query("DELETE FROM medico WHERE id = ?", [id], (err, results) => {
        if (err) return res.status(500).json({erro: err});
        if (results.affectedRows === 0) return res.status(404).json({message: "Médico não encontrado"});
        res.status(200).json({message: "Cadastro do médico excluído com sucesso"});
    });
};