const colegioRepository = require('../repositories/colegio.repository');
const ColegioDto = require('../dtos/colegio.dto');

class ColegioService {
  obtener() {
    return ColegioDto.desde(colegioRepository.find());
  }

  actualizar(data) {
    return ColegioDto.desde(colegioRepository.update(data));
  }
}

module.exports = new ColegioService();
