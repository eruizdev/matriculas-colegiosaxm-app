const usuarioRepository = require('../repositories/usuario.repository');
const UsuarioDto = require('../dtos/usuario.dto');
const AppError = require('../errors/app-error');
const NotFoundError = require('../errors/not-found-error');
const Roles = require('../constants/roles');

class UsuarioService {
  listar() {
    return usuarioRepository.findAll().map(u => UsuarioDto.desde(u));
  }

  listarPadres() {
    return usuarioRepository.findByRol(Roles.PADRE).map(u => UsuarioDto.desde(u));
  }

  contarPadres() {
    return usuarioRepository.findByRol(Roles.PADRE).length;
  }

  obtener(id) {
    const usuario = usuarioRepository.findById(id);
    if (!usuario) throw new NotFoundError('Usuario no encontrado');
    return UsuarioDto.desde(usuario);
  }

  actualizarPerfil(id, data) {
    this.obtener(id);
    const telefono = data.telefono.trim();

    if (usuarioRepository.existeTelefono(telefono, id)) {
      throw new AppError('Ese número de teléfono ya está registrado', 400);
    }

    const usuario = usuarioRepository.update(id, {
      nombre: data.nombre.trim(),
      telefono
    });
    return UsuarioDto.desde(usuario);
  }

  cambiarEstado(id) {
    const usuario = usuarioRepository.findById(id);
    if (!usuario) throw new NotFoundError('Usuario no encontrado');
    usuarioRepository.update(id, { activo: !usuario.activo });
  }
}

module.exports = new UsuarioService();
