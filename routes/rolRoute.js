const express = require('express');
const RolController = require('../controllers/rolController');
const { validateRol } = require('../middlewares/validationRoles');
const { authenticate } = require('../middlewares/auth');

const rolRouter = express.Router();

rolRouter.get('/roles', RolController.getAllRol);

rolRouter.get('/roles/:id', RolController.getRolByIdOrSearch);
rolRouter.get('/roles/search', RolController.getRolByIdOrSearch);

rolRouter.post('/roles', validateRol, RolController.createRol);

rolRouter.put('/roles/:id', authenticate, validateRol, RolController.updateRol);

rolRouter.delete('/roles/:id', RolController.deleteRol);

module.exports = rolRouter;