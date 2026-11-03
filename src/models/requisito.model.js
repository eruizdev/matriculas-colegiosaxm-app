class Requisito {
  constructor({ id, titulo, descripcion, orden = 0, obligatorio = true }) {
    this.id = id;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.orden = orden;
    this.obligatorio = obligatorio;
  }

  esObligatorio() {
    return this.obligatorio;
  }
}

module.exports = Requisito;
