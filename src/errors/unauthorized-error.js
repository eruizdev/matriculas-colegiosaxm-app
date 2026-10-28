const AppError = require('./app-error');

class UnauthorizedError extends AppError {
  constructor(mensaje = 'Correo o contraseña incorrectos') {
    super(mensaje, 401);
  }
}

module.exports = UnauthorizedError;
