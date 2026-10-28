const noticiaService = require('../../services/noticia.service');
const NoticiaValidator = require('../../validators/noticia.validator');

class AdminNoticiaController {
  index(req, res) {
    const noticias = noticiaService.listar();
    res.render('admin/noticias', { titulo: 'Noticias', noticias, datos: {} });
  }

  crear(req, res) {
    const errores = NoticiaValidator.validar(req.body);
    if (errores.length > 0) {
      const noticias = noticiaService.listar();
      return res.status(400).render('admin/noticias', { titulo: 'Noticias', noticias, errores, datos: req.body });
    }

    noticiaService.crear(req.body);
    res.redirect('/admin/noticias');
  }

  cambiarEstado(req, res, next) {
    try {
      noticiaService.cambiarEstado(req.params.id);
      res.redirect('/admin/noticias');
    } catch (error) {
      next(error);
    }
  }

  eliminar(req, res, next) {
    try {
      noticiaService.eliminar(req.params.id);
      res.redirect('/admin/noticias');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AdminNoticiaController();
