const { ForbiddenError, UnauthorizedError } = require('../errors');
const RolUtil = require('../utils/rol.util');

class RolMiddleware {
  static permitir(...roles) {
    roles.forEach(rol => {
      if (!RolUtil.esValido(rol)) throw new Error(`Rol no válido en las rutas: ${rol}`);
    });

    return (req, res, next) => {
      const usuario = req.session.usuario;
      if (!usuario) return next(new UnauthorizedError());

      if (!roles.includes(usuario.rol)) {
        const nombres = roles.map(rol => RolUtil.nombre(rol)).join(' o ');
        return next(new ForbiddenError(`Esta sección es solo para: ${nombres}`));
      }
      next();
    };
  }

  static requierePermiso(permiso) {
    return (req, res, next) => {
      const usuario = req.session.usuario;
      if (!usuario) return next(new UnauthorizedError());

      if (!RolUtil.tienePermiso(usuario.rol, permiso)) {
        return next(new ForbiddenError('Tu rol no tiene permiso para entrar aquí'));
      }
      next();
    };
  }
}

module.exports = RolMiddleware;
