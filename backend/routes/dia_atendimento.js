const express = require("express");
const router = express.Router();
const diaController = require("../controllers/diaController.js");
const autenticarToken = require("../middlewares/auth.js");
const {body} = require("express-validator");

//Rotas autenticadas
router.post('/criarDia', autenticarToken, diaController.criarDiaAtendimento);
router.get('/getDia/:id_medico', autenticarToken, diaController.listarDiasPorMedico);
router.put('/editDia/:id_dia', autenticarToken, diaController.atualizarDiaAtendimento);
router.delete('/deleteDia/:id_dia', autenticarToken, diaController.deletarDiaAtendimento);

module.exports = router;