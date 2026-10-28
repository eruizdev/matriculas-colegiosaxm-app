class Grado {
  constructor({ id, nombre, nivel, orden = 0, activo = true }) {
    this.id = id;
    this.nombre = nombre;
    this.nivel = nivel;
    this.orden = orden;
    this.activo = activo;
  }
}

module.exports = Grado;
