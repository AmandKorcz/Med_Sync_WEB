const express = require('express');
const router = express.Router();
const medicoController = require('../controllers/medicoController');
const autenticarToken = require('../middlewares/auth');
const {body, validationResult} = require('express-validator');

//Rotas autenticadas
router.post('/criarMedico', autenticarToken, medicoController.criarMedico);
router.get('/getMedico', autenticarToken, medicoController.listarMedicoAPI);
router.put('/editMedico/:id', autenticarToken, medicoController.atualizarMedico);
router.delete('/deleteMedico/:id', autenticarToken, medicoController.deletarMedico);

module.exports = router;