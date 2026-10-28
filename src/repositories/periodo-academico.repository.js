const PeriodoAcademico = require('../models/periodo-academico.model');

class PeriodoAcademicoRepository {
  constructor() {
    this.periodos = [];
    this.siguienteId = 1;
  }

  findAll() {
    return this.periodos;
  }

  findById(id) {
    return this.periodos.find(p => p.id === Number(id));
  }

  findActivo() {
    return this.periodos.find(p => p.activo);
  }

  create(data) {
    const periodo = new PeriodoAcademico({ ...data, id: this.siguienteId++ });
    this.periodos.push(periodo);
    return periodo;
  }

  update(id, data) {
    const periodo = this.findById(id);
    if (!periodo) return null;
    Object.assign(periodo, data);
    return periodo;
  }

  delete(id) {
    const index = this.periodos.findIndex(p => p.id === Number(id));
    if (index === -1) return false;
    this.periodos.splice(index, 1);
    return true;
  }
}

module.exports = new PeriodoAcademicoRepository();
