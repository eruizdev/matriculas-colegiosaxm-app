const usuarioRepository = require('../repositories/usuario.repository');
const UsuarioDto = require('../dtos/usuario.dto');
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
    const usuario = usuarioRepository.update(id, {
      nombre: data.nombre,
      apellido: data.apellido,
      telefono: data.telefono
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
