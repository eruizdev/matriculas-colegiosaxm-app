const Cupo = require('../models/cupo.model');

class CupoRepository {
  constructor() {
    this.cupos = [];
    this.siguienteId = 1;
  }

  findAll() {
    return this.cupos;
  }

  findById(id) {
    return this.cupos.find(c => c.id === Number(id));
  }

  findByPeriodo(periodoId) {
    return this.cupos.filter(c => c.periodoId === Number(periodoId));
  }

  findByGrado(gradoId) {
    return this.cupos.filter(c => c.gradoId === Number(gradoId));
  }

  findByFiltros({ periodoId, gradoId, jornada } = {}) {
    return this.cupos.filter(c =>
      (!periodoId || c.periodoId === Number(periodoId)) &&
      (!gradoId || c.gradoId === Number(gradoId)) &&
      (!jornada || c.jornada === jornada)
    );
  }

  existe(gradoId, periodoId, jornada) {
    return this.cupos.some(c =>
      c.gradoId === Number(gradoId) &&
      c.periodoId === Number(periodoId) &&
      c.jornada === jornada
    );
  }

  create(data) {
    const cupo = new Cupo({ ...data, id: this.siguienteId++ });
    this.cupos.push(cupo);
    return cupo;
  }

  update(id, data) {
    const cupo = this.findById(id);
    if (!cupo) return null;
    Object.assign(cupo, data, { fechaActualizacion: new Date() });
    return cupo;
  }

  delete(id) {
    const index = this.cupos.findIndex(c => c.id === Number(id));
    if (index === -1) return false;
    this.cupos.splice(index, 1);
    return true;
  }
}

module.exports = new CupoRepository();
