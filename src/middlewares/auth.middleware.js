const usuarioRepository = require('../repositories/usuario.repository');
const UsuarioDto = require('../dtos/usuario.dto');
const RolUtil = require('../utils/rol.util');
const Roles = require('../constants/roles');

class AuthMiddleware {
  static asignarLocals(res, usuario) {
    res.locals.usuario = usuario || null;
    res.locals.esAdmin = Boolean(usuario) && usuario.rol === Roles.ADMIN;
    res.locals.esPadre = Boolean(usuario) && usuario.rol === Roles.PADRE;
  }

  static cargarUsuario(req, res, next) {
    AuthMiddleware.asignarLocals(res, req.session.usuario);
    next();
  }

  static verificarSesion(req, res, next) {
    const sesion = req.session.usuario;

    if (!sesion) {
      if (req.method === 'GET') req.session.volverA = req.originalUrl;
      return res.redirect('/auth/login');
    }

    const usuario = usuarioRepository.findById(sesion.id);
    if (!usuario || !usuario.activo) {
      return req.session.destroy(() => res.redirect('/auth/login'));
    }

    req.session.usuario = UsuarioDto.desde(usuario);
    AuthMiddleware.asignarLocals(res, req.session.usuario);
    next();
  }

  static soloInvitados(req, res, next) {
    if (req.session.usuario) {
      return res.redirect(RolUtil.rutaInicio(req.session.usuario.rol));
    }
    next();
  }
}

module.exports = AuthMiddleware;
