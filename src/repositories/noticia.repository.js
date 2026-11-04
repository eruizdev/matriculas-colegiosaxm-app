const BaseRepository = require('./base.repository');
const Noticia = require('../models/noticia.model');

class NoticiaRepository extends BaseRepository {
  constructor() {
    super(Noticia);
  }

  ordenar(noticias) {
    return noticias.sort((a, b) => b.fecha - a.fecha);
  }

  findPublicadas() {
    return this.findBy(n => n.publicada);
  }
}

module.exports = new NoticiaRepository();
