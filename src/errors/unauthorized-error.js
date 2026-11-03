const AppError = require('./app-error');

class UnauthorizedError extends AppError {
  constructor(mensaje = 'Debes iniciar sesión para continuar') {
    super(mensaje, 401);
  }
}

module.exports = UnauthorizedError;
