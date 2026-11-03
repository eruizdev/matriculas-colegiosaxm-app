const AppError = require('./app-error');

class ConflictError extends AppError {
  constructor(mensaje = 'El registro ya existe') {
    super(mensaje, 409);
  }
}

module.exports = ConflictError;
