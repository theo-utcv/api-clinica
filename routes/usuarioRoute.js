const express = require('express');
const UsuarioController = require('../controllers/usuarioController');

const usuarioRouter = express.Router();

usuarioRouter.get('/usuarios', UsuarioController.getAllUsuario);
usuarioRouter.get('/usuarios/:id', UsuarioController.getUsuarioByIdOrSearch);
usuarioRouter.get('/usuarios/search', UsuarioController.getUsuarioByIdOrSearch);

usuarioRouter.post('/usuarios', UsuarioController.createUsuarios);

usuarioRouter.put('/usuarios/:id', UsuarioController.updateUsuario);

usuarioRouter.delete('/usuarios/:id', UsuarioController.deleteUsuario);

module.exports = usuarioRouter;
