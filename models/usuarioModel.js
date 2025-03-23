const pool = require('../config/db');

class Usuario {

  static async findAll() {
    const result = await pool.query('SELECT * FROM usuarios where deleted_at is null');
    return result.rows;
  }

  static async findById(id) {

    const result = await pool.query('SELECT * FROM usuarios WHERE idUsuarios = $1 AND deleted_at is null', [id]);
    return result.rows[0];

  }

  static async search(query) {
    const result = await pool.query(
      'SELECT * FROM usuarios WHERE nombreUsuario ILIKE $1 OR correo ILIKE $1 AND deleted_at IS NULL',
      [`%${query}%`]
    );
    return result.rows;
  }

  static async create(data) {
    const { idRoles, nombreUsuario, correo, contrasenia } = data;
    const result = await pool.query(
        'INSERT INTO usuarios (idRoles, nombreUsuario, correo, contrasenia, created_at) VALUES ($1, $2, $3, PGP_SYM_ENCRYPT($4, $5), NOW()) RETURNING *',
        [idRoles, nombreUsuario, correo, contrasenia, 'AES_KEY']
    );
    return result.rows[0];
  }

  static async update(id, data){

    const { idRoles, nombreUsuario, correo, contrasenia } = data;

    const result = await pool.query(
      'UPDATE usuarios SET idRoles = $1, nombreUsuario = $2, correo = $3, contrasenia = PGP_SYM_ENCRYPT($4, $5), updated_at = NOW() WHERE idUsuarios = $6 AND deleted_at is null RETURNING *',
      [idRoles, nombreUsuario, correo, contrasenia, 'AES_KEY', id]
    );

    return result.rows[0];

  }

  static async delete(id){

    const result = await pool.query('UPDATE usuarios SET deleted_at = NOW(), updated_at = NOW() where idUsuarios = $1 AND deleted_at IS NULL',
        [id]
    );
    return { message: 'Usuario eliminado satisfactoriamente' };

  }

}

module.exports = Usuario;