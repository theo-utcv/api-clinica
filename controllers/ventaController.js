const Venta = require('../models/ventaModel');
const DetalleVenta = require('../models/detalleVentaModel'); // Asegúrate de tener este modelo
const Producto = require('../models/productoModel'); // Asegúrate de tener este modelo

class VentaController {
    static async createVenta(req, res) {
        const { idCliente, idProducto, cantidad } = req.body;

        try {
            // Verificar disponibilidad de stock
            const producto = await Producto.findById(idProducto);
            if (!producto || producto.stock < cantidad) {
                return res.status(400).json({ message: 'Stock insuficiente' });
            }

            // Calcular total
            const total = producto.precio * cantidad;

            // Crear la venta
            const nuevaVenta = await Venta.create({ idCliente, total });

            // Crear el detalle de la venta
            await DetalleVenta.create({
                idventas: nuevaVenta.id,
                idproductos: idProducto,
                cantidad,
                precio: producto.precio,
                subtotal: total,
            });

            // Actualizar el stock
            await Producto.updateStock(idProducto, producto.stock - cantidad);

            res.status(201).json(nuevaVenta);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getAllVentas(req, res) {
        try {
            const ventas = await Venta.findAll();
            res.json(ventas);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getVentaById(req, res) {
        try {
            const venta = await Venta.findById(req.params.id);
            if (!venta) {
                return res.status(404).json({ message: 'Venta no encontrada' });
            }
            res.json(venta);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updateVenta(req, res) {
        try {
            const venta = await Venta.update(req.params.id, req.body);
            if (!venta) {
                return res.status(404).json({ message: 'Venta no encontrada' });
            }
            res.json(venta);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async deleteVenta(req, res) {
        try {
            const deleted = await Venta.delete(req.params.id);
            if (!deleted) {
                return res.status(404).json({ message: 'Venta no encontrada' });
            }
            res.json({ message: 'Venta eliminada satisfactoriamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = VentaController;