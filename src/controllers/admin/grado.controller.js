const gradoService = require('../../services/grado.service');
const GradoValidator = require('../../validators/grado.validator');

class AdminGradoController {
  index(req, res) {
    const grados = gradoService.listar();
    res.render('admin/grados', { titulo: 'Grados', grados, datos: {} });
  }

  crear(req, res) {
    const errores = GradoValidator.validar(req.body);
    if (errores.length > 0) {
      const grados = gradoService.listar();
      return res.status(400).render('admin/grados', { titulo: 'Grados', grados, errores, datos: req.body });
    }

    gradoService.crear(req.body);
    res.redirect('/admin/grados');
  }

  cambiarEstado(req, res, next) {
    try {
      const grado = gradoService.obtener(req.params.id);
      gradoService.actualizar(req.params.id, { activo: !grado.activo });
      res.redirect('/admin/grados');
    } catch (error) {
      next(error);
    }
  }

  eliminar(req, res, next) {
    try {
      gradoService.eliminar(req.params.id);
      res.redirect('/admin/grados');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AdminGradoController();
