const cupoService = require('../../services/cupo.service');
const periodoAcademicoService = require('../../services/periodo-academico.service');

class CupoController {
  index(req, res) {
    const resumen = cupoService.resumenPorGrado();
    const periodo = periodoAcademicoService.obtenerActivo();

    res.render('publico/cupos', { titulo: 'Cupos', resumen, periodo });
  }
}

module.exports = new CupoController();
