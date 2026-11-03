const authService = require('../../services/auth.service');
const AppError = require('../../errors/app-error');
const RolUtil = require('../../utils/rol.util');

class AuthController {
  iniciarSesion(req, usuario) {
    const volverA = req.session.volverA;

    return new Promise((resolve, reject) => {
      req.session.regenerate(error => {
        if (error) return reject(error);
        req.session.usuario = usuario;

        const destino = volverA && RolUtil.puedeEntrar(usuario.rol, volverA)
          ? volverA
          : RolUtil.rutaInicio(usuario.rol);
        resolve(destino);
      });
    });
  }

  mostrarLogin = (req, res) => {
    res.render('auth/login', { titulo: 'Ingresar', datos: {} });
  };

  login = async (req, res, next) => {
    try {
      const usuario = await authService.login(req.body.correo, req.body.password);
      const destino = await this.iniciarSesion(req, usuario);
      res.redirect(destino);
    } catch (error) {
      if (AppError.esDelCliente(error)) {
        return res.status(error.statusCode).render('auth/login', {
          titulo: 'Ingresar',
          errores: error.mensajes(),
          datos: { correo: req.body.correo }
        });
      }
      next(error);
    }
  };

  mostrarRegistro = (req, res) => {
    res.render('auth/registro', { titulo: 'Registro', datos: {} });
  };

  registro = async (req, res, next) => {
    try {
      const usuario = await authService.registrar(req.body);
      const destino = await this.iniciarSesion(req, usuario);
      res.redirect(destino);
    } catch (error) {
      if (AppError.esDelCliente(error)) {
        return res.status(error.statusCode).render('auth/registro', {
          titulo: 'Registro',
          errores: error.mensajes(),
          datos: { nombre: req.body.nombre, telefono: req.body.telefono, correo: req.body.correo }
        });
      }
      next(error);
    }
  };

  logout = (req, res) => {
    req.session.destroy(() => {
      res.redirect('/');
    });
  };
}

module.exports = new AuthController();
