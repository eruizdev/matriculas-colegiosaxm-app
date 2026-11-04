const BaseRepository = require('./base.repository');
const MensajeContacto = require('../models/mensaje-contacto.model');

class MensajeContactoRepository extends BaseRepository {
  constructor() {
    super(MensajeContacto);
  }

  ordenar(mensajes) {
    return mensajes.sort((a, b) => b.fecha - a.fecha);
  }

  findNoLeidos() {
    return this.findBy(m => m.esNuevo());
  }

  contarNoLeidos() {
    return this.count(m => m.esNuevo());
  }
}

module.exports = new MensajeContactoRepository();
