const colegioRepository = require('../repositories/colegio.repository');

class ColegioService {
  obtener() {
    return colegioRepository.find();
  }

  actualizar(data) {
    return colegioRepository.update(data);
  }
}

module.exports = new ColegioService();
