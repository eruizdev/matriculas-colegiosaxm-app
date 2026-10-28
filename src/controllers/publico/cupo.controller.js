const cupoService = require('../../services/cupo.service');
const periodoAcademicoService = require('../../services/periodo-academico.service');

class CupoController {
  index(req, res) {
    const cupos = cupoService.listarDisponibles();
    const periodo = periodoAcademicoService.obtenerActivo();

    res.render('publico/cupos', { titulo: 'Cupos', cupos, periodo });
  }
}

module.exports = new CupoController();
