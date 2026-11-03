const usuarioRepository = require('../repositories/usuario.repository');
const UsuarioDto = require('../dtos/usuario.dto');
const RolUtil = require('../utils/rol.util');
const { BadRequestError, ConflictError, NotFoundError } = require('../errors');
const Roles = require('../constants/roles');

class UsuarioService {
  listar(filtros = {}) {
    const usuarios = filtros.rol ? usuarioRepository.findByRol(filtros.rol) : usuarioRepository.findAll();
    return usuarios.map(u => UsuarioDto.desde(u));
  }

  listarPadres() {
    return this.listar({ rol: Roles.PADRE });
  }

  contarPorRol(rol) {
    return usuarioRepository.findByRol(rol).length;
  }

  contarPadres() {
    return this.contarPorRol(Roles.PADRE);
  }

  contarAdminsActivos() {
    return usuarioRepository.findByRol(Roles.ADMIN).filter(u => u.activo).length;
  }

  buscar(id) {
    const usuario = usuarioRepository.findById(id);
    if (!usuario) throw new NotFoundError('Usuario no encontrado');
    return usuario;
  }

  obtener(id) {
    return UsuarioDto.desde(this.buscar(id));
  }

  actualizarPerfil(id, data) {
    this.buscar(id);
    const telefono = data.telefono.trim();

    if (usuarioRepository.existeTelefono(telefono, id)) {
      throw new ConflictError('Ese número de teléfono ya está registrado');
    }

    const usuario = usuarioRepository.update(id, {
      nombre: data.nombre.trim(),
      telefono
    });
    return UsuarioDto.desde(usuario);
  }

  esUltimoAdmin(usuario) {
    return usuario.esAdmin() && usuario.activo && this.contarAdminsActivos() === 1;
  }

  cambiarEstado(id, idActual) {
    const usuario = this.buscar(id);

    if (usuario.id === Number(idActual)) {
      throw new BadRequestError('No puedes desactivar tu propia cuenta');
    }
    if (this.esUltimoAdmin(usuario)) {
      throw new ConflictError('No se puede desactivar el único administrador activo');
    }

    usuarioRepository.update(id, { activo: !usuario.activo });
  }

  cambiarRol(id, rol, idActual) {
    const usuario = this.buscar(id);

    if (!RolUtil.esValido(rol)) throw new BadRequestError('El rol no es válido');
    if (usuario.id === Number(idActual)) throw new BadRequestError('No puedes cambiar tu propio rol');
    if (usuario.rol === rol) return UsuarioDto.desde(usuario);
    if (this.esUltimoAdmin(usuario)) {
      throw new ConflictError('No se puede quitar el rol al único administrador activo');
    }

    return UsuarioDto.desde(usuarioRepository.update(id, { rol }));
  }
}

module.exports = new UsuarioService();
