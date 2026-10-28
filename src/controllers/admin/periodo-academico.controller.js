const periodoAcademicoService = require('../../services/periodo-academico.service');

class AdminPeriodoAcademicoController {
  index(req, res) {
    const periodos = periodoAcademicoService.listar();
    res.render('admin/periodos', { titulo: 'Periodos académicos', periodos, datos: {} });
  }

  crear(req, res) {
    const errores = [];
    if (!req.body.nombre) errores.push('El nombre es obligatorio');
    if (!req.body.anio) errores.push('El año es obligatorio');

    if (errores.length > 0) {
      const periodos = periodoAcademicoService.listar();
      return res.status(400).render('admin/periodos', { titulo: 'Periodos académicos', periodos, errores, datos: req.body });
    }

    periodoAcademicoService.crear(req.body);
    res.redirect('/admin/periodos');
  }

  activar(req, res, next) {
    try {
      periodoAcademicoService.activar(req.params.id);
      res.redirect('/admin/periodos');
    } catch (error) {
      next(error);
    }
  }

  eliminar(req, res, next) {
    try {
      periodoAcademicoService.eliminar(req.params.id);
      res.redirect('/admin/periodos');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AdminPeriodoAcademicoController();
