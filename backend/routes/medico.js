const express = require('express');
const router = express.Router();
const medicoController = require("../controllers/medicoController.js");

router.get('/', medicoController.listarMedico);
router.post('/', medicoController.criarMedico);
router.put('/:id', medicoController.atualizarMedico);
router.delete('/:id', medicoController.deletarMedico);

module.exports = router;
