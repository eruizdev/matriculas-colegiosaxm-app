const Requisito = require('../models/requisito.model');

class RequisitoRepository {
  constructor() {
    this.requisitos = [];
    this.siguienteId = 1;
  }

  findAll() {
    return [...this.requisitos].sort((a, b) => a.orden - b.orden);
  }

  findById(id) {
    return this.requisitos.find(r => r.id === Number(id));
  }

  create(data) {
    const requisito = new Requisito({ ...data, id: this.siguienteId++ });
    this.requisitos.push(requisito);
    return requisito;
  }

  update(id, data) {
    const requisito = this.findById(id);
    if (!requisito) return null;
    Object.assign(requisito, data);
    return requisito;
  }

  delete(id) {
    const index = this.requisitos.findIndex(r => r.id === Number(id));
    if (index === -1) return false;
    this.requisitos.splice(index, 1);
    return true;
  }
}

module.exports = new RequisitoRepository();
