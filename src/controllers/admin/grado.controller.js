const gradoService = require('../../services/grado.service');
const GradoValidator = require('../../validators/grado.validator');
const AppError = require('../../errors/app-error');
const Nivel = require('../../constants/nivel');

const mostrar = (res, extra = {}, status = 200) => {
  res.status(status).render('admin/grados', {
    titulo: 'Grados',
    grados: gradoService.listar(),
    niveles: Object.values(Nivel),
    datos: {},
    ...extra
  });
};

class AdminGradoController {
  index(req, res) {
    mostrar(res);
  }

  crear(req, res, next) {
    const errores = GradoValidator.validar(req.body);
    if (errores.length > 0) return mostrar(res, { errores, datos: req.body }, 400);

    try {
      gradoService.crear(req.body);
      res.redirect('/admin/grados');
    } catch (error) {
      if (AppError.esDelCliente(error)) {
        return mostrar(res, { errores: error.mensajes(), datos: req.body }, error.statusCode);
      }
      next(error);
    }
  }

  cambiarEstado(req, res, next) {
    try {
      gradoService.cambiarEstado(req.params.id);
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
      if (AppError.esDelCliente(error)) {
        return mostrar(res, { errores: error.mensajes() }, error.statusCode);
      }
      next(error);
    }
  }
}

module.exports = new AdminGradoController();
