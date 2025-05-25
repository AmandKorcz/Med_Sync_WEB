const express = require('express');
const router = express.Router();
const medicoController = require('../controllers/medicoController');
const autenticarToken = require('../middlewares/auth');
const {body, validationResult} = require('express-validation');

//Rotas autenticadas
router.post('/', autenticarToken, medicoController.criarMedico);
router.get('/', autenticarToken, medicoController.listarMedicoAPI);
router.put('/:id', autenticarToken, medicoController.atualizarMedico);
router.delete('/:id', autenticarToken, medicoController.deletarMedico);

module.exports = router;