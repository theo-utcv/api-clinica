const pool = require('../config/db');

class DetalleVenta {
    static async create(data) {
        const { idventas, idproductos, cantidad, precio, subtotal } = data;
        const result = await pool.query(
            'INSERT INTO detalle_ventas (idventas, idproductos, cantidad, precio, subtotal) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [idventas, idproductos, cantidad, precio, subtotal]
        );
        return result.rows[0];
    }
}

module.exports = DetalleVenta;
