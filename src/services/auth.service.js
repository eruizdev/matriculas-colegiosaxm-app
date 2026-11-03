const usuarioRepository = require('../repositories/usuario.repository');
const UsuarioDto = require('../dtos/usuario.dto');
const PasswordUtil = require('../utils/password.util');
const RolUtil = require('../utils/rol.util');
const { BadRequestError, ConflictError, ForbiddenError, NotFoundError, UnauthorizedError } = require('../errors');
const Roles = require('../constants/roles');

class AuthService {
  async crearUsuario(data, rol) {
    if (!RolUtil.esValido(rol)) throw new BadRequestError('El rol no es válido');

    const telefono = data.telefono.trim();

    if (usuarioRepository.existeCorreo(data.correo)) {
      throw new ConflictError('Ya existe una cuenta con ese correo');
    }
    if (usuarioRepository.existeTelefono(telefono)) {
      throw new ConflictError('Ya existe una cuenta con ese número de teléfono');
    }

    const password = await PasswordUtil.encriptar(data.password);
    return usuarioRepository.create({
      nombre: data.nombre.trim(),
      telefono,
      correo: data.correo,
      password,
      rol
    });
  }

  async registrar(data) {
    const usuario = await this.crearUsuario(data, Roles.PADRE);
    usuario.registrarAcceso();
    return UsuarioDto.desde(usuario);
  }

  async crearAdmin(data) {
    const usuario = await this.crearUsuario(data, Roles.ADMIN);
    return UsuarioDto.desde(usuario);
  }

  async login(correo, password) {
    const usuario = usuarioRepository.findByCorreo(correo);
    if (!usuario) throw new UnauthorizedError('Correo o contraseña incorrectos');

    const valido = await PasswordUtil.comparar(password, usuario.password);
    if (!valido) throw new UnauthorizedError('Correo o contraseña incorrectos');

    if (!usuario.activo) throw new ForbiddenError('Tu cuenta está desactivada, comunícate con el colegio');

    usuario.registrarAcceso();
    return UsuarioDto.desde(usuario);
  }

  async cambiarPassword(id, passwordActual, passwordNueva) {
    const usuario = usuarioRepository.findById(id);
    if (!usuario) throw new NotFoundError('Usuario no encontrado');

    const valido = await PasswordUtil.comparar(passwordActual, usuario.password);
    if (!valido) throw new BadRequestError('La contraseña actual no es correcta');

    usuario.cambiarPassword(await PasswordUtil.encriptar(passwordNueva));
  }
}

module.exports = new AuthService();
