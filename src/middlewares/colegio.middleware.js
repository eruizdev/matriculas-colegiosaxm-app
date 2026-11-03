const colegioService = require('../services/colegio.service');

class ColegioMiddleware {
  static cargar(req, res, next) {
    res.locals.colegio = colegioService.obtener();
    next();
  }
}

module.exports = ColegioMiddleware;
