const usuarioRepository = require('../repositories/usuario.repository');
const PasswordUtil = require('../utils/password.util');
const Roles = require('../constants/roles');
const Env = require('../config/env');

class AdminSeeder {
  static async ejecutar() {
    const existe = usuarioRepository.findByCorreo(Env.ADMIN_CORREO);
    if (existe) return;

    const password = await PasswordUtil.encriptar(Env.ADMIN_PASSWORD);
    usuarioRepository.create({
      nombre: 'Administrador',
      apellido: 'General',
      correo: Env.ADMIN_CORREO,
      password,
      rol: Roles.ADMIN
    });

    console.log(`Administrador creado: ${Env.ADMIN_CORREO}`);
  }
}

module.exports = AdminSeeder;
