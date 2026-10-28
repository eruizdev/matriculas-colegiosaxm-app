const cupoService = require('../../services/cupo.service');
const gradoService = require('../../services/grado.service');
const periodoAcademicoService = require('../../services/periodo-academico.service');

class PadreCupoController {
  index(req, res) {
    const gradoId = req.query.gradoId || '';
    const cupos = cupoService.listarDisponibles(gradoId);
    const grados = gradoService.listarActivos();
    const periodo = periodoAcademicoService.obtenerActivo();

    res.render('padre/cupos', { titulo: 'Consultar cupos', cupos, grados, periodo, gradoId });
  }
}

module.exports = new PadreCupoController();
