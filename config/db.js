const { Pool } = require('pg'); // Importa la clase Pool de la biblioteca pg
require('dotenv').config(); // Carga las variables de entorno desde el archivo .env

const pool = new Pool({ // Crea una instancia de la clase Pool con las credenciales de la base de datos
  host: process.env.DB_HOST, // Dirección del host de la base de datos
  user: process.env.DB_USER, // Usuario de la base de datos
  password: process.env.DB_PASSWORD, // Contraseña de la base de datos
  database: process.env.DB_NAME // Nombre de la base de datos
});

module.exports = pool; // Exporta la instancia de la clase Pool como módulo
