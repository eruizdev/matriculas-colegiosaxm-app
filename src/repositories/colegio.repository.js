const Colegio = require('../models/colegio.model');

class ColegioRepository {
  constructor() {
    this.colegio = new Colegio();
  }

  find() {
    return this.colegio;
  }

  update(data) {
    this.colegio.actualizar(data);
    return this.colegio;
  }
}

module.exports = new ColegioRepository();
