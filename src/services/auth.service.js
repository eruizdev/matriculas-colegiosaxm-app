const usuarioRepository = require('../repositories/usuario.repository');
const UsuarioDto = require('../dtos/usuario.dto');
const PasswordUtil = require('../utils/password.util');
const AppError = require('../errors/app-error');
const UnauthorizedError = require('../errors/unauthorized-error');
const Roles = require('../constants/roles');

class AuthService {
  async registrar(data) {
    const existe = usuarioRepository.findByCorreo(data.correo);
    if (existe) throw new AppError('Ya existe una cuenta con ese correo', 400);

    const password = await PasswordUtil.encriptar(data.password);
    const usuario = usuarioRepository.create({
      nombre: data.nombre,
      apellido: data.apellido,
      tipoDocumento: data.tipoDocumento,
      numeroDocumento: data.numeroDocumento,
      correo: data.correo,
      telefono: data.telefono,
      password,
      rol: Roles.PADRE
    });

    return UsuarioDto.desde(usuario);
  }

  async login(correo, password) {
    const usuario = usuarioRepository.findByCorreo(correo);
    if (!usuario) throw new UnauthorizedError();

    const valido = await PasswordUtil.comparar(password, usuario.password);
    if (!valido) throw new UnauthorizedError();

    if (!usuario.activo) throw new AppError('Tu cuenta está desactivada', 403);

    return UsuarioDto.desde(usuario);
  }
}

module.exports = new AuthService();
