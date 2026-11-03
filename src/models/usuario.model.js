const Roles = require('../constants/roles');
const RolUtil = require('../utils/rol.util');

class Usuario {
  constructor({ id, nombre, telefono, correo, password, rol = Roles.PADRE, activo = true, fechaRegistro = new Date(), ultimoAcceso = null }) {
    this.id = id;
    this.nombre = nombre;
    this.telefono = telefono;
    this.correo = correo;
    this.password = password;
    this.rol = rol;
    this.activo = activo;
    this.fechaRegistro = fechaRegistro;
    this.ultimoAcceso = ultimoAcceso;
  }

  esAdmin() {
    return this.rol === Roles.ADMIN;
  }

  esPadre() {
    return this.rol === Roles.PADRE;
  }

  tienePermiso(permiso) {
    return RolUtil.tienePermiso(this.rol, permiso);
  }

  registrarAcceso() {
    this.ultimoAcceso = new Date();
  }

  activar() {
    this.activo = true;
  }

  desactivar() {
    this.activo = false;
  }

  cambiarEstado() {
    this.activo = !this.activo;
  }

  cambiarRol(rol) {
    if (!RolUtil.esValido(rol)) return false;
    this.rol = rol;
    return true;
  }

  actualizarPerfil({ nombre, telefono }) {
    if (nombre) this.nombre = nombre.trim();
    if (telefono) this.telefono = telefono.trim();
  }

  cambiarPassword(hash) {
    this.password = hash;
  }
}

module.exports = Usuario;
