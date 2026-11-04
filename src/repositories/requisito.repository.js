const BaseRepository = require('./base.repository');
const Requisito = require('../models/requisito.model');

class RequisitoRepository extends BaseRepository {
  constructor() {
    super(Requisito);
  }

  ordenar(requisitos) {
    return requisitos.sort((a, b) => a.orden - b.orden);
  }

  findObligatorios() {
    return this.findBy(r => r.esObligatorio());
  }
}

module.exports = new RequisitoRepository();
