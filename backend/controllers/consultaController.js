const connection = require("../database.js");

//POST - Criar nova consulta
exports.criarConsulta = (req, res) => {
    const {id_medico, data, horario, descricao} = req.body;

    if(!medico || !data || !horario || !descricao) {
        return res.status(400).json({message: "Todos os campos são obrigatórios"});
    }

    const sql = "INSERT INTO consulta (id_medico, data, horario, descricao) VALUES (?, ?, ?, ?)";
    connection.query(sql, [id_medico, data, horario, descricao], (err, results) => {
        if (err) return res.status(500).json({erro: err});
        res.status(201).json({message: "Consulta criada com sucesso!", id: results.insertId});
    });
};

//GET - Listando consultas com os nomes dos médicos 
exports.listarConsultas = (req, res) => {
    const sql = 
        "SELECT c.*, m.nome AS nome_medico FROM consulta c JOIN medico m ON c.id_medico = m.id_medico";

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({erro: err});
        res.status(200).json(results);
    });
};

//PUT - 