const usuarioService = require('../../services/usuario.service');
const UsuarioValidator = require('../../validators/usuario.validator');

class PadrePerfilController {
  index(req, res, next) {
    try {
      const perfil = usuarioService.obtener(req.session.usuario.id);
      res.render('padre/perfil', { titulo: 'Mi perfil', perfil });
    } catch (error) {
      next(error);
    }
  }

  actualizar(req, res, next) {
    try {
      const errores = UsuarioValidator.validarPerfil(req.body);
      if (errores.length > 0) {
        const perfil = usuarioService.obtener(req.session.usuario.id);
        return res.status(400).render('padre/perfil', { titulo: 'Mi perfil', perfil, errores });
      }

      const perfil = usuarioService.actualizarPerfil(req.session.usuario.id, req.body);
      req.session.usuario = perfil;
      res.render('padre/perfil', { titulo: 'Mi perfil', perfil, exito: 'Datos actualizados' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PadrePerfilController();
