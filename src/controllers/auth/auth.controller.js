const authService = require('../../services/auth.service');
const AppError = require('../../errors/app-error');
const Roles = require('../../constants/roles');

class AuthController {
  mostrarLogin(req, res) {
    res.render('auth/login', { titulo: 'Ingresar', datos: {} });
  }

  async login(req, res, next) {
    try {
      const usuario = await authService.login(req.body.correo, req.body.password);
      req.session.usuario = usuario;

      if (usuario.rol === Roles.ADMIN) return res.redirect('/admin');
      res.redirect('/padre/perfil');
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).render('auth/login', {
          titulo: 'Ingresar',
          errores: [error.message],
          datos: { correo: req.body.correo }
        });
      }
      next(error);
    }
  }

  mostrarRegistro(req, res) {
    res.render('auth/registro', { titulo: 'Registro', datos: {} });
  }

  async registro(req, res, next) {
    try {
      const usuario = await authService.registrar(req.body);
      req.session.usuario = usuario;
      res.redirect('/padre/perfil');
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).render('auth/registro', {
          titulo: 'Registro',
          errores: [error.message],
          datos: { nombre: req.body.nombre, telefono: req.body.telefono, correo: req.body.correo }
        });
      }
      next(error);
    }
  }

  logout(req, res) {
    req.session.destroy(() => {
      res.redirect('/');
    });
  }
}

module.exports = new AuthController();
