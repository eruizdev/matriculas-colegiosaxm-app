const cupoService = require('../../services/cupo.service');
const gradoService = require('../../services/grado.service');
const periodoAcademicoService = require('../../services/periodo-academico.service');
const Jornada = require('../../constants/jornada');

class PadreCupoController {
  index(req, res) {
    const filtros = {
      gradoId: req.query.gradoId || '',
      jornada: req.query.jornada || ''
    };

    const cupos = cupoService.listarDisponibles(filtros);
    const grados = gradoService.listarActivos();
    const periodo = periodoAcademicoService.obtenerActivo();

    res.render('padre/cupos', {
      titulo: 'Consultar cupos',
      cupos,
      grados,
      jornadas: Object.values(Jornada),
      periodo,
      filtros
    });
  }
}

module.exports = new PadreCupoController();
