require('dotenv').config();

class Env {
  static PORT = process.env.PORT || 3000;
  static SESSION_SECRET = process.env.SESSION_SECRET || 'secreto_matricula';
  static ADMIN_CORREO = process.env.ADMIN_CORREO || 'admin@colegio.com';
  static ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
  static DB_HOST = process.env.DB_HOST || 'localhost';
  static DB_PORT = process.env.DB_PORT || 3306;
  static DB_USER = process.env.DB_USER || 'root';
  static DB_PASSWORD = process.env.DB_PASSWORD || '';
  static DB_NAME = process.env.DB_NAME || 'matricula_db';
}

module.exports = Env;
