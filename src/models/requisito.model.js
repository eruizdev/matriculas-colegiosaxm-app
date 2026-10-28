class Requisito {
  constructor({ id, titulo, descripcion, orden = 0 }) {
    this.id = id;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.orden = orden;
  }
}

module.exports = Requisito;
