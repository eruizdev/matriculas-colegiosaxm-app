const usuarioService = require('../../services/usuario.service');
const authService = require('../../services/auth.service');
const UsuarioValidator = require('../../validators/usuario.validator');
const AuthValidator = require('../../validators/auth.validator');
const AppError = require('../../errors/app-error');

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
    const id = req.session.usuario.id;
    try {
      const errores = UsuarioValidator.validarPerfil(req.body);
      if (errores.length > 0) {
        return res.status(400).render('padre/perfil', { titulo: 'Mi perfil', perfil: usuarioService.obtener(id), errores });
      }

      const perfil = usuarioService.actualizarPerfil(id, req.body);
      req.session.usuario = perfil;
      res.render('padre/perfil', { titulo: 'Mi perfil', perfil, exito: 'Datos actualizados' });
    } catch (error) {
      if (AppError.esDelCliente(error)) {
        return res.status(error.statusCode).render('padre/perfil', { titulo: 'Mi perfil', perfil: usuarioService.obtener(id), errores: error.mensajes() });
      }
      next(error);
    }
  }

  async cambiarPassword(req, res, next) {
    const id = req.session.usuario.id;
    try {
      const errores = AuthValidator.validarCambioPassword(req.body);
      if (errores.length > 0) {
        return res.status(400).render('padre/perfil', { titulo: 'Mi perfil', perfil: usuarioService.obtener(id), errores });
      }

      await authService.cambiarPassword(id, req.body.passwordActual, req.body.passwordNueva);
      res.render('padre/perfil', { titulo: 'Mi perfil', perfil: usuarioService.obtener(id), exito: 'Contraseña actualizada' });
    } catch (error) {
      if (AppError.esDelCliente(error)) {
        return res.status(error.statusCode).render('padre/perfil', { titulo: 'Mi perfil', perfil: usuarioService.obtener(id), errores: error.mensajes() });
      }
      next(error);
    }
  }
}

module.exports = new PadrePerfilController();
