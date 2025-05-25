const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

router.post('/login', loginController.loginUsuario);
router.post('/register', loginController.criarUsuario);
 
module.exports = router;