const express = require("express");
const Usuario = require("../models/usuarioModel"); // Asegúrate de que este sea el modelo correcto
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Importar jwt

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API para autenticacion
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Inicia Sesion
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correo:
 *                 type: string
 *               contrasenia:
 *                 type: string
 *     responses:
 *       201:
 *         description: Login Exitoso
 *       500:
 *         description: Error en el servidor
 */

// Login
router.post('/login', async (req, res) => {
    const { correo, contrasenia } = req.body; // Cambia 'email' a 'correo' y 'password' a 'contrasenia'

    try {
        const user = await Usuario.findByEmail(correo); // Usar el nuevo método
        if (!user) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        const isMatch = await bcrypt.compare(contrasenia, user.contrasenia);
        if (!isMatch) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        // Crear un token JWT
        const payload = { user: { id: user.idUsuarios } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({
            user: {
                id: user.idUsuarios, // Asegúrate de que este sea el campo correcto
                nombreUsuario: user.nombreUsuario,
                correo: user.correo
            },
            token // Incluir el token en la respuesta
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

// Logout (solo para frontend, el token se elimina del cliente)
router.post('/logout', (req, res) => {
    res.json({ message: 'Logout exitoso' });
});

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registro
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombreUsuario:
 *                 type: string
 *               correo:
 *                 type: string
 *               contrasenia:
 *                 type: string
 *     responses:
 *       201:
 *         description: Registro Exitoso
 *       500:
 *         description: Error en el servidor
 */

// Registro
router.post('/register', async (req, res) => {
    const { nombreUsuario, correo, contrasenia } = req.body;

    if (!nombreUsuario || !correo || !contrasenia) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
        return res.status(400).json({ message: 'El email no es válido' });
    }

    try {
        const existingUser  = await Usuario.findByEmail(correo);
        if (existingUser ) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        const newUser  = await Usuario.create({
            idRoles: 2,
            nombreUsuario,
            correo,
            contrasenia
        });

        const payload = { user: { id: newUser .idUsuarios } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({
            user: {
                id: newUser .idUsuarios,
                nombreUsuario: newUser .nombreUsuario,
                correo: newUser .correo
            },
            token
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

module.exports = router;