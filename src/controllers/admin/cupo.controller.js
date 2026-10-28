const cupoService = require('../../services/cupo.service');
const gradoService = require('../../services/grado.service');
const periodoAcademicoService = require('../../services/periodo-academico.service');
const CupoValidator = require('../../validators/cupo.validator');
const Jornada = require('../../constants/jornada');

class AdminCupoController {
  datosVista(extra = {}) {
    return {
      titulo: 'Cupos',
      cupos: cupoService.listar(),
      grados: gradoService.listar(),
      periodos: periodoAcademicoService.listar(),
      jornadas: Object.values(Jornada),
      datos: {},
      ...extra
    };
  }

  index = (req, res) => {
    res.render('admin/cupos', this.datosVista());
  };

  crear = (req, res) => {
    const errores = CupoValidator.validar(req.body);
    if (errores.length > 0) {
      return res.status(400).render('admin/cupos', this.datosVista({ errores, datos: req.body }));
    }

    cupoService.crear(req.body);
    res.redirect('/admin/cupos');
  };

  actualizar = (req, res, next) => {
    try {
      const total = Number(req.body.total);
      const ocupados = Number(req.body.ocupados);
      if (!total || ocupados < 0 || ocupados > total) {
        return res.status(400).render('admin/cupos', this.datosVista({ errores: ['Los cupos ocupados no pueden superar el total'] }));
      }

      cupoService.actualizar(req.params.id, req.body);
      res.redirect('/admin/cupos');
    } catch (error) {
      next(error);
    }
  };

  eliminar = (req, res, next) => {
    try {
      cupoService.eliminar(req.params.id);
      res.redirect('/admin/cupos');
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new AdminCupoController();
