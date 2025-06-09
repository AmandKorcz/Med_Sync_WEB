const connection = require("../database.js");
const { validationResult } = require('express-validator');

//GET - Listando as consultas de um medico 
exports.listarConsultasPorMedico = (req, res) => {
    const {id_medico} = req.params;

    connection.query(
        "SELECT * FROM consulta WHERE id_medico = ?",
        [id_medico], (err, results) => {
            if (err) return res.status(500).json({erro: err});
            res.status(200).json(results);
        }
    );
};

//POST - Criar nova consulta 
exports.criarConsulta = (req, res) => {
    console.log("Corpo da requisição:", req.body);

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log("Erros de validação:", errors.array());
        return res.status(400).json({erros: errors.array()});
    }

    const { id_medico, nome_paciente, data_consulta, 
        hora_consulta, observacoes} = req.body;

    if(!id_medico || !nome_paciente || !data_consulta || !hora_consulta) {
        return res.status(400).json({message: "ID Médico, nome do paciente, data e hora da consulta são campos obrigatórios"});
    }

    console.log("Dados recebidos: ", {id_medico, nome_paciente, data_consulta, hora_consulta, observacoes});

    connection.query(
        "INSERT INTO consulta (id_medico, nome_paciente, data_consulta, hora_consulta, observacoes) VALUES (?, ?, ?, ?, ?)",
        [id_medico, nome_paciente, data_consulta, hora_consulta, observacoes],
        (err, results) => {
            if (err){
                console.log("Erro ao criar uma nova consulta: ", err);
                return res.status(500).json({erro: err.message});
            }
            console.log("Consulta criada com sucesso, ID: ", results.insertId);
            res.status(201).json({
                message: "Consulta criada com sucesso",
                id: results.insertId,
            });
        }
    );
};

//PUT - Atualizar consultas
exports.atualizarConsulta = (req, res) => {
    const {id_consulta} = req.params;
    const {nome_paciente, data_consulta, hora_consulta, observacoes} = req.body;

    console.log("Dados recebidos: ", {id_consulta, nome_paciente, data_consulta, hora_consulta, observacoes});

    connection.query(
        "UPDATE consulta SET nome_paciente = ?, data_consulta = ?, hora_consulta = ?, observacoes = ? WHERE id_consulta = ?",
        [nome_paciente, data_consulta, hora_consulta, observacoes, id_consulta],
        (err, results) => {
            if (err) return res.status(500).json({erro: err});
            if (results.affectedRows === 0) return res.status(404).json({message: "Consulta não encontrada!"});
            res.status(200).json({message: "Consulta atualizada com sucesso!"});
        }
    );
};

//DELETE - Deletar consulta 
exports.deletarConsulta = (req, res) => {
    const {id_consulta} = req.params;

    connection.query(
        "DELETE FROM consulta WHERE id_consulta = ?", [id_consulta],
        (err, results) => {
            if (err) return res.status(500).json({erro: err});
            if (results.affectedRows === 0) return res.status(404).json({message: "Consulta não encontrada!"});
            res.status(200).json({message: "Consulta excluída com sucesso"});
        }
    );
};