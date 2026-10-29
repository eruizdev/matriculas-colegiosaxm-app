const usuarioRepository = require('../repositories/usuario.repository');
const UsuarioDto = require('../dtos/usuario.dto');
const PasswordUtil = require('../utils/password.util');
const AppError = require('../errors/app-error');
const NotFoundError = require('../errors/not-found-error');
const UnauthorizedError = require('../errors/unauthorized-error');
const Roles = require('../constants/roles');

class AuthService {
  async registrar(data) {
    const telefono = data.telefono.trim();

    if (usuarioRepository.existeCorreo(data.correo)) {
      throw new AppError('Ya existe una cuenta con ese correo', 400);
    }
    if (usuarioRepository.existeTelefono(telefono)) {
      throw new AppError('Ya existe una cuenta con ese número de teléfono', 400);
    }

    const password = await PasswordUtil.encriptar(data.password);
    const usuario = usuarioRepository.create({
      nombre: data.nombre.trim(),
      telefono,
      correo: data.correo,
      password,
      rol: Roles.PADRE
    });

    usuario.registrarAcceso();
    return UsuarioDto.desde(usuario);
  }

  async login(correo, password) {
    const usuario = usuarioRepository.findByCorreo(correo);
    if (!usuario) throw new UnauthorizedError();

    const valido = await PasswordUtil.comparar(password, usuario.password);
    if (!valido) throw new UnauthorizedError();

    if (!usuario.activo) throw new AppError('Tu cuenta está desactivada', 403);

    usuario.registrarAcceso();
    return UsuarioDto.desde(usuario);
  }

  async cambiarPassword(id, passwordActual, passwordNueva) {
    const usuario = usuarioRepository.findById(id);
    if (!usuario) throw new NotFoundError('Usuario no encontrado');

    const valido = await PasswordUtil.comparar(passwordActual, usuario.password);
    if (!valido) throw new AppError('La contraseña actual no es correcta', 400);

    const password = await PasswordUtil.encriptar(passwordNueva);
    usuarioRepository.update(id, { password });
  }
}

module.exports = new AuthService();
