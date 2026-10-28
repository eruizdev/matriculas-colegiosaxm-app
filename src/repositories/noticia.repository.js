const Noticia = require('../models/noticia.model');

class NoticiaRepository {
  constructor() {
    this.noticias = [];
    this.siguienteId = 1;
  }

  findAll() {
    return [...this.noticias].sort((a, b) => b.fecha - a.fecha);
  }

  findPublicadas() {
    return this.findAll().filter(n => n.publicada);
  }

  findById(id) {
    return this.noticias.find(n => n.id === Number(id));
  }

  create(data) {
    const noticia = new Noticia({ ...data, id: this.siguienteId++ });
    this.noticias.push(noticia);
    return noticia;
  }

  update(id, data) {
    const noticia = this.findById(id);
    if (!noticia) return null;
    Object.assign(noticia, data);
    return noticia;
  }

  delete(id) {
    const index = this.noticias.findIndex(n => n.id === Number(id));
    if (index === -1) return false;
    this.noticias.splice(index, 1);
    return true;
  }
}

module.exports = new NoticiaRepository();
