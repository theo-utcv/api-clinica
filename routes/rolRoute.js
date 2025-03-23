const express = require('express');
const RolController = require('../controllers/rolController');

const rolRouter = express.Router();

rolRouter.get('/roles', RolController.getAllRol);

rolRouter.get('/roles/:id', RolController.getRolByIdOrSearch);
rolRouter.get('/roles/search', RolController.getRolByIdOrSearch);

rolRouter.post('/roles', RolController.createRol);

rolRouter.put('/roles/:id', RolController.updateRol);

rolRouter.delete('/roles/:id', RolController.deleteRol);

module.exports = rolRouter;