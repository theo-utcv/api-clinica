const express = require('express');
const ProductoController = require('../controllers/productoController');
const { authenticate } = require('../middlewares/auth');
const { validateProducto } = require('../middlewares/validationProductos'); // Asegúrate de tener este middleware

const productoRouter = express.Router();

productoRouter.get('/productos', ProductoController.getAllProductos);
productoRouter.get('/productos/:id', ProductoController.getProductoById);
productoRouter.post('/productos', authenticate, validateProducto, ProductoController.createProducto);
productoRouter.put('/productos/:id', authenticate, validateProducto, ProductoController.updateProducto);
productoRouter.delete('/productos/:id', authenticate, ProductoController.deleteProducto);

module.exports = productoRouter;