const FechaUtil = require('../utils/fecha.util');

class MensajeContactoDto {
  static desde(mensaje) {
    return {
      id: mensaje.id,
      nombre: mensaje.nombre,
      correo: mensaje.correo,
      asunto: mensaje.asunto,
      mensaje: mensaje.mensaje,
      leido: mensaje.leido,
      estado: mensaje.esNuevo() ? 'Nuevo' : 'Leído',
      fecha: FechaUtil.formatear(mensaje.fecha)
    };
  }
}

module.exports = MensajeContactoDto;
