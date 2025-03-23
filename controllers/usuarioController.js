const Usuario = require('../models/usuarioModel');

class UsuarioController {

  static async getAllUsuario(req, res) {
    try {
      const usuarios = await Usuario.findAll();
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getUsuarioByIdOrSearch(req, res) {
    if (req.query.q) {
      try {
        const query = req.query.q;
        const usuarios = await Usuario.search(query);
        res.json(usuarios);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    } else {
      try {
        const usuario = await Usuario.findById(req.params.id);
        if (!usuario) {
          return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(usuario);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  }

  static async getUsuarioById(req, res){
    try {
      const usuario = await Usuario.findById(req.params.id);
      if (!usuario) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.json(usuario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async searchUsuarios(req, res) {
    try {
      const query = req.query.q;
      const usuarios = await Usuario.search(query);
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async createUsuarios(req, res) {
    try {
      const usuario = await Usuario.create(req.body);
      res.status(201).json(usuario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateUsuario(req, res) {
    try {
      const usuario = await Usuario.update(req.params.id, req.body);
      if (!usuario) {
        return res.status(404).json({ message: 'Usuario not found' });
      }
      res.json(usuario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteUsuario(req, res) { // Método para realizar un borrado lógico
    try {
      const usuario = await Usuario.delete(req.params.id); // Llama al método softDelete del modelo de usuarios
      if (!usuario) {
        return res.status(404).json({ message: 'Usuario not found' }); // Devuelve un mensaje de error 404 si no se encuentra el usuario
      }
      res.json({ message: 'Usuario deleted successfully' }); // Devuelve un mensaje de confirmación
    } catch (error) {
      res.status(500).json({ error: error.message }); // Maneja errores y devuelve un mensaje de error 500
    }
  }

}

module.exports = UsuarioController;