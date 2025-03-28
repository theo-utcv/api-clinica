const Producto = require('../models/productoModel');

class ProductoController {
    static async getAllProductos(req, res) {
        try {
            const productos = await Producto.findAll();
            res.json(productos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getProductoById(req, res) {
        try {
            const producto = await Producto.findById(req.params.id);
            if (!producto) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }
            res.json(producto);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async createProducto(req, res) {
        try {
            const { idTipoProducto, precio, nombre, stock } = req.body;
            const foto = req.file ? req.file.path : null; // Obtener la URL de la imagen de Cloudinary
            const producto = await Producto.create({ idTipoProducto, precio, nombre, stock, foto });
            res.status(201).json(producto);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updateProducto(req, res) {
        try {
            const { idTipoProducto, precio, nombre, stock } = req.body;
            const foto = req.file ? req.file.path : null; // Obtener la URL de la imagen de Cloudinary
            const producto = await Producto.update(req.params.id, { idTipoProducto, precio, nombre, stock, foto });
            if (!producto) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }
            res.json(producto);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async deleteProducto(req, res) {
        try {
            const deleted = await Producto.delete(req.params.id);
            if (!deleted) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }
            res.json({ message: 'Producto eliminado satisfactoriamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = ProductoController;