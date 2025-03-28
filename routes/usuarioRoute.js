const express = require('express');
const UsuarioController = require('../controllers/usuarioController');
const { validateUsuario } = require('../middlewares/validationUsuarios');
const { authenticate } = require('../middlewares/auth');

const usuarioRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: API para gestionar usuarios
 */

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *       500:
 *         description: Error en el servidor
 */
usuarioRouter.get('/usuarios', UsuarioController.getAllUsuario);

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error en el servidor
 */
usuarioRouter.get('/usuarios/:id', UsuarioController.getUsuarioByIdOrSearch);

/**
 * @swagger
 * /roles/search:
 *   get:
 *     summary: Buscar usuarios
 *     tags: [Usuarios]
 *     parameters:
 *       - name: q
 *         in: query
 *         required: true
 *         description: Término de búsqueda
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de usuarios que coinciden con la búsqueda
 *       500:
 *         description: Error en el servidor
 */

usuarioRouter.get('/usuarios/search', UsuarioController.getUsuarioByIdOrSearch);

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idRoles:
 *                 type: integer
 *               nombreUsuario:
 *                 type: string
 *               correo:
 *                 type: string
 *               contrasenia:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado
 *       500:
 *         description: Error en el servidor
 */
usuarioRouter.post('/usuarios', validateUsuario, UsuarioController.createUsuarios);

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     sumary: Actualizar un rol
 *     tags: [Usuarios]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *            type: object
 *            properties:
 *               idRoles:
 *                 type: integer
 *               nombreUsuario:
 *                 type: string
 *               correo:
 *                 type: string
 *               contrasenia:
 *                 type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       201:
 *         description: Usuario actualizado
 *       500:
 *         description: Error en el servidor
 */

usuarioRouter.put('/usuarios/:id', authenticate, validateUsuario ,UsuarioController.updateUsuario);

/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Eliminar un usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: integer
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Rol eliminado
 *       404:
 *         description: Rol no encontrado
 *       500:
 *         description: Error en el servidor
 */
usuarioRouter.delete('/usuarios/:id', authenticate, UsuarioController.deleteUsuario);

module.exports = usuarioRouter;