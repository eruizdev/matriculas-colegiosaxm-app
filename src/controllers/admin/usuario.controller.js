const usuarioService = require('../../services/usuario.service');

class AdminUsuarioController {
  index(req, res) {
    const usuarios = usuarioService.listarPadres();
    res.render('admin/usuarios', { titulo: 'Padres registrados', usuarios });
  }

  cambiarEstado(req, res, next) {
    try {
      usuarioService.cambiarEstado(req.params.id);
      res.redirect('/admin/usuarios');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AdminUsuarioController();
