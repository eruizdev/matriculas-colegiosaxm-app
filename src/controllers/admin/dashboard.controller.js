const usuarioService = require('../../services/usuario.service');
const gradoService = require('../../services/grado.service');
const cupoService = require('../../services/cupo.service');
const noticiaService = require('../../services/noticia.service');
const mensajeContactoService = require('../../services/mensaje-contacto.service');
const periodoAcademicoService = require('../../services/periodo-academico.service');

class AdminDashboardController {
  index(req, res) {
    const resumen = {
      padres: usuarioService.contarPadres(),
      grados: gradoService.listar().length,
      cuposDisponibles: cupoService.totalDisponibles(),
      noticias: noticiaService.listar().length,
      mensajesNoLeidos: mensajeContactoService.contarNoLeidos()
    };
    const periodo = periodoAcademicoService.obtenerActivo();

    res.render('admin/dashboard', { titulo: 'Panel', resumen, periodo });
  }
}

module.exports = new AdminDashboardController();
