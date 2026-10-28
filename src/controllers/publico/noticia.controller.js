const noticiaService = require('../../services/noticia.service');

class NoticiaController {
  index(req, res) {
    const noticias = noticiaService.listarPublicadas();
    res.render('publico/noticias', { titulo: 'Noticias', noticias });
  }

  detalle(req, res, next) {
    try {
      const noticia = noticiaService.obtenerPublicada(req.params.id);
      res.render('publico/noticia', { titulo: noticia.titulo, noticia });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new NoticiaController();
