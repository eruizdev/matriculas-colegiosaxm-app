const Jornada = require('../constants/jornada');

class CupoValidator {
  static validar(data) {
    const errores = [];
    const total = Number(data.total);
    const ocupados = Number(data.ocupados) || 0;

    if (!data.gradoId) errores.push('Selecciona un grado');
    if (!data.periodoId) errores.push('Selecciona un periodo');
    if (!Object.values(Jornada).includes(data.jornada)) errores.push('Selecciona una jornada');
    if (!total || total < 1) errores.push('El total de cupos debe ser mayor a 0');
    if (ocupados < 0 || ocupados > total) errores.push('Los cupos ocupados no pueden superar el total');
    return errores;
  }
}

module.exports = CupoValidator;
