const BaseRepository = require('./base.repository');
const PeriodoAcademico = require('../models/periodo-academico.model');

class PeriodoAcademicoRepository extends BaseRepository {
  constructor() {
    super(PeriodoAcademico);
  }

  findActivo() {
    return this.findOneBy(p => p.activo);
  }

  findByAnio(anio) {
    return this.findBy(p => p.anio === Number(anio));
  }
}

module.exports = new PeriodoAcademicoRepository();
