const mensajeContactoService = require('../../services/mensaje-contacto.service');

class AdminMensajeContactoController {
  index(req, res) {
    const mensajes = mensajeContactoService.listar();
    res.render('admin/mensajes', { titulo: 'Mensajes de contacto', mensajes });
  }

  marcarLeido(req, res, next) {
    try {
      mensajeContactoService.marcarLeido(req.params.id);
      res.redirect('/admin/mensajes');
    } catch (error) {
      next(error);
    }
  }

  eliminar(req, res, next) {
    try {
      mensajeContactoService.eliminar(req.params.id);
      res.redirect('/admin/mensajes');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AdminMensajeContactoController();
