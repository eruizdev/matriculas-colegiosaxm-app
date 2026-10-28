class PeriodoAcademico {
  constructor({ id, nombre, anio, fechaInicio, fechaFin, activo = false }) {
    this.id = id;
    this.nombre = nombre;
    this.anio = anio;
    this.fechaInicio = fechaInicio;
    this.fechaFin = fechaFin;
    this.activo = activo;
  }
}

module.exports = PeriodoAcademico;
