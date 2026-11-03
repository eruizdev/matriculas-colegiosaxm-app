const colegioService = require('../../services/colegio.service');
const ColegioValidator = require('../../validators/colegio.validator');

class AdminColegioController {
  index(req, res) {
    res.render('admin/colegio', { titulo: 'Datos del colegio', datos: colegioService.obtener() });
  }

  actualizar(req, res) {
    const errores = ColegioValidator.validar(req.body);
    if (errores.length > 0) {
      return res.status(400).render('admin/colegio', { titulo: 'Datos del colegio', datos: req.body, errores });
    }

    const colegio = colegioService.actualizar(req.body);
    res.locals.colegio = colegio;
    res.render('admin/colegio', { titulo: 'Datos del colegio', datos: colegio, exito: 'Datos guardados' });
  }
}

module.exports = new AdminColegioController();
