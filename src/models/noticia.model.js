class Noticia {
  static LARGO_RESUMEN = 120;

  constructor({ id, titulo, contenido, publicada = false, fecha = new Date() }) {
    this.id = id;
    this.titulo = titulo;
    this.contenido = contenido;
    this.publicada = publicada;
    this.fecha = fecha;
  }

  publicar() {
    this.publicada = true;
  }

  ocultar() {
    this.publicada = false;
  }

  cambiarEstado() {
    this.publicada = !this.publicada;
  }

  resumen() {
    if (this.contenido.length <= Noticia.LARGO_RESUMEN) return this.contenido;
    return this.contenido.substring(0, Noticia.LARGO_RESUMEN) + '...';
  }
}

module.exports = Noticia;
