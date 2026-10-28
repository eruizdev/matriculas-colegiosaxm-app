const Roles = require('../constants/roles');

class Usuario {
  constructor({ id, nombre, apellido, tipoDocumento, numeroDocumento, correo, telefono, password, rol = Roles.PADRE, activo = true, fechaRegistro = new Date() }) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.tipoDocumento = tipoDocumento;
    this.numeroDocumento = numeroDocumento;
    this.correo = correo;
    this.telefono = telefono;
    this.password = password;
    this.rol = rol;
    this.activo = activo;
    this.fechaRegistro = fechaRegistro;
  }

  nombreCompleto() {
    return `${this.nombre} ${this.apellido}`;
  }

  esAdmin() {
    return this.rol === Roles.ADMIN;
  }
}

module.exports = Usuario;
