const ForbiddenError = require('../errors/forbidden-error');

class RolMiddleware {
  static permitir(...roles) {
    return (req, res, next) => {
      const usuario = req.session.usuario;
      if (!usuario || !roles.includes(usuario.rol)) {
        return next(new ForbiddenError());
      }
      next();
    };
  }
}

module.exports = RolMiddleware;
