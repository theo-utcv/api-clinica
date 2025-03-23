const { body, validationResult } = require('express-validator');

const validateRol = [
    body('tipo').notEmpty().withMessage('El tipo es requerido'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

module.exports = { validateRol };
