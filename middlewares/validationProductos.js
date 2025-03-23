const { body, validationResult } = require('express-validator');

const validateProducto = [
    body('idTipoProducto').notEmpty().withMessage('El tipo de producto es requerido'),
    body('nombre').notEmpty().withMessage('El nombre es requerido'),
    body('precio').isNumeric().withMessage('El precio debe ser un número'),
    body('stock').isInt({ gt: 0 }).withMessage('El stock debe ser un número entero mayor que 0'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validateProducto };