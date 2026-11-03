class Grado {
  constructor({ id, nombre, nivel, orden = 0, activo = true }) {
    this.id = id;
    this.nombre = nombre;
    this.nivel = nivel;
    this.orden = orden;
    this.activo = activo;
  }

  activar() {
    this.activo = true;
  }

  desactivar() {
    this.activo = false;
  }

  cambiarEstado() {
    this.activo = !this.activo;
  }

  nombreCompleto() {
    return `${this.nombre} - ${this.nivel}`;
  }
}

module.exports = Grado;
