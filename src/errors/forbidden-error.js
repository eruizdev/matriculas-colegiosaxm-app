const AppError = require('./app-error');

class ForbiddenError extends AppError {
  constructor(mensaje = 'No tienes permiso para entrar aquí') {
    super(mensaje, 403);
  }
}

module.exports = ForbiddenError;
