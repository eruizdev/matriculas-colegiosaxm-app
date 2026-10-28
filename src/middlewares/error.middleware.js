const NotFoundError = require('../errors/not-found-error');

class ErrorMiddleware {
  static noEncontrado(req, res, next) {
    next(new NotFoundError('Página no encontrada'));
  }

  static manejar(err, req, res, next) {
    const status = err.statusCode || 500;
    const mensaje = status === 500 ? 'Ocurrió un error en el servidor' : err.message;

    if (status === 500) console.error(err);

    res.status(status).render('error', { titulo: 'Error', status, mensaje });
  }
}

module.exports = ErrorMiddleware;
