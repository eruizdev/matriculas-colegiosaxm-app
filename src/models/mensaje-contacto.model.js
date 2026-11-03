class MensajeContacto {
  constructor({ id, nombre, correo, asunto, mensaje, leido = false, fecha = new Date() }) {
    this.id = id;
    this.nombre = nombre;
    this.correo = correo;
    this.asunto = asunto;
    this.mensaje = mensaje;
    this.leido = leido;
    this.fecha = fecha;
  }

  marcarLeido() {
    this.leido = true;
  }

  esNuevo() {
    return !this.leido;
  }
}

module.exports = MensajeContacto;
