const BaseRepository = require('./base.repository');
const Cupo = require('../models/cupo.model');

class CupoRepository extends BaseRepository {
  constructor() {
    super(Cupo);
  }

  findByPeriodo(periodoId) {
    return this.findBy(c => c.periodoId === Number(periodoId));
  }

  findByGrado(gradoId) {
    return this.findBy(c => c.gradoId === Number(gradoId));
  }

  findByFiltros({ periodoId, gradoId, jornada } = {}) {
    return this.findBy(c =>
      (!periodoId || c.periodoId === Number(periodoId)) &&
      (!gradoId || c.gradoId === Number(gradoId)) &&
      (!jornada || c.jornada === jornada)
    );
  }

  existe(gradoId, periodoId, jornada) {
    return this.registros.some(c =>
      c.gradoId === Number(gradoId) &&
      c.periodoId === Number(periodoId) &&
      c.jornada === jornada
    );
  }

  update(id, data) {
    return super.update(id, { ...data, fechaActualizacion: new Date() });
  }
}

module.exports = new CupoRepository();
