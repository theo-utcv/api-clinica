const express = require('express');
const RolController = require('../controllers/rolController');
const { validateRol } = require('../middlewares/validationRoles');
const { authenticate } = require('../middlewares/auth');

const rolRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: API para gestionar roles
 */

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Obtener todos los roles
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: Lista de roles
 *       500:
 *         description: Error en el servidor
 */
rolRouter.get('/roles', RolController.getAllRol);

/**
 * @swagger
 * /roles/{id}:
 *   get:
 *     summary: Obtener un rol por ID
 *     tags: [Roles]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del rol
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Rol encontrado
 *       404:
 *         description: Rol no encontrado
 *       500:
 *         description: Error en el servidor
 */
rolRouter.get('/roles/:id', RolController.getRolByIdOrSearch);

/**
 * @swagger
 * /roles/search:
 *   get:
 *     summary: Buscar roles
 *     tags: [Roles]
 *     parameters:
 *       - name: q
 *         in: query
 *         required: true
 *         description: Término de búsqueda
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de roles que coinciden con la búsqueda
 *       500:
 *         description: Error en el servidor
 */
rolRouter.get('/roles/search', RolController.getRolByIdOrSearch);

/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Crear un nuevo rol
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tipo:
 *                 type: string
 *     responses:
 *       201:
 *         description: Rol creado
 *       500:
 *         description: Error en el servidor
 */
rolRouter.post('/roles', validateRol, RolController.createRol);

/**
 * @swagger
 * /roles/{id}:
 *   put:
 *     summary: Actualizar un rol
 *     tags: [Roles]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del rol
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tipo:
 *                 type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Rol actualizado
 *       404:
 *         description: Rol no encontrado
 *       500:
 *         description: Error en el servidor
 */
rolRouter.put('/roles/:id', authenticate, validateRol, RolController.updateRol);

/**
 * @swagger
 * /roles/{id}:
 *   delete:
 *     summary: Eliminar un rol
 *     tags: [Roles]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del rol
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
rolRouter.delete('/roles/:id', RolController.deleteRol);

module.exports = rolRouter;