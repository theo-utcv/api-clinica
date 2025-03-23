const express = require('express');
const UsuarioController = require('../controllers/usuarioController');
const { validateUsuario } = require('../middlewares/validationUsuarios');
const { authenticate } = require('../middlewares/auth');

const usuarioRouter = express.Router();

usuarioRouter.get('/usuarios', UsuarioController.getAllUsuario);
usuarioRouter.get('/usuarios/:id', UsuarioController.getUsuarioByIdOrSearch);
usuarioRouter.get('/usuarios/search', UsuarioController.getUsuarioByIdOrSearch);

usuarioRouter.post('/usuarios', validateUsuario, UsuarioController.createUsuarios);

usuarioRouter.put('/usuarios/:id', authenticate, validateUsuario ,UsuarioController.updateUsuario);

usuarioRouter.delete('/usuarios/:id', authenticate, UsuarioController.deleteUsuario);

module.exports = usuarioRouter;
