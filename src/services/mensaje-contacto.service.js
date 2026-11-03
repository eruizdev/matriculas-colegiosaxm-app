const mensajeContactoRepository = require('../repositories/mensaje-contacto.repository');
const MensajeContactoDto = require('../dtos/mensaje-contacto.dto');
const NotFoundError = require('../errors/not-found-error');

class MensajeContactoService {
  listar() {
    return mensajeContactoRepository.findAll().map(m => MensajeContactoDto.desde(m));
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
    const mensaje = mensajeContactoRepository.findById(id);
    if (!mensaje) throw new NotFoundError('Mensaje no encontrado');
    mensaje.marcarLeido();
  }

  eliminar(id) {
    const eliminado = mensajeContactoRepository.delete(id);
    if (!eliminado) throw new NotFoundError('Mensaje no encontrado');
  }
}

module.exports = new MensajeContactoService();
