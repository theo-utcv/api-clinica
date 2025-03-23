const { body, validationResult } = require('express-validator');

const validateUsuario = [
    body('idRoles').notEmpty().withMessage('El idRoles es requerido'),
    body('nombreUsuario').notEmpty().withMessage('El nombre de usuario es requerido'),
    body('correo').notEmpty().withMessage('El correo es requerido'),
    body('contrasenia').notEmpty().withMessage('La contraseña es requerida'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

module.exports = { validateUsuario };
