class Cupo {
  constructor({ id, gradoId, periodoId, jornada, total = 0, ocupados = 0 }) {
    this.id = id;
    this.gradoId = gradoId;
    this.periodoId = periodoId;
    this.jornada = jornada;
    this.total = total;
    this.ocupados = ocupados;
  }

  disponibles() {
    return this.total - this.ocupados;
  }

  hayDisponibles() {
    return this.disponibles() > 0;
  }
}

module.exports = Cupo;
