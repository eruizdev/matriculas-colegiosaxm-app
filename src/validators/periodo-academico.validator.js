const FechaUtil = require('../utils/fecha.util');

const regexFecha = /^\d{4}-\d{2}-\d{2}$/;

class PeriodoAcademicoValidator {
  static ANIOS_ADELANTE = 5;

  static validar(data) {
    const errores = [];
    const nombre = (data.nombre || '').trim();
    const anio = Number(data.anio);
    const anioActual = FechaUtil.anioActual();
    const anioMaximo = anioActual + PeriodoAcademicoValidator.ANIOS_ADELANTE;

    if (nombre.length < 3 || nombre.length > 60) errores.push('El nombre debe tener entre 3 y 60 letras');
    if (!Number.isInteger(anio) || anio < anioActual || anio > anioMaximo) {
      errores.push(`El año debe estar entre ${anioActual} y ${anioMaximo}`);
    }

    return errores.concat(PeriodoAcademicoValidator.validarFechas(data));
  }

  static validarFechas({ fechaInicio, fechaFin }) {
    if (!fechaInicio && !fechaFin) return [];
    if (!fechaInicio || !fechaFin) return ['Si pones una fecha debes poner la fecha de inicio y la de fin'];
    if (!regexFecha.test(fechaInicio) || !regexFecha.test(fechaFin)) return ['Las fechas no tienen un formato válido'];
    if (fechaFin < fechaInicio) return ['La fecha de fin no puede ser antes de la fecha de inicio'];
    return [];
  }
}

module.exports = PeriodoAcademicoValidator;
