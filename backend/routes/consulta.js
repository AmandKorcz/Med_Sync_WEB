const express = require("express");
const router = express.Router();
const consultaController = require("../controllers/consultaController.js");
const autenticarToken = require("../middlewares/auth.js");
const {body} = require("express-validator");

//Rotas autenticadas
router.post('/', autenticarToken, [
    body('id_medico').notEmpty().withMessage('ID do médico é obrigatório'),
    body('nome_paciente').notEmpty().withMessage('O nome do paciente é obrigatório'),
    body('data_consulta').notEmpty().withMessage('A data da consulta é obrigatória'),
    body('hora_consulta').notEmpty().withMessage('A hora da consulta é obrigatória'),
], consultaController.criarConsulta);

router.get('/medico/:id_medico', autenticarToken, consultaController.listarConsultasPorMedico);
router.put('/:id_consulta', autenticarToken, consultaController.atualizarConsulta);
router.delete('/:id_consulta', autenticarToken, consultaController.deletarConsulta);

module.exports = router;