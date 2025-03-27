const express = require('express');
const VentaController = require('../controllers/ventaController');
const { authenticate } = require('../middlewares/auth');

const ventaRouter = express.Router();

ventaRouter.post('/ventas', authenticate, VentaController.createVenta);
ventaRouter.get('/ventas', authenticate, VentaController.getAllVentas);
ventaRouter.get('/ventas/:id', authenticate, VentaController.getVentaById);
ventaRouter.put('/ventas/:id', authenticate, VentaController.updateVenta);
ventaRouter.delete('/ventas/:id', authenticate, VentaController.deleteVenta);

module.exports = ventaRouter;