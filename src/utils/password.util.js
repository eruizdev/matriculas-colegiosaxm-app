const bcrypt = require('bcryptjs');

class PasswordUtil {
  static async encriptar(password) {
    return bcrypt.hash(password, 10);
  }

  static async comparar(password, hash) {
    return bcrypt.compare(password, hash);
  }
}

module.exports = PasswordUtil;
