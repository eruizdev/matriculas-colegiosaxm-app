const Roles = require('../constants/roles');

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

  registrarAcceso() {
    this.ultimoAcceso = new Date();
  }
}

module.exports = Usuario;
