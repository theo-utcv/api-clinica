const pool = require('../config/db');

class Venta {
    static async create(data) {
        const { idCliente, total } = data;
        const result = await pool.query(
            'INSERT INTO ventas (idCliente, total, fecha) VALUES ($1, $2, NOW()) RETURNING *',
            [idCliente, total]
        );
        return result.rows[0];
    }

    static async findById(id) {
        const result = await pool.query('SELECT * FROM ventas WHERE id = $1', [id]);
        return result.rows[0];
    }

    static async findAll() {
        const result = await pool.query('SELECT * FROM ventas');
        return result.rows;
    }

    static async update(id, data) {
        const { total } = data;
        const result = await pool.query(
            'UPDATE ventas SET total = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
            [total, id]
        );
        return result.rows[0];
    }

    static async delete(id) {
        const result = await pool.query('DELETE FROM ventas WHERE id = $1', [id]);
        return result.rowCount > 0; // Devuelve true si se eliminó
    }
}

module.exports = Venta;