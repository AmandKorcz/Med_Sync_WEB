const connection = require('../database');
const { validationResult } = require('express-validator');

//GET - Listando os dias registrados por medico 
exports.listarDiasPorMedico = (req, res) => {
    const {id_medico} = req.params;

    connection.query(
        "SELECT * FROM dia_atendimento WHERE id_medico = ?",
        [id_medico], (err, results) => {
            if (err) return res.status(500).json({erro: err});
            res.status(200).json(results);
        }
    );
};

//POST - Criar novo dia de atendimento 
exports.criarDiaAtendimento = (req, res) => {
    console.log("Corpo da requisição:", req.body);

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log("Erros de validação:", errors.array());
        return res.status(400).json({erros: errors.array()});
    }

    const { id_medico, dia_semana, data_atendimento} = req.body;

    if(!id_medico || !dia_semana || !data_atendimento) {
        return res.status(400).json({message: "Campos obrigatórios não preenchidos!"});
    }

    console.log("Dados recebidos: ", {id_medico, dia_semana, data_atendimento});

    connection.query(
        "INSERT INTO dia_atendimento (id_medico, dia_semana, data_atendimento) VALUES (?, ?, ?)",
        [id_medico, dia_semana, data_atendimento],
        (err, results) => {
            if (err){
                console.log("Erro ao criar uma nova consulta: ", err);
                return res.status(500).json({erro: err.message});
            }
            console.log("Consulta criada com sucesso, ID: ", results.insertId);
            res.status(201).json({
                message: "Consulta criada com sucesso",
                id_dia: results.insertId,
                id_medico,
                dia: dia_semana,
                data: data_atendimento,
                hora_consulta: []
            });
        }
    );
};

//PUT - Atualizar dia de atendimento
exports.atualizarDiaAtendimento = (req, res) => {
    const {id_dia} = req.params;
    const {dia_semana, data_atendimento} = req.body;

    if (!dia_semana || !data_atendimento) {
        return res.status(400).json({ message: "Campos obrigatórios não preenchidos!" });
    }

    console.log("Dados recebidos: ", {id_dia, dia_semana, data_atendimento });

    connection.query(
        "UPDATE dia_atendimento SET dia_semana = ?, data_atendimento = ? WHERE id_dia = ?",
        [dia_semana, data_atendimento, id_dia],
        (err, results) => {
            if (err) return res.status(500).json({erro: err});
            if (results.affectedRows === 0) return res.status(404).json({message: "Consulta não encontrada!"});
            res.status(200).json({message: "Consulta atualizada com sucesso!"});
        }
    );
};

//DELETE - Deletar consulta 
exports.deletarDiaAtendimento = (req, res) => {
    const {id_dia} = req.params;

    connection.query(
        "DELETE FROM dia_atendimento WHERE id_dia = ?", [id_dia],
        (err, results) => {
            if (err) return res.status(500).json({erro: err});
            if (results.affectedRows === 0) return res.status(404).json({message: "Consulta não encontrada!"});
            res.status(200).json({message: "Consulta excluída com sucesso"});
        }
    );
};