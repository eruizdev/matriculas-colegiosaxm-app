const { AppError, NotFoundError, BadRequestError } = require('../errors');
const TitulosError = require('../constants/titulos-error');
const Env = require('../config/env');
const AuthMiddleware = require('./auth.middleware');

class ErrorMiddleware {
  static noEncontrado(req, res, next) {
    next(new NotFoundError('La página que buscas no existe'));
  }

  static normalizar(err) {
    if (err instanceof AppError) return err;
    if (err.type === 'entity.parse.failed') return new BadRequestError('Los datos enviados no tienen un formato válido');
    return new AppError('Ocurrió un error en el servidor', 500);
  }

  static registrar(err, req) {
    console.error(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    console.error(err);
  }

  static manejar(err, req, res, next) {
    if (res.headersSent) return next(err);

    const error = ErrorMiddleware.normalizar(err);
    const status = error.statusCode;

    if (status >= 500) ErrorMiddleware.registrar(err, req);

    if (req.accepts(['html', 'json']) === 'json') {
      return res.status(status).json(error.toJSON());
    }

    if (res.locals.usuario === undefined) {
      AuthMiddleware.asignarLocals(res, req.session && req.session.usuario);
    }

    res.status(status).render('error', {
      titulo: TitulosError[status] || 'Error',
      status,
      tituloError: TitulosError[status] || 'Error',
      mensaje: error.message,
      detalles: error.detalles,
      stack: Env.esDesarrollo() && status >= 500 ? err.stack : null
    });
  }
}

module.exports = ErrorMiddleware;
