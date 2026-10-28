const AppError = require('./app-error');

class NotFoundError extends AppError {
  constructor(mensaje = 'Recurso no encontrado') {
    super(mensaje, 404);
  }
}

module.exports = NotFoundError;
