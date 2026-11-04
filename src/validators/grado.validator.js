const Nivel = require('../constants/nivel');

class GradoValidator {
  static validar(data) {
    const errores = [];
    const nombre = (data.nombre || '').trim();

    if (nombre.length < 3 || nombre.length > 40) errores.push('El nombre del grado debe tener entre 3 y 40 letras');
    if (!Object.values(Nivel).includes(data.nivel)) errores.push('Selecciona un nivel válido');
    if (!GradoValidator.ordenValido(data.orden)) errores.push('El orden debe ser un número entero desde 0');
    return errores;
  }

  static ordenValido(orden) {
    if (orden === undefined || orden === '') return true;
    const numero = Number(orden);
    return Number.isInteger(numero) && numero >= 0;
  }
}

module.exports = GradoValidator;
