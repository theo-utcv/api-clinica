const express = require('express');
const ProductoController = require('../controllers/productoController');
const { authenticate } = require('../middlewares/auth');
const { validateProducto } = require('../middlewares/validationProductos');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinaryConfig');

// Configurar el almacenamiento de Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'productos', // Nombre de la carpeta en Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg'], // Formatos permitidos
  },
});

const upload = multer({ storage: storage });

const productoRouter = express.Router();

productoRouter.get('/productos', ProductoController.getAllProductos);
productoRouter.get('/productos/:id', ProductoController.getProductoById);
productoRouter.post('/productos', authenticate, upload.single('foto'), validateProducto, ProductoController.createProducto);
productoRouter.put('/productos/:id', authenticate, upload.single('foto'), validateProducto, ProductoController.updateProducto);
productoRouter.delete('/productos/:id', authenticate, ProductoController.deleteProducto);

module.exports = productoRouter;