const Grado = require('../models/grado.model');

class GradoRepository {
  constructor() {
    this.grados = [];
    this.siguienteId = 1;
  }

  findAll() {
    return [...this.grados].sort((a, b) => a.orden - b.orden);
  }

  findById(id) {
    return this.grados.find(g => g.id === Number(id));
  }

  create(data) {
    const grado = new Grado({ ...data, id: this.siguienteId++ });
    this.grados.push(grado);
    return grado;
  }

  update(id, data) {
    const grado = this.findById(id);
    if (!grado) return null;
    Object.assign(grado, data);
    return grado;
  }

  delete(id) {
    const index = this.grados.findIndex(g => g.id === Number(id));
    if (index === -1) return false;
    this.grados.splice(index, 1);
    return true;
  }
}

module.exports = new GradoRepository();
