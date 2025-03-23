const Rol = require('../models/rolModel');

class RolController {

  static async getAllRol(req, res) {
    try {
      const roles = await Rol.findAll();
      res.json(roles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getRolByIdOrSearch(req, res) {
    if (req.query.q) {
      try {
        const query = req.query.q;
        const roles = await Rol.search(query);
        res.json(roles);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    } else {
      try {
        const rol = await Rol.findById(req.params.id);
        if (!rol) {
          return res.status(404).json({ message: 'Rol no encontrado' });
        }
        res.json(rol);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  }

  static async getRolById(req, res){
    try {
      const rol = await Rol.findById(req.params.id);
      if (!rol) {
        return res.status(404).json({ message: 'Rol no encontrado' });
      }
      res.json(rol);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async searchRoles(req, res) {
    try {
      const query = req.query.q;
      const roles = await Rol.search(query);
      res.json(roles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async createRol(req, res) {
    try {
      const rol = await Rol.create(req.body);
      res.status(201).json(rol);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateRol(req, res) {
    try {
      const rol = await Rol.update(req.params.id, req.body);
      if (!rol) {
        return res.status(404).json({ message: 'Rol not found' });
      }
      res.json(rol);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteRol(req, res) { // Método para realizar un borrado lógico
    try {
      const rol = await Rol.delete(req.params.id); // Llama al método softDelete del modelo de usuarios
      if (!rol) {
        return res.status(404).json({ message: 'Rol not found' }); // Devuelve un mensaje de error 404 si no se encuentra el usuario
      }
      res.json({ message: 'Rol deleted successfully' }); // Devuelve un mensaje de confirmación
    } catch (error) {
      res.status(500).json({ error: error.message }); // Maneja errores y devuelve un mensaje de error 500
    }
  }

}

module.exports = RolController;