const MensajeContacto = require('../models/mensaje-contacto.model');

class MensajeContactoRepository {
  constructor() {
    this.mensajes = [];
    this.siguienteId = 1;
  }

  findAll() {
    return [...this.mensajes].sort((a, b) => b.fecha - a.fecha);
  }

  findNoLeidos() {
    return this.mensajes.filter(m => !m.leido);
  }

  findById(id) {
    return this.mensajes.find(m => m.id === Number(id));
  }

  create(data) {
    const mensaje = new MensajeContacto({ ...data, id: this.siguienteId++ });
    this.mensajes.push(mensaje);
    return mensaje;
  }

  update(id, data) {
    const mensaje = this.findById(id);
    if (!mensaje) return null;
    Object.assign(mensaje, data);
    return mensaje;
  }

  delete(id) {
    const index = this.mensajes.findIndex(m => m.id === Number(id));
    if (index === -1) return false;
    this.mensajes.splice(index, 1);
    return true;
  }
}

module.exports = new MensajeContactoRepository();
