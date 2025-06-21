const express = require("express");
const router = express.Router();
const consultaController = require("../controllers/consultaController.js");
const autenticarToken = require("../middlewares/auth.js");
const {body} = require("express-validator");

//Rotas autenticadas
router.post('/criarConsulta', autenticarToken, consultaController.criarConsulta);
router.get('/getConsultas/:id_medico', autenticarToken, consultaController.listarConsultasPorMedico);
router.put('/editConsulta/:id_consulta', autenticarToken, consultaController.atualizarConsulta);
router.delete('/deleteConsulta/:id_consulta', autenticarToken, consultaController.deletarConsulta);

module.exports = router;