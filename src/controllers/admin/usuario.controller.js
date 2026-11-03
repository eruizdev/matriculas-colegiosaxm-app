const usuarioService = require('../../services/usuario.service');
const authService = require('../../services/auth.service');
const AuthValidator = require('../../validators/auth.validator');
const AppError = require('../../errors/app-error');
const RolUtil = require('../../utils/rol.util');

class AdminUsuarioController {
  datosVista(rol = '', extra = {}) {
    return {
      titulo: 'Usuarios',
      usuarios: usuarioService.listar({ rol }),
      roles: RolUtil.listar(),
      filtroRol: rol,
      datos: {},
      ...extra
    };
  }

  index = (req, res) => {
    const rol = RolUtil.esValido(req.query.rol) ? req.query.rol : '';
    res.render('admin/usuarios', this.datosVista(rol));
  };

  crearAdmin = async (req, res, next) => {
    const datos = { nombre: req.body.nombre, telefono: req.body.telefono, correo: req.body.correo };
    const errores = AuthValidator.validarRegistro(req.body);
    if (errores.length > 0) {
      return res.status(400).render('admin/usuarios', this.datosVista('', { errores, datos }));
    }

    try {
      await authService.crearAdmin(req.body);
      res.redirect('/admin/usuarios');
    } catch (error) {
      if (AppError.esDelCliente(error)) {
        return res.status(error.statusCode).render('admin/usuarios', this.datosVista('', { errores: error.mensajes(), datos }));
      }
      next(error);
    }
  };

  cambiarEstado = (req, res, next) => {
    try {
      usuarioService.cambiarEstado(req.params.id, req.session.usuario.id);
      res.redirect(req.get('Referer') || '/admin/usuarios');
    } catch (error) {
      if (AppError.esDelCliente(error)) {
        return res.status(error.statusCode).render('admin/usuarios', this.datosVista('', { errores: error.mensajes() }));
      }
      next(error);
    }
  };

  cambiarRol = (req, res, next) => {
    try {
      usuarioService.cambiarRol(req.params.id, req.body.rol, req.session.usuario.id);
      res.redirect(req.get('Referer') || '/admin/usuarios');
    } catch (error) {
      if (AppError.esDelCliente(error)) {
        return res.status(error.statusCode).render('admin/usuarios', this.datosVista('', { errores: error.mensajes() }));
      }
      next(error);
    }
  };
}

module.exports = new AdminUsuarioController();
