class Noticia {
  constructor({ id, titulo, contenido, publicada = false, fecha = new Date() }) {
    this.id = id;
    this.titulo = titulo;
    this.contenido = contenido;
    this.publicada = publicada;
    this.fecha = fecha;
  }
}

module.exports = Noticia;
