const Env = require('./env');

class Database {
  static getConfig() {
    return {
      host: Env.DB_HOST,
      port: Env.DB_PORT,
      user: Env.DB_USER,
      password: Env.DB_PASSWORD,
      database: Env.DB_NAME
    };
  }
}

module.exports = Database;
