const pool = require('../config/db');

class Producto {
    static async findAll() {
        const result = await pool.query('SELECT * FROM productos WHERE deleted_at IS NULL');
        return result.rows;
    }

    static async findById(id) {
        const result = await pool.query('SELECT * FROM productos WHERE idProductos = $1 AND deleted_at IS NULL', [id]);
        return result.rows[0];
    }

    static async create(data) {
        const { idTipoProducto, precio, nombre, stock, foto } = data;
        const result = await pool.query(
            'INSERT INTO productos (idTipoProducto, precio, nombre, stock, foto, created_at) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *',
            [idTipoProducto, precio, nombre, stock, foto]
        );
        return result.rows[0];
    }

    static async update(id, data) {
        const { idTipoProducto, precio, nombre, stock, foto } = data;
        const result = await pool.query(
            'UPDATE productos SET idTipoProducto = $1, precio = $2, nombre = $3, stock = $4, foto = $5, updated_at = NOW() WHERE idProductos = $6 AND deleted_at IS NULL RETURNING *',
            [idTipoProducto, precio, nombre, stock, foto, id]
        );
        return result.rows[0];
    }

    static async delete(id) {
        const result = await pool.query('UPDATE productos SET deleted_at = NOW(), updated_at = NOW() WHERE idProductos = $1 AND deleted_at IS NULL', [id]);
        return result.rowCount > 0; // Devuelve true si se eliminó
    }

    static async updateStock(id, newStock) {
        const result = await pool.query(
            'UPDATE productos SET stock = $1 WHERE idProductos = $2 RETURNING *',
            [newStock, id]
        );
        return result.rows[0];
    }
}

module.exports = Producto;