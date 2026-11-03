const UN_DIA = 1000 * 60 * 60 * 24;

class PeriodoAcademico {
  constructor({ id, nombre, anio, fechaInicio, fechaFin, activo = false }) {
    this.id = id;
    this.nombre = nombre;
    this.anio = anio;
    this.fechaInicio = fechaInicio;
    this.fechaFin = fechaFin;
    this.activo = activo;
  }

  activar() {
    this.activo = true;
  }

  desactivar() {
    this.activo = false;
  }

  tieneFechas() {
    return Boolean(this.fechaInicio && this.fechaFin);
  }

  estaVigente(hoy = new Date()) {
    if (!this.tieneFechas()) return false;
    const inicio = new Date(`${this.fechaInicio}T00:00:00`);
    const fin = new Date(`${this.fechaFin}T23:59:59`);
    return hoy >= inicio && hoy <= fin;
  }

  duracionDias() {
    if (!this.tieneFechas()) return 0;
    const inicio = new Date(`${this.fechaInicio}T00:00:00`);
    const fin = new Date(`${this.fechaFin}T00:00:00`);
    return Math.round((fin - inicio) / UN_DIA) + 1;
  }
}

module.exports = PeriodoAcademico;
