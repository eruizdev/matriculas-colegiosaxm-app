const noticiaService = require('../../services/noticia.service');
const periodoAcademicoService = require('../../services/periodo-academico.service');
const cupoService = require('../../services/cupo.service');

class InicioController {
  index(req, res) {
    const noticias = noticiaService.listarPublicadas(3);
    const periodo = periodoAcademicoService.obtenerActivo();
    const cuposDisponibles = cupoService.totalDisponibles();

    res.render('publico/inicio', { titulo: 'Inicio', noticias, periodo, cuposDisponibles });
  }
}

module.exports = new InicioController();
