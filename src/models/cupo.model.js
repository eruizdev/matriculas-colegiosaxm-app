const EstadoCupo = require('../constants/estado-cupo');

class Cupo {
  static LIMITE_POCOS = 5;

  constructor({ id, gradoId, periodoId, jornada, total = 0, ocupados = 0, fechaActualizacion = new Date() }) {
    this.id = id;
    this.gradoId = gradoId;
    this.periodoId = periodoId;
    this.jornada = jornada;
    this.total = total;
    this.ocupados = ocupados;
    this.fechaActualizacion = fechaActualizacion;
  }

  disponibles() {
    return Math.max(this.total - this.ocupados, 0);
  }

  hayDisponibles() {
    return this.disponibles() > 0;
  }

  porcentajeOcupacion() {
    if (this.total === 0) return 0;
    return Math.round((this.ocupados / this.total) * 100);
  }

  estado() {
    if (!this.hayDisponibles()) return EstadoCupo.AGOTADO;
    if (this.disponibles() <= Cupo.LIMITE_POCOS) return EstadoCupo.POCOS;
    return EstadoCupo.DISPONIBLE;
  }

  ocupar(cantidad = 1) {
    if (cantidad < 1 || cantidad > this.disponibles()) return false;
    this.ocupados += cantidad;
    this.fechaActualizacion = new Date();
    return true;
  }

  liberar(cantidad = 1) {
    if (cantidad < 1 || cantidad > this.ocupados) return false;
    this.ocupados -= cantidad;
    this.fechaActualizacion = new Date();
    return true;
  }
}

module.exports = Cupo;
