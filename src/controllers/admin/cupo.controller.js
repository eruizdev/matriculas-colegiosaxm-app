const cupoService = require('../../services/cupo.service');
const gradoService = require('../../services/grado.service');
const periodoAcademicoService = require('../../services/periodo-academico.service');
const CupoValidator = require('../../validators/cupo.validator');
const AppError = require('../../errors/app-error');
const Jornada = require('../../constants/jornada');

class AdminCupoController {
  leerFiltros(query) {
    const periodo = periodoAcademicoService.obtenerActivo();
    return {
      periodoId: query.periodoId !== undefined ? query.periodoId : (periodo ? String(periodo.id) : ''),
      gradoId: query.gradoId || '',
      jornada: query.jornada || ''
    };
  }

  datosVista(filtros, extra = {}) {
    return {
      titulo: 'Cupos',
      cupos: cupoService.listar(filtros),
      grados: gradoService.listar(),
      periodos: periodoAcademicoService.listar(),
      jornadas: Object.values(Jornada),
      filtros,
      datos: {},
      ...extra
    };
  }

  volver(req, res) {
    res.redirect(req.get('Referer') || '/admin/cupos');
  }

  mostrarError(res, errores, datos = {}, status = 400) {
    const filtros = this.leerFiltros({});
    res.status(status).render('admin/cupos', this.datosVista(filtros, { errores, datos }));
  }

  index = (req, res) => {
    res.render('admin/cupos', this.datosVista(this.leerFiltros(req.query)));
  };

  crear = (req, res, next) => {
    const errores = CupoValidator.validar(req.body);
    if (errores.length > 0) return this.mostrarError(res, errores, req.body);

    try {
      cupoService.crear(req.body);
      res.redirect('/admin/cupos');
    } catch (error) {
      if (AppError.esDelCliente(error)) {
        return this.mostrarError(res, error.mensajes(), req.body, error.statusCode);
      }
      next(error);
    }
  };

  actualizar = (req, res, next) => {
    const errores = CupoValidator.validarCantidades(req.body);
    if (errores.length > 0) return this.mostrarError(res, errores);

    try {
      cupoService.actualizar(req.params.id, req.body);
      this.volver(req, res);
    } catch (error) {
      next(error);
    }
  };

  ocupar = (req, res, next) => {
    try {
      cupoService.ocupar(req.params.id, req.body.cantidad || 1);
      this.volver(req, res);
    } catch (error) {
      if (AppError.esDelCliente(error)) {
        return this.mostrarError(res, error.mensajes(), {}, error.statusCode);
      }
      next(error);
    }
  };

  liberar = (req, res, next) => {
    try {
      cupoService.liberar(req.params.id, req.body.cantidad || 1);
      this.volver(req, res);
    } catch (error) {
      if (AppError.esDelCliente(error)) {
        return this.mostrarError(res, error.mensajes(), {}, error.statusCode);
      }
      next(error);
    }
  };

  eliminar = (req, res, next) => {
    try {
      cupoService.eliminar(req.params.id);
      this.volver(req, res);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new AdminCupoController();
