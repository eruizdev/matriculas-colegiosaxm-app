class AuthMiddleware {
  static verificarSesion(req, res, next) {
    if (!req.session.usuario) {
      return res.redirect('/auth/login');
    }
    next();
  }

  static soloInvitados(req, res, next) {
    if (req.session.usuario) {
      return res.redirect('/');
    }
    next();
  }
}

module.exports = AuthMiddleware;
