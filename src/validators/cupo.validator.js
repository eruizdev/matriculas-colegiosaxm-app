const Jornada = require('../constants/jornada');

class CupoValidator {
  static validar(data) {
    const errores = [];
    if (!data.gradoId) errores.push('Selecciona un grado');
    if (!data.periodoId) errores.push('Selecciona un periodo');
    if (!Object.values(Jornada).includes(data.jornada)) errores.push('Selecciona una jornada');
    return errores.concat(CupoValidator.validarCantidades(data));
  }

  static validarCantidades(data) {
    const errores = [];
    const total = Number(data.total);
    const ocupados = Number(data.ocupados) || 0;

    if (!Number.isInteger(total) || total < 1) errores.push('El total de cupos debe ser un número mayor a 0');
    if (!Number.isInteger(ocupados) || ocupados < 0) errores.push('Los cupos ocupados no pueden ser negativos');
    if (ocupados > total) errores.push('Los cupos ocupados no pueden superar el total');
    return errores;
  }

  static validarCantidad(data) {
    const cantidad = Number(data.cantidad) || 1;
    if (!Number.isInteger(cantidad) || cantidad < 1) return ['La cantidad debe ser un número mayor a 0'];
    return [];
  }
}

module.exports = CupoValidator;
