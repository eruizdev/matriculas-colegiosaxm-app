const requisitoService = require('../../services/requisito.service');
const RequisitoValidator = require('../../validators/requisito.validator');

class AdminRequisitoController {
  index(req, res) {
    const requisitos = requisitoService.listar();
    res.render('admin/requisitos', { titulo: 'Requisitos', requisitos, datos: {} });
  }

  crear(req, res) {
    const errores = RequisitoValidator.validar(req.body);
    if (errores.length > 0) {
      const requisitos = requisitoService.listar();
      return res.status(400).render('admin/requisitos', { titulo: 'Requisitos', requisitos, errores, datos: req.body });
    }

    requisitoService.crear(req.body);
    res.redirect('/admin/requisitos');
  }

  eliminar(req, res, next) {
    try {
      requisitoService.eliminar(req.params.id);
      res.redirect('/admin/requisitos');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AdminRequisitoController();
