const pool = require('../config/db');

class Rol {

  static async findAll() {
    const result = await pool.query('SELECT * FROM ROLES where deleted_at is null');
    return result.rows;
  }

  static async findById(id) {

    const result = await pool.query('SELECT * FROM roles WHERE idRoles = $1 AND deleted_at is null', [id]);
    return result.rows[0];

  }

  static async search(query) {
    const result = await pool.query(
      'SELECT * FROM roles WHERE tipo ILIKE $1 AND deleted_at IS NULL',
      [`%${query}%`]
    );
    return result.rows;
  }

  static async create(data) {
    const { tipo } = data;
    const result = await pool.query(
      'INSERT INTO roles (tipo, created_at) VALUES ($1, NOW()) RETURNING *',
      [tipo]
    );
    return result.rows[0];
  }

  static async update(id, data){

    const { tipo } = data;

    const result = await pool.query(
      'UPDATE roles SET tipo = $1, updated_at = NOW() WHERE idRoles = $2 AND deleted_at is null RETURNING *',
      [tipo, id]
    );

    return result.rows[0];

  }

  static async delete(id){

    const result = await pool.query('UPDATE roles SET deleted_at = NOW(), updated_at = NOW() where idRoles = $1 AND deleted_at IS NULL',
        [id]
    );
    return { message: 'Rol eliminado satisfactoriamente' };

  }

}

module.exports = Rol;