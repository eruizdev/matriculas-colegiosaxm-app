const AppError = require('./app-error');

class ValidationError extends AppError {
  constructor(errores = [], mensaje = 'Hay datos inválidos en el formulario') {
    super(mensaje, 400, errores);
  }
}

module.exports = ValidationError;
