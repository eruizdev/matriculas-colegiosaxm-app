const mensajeContactoRepository = require('../repositories/mensaje-contacto.repository');
const FechaUtil = require('../utils/fecha.util');
const NotFoundError = require('../errors/not-found-error');

class MensajeContactoService {
  listar() {
    return mensajeContactoRepository.findAll().map(m => ({
      ...m,
      fecha: FechaUtil.formatear(m.fecha)
    }));
  }

  contarNoLeidos() {
    return mensajeContactoRepository.findNoLeidos().length;
  }

  enviar(data) {
    return mensajeContactoRepository.create({
      nombre: data.nombre,
      correo: data.correo,
      asunto: data.asunto,
      mensaje: data.mensaje
    });
  }

  marcarLeido(id) {
    const mensaje = mensajeContactoRepository.update(id, { leido: true });
    if (!mensaje) throw new NotFoundError('Mensaje no encontrado');
  }

  eliminar(id) {
    const eliminado = mensajeContactoRepository.delete(id);
    if (!eliminado) throw new NotFoundError('Mensaje no encontrado');
  }
}

module.exports = new MensajeContactoService();
