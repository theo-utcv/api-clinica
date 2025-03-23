const pool = require('../config/db');
const bcrypt = require('bcrypt');

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

  static async findByEmail(correo) { // Método para buscar por correo
    const result = await pool.query('SELECT * FROM usuarios WHERE correo = $1 AND deleted_at IS NULL', [correo]);
    return result.rows[0]; // Devuelve el primer usuario encontrado o undefined
  }

  static async create(data) {
    const { idRoles, nombreUsuario, correo, contrasenia } = data;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(contrasenia, salt);
    
    const result = await pool.query(
      'INSERT INTO usuarios ( idRoles, nombreUsuario, correo, contrasenia, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *',
      [ idRoles, nombreUsuario, correo, hashedPassword]
    );
    return result.rows[0];
  }

  static async update(id, data){

    const { idRoles, nombreUsuario, correo, contrasenia } = data;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(contrasenia, salt);

    const result = await pool.query(
      'UPDATE usuarios SET idRoles = $1, nombreUsuario = $2, correo = $3, contrasenia = $4, updated_at = NOW() WHERE idUsuarios = $5 AND deleted_at is null RETURNING *',
      [idRoles, nombreUsuario, correo, hashedPassword, id]
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