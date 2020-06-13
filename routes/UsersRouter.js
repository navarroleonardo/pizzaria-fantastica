var express = require('express');
var router = express.Router();

// importando middlewares
const VerificaUsuarioLogado = require("../middlewares/VerificaUsuarioLogado");

// importanto controller
const UsersController = require('../controllers/UsersController');

router.get('/users/create', VerificaUsuarioLogado, UsersController.create);
router.get('/users', VerificaUsuarioLogado, UsersController.list);
router.post('/users', VerificaUsuarioLogado, UsersController.store);

module.exports = router;
